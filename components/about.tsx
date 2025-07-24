"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Download } from "lucide-react"

// NOTE: The FloatingElements component is included here for simplicity.
// In a real project, you would import it from its own file.

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


/**
 * About Section Component - Redesigned
 */
const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-150px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 },
        },
    };

    // Updated itemVariants for a simple fade-in effect
    const itemVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" },
        },
    };

    return (
        <section id="about" className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden">
            <FloatingElements />
            <div className="container mx-auto px-4 relative z-10" ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            About Me
                        </h2>
                        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                            My background, my passion, and my commitment to creating exceptional digital experiences.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-slate-800/60 max-w-4xl mx-auto rounded-2xl p-8 lg:p-12 backdrop-blur-md border border-slate-700/50"
                    >
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                Hello! I'm <strong className="text-white">Mohammed Samiq Khan</strong>, a passionate web developer and
                                Computer Science student specializing in{" "}
                                <strong className="text-purple-400">Artificial Intelligence and Machine Learning</strong>. With a keen
                                eye for design and a love for clean code, I create digital experiences that leave a lasting impression.
                            </p>
                            <p>
                                Currently pursuing my engineering degree, I combine academic knowledge with
                                practical experience from freelancing, where I develop websites, manage social media,
                                create logos, and provide digital solutions for clients across various industries.
                            </p>
                             <p>
                                Driven by innovation and a problem-solving mindset, I thrive on turning complex challenges into user-friendly solutions that empower businesses and enhance user engagement.
                            </p>
                        </div>

                        {/* Download Resume Button */}
                        <div className="mt-10 text-center">
                            <motion.a
                                href="/RESUME.pdf" // Make sure this path is correct
                                download
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-8 py-3 font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <Download size={20} />
                                Download Resume
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
