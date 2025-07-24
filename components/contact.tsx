"use client"

import type React from "react"
import { useState, useRef } from "react"
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react"
import { motion, useInView } from "framer-motion"

// NOTE: The FloatingElements component is included here for simplicity.
const floatingElementsConfig = [
    { id: 1, animate: { y: [-20, 20, -20] }, transition: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, className: "absolute top-[10%] left-[15%] w-20 h-20 bg-green-500/10 rounded-full blur-2xl" },
    { id: 2, animate: { y: [25, -25, 25] }, transition: { duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, className: "absolute top-[50%] right-[10%] w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl" },
];

const FloatingElements = () => (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {floatingElementsConfig.map((el) => (
            <motion.div key={el.id} animate={el.animate} transition={el.transition} className={el.className} />
        ))}
    </div>
);


const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-150px" });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmissionStatus(null), 5000);
    };

    const contactInfo = [
        { icon: <MapPin />, title: "Location", details: "Salem, Tamil Nadu" },
        { icon: <Mail />, title: "Email", details: "samiqkhan2425@gmail.com" },
        { icon: <Phone />, title: "Phone", details: "+91 90923 85001" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section id="contact" className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden">
            <FloatingElements />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-100">
                            Let's Build Something Great
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Have a project in mind or just want to connect? Drop me a message.
                        </p>
                    </motion.div>

                    {/* Contact Info Grid */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                        {contactInfo.map((info) => (
                            <div key={info.title} className="bg-slate-800/50 p-6 rounded-lg text-center border border-slate-700/50">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 mb-4">
                                    <span className="text-purple-400">{info.icon}</span>
                                </div>
                                <h3 className="font-semibold text-white">{info.title}</h3>
                                <p className="text-sm text-gray-400">{info.details}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div variants={itemVariants} className="bg-slate-800/50 rounded-2xl p-6 sm:p-10 backdrop-blur-sm border border-slate-700/50">
                        {submissionStatus === 'success' ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-10">
                                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                                <p className="text-gray-300">Your message has been sent successfully.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required className="bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-500 rounded-md p-3 w-full" />
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required className="bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-500 rounded-md p-3 w-full" />
                                </div>
                                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message" required rows={5} className="bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-500 resize-none rounded-md p-3 w-full" />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                                >
                                    Send Message <Send className="inline-block ml-2 h-4 w-4" />
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
