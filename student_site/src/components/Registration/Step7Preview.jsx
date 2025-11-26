import React, { useState } from "react";
import AnimatedDoodle from "./AnimatedDoodle";

function Step7Preview({ formData, setFormData, errors, setErrors, onSubmit }) {
  const [termsAccepted, setTermsAccepted] = useState(
    formData.termsAccepted || false
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTermsChange = () => {
    const newValue = !termsAccepted;
    setTermsAccepted(newValue);
    setFormData({ ...formData, termsAccepted: newValue });

    if (errors.terms) {
      setErrors({ ...errors, terms: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    // Save user data to localStorage for success page
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);
    if (formData.profilePicture) {
      localStorage.setItem("userProfilePic", formData.profilePicture);
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Call parent's onSubmit which will navigate to success page
    if (onSubmit) {
      onSubmit(formData);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Preview Section */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-4xl font-[inter-extra] text-black mb-2">
            looking good! 🎉
          </h2>
          <p className="text-base md:text-lg font-[jost-regular] text-gray-600 mb-8">
            ready to dive in?
          </p>

          {/* Summary Cards */}
          <div className="space-y-4 mb-8">
            {/* Basic Info */}
            <div className="p-4 bg-white border-2 border-black rounded-lg">
              <h3 className="font-[Jost-Bold] text-lg mb-3">Basic Info</h3>
              <div className="space-y-2 text-sm font-[jost-regular]">
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
              </div>
            </div>

            {/* College Info */}
            <div className="p-4 bg-white border-2 border-black rounded-lg">
              <h3 className="font-[Jost-Bold] text-lg mb-3">College Info</h3>
              <div className="space-y-2 text-sm font-[jost-regular]">
                <p>
                  <strong>College:</strong> {formData.college}
                </p>
                <p>
                  <strong>Degree:</strong> {formData.degree}
                </p>
                <p>
                  <strong>Passing Year:</strong> {formData.passingYear}
                </p>
                <p>
                  <strong>Type:</strong> {formData.collegeType}
                </p>
                {formData.collegeEmail && (
                  <p>
                    <strong>College Email:</strong> {formData.collegeEmail}
                  </p>
                )}
              </div>
            </div>

            {/* Skills & Preferences */}
            <div className="p-4 bg-white border-2 border-black rounded-lg">
              <h3 className="font-[Jost-Bold] text-lg mb-3">Skills & Roles</h3>
              <div className="space-y-2 text-sm font-[jost-regular]">
                <div>
                  <strong>Skills:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(formData.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-[#D9F99D] border border-black rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Roles:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(formData.roles || []).map((role) => (
                      <span
                        key={role}
                        className="px-2 py-1 bg-[#E3FEAA] border border-black rounded-full text-xs"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            {formData.experiences &&
              formData.experiences.some((exp) => exp.organization) && (
                <div className="p-4 bg-white border-2 border-black rounded-lg">
                  <h3 className="font-[Jost-Bold] text-lg mb-3">Experience</h3>
                  <div className="space-y-3 text-sm font-[jost-regular]">
                    {formData.experiences
                      .filter((exp) => exp.organization)
                      .map((exp, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-black pl-3"
                        >
                          <p className="font-[Jost-Bold]">
                            {exp.role} at {exp.organization}
                          </p>
                          <p className="text-xs text-gray-600">
                            {exp.startDate} - {exp.endDate}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

            {/* Projects */}
            {formData.projects &&
              formData.projects.some((proj) => proj.name) && (
                <div className="p-4 bg-white border-2 border-black rounded-lg">
                  <h3 className="font-[Jost-Bold] text-lg mb-3">Projects</h3>
                  <div className="space-y-3 text-sm font-[jost-regular]">
                    {formData.projects
                      .filter((proj) => proj.name)
                      .map((proj, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-black pl-3"
                        >
                          <p className="font-[Jost-Bold]">{proj.name}</p>
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              {proj.link}
                            </a>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
          </div>

          {/* Terms & Conditions */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 border-2 border-black rounded transition-all ${
                    termsAccepted ? "bg-[#D9F99D]" : "bg-white"
                  } group-hover:scale-110`}
                >
                  {termsAccepted && (
                    <svg
                      className="w-full h-full p-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm font-[jost-regular] text-black">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-[Jost-Bold]"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-[Jost-Bold]"
                >
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.terms && (
              <span className="text-sm text-red-500 font-[jost-regular] block mt-2">
                {errors.terms}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full px-8 py-4 bg-[#D9F99D] border-2 border-black rounded-lg font-[Jost-Bold] text-lg text-black
            transition-all duration-200 relative overflow-hidden
            ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-lg"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                submitting...
              </span>
            ) : (
              "let's go! 🚀"
            )}
          </button>
        </div>

        {/* Doodle Section */}
        <div className="hidden md:block w-64 h-64">
          <AnimatedDoodle
            src="/images/doodles/SwingingDoodle.png"
            alt="Swinging character"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Step7Preview;
