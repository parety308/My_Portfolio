import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTech, setActiveTech] = useState("All");
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Load projects
  useEffect(() => {
    fetch("/porfolioData.json")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects))
      .catch((err) => console.error("Failed to load projects:", err))
      .finally(() => setLoading(false));
  }, []);

  // Get tech options dynamically
  const techOptions = useMemo(() => {
    const allTech = projects.flatMap((p) => p.techStack);
    return ["All", ...new Set(allTech)];
  }, [projects]);

  // Filtered projects based on search & tech
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
      const matchesTech = activeTech === "All" || project.techStack.includes(activeTech);
      return matchesSearch && matchesTech;
    });
  }, [projects, search, activeTech]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-center py-20 text-gray-400">
        Loading projects...
      </div>
    );
  }

  return (
    <div id="projects" className="relative min-h-screen text-white overflow-hidden bg-[#0b0f19] px-4 py-16">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-pulse opacity-30" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_#1e1b4b,_#0f172a_40%)]" />
      
      {/* Mouse Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139,92,246,0.15), transparent 80%)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-12 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-cyan-400 to-purple-500">
          Featured Work
        </h2>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-[#111827] border border-purple-500/20 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          <select
            value={activeTech}
            onChange={(e) => setActiveTech(e.target.value)}
            className="px-4 py-3 rounded-xl bg-[#111827] border border-purple-500/20 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            {techOptions.map((tech, i) => (
              <option key={i}>{tech}</option>
            ))}
          </select>
        </div>

        {/* Project Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              className="group bg-[#0f172a]/80 backdrop-blur-xl 
                border border-purple-500/20 
                rounded-2xl p-4 cursor-pointer 
                shadow-lg hover:shadow-purple-500/50 
                hover:border-purple-400 transition duration-500"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-xl mb-4 border border-purple-500/20"
                />
              )}

              <h3 className="text-xl font-semibold mb-2 
                text-transparent bg-clip-text 
                bg-gradient-to-r from-cyan-400 to-purple-500">
                {project.name}
              </h3>

              <p className="text-gray-400 text-sm mb-4">{project.shortDescription}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full 
                      bg-purple-500/10 text-cyan-300 
                      border border-cyan-400/30 
                      group-hover:shadow-cyan-400/40 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Neon Arrow Button */}
              <motion.div
                className="mt-2 text-cyan-400 font-bold text-lg flex items-center gap-2 group-hover:text-purple-400"
                whileHover={{ x: 6 }}
              >
                View Project <span className="text-2xl animate-pulse">→</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-[#0f172a] border border-purple-500/30 
                  max-w-3xl w-full rounded-2xl p-8 
                  relative max-h-[90vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 text-xl"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>

                <h3 className="text-2xl font-bold mb-4 
                  text-transparent bg-clip-text 
                  bg-gradient-to-r from-cyan-400 to-purple-500">
                  {selectedProject.name}
                </h3>

                <p className="mb-6 text-gray-300">{selectedProject.overview}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full 
                        bg-purple-500/10 text-purple-300 
                        border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-lg 
                      bg-gradient-to-r from-cyan-500 to-purple-600 
                      hover:scale-105 transition transform 
                      shadow-lg hover:shadow-cyan-500/40"
                  >
                    Live Demo
                  </a>

                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-lg 
                      bg-gradient-to-r from-purple-600 to-pink-600 
                      hover:scale-105 transition transform 
                      shadow-lg hover:shadow-purple-500/40"
                  >
                    GitHub
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;