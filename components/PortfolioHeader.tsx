"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { links, person } from "@/lib/site-content";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export default function PortfolioHeader() {
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#08080a]/85 backdrop-blur-xl supports-[backdrop-filter]:bg-[#08080a]/70"
          : "border-b border-transparent bg-gradient-to-b from-[#08080a]/95 via-[#08080a]/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:h-16 sm:px-6 md:gap-6 md:px-8">
        <a href="#top" className="group min-w-0 shrink" aria-label="Back to top">
          <p className="truncate font-display text-sm font-semibold tracking-tight text-white transition group-hover:text-violet-200 sm:text-[15px]">
            {person.displayName}
          </p>
          <p className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/38 sm:block">
            {person.role} · {person.tagline}
          </p>
        </a>

        <nav
          className="flex min-w-0 flex-1 justify-end gap-0.5 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center md:gap-1 [&::-webkit-scrollbar]:hidden"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-lg px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45 transition hover:bg-white/[0.06] hover:text-white sm:px-3 sm:text-[12px] sm:tracking-normal md:px-3.5 md:text-[13px] md:font-medium md:normal-case md:tracking-tight"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-[12px] font-medium text-white/85 transition hover:border-violet-400/35 hover:bg-violet-500/[0.08] hover:text-white sm:px-3"
        >
          <span className="hidden sm:inline">GitHub</span>
          <span className="sm:hidden" aria-hidden>
            GH
          </span>
        </a>
      </div>
    </motion.header>
  );
}
