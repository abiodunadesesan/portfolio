"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ChevronUp } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Zenith" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "recent", label: "Recent" },
  { id: "why", label: "Why" },
  { id: "faq", label: "FAQ" },
  { id: "lets-connect", label: "Connect" },
  { id: "contact-form", label: "Contact" },
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
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // Desktop-only: show on devices with a fine pointer (mouse/trackpad).
  useEffect(() => {
    const anyFine = window.matchMedia("(any-pointer: fine)").matches;
    const anyCoarse = window.matchMedia("(any-pointer: coarse)").matches;
    setEnabled(anyFine || !anyCoarse);
  }, []);

  // Auto-hide logic: show on scroll, hide after 2 seconds of inactivity
  useEffect(() => {
    if (!enabled) return;
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(false), 2000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled]);

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
    if (!enabled) return;
    const sectionIndex = Math.min(
      Math.floor(latest * SECTIONS.length),
      SECTIONS.length - 1
    );
    setActiveSection(SECTIONS[sectionIndex].id);
  });

  if (!enabled) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        right: "12px",




        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: isVisible ? "auto" : "none"
      }}
      className="hidden gap-8 lg:flex"
      aria-hidden="true"
    >
      {/* The Track & Beads */}
      <div className="relative flex h-[320px] w-[2px] flex-col items-center justify-between py-2">
        {/* Glass Track */}
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md dark:bg-white/5 border border-white/10" />

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
                ? "bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
                : "bg-white/10 group-hover:bg-white/40"
              }`} 
            />
            
            {/* Label Tooltip */}
            <span className="absolute right-8 origin-right scale-0 text-[10px] font-bold uppercase tracking-widest text-white/40 transition-all duration-300 group-hover:scale-100">
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
        className="group relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/30 shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:text-white/80"
      >
        {/* Glow Ring */}
        <div className="absolute inset-0 scale-75 rounded-2xl bg-white/0 blur-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/5" />
        
        <ChevronUp className="relative h-5 w-5" />
        
        {/* "Zenith" Label */}
        <span className="absolute -top-6 text-[8px] font-black uppercase tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-30">
          Zenith
        </span>
      </motion.button>
    </motion.div>
  );
}

