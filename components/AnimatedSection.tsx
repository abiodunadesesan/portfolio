"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

export type AnimatedSectionProps = HTMLMotionProps<"section"> & {
  /** Slightly delay entrance (stagger stacked sections) */
  delay?: number;
};

export function AnimatedSection({
  className,
  children,
  delay = 0,
  ...rest
}: AnimatedSectionProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.28,
        delay: reduce ? 0 : delay * 0.18,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
