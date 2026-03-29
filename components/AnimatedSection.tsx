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
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%", amount: 0.15 }}
      transition={{
        duration: 0.2,
        delay: reduce ? 0 : delay * 0.35,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
