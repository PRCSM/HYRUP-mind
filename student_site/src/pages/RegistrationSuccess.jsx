import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageReveal from "../components/common/PageReveal";

function RegistrationSuccess() {
  const navigate = useNavigate();
  const [showReveal, setShowReveal] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Get user data from localStorage or props
  const userData = {
    name: localStorage.getItem("userName") || "Student",
    email: localStorage.getItem("userEmail") || "student@example.com",
    role: "Student",
    profilePic: localStorage.getItem("userProfilePic") || null,
  };

  const handleNext = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="h-screen overflow-hidden w-screen relative bg-[#FFFAE9]">
      {/* Page Reveal Animation */}
      {showReveal && <PageReveal onComplete={() => setShowReveal(false)} />}

      {/* Exit Animation Overlay */}
      {isExiting && (
        <>
          {/* Top Curtain */}
          <div className="fixed top-0 left-0 w-full h-1/2 bg-[#D9F99D] z-[100] animate-[slideDownCurtain_1s_ease-in-out_forwards]" />
          {/* Bottom Curtain */}
          <div className="fixed bottom-0 left-0 w-full h-1/2 bg-[#D9F99D] z-[100] animate-[slideUpCurtain_1s_ease-in-out_forwards]" />
        </>
      )}

      {/* Main Content */}
      <div
        className={`w-full min-h-screen flex flex-col items-center justify-center px-4 py-8 transition-all duration-500 ${
          showReveal ? "opacity-0" : "opacity-100"
        } ${isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-[#E3FEAA] transition-all duration-200 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* ID Card */}
        <div className="w-full mt-10 max-w-sm mb-8 animate-slideInRight">
          <div className="relative bg-white border-2 border-black rounded-[10px] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* Decorative background pattern */}
            <div className="absolute top-0 left-0 w-full h-32 overflow-hidden rounded-t-3xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-4 left-4 w-20 h-20 bg-yellow-200 rounded-full"></div>
                <div className="absolute top-8 right-8 w-32 h-2 bg-purple-200 rotate-45"></div>
                <div className="absolute bottom-4 left-12 w-24 h-2 bg-purple-200 rotate-12"></div>
                <div className="absolute top-12 right-16 w-16 h-16 bg-orange-200 rounded-full"></div>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="relative z-10 flex justify-center mb-6">
              <div className="w-40 h-40 rounded-2xl border-4 border-black overflow-hidden bg-gray-100">
                {userData.profilePic ? (
                  <img
                    src={userData.profilePic}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#D9F99D] to-[#E3FEAA]">
                    <svg
                      className="w-24 h-24 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <h2 className="text-3xl font-[inter-extra] text-black text-center mb-6">
              {userData.name}
            </h2>

            {/* Details */}
            <div className="flex justify-between items-start gap-4 text-sm">
              <div className="flex-1">
                <p className="text-gray-500 font-[jost-regular] mb-1">Role</p>
                <p className="text-black font-[Jost-Bold]">{userData.role}</p>
              </div>
              <div className="flex-1">
                <p className="text-gray-500 font-[jost-regular] mb-1">Email</p>
                <p className="text-black font-[Jost-Bold] text-xs break-all">
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div
          className="text-center mb-8 animate-slideInRight"
          style={{ animationDelay: "0.1s" }}
        >
          <h1 className="text-3xl md:text-4xl font-[inter-extra] text-black mb-3">
            Nice to get your details! 🎉
          </h1>
          <p className="text-lg md:text-xl font-[jost-regular] text-gray-700">
            Let's get dive in deep
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full max-w-sm px-8 py-4 bg-black text-white rounded-xl font-[Jost-Bold] text-lg
          hover:scale-105 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(217,249,157,1)]
          hover:shadow-[6px_6px_0px_0px_rgba(217,249,157,1)] animate-slideInRight"
          style={{ animationDelay: "0.2s" }}
        >
          Next
        </button>

        {/* Decorative Doodle */}
        <div className="absolute bottom-8 right-8 w-32 h-32 opacity-30 hidden md:block">
          <img
            src="/images/doodles/SwingingDoodle.png"
            alt="Decoration"
            className="w-full h-full object-contain animate-float"
          />
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
