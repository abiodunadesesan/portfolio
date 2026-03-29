"use client";

import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { person } from "@/lib/site-content";

type OverlayProps = {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
};

const nameWords = person.displayName.split(" ");

const introContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.085, delayChildren: 0.15 },
  },
};

const wordReveal = {
  hidden: {
    opacity: 0,
    y: 48,
    rotateX: -18,
    filter: "blur(14px)",
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const subReveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ScrollCue({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const op = useTransform(scrollYProgress, [0, 0.07, 0.13], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.13], [0, 12]);

  return (
    <motion.div
      style={{ opacity: op, y }}
      className="pointer-events-auto absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 md:bottom-10"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-zinc-600/90 dark:text-white/45">
        Explore
      </span>
      <motion.div
        className="relative flex h-12 w-[22px] justify-center rounded-full border border-zinc-300/60 bg-white/10 dark:border-white/15 dark:bg-white/[0.04]"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(139, 92, 246, 0)",
            "0 0 24px 2px rgba(139, 92, 246, 0.2)",
            "0 0 0 0 rgba(139, 92, 246, 0)",
          ],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.span
          className="absolute top-2 h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-300"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Overlay({
  scrollYProgress,
  reduceMotion,
}: OverlayProps) {
  const yHero = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? -28 : -120]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? -16 : -72]);
  const yEnd = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? -12 : -52]);

  const blurHero = useTransform(scrollYProgress, [0, 0.14], [0, reduceMotion ? 0 : 11]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.18], [1, reduceMotion ? 1 : 0.93]);
  const heroFilter = useMotionTemplate`blur(${blurHero}px)`;

  const ringScale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1.35]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.25], [0.55, 0]);
  const tiltInner = useTransform(scrollYProgress, [0, 0.15], [0, 6]);
  const lineGlow = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  const opHero = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.28],
    [1, 1, 0.45, 0]
  );
  const opMid = useTransform(
    scrollYProgress,
    [0.16, 0.26, 0.36, 0.46],
    [0, 1, 1, 0]
  );
  const opEnd = useTransform(
    scrollYProgress,
    [0.46, 0.56, 0.64, 0.76],
    [0, 1, 1, 0]
  );

  const introState = reduceMotion ? "show" : "hidden";
  const introAnimate = "show";

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
      <div className="relative flex min-h-screen flex-1 items-center justify-center px-6 md:px-12">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[min(100vw,560px)] w-[min(100vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/10 dark:border-violet-400/15"
          style={{ scale: ringScale, opacity: ringOpacity }}
        />

        <motion.div
          style={{
            opacity: opHero,
            y: yHero,
            scale: scaleHero,
            filter: reduceMotion ? "none" : heroFilter,
          }}
          className="relative max-w-4xl px-2 text-center [perspective:1200px]"
        >
          <motion.div className="relative inline-block" style={{ rotateX: tiltInner }}>
            <motion.span
              className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-r from-violet-600/15 via-fuchsia-500/10 to-transparent blur-2xl dark:from-violet-500/25 dark:via-fuchsia-500/15 md:-inset-10"
              animate={
                reduceMotion
                  ? undefined
                  : { opacity: [0.5, 0.85, 0.5], scale: [0.98, 1.02, 0.98] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.h1
              variants={introContainer}
              initial={introState}
              animate={introAnimate}
              className="relative mx-auto max-w-[100vw] text-center font-display font-semibold leading-[1.02] tracking-tight"
            >
              <span className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 md:gap-x-4">
                {nameWords.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    variants={wordReveal}
                    className="inline-block bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 bg-clip-text text-[clamp(1.05rem,4.5vw,4.15rem)] text-transparent dark:from-white dark:via-zinc-100 dark:to-zinc-300"
                  >
                    {word}
                    {i === nameWords.length - 1 ? "." : ""}
                  </motion.span>
                ))}
              </span>
              <motion.span
                variants={subReveal}
                className="mt-3 block text-[clamp(0.95rem,2.6vw,1.4rem)] font-medium leading-snug text-zinc-600 dark:mt-4 dark:text-white/88 md:mt-4"
              >
                <span className="bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text font-display text-transparent dark:from-violet-300 dark:to-fuchsia-300">
                  {person.role}
                </span>
                <span className="text-zinc-500 dark:text-white/50"> · </span>
                <span className="text-zinc-700 dark:text-white/90">{person.tagline}.</span>
              </motion.span>
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-lg text-sm font-medium leading-relaxed text-zinc-600/95 dark:mt-8 dark:text-white/45 md:text-base"
            >
              Full-stack · TypeScript · ML systems — I ship interfaces people feel and backends that scale.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: opMid, y: yMid }}
          className="absolute left-4 top-1/2 max-w-[min(100%,28rem)] -translate-y-1/2 text-left md:left-12 lg:left-16"
        >
          <div className="relative">
            <motion.span
              className="mb-4 block h-px w-12 bg-gradient-to-r from-violet-600 to-transparent dark:from-violet-400"
              style={{ opacity: lineGlow }}
            />
            <p className="font-display text-2xl font-medium leading-[1.15] tracking-tight text-zinc-900 dark:text-white/95 md:text-4xl lg:text-[2.75rem]">
              I build full-stack apps, dashboards, and ML-backed products.
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: opEnd, y: yEnd }}
          className="absolute right-4 top-1/2 max-w-[min(100%,28rem)] -translate-y-1/2 text-right md:right-12 lg:right-16"
        >
          <div className="relative">
            <motion.span
              className="mb-4 ml-auto block h-px w-12 bg-gradient-to-l from-fuchsia-600 to-transparent dark:from-fuchsia-400"
              style={{ opacity: lineGlow }}
            />
            <p className="font-display text-2xl font-medium leading-[1.15] tracking-tight text-zinc-900 dark:text-white/95 md:text-4xl lg:text-[2.75rem]">
              Bridging interface craft, systems thinking, and research-grade ML.
            </p>
          </div>
        </motion.div>

        {!reduceMotion ? <ScrollCue scrollYProgress={scrollYProgress} /> : null}
      </div>
    </div>
  );
}
