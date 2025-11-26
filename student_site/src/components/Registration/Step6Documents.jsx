import React, { useState } from "react";
import AnimatedDoodle from "./AnimatedDoodle";

function Step6Documents({ formData, setFormData, errors, setErrors }) {
  const [profilePreview, setProfilePreview] = useState(
    formData.profilePicture || null
  );
  const [resumeFileName, setResumeFileName] = useState(
    formData.resumeName || ""
  );

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors({
          ...errors,
          profilePicture: "File size must be less than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
        setFormData({ ...formData, profilePicture: reader.result });
        if (errors.profilePicture) {
          setErrors({ ...errors, profilePicture: "" });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResume = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setErrors({ ...errors, resume: "File size must be less than 10MB" });
        return;
      }

      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, resume: "Please upload a PDF or DOC file" });
        return;
      }

      setResumeFileName(file.name);
      setFormData({ ...formData, resume: file, resumeName: file.name });
      if (errors.resume) {
        setErrors({ ...errors, resume: "" });
      }
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.profilePicture) {
      newErrors.profilePicture = "Profile picture is required";
    }

    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Form Section */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-4xl font-[inter-extra] text-black mb-2">
            make it official 📄
          </h2>
          <p className="text-base md:text-lg font-[jost-regular] text-gray-600 mb-8">
            upload your profile pic and resume
          </p>

          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-[Jost-Bold] text-black">
                Profile Picture <span className="text-red-500">*</span>
              </label>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                {/* Preview */}
                <div className="w-32 h-32 border-2 border-black rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-16 h-16 text-gray-400"
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
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex-1">
                  <label className="cursor-pointer">
                    <div className="px-6 py-4 bg-[#E3FEAA] border-2 border-black rounded-lg font-[Jost-Bold] text-black hover:bg-[#D9F99D] transition-all duration-200 hover:scale-105 text-center">
                      {profilePreview ? "Change Picture" : "Upload Picture"}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicture}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2 font-[jost-regular]">
                    Max 5MB. JPG, PNG, or GIF
                  </p>
                  {errors.profilePicture && (
                    <span className="text-sm text-red-500 font-[jost-regular]">
                      {errors.profilePicture}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Resume */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-[Jost-Bold] text-black">
                Resume <span className="text-red-500">*</span>
              </label>

              <div className="space-y-3">
                <label className="cursor-pointer block">
                  <div className="px-6 py-4 bg-white border-2 border-black rounded-lg font-[Jost-Bold] text-black hover:bg-[#E3FEAA] transition-all duration-200 text-center border-dashed">
                    {resumeFileName ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="truncate">{resumeFileName}</span>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-2">
                          📎 Drop your resume here or click to browse
                        </div>
                        <div className="text-sm text-gray-500 font-[jost-regular]">
                          PDF or DOC, max 10MB
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResume}
                    className="hidden"
                  />
                </label>

                {resumeFileName && (
                  <button
                    type="button"
                    onClick={() => {
                      setResumeFileName("");
                      setFormData({
                        ...formData,
                        resume: null,
                        resumeName: "",
                      });
                    }}
                    className="text-sm text-red-500 hover:text-red-700 font-[Jost-Bold]"
                  >
                    Remove Resume
                  </button>
                )}

                {errors.resume && (
                  <span className="text-sm text-red-500 font-[jost-regular]">
                    {errors.resume}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Doodle Section */}
        <div className="hidden md:block w-64 h-64">
          <AnimatedDoodle
            src="/images/doodles/SelfieDoodle.png"
            alt="Selfie character"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Step6Documents;
