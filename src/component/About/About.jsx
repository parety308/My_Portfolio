import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User, Star, Code, Users } from "lucide-react"; // add icons

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("/porfolioData.json")
      .then((res) => res.json())
      .then((data) => {
        setAboutData(data.aboutContent);
      })
      .catch((err) => console.error("JSON Load Error:", err));
  }, []);

  return (
    <section
      id="about"
      className="relative bg-[#0B1220] text-white py-24 px-6 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-800/20 blur-3xl animate-pulse -z-10" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-800/20 blur-3xl animate-pulse -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <User size={20} className="text-cyan-400" />
            <p className="text-cyan-400 text-sm tracking-widest uppercase">
              About Me
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg">
            Get to know me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-16">
          {/* Paragraph Section */}
          <div className="md:col-span-2 space-y-6 text-gray-400 text-lg leading-relaxed">
            {aboutData?.paragraphs?.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-2 gap-6">
            {aboutData?.highlights?.map((item, i) => {
              // select an icon for variety
              const Icon = [Star, Code, Users, User][i % 4];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{
                    scale: 1.07,
                    boxShadow:
                      "0 0 25px rgba(139,92,246,0.5), 0 0 35px rgba(6,182,212,0.4)",
                  }}
                  className="bg-[#111827]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300"
                >
                  <Icon className="text-cyan-400 mb-2 w-8 h-8" />
                  <h3 className="text-3xl font-bold text-cyan-400 mb-1 drop-shadow-lg">
                    {item.value}
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