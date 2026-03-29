"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useBreakpointTier } from "@/hooks/useBreakpointTier";

type Props = {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
};

/** Cinematic layers above the canvas: mesh lights, vignette, film grain. */
export default function HeroAtmosphere({ scrollYProgress, reduceMotion }: Props) {
  const tier = useBreakpointTier();

  const meshEnd = tier === "mobile" ? 0.095 : tier === "tablet" ? 0.118 : 0.14;
  const vignetteStops =
    tier === "mobile" ? [0, 0.14, 0.36] : tier === "tablet" ? [0, 0.18, 0.42] : [0, 0.22, 0.5];
  const d1 = tier === "mobile" ? 7.5 : tier === "tablet" ? 9 : 11;
  const d2 = tier === "mobile" ? 9 : tier === "tablet" ? 11 : 13;
  const d3 = tier === "mobile" ? 6.5 : tier === "tablet" ? 8 : 9;

  const vignetteOp = useTransform(scrollYProgress, vignetteStops, [0.55, 0.76, 0.9]);
  const meshOp = useTransform(scrollYProgress, [0, meshEnd], [1, 0.32]);
  const orbScale = useTransform(scrollYProgress, (v) => 1 + 0.08 * (1 - Math.pow(1 - v, 1.4)));

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <motion.div
        className="absolute -left-1/4 top-0 h-[min(85vh,720px)] w-[min(85vh,720px)] rounded-full bg-violet-500/25 blur-[100px] dark:bg-violet-500/30"
        style={{ opacity: meshOp, scale: reduceMotion ? 1 : orbScale }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 18, 0],
                y: [0, -12, 0],
              }
        }
        transition={{ duration: d1, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[min(70vh,600px)] w-[min(70vh,600px)] rounded-full bg-fuchsia-500/20 blur-[90px] dark:bg-fuchsia-500/25"
        style={{ opacity: meshOp }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -22, 0],
                y: [0, 14, 0],
              }
        }
        transition={{ duration: d2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-[min(50vh,480px)] w-[min(50vh,480px)] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[80px] dark:bg-violet-400/15"
        style={{ opacity: meshOp }}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
              }
        }
        transition={{ duration: d3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_35%,rgba(0,0,0,0.5)_100%)] dark:bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_40%,rgba(0,0,0,0.55)_100%)]"
        style={{ opacity: vignetteOp }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,255,255,0.12),transparent_50%)] mix-blend-soft-light dark:opacity-90 dark:mix-blend-overlay" />

      <div
        className="hero-noise absolute inset-0 opacity-[0.04] mix-blend-overlay dark:opacity-[0.07]"
        aria-hidden
      />
    </div>
  );
}
