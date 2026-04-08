"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { proofStats } from "@/lib/site-content";

export default function StatsSection() {
  return (
    <AnimatedSection
      id="stats"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-white px-6 py-20 dark:border-white/10 dark:bg-[#0a0a10] md:scroll-mt-28 md:px-12 md:py-24"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl md:mb-12">
          <NanoChip>Proof</NanoChip>
          <h2
            id="stats-heading"
            className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
          >
            Quick stats
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {proofStats.map((s) => (
            <GlassCard key={s.label} className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                {s.label}
              </p>
              <p className="font-display mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {s.value}
              </p>
              {s.detail ? (
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-white/55">{s.detail}</p>
              ) : null}
            </GlassCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

