"use client"

import { Award, CheckCircle2 } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// NOTE: The FloatingElements component is included here for simplicity.
const floatingElementsConfig = [
    { id: 1, animate: { y: [-20, 20, -20] }, transition: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, className: "absolute top-[10%] left-[15%] w-20 h-20 bg-purple-500/10 rounded-full blur-2xl" },
    { id: 2, animate: { y: [25, -25, 25] }, transition: { duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, className: "absolute top-[50%] right-[10%] w-28 h-28 bg-blue-500/10 rounded-full blur-2xl" },
    { id: 3, animate: { y: [-25, 25, -25] }, transition: { duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, className: "absolute bottom-[5%] left-[20%] w-24 h-24 bg-pink-500/10 rounded-full blur-2xl" },
];

const FloatingElements = () => (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {floatingElementsConfig.map((el) => (
            <motion.div key={el.id} animate={el.animate} transition={el.transition} className={el.className} />
        ))}
    </div>
);

// Data for the certifications
const certifications = [
    {
        title: "Google Cybersecurity Professional Certificate",
        issuer: "Coursera (Google)",
        year: "2024",
        description: "Completed comprehensive training covering network security, incident response, and security frameworks.",
        skills: ["Network Security", "Incident Response", "Risk Assessment"],
    },
    {
        title: "Python for Data Science (Elite Certification)",
        issuer: "NPTEL",
        year: "2023",
        description: 'Earned the prestigious Elite certification for outstanding performance in the NPTEL "Python for Data Science" course.',
        skills: ["Python", "NumPy", "Pandas", "Matplotlib"],
    },
    {
        title: "Data Analysis with Python",
        issuer: "Coursera",
        year: "2023",
        description: "Mastered data analysis techniques using Python, including data wrangling, exploration, and building predictive models.",
        skills: ["Data Wrangling", "Scikit-learn", "Data Visualization"],
    },
];

/**
 * Certification Document Card Component
 */
const CertificationDocumentCard = ({ cert, index }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: index * 0.15 },
        },
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
            className="bg-slate-800/70 rounded-lg p-6 backdrop-blur-md border border-slate-700/50 flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-100 flex-1 pr-4">{cert.title}</h3>
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center">
                    <Award className="w-8 h-8 text-purple-300" />
                </div>
            </div>
            <p className="text-md font-semibold text-purple-400 mb-4">{cert.issuer} - {cert.year}</p>
            <p className="text-sm text-gray-400 mb-5 flex-grow">{cert.description}</p>
            <div className="mt-auto border-t border-slate-700/50 pt-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Skills Acquired:</h4>
                <div className="flex flex-wrap gap-2">
                    {cert.skills.map(skill => (
                        <div key={skill} className="flex items-center text-xs text-gray-400">
                           <CheckCircle2 className="w-3 h-3 mr-1.5 text-green-500 flex-shrink-0" />
                           <span>{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/**
 * Certifications Section Component - Document Style
 */
const Certifications = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="certifications" className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden">
            <FloatingElements />
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-100">
                        Certifications & Online Learning
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Continuous learning through industry-recognized programs.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {certifications.map((cert, index) => (
                        <CertificationDocumentCard key={cert.title} cert={cert} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
