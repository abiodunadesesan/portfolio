"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { testimonials } from "@/lib/site-content";

export default function TestimonialsSection() {
  return (
    <AnimatedSection
      id="testimonials"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-gradient-to-b from-stone-50 to-zinc-100/90 px-6 py-24 dark:border-white/10 dark:from-[#0a0a10] dark:to-[#060608] md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <NanoChip>Social proof</NanoChip>
          <h2
            id="testimonials-heading"
            className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
          >
            Clients love the work
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
            A few short notes that reflect how I collaborate: clear, reliable, and detail-oriented.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {testimonials.map((t, i) => (
            <GlassCard key={`${t.name}-${i}`} className="h-full">
              <div className="flex h-full flex-col gap-4">
                <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-white/80">
                  “{t.quote}”
                </p>
                <div className="mt-auto pt-2">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                  {t.org ? (
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-white/45">{t.org}</p>
                  ) : null}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

