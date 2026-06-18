"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // Extract numeric part
  const numMatch = target.match(/[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const prefix = target.replace(/[\d.]+.*/, "");
  const textAfter = target.replace(/.*[\d.]+/, "");
  const isDecimal = target.includes(".");

  useEffect(() => {
    if (!isInView || num === 0) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * num;
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, num]);

  const display = isDecimal ? count.toFixed(2) : Math.round(count).toString();

  return (
    <span ref={ref}>
      {prefix}{display}{textAfter}{suffix}
    </span>
  );
}

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 80, damping: 16, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setCoords({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(800px) rotateX(${-coords.y * 15}deg) rotateY(${coords.x * 15}deg)`,
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="group glass-card rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden cursor-default select-none hover:border-primary/20 transition-colors duration-300"
    >
      {/* Hover glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
          style={{
            background: `radial-gradient(300px circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(99, 102, 241, 0.3), transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default function Stats() {
  const stats = [
    { label: "CGPA", value: "8.32", subtitle: "B.Tech IT" },
    { label: "Projects", value: "3+", subtitle: "Completed" },
    { label: "Certifications", value: "3", subtitle: "NPTEL & Oracle" },
    { label: "Languages", value: "Java", subtitle: "Primary", isText: true },
  ];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <TiltCard key={index} index={index}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {stat.isText ? (
                stat.value
              ) : (
                <AnimatedCounter target={stat.value} />
              )}
            </h3>
            <p className="text-primary font-semibold text-sm">{stat.label}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
