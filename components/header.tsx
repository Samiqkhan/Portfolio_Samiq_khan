"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * A responsive, animated header component for a single-page application.
 * It features a scroll-based background change, active section highlighting,
 * and a smoothly animated mobile menu.
 */
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");

    const navItems = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#education", label: "Education" },
        { href: "#experience", label: "Experience" },
        { href: "#contact", label: "Contact" },
    ];

    // Effect to handle scroll-related state changes
    useEffect(() => {
        const handleScroll = () => {
            // Change header background on scroll
            setIsScrolled(window.scrollY > 50);

            // Determine active section for link highlighting
            let currentSection = "#home";
            navItems.forEach(item => {
                const section = document.querySelector(item.href);
                if (section && window.scrollY >= section.offsetTop - 150) {
                    currentSection = item.href;
                }
            });
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check in case the page loads on a different section
        handleScroll(); 
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navItems]);


    // Function to scroll to a section smoothly
    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMobileMenuOpen(false); // Close mobile menu on navigation
        }
    };

    // Animation variants for the mobile menu
    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
        exit: { opacity: 0, y: -20 },
    };

    const mobileNavItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? "bg-slate-950/80 backdrop-blur-lg shadow-xl shadow-black/10" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white">
                            Mohammed <span className="text-purple-400">SK</span>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => scrollToSection(item.href)}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                                    activeSection === item.href ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {item.label}
                                {activeSection === item.href && (
                                    <motion.div
                                        className="absolute inset-0 bg-purple-500/20 rounded-md -z-10"
                                        layoutId="active-nav-item"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2 text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="lg:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg border-t border-slate-800"
                        >
                            <div className="px-4 py-6 space-y-2">
                                {navItems.map((item) => (
                                    <motion.button
                                        key={item.href}
                                        variants={mobileNavItemVariants}
                                        onClick={() => scrollToSection(item.href)}
                                        className={`block w-full text-left font-medium py-3 px-4 rounded-md transition-colors duration-200 ${
                                            activeSection === item.href ? "bg-purple-500/20 text-white" : "text-gray-300"
                                        }`}
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;
