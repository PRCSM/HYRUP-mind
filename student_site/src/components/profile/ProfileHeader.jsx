import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileHeader() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile-edit");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Layout - Compact */}
      <div className="md:hidden">
        <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4">
          <div className="flex items-start relative justify-between gap-4">
            {/* Profile Picture */}
            <div className="w-[140px] h-[140px] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden bg-white flex-shrink-0">
              <img
                src="/images/mix.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Resume Button - Mobile (top right) */}
            <button className="bg-[#D4F4A7] px-4 py-2 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] flex items-center justify-center gap-1 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer">
              <span className="text-base font-[Jost-Bold] text-black">
                Resume
              </span>
              <span className="text-base">↗</span>
            </button>
          </div>

          {/* Name and Edit Profile - Mobile */}
          <div className="mt-4 flex items-center relative justify-between">
            <h1 className="text-3xl font-[inter-extra] text-black uppercase tracking-wide leading-tight">
              ALEX
              <br />
              MAXWELLS
            </h1>
            <button
              onClick={handleEditProfile}
              className="bg-[#A8C5FF] absolute top-0 right-0 px-2 py-1 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[4px] whitespace-nowrap hover:translate-y-[4px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
            >
              <span className="text-[10px] font-[Jost-Bold] text-black">
                Edit Profile ✎
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Two Column */}
      <div className="hidden md:flex md:gap-4">
        {/* Left Column - Profile Picture and Resume */}
        <div className="flex flex-col gap-4">
          {/* Profile Picture */}
          <div className="w-[240px] h-[240px] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden bg-white">
            <img
              src="/images/mix.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Resume Button */}
          <button className="w-full h-[50px] bg-[#D4F4A7] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer">
            <span className="text-xl font-[Jost-Bold] text-black">Resume</span>
            <span className="text-xl">↗</span>
          </button>
        </div>

        {/* Right Column - Name and About */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Name Section */}
          <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-6 flex items-center justify-between">
            <h1 className="text-4xl font-[inter-extra] text-black uppercase tracking-wide leading-tight">
              ALEX
              <br />
              MAXWELLS
            </h1>
            <button
              onClick={handleEditProfile}
              className="bg-[#A8C5FF] px-6 py-3 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
            >
              <span className="text-[16px] font-[Jost-Bold] text-black">
                Edit Profile ✎
              </span>
            </button>
          </div>

          {/* About Section */}
          <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-6">
            <h2 className="text-[20px] font-[Jost-Bold] text-black mb-3">
              About :
            </h2>
            <p className="text-[15px] font-[jost-semibold] text-black leading-relaxed">
              CodeSprint 2024 is a 48-hour global coding marathon that brings
              together developers, designers, and innovators to build impactful
              solutions using AI, .
            </p>
          </div>
        </div>
      </div>

      {/* Mobile About Section */}
      <div className="md:hidden bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4">
        <h2 className="text-lg font-[Jost-Bold] text-black mb-2">About :</h2>
        <p className="text-sm font-[jost-semibold] text-black leading-relaxed">
          CodeSprint 2024 is a 48-hour global coding marathon that brings
          together developers, designers, and innovators to build impactful
          solutions using AI, .
        </p>
      </div>
    </div>
  );
}

export default ProfileHeader;
