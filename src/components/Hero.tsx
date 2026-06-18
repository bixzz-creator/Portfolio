"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { ArrowRight, Download, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 70, damping: 18 },
  },
};

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 sm:pt-20 overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[150px] -z-10 animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[130px] -z-10 animate-float-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[100px] -z-10 animate-float-slow" style={{ animationDelay: "4s" }} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5 md:gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md w-max"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-sm font-medium text-gray-300">
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="gradient-text">{portfolioData.personal.name}</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 font-medium"
          >
            {portfolioData.personal.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl leading-relaxed"
          >
            {portfolioData.personal.bio}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mt-2"
          >
            <a
              href="#contact"
              className="group px-6 py-3 rounded-xl bg-white hover:bg-gray-200 text-black font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-white/10 hover:shadow-white/20 text-sm sm:text-base"
            >
              Get in Touch
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="/Sharukesh_Resume.pdf"
              download="Sharukesh_Resume.pdf"
              className="px-6 py-3 rounded-xl border border-white/10 hover:border-primary/30 hover:bg-primary/5 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Floating Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.4 }}
          className="relative flex justify-center order-first md:order-last"
        >
          {/* Glow ring behind avatar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-52 h-52 sm:w-72 sm:h-72 md:w-88 md:h-88 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-[40px] animate-pulse-glow" />
          </div>

          <motion.div
            animate={{
              y: [0, -12, 0, 6, 0],
              rotateZ: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Dashed orbit ring */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full p-2 border-2 border-dashed border-primary/20">

              <div className="w-full h-full rounded-full bg-surface overflow-hidden flex items-center justify-center border border-white/10 relative shadow-2xl">
                {portfolioData.personal.avatar ? (
                  <img
                    src={portfolioData.personal.avatar}
                    alt={portfolioData.personal.name}
                    className="w-full h-full object-cover object-[center_15%] relative z-10"
                  />
                ) : (
                  <div className="text-6xl text-primary font-bold gradient-text">
                    {portfolioData.personal.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
