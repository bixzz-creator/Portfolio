"use client";

import SectionWrapper from "./SectionWrapper";
import { portfolioData } from "@/data/portfolioData";
import { GraduationCap, MapPin, Calendar, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function Education() {
  const cardVariants = {
    hidden: { opacity: 0, x: -40, rotateY: 5 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 18,
        delay: i * 0.15,
      },
    }),
  };

  return (
    <SectionWrapper
      id="education"
      title="Academic Background"
      subtitle="My educational journey and academic achievements."
    >
      <div className="max-w-4xl mx-auto relative">
        {/* Animated vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/20 to-transparent hidden sm:block" />

        <div className="space-y-6 sm:space-y-8">
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              style={{ perspective: "1000px" }}
              className="group relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-8 top-8 -translate-x-1/2 z-20 hidden sm:block">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.15 + 0.2 }}
                  className={`w-4 h-4 rounded-full border-2 ${
                    index === 0
                      ? "bg-primary border-primary shadow-lg shadow-primary/40"
                      : "bg-surface border-white/20"
                  }`}
                />
              </div>

              <div className="sm:ml-16 md:ml-20 glass-card rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex flex-col md:flex-row">
                  {/* Institution Image */}
                  <div className="relative md:w-56 h-40 md:h-auto overflow-hidden bg-surface-hover shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <GraduationCap size={36} className="text-primary/30 mx-auto mb-2" />
                        <span className="text-xs text-gray-500 font-medium">{edu.institution.split(",")[0]}</span>
                      </div>
                    </div>
                    {edu.imageUrl && (
                      <img
                        src={edu.imageUrl}
                        alt={edu.institution}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 relative z-10"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 z-20 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/80 z-20 md:hidden" />

                    {index === 0 && (
                      <div className="absolute top-3 left-3 z-30 bg-white/90 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-white/10">
                        Current
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 sm:p-6 md:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{edu.degree}</h3>
                        {edu.field && (
                          <p className="text-primary font-medium text-sm">{edu.field}</p>
                        )}
                      </div>
                      {edu.gpa && (
                        <div className="flex items-center gap-2 bg-accent/8 border border-accent/15 px-3 py-1.5 rounded-xl">
                          <Trophy size={14} className="text-accent" />
                          <span className="text-accent font-bold text-sm">{edu.gpa}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-gray-500" />
                        {edu.institution}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-gray-500" />
                        {edu.graduationYear}
                      </span>
                    </div>

                    {edu.highlights && edu.highlights.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="grid sm:grid-cols-2 gap-2">
                          {edu.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
