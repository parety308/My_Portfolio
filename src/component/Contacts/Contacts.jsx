import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useEffect, useState } from "react";

const Contacts = () => {
    const [personalInfo,setPersonalInfo]=useState({});
    useEffect(() => {
  fetch("/porfolioData.json")
    .then((res) => res.json())
    .then((data) => {
      setPersonalInfo(data.personalInfo);
    })
    .catch((err) => console.error("JSON Load Error:", err));
}, []);
  return (
    <section
      id="contact"
      className="bg-[#0B1220] text-white py-24 px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="mb-10">
            <p className="text-cyan-400 uppercase tracking-widest text-sm flex items-center gap-2 mb-3">
              <Mail size={18} />
              Contact
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
            </h2>

            <p className="text-gray-400 leading-relaxed max-w-lg">
              Have a project in mind or want to collaborate? Feel free to reach
              out. I'm always open to discussing new opportunities.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-cyan-500/10">
                <Mail className="text-cyan-400" size={22} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">EMAIL</p>
                <p className="font-medium">
                    {personalInfo.email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-cyan-500/10">
                <Phone className="text-cyan-400" size={22} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">PHONE</p>
                <p className="font-medium">{personalInfo.phone}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-cyan-500/10">
                <MapPin className="text-cyan-400" size={22} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">LOCATION</p>
                <p className="font-medium">{personalInfo.location}</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#111827]/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-xl"
        >
          <form className="space-y-6">

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-[#1F2937] border border-white/5 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-[#1F2937] border border-white/5 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Your message..."
                className="w-full bg-[#1F2937] border border-white/5 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 transition resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-medium py-4 rounded-xl hover:opacity-90 transition"
            >
              <Send size={18} />
              Send Message
            </button>

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contacts;