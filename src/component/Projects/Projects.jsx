import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTech, setActiveTech] = useState("All");
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
  }, [selectedProject]);

  // Mouse spotlight (soft cyan)
  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    fetch("/porfolioData.json")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects))
      .catch((err) => console.error("Failed to load projects:", err))
      .finally(() => setLoading(false));
  }, []);

  const techOptions = useMemo(() => {
    const allTech = projects.flatMap((p) => p.techStack);
    return ["All", ...new Set(allTech)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesTech =
        activeTech === "All" || project.techStack.includes(activeTech);
      return matchesSearch && matchesTech;
    });
  }, [projects, search, activeTech]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-center py-20 text-gray-400">
        Loading projects...
      </div>
    );
  }

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-[#0b0f19] text-white px-6 py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#111827] -z-20" />

      {/* Cyan spotlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,211,238,0.08), transparent 80%)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400">
            Featured Work
          </h2>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-16">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 
              focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
          />

          <select
            value={activeTech}
            onChange={(e) => setActiveTech(e.target.value)}
            className="px-4 py-3 rounded-xl bg-[#111827] border border-cyan-400/20 focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            {techOptions.map((tech, i) => (
              <option key={i}>{tech}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group bg-[#0f172a]/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-4 cursor-pointer shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-400 transition duration-500"
              onClick={() => setSelectedProject(project)}
            >
              {/* FULL WIDTH IMAGE */}
              {project.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-56 object-cover 
                      transition-transform duration-700 
                      group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-cyan-500/0 
                    group-hover:bg-cyan-500/10 transition duration-500"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {project.name}
                </h3>

                <p className="text-gray-400 text-sm mb-5 line-clamp-3">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full 
                        bg-cyan-500/10 text-cyan-300 
                        border border-cyan-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 text-sm font-medium">
                    View Details
                  </span>
                  <motion.span
                    className="text-cyan-400 text-lg"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md 
              flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-[#0f172a] border border-white/10 
                max-w-3xl w-full rounded-2xl p-8 
                relative shadow-2xl shadow-cyan-500/20"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                {selectedProject.name}
              </h3>

              <p className="mb-6 text-gray-300">
                {selectedProject.overview}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full 
                      bg-cyan-500/10 text-cyan-300 
                      border border-cyan-400/20"
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
                    bg-cyan-500 hover:bg-cyan-400 
                    text-black transition shadow-lg shadow-cyan-500/40"
                >
                  Live Demo
                </a>

                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-lg 
                    border border-cyan-400 text-cyan-400 
                    hover:bg-cyan-400 hover:text-black transition"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;