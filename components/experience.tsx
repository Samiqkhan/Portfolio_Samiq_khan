"use client"

import { Briefcase, Calendar, MapPin } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Configuration for the floating background elements.
const floatingElementsConfig = [
    { id: 1, animate: { y: [-20, 20, -20] }, transition: { duration: 30, repeat: Infinity, ease: "linear" }, className: "absolute top-[10%] left-[15%] w-20 h-20 bg-pink-500/10 rounded-full blur-2xl" },
    { id: 2, animate: { y: [25, -25, 25] }, transition: { duration: 35, repeat: Infinity, ease: "linear" }, className: "absolute top-[50%] right-[10%] w-28 h-28 bg-purple-500/10 rounded-full blur-2xl" },
    { id: 3, animate: { y: [-25, 25, -25] }, transition: { duration: 28, repeat: Infinity, ease: "linear" }, className: "absolute bottom-[5%] left-[20%] w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" },
];

// Component for rendering the animated floating background shapes.
const FloatingElements = () => (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {floatingElementsConfig.map((el) => (
            <motion.div key={el.id} animate={el.animate} transition={el.transition} className={el.className} />
        ))}
    </div>
);

// Data for the experience section
const experienceData = [
    {
        year: "Feb 2025 - Present",
        title: "AI Developer Intern",
        company: "Metatroncube Software Solutions",
        location: "Remote, Canada",
        description: "Developing 3D digital experiences for real estate using LiDAR data and Insta360 imagery to create immersive, street-view-style virtual tours.",
        skills: ["Python", "LiDAR", "Insta 360", "Research"],
        status: "current",
    },
    {
        year: "July 2023",
        title: "Full Stack Web Development Intern",
        company: "Stack Queue Education",
        location: "Remote",
        description: "Assisted in the development of websites and web applications, gaining practical experience in front-end and back-end technologies.",
        skills: ["HTML/CSS", "JavaScript", "React", "Node.js"],
        status: "completed",
    },
];

/**
 * Represents a single item in the experience timeline.
 * @param {object} props - The component props.
 * @param {object} props.item - The experience data for the item.
 * @param {boolean} props.isLast - Flag to indicate if it's the last item in the timeline.
 */
const ExperienceTimelineItem = ({ item, isLast }) => {
    const ref = useRef(null);
    // Trigger animation when the item is 50% in view.
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    // Animation variants for the content card.
    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    // Animation variants for the timeline dot.
    const dotVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <div ref={ref} className="relative pl-16">
            {/* Vertical line connecting timeline items */}
            {!isLast && (
                <div className="absolute left-[19px] top-5 h-full w-0.5 bg-slate-700" />
            )}

            {/* Timeline Dot */}
            <motion.div
                variants={dotVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute left-0 top-0 z-10"
            >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${item.status === 'current' ? 'bg-purple-500 shadow-purple-500/40' : 'bg-pink-500 shadow-pink-500/40'}`}>
                    <Briefcase size={20} />
                </div>
            </motion.div>

            {/* Card Content */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700/80 mb-10 transform transition-all duration-300 hover:shadow-2xl hover:border-slate-600"
            >
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${item.status === 'current' ? 'bg-purple-500/20 text-purple-300' : 'bg-pink-500/20 text-pink-300'}`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{item.year}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                    <h4 className="text-purple-400 font-medium">{item.company}</h4>
                    <div className="flex items-center text-slate-400 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.location}
                    </div>
                </div>
                <p className="text-slate-300 text-base mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                    {item.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 text-xs bg-slate-700 text-purple-300 rounded-full">{skill}</span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

/**
 * The main Experience component that orchestrates the timeline.
 */
const Experience = () => {
    const ref = useRef(null);
    // Trigger animation when the section title is 20% in view.
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="experience" className="py-24 lg:py-32 relative bg-slate-900/50 overflow-hidden">
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
                        Professional Experience
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        My professional journey and the experiences that have shaped my skills.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative max-w-3xl mx-auto">
                    {experienceData.map((item, index) => (
                        <ExperienceTimelineItem
                            key={item.title}
                            item={item}
                            isLast={index === experienceData.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
