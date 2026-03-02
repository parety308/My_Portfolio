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

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-[#0F172A] to-[#111827] py-28 text-center text-gray-400">
        Loading skills...
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="relative bg-gradient-to-b from-[#0F172A] to-[#111827] 
      text-white py-28 px-6 overflow-hidden"
    >
      {/* Different background pattern from About */}
      <div className="absolute inset-0 
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:100%_40px] opacity-20"
      />

      {/* Cyan glow accent (different from About purple dominance) */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] 
        bg-cyan-700/20 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-4">
            {"</> Skills"}
          </p>

          <h2 className="text-4xl md:text-5xl font-bold 
            bg-gradient-to-r from-cyan-400 to-teal-400 
            bg-clip-text text-transparent"
          >
            Technologies I Work With
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-16">
          {Object.entries(skillsData).map(
            ([category, skills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative bg-white/5 backdrop-blur-xl 
                border border-white/10 rounded-2xl p-8 
                transition-all duration-300 hover:border-cyan-400/40"
              >
                {/* Soft hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 
                  group-hover:opacity-100 transition duration-500
                  bg-gradient-to-br from-cyan-500/10 to-teal-500/10 blur-xl"
                />

                <h3 className="text-xl capitalize mb-8 text-cyan-400 font-semibold">
                  {category}
                </h3>

                <div className="space-y-6">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between mb-2 text-sm text-gray-300">
                        <span>{skill.name}</span>
                        <span className="text-cyan-400 font-medium">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-2.5 rounded-full 
                          bg-gradient-to-r from-cyan-400 to-teal-500 
                          shadow-lg shadow-cyan-500/30"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Optional subtle divider bottom */}
        <div className="mt-20 w-full h-px 
          bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        />
      </div>
    </section>
  );
};

export default Skills;