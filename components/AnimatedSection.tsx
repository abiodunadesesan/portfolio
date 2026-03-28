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
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%", amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
