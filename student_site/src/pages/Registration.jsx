import React, { useState, useRef } from "react";
import PageReveal from "../components/common/PageReveal";
import ProgressBar from "../components/Registration/ProgressBar";
import Step1BasicInfo from "../components/Registration/Step1BasicInfo";
import Step2CollegeInfo from "../components/Registration/Step2CollegeInfo";
import Step3SkillsPrefs from "../components/Registration/Step3SkillsPrefs";
import Step4Experience from "../components/Registration/Step4Experience";
import Step5Projects from "../components/Registration/Step5Projects";
import Step6Documents from "../components/Registration/Step6Documents";
import Step7Preview from "../components/Registration/Step7Preview";

function Registration() {
  const [showReveal, setShowReveal] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    phone: "",
    email: "",
    // Step 2
    college: "",
    collegeType: "",
    degree: "",
    year: "",
    collegeEmail: "",
    // Step 3
    skills: [],
    preferences: [],
    roles: [],
    // Step 4
    experiences: [
      {
        organization: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    // Step 5
    projects: [{ name: "", link: "", description: "" }],
    // Step 6
    profilePicture: null,
    resume: null,
    resumeName: "",
    // Step 7
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [slideDirection, setSlideDirection] = useState("right");

  const stepRefs = {
    1: useRef(),
    2: useRef(),
    3: useRef(),
    4: useRef(),
    5: useRef(),
    6: useRef(),
    7: useRef(),
  };

  const validateCurrentStep = () => {
    const stepComponents = {
      1: Step1BasicInfo,
      2: Step2CollegeInfo,
      3: Step3SkillsPrefs,
      4: Step4Experience,
      5: Step5Projects,
      6: Step6Documents,
      7: Step7Preview,
    };

    // Manual validation for each step
    if (currentStep === 1) {
      const newErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;

      if (!formData.name || formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (currentStep === 2) {
      const newErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!formData.college || formData.college.trim().length === 0) {
        newErrors.college = "Please select your college";
      }
      if (!formData.collegeType) {
        newErrors.collegeType = "Please select college type";
      }
      if (!formData.degree) {
        newErrors.degree = "Please select your degree";
      }
      if (!formData.year) {
        newErrors.year = "Please select your year";
      }
      if (!formData.collegeEmail) {
        newErrors.collegeEmail = "College email is required";
      } else if (!emailRegex.test(formData.collegeEmail)) {
        newErrors.collegeEmail = "Please enter a valid email address";
      } else if (formData.collegeEmail === formData.email) {
        newErrors.collegeEmail =
          "College email must be different from personal email";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (currentStep === 3) {
      const newErrors = {};

      if (!formData.skills || formData.skills.length === 0) {
        newErrors.skills = "Please select at least one skill";
      }
      if (!formData.preferences || formData.preferences.length === 0) {
        newErrors.preferences = "Please select at least one preference";
      }
      if (!formData.roles || formData.roles.length === 0) {
        newErrors.roles = "Please select at least one role";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (currentStep === 4) {
      const newErrors = {};
      formData.experiences.forEach((exp, index) => {
        const hasAnyField =
          exp.organization ||
          exp.role ||
          exp.startDate ||
          exp.endDate ||
          exp.description;

        if (hasAnyField) {
          if (!exp.organization)
            newErrors[`exp${index}_organization`] = "Organization is required";
          if (!exp.role) newErrors[`exp${index}_role`] = "Role is required";
          if (!exp.startDate)
            newErrors[`exp${index}_startDate`] = "Start date is required";
          if (!exp.endDate)
            newErrors[`exp${index}_endDate`] = "End date is required";
          if (!exp.description)
            newErrors[`exp${index}_description`] = "Description is required";
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (currentStep === 5) {
      const newErrors = {};
      formData.projects.forEach((proj, index) => {
        const hasAnyField = proj.name || proj.link || proj.description;

        if (hasAnyField) {
          if (!proj.name)
            newErrors[`proj${index}_name`] = "Project name is required";
          if (!proj.description)
            newErrors[`proj${index}_description`] = "Description is required";
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (currentStep === 6) {
      const newErrors = {};

      if (!formData.profilePicture) {
        newErrors.profilePicture = "Profile picture is required";
      }

      if (!formData.resume) {
        newErrors.resume = "Resume is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (currentStep === 7) {
      const newErrors = {};
      if (!formData.termsAccepted) {
        newErrors.terms = "You must accept the terms and conditions";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setSlideDirection("right");
      setCurrentStep((prev) => Math.min(prev + 1, 7));
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setSlideDirection("left");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSkip = () => {
    // Only steps 4 and 5 can be skipped (Experience and Projects)
    if (currentStep >= 4 && currentStep <= 5) {
      setSlideDirection("right");
      setCurrentStep((prev) => prev + 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Registration successful! 🎉");
    // Here you would typically send data to your backend
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      setFormData,
      errors,
      setErrors,
    };

    switch (currentStep) {
      case 1:
        return <Step1BasicInfo {...stepProps} ref={stepRefs[1]} />;
      case 2:
        return <Step2CollegeInfo {...stepProps} ref={stepRefs[2]} />;
      case 3:
        return <Step3SkillsPrefs {...stepProps} ref={stepRefs[3]} />;
      case 4:
        return <Step4Experience {...stepProps} ref={stepRefs[4]} />;
      case 5:
        return <Step5Projects {...stepProps} ref={stepRefs[5]} />;
      case 6:
        return <Step6Documents {...stepProps} ref={stepRefs[6]} />;
      case 7:
        return (
          <Step7Preview
            {...stepProps}
            onSubmit={handleSubmit}
            ref={stepRefs[7]}
          />
        );
      default:
        return null;
    }
  };

  const canSkip = currentStep >= 4 && currentStep <= 6;

  return (
    <div className="h-screen overflow-hidden w-screen relative bg-[#FFFAE9]">
      {/* Page Reveal Animation */}
      {showReveal && <PageReveal onComplete={() => setShowReveal(false)} />}

      {/* Main Content */}
      <div
        className={`w-full h-screen flex flex-col transition-opacity duration-100 ${
          showReveal ? "opacity-100" : "opacity-100"
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 z-40 bg-[#FFFAE9] border-b-2 border-black">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <h1 className="text-xl md:text-2xl font-[inter-bold] text-amber-600">
              HYRUP.IN
            </h1>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-shrink-0 max-w-6xl mx-auto w-full px-4 py-3">
          <ProgressBar currentStep={currentStep} totalSteps={7} />
        </div>

        {/* Step Content with Animation - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scroll max-w-6xl mx-auto w-full px-4 pb-8">
          <div
            key={currentStep}
            className={`animate-slideIn${
              slideDirection === "right" ? "Right" : "Left"
            }`}
          >
            {renderStep()}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex-shrink-0 bg-[#FFFAE9] border-t-2 border-black py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center gap-4">
              {/* Back Button */}
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-3 border-2 border-black rounded-lg font-[Jost-Bold] text-black
                transition-all duration-200 ${
                  currentStep === 1
                    ? "opacity-50 cursor-not-allowed bg-gray-200"
                    : "bg-white hover:bg-[#E3FEAA] hover:scale-105"
                }`}
              >
                ← Back
              </button>

              {/* Skip Button (only for steps 4-6) */}
              {canSkip && (
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 border-2 border-dashed border-gray-400 rounded-lg font-[Jost-Bold] text-gray-600
                  hover:border-black hover:text-black transition-all duration-200"
                >
                  Skip for now
                </button>
              )}

              {/* Next/Submit Button */}
              {currentStep < 7 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-[#D9F99D] border-2 border-black rounded-lg font-[Jost-Bold] text-black
                  hover:scale-105 transition-all duration-200 hover:shadow-lg ml-auto"
                >
                  Next →
                </button>
              ) : (
                <div className="ml-auto" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
