"use client"

import { GraduationCap, Calendar } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// NOTE: The FloatingElements component is included here for simplicity.
const floatingElementsConfig = [
    { id: 1, animate: { y: [-20, 20, -20] }, transition: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, className: "absolute top-[10%] left-[15%] w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" },
    { id: 2, animate: { y: [25, -25, 25] }, transition: { duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, className: "absolute top-[50%] right-[10%] w-28 h-28 bg-green-500/10 rounded-full blur-2xl" },
    { id: 3, animate: { y: [-25, 25, -25] }, transition: { duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, className: "absolute bottom-[5%] left-[20%] w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" },
];

const FloatingElements = () => (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {floatingElementsConfig.map((el) => (
            <motion.div key={el.id} animate={el.animate} transition={el.transition} className={el.className} />
        ))}
    </div>
);

// Data for the education section
const educationData = [
    {
        year: "2022 - Present",
        title: "B.E in Computer Science (AIML)",
        institution: "K S Rangasamy College of Technology",
        description: "Pursuing a Bachelor's degree with a specialization in Artificial Intelligence and Machine Learning. Focusing on advanced algorithms, neural networks, and practical applications of AI.",
        status: "current",
    },
    {
        year: "2021 - 2022",
        title: "Higher Secondary Education",
        institution: "St.john's Matriculation Higher Secondary School",
        description: "Completed higher secondary education with a focus on Mathematics, Physics, and Computer Science. Graduated with distinction.",
        status: "completed",
    },
    {
        year: "2019 - 2020",
        title: "Secondary Education",
        institution: "St.john's Matriculation Higher Secondary School",
        description: "Completed secondary education with excellent academic performance, developing a strong foundation in mathematics and science.",
        status: "completed",
    },
];

/**
 * Timeline Item Component for Education
 */
const EducationTimelineItem = ({ item, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const isEven = index % 2 === 0;

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const dotVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <div ref={ref} className="relative w-full flex justify-center lg:justify-between items-start">
            {/* Desktop-only placeholder */}
            <div className={`hidden lg:block w-5/12 ${isEven ? 'order-1' : 'order-3'}`}></div>

            {/* Center dot and icon */}
            <div className="z-10 absolute lg:relative left-6 lg:left-auto -translate-x-1/2 lg:translate-x-0 order-2">
                <motion.div variants={dotVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${item.status === 'current' ? 'bg-purple-500 shadow-purple-500/50' : 'bg-blue-500 shadow-blue-500/50'}`}>
                        <GraduationCap size={24} />
                    </div>
                </motion.div>
            </div>

            {/* Content Card */}
            <div className={`w-full lg:w-5/12 pl-16 lg:pl-0 ${isEven ? 'lg:order-3' : 'lg:order-1'}`}>
                 <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="bg-slate-800/70 p-6 rounded-lg backdrop-blur-sm border border-slate-700/50"
                >
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${item.status === 'current' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
                    <p className="text-purple-400 font-medium mb-3">{item.institution}</p>
                    <p className="text-gray-300 text-base">{item.description}</p>
                </motion.div>
            </div>
        </div>
    );
};

/**
 * Education Section Component - Timeline Style
 */
const Education = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="education" className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden">
            <FloatingElements />
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-100">
                        Education Journey
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        My academic background and the learning path that has shaped my skills.
                    </p>
                </motion.div>

                <div className="relative w-full max-w-4xl mx-auto">
                    {/* The vertical line */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: "100%" } : {}}
                        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                        className="absolute left-6 top-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full -translate-x-1/2"
                    />

                    <div className="space-y-16">
                        {educationData.map((item, index) => (
                            <EducationTimelineItem key={item.title} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
