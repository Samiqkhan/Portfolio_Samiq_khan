"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- INLINE SVG ICONS ---
// Replaced lucide-react for better performance and fewer dependencies.

const GraduationCapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 mr-2"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);


// --- FLOATING ELEMENTS (CSS ANIMATION) ---
// Using pure CSS for animations is more performant than JS-driven libraries for simple, infinite loops.
// This offloads the work to the GPU and frees up the main thread.

const FloatingElements = () => (
  <>
    <style jsx>{`
      @keyframes float-up-down-1 {
        0%, 100% { transform: translateY(-20px); }
        50% { transform: translateY(20px); }
      }
      @keyframes float-up-down-2 {
        0%, 100% { transform: translateY(25px); }
        50% { transform: translateY(-25px); }
      }
      @keyframes float-up-down-3 {
        0%, 100% { transform: translateY(-25px); }
        50% { transform: translateY(25px); }
      }
      .float-1 { animation: float-up-down-1 30s infinite linear; }
      .float-2 { animation: float-up-down-2 35s infinite linear; }
      .float-3 { animation: float-up-down-3 28s infinite linear; }
    `}</style>
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute top-[10%] left-[15%] w-20 h-20 bg-blue-500/10 rounded-full blur-2xl float-1"></div>
      <div className="absolute top-[50%] right-[10%] w-28 h-28 bg-green-500/10 rounded-full blur-2xl float-2"></div>
      <div className="absolute bottom-[5%] left-[20%] w-24 h-24 bg-purple-500/10 rounded-full blur-2xl float-3"></div>
    </div>
  </>
);

// --- EDUCATION DATA ---
// No changes needed here.
const educationData = [
  {
    year: "2022 - Present",
    title: "B.E in Computer Science (AIML)",
    institution: "K S Rangasamy College of Technology",
    description: "Pursuing a Bachelor's degree with a specialization in Artificial Intelligence and Machine Learning. Focusing on advanced algorithms, neural networks, and practical applications of AI.",
    status: "current",
  },
  {
    year: "2021 - 2022",
    title: "Higher Secondary Education",
    institution: "St.john's Matriculation Higher Secondary School",
    description: "Completed higher secondary education with a focus on Mathematics, Physics, and Computer Science. Graduated with distinction.",
    status: "completed",
  },
  {
    year: "2019 - 2020",
    title: "Secondary Education",
    institution: "St.john's Matriculation Higher Secondary School",
    description: "Completed secondary education with excellent academic performance, developing a strong foundation in mathematics and science.",
    status: "completed",
  },
];

// --- TIMELINE ITEM COMPONENT ---
const EducationTimelineItem = ({ item, isLast }) => {
  const ref = useRef(null);
  // useInView is generally performant, so we keep it for scroll-triggered animations.
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <div ref={ref} className="relative pl-16">
      {/* Vertical line connecting timeline items */}
      {!isLast && (
        <div className="absolute left-[19px] top-5 h-full w-0.5 bg-slate-700" />
      )}

      {/* Timeline Dot */}
      <motion.div
        variants={dotVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute left-0 top-0 z-10"
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${
            item.status === "current"
              ? "bg-purple-500 shadow-purple-500/40"
              : "bg-blue-500 shadow-blue-500/40"
          }`}
        >
          <GraduationCapIcon />
        </div>
      </motion.div>

      {/* Card Content */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        // PERFORMANCE OPTIMIZATION: Replaced `backdrop-blur-sm` with a solid, semi-transparent background.
        // This avoids a very expensive rendering operation that causes lag on mobile.
        className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/80 mb-10 transition-all duration-300 hover:shadow-2xl hover:border-slate-600 hover:bg-slate-800"
      >
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${
            item.status === "current"
              ? "bg-purple-500/20 text-purple-300"
              : "bg-blue-500/20 text-blue-300"
          }`}
        >
          <CalendarIcon />
          <span>{item.year}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
        <p className="text-purple-400 font-medium mb-3">{item.institution}</p>
        <p className="text-slate-300 text-base">{item.description}</p>
      </motion.div>
    </div>
  );
};

// --- MAIN EDUCATION COMPONENT ---
const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="education" className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden font-sans">
      <FloatingElements />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-100">
            Education Journey
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            My academic background and the learning path that has shaped my skills.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-3xl mx-auto">
          {educationData.map((item, index) => (
            <EducationTimelineItem
              key={item.title}
              item={item}
              isLast={index === educationData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- App Component Wrapper ---
// This makes the code a complete, runnable application.
export default function App() {
  return (
    <main className="bg-slate-900">
      <Education />
    </main>
  );
}
