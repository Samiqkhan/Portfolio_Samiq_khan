"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Users, Globe, Palette, TrendingUp, ShoppingCart, Server } from "lucide-react"

// NOTE: The AnimatedCounter component is included here for simplicity.
const AnimatedCounter = ({ end, duration = 1.5, suffix = "", className = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let startTime;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, end, duration]);

    return <span ref={ref} className={className}>{count}{suffix}</span>;
};

const Freelancing = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-150px" });

    const services = [
        { icon: <Globe className="h-6 w-6" />, title: "Website Development", description: "Custom websites built with modern technologies and responsive design.", color: "from-purple-500 to-blue-500" },
        { icon: <Palette className="h-6 w-6" />, title: "UI/UX Design", description: "Beautiful and intuitive user interfaces that enhance user experience.", color: "from-pink-500 to-purple-500" },
        { icon: <TrendingUp className="h-6 w-6" />, title: "Digital Marketing", description: "SEO optimization, social media management, and content strategies.", color: "from-green-500 to-blue-500" },
        { icon: <ShoppingCart className="h-6 w-6" />, title: "E-Commerce Solutions", description: "Complete online stores with payment integration and inventory.", color: "from-orange-500 to-red-500" },
        { icon: <Palette className="h-6 w-6" />, title: "Logo & Brand Design", description: "Creative branding solutions that make your business stand out.", color: "from-indigo-500 to-purple-500" },
        { icon: <Server className="h-6 w-6" />, title: "Web Hosting", description: "Reliable hosting solutions and ongoing website maintenance.", color: "from-cyan-500 to-blue-500" },
    ];

    const stats = [
        { number: 10, suffix: "+", label: "Projects Done" },
        { number: 5, suffix: "+", label: "Happy Clients" },
        { number: 1, suffix: "+", label: "Years Experience" },
        { number: 100, suffix: "%", label: "Satisfaction" },
    ];

    const scrollToContact = () => {
        const element = document.querySelector("#contact");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section id="freelancing" className="py-16 lg:py-24 bg-slate-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.div variants={itemVariants} className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Freelance Services
                        </h2>
                        <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
                            Professional digital solutions to help your business grow and succeed in the digital world.
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto">
                        {/* Stats */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 lg:mb-16"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="text-center p-4 bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-700/50"
                                >
                                    <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">
                                        <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Services - Updated grid for mobile */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12"
                        >
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="group bg-slate-800/50 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-slate-700/50 h-full flex flex-col"
                                >
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} mb-4 self-start`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="text-md sm:text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow">{service.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div variants={itemVariants} className="text-center">
                            <motion.button
                                onClick={scrollToContact}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform"
                            >
                                Start Your Project <Users className="inline-block ml-2 h-5 w-5" />
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Freelancing;
