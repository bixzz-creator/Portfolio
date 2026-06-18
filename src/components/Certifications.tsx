"use client";

import { useRef, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { portfolioData } from "@/data/portfolioData";
import { Award, ExternalLink, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

function CertCard({ cert, index }: { cert: typeof portfolioData.certifications[0]; index: number }) {
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 70, damping: 16, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setCoords({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(800px) rotateX(${-coords.y * 12}deg) rotateY(${coords.x * 12}deg)`,
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="group glass-card rounded-2xl p-6 hover:border-primary/20 transition-colors duration-300 flex flex-col relative overflow-hidden cursor-default select-none"
    >
      {/* Hover glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
          style={{
            background: `radial-gradient(250px circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(99, 102, 241, 0.3), transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon & Issuer Badge */}
        <div className="flex items-start justify-between mb-5">
          <div className={`p-3 rounded-xl border transition-all duration-300 ${
            isHovered
              ? "bg-primary/15 border-primary/20 shadow-lg shadow-primary/10"
              : "bg-gradient-to-br from-primary/10 to-accent/5 border-white/5"
          }`}>
            <Award size={22} className="text-primary" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            {cert.issuer}
          </span>
        </div>

        {/* Certificate Name */}
        <h4 className="text-base sm:text-lg font-bold text-white mb-3 leading-snug group-hover:text-primary transition-colors duration-300 flex-1">
          {cert.name}
        </h4>

        {/* Details */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={13} className="text-gray-500" />
            <span>Issued {cert.issuedDate}</span>
          </div>

          {cert.score && (
            <div className="flex items-center gap-2">
              <TrendingUp size={13} className="text-accent" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-300">Score</span>
                  <span className="text-sm font-bold text-accent">{cert.score}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: cert.score }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 + 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </div>
            </div>
          )}

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary-light font-medium transition-colors mt-2"
            >
              <ExternalLink size={13} />
              View Credential
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <SectionWrapper
      id="certifications"
      title="Certifications"
      subtitle="Professional credentials and validated expertise."
    >
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" style={{ perspective: "1200px" }}>
        {portfolioData.certifications.map((cert, index) => (
          <CertCard key={cert.id} cert={cert} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
