import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User, Star, Code, Users } from "lucide-react";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("/porfolioData.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data.aboutContent))
      .catch((err) => console.error("JSON Load Error:", err));
  }, []);

  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-[#0B1220] to-[#0F172A] text-white py-28 px-6 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)]
        bg-[size:40px_40px] opacity-20"
      />

      {/* Soft cyan glow only (remove purple dominance) */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-700/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <User size={18} className="text-cyan-400" />
            <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase">
              About Me
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400">
            Professional Summary
          </h2>

          {/* Tech Focus Badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-cyan-500/10 
            text-cyan-400 px-4 py-2 rounded-full text-sm border border-cyan-400/20">
            Full Stack • React • Node.js • REST APIs
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-20 items-start">

          {/* Text Content */}
          <motion.div
            className="lg:col-span-2 space-y-6 text-gray-300 text-lg leading-relaxed max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {aboutData?.paragraphs?.map((para, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-2 gap-6">
            {aboutData?.highlights?.map((item, i) => {
              const Icon = [Star, Code, Users, User][i % 4];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white/5 backdrop-blur-xl 
                  border border-white/10 rounded-2xl p-6 
                  text-center transition-all duration-300 
                  hover:border-cyan-400/40
                  shadow-lg shadow-cyan-500/10"
                >
                  <Icon className="text-cyan-400 mb-3 w-8 h-8 mx-auto" />

                  <h3 className="text-3xl font-bold text-white mb-1">
                    {item.value || "—"}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;