"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full"
    >
      <div className="mb-14 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          <span className="gradient-text">Get in Touch</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
          Have a question, a project idea, or just want to connect? Drop a message below!
        </p>
      </div>

      <div
        className="rounded-2xl overflow-visible relative w-full"
        style={{ minHeight: "750px" }}
      >
        <iframe
          src="https://forms.visme.co/formsPlayer/33png801-contact-us-form"
          width="100%"
          height="750"
          style={{
            border: "none",
            minHeight: "750px",
            width: "100%",
            borderRadius: "16px",
          }}
          title="Contact Us Form"
          allowFullScreen
          allow="clipboard-write"
        />
      </div>
    </motion.section>
  );
}
