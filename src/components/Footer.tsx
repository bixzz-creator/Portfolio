"use client";

import { portfolioData } from "@/data/portfolioData";
import { Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-surface/50 mt-16 sm:mt-20 relative">
      {/* Back to top */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
        className="absolute -top-5 left-1/2 -translate-x-1/2 p-3 glass-card rounded-full border border-white/10 hover:border-primary/30 transition-colors duration-300 group"
      >
        <ArrowUp size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
      </motion.a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold tracking-tighter">
            {portfolioData.personal.name.split(" ")[0]}
            <span className="text-primary">.</span>
          </span>
          <p className="text-gray-500 text-sm">{portfolioData.personal.tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: portfolioData.social.github, icon: <GithubIcon size={18} />, label: "GitHub" },
            { href: portfolioData.social.linkedin, icon: <LinkedinIcon size={18} />, label: "LinkedIn" },
            { href: `mailto:${portfolioData.social.email}`, icon: <Mail size={18} />, label: "Email" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              className="p-2.5 bg-white/5 hover:bg-primary/10 hover:border-primary/20 border border-white/5 rounded-xl transition-all duration-300 text-gray-400 hover:text-primary"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 py-5 sm:py-6 text-center text-sm text-gray-500">
        <p>&copy; {currentYear} by <span className="text-gray-400 font-medium">bixzz-creator</span></p>
      </div>
    </footer>
  );
}
