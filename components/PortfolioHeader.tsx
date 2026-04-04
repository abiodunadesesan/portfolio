"use client";

import { useEffect, useState } from "react";
import { FolderGit2 } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { links, person } from "@/lib/site-content";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export default function PortfolioHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, top: "-10.5px" }}
      animate={{ opacity: 1, top: "-10.5px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="nav-water-glass fixed inset-x-0 z-[9999] m-0 border-none pt-[10px] transform-gpu"
      style={{ 
        top: "-10.5px",
        marginTop: "env(safe-area-inset-top, 0px)"
      }}
    >
      <div className="flex h-[4.5rem] w-full items-center px-4 sm:px-6 md:h-[5.25rem] md:px-12">





        {/* Left: Branding */}
        <div className="flex flex-1 items-center justify-start min-w-0">
          <a
            href="#main-content"
            className="group min-w-0 shrink-0 py-1"
            aria-label="Back to top"
          >
            <p className="min-w-0 font-sans text-base font-semibold leading-tight tracking-tight text-zinc-900 transition [overflow-wrap:anywhere] group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-200 sm:text-lg md:tracking-tight">
              {person.displayName}
            </p>
            <p className="mt-0.5 line-clamp-1 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-600 dark:text-white/55 sm:text-xs md:normal-case md:tracking-tight">
              <span className="hidden sm:inline">{person.role} · {person.tagline}</span>
              <span className="sm:hidden">{person.role}</span>
            </p>
          </a>
        </div>

        {/* Center: Navigation */}
        <nav
          className="hidden lg:flex flex-[2] items-center justify-center gap-1.5"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium tracking-tight text-zinc-600 transition hover:bg-zinc-900/[0.04] hover:text-zinc-900 dark:text-white/55 dark:hover:bg-white/[0.05] dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200/90 bg-zinc-900/[0.03] px-3 py-2 text-sm font-semibold text-zinc-800 transition hover:border-violet-500/40 hover:bg-violet-500/[0.08] hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/90 dark:hover:border-violet-400/35 dark:hover:text-white sm:px-4"
          >
            <FolderGit2 className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </motion.header>

  );
}

