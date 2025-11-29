import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Search from "./components/common/Search";

// Lazy load all pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileEdit = lazy(() => import("./pages/ProfileEdit"));
const VerifySkill = lazy(() => import("./pages/VerifySkill"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Explore = lazy(() => import("./pages/Explore"));
const Settings = lazy(() => import("./pages/Settings"));
const Chat = lazy(() => import("./pages/Chat"));
const SavedJobs = lazy(() => import("./pages/SavedJobs"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Registration = lazy(() => import("./pages/Registration"));
const RegistrationSuccess = lazy(() => import("./pages/RegistrationSuccess"));

// Loading fallback component
const PageLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-[#FFFAE9]">
    <div className="animate-pulse text-2xl font-[jost-bold] text-amber-600">Loading...</div>
  </div>
);

function App() {
  const location = useLocation();
  const isSignUpPage =
    location.pathname === "/signup" ||
    location.pathname === "/registration" ||
    location.pathname === "/registration-success";

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center gap-4 relative">
      {!isSignUpPage && <Navbar />}
      <div className="flex-1 h-full relative">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/verify-skill" element={<VerifySkill />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/registration-success"
            element={<RegistrationSuccess />}
          />
          </Routes>
        </Suspense>
      </div>
      {!isSignUpPage && <Search />}
    </div>
  );
}

export default App;
