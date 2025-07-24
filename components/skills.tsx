"use client"

import { Code, Wrench, Palette, Brain } from "lucide-react"
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

// Data structure for the skills
const skillCategories = [
    { title: "Technical Languages", icon: <Code size={28} />, color: "blue", skills: [ "Core of Java", "HTML", "SQL","JS", "CSS","React", "Next.js"] },
    { title: "Design & UI/UX", icon: <Palette size={28} />, color: "purple", skills: ["Figma", "Canva", "Wix", "Blender", "AutoCAD"] },
    { title: "Other Tools & Technologies", icon: <Brain size={28} />, color: "orange", skills: ["Firebase", "Lidar", "Git & GitHub", "Power BI", "Tableau", "UI path" ] },
];

// Style mapping for colors
const colorStyles = {
    blue: { bg: "bg-blue-500", shadow: "shadow-blue-500/50" },
    purple: { bg: "bg-purple-500", shadow: "shadow-purple-500/50" },
    orange: { bg: "bg-orange-500", shadow: "shadow-orange-500/50" },
};

/**
 * Timeline Item Component - Now fully responsive
 */
const TimelineItem = ({ category, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const isEven = index % 2 === 0;
    const styles = colorStyles[category.color] || {};

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
            {/* Desktop-only placeholder for alternating layout */}
            <div className={`hidden lg:block w-5/12 ${isEven ? 'order-1' : 'order-3'}`}></div>

            {/* Center dot and icon - adjusted for mobile and desktop */}
            <div className="z-10 absolute lg:relative left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 order-2">
                <motion.div variants={dotVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                    <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center text-white ${styles.bg} shadow-lg ${styles.shadow}`}>
                        {category.icon}
                    </div>
                </motion.div>
            </div>

            {/* Content Card - adjusted for mobile and desktop */}
            <div className={`w-full max-w-md lg:w-5/12 mt-28 lg:mt-0 ${isEven ? 'lg:order-3' : 'lg:order-1'}`}>
                 <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="bg-slate-800/70 p-6 rounded-lg backdrop-blur-sm border border-slate-700/50"
                >
                    <h3 className="text-xl font-bold text-slate-100 mb-3 text-center lg:text-left">{category.title}</h3>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {category.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded-full">{skill}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

/**
 * Skills Section Component - Timeline Style
 */
const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="skills" className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden">
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
                        My Development Journey
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A timeline of the key technologies and skills I've mastered.
                    </p>
                </motion.div>

                <div className="relative w-full max-w-4xl mx-auto">
                    {/* The vertical line */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: "100%" } : {}}
                        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                        className="absolute left-1/2 top-0 w-1 bg-slate-700/50 rounded-full -translate-x-1/2"
                    />

                    <div className="space-y-24 lg:space-y-16">
                        {skillCategories.map((category, index) => (
                            <TimelineItem key={category.title} category={category} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
