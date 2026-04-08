"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { services } from "@/lib/site-content";
import { Sparkles } from "lucide-react";

export default function ServicesSection() {
  return (
    <AnimatedSection
      id="services"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-gradient-to-b from-zinc-50 via-neutral-50 to-stone-100/90 px-6 py-24 dark:border-white/10 dark:from-[#060608] dark:via-[#08080c] dark:to-[#0a0a10] md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <NanoChip>Services</NanoChip>
            <h2
              id="services-heading"
              className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
            >
              How I can help
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
              A focused set of offers that map to what recruiters and clients actually need: shipped work, clear communication,
              and reliable execution.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {services.map((s) => (
            <GlassCard key={s.title} spotlight className="group h-full">
              <div className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-display text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {s.title}
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-violet-500/15 bg-violet-500/[0.06] text-violet-700 transition group-hover:border-violet-500/30 group-hover:bg-violet-500/[0.10] dark:border-violet-400/15 dark:bg-violet-500/[0.08] dark:text-violet-200">
                    <Sparkles className="h-4 w-4" aria-hidden />
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-zinc-600 dark:text-white/55">
                  {s.description}
                </p>

                <ul className="mt-auto space-y-2 pt-2 text-sm text-zinc-700 dark:text-white/70">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500/70 dark:bg-violet-300/70" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

