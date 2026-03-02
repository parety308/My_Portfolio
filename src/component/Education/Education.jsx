import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const Education = () => {
    const [education, setEducation] = useState([]);

    useEffect(() => {
        fetch("/porfolioData.json")
            .then((res) => res.json())
            .then((data) => setEducation(data.education))
            .catch((err) => console.error("JSON Load Error:", err));
    }, []);

    return (
        <section
            id="education"
            className="bg-gradient-to-b from-[#111827] to-[#0F172A] text-white py-28 px-6"
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-2">
                        <GraduationCap size={18} />
                        Education
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-cyan-400">
                        Academic Background
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative border-l border-cyan-500/30 ml-4">
                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="mb-12 ml-8"
                        >
                            {/* Dot */}
                            <span className="absolute -left-[9px] w-4 h-4 bg-cyan-500 rounded-full border-4 border-[#0F172A]" />

                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 
                rounded-2xl p-8 shadow-lg shadow-cyan-500/20"
                            >
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {item.degree}
                                </h3>

                                <p className="text-cyan-400 text-sm mb-2">
                                    {item.institution}
                                </p>

                                <p className="text-gray-500 text-sm mb-4">
                                    {item.year}
                                </p>

                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Education;