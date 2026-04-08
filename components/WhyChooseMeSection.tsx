"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { reasons } from "@/lib/site-content";

/**
 * Two-column grid of reason cards with scroll reveal (aligned with buildwithtricia.com/about —
 * not a tall sticky stack, which read as “cards on top of each other”).
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

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%", amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: reduce ? 0 : i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassCard
                spotlight
                className="h-full border-zinc-200/90 p-6 shadow-[0_20px_70px_-24px_rgba(0,0,0,0.4)] md:p-8 dark:border-white/[0.12] dark:bg-[#0d0d12]/[0.92] dark:shadow-[0_28px_90px_-28px_rgba(0,0,0,0.65)]"
              >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-400 dark:text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display mt-3 text-lg font-semibold tracking-tight text-zinc-900 md:text-xl dark:text-white">
                  {r.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/58">{r.body}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
