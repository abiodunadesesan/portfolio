"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
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
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed left-0 right-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/72 dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:supports-[backdrop-filter]:bg-[#08080a]/70"
          : "border-b border-transparent bg-gradient-to-b from-white/92 via-white/55 to-transparent dark:from-[#08080a]/95 dark:via-[#08080a]/40 dark:to-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:h-16 sm:px-6 md:gap-6 md:px-8">
        <a href="#top" className="group min-w-0 shrink" aria-label="Back to top">
          <p className="truncate font-display text-sm font-semibold tracking-tight text-zinc-900 transition group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-200 sm:text-[15px]">
            {person.displayName}
          </p>
          <p className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:block dark:text-white/38">
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
              className="shrink-0 rounded-lg px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500 transition hover:bg-zinc-900/[0.06] hover:text-zinc-900 dark:text-white/45 dark:hover:bg-white/[0.06] dark:hover:text-white sm:px-3 sm:text-[12px] sm:tracking-normal md:px-3.5 md:text-[13px] md:font-medium md:normal-case md:tracking-tight"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
            className="rounded-lg border border-zinc-200/90 bg-zinc-900/[0.03] px-2.5 py-2 text-[12px] font-medium text-zinc-800 transition hover:border-violet-500/40 hover:bg-violet-500/[0.08] hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/85 dark:hover:border-violet-400/35 dark:hover:text-white sm:px-3"
          >
            <span className="hidden sm:inline">GitHub</span>
            <span className="sm:hidden" aria-hidden>
              GH
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
