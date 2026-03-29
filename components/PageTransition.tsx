"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.main
      id="top"
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
