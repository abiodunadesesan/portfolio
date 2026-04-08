"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

export type SkillGroup = {
  label: string;
  items: readonly string[];
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const card = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function StaggerSkillCards({ groups }: { groups: readonly SkillGroup[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="mt-12 grid gap-6 md:grid-cols-2"
      variants={container}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-5%", amount: 0.12 }}
    >
      {groups.map((group) => (
        <motion.div key={group.label} variants={card}>
          <GlassCard spotlight>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/45">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((s) => (
                <li key={s}>
                  <span className="inline-flex rounded-full border border-zinc-200/90 bg-white/80 px-3 py-1.5 text-xs text-zinc-700 md:text-[13px] dark:border-white/12 dark:bg-white/[0.03] dark:text-white/75">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
