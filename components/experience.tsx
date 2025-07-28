"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- INLINE SVG ICONS ---
// Replaced lucide-react for better performance and fewer dependencies.

const BriefcaseIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 mr-2"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const MapPinIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="12" 
        height="12" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="h-3 w-3 mr-1"
    >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

// --- FLOATING ELEMENTS (CSS ANIMATION) ---
// Using pure CSS for animations is more performant than JS-driven libraries for simple, infinite loops.
const FloatingElements = () => (
  <>
    <style jsx>{`
      @keyframes float-up-down-1 { 0%, 100% { transform: translateY(-20px); } 50% { transform: translateY(20px); } }
      @keyframes float-up-down-2 { 0%, 100% { transform: translateY(25px); } 50% { transform: translateY(-25px); } }
      @keyframes float-up-down-3 { 0%, 100% { transform: translateY(-25px); } 50% { transform: translateY(25px); } }
      .float-1 { animation: float-up-down-1 30s infinite linear; }
      .float-2 { animation: float-up-down-2 35s infinite linear; }
      .float-3 { animation: float-up-down-3 28s infinite linear; }
    `}</style>
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute top-[10%] left-[15%] w-20 h-20 bg-pink-500/10 rounded-full blur-2xl float-1"></div>
      <div className="absolute top-[50%] right-[10%] w-28 h-28 bg-purple-500/10 rounded-full blur-2xl float-2"></div>
      <div className="absolute bottom-[5%] left-[20%] w-24 h-24 bg-blue-500/10 rounded-full blur-2xl float-3"></div>
    </div>
  </>
);

// --- EXPERIENCE DATA ---
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

// --- TIMELINE ITEM COMPONENT ---
const ExperienceTimelineItem = ({ item, isLast }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const dotVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <div ref={ref} className="relative pl-16">
            {/* Vertical line */}
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
                    <BriefcaseIcon />
                </div>
            </motion.div>

            {/* Card Content */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                // PERFORMANCE OPTIMIZATION: Replaced `backdrop-blur` with a solid, semi-transparent background.
                className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/80 mb-10 transition-all duration-300 hover:shadow-2xl hover:border-slate-600 hover:bg-slate-800"
            >
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${item.status === 'current' ? 'bg-purple-500/20 text-purple-300' : 'bg-pink-500/20 text-pink-300'}`}>
                    <CalendarIcon />
                    <span>{item.year}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                    <h4 className="text-purple-400 font-medium">{item.company}</h4>
                    <div className="flex items-center text-slate-400 text-sm">
                        <MapPinIcon />
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

// --- MAIN EXPERIENCE COMPONENT ---
const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="experience" className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden font-sans">
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

// --- App Component Wrapper ---
// This makes the code a complete, runnable application.
export default function App() {
  return (
    <main className="bg-slate-900">
      <Experience />
    </main>
  );
}
