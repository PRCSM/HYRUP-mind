import React, { useState } from "react";

function SkillsEdit({ data, onChange }) {
  const [skills, setSkills] = useState(data);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      // All new skills are white by default until verified
      const updatedSkills = [
        ...skills,
        { name: newSkill.toUpperCase(), color: "bg-white" },
      ];
      setSkills(updatedSkills);
      onChange(updatedSkills);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    onChange(updatedSkills);
  };

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black mb-4">
        <h2 className="text-lg md:text-[24px] font-[Jost-Bold] text-black">
          Skills
        </h2>
      </div>

      {/* Add New Skill */}
      <div className="mb-6 p-4 bg-[#FFF9E3] rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
        <label className="block text-sm font-[Jost-Bold] text-black mb-2">
          Add New Skill
        </label>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
            className="flex-1 px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            placeholder="Enter skill name"
          />
          <button
            onClick={handleAddSkill}
            className="bg-[#A8FFB3] px-4 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
          >
            <span className="text-sm font-[Jost-Bold] text-black">Add</span>
          </button>
        </div>
        <p className="text-xs font-[Jost-Regular] text-gray-600 mt-2">
          💡 New skills will appear in white. Verify them to unlock different
          colors!
        </p>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap justify-start px-0 md:px-8 items-center gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`${skill.color} px-5 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] relative group`}
          >
            <span className="text-sm font-[Jost-Bold] text-[#00BCD4]">
              {skill.name}
            </span>
            <button
              onClick={() => handleRemoveSkill(index)}
              className="absolute -top-2 -right-2 bg-[#FFB3B3] w-6 h-6 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110"
            >
              <span className="text-xs font-bold text-black">×</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsEdit;
