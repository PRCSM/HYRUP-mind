import React, { useState, useRef } from "react";

function ProfileHeaderEdit({ data, onChange }) {
  const [localData, setLocalData] = useState(data);
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    onChange(newData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-[140px] h-[140px] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden bg-white flex-shrink-0">
                <img
                  src={localData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[10px]"
              >
                <span className="text-white text-sm font-[Jost-Bold]">
                  Change Photo
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-[Jost-Bold] text-black mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={localData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[inter-extra] text-xl uppercase focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            />
          </div>

          {/* About Input */}
          <div>
            <label className="block text-sm font-[Jost-Bold] text-black mb-2">
              About
            </label>
            <textarea
              value={localData.about}
              onChange={(e) => handleChange("about", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[jost-semibold] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:gap-4">
        {/* Left Column - Profile Picture */}
        <div className="flex flex-col gap-4">
          <div className="relative group">
            <div className="w-[240px] h-[240px] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden bg-white">
              <img
                src={localData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[10px]"
            >
              <span className="text-white text-base font-[Jost-Bold]">
                Change Photo
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Right Column - Name and About */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Name Section */}
          <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-6">
            <label className="block text-sm font-[Jost-Bold] text-black mb-3">
              Full Name
            </label>
            <input
              type="text"
              value={localData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[inter-extra] text-2xl uppercase focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            />
          </div>

          {/* About Section */}
          <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-6">
            <label className="block text-sm font-[Jost-Bold] text-black mb-3">
              About
            </label>
            <textarea
              value={localData.about}
              onChange={(e) => handleChange("about", e.target.value)}
              rows={5}
              className="w-full px-4 py-3 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[jost-semibold] text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderEdit;
