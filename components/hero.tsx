"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Send, Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"

const Hero = () => {
    const [currentText, setCurrentText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    // Stable array, can be defined outside the component
    const texts = ["Web Developer", "Full Stack Developer", "Freelancer"];

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = texts[currentIndex];

            if (isDeleting) {
                setCurrentText(currentWord.substring(0, currentText.length - 1));
            } else {
                setCurrentText(currentWord.substring(0, currentText.length + 1));
            }

            if (!isDeleting && currentText === currentWord) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
            }
        };

        const timeout = setTimeout(handleTyping, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, currentIndex, isDeleting, texts]);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const socialLinks = [
        { href: "https://github.com/Samiqkhan", icon: <Github size={24} /> },
        { href: "https://linkedin.com/in/your-profile", icon: <Linkedin size={24} /> },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 },
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center pt-16 lg:pt-20 relative overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24"
                >
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                        <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 text-white">
                            Hi, I'm{" "}
                            <motion.span
                                className="text-purple-500"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Mohammed
                            </motion.span>
                            <br />
                            <span className="text-2xl sm:text-3xl lg:text-5xl text-blue-400">
                                {currentText}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                                    className="inline-block"
                                >
                                    |
                                </motion.span>
                            </span>
                        </motion.h1>

                        <motion.h2 variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-4 lg:mb-6">
                            Crafting Digital Experiences & AI Solutions
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-sm sm:text-base lg:text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
                        >
                            I blend creativity with technical expertise to build stunning websites and innovative AI applications that
                            solve real-world problems and deliver exceptional user experiences.
                        </motion.p>
                        
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                        >
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                <button
                                    onClick={() => scrollToSection("#projects")}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 font-semibold w-full sm:w-auto"
                                >
                                    Explore My Work <ArrowRight className="inline-block ml-2 h-4 w-4" />
                                </button>
                            </motion.div>
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                <button
                                    onClick={() => scrollToSection("#contact")}
                                    className="border-purple-500 border text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-3 rounded-full transition-all duration-300 font-semibold w-full sm:w-auto"
                                >
                                    Let's Connect <Send className="inline-block ml-2 h-4 w-4" />
                                </button>
                            </motion.div>
                        </motion.div>
                        
                        {/* Status and Social Links Wrapper */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-8 gap-y-4">
                            <div className="flex items-center gap-3 text-md font-medium text-green-400">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span>Ready for new opportunities</span>
                            </div>
                            <div className="flex items-center gap-6">
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, y: -3 }}
                                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                                    >
                                        {link.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Profile Image */}
                    <motion.div variants={imageVariants} className="flex-1 flex justify-center order-1 lg:order-2">
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20"
                            />
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl relative z-10"
                            >
                                <img
                                    src="https://placehold.co/400x400/1e293b/a78bfa?text=MSK"
                                    alt="Mohammed Samiq Khan"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/1e293b/94a3b8?text=Image+Not+Found'; }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
