"use client";

import { useEffect, useState } from "react";
import { FolderGit2 } from "lucide-react";
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
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 py-2 sm:min-h-[4.25rem] sm:gap-4 sm:px-6 md:min-h-[4.5rem] md:gap-6 md:px-8">
        <a
          href="#top"
          className="group min-w-0 shrink py-1"
          aria-label="Back to top"
        >
          <p className="truncate font-display text-base font-semibold leading-tight tracking-tight text-zinc-900 transition group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-200 sm:text-lg">
            {person.displayName}
          </p>
          <p className="mt-0.5 line-clamp-2 max-w-[14rem] text-[11px] font-medium uppercase leading-snug tracking-[0.18em] text-zinc-600 dark:text-white/55 sm:max-w-none sm:text-xs sm:tracking-[0.14em] md:normal-case md:tracking-tight">
            <span className="md:hidden">{person.role}</span>
            <span className="hidden md:inline">
              {person.role} · {person.tagline}
            </span>
          </p>
        </a>

        <nav
          className="flex min-w-0 flex-1 justify-end gap-1 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center sm:gap-1.5 md:gap-2 [&::-webkit-scrollbar]:hidden"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-600 transition hover:bg-zinc-900/[0.06] hover:text-zinc-900 dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white sm:min-h-12 sm:px-3.5 sm:text-[13px] sm:tracking-normal md:min-h-11 md:px-4 md:text-sm md:font-medium md:normal-case md:tracking-tight"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <ThemeToggle />
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border border-zinc-200/90 bg-zinc-900/[0.03] px-3 py-2 text-sm font-semibold text-zinc-800 transition hover:border-violet-500/40 hover:bg-violet-500/[0.08] hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/90 dark:hover:border-violet-400/35 dark:hover:text-white sm:min-h-12 sm:px-4"
          >
            <FolderGit2 className="h-5 w-5 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
