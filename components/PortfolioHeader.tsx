"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, FolderGit2, Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header
      role="banner"
      className="pointer-events-none sticky top-0 z-[1100] h-0 w-full shrink-0 overflow-visible"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center px-3 pt-3 md:px-5 md:pt-5"
        style={{ paddingTop: `calc(0.9rem + env(safe-area-inset-top, 0px))` }}
      >
        <div className="pointer-events-auto flex w-full max-w-3xl items-center gap-1.5 rounded-full border border-zinc-200/70 bg-white/60 py-2 pl-4 pr-2 font-sans shadow-[0_14px_48px_rgba(15,15,18,0.14)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/[0.12] dark:bg-black/60 dark:shadow-[0_18px_64px_rgba(0,0,0,0.72)] md:gap-2.5 md:pl-6 md:pr-2.5">
          <Link
            href="/"
            className="shrink-0 py-0.5 text-[1.45rem] font-normal leading-none tracking-[-0.02em] text-zinc-900 transition-colors hover:text-zinc-700 md:text-[1.8rem] dark:text-white dark:hover:text-white/90"
            style={{ fontFamily: "var(--font-nav-serif), ui-serif, Georgia, serif" }}
            aria-label="Home"
            onClick={() => setMenuOpen(false)}
          >
            {person.navWordmark}
          </Link>

          <nav
            className="mx-auto hidden min-w-0 flex-1 justify-center gap-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-0.5 md:flex md:gap-1 [&::-webkit-scrollbar]:hidden"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full px-2.5 py-2 text-[12px] font-medium text-zinc-600 transition-colors hover:bg-zinc-900/[0.06] hover:text-zinc-900 sm:px-3 sm:text-[13px] md:px-3.5 md:text-sm dark:text-white/60 dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
            <div className="hidden items-center gap-0.5 sm:gap-1 md:flex">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-900/[0.06] hover:text-zinc-900 dark:text-white/55 dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <FolderGit2 className="h-[17px] w-[17px]" strokeWidth={1.65} aria-hidden />
              </a>
              <ThemeToggle className="h-10 w-10 rounded-full border-zinc-200/90 bg-zinc-900/[0.02] text-zinc-800 dark:border-white/12 dark:bg-white/[0.06] dark:text-white/90" />
              <a
                href={links.bookCall}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a call"
                className="inline-flex h-10 max-w-[7.5rem] items-center justify-center gap-1 rounded-full border border-zinc-900/12 bg-zinc-900/[0.05] px-3 text-[11px] font-medium text-zinc-900 transition-colors hover:border-zinc-900/20 hover:bg-zinc-900/[0.08] sm:max-w-none sm:gap-1.5 sm:px-4 sm:text-sm dark:border-white/[0.18] dark:bg-white/[0.06] dark:text-white dark:hover:border-white/30 dark:hover:bg-white/[0.1]"
              >
                <Calendar className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
                <span className="truncate sm:whitespace-normal">Book a call</span>
              </a>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-800 transition hover:bg-zinc-900/[0.06] md:hidden dark:text-white dark:hover:bg-white/[0.08]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-overlay"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={2} aria-hidden /> : <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />}
            </button>
          </div>
        </div>
      </motion.div>

      {menuOpen ? (
        <div
          id="mobile-nav-overlay"
          className="pointer-events-auto fixed inset-0 z-[5000] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-3 right-3 top-[calc(0.75rem+env(safe-area-inset-top,0px))] max-h-[min(85vh,calc(100dvh-2rem))] overflow-y-auto rounded-3xl border border-white/12 bg-zinc-950/96 p-6 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Menu</p>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile primary">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3.5 text-lg font-medium text-white transition hover:bg-white/[0.06]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href={links.bookCall}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-semibold text-zinc-900 shadow-lg shadow-black/40"
              onClick={() => setMenuOpen(false)}
            >
              <Calendar className="h-5 w-5" aria-hidden />
              Book a call
            </a>
            <div className="mt-6 flex items-center justify-center gap-3 border-t border-white/10 pt-6">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="GitHub"
                onClick={() => setMenuOpen(false)}
              >
                <FolderGit2 className="h-[18px] w-[18px]" strokeWidth={1.65} aria-hidden />
              </a>
              <ThemeToggle className="h-11 w-11 rounded-full border border-white/15 bg-white/5 text-white" />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
