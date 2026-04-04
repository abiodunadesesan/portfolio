"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ChevronUp } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Zenith" },
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Logic" },
  { id: "skills", label: "Stack" },
  { id: "contact", label: "Contact" },
];

/**
 * 'Mercury-Zenith' Ultra-Modern Scroll Navigator
 * - Interactive glass beads for each section
 * - Liquid mercury-style capsule tracking
 * - Click-to-Zenith (Back to Top) controller
 */
export default function VerticalScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("hero");

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale the mercury capsule's position across the full track
  const capsuleY = useTransform(smoothProgress, [0, 1], ["0%", "calc(100% - 32px)"]);

  const scrollToId = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    const offset = 80; // Accounting for sticky header
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: id === "hero" ? 0 : offsetPosition,
      behavior: "smooth",
    });
  }, []);

  // Update active section based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionIndex = Math.min(
      Math.floor(latest * SECTIONS.length),
      SECTIONS.length - 1
    );
    setActiveSection(SECTIONS[sectionIndex].id);
  });

  return (
    <div
      style={{
        position: "fixed",
        right: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      className="hidden gap-8 lg:flex"
      aria-hidden="true"
    >
      {/* The Track & Beads */}
      <div className="relative flex h-[320px] w-[2px] flex-col items-center justify-between py-2">
        {/* Glass Track */}
        <div className="absolute inset-0 rounded-full bg-zinc-200/40 backdrop-blur-md dark:bg-white/10" />

        {/* Mercury Capsule (The Tracker) */}
        <motion.div
          style={{ top: capsuleY }}
          className="absolute left-1/2 z-20 h-8 w-4 -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-400 via-fuchsia-500 to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.7)]"
        >
          <div className="h-full w-full animate-pulse rounded-full bg-white/20 blur-[1px]" />
        </motion.div>

        {/* Section Beads */}
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToId(section.id)}
            className="group relative z-10 flex h-3 w-3 items-center justify-center focus:outline-none"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* The Bead */}
            <div 
              className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                activeSection === section.id 
                ? "bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
                : "bg-zinc-400/60 dark:bg-white/20 group-hover:bg-white/60"
              }`} 
            />
            
            {/* Label Tooltip */}
            <span className="absolute right-8 origin-right scale-0 text-[10px] font-bold uppercase tracking-widest text-zinc-500 transition-all duration-300 group-hover:scale-100 dark:text-white/40">
              {section.label}
            </span>
          </button>
        ))}
      </div>

      {/* Zenith Controller (Back to Top) */}
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scrollToId("hero")}
        className="group relative flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/50 bg-white/80 text-zinc-500 shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-violet-500/50 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-white/40 dark:hover:border-violet-400/30 dark:hover:text-violet-300"
      >
        {/* Glow Ring */}
        <div className="absolute inset-0 scale-75 rounded-2xl bg-violet-500/0 blur-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-violet-500/20" />
        
        <ChevronUp className="relative h-5 w-5" />
        
        {/* "Zenith" Label */}
        <span className="absolute -top-6 text-[8px] font-black uppercase tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-60">
          Zenith
        </span>
      </motion.button>
    </div>
  );
}
