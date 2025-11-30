import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeaderEdit from "../components/profile/edit/ProfileHeaderEdit";
import EducationEdit from "../components/profile/edit/EducationEdit";
import SkillsEdit from "../components/profile/edit/SkillsEdit";
import JobPreferenceEdit from "../components/profile/edit/JobPreferenceEdit";
import ExperienceEdit from "../components/profile/edit/ExperienceEdit";
import ProjectsEdit from "../components/profile/edit/ProjectsEdit";
import { useAuth } from "../hooks/useAuth";
import apiService from "../../services/apiService";

function ProfileEdit() {
  const navigate = useNavigate();
  const { userData, updateUserData } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initial state for all profile data
  const [profileData, setProfileData] = useState({
    header: {
      name: "",
      about: "",
      profileImage: "",
    },
    education: {
      university: "",
      type: "",
      degree: "",
      email: "",
      graduationYear: "",
    },
    skills: [],
    jobPreferences: [],
    experiences: [],
    projects: [],
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // If we have userData from context, we can use it, but it might be better to fetch fresh data
        // to ensure we have the latest details, especially if userData in context is partial.
        // However, based on AuthContext, userData seems to be the full user object.
        // Let's fetch fresh data to be safe and consistent with Profile.jsx
        const response = await apiService.getStudentDetails();
        if (response && response.user) {
          const normalizedData = normalizeProfileForEdit(response.user);
          setProfileData(normalizedData);
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const normalizeProfileForEdit = (data) => {
    // Map backend data to frontend state structure
    return {
      header: {
        name: data.profile?.FullName || "",
        about: data.profile?.about || "",
        profileImage: data.profile?.profilePicture || "/images/mix.png", // Fallback image
      },
      education: {
        university: data.education?.college || "",
        type: "Deemed University", // This field doesn't seem to exist in backend, keeping default or empty
        degree: data.education?.degree || "",
        email: data.education?.collegeEmail || "",
        graduationYear: data.education?.yearOfPassing || "",
      },
      skills: Object.entries(data.user_skills || {}).map(([name, details]) => ({
        name: name.toUpperCase(),
        color: getSkillColor(details?.level),
        level: details?.level
      })),
      jobPreferences: data.job_preference || [],
      experiences: (data.experience || []).map((exp) => ({
        organization: exp.nameOfOrg,
        position: exp.position,
        timeline: exp.timeline,
        description: exp.description,
      })),
      projects: (data.projects || []).map((p) => ({
        name: p.projectName,
        link: p.link,
        description: p.description,
      })),
    };
  };

  const getSkillColor = (level) => {
    const colors = {
      unverified: "bg-[#F2DEBA]",
      beginner: "bg-[#40FFB9]",
      intermediate: "bg-[#96E7E5]",
      advance: "bg-[#FFD54F]",
    };
    return colors[level] || "bg-white";
  };

  const denormalizeProfileForSave = (frontendData) => {
    // Map frontend state back to backend structure
    // Note: We need to be careful not to lose existing data structures if the backend expects full objects

    // Construct the skills object
    const user_skills = {};
    frontendData.skills.forEach(skill => {
      // Preserve existing level if possible, or default to unverified for new skills
      // Since we don't store the full skill object in state, we might lose some metadata if we are not careful.
      // But for now, we just map name and level.
      user_skills[skill.name] = {
        level: skill.level || "unverified"
      };
    });

    return {
      profile: {
        FullName: frontendData.header.name,
        about: frontendData.header.about,
        // profilePicture is handled separately via upload usually, but if it's a string URL update:
        profilePicture: frontendData.header.profileImage
      },
      education: {
        college: frontendData.education.university,
        degree: frontendData.education.degree,
        yearOfPassing: frontendData.education.graduationYear,
        collegeEmail: frontendData.education.email,
      },
      user_skills: user_skills,
      job_preference: frontendData.jobPreferences,
      experience: frontendData.experiences.map(exp => ({
        nameOfOrg: exp.organization,
        position: exp.position,
        timeline: exp.timeline,
        description: exp.description
      })),
      projects: frontendData.projects.map(p => ({
        projectName: p.name,
        link: p.link,
        description: p.description
      }))
    };
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = denormalizeProfileForSave(profileData);

      // Call API to update profile
      const response = await apiService.updateStudentProfile(payload);

      // Update local context if needed
      if (response && response.user) {
        updateUserData(response.user);
      }

      // Navigate back to profile with smooth transition
      setTimeout(() => {
        setIsSaving(false);
        navigate("/profile");
      }, 500);
    } catch (error) {
      console.error("Error saving profile:", error);
      setIsSaving(false);
      // You might want to show an error message to the user here
      alert("Failed to save profile. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-xl font-[Jost-Bold]">Loading...</div>
      </div>
    );
  }

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
