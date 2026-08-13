"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Hero" },
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
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  const showThenAutoHide = useCallback((delay = 1200) => {
    setIsVisible(true);
    if (hideTimerRef.current != null) {
      window.clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, delay);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      showThenAutoHide(1200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimerRef.current != null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, [showThenAutoHide]);

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
    <aside
      className="z-[9000] hidden transition-opacity duration-300 lg:block"
      style={{
        position: "fixed",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "fit-content",
        opacity: isVisible || hovered ? 1 : 0,
        pointerEvents: isVisible || hovered ? "auto" : "none",
      }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-auto flex items-start gap-3"
        onMouseEnter={() => {
          setHovered(true);
          showThenAutoHide(2400);
        }}
        onMouseLeave={() => {
          setHovered(false);
          showThenAutoHide(500);
        }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="hidden rounded-xl border border-zinc-700/45 bg-zinc-900/80 px-3 py-2 shadow-xl backdrop-blur md:block"
        >
          <ul className="space-y-1.5">
            {SECTIONS.map((section) => (
              <li key={`label-${section.id}`}>
                <button
                  onClick={() => scrollToId(section.id)}
                  onFocus={() => showThenAutoHide(2400)}
                  className={`text-left text-[10px] font-semibold uppercase tracking-[0.14em] transition ${
                    activeSection === section.id
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  aria-label={`Scroll to ${section.label}`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="flex flex-col items-end">
          <div className="relative flex h-[248px] w-6 flex-col items-center justify-between py-1.5 sm:h-[276px] lg:h-[296px]">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToId(section.id)}
                className="group relative z-10 flex h-4 w-6 items-center justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/55"
                aria-label={`Scroll to ${section.label}`}
              >
                <span
                  className={`h-[1px] w-[18px] rounded-full transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.92)]"
                      : "bg-zinc-500/60 group-hover:bg-zinc-300/80 dark:bg-zinc-500/55 dark:group-hover:bg-zinc-300/75"
                  }`}
                />
              </button>
            ))}
          </div>

          <motion.button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToId("hero")}
            className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-[0.7rem] border border-zinc-700/42 bg-zinc-900/64 text-zinc-400 backdrop-blur-md transition hover:border-zinc-400/42 hover:text-zinc-200 dark:border-zinc-600/40 dark:bg-zinc-900/76 dark:text-zinc-300 dark:hover:border-zinc-300/42 dark:hover:text-white sm:h-8 sm:w-8 sm:rounded-[0.8rem]"
            aria-label="Back to top"
          >
            <ChevronUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </motion.button>
        </div>
      </div>
    </aside>
  );
}

