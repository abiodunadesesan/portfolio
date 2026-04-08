"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import type { ExperienceItem } from "@/lib/site-content";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const row = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function StaggerTimeline({ items }: { items: readonly ExperienceItem[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.ol
      className="mt-14 space-y-0 border-l border-zinc-300/80 pl-8 dark:border-white/10 md:pl-10"
      variants={container}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-5%", amount: 0.1 }}
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={row} className="relative pb-12 last:pb-0">
          <span
            className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-violet-600 shadow-[0_0_12px_rgba(109,40,217,0.45)] dark:bg-violet-400 dark:shadow-[0_0_12px_rgba(167,139,250,0.6)] md:-left-[25px]"
            aria-hidden
          />
          <GlassCard spotlight className="relative overflow-hidden">
            <div className="flex flex-col gap-2 gap-y-1 md:flex-row md:items-start md:justify-between">
              <p className="font-display text-lg font-semibold text-zinc-900 md:text-xl dark:text-white">{item.title}</p>
              <NanoChip className="shrink-0 self-start md:mt-0.5">{item.period}</NanoChip>
            </div>
            <p className="mt-1 text-sm font-medium text-violet-700 dark:text-violet-200/80">{item.org}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-[15px] dark:text-white/55">{item.detail}</p>
          </GlassCard>
        </motion.li>
      ))}
    </motion.ol>
  );
}
