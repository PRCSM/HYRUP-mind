import React, { useEffect, useState } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import apiService from "../../services/apiService";
import { AuthContext } from "./AuthContextDef";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'student', 'recruiter', 'college', or null
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sign in with Google - with popup fallback to redirect
  const signInWithGoogle = async () => {
    try {
      setError(null);

      // Configure Google provider for better popup handling
      googleProvider.setCustomParameters({
        prompt: "select_account",
      });

      // First, try popup method
      try {
        const result = await signInWithPopup(auth, googleProvider);
        // After a successful popup sign-in, proactively check backend registration
        try {
          await checkUserType(result.user);
        } catch (err) {
          if (import.meta.env.DEV)
            console.warn("checkUserType after popup sign-in failed:", err);
        }

        return result;
      } catch (popupError) {
        // Popup authentication failed

        // Check if it's a popup blocked error
        if (
          popupError.code === "auth/popup-blocked" ||
          popupError.code === "auth/cancelled-popup-request" ||
          popupError.message.includes("popup")
        ) {
          // Popup was blocked, falling back to redirect

          // Show user a message about redirect
          setError("Popup was blocked. Redirecting to Google Sign-In...");

          // Wait a moment for user to see the message
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Clear the error and use redirect method
          setError(null);
          await signInWithRedirect(auth, googleProvider);

          // signInWithRedirect doesn't return immediately,
          // the result will be handled in the useEffect via getRedirectResult
          return null;
        } else {
          // If it's not a popup issue, re-throw the error
          throw popupError;
        }
      }
    } catch (error) {
      // Error signing in with Google
      setError(error.message);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUserType(null);
      setUserData(null);
    } catch (error) {
      // Error signing out
      setError(error.message);
      throw error;
    }
  };

  const checkUserType = async (user) => {
    const targetUser = user || currentUser;
    if (!targetUser) return;

    const token = await targetUser.getIdToken();

    let res;
    try {
      res = await apiService.checkUser();
    } catch (err) {

      // 🟢 NEW FIX: auto create student
      throw err;
    }


    const type = res?.role ?? "student";
    setUserType(type);

    if (type === "student") {
      try {
        const details = await apiService.getStudentDetails();
        if (details?.user) {
          setUserData(details.user);
        } else if (res?.user) {
          // Fallback to checkUser data if getStudentDetails fails/returns empty
          setUserData(res.user);
        }
      } catch (e) {
        console.error("Failed to fetch user details", e);
        // Fallback to checkUser data on error
        if (res?.user) {
          setUserData(res.user);
        }
      }
    } else if (res?.user) {
      // For non-students (or if type check failed/defaulted but we have data), use checkUser data
      setUserData(res.user);
    }
  };

  // Register as recruiter
  const registerRecruiter = async (recruiterData) => {
    try {
      setError(null);
      const response = await apiService.recruiterSignup(recruiterData);
      setUserType("recruiter");
      setUserData(response.user);
      // Force check user type after registration to ensure proper state
      setTimeout(() => {
        checkUserType(auth.currentUser);
      }, 500);
      return response;
    } catch (error) {
      // Error registering recruiter
      setError(error.message);
      throw error;
    }
  };

  // Register as student
  const registerStudent = async (studentData) => {
    try {
      setError(null);
      const response = await apiService.studentSignup(studentData);
      setUserType("student");
      setUserData(response.user);
      return response;
    } catch (error) {
      // Error registering student
      setError(error.message);
      throw error;
    }
  };

  // Update user data
  const updateUserData = (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Handle redirect results on component mount
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // Successfully signed in via redirect
          // Proactively check backend registration so SignUp/other pages can react
          try {
            await checkUserType(result.user);
          } catch (err) {
            // checkUserType after redirect sign-in failed
          }
        }
      } catch (error) {
        // Error handling redirect result
        setError(error.message);
      }
    };

    handleRedirectResult();
  }, []);

  // Monitor auth state changes
  useEffect(() => {
    let postRegisterTimeout = null;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // If we just registered and redirected here, skip an immediate check to avoid redirect flapping.
        try {
          const justRegistered = sessionStorage.getItem("hyrup:justRegistered");
          if (justRegistered) {
            sessionStorage.removeItem("hyrup:justRegistered");
            // Detected recent registration — deferring user-type check to avoid redirect loop.
            // Defer the check slightly so that any backend state has time to settle.
            setLoading(true);
            postRegisterTimeout = setTimeout(async () => {
              try {
                await checkUserType(user);
              } catch (err) {
                // Deferred checkUserType failed
              } finally {
                setLoading(false);
              }
            }, 900);
            return;
          }
        } catch {
          // ignore sessionStorage errors
        }
        // Only check user type if we're not on the registration or signup page
        // This prevents redirect loops for new users
        const currentPath = window.location.pathname;
        if (currentPath !== "/registration" && currentPath !== "/signup") {
          try {
            await checkUserType(user);
          } catch {
            // Error checking user type
          }
        }
        // Always set loading to false after handling auth state
        setLoading(false);
      } else {
        // User is signed out
        setUserType(null);
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      if (postRegisterTimeout) clearTimeout(postRegisterTimeout);
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    userType,
    userData,
    loading,
    error,
    signInWithGoogle,
    logout,
    checkUserType,
    registerRecruiter,
    registerStudent,
    updateUserData,
    setError, // For clearing errors
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
