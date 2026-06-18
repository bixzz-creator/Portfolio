"use client";

import { useState, useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { portfolioData } from "@/data/portfolioData";
import { ExternalLink, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/types";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setCoords({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(900px) rotateX(${-coords.y * 10}deg) rotateY(${coords.x * 10}deg)`,
        transformStyle: "preserve-3d",
        transition: isHovered ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="group flex flex-col glass-card rounded-2xl overflow-hidden hover:border-primary/20 transition-colors duration-300 hover:shadow-xl hover:shadow-primary/5 cursor-default"
    >
      {/* Image with parallax */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-hover">
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium text-sm">
          <span>{project.title}</span>
        </div>
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            style={{
              transform: isHovered
                ? `scale(1.08) translate(${-coords.x * 8}px, ${-coords.y * 8}px)`
                : "scale(1)",
              transition: isHovered ? "none" : "transform 0.5s ease-out",
            }}
            className="w-full h-full object-cover relative z-10"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-80 z-20" />
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-2.5 py-1 bg-primary/8 text-primary-light border border-primary/10 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs font-medium px-2.5 py-1 bg-white/5 text-gray-400 rounded-md">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
          <button
            onClick={onClick}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Eye size={16} /> View Details
          </button>
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
            >
              <GithubIcon size={16} /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 8 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring" as const, stiffness: 70, damping: 16 },
    },
  };

  return (
    <>
      <SectionWrapper
        id="projects"
        title="Featured Projects"
        subtitle="Some of my recent work bridging the gap between hardware and intelligent software."
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          style={{ perspective: "1200px" }}
        >
          {portfolioData.projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30, rotateX: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="glass-card rounded-2xl border border-white/10 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ perspective: "1000px" }}
            >
              {/* Modal Header Image */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-2xl bg-surface-hover">
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium">
                  <span>{selectedProject.title}</span>
                </div>
                {selectedProject.imageUrl && (
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover relative z-10"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80 z-20" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 hover:scale-110"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h2>

                <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm font-medium px-3 py-1.5 bg-primary/10 text-primary-light rounded-lg border border-primary/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/5">
                  {selectedProject.links?.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 bg-white/8 hover:bg-white/12 text-white rounded-xl transition-all duration-200"
                    >
                      <GithubIcon size={18} /> View on GitHub
                    </a>
                  )}
                  {selectedProject.links?.live && (
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 bg-white hover:bg-gray-200 text-black rounded-xl transition-all duration-200"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
