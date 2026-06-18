"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { portfolioData } from "@/data/portfolioData";
import { Code2, Database, Layout, Lightbulb, Terminal, Wrench } from "lucide-react";

function SkillCard({ category, skills, icon }: { category: string; skills: string[]; icon: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const rotateX = -coords.y * 15;
  const rotateY = coords.x * 15;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: isHovered ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="relative group glass-card p-6 rounded-2xl hover:border-primary/20 transition-colors duration-300 shadow-lg hover:shadow-primary/5 select-none overflow-hidden h-full cursor-default"
    >
      {/* Cursor-following glare */}
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 transition-opacity duration-200 opacity-25 z-0"
          style={{
            background: `radial-gradient(350px circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(99, 102, 241, 0.35), transparent 55%)`,
          }}
        />
      )}

      {/* 3D Content */}
      <div
        style={{
          transform: isHovered ? "translateZ(25px)" : "translateZ(0px)",
          transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex flex-col h-full"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <div
            style={{
              transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
              transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            className={`p-2.5 rounded-xl shrink-0 border border-white/5 transition-all duration-300 ${
              isHovered ? "bg-primary/15 border-primary/20 shadow-lg shadow-primary/10" : "bg-white/5"
            }`}
          >
            {icon}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">{category}</h3>
        </div>

        <div
          style={{
            transform: isHovered ? "translateZ(15px)" : "translateZ(0px)",
            transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          className="flex flex-wrap gap-2.5 mt-auto"
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3.5 py-1.5 text-sm bg-white/5 hover:bg-primary/10 hover:text-white border border-white/5 hover:border-primary/20 rounded-lg text-gray-300 transition-all duration-200 cursor-default hover:scale-105 active:scale-95"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const getIconForCategory = (category: string) => {
    switch (category) {
      case "Programming Languages":
        return <Terminal className="text-primary" size={22} />;
      case "Web Development":
        return <Layout className="text-accent" size={22} />;
      case "Database Management":
        return <Database className="text-emerald-400" size={22} />;
      case "Frameworks & APIs":
        return <Code2 className="text-rose-400" size={22} />;
      case "Tools & Platforms":
        return <Wrench className="text-amber-400" size={22} />;
      case "Soft Skills":
        return <Lightbulb className="text-yellow-400" size={22} />;
      default:
        return <Terminal className="text-primary" size={22} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 16,
      },
    },
  };

  return (
    <SectionWrapper
      id="skills"
      title="Technical Expertise"
      subtitle="A comprehensive overview of my technical skills and tools."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        style={{ perspective: "1200px" }}
      >
        {Object.entries(portfolioData.skills).map(([category, skills]) => (
          <motion.div key={category} variants={cardVariants} className="h-full">
            <SkillCard
              category={category}
              skills={skills}
              icon={getIconForCategory(category)}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
