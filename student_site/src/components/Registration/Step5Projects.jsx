import React from "react";
import FormInput from "./FormInput";
import AnimatedDoodle from "./AnimatedDoodle";

function Step5Projects({ formData, setFormData, errors, setErrors }) {
  const projects = formData.projects || [
    { name: "", link: "", description: "" },
  ];

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [...projects, { name: "", link: "", description: "" }],
    });
  };

  const handleRemoveProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: newProjects });
  };

  const handleChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setFormData({ ...formData, projects: newProjects });

    // Clear error for this field
    if (errors[`proj${index}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`proj${index}_${field}`];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    // Projects are optional, but if filled, name and description are required
    const newErrors = {};

    projects.forEach((proj, index) => {
      const hasAnyField = proj.name || proj.link || proj.description;

      if (hasAnyField) {
        if (!proj.name) {
          newErrors[`proj${index}_name`] = "Project name is required";
        }
        if (!proj.description) {
          newErrors[`proj${index}_description`] = "Description is required";
        }
        // Link is optional
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
            show off your projects 🎨
          </h2>
          <p className="text-base md:text-lg font-[jost-regular] text-gray-600 mb-8">
            built something cool? tell us about it
          </p>

          <div className="space-y-6">
            {projects.map((proj, index) => (
              <div
                key={index}
                className="p-6 bg-white border-2 border-black rounded-lg space-y-4 relative"
              >
                {/* Remove button */}
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="absolute top-4 right-4 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center font-bold"
                  >
                    ×
                  </button>
                )}

                <h3 className="text-lg font-[Jost-Bold] text-black mb-4">
                  Project {index + 1}
                </h3>

                <FormInput
                  label="Project Name"
                  name={`name-${index}`}
                  value={proj.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  error={errors[`proj${index}_name`]}
                  placeholder="what's it called?"
                />

                <FormInput
                  label="Link (optional)"
                  name={`link-${index}`}
                  type="url"
                  value={proj.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  error={errors[`proj${index}_link`]}
                  placeholder="github, live demo, portfolio, etc."
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-[Jost-Bold] text-black">
                    Description
                  </label>
                  <textarea
                    value={proj.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="what does it do? what tech did you use?"
                    rows={4}
                    className={`px-4 py-3 rounded-lg border-2 ${
                      errors[`proj${index}_description`]
                        ? "border-red-500"
                        : "border-black"
                    } bg-white font-[jost-regular] text-black placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-[#D9F99D]
                    transition-all duration-200 resize-none`}
                  />
                  {errors[`proj${index}_description`] && (
                    <span className="text-sm text-red-500 font-[jost-regular]">
                      {errors[`proj${index}_description`]}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Add More Button */}
            <button
              type="button"
              onClick={handleAddProject}
              className="w-full px-6 py-4 bg-[#E3FEAA] border-2 border-black rounded-lg font-[Jost-Bold] text-black hover:bg-[#D9F99D] transition-all duration-200 hover:scale-105"
            >
              + Add Another Project
            </button>
          </div>
        </div>

        {/* Doodle Section */}
        <div className="hidden md:block w-64 h-64">
          <AnimatedDoodle
            src="/images/doodles/PlantDoodle.png"
            alt="Plant character"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Step5Projects;
