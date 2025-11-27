import React, { useState } from "react";

function EducationEdit({ data, onChange }) {
  const [localData, setLocalData] = useState(data);

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    onChange(newData);
  };

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black mb-4">
        <h2 className="text-lg font-[Jost-Bold] text-black">Education</h2>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-[Jost-Bold] text-black mb-1">
            University Name
          </label>
          <input
            type="text"
            value={localData.university}
            onChange={(e) => handleChange("university", e.target.value)}
            className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            placeholder="Enter university name"
          />
        </div>

        <div>
          <label className="block text-sm font-[Jost-Bold] text-black mb-1">
            University Type
          </label>
          <input
            type="text"
            value={localData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            placeholder="e.g., Deemed University"
          />
        </div>

        <div>
          <label className="block text-sm font-[Jost-Bold] text-black mb-1">
            Degree
          </label>
          <input
            type="text"
            value={localData.degree}
            onChange={(e) => handleChange("degree", e.target.value)}
            className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            placeholder="e.g., Btech, MBA"
          />
        </div>

        <div>
          <label className="block text-sm font-[Jost-Bold] text-black mb-1">
            Email
          </label>
          <input
            type="email"
            value={localData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Regular] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            placeholder="your.email@university.edu"
          />
        </div>

        <div>
          <label className="block text-sm font-[Jost-Bold] text-black mb-1">
            Graduation Year
          </label>
          <input
            type="text"
            value={localData.graduationYear}
            onChange={(e) => handleChange("graduationYear", e.target.value)}
            className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Bold] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            placeholder="2027"
          />
        </div>
      </div>
    </div>
  );
}

export default EducationEdit;
