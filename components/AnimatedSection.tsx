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
      initial={reduce ? false : { opacity: 0, y: 32, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-6%", amount: 0.12 }}
      transition={{
        duration: 0.6,
        delay: reduce ? 0 : delay * 0.38,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
