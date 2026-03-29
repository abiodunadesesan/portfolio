"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import type { ProjectItem } from "@/lib/site-content";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function StaggerProjectCards({ items }: { items: readonly ProjectItem[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.ul
      className="grid gap-6 md:grid-cols-2 lg:gap-8"
      variants={container}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-4%", amount: 0.12 }}
    >
      {items.map((p) => (
        <motion.li key={p.href} variants={item} className="h-full">
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full outline-none ring-violet-500/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#08080c]"
          >
            <GlassCard className="group h-full cursor-pointer">
              <div className="flex flex-col gap-3">
                <NanoChip>{p.tag}</NanoChip>
                <h3 className="font-display text-xl font-semibold text-zinc-900 transition-colors group-hover:text-violet-800 md:text-2xl dark:text-white dark:group-hover:text-violet-100">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 md:text-[15px] dark:text-white/55">{p.blurb}</p>
              </div>
            </GlassCard>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
