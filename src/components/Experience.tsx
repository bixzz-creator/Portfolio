"use client";

import SectionWrapper from "./SectionWrapper";
import { portfolioData } from "@/data/portfolioData";
import { Briefcase, CheckCircle2, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Experience() {
  if (!portfolioData.experience?.length) return null;

  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="Professional experience and industry exposure."
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {portfolioData.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: index * 0.1 }}
            style={{ perspective: "1000px" }}
            className="glass-card rounded-2xl p-6 sm:p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{exp.position}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase size={15} className="text-primary" />
                  <span className="text-primary font-medium">{exp.company}</span>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/5">
                {exp.duration}
              </span>
            </div>

            <p className="text-gray-400 mb-4 text-sm sm:text-base">{exp.description}</p>

            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="space-y-2.5">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.2 }}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <CheckCircle2 size={15} className="text-accent mt-0.5 shrink-0" />
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
