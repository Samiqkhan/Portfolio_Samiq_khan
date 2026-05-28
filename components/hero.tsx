"use client";

import { useEffect, useState, useMemo } from "react";
import { ArrowRight, Send, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // useMemo ensures the array is not recreated on every render
  const textsToType = useMemo(
    () => ["Full Stack Developer", "AI Developer", "Freelancer"],
    []
  );

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = textsToType[textIndex];
      const typingSpeed = isDeleting ? 40 : 80;

      // Logic for typing or deleting text
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }

      // State transitions for the typing effect
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % textsToType.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? 40 : 80);

    // Cleanup function to clear the timeout
    return () => clearTimeout(typingTimeout);
  }, [currentText, textIndex, isDeleting, textsToType]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { href: "https://github.com/Samiqkhan", icon: <Github size={20} /> },
    {
      href: "https://www.linkedin.com/in/mohammed-samiq-khan-r/",
      icon: <Linkedin size={20} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 lg:pt-32 relative overflow-hidden bg-slate-950"
    >
      {/* Premium Visual Mesh & Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(139,92,246,0.12)_1px,transparent_0)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Rotating Ambient Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{ 
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ 
            x: [0, -60, 40, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20"
        >
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Opportunities Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-xs sm:text-sm font-semibold text-green-400 mb-6 shadow-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Available for Python / AI / Web Opportunities</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight"
            >
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 hover:brightness-110 transition-all duration-300">Mohammed</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {currentText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block text-purple-400 font-light ml-1"
                >
                  |
                </motion.span>
              </span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-slate-300 font-light mb-6 leading-relaxed"
            >
              Crafting Immersive Digital Experiences & Intelligent AI Solutions
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base lg:text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              I blend creativity with full-stack technical engineering to build elegant applications, automated pipelines, and highly interactive user environments that turn complex ideas into seamless web products.
            </motion.p>

            {/* Premium CTA Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.button
                onClick={() => scrollToSection("#projects")}
                whileHover={{ scale: 1.03, shadow: "0px 10px 30px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3.5 rounded-full transition-all duration-300 font-bold text-sm tracking-wide shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden"
              >
                <span>Explore Showcase</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("#contact")}
                whileHover={{ scale: 1.03, borderColor: "rgba(168, 85, 247, 0.8)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900/60 border border-slate-700/60 hover:bg-slate-900 text-purple-400 hover:text-white px-8 py-3.5 rounded-full transition-all duration-300 font-bold text-sm tracking-wide flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Let's Collaborate</span>
                <Send className="h-4 w-4" />
              </motion.button>
            </motion.div>

            {/* Social Network Access */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold mr-2">Network:</span>
              {socialLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2, color: "#a78bfa" }}
                  className="p-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/30 text-slate-400 rounded-full transition-all duration-300 shadow-md"
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Glowing Portrait Glass Panel */}
          <motion.div
            variants={imageVariants}
            className="flex-1 flex justify-center order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Conic neon glowing outer ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-60 blur-xl group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
              
              {/* Double rotating thin rings - Hidden on mobile */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed border-purple-500/20 hidden lg:block"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-7 rounded-full border border-dashed border-blue-500/10 hidden lg:block"
              />

              {/* Main Profile Shield */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden border-4 border-slate-800/80 shadow-2xl relative z-10 bg-slate-900"
              >
                <img
                  src="/profile.png"
                  alt="Mohammed Samiq Khan"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/profile.png";
                  }}
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

