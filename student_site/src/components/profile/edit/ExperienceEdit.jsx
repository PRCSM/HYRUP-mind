import React, { useState } from "react";

function ExperienceEdit({ data, onChange }) {
  const [experiences, setExperiences] = useState(data);
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState({
    organization: "",
    position: "",
    timeline: "",
    description: "",
  });

  const handleAddExperience = () => {
    if (newExperience.organization && newExperience.position) {
      const updatedExperiences = [...experiences, newExperience];
      setExperiences(updatedExperiences);
      onChange(updatedExperiences);
      setNewExperience({
        organization: "",
        position: "",
        timeline: "",
        description: "",
      });
      setIsAdding(false);
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  const handleEditExperience = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black">
          <h2 className="text-lg md:text-[20px] font-[Jost-Bold] text-black">
            Experience
          </h2>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#A8FFB3] px-3 py-1 rounded-[5px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
        >
          <span className="text-sm font-[Jost-Bold] text-black">
            {isAdding ? "Cancel" : "+ Add"}
          </span>
        </button>
      </div>

      {/* Add New Experience Form */}
      {isAdding && (
        <div className="mb-4 p-4 bg-[#FFF9E3] rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] space-y-3 animate-slideInRight">
          <div>
            <label className="block text-sm font-[Jost-Bold] text-black mb-1">
              Organization Name
            </label>
            <input
              type="text"
              value={newExperience.organization}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  organization: e.target.value,
                })
              }
              className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
              placeholder="Company name"
            />
          </div>
          <div>
            <label className="block text-sm font-[Jost-Bold] text-black mb-1">
              Position
            </label>
            <input
              type="text"
              value={newExperience.position}
              onChange={(e) =>
                setNewExperience({ ...newExperience, position: e.target.value })
              }
              className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
              placeholder="Your role"
            />
          </div>
          <div>
            <label className="block text-sm font-[Jost-Bold] text-black mb-1">
              Timeline
            </label>
            <input
              type="text"
              value={newExperience.timeline}
              onChange={(e) =>
                setNewExperience({ ...newExperience, timeline: e.target.value })
              }
              className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
              placeholder="e.g., Jan 2025 - Feb 2025"
            />
          </div>
          <div>
            <label className="block text-sm font-[Jost-Bold] text-black mb-1">
              Description
            </label>
            <textarea
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Regular] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
              placeholder="Describe your responsibilities"
            />
          </div>
          <button
            onClick={handleAddExperience}
            className="w-full bg-[#A8FFB3] px-4 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
          >
            <span className="text-sm font-[Jost-Bold] text-black">
              Save Experience
            </span>
          </button>
        </div>
      )}

      {/* Experiences List */}
      <div className="space-y-4 px-0 md:px-7">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] p-4 relative group"
          >
            <button
              onClick={() => handleRemoveExperience(index)}
              className="absolute top-2 right-2 bg-[#FFB3B3] px-3 py-1 rounded-[5px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <span className="text-xs font-[Jost-Bold] text-black">
                Remove
              </span>
            </button>

            <div className="space-y-2">
              <div>
                <label className="block text-xs font-[Jost-Bold] text-gray-600 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  value={exp.organization}
                  onChange={(e) =>
                    handleEditExperience(index, "organization", e.target.value)
                  }
                  className="w-full px-2 py-1 rounded-[5px] border-2 border-black bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-[Jost-Bold] text-gray-600 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    handleEditExperience(index, "position", e.target.value)
                  }
                  className="w-full px-2 py-1 rounded-[5px] border-2 border-black bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-[Jost-Bold] text-gray-600 mb-1">
                  Timeline
                </label>
                <input
                  type="text"
                  value={exp.timeline}
                  onChange={(e) =>
                    handleEditExperience(index, "timeline", e.target.value)
                  }
                  className="w-full px-2 py-1 rounded-[5px] border-2 border-black bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-[Jost-Bold] text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    handleEditExperience(index, "description", e.target.value)
                  }
                  rows={2}
                  className="w-full px-2 py-1 rounded-[5px] border-2 border-black bg-white font-[Jost-Regular] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceEdit;
