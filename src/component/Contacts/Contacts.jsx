import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const Contacts = () => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/porfolioData.json")
      .then((res) => res.json())
      .then((data) => setPersonalInfo(data.personalInfo));
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "parvez_Service_Id-2205",
        "template_a8bsu5x",
        formData,
        "6s9bYA_ODxhrkrlEK"
      )
      .then(() => {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[#0F172A] to-[#111827] text-white py-28 px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">
            Career Opportunities
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Open to Full-Time Opportunities
          </h2>

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm mb-6 border border-green-400/20">
            ● Available for Remote / Onsite Roles
          </div>

          <p className="text-gray-400 leading-relaxed max-w-lg mb-10">
            I’m currently seeking full-time opportunities where I can contribute
            to impactful products and collaborate with strong engineering teams.
            I typically respond within 24 hours.
          </p>

          {/* Direct Contact Info */}
          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-cyan-400" />
              <span>{personalInfo.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={16} className="text-cyan-400" />
              <span>{personalInfo.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-cyan-400" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl shadow-cyan-500/20"
        >
          <h3 className="text-xl font-semibold mb-6 text-cyan-400">
            Hiring Inquiry
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Recruiter / Company Name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 transition"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Company Email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 transition"
            />

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell me about the role and responsibilities..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 resize-none transition"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-xl transition shadow-lg shadow-cyan-500/40 disabled:opacity-60"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Submit Inquiry"}
            </motion.button>

            <AnimatePresence>
              {success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-cyan-400 text-sm text-center mt-4"
                >
                  ✅ Thank you! I will respond shortly.
                </motion.p>
              )}
            </AnimatePresence>

          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;