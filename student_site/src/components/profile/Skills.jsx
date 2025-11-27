import React from "react";
import { useNavigate } from "react-router-dom";

function Skills() {
  const navigate = useNavigate();

  const handleVerifySkills = () => {
    navigate("/verify-skill");
  };

  const skills = [
    { name: "ADOBE", color: "bg-[#FFD54F]" },
    { name: "REACT", color: "bg-white" },
    { name: "FLUTTER", color: "bg-[#96E7E5]" },
    { name: "FIGMA", color: "bg-[#40FFB9]" },
    { name: "TENSOR FLOW", color: "bg-white" },
    { name: "FIGMA", color: "bg-[#40FFB9]" },
    { name: "TENSOR FLOW", color: "bg-white" },
  ];

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-10">
        <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black">
          <h2 className="text-lg md:text-[24px] font-[Jost-Bold] text-black">
            Skills
          </h2>
        </div>
        <button
          onClick={handleVerifySkills}
          className="bg-[#FFB74D] px-3 md:px-4 py-2 rounded-[5px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
        >
          <span className="text-sm md:text-[16px] font-[Jost-Bold] text-black">
            Verify Skills
          </span>
        </button>
      </div>
      <div className="flex flex-wrap justify-start px-0 md:px-8 items-center gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`${skill.color} px-5 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]`}
          >
            <span className="text-sm font-[Jost-Bold] text-[#00BCD4]">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
