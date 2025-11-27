import React, { useState } from "react";

function ProjectsEdit({ data, onChange }) {
  const [projects, setProjects] = useState(data);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    link: "",
    description: "",
  });

  const handleAddProject = () => {
    if (newProject.name && newProject.link) {
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      onChange(updatedProjects);
      setNewProject({ name: "", link: "", description: "" });
      setIsAdding(false);
    }
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    onChange(updatedProjects);
  };

  const handleEditProject = (index, field, value) => {
    const updatedProjects = projects.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    );
    setProjects(updatedProjects);
    onChange(updatedProjects);
  };

  return (
    <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-[#FFF59D] inline-block px-4 py-1 rounded-[5px] border-2 border-black">
          <h2 className="text-lg md:text-[24px] font-[Jost-Bold] text-black">
            Projects
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

      {/* Add New Project Form */}
      {isAdding && (
        <div className="mb-4 p-4 bg-[#FFF9E3] rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] space-y-3 animate-slideInRight">
          <div>
            <label className="block text-sm font-[Jost-Bold] text-black mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
              placeholder="Project name"
            />
          </div>
          <div>
            <label className="block text-sm font-[Jost-Bold] text-black mb-1">
              Project Link
            </label>
            <input
              type="url"
              value={newProject.link}
              onChange={(e) =>
                setNewProject({ ...newProject, link: e.target.value })
              }
              className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-[Jost-Bold] text-black mb-1">
              Description
            </label>
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] bg-white font-[Jost-Regular] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
              placeholder="Describe your project"
            />
          </div>
          <button
            onClick={handleAddProject}
            className="w-full bg-[#A8FFB3] px-4 py-2 rounded-[8px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
          >
            <span className="text-sm font-[Jost-Bold] text-black">
              Save Project
            </span>
          </button>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] p-4 relative group"
          >
            <button
              onClick={() => handleRemoveProject(index)}
              className="absolute top-2 right-2 bg-[#FFB3B3] px-3 py-1 rounded-[5px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <span className="text-xs font-[Jost-Bold] text-black">
                Remove
              </span>
            </button>

            <div className="space-y-2">
              <div>
                <label className="block text-xs font-[Jost-Bold] text-gray-600 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) =>
                    handleEditProject(index, "name", e.target.value)
                  }
                  className="w-full px-2 py-1 rounded-[5px] border-2 border-black bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-[Jost-Bold] text-gray-600 mb-1">
                  Link
                </label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) =>
                    handleEditProject(index, "link", e.target.value)
                  }
                  className="w-full px-2 py-1 rounded-[5px] border-2 border-black bg-white font-[Jost-Medium] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8C5FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-[Jost-Bold] text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    handleEditProject(index, "description", e.target.value)
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

export default ProjectsEdit;
