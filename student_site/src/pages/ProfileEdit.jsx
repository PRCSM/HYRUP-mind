import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeaderEdit from "../components/profile/edit/ProfileHeaderEdit";
import EducationEdit from "../components/profile/edit/EducationEdit";
import SkillsEdit from "../components/profile/edit/SkillsEdit";
import JobPreferenceEdit from "../components/profile/edit/JobPreferenceEdit";
import ExperienceEdit from "../components/profile/edit/ExperienceEdit";
import ProjectsEdit from "../components/profile/edit/ProjectsEdit";

function ProfileEdit() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // Initial state for all profile data
  const [profileData, setProfileData] = useState({
    header: {
      name: "ALEX MAXWELLS",
      about:
        "CodeSprint 2024 is a 48-hour global coding marathon that brings together developers, designers, and innovators to build impactful solutions using AI, .",
      profileImage: "/images/mix.png",
    },
    education: {
      university: "Sastra University",
      type: "Deemed University",
      degree: "Btech",
      email: "125984@sastra.ac.in",
      graduationYear: "2027",
    },
    skills: [
      { name: "ADOBE", color: "bg-[#FFD54F]" },
      { name: "REACT", color: "bg-white" },
      { name: "FLUTTER", color: "bg-[#96E7E5]" },
      { name: "FIGMA", color: "bg-[#40FFB9]" },
      { name: "TENSOR FLOW", color: "bg-white" },
    ],
    jobPreferences: [
      "App Development",
      "UI/UX",
      "Full Stack Development",
      "AI/ML",
    ],
    experiences: [
      {
        organization: "MaxWells Coperations",
        position: "AI Intern",
        timeline: "Jan 2025 - Feb 2025",
        description:
          "Manage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your search",
      },
      {
        organization: "MaxWells Coperations",
        position: "AI Intern",
        timeline: "Jan 2025 - Feb 2025",
        description:
          "Manage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your search",
      },
    ],
    projects: [
      {
        name: "MaxWells Coperations",
        link: "https://amxa.com/pro1",
        description:
          "Manage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your search",
      },
      {
        name: "MaxWells Coperations",
        link: "https://amxa.com/pro1",
        description:
          "Manage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your search",
      },
    ],
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      // Navigate back to profile with smooth transition
      navigate("/profile");
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="w-full h-full flex gap-10 items-center justify-center pt-16 animate-slideInRight">
      <div className="w-[95%] md:w-[90%] h-[95%] md:h-[89%] bg-[#efebe0] rounded-[10px] border-2 sm:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] overflow-auto custom-scroll p-4 md:p-6">
        <div className="space-y-4 md:space-y-6">
          {/* Header with Save/Cancel Buttons */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-[inter-extra] text-black uppercase">
              Edit Profile
            </h1>
            <div className="flex gap-2 md:gap-4">
              <button
                onClick={handleCancel}
                className="bg-[#FFB3B3] px-4 md:px-6 py-2 md:py-3 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
              >
                <span className="text-sm md:text-base font-[Jost-Bold] text-black">
                  Cancel
                </span>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#A8FFB3] px-4 md:px-6 py-2 md:py-3 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm md:text-base font-[Jost-Bold] text-black">
                  {isSaving ? "Saving..." : "Save Changes"}
                </span>
              </button>
            </div>
          </div>

          {/* Profile Header Edit */}
          <ProfileHeaderEdit
            data={profileData.header}
            onChange={(newData) =>
              setProfileData({ ...profileData, header: newData })
            }
          />

          {/* Mobile: Stack all sections vertically */}
          {/* Desktop: Two Column Layout */}
          <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-[250px_1fr] gap-4 md:gap-6">
            {/* Education - Mobile */}
            <div className="md:hidden">
              <EducationEdit
                data={profileData.education}
                onChange={(newData) =>
                  setProfileData({ ...profileData, education: newData })
                }
              />
            </div>

            {/* Skills - Mobile */}
            <div className="md:hidden">
              <SkillsEdit
                data={profileData.skills}
                onChange={(newData) =>
                  setProfileData({ ...profileData, skills: newData })
                }
              />
            </div>

            {/* Job Preference - Mobile */}
            <div className="md:hidden">
              <JobPreferenceEdit
                data={profileData.jobPreferences}
                onChange={(newData) =>
                  setProfileData({ ...profileData, jobPreferences: newData })
                }
              />
            </div>

            {/* Experience - Mobile */}
            <div className="md:hidden">
              <ExperienceEdit
                data={profileData.experiences}
                onChange={(newData) =>
                  setProfileData({ ...profileData, experiences: newData })
                }
              />
            </div>

            {/* Projects - Mobile */}
            <div className="md:hidden">
              <ProjectsEdit
                data={profileData.projects}
                onChange={(newData) =>
                  setProfileData({ ...profileData, projects: newData })
                }
              />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block space-y-6">
              <EducationEdit
                data={profileData.education}
                onChange={(newData) =>
                  setProfileData({ ...profileData, education: newData })
                }
              />
              <JobPreferenceEdit
                data={profileData.jobPreferences}
                onChange={(newData) =>
                  setProfileData({ ...profileData, jobPreferences: newData })
                }
              />
            </div>

            <div className="hidden md:block space-y-6">
              <SkillsEdit
                data={profileData.skills}
                onChange={(newData) =>
                  setProfileData({ ...profileData, skills: newData })
                }
              />
              <ExperienceEdit
                data={profileData.experiences}
                onChange={(newData) =>
                  setProfileData({ ...profileData, experiences: newData })
                }
              />
            </div>
          </div>

          {/* Projects Section - Full Width on Desktop */}
          <div className="hidden md:block">
            <ProjectsEdit
              data={profileData.projects}
              onChange={(newData) =>
                setProfileData({ ...profileData, projects: newData })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
