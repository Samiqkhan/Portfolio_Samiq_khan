"use client"

import { Code, Palette, Brain } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Component for rendering the animated floating background shapes.
// This component is now hidden on mobile (screens smaller than 'lg') to improve performance.
const FloatingElements = () => (
    <div className="hidden lg:block absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-[10%] left-[15%] w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
        <motion.div animate={{ y: [25, -25, 25] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="absolute top-[50%] right-[10%] w-28 h-28 bg-green-500/10 rounded-full blur-2xl" />
        <motion.div animate={{ y: [-25, 25, -25] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute bottom-[5%] left-[20%] w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
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
 * Represents a single item in the skills timeline.
 * @param {object} props - The component props.
 * @param {object} props.category - The skill category data.
 * @param {boolean} props.isLast - Flag to indicate if it's the last item.
 */
const SkillTimelineItem = ({ category, isLast }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const styles = colorStyles[category.color] || {};

    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const dotVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <div ref={ref} className="relative pl-20">
            {/* Vertical line connecting timeline items */}
            {!isLast && (
                <div className="absolute left-[39px] top-10 h-full w-0.5 bg-slate-700" />
            )}

            {/* Timeline Dot with Icon */}
            <motion.div
                variants={dotVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute left-0 top-0 z-10"
            >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg ${styles.bg} ${styles.shadow}`}>
                    {category.icon}
                </div>
            </motion.div>

            {/* Card Content - backdrop-blur is removed on mobile for performance */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="bg-slate-800/90 lg:bg-slate-800/50 p-6 rounded-xl lg:backdrop-blur-sm border border-slate-700/80 mb-10 ml-5 transform transition-all duration-300 hover:shadow-2xl hover:border-slate-600"
            >
                <h3 className="text-xl font-bold text-slate-100 mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded-full">{skill}</span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

/**
 * The main Skills component that orchestrates the timeline.
 */
const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="skills" className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden">
            <FloatingElements />
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
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
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        A timeline of the key technologies and skills I've mastered.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative max-w-3xl mx-auto">
                    {skillCategories.map((category, index) => (
                        <SkillTimelineItem
                            key={category.title}
                            category={category}
                            isLast={index === skillCategories.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
