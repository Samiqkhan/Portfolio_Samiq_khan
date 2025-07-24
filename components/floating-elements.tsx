"use client"

import { motion } from "framer-motion"

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Circles */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-500/20 rounded-full blur-sm"
      />

      <motion.div
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/3 w-6 h-6 bg-blue-500/20 rounded-full blur-sm"
      />

      <motion.div
        animate={{
          y: [-15, 15, -15],
          x: [-5, 5, -5],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-500/20 rounded-full blur-sm"
      />

      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [-8, 8, -8],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-green-500/20 rounded-full blur-sm"
      />

      {/* Floating Shapes */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/6 w-8 h-8 border border-purple-500/10 rotate-45"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-2/3 right-1/6 w-6 h-6 border border-blue-500/10 rounded-full"
      />
    </div>
  )
}

export default FloatingElements
