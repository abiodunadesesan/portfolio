"use client";

import Link from "next/link";
import { Calendar, FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { links, person } from "@/lib/site-content";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export default function PortfolioHeader() {
  return (
    <header
      role="banner"
      className="pointer-events-none sticky top-0 z-[1100] h-0 w-full shrink-0 overflow-visible"
    >
      {/* No transform on this node — transform breaks `position:sticky`. Motion lives on the inner wrapper. */}
      {/* Zero layout height + absolute row: hero stays full-bleed underneath; sticky keeps the pill at the top while scrolling. */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center px-3 pt-3 md:px-5 md:pt-5"
        style={{ paddingTop: `calc(0.75rem + env(safe-area-inset-top, 0px))` }}
      >
        <div className="pointer-events-auto flex w-full max-w-3xl items-center gap-1.5 rounded-full border border-zinc-200/70 bg-white/55 py-1.5 pl-3.5 pr-1.5 font-sans shadow-[0_12px_40px_rgba(15,15,18,0.12)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/[0.14] dark:bg-zinc-950/45 dark:shadow-[0_12px_48px_rgba(0,0,0,0.5)] md:gap-2.5 md:pl-5 md:pr-2">
          <Link
            href="/"
            className="shrink-0 py-0.5 text-[1.125rem] font-normal leading-none tracking-[-0.02em] text-zinc-900 transition-colors hover:text-zinc-700 md:text-[1.35rem] dark:text-white dark:hover:text-white/90"
            style={{ fontFamily: "var(--font-nav-serif), ui-serif, Georgia, serif" }}
            aria-label="Home"
          >
            {person.navWordmark}
          </Link>

          <nav
            className="mx-auto flex min-w-0 flex-1 justify-center gap-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-0.5 md:gap-1 [&::-webkit-scrollbar]:hidden"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full px-2 py-1.5 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-900/[0.06] hover:text-zinc-900 sm:px-2.5 sm:text-[13px] md:px-3 md:text-sm dark:text-white/58 dark:hover:bg-white/[0.07] dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-900/[0.06] hover:text-zinc-900 dark:text-white/55 dark:hover:bg-white/[0.08] dark:hover:text-white"
            >
              <FolderGit2 className="h-[17px] w-[17px]" strokeWidth={1.65} aria-hidden />
            </a>
            <ThemeToggle className="h-9 w-9 rounded-full border-zinc-200/90 bg-zinc-900/[0.02] text-zinc-800 dark:border-white/12 dark:bg-white/[0.06] dark:text-white/90" />
            <a
              href={links.bookCall}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a call"
              className="inline-flex h-9 max-w-[7.5rem] items-center justify-center gap-1 rounded-full border border-zinc-900/12 bg-zinc-900/[0.05] px-2.5 text-[11px] font-medium text-zinc-900 transition-colors hover:border-zinc-900/20 hover:bg-zinc-900/[0.08] sm:max-w-none sm:gap-1.5 sm:px-3.5 sm:text-sm dark:border-white/[0.18] dark:bg-white/[0.06] dark:text-white dark:hover:border-white/30 dark:hover:bg-white/[0.1]"
            >
              <Calendar className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
              <span className="truncate sm:whitespace-normal">Book a call</span>
            </a>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
