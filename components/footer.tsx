"use client"

import { Heart, Linkedin, Github } from "lucide-react"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    // Simplified quick links for a cleaner footer
    const quickLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ]

    // Core services list
    const services = [
        "Web Development",
        "UI/UX Design",
        "AI/ML Solutions",
        "E-Commerce",
        "Digital Marketing",
    ]

    const scrollToSection = (href) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Info */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">Mohammed Samiq Khan</h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                            A passionate web developer and AI/ML specialist creating amazing digital experiences that combine
                            cutting-edge technology with beautiful design.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.linkedin.com/in/mohammed-samiq-khan-r/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-slate-800 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition-all duration-300"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com/Samiqkhan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-slate-800 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-slate-700 transition-all duration-300"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Wrapper */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-8">
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                {quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <button
                                            onClick={() => scrollToSection(link.href)}
                                            className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
                            <ul className="space-y-2">
                                {services.map((service) => (
                                    <li key={service}>
                                        <span className="text-gray-400 text-sm">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-800 mt-12 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {currentYear} Mohammed Samiq Khan. All Rights Reserved.
                        <br className="sm:hidden" />
                        <span className="hidden sm:inline"> | Designed with </span>
                        <span className="sm:hidden"> Designed with </span>
                        <Heart className="inline h-4 w-4 text-red-500 mx-1" />
                        by Mohammed
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
