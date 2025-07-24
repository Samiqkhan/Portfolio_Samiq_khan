"use client"

import { useState, useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Projects data without the 'category' property
  const projects = [
    {
      title: "Weather Prediction App",
      description:
        "A user-friendly app for real-time weather forecasts with an interactive interface.",
      image: "https://placehold.co/400x300/1e293b/94a3b8?text=Weather+App",
      tags: ["HTML", "JavaScript", "API"],
      liveUrl: "https://samiqkhan.github.io/Weather_prediction/",
      githubUrl: "https://github.com/Samiqkhan/Weather_prediction",
    },
    {
      title: "College 3D Map",
      description: "Interactive 3D model for navigating classrooms and departments on campus.",
      image: "https://placehold.co/400x300/1e293b/94a3b8?text=3D+College+Map",
      tags: ["Blender", "Three.js", "HTML"],
    },
    {
      title: "Resume Builder Website",
      description: "Online resume generator with student and professional templates.",
      image: "https://placehold.co/400x300/1e293b/94a3b8?text=Resume+Builder",
      tags: ["HTML/CSS", "JavaScript"],
      liveUrl: "https://samiqkhan.github.io/Resume-Builder/",
      githubUrl: "https://github.com/Samiqkhan/Resume-Builder",
    },
    {
      title: "Sri lakshira - Saree Website",
      description: "A fully functional e-commerce website for a saree business with an admin panel.",
      image: "https://placehold.co/400x300/1e293b/94a3b8?text=Sri+Lakshira",
      tags: ["React", "Firebase"],
    },
    {
      title: "Tournament Software Website",
      description: "Badminton tournament platform with live score updates and match info.",
      image: "https://placehold.co/400x300/1e293b/94a3b8?text=Tournament+Site",
      tags: ["HTML", "Google Sites"],
      liveUrl: "https://www.southindiasportsassociation.in/",
    },
    {
      title: "Auditor Website (eAuditor)",
      description: "Website for an advocate offering services like income tax filing.",
      image: "https://placehold.co/400x300/1e293b/94a3b8?text=eAuditor+Site",
      tags: ["HTML/CSS", "JavaScript"],
      liveUrl: "https://samiqkhan.github.io/Auditor/",
      githubUrl: "https://github.com/Samiqkhan/Auditor",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="projects" className="py-16 lg:py-24 bg-slate-900/50 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            A showcase of my recent work, personal projects, and client collaborations.
          </p>
        </motion.div>

        {/* Projects Grid - Updated for mobile responsiveness */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group bg-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-36 sm:h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/1e293b/94a3b8?text=Image+Not+Found'; }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"
                  />
                  {(project.liveUrl || project.githubUrl) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center gap-4"
                    >
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, rotate: 3 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-200"
                        >
                          <ExternalLink className="h-5 w-5 text-white" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, rotate: -3 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors duration-200"
                        >
                          <Github className="h-5 w-5 text-white" />
                        </motion.a>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="p-4 sm:p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex flex-wrap gap-2 mb-3"
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 text-xs bg-slate-700/50 text-purple-300 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-md sm:text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300"
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="text-gray-400 text-xs sm:text-sm leading-relaxed"
                  >
                    {project.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
