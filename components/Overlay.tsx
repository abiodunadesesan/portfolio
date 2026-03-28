"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { person } from "@/lib/site-content";

type OverlayProps = {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
};

export default function Overlay({
  scrollYProgress,
  reduceMotion,
}: OverlayProps) {
  const yHero = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? -20 : -90]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? -12 : -55]);
  const yEnd = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? -8 : -40]);

  const opHero = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.28],
    [1, 1, 0.5, 0]
  );
  const opMid = useTransform(
    scrollYProgress,
    [0.18, 0.28, 0.36, 0.44],
    [0, 1, 1, 0]
  );
  const opEnd = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.66, 0.74],
    [0, 1, 1, 0]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
      <div className="relative flex min-h-screen flex-1 items-center justify-center px-6 md:px-12">
        <motion.div
          style={{ opacity: opHero, y: yHero }}
          className="max-w-3xl text-center"
        >
          <h1 className="mx-auto max-w-[100vw] px-1 text-center font-display font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)]">
            <span className="block whitespace-nowrap text-[clamp(0.9rem,4.2vw,4.25rem)]">
              {person.displayName}.
            </span>
            <span className="mt-2 block text-[clamp(0.95rem,2.8vw,1.35rem)] font-medium leading-snug text-white/85 md:mt-3">
              {person.role} · {person.tagline}.
            </span>
          </h1>
        </motion.div>

        <motion.div
          style={{ opacity: opMid, y: yMid }}
          className="absolute left-6 top-1/2 max-w-md -translate-y-1/2 text-left md:left-16 md:max-w-xl"
        >
          <p className="font-display text-3xl font-medium leading-tight text-white/95 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] md:text-5xl">
            I build full-stack apps, dashboards, and ML-backed products.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: opEnd, y: yEnd }}
          className="absolute right-6 top-1/2 max-w-md -translate-y-1/2 text-right md:right-16 md:max-w-xl"
        >
          <p className="font-display text-3xl font-medium leading-tight text-white/95 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] md:text-5xl">
            Bridging interface craft, systems thinking, and research-grade ML.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
