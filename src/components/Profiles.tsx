"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { portfolioData } from "@/data/portfolioData";
import { Mail, FileText, ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LeetCodeIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

interface ProfileLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  description: string;
}

function ProfileCard({ profile, index }: { profile: ProfileLink; index: number }) {
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
    <motion.a
      href={profile.url}
      target={profile.url.startsWith("mailto:") || profile.url.startsWith("/") ? undefined : "_blank"}
      rel={profile.url.startsWith("http") ? "noopener noreferrer" : undefined}
      download={profile.url.endsWith(".pdf") ? "Sharukesh_Resume.pdf" : undefined}
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring" as const, stiffness: 70, damping: 16, delay: index * 0.08 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setCoords({ x: 0, y: 0 }); }}
        style={{
          transform: `perspective(800px) rotateX(${-coords.y * 12}deg) rotateY(${coords.x * 12}deg)`,
          transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className="group glass-card rounded-2xl p-6 hover:border-primary/20 transition-all duration-300 relative overflow-hidden cursor-pointer select-none h-full"
      >
        {/* Hover glow */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20 z-0"
            style={{
              background: `radial-gradient(250px circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, ${profile.hoverColor}, transparent 60%)`,
            }}
          />
        )}

        <div className="relative z-10 flex items-center gap-4">
          <div
            className={`p-3 rounded-xl border transition-all duration-300 shrink-0 ${
              isHovered
                ? "border-white/15 shadow-lg"
                : "bg-white/5 border-white/5"
            }`}
            style={isHovered ? { backgroundColor: profile.hoverColor, borderColor: profile.color } : {}}
          >
            <div style={{ color: isHovered ? "#fff" : profile.color }}>
              {profile.icon}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-white font-bold text-base group-hover:text-white transition-colors">
              {profile.name}
            </h4>
            <p className="text-gray-500 text-sm truncate">{profile.description}</p>
          </div>

          <ExternalLink
            size={18}
            className="text-gray-600 group-hover:text-white transition-all duration-300 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </motion.a>
  );
}

export default function Profiles() {
  const profiles: ProfileLink[] = [
    {
      name: "GitHub",
      url: portfolioData.social.github || "#",
      icon: <GithubIcon size={22} />,
      color: "#e6edf3",
      hoverColor: "rgba(230, 237, 243, 0.15)",
      description: "View my repositories & open source work",
    },
    {
      name: "LinkedIn",
      url: portfolioData.social.linkedin || "#",
      icon: <LinkedinIcon size={22} />,
      color: "#0a66c2",
      hoverColor: "rgba(10, 102, 194, 0.2)",
      description: "Connect with me professionally",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/SharukeshA/",
      icon: <LeetCodeIcon size={22} />,
      color: "#ffa116",
      hoverColor: "rgba(255, 161, 22, 0.15)",
      description: "Problem solving & competitive coding",
    },
    {
      name: "Email",
      url: `mailto:${portfolioData.social.email || ""}`,
      icon: <Mail size={22} />,
      color: "#06b6d4",
      hoverColor: "rgba(6, 182, 212, 0.15)",
      description: portfolioData.social.email || "Get in touch",
    },
    {
      name: "Resume",
      url: "/Sharukesh_Resume.pdf",
      icon: <FileText size={22} />,
      color: "#8b5cf6",
      hoverColor: "rgba(139, 92, 246, 0.15)",
      description: "Download my latest resume (PDF)",
    },
  ];

  return (
    <SectionWrapper
      id="profiles"
      title="Profiles"
      subtitle="Find me across the web — let's connect!"
    >
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto"
        style={{ perspective: "1200px" }}
      >
        {profiles.map((profile, index) => (
          <ProfileCard key={profile.name} profile={profile} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
