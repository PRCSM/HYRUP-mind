import React, { useState } from "react";

function JobPreferenceEdit({ data, onChange }) {
  const [preferences, setPreferences] = useState(data);
  const [newPreference, setNewPreference] = useState("");

  const handleAddPreference = () => {
    if (newPreference.trim()) {
      const updatedPreferences = [...preferences, newPreference];
      setPreferences(updatedPreferences);
      onChange(updatedPreferences);
      setNewPreference("");
    }
  };

  const handleRemovePreference = (index) => {
    const updatedPreferences = preferences.filter((_, i) => i !== index);
    setPreferences(updatedPreferences);
    onChange(updatedPreferences);
  };

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black mb-4">
        <h2 className="text-lg md:text-[20px] font-[Jost-Bold] text-black">
          Job Preference
        </h2>
      </div>

      {/* Add New Preference */}
      <div className="mb-4 p-4 bg-[#FFF9E3] rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
        <label className="block text-sm font-[Jost-Bold] text-black mb-2">
          Add New Preference
        </label>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newPreference}
            onChange={(e) => setNewPreference(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddPreference()}
            className="flex-1 px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            placeholder="e.g., Web Development"
          />
          <button
            onClick={handleAddPreference}
            className="bg-[#A8FFB3] px-4 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
          >
            <span className="text-sm font-[Jost-Bold] text-black">Add</span>
          </button>
        </div>
      </div>

      {/* Preferences List */}
      <div className="flex flex-wrap gap-3">
        {preferences.map((pref, index) => (
          <div
            key={index}
            className="bg-[#FFFAE9] px-5 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] relative group"
          >
            <span className="text-sm uppercase font-[Jost-Bold] text-[#00BCD4]">
              {pref}
            </span>
            <button
              onClick={() => handleRemovePreference(index)}
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

export default JobPreferenceEdit;
