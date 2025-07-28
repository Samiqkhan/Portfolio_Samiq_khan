"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- INLINE SVG ICONS ---
// Replaced lucide-react for better performance and fewer dependencies.

const ExternalLinkIcon = () => (
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
        className="text-white"
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

const GithubIcon = () => (
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
        className="text-white"
    >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

// --- ANIMATED BACKGROUND (CSS) ---
// Using pure CSS for the infinite rotation is more performant.
const AnimatedBackground = () => (
    <>
        <style jsx>{`
            @keyframes rotate-bg {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .rotating-element {
                animation: rotate-bg 50s infinite linear;
            }
        `}</style>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl rotating-element" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl rotating-element" style={{ animationDuration: '70s' }} />
    </>
);

// --- PROJECTS DATA ---
const projectsData = [
    {
        title: "Weather Prediction App",
        description: "A user-friendly app for real-time weather forecasts with an interactive interface.",
        image: "/weather.png",
        tags: ["HTML", "JavaScript", "API"],
        liveUrl: "https://samiqkhan.github.io/Weather_prediction/",
        githubUrl: "https://github.com/Samiqkhan/Weather_prediction",
    },
    {
        title: "College 3D Map",
        description: "Interactive 3D model for navigating classrooms and departments on campus.",
        image: "/3d.png",
        tags: ["Blender", "Three.js", "HTML"],
    },
    {
        title: "Resume Builder Website",
        description: "Online resume generator with student and professional templates.",
        image: "/resume.png",
        tags: ["HTML/CSS", "JavaScript"],
        liveUrl: "https://samiqkhan.github.io/Resume-Builder/",
        githubUrl: "https://github.com/Samiqkhan/Resume-Builder",
    },
    {
        title: "RPA Attendance Automation",
        description: "Reads Excel attendance data and sends personalized emails automatically.
        image: "/attendance.png",
        tags: ["RPA", "Excel"],
    },
    {
        title: "Tournament Software Website",
        description: "Badminton tournament platform with live score updates and match info.",
        image: "/badminton.png",
        tags: ["HTML", "Google Sites"],
        liveUrl: "https://www.southindiasportsassociation.in/",
    },
    {
        title: "Auditor Website (eAuditor)",
        description: "Website for an advocate offering services like income tax filing.",
        image: "/auditor.png",
        tags: ["HTML/CSS", "JavaScript"],
        liveUrl: "https://samiqkhan.github.io/Auditor/",
        githubUrl: "https://github.com/Samiqkhan/Auditor",
    },
];

// --- MAIN PROJECTS COMPONENT ---
const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section id="projects" className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden font-sans">
            <AnimatedBackground />
            <div className="container mx-auto px-4 relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-100">
                        My Projects
                    </h2>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        A showcase of my recent work, personal projects, and client collaborations.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    // UPDATED: Changed grid to be 2 columns on mobile, 3 on large screens. Adjusted gap.
                    className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
                >
                    {projectsData.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                            className="group bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-colors duration-300"
                        >
                            <div className="relative overflow-hidden">
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-36 sm:h-48 object-cover" // Adjusted height for smaller cards
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/1e293b/94a3b8?text=Image+Not+Found'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                                
                                {(project.liveUrl || project.githubUrl) && (
                                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-purple-600 rounded-full hover:bg-purple-500 transition-all duration-300 scale-90 hover:scale-100">
                                                <ExternalLinkIcon />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-all duration-300 scale-90 hover:scale-100">
                                                <GithubIcon />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] sm:text-xs bg-slate-700 text-purple-300 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

// --- App Component Wrapper ---
export default function App() {
    return (
        <main className="bg-slate-900">
            <Projects />
        </main>
    );
}
