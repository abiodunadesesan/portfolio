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
  /** Skip infinite orb drift on small screens — fewer main-thread ticks & less GPU blur work. */
  const noAmbientDrift = reduceMotion || tier === "mobile";
  const blurHero = tier === "mobile" ? "blur-[56px]" : tier === "tablet" ? "blur-[80px]" : "blur-[100px]";
  const blurMid = tier === "mobile" ? "blur-[48px]" : tier === "tablet" ? "blur-[72px]" : "blur-[90px]";
  const blurSoft = tier === "mobile" ? "blur-[44px]" : tier === "tablet" ? "blur-[64px]" : "blur-[80px]";

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
      {/* Scroll-linked layer: Framer only for opacity + scale. Drift = CSS on inner (no JS ticker). */}
      <motion.div
        className={`absolute -left-1/4 top-0 h-[min(85vh,720px)] w-[min(85vh,720px)] ${blurHero}`}
        style={{ opacity: meshOp, scale: reduceMotion ? 1 : orbScale }}
      >
        <div
          className={`h-full w-full rounded-full bg-violet-500/25 dark:bg-violet-500/30 ${
            noAmbientDrift ? "" : "hero-ambient-drift-a"
          }`}
          style={noAmbientDrift ? undefined : { animationDuration: `${d1}s` }}
        />
      </motion.div>
      <motion.div
        className={`absolute -right-1/4 bottom-0 h-[min(70vh,600px)] w-[min(70vh,600px)] ${blurMid}`}
        style={{ opacity: meshOp }}
      >
        <div
          className={`h-full w-full rounded-full bg-fuchsia-500/20 dark:bg-fuchsia-500/25 ${
            noAmbientDrift ? "" : "hero-ambient-drift-b"
          }`}
          style={noAmbientDrift ? undefined : { animationDuration: `${d2}s` }}
        />
      </motion.div>
      <motion.div
        className={`absolute left-1/2 top-1/3 h-[min(50vh,480px)] w-[min(50vh,480px)] -translate-x-1/2 ${blurSoft}`}
        style={{ opacity: meshOp }}
      >
        <div
          className={`h-full w-full rounded-full bg-amber-400/10 dark:bg-violet-400/15 ${
            noAmbientDrift ? "" : "hero-ambient-breathe"
          }`}
          style={noAmbientDrift ? undefined : { animationDuration: `${d3}s` }}
        />
      </motion.div>

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
