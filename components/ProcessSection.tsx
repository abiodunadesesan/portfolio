"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { NanoChip } from "@/components/ui/NanoChip";
import { processSteps } from "@/lib/site-content";

export default function ProcessSection() {
  return (
    <AnimatedSection
      id="process"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-white px-6 py-24 dark:border-white/10 dark:bg-[#0a0a10] md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <NanoChip>Process</NanoChip>
          <h2
            id="process-heading"
            className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
          >
            Process is everything
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
            A simple, streamlined workflow that keeps scope clear and momentum high.
          </p>
        </div>

        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li
              key={s.step}
              className="rounded-2xl border border-zinc-200/70 bg-zinc-50/60 p-6 shadow-sm shadow-zinc-900/5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                  Step {s.step}
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500/70 dark:bg-violet-300/70" aria-hidden />
              </div>
              <p className="font-display mt-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                {s.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-white/55">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  );
}

