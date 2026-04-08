"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { reasons } from "@/lib/site-content";

/**
 * Scroll-stacked, alternating alignment: cards overlap slightly, then settle left/right as you scroll.
 * (Desktop: left/right timeline feel. Mobile: single column.)
 */
export default function WhyChooseMeSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="why"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-white px-6 py-24 dark:border-white/10 dark:bg-[#0a0a10] md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 max-w-2xl md:mb-16"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%", amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <NanoChip>Why choose me</NanoChip>
          <h2
            id="why-heading"
            className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
          >
            Why partner with me
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
            The mix recruiters and clients want: strong execution, good taste, and a process that makes hiring low-risk.
          </p>
        </motion.div>

        <div className="relative">
          {/* center rail (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block"
          />

          <div className="space-y-[-18px] lg:space-y-[-28px]">
            {reasons.map((r, i) => {
              const left = i % 2 === 0;
              const fromX = left ? 90 : -90; // start “closer to center”
              const toX = 0; // settle at side alignment
              return (
                <div key={r.title} className="relative">
                  {/* bead (desktop) */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-8 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white/35 shadow-[0_0_18px_rgba(255,255,255,0.18)] lg:block"
                  />

                  <div className={`flex ${left ? "justify-start" : "justify-end"}`}>
                    <motion.div
                      className="w-full lg:w-[calc(50%-1.25rem)]"
                      initial={reduce ? false : { opacity: 0, y: 24, x: fromX, scale: 0.985 }}
                      whileInView={{ opacity: 1, y: 0, x: toX, scale: 1 }}
                      viewport={{ once: true, margin: "-10%", amount: 0.28 }}
                      transition={{
                        duration: 0.6,
                        delay: reduce ? 0 : i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ zIndex: reasons.length - i }}
                    >
                      <GlassCard
                        spotlight
                        className="h-full border-zinc-200/90 p-6 shadow-[0_26px_90px_-34px_rgba(0,0,0,0.55)] md:p-8 dark:border-white/[0.12] dark:bg-[#0d0d12]/[0.92] dark:shadow-[0_34px_110px_-40px_rgba(0,0,0,0.8)]"
                      >
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-400 dark:text-white/35">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <p className="font-display mt-3 text-lg font-semibold tracking-tight text-zinc-900 md:text-xl dark:text-white">
                          {r.title}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/58">
                          {r.body}
                        </p>
                      </GlassCard>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
