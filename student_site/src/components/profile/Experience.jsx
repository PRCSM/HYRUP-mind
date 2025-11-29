import React from 'react';

function Experience({ experiences = [] }) {
  // const experiences = [
  //   {
  //     organization: 'MaxWells Coperations',
  //     position: 'AI Intern',
  //     timeline: 'Jan 2025 - Feb 2025',
  //     description: 'Manage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your search',
  //   },
  //   {
  //     organization: 'MaxWells Coperations',
  //     position: 'AI Intern',
  //     timeline: 'Jan 2025 - Feb 2025',
  //     description: 'Manage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your search',
  //   },
  // ];

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black mb-4">
        <h2 className="text-lg md:text-[20px] font-[Jost-Bold] text-black">Experience</h2>
      </div>

      <div className="space-y-4 px-0 md:px-7">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] p-4"
          >
            <p className="text-sm font-[Jost-Medium] text-black">
              <span className="font-[Jost-Bold]">Name of Organization :</span> {exp.organization}
            </p>
            <p className="text-sm font-[Jost-Medium] text-black">
              <span className="font-[Jost-Bold]">Position :</span> {exp.position}
            </p>
            <p className="text-sm font-[Jost-Medium] text-black">
              <span className="font-[Jost-Bold]">Timeline :</span> {exp.timeline}
            </p>
            <p className="text-sm font-[Jost-Regular] text-black mt-2">
              <span className="font-[Jost-Bold]">Description :</span> {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
