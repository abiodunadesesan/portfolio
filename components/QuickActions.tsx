"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { NanoChip } from "@/components/ui/NanoChip";
import { links, person } from "@/lib/site-content";
import { Calendar, Mail, FolderGit2, ArrowDownRight } from "lucide-react";

export default function QuickActions() {
  return (
    <AnimatedSection
      id="quick-actions"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-white px-6 py-16 dark:border-white/10 dark:bg-[#0a0a10] md:scroll-mt-28 md:px-12 md:py-20"
      aria-labelledby="quick-actions-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <NanoChip>Start here</NanoChip>
            <h2
              id="quick-actions-heading"
              className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
            >
              Full‑stack &amp; AI/ML engineering that ships.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/60">
              I’m {person.displayName}. I build production-ready web products and practical ML prototypes—focused on clarity,
              performance, and measurable outcomes.
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-[34rem]">
            <a
              href="#work"
              className="group inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 px-5 py-4 text-sm font-semibold text-zinc-900 shadow-sm shadow-zinc-900/5 transition hover:border-violet-300/70 hover:bg-violet-50/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-violet-400/25 dark:hover:bg-violet-500/[0.08]"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowDownRight className="h-4 w-4 opacity-80" aria-hidden />
                See projects
              </span>
              <span className="text-zinc-500 transition group-hover:text-violet-700 dark:text-white/45 dark:group-hover:text-violet-200">
                ↓
              </span>
            </a>

            <a
              href="#contact-form"
              className="group inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-violet-500/25 bg-violet-50/70 px-5 py-4 text-sm font-semibold text-violet-800 shadow-sm shadow-violet-900/10 transition hover:border-violet-500/45 hover:bg-violet-100/70 dark:border-violet-400/20 dark:bg-violet-500/[0.10] dark:text-violet-100 dark:hover:border-violet-400/35 dark:hover:bg-violet-500/[0.16]"
            >
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-80" aria-hidden />
                Contact me
              </span>
              <span className="opacity-70">→</span>
            </a>

            <a
              href={links.bookCall}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white/70 px-5 py-4 text-sm font-semibold text-zinc-900 shadow-sm shadow-zinc-900/5 backdrop-blur-sm transition hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/20"
            >
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 opacity-80" aria-hidden />
                Book a call
              </span>
              <span className="opacity-70">→</span>
            </a>

            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white/70 px-5 py-4 text-sm font-semibold text-zinc-900 shadow-sm shadow-zinc-900/5 backdrop-blur-sm transition hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/20"
            >
              <span className="inline-flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 opacity-80" aria-hidden />
                GitHub
              </span>
              <span className="opacity-70">↗</span>
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

