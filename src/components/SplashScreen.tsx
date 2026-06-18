"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { ArrowRight } from "lucide-react";
import SolarSystemBackground from "./SolarSystemBackground";

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  }, []);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => onEnter(), 1000);
  };

  // Letter-by-letter animation for the name
  const name = portfolioData.personal.name;
  const letterVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.8 + i * 0.05,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="splash"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden cursor-crosshair select-none"
          style={{ background: "#050505" }}
        >
          {/* Solar System Background */}
          <SolarSystemBackground />

          {/* Cursor-following spotlight */}
          <div
            className="absolute pointer-events-none z-[1] transition-all duration-300 ease-out"
            style={{
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            {/* Avatar with parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: 40 }}
              animate={isReady ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ type: "spring" as const, stiffness: 50, damping: 15, delay: 0.1 }}
              className="relative"
              style={{
                transform: `translate(${(mousePos.x - 0.5) * -20}px, ${(mousePos.y - 0.5) * -20}px)`,
              }}
            >
              {/* Outer glow */}
              <div className="absolute -inset-8 rounded-full bg-white/[0.03] blur-[40px] animate-pulse-glow" />

              {/* Avatar container with rotating border */}
              <div className="relative">
                {/* Rotating gradient border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1.5 rounded-3xl"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.15), transparent, rgba(255,255,255,0.08), transparent)",
                  }}
                />

                <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src="/splash-photo.jpg"
                    alt={portfolioData.personal.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Photo overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                  {/* Shine effect on hover */}
                  <div
                    className="absolute inset-0 transition-all duration-200"
                    style={{
                      background: `linear-gradient(${105 + (mousePos.x - 0.5) * 40}deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)`,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Name with letter-by-letter animation */}
            <div
              className="text-center transition-transform duration-200"
              style={{
                transform: `translate(${(mousePos.x - 0.5) * -8}px, ${(mousePos.y - 0.5) * -8}px)`,
              }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white flex flex-wrap justify-center" style={{ perspective: "600px" }}>
                {name.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={isReady ? "visible" : "hidden"}
                    style={{ display: "inline-block" }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isReady ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-4 mx-auto"
                style={{ maxWidth: "200px" }}
              />
            </div>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={isReady ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
              onClick={handleClick}
              className="group relative mt-2 px-8 py-4 rounded-2xl font-semibold text-base sm:text-lg flex items-center gap-3 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] overflow-hidden text-white"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Button shimmer on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                  animation: "shimmer 2s infinite",
                }}
              />

              <span className="relative z-10">Know About Me</span>
              <ArrowRight
                size={20}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </motion.button>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isReady ? { opacity: 1 } : {}}
              transition={{ delay: 2.2, duration: 1 }}
              className="absolute -bottom-20 flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5"
              >
                <motion.div
                  animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-1.5 rounded-full bg-white/40"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isReady ? { opacity: 0.15 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-6 left-6 sm:top-10 sm:left-10 text-xs text-white/40 font-mono tracking-widest"
          >
            PORTFOLIO / 2026
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isReady ? { opacity: 0.15 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-xs text-white/40 font-mono tracking-widest"
          >
            SCROLL TO EXPLORE
          </motion.div>
        </motion.div>
      ) : (
        /* Exit transition - circle wipe */
        <motion.div
          key="splash-exit"
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ background: "#050505" }}
        >
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ background: "var(--background)" }}
          />

          {/* Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
