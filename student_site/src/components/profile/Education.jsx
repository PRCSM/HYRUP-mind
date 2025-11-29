import React from 'react';

function Education({education = {}}) {
  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black mb-4">
        <h2 className="text-lg font-[Jost-Bold] text-black">Education</h2>
      </div>
      
      <div className="space-y-2">
        <p className="text-base font-[Jost-Bold] text-black">{education.college}</p>
        {/* <p className="text-base font-[Jost-Bold] text-black">Deemed University</p> */}
        <p className="text-base font-[Jost-Bold] text-black">{education.degree}</p>
        <p className="text-base font-[Jost-Regular] text-black">{education?.collegeEmail}</p>
        <p className="text-base font-[Jost-Bold] text-black">{education.year}</p>
      </div>
    </div>
  );
}

export default Education;
