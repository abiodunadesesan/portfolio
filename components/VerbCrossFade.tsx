"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  verbs: readonly string[];
  intervalMs?: number;
  className?: string;
};

/** Rotating verb with cross-fade (Tricia-style CTA). */
export function VerbCrossFade({ verbs, intervalMs = 2800, className = "" }: Props) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || verbs.length < 2) return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % verbs.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduce, verbs.length, intervalMs]);

  if (verbs.length === 0) return null;

  return (
    <span className={`relative inline-grid min-w-[6ch] place-items-start ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={verbs[reduce ? 0 : i]}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 font-semibold text-violet-400 dark:text-violet-300"
        >
          {verbs[reduce ? 0 : i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
