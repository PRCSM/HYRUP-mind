import React from "react";
import FormInput from "./FormInput";
import AnimatedDoodle from "./AnimatedDoodle";

function Step4Experience({ formData, setFormData, errors, setErrors }) {
  const experiences = formData.experiences || [
    { organization: "", role: "", startDate: "", endDate: "", description: "" },
  ];

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...experiences,
        {
          organization: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: newExperiences });
  };

  const handleChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setFormData({ ...formData, experiences: newExperiences });

    // Clear error for this field
    if (errors[`exp${index}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`exp${index}_${field}`];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    // Experience is optional, but if filled, all fields are required
    const newErrors = {};

    experiences.forEach((exp, index) => {
      const hasAnyField =
        exp.organization ||
        exp.role ||
        exp.startDate ||
        exp.endDate ||
        exp.description;

      if (hasAnyField) {
        if (!exp.organization) {
          newErrors[`exp${index}_organization`] = "Organization is required";
        }
        if (!exp.role) {
          newErrors[`exp${index}_role`] = "Role is required";
        }
        if (!exp.startDate) {
          newErrors[`exp${index}_startDate`] = "Start date is required";
        }
        if (!exp.endDate) {
          newErrors[`exp${index}_endDate`] = "End date is required";
        }
        if (!exp.description) {
          newErrors[`exp${index}_description`] = "Description is required";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Form Section */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-4xl font-[inter-extra] text-black mb-2">
            flex your experience 🚀
          </h2>
          <p className="text-base md:text-lg font-[jost-regular] text-gray-600 mb-8">
            or skip if you're just starting out
          </p>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="p-6 bg-white border-2 border-black rounded-lg space-y-4 relative"
              >
                {/* Remove button */}
                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="absolute top-4 right-4 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center font-bold"
                  >
                    ×
                  </button>
                )}

                <h3 className="text-lg font-[Jost-Bold] text-black mb-4">
                  Experience {index + 1}
                </h3>

                <FormInput
                  label="Organization"
                  name={`organization-${index}`}
                  value={exp.organization}
                  onChange={(e) =>
                    handleChange(index, "organization", e.target.value)
                  }
                  error={errors[`exp${index}_organization`]}
                  placeholder="company or organization name"
                />

                <FormInput
                  label="Role"
                  name={`role-${index}`}
                  value={exp.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                  error={errors[`exp${index}_role`]}
                  placeholder="your position"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Start Date"
                    name={`startDate-${index}`}
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleChange(index, "startDate", e.target.value)
                    }
                    error={errors[`exp${index}_startDate`]}
                  />

                  <FormInput
                    label="End Date"
                    name={`endDate-${index}`}
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleChange(index, "endDate", e.target.value)
                    }
                    error={errors[`exp${index}_endDate`]}
                    placeholder="or 'Present'"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-[Jost-Bold] text-black">
                    Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="what did you do? what did you learn?"
                    rows={4}
                    className={`px-4 py-3 rounded-lg border-2 ${
                      errors[`exp${index}_description`]
                        ? "border-red-500"
                        : "border-black"
                    } bg-white font-[jost-regular] text-black placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-[#D9F99D]
                    transition-all duration-200 resize-none`}
                  />
                  {errors[`exp${index}_description`] && (
                    <span className="text-sm text-red-500 font-[jost-regular]">
                      {errors[`exp${index}_description`]}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Add More Button */}
            <button
              type="button"
              onClick={handleAddExperience}
              className="w-full px-6 py-4 bg-[#E3FEAA] border-2 border-black rounded-lg font-[Jost-Bold] text-black hover:bg-[#D9F99D] transition-all duration-200 hover:scale-105"
            >
              + Add Another Experience
            </button>
          </div>
        </div>

        {/* Doodle Section */}
        <div className="hidden md:block w-64 h-64">
          <AnimatedDoodle
            src="/images/doodles/SprintingDoodle.png"
            alt="Sprinting character"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Step4Experience;
