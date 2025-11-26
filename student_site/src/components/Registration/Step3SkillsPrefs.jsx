import React from "react";
import MultiSelect from "./MultiSelect";
import AnimatedDoodle from "./AnimatedDoodle";

const SKILLS = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "React",
  "Node.js",
  "Angular",
  "Vue.js",
  "Django",
  "Flask",
  "Spring Boot",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Git",
  "Machine Learning",
  "Data Science",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "Content Writing",
  "Digital Marketing",
  "SEO",
  "Project Management",
];

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "UI/UX Designer",
  "Product Designer",
  "Graphic Designer",
  "Product Manager",
  "Project Manager",
  "Business Analyst",
  "Content Writer",
  "Digital Marketer",
  "QA Engineer",
];

function Step3SkillsPrefs({ formData, setFormData, errors, setErrors }) {
  const handleSkillsChange = (skills) => {
    setFormData({ ...formData, skills });
    if (errors.skills) {
      setErrors({ ...errors, skills: "" });
    }
  };

  const handleRolesChange = (roles) => {
    setFormData({ ...formData, roles });
    if (errors.roles) {
      setErrors({ ...errors, roles: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.skills || formData.skills.length < 5) {
      newErrors.skills = "Please select at least 5 skills";
    }

    if (!formData.roles || formData.roles.length < 2) {
      newErrors.roles = "Please select at least 2 roles";
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
            show us what you're good at 💪
          </h2>
          <p className="text-base md:text-lg font-[jost-regular] text-gray-600 mb-8">
            your skills and roles you're interested in
          </p>

          <div className="space-y-6">
            {/* Skills */}
            <MultiSelect
              label="Your Skills"
              options={SKILLS}
              selected={formData.skills || []}
              onChange={handleSkillsChange}
              maxItems={10}
              placeholder="select at least 5 skills"
              required
              error={errors.skills}
            />

            {/* Roles */}
            <MultiSelect
              label="Roles You're Interested In"
              options={ROLES}
              selected={formData.roles || []}
              onChange={handleRolesChange}
              placeholder="select at least 2 roles"
              required
              error={errors.roles}
            />
          </div>
        </div>

        {/* Doodle Section */}
        <div className="hidden md:block w-64 h-64">
          <AnimatedDoodle
            src="/images/doodles/MeditatingDoodle.png"
            alt="Meditating character"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Step3SkillsPrefs;
