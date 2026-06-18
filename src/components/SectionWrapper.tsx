"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 20,
      mass: 1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 16,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 18,
      delay: 0.15,
    },
  },
};

export default function SectionWrapper({
  id,
  children,
  className = "",
  title,
  subtitle,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVariants}
      style={{ perspective: "1200px" }}
      className={`py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full ${className}`}
    >
      {(title || subtitle) && (
        <motion.div
          variants={titleVariants}
          className="mb-14 text-center md:text-left"
        >
          {title && (
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="gradient-text">
                {title}
              </span>
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}
      <motion.div variants={childVariants}>
        {children}
      </motion.div>
    </motion.section>
  );
}
