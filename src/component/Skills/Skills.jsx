import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skillsData, setSkillsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/porfolioData.json")
      .then((res) => res.json())
      .then((data) => setSkillsData(data.skills))
      .catch((err) => console.error("Failed to load skills:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center text-white">Loading...</p>;

  return (
    <section
      id="skills"
      className="bg-[#0B1220] text-white py-24 px-6"
    >
      {/* ✅ SAME CONTAINER AS ABOUT SECTION */}
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-cyan-400 text-sm tracking-widest uppercase mb-4">
            {"</> Skills"}
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Technologies I work with
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-16">
          {Object.entries(skillsData).map(
            ([category, skills], index) => (
              <motion.div
                key={category}
                className="bg-[#111827]/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl capitalize mb-6 text-cyan-400">
                  {category}
                </h3>

                <div className="space-y-5">
                  {skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2 text-sm text-gray-300">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;