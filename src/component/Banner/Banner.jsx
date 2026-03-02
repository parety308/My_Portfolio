import { motion } from "framer-motion";
import { Download, ArrowDown} from "lucide-react";
import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Banner = () => {
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    fetch("/porfolioData.json")
      .then((res) => res.json())
      .then((data) => {
        setPersonalInfo(data.personalInfo);
      })
      .catch((err) => console.error("JSON Load Error:", err));
  }, []);

  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const top = el.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#020617]">
        Loading...
      </div>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#020617] text-white pt-28 overflow-hidden"
    >
      {/* Background Neon Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-teal-400 font-medium mb-3 text-sm tracking-widest uppercase">
              Hello, I'm
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight
              text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-purple-500 drop-shadow-lg">
              {personalInfo.name}
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold mb-6
              text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 drop-shadow-md">
              {personalInfo.title}
            </h2>

            <p className="text-gray-400 text-lg mb-6 max-w-lg leading-relaxed">
              {personalInfo.tagline}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href={personalInfo.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-500 text-black font-medium shadow-lg hover:scale-105 hover:shadow-teal-400/50 transition-transform duration-300"
              >
                <Download size={18} />
                Download Resume
              </a>

              <button
                onClick={() => handleScroll("#projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-600 text-white font-medium hover:border-teal-400 hover:text-teal-400 hover:scale-105 transition-all duration-300"
              >
                View Projects
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              {personalInfo.socials.github && (
                <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition">
                 <FaGithub size={24}/>
                </a>
              )}
              {personalInfo.socials.linkedin && (
                <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-blue-500 hover:text-white transition">
                  <FaLinkedin size={24} />
                </a>
              )}
              {personalInfo.socials.facebook && (
                <a href={personalInfo.socials.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 hover:text-white transition">
                  <FaFacebook size={24} />
                </a>
              )}
              {personalInfo.socials.twitter && (
                <a href={personalInfo.socials.twitter} target="_blank" rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-white transition">
                  <FaTwitter size={24} />
                </a>
              )}
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Neon Border */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-xl shadow-cyan-500/20 group-hover:shadow-cyan-400/50 transition duration-500">
                <img
                  src={personalInfo.avatar}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Neon Shapes */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 border-2 border-teal-400/30 rounded-2xl"
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400/10 rounded-2xl"
                animate={{ rotate: [0, -20, 0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 8 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;