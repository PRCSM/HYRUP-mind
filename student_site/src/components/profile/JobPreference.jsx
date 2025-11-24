import React from 'react';

function JobPreference() {
  const preferences = [
    'App Development',
    'UI/UX',
    'Full Stack Development',
    'AI/ML',
  ];

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black mb-4">
        <h2 className="text-lg md:text-[20px] font-[Jost-Bold] text-black">Job Preference</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {preferences.map((pref, index) => (
          <div
            key={index}
            className="bg-[#FFFAE9] px-5 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <span className="text-sm uppercase font-[Jost-Bold] text-[#00BCD4]">{pref}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobPreference;
