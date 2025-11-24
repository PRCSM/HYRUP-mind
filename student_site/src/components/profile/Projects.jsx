import React from 'react';

function Projects() {
  const projects = [
    {
      name: 'MaxWells Coperations',
      link: 'https://amxa.com/pro1',
      description: 'Manage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your search',
    },
    {
      name: 'MaxWells Coperations',
      link: 'https://amxa.com/pro1',
      description: 'Manage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your searchManage the qualifications or preference used to hide jobs from your search',
    },
  ];

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black mb-4">
        <h2 className="text-lg md:text-[24px] font-[Jost-Bold] text-black">Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] p-4"
          >
            <p className="text-sm font-[Jost-Medium] text-black">
              <span className="font-[Jost-Bold]">Name of Project :</span> {project.name}
            </p>
            <p className="text-sm font-[Jost-Medium] text-black">
              <span className="font-[Jost-Bold]">Link :</span>{' '}
              <a href={project.link} className="text-blue-600 hover:underline">
                "{project.link}"
              </a>
            </p>
            <p className="text-sm font-[Jost-Regular] text-black mt-2">
              <span className="font-[Jost-Bold]">Description :</span> {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
