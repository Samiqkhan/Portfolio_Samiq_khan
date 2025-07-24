"use client";

import { GraduationCap, Calendar } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Configuration for the floating background elements.
const floatingElementsConfig = [
  {
    id: 1,
    animate: { y: [-20, 20, -20] },
    transition: { duration: 30, repeat: Infinity, ease: "linear" },
    className:
      "absolute top-[10%] left-[15%] w-20 h-20 bg-blue-500/10 rounded-full blur-2xl",
  },
  {
    id: 2,
    animate: { y: [25, -25, 25] },
    transition: { duration: 35, repeat: Infinity, ease: "linear" },
    className:
      "absolute top-[50%] right-[10%] w-28 h-28 bg-green-500/10 rounded-full blur-2xl",
  },
  {
    id: 3,
    animate: { y: [-25, 25, -25] },
    transition: { duration: 28, repeat: Infinity, ease: "linear" },
    className:
      "absolute bottom-[5%] left-[20%] w-24 h-24 bg-purple-500/10 rounded-full blur-2xl",
  },
];

// Component for rendering the animated floating background shapes.
const FloatingElements = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
    {floatingElementsConfig.map((el) => (
      <motion.div
        key={el.id}
        animate={el.animate}
        transition={el.transition}
        className={el.className}
      />
    ))}
  </div>
);

// Data for the education section.
const educationData = [
  {
    year: "2022 - Present",
    title: "B.E in Computer Science (AIML)",
    institution: "K S Rangasamy College of Technology",
    description:
      "Pursuing a Bachelor's degree with a specialization in Artificial Intelligence and Machine Learning. Focusing on advanced algorithms, neural networks, and practical applications of AI.",
    status: "current",
  },
  {
    year: "2021 - 2022",
    title: "Higher Secondary Education",
    institution: "St.john's Matriculation Higher Secondary School",
    description:
      "Completed higher secondary education with a focus on Mathematics, Physics, and Computer Science. Graduated with distinction.",
    status: "completed",
  },
  {
    year: "2019 - 2020",
    title: "Secondary Education",
    institution: "St.john's Matriculation Higher Secondary School",
    description:
      "Completed secondary education with excellent academic performance, developing a strong foundation in mathematics and science.",
    status: "completed",
  },
];

/**
 * Represents a single item in the education timeline.
 * @param {object} props - The component props.
 * @param {object} props.item - The education data for the item.
 * @param {boolean} props.isLast - Flag to indicate if it's the last item in the timeline.
 */
const EducationTimelineItem = ({ item, isLast }) => {
  const ref = useRef(null);
  // Trigger animation when the item is 50% in view.
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Animation variants for the content card.
  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation variants for the timeline dot.
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
          <GraduationCap size={20} />
        </div>
      </motion.div>

      {/* Card Content */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700/80 mb-10 transform transition-all duration-300 hover:shadow-2xl hover:border-slate-600"
      >
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${
            item.status === "current"
              ? "bg-purple-500/20 text-purple-300"
              : "bg-blue-500/20 text-blue-300"
          }`}
        >
          <Calendar className="h-4 w-4 mr-2" />
          <span>{item.year}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
        <p className="text-purple-400 font-medium mb-3">{item.institution}</p>
        <p className="text-slate-300 text-base">{item.description}</p>
      </motion.div>
    </div>
  );
};

/**
 * The main Education component that orchestrates the timeline.
 */
const Education = () => {
  const ref = useRef(null);
  // Trigger animation when the section title is 20% in view.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="education"
      className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden"
    >
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
            My academic background and the learning path that has shaped my
            skills.
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

export default Education;
