import { motion } from "framer-motion";
import { Download, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Banner = () => {
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    fetch("/porfolioData.json")
      .then((res) => res.json())
      .then((data) => setPersonalInfo(data.personalInfo))
      .catch((err) => console.error("JSON Load Error:", err));
  }, []);

  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
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
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px] opacity-30" />

      {/* Neon Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-teal-400 font-medium mb-3 text-sm tracking-[0.3em] uppercase"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight
              bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-xl md:text-2xl font-semibold mb-6 text-gray-300"
            >
              {personalInfo.title}
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href={personalInfo.resumeUrl}
                download
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-semibold
                shadow-lg shadow-teal-500/30 hover:shadow-teal-400/60 
                transition-all duration-300 hover:-translate-y-1"
              >
                <Download size={18} className="group-hover:rotate-12 transition" />
                Download Resume
              </a>

              <button
                onClick={() => handleScroll("#projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                border border-white/20 backdrop-blur-lg bg-white/5
                hover:border-teal-400 hover:text-teal-400
                transition-all duration-300 hover:-translate-y-1"
              >
                View Projects
              </button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="flex gap-5"
            >
              {[
                { icon: <FaGithub />, link: personalInfo.socials.github },
                { icon: <FaLinkedin />, link: personalInfo.socials.linkedin },
                { icon: <FaFacebook />, link: personalInfo.socials.facebook },
                { icon: <FaTwitter />, link: personalInfo.socials.twitter },
              ].map(
                (item, index) =>
                  item.link && (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 text-2xl hover:text-white 
                      hover:scale-125 transition-all duration-300"
                    >
                      {item.icon}
                    </a>
                  )
              )}
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="relative"
            >
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden
                border border-white/10 backdrop-blur-lg
                shadow-2xl shadow-cyan-500/20"
              >
                <img
                  src={personalInfo.avatar}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl border border-cyan-400/20 animate-pulse" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;