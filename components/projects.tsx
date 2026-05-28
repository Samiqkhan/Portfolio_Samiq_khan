"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- INLINE SVG ICONS ---
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
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] rotating-element" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] rotating-element" style={{ animationDuration: '70s' }} />
    </>
);

// --- PROJECTS DATA ---
const projectsData = [
    {
        title: "KRISH PG",
        description: "A premium, luxury paying guest and hostel accommodation portal featuring beautiful booking systems and user dashboards.",
        image: "/krishpg.png",
        tags: ["React", "Tailwind CSS", "UI/UX Design", "Live Product"],
        liveUrl: "https://krishpg.in/",
        category: "featured-website"
    },
    {
        title: "RECORRD",
        description: "An advanced, interactive dark-mode music streaming and digital audio publishing platform.",
        image: "/recorrd.png",
        tags: ["Next.js", "React", "Web Audio API", "Tailwind CSS"],
        liveUrl: "https://recorrd.in/",
        category: "featured-website"
    },
    {
        title: "SISA (South India Sports Association)",
        description: "A state-of-the-art sports association website displaying live tournament brackets, match sheets, and athlete listings.",
        image: "/sisa.png",
        tags: ["React", "Tailwind CSS", "Tournament Manager", "Live Score"],
        liveUrl: "https://southindiasportsassociation.in/",
        category: "featured-website"
    },
    {
        title: "OWNSTORE",
        description: "A comprehensive on-demand platform where users can order anything and hire professionals or service providers on demand.",
        image: "/ownstore.png",
        tags: ["Next.js", "Tailwind CSS", "Redux Toolkit", "Merchant Engine"],
        liveUrl: "https://ownstore.org/",
        category: "featured-website"
    },
    {
        title: "ENLIGHTEN ACADEMY",
        description: "An immersive, modern learning management portal and education academy featuring online student systems.",
        image: "/enlightenacademy.png",
        tags: ["React", "Tailwind CSS", "LMS", "Portal Architecture"],
        liveUrl: "https://enlightenacademy.in/",
        category: "featured-website"
    },
    {
        title: "MVM Studio",
        description: "A premium, ultra-minimalist photography portfolio showcasing fashion and landscape galleries with elegant layouts.",
        image: "/mvmstudio.png",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Aesthetics"],
        liveUrl: "https://lumina-portfolio-showcase.vercel.app/",
        category: "featured-website"
    },
    {
        title: "Happy Wedding Cards",
        description: "A bespoke luxury digital wedding card invitations designer platform displaying elegant invitation templates and RSVP handling.",
        image: "/happywedding.png",
        tags: ["React", "Tailwind CSS", "RSVP Manager", "Framer Motion"],
        liveUrl: "https://lumina-portfolio-showcase.vercel.app/",
        category: "featured-website"
    },
    {
        title: "Weather Prediction App",
        description: "A user-friendly app for real-time weather forecasts with an interactive interface and location discovery.",
        image: "/weather.png",
        tags: ["HTML", "JavaScript", "API Integration"],
        liveUrl: "https://samiqkhan.github.io/Weather_prediction/",
        githubUrl: "https://github.com/Samiqkhan/Weather_prediction",
        category: "application"
    },
    {
        title: "College 3D Map",
        description: "Interactive 3D model for navigating classrooms, laboratories, and departments on campus.",
        image: "/3d.png",
        tags: ["Blender", "Three.js", "Web Graphics"],
        category: "application"
    },
    {
        title: "Resume Builder Website",
        description: "Online automated resume builder with real-time editing and print-friendly student templates.",
        image: "/resume.png",
        tags: ["HTML/CSS", "JavaScript", "PDF Engine"],
        liveUrl: "https://samiqkhan.github.io/Resume-Builder/",
        githubUrl: "https://github.com/Samiqkhan/Resume-Builder",
        category: "application"
    },
    {
        title: "RPA Attendance Automation",
        description: "Robust robotic process automation that reads Excel attendance registers and compiles reports automatically.",
        image: "/attendance.png",
        tags: ["RPA", "Excel", "Email Automation"],
        category: "application"
    },
    {
        title: "Auditor Website (eAuditor)",
        description: "Professional services landing page for audit management and secure client document filings.",
        image: "/auditor.png",
        tags: ["HTML/CSS", "JavaScript", "SEO Ready"],
        liveUrl: "https://samiqkhan.github.io/Auditor/",
        githubUrl: "https://github.com/Samiqkhan/Auditor",
        category: "application"
    }
];

// --- MAIN PROJECTS COMPONENT ---
const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", label: "All Work" },
        { id: "featured-website", label: "Featured Websites" },
        { id: "application", label: "Apps & Utilities" }
    ];

    const filteredProjects = projectsData.filter(
        (project) => activeCategory === "all" || project.category === activeCategory
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-100 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-purple-100 to-blue-200">
                        My Showcase Portfolio
                    </h2>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto font-light">
                        A dynamic display of modern web products, responsive client applications, and full-stack software developments.
                    </p>
                </motion.div>

                {/* --- MODERN CATEGORY TABS SYSTEM --- */}
                <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-16 relative z-20">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 outline-none ${
                                activeCategory === category.id
                                    ? "text-white"
                                    : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                            {activeCategory === category.id && (
                                <motion.span
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-full -z-10 shadow-lg shadow-purple-500/20"
                                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                                />
                            )}
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* --- PROJECTS GRID SYSTEM --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4 }}
                                key={project.title}
                                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
                                className="group bg-slate-800/40 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/40 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col h-full justify-between"
                            >
                                <div className="relative overflow-hidden aspect-[4/3]">
                                    <motion.div
                                        whileHover={{ scale: 1.04 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="h-full w-full"
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={400}
                                            height={300}
                                            className="w-full h-full object-cover"
                                            priority={project.category === "featured-website"}
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent transition-opacity duration-300 opacity-80 group-hover:opacity-100" />
                                    
                                    {/* --- BRAND CATEGORY OVERLAY BADGE --- */}
                                    <span className={`absolute top-4 left-4 px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md border backdrop-blur-md ${
                                        project.category === "featured-website"
                                            ? "bg-purple-950/70 border-purple-500/40 text-purple-200"
                                            : "bg-slate-950/70 border-slate-700/60 text-slate-300"
                                    }`}>
                                        {project.category === "featured-website" ? "Live Website" : "Utility App"}
                                    </span>

                                    {/* --- DYNAMIC QUICK ACTIONS --- */}
                                    {(project.liveUrl || project.githubUrl) && (
                                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                            {project.liveUrl && (
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-purple-600/90 hover:bg-purple-600 text-white rounded-full hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/30">
                                                    <ExternalLinkIcon />
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/90 hover:bg-slate-700 text-white rounded-full hover:scale-110 transition-all duration-300 shadow-lg shadow-slate-900/40">
                                                    <GithubIcon />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 min-h-[48px]">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 text-[10px] font-semibold bg-slate-800/70 border border-slate-700/50 text-slate-300 rounded-md group-hover:border-purple-500/20 group-hover:text-purple-300 transition-colors duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
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

