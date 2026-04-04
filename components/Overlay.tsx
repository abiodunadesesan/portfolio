"use client";

import { useMemo, type CSSProperties } from "react";
import { ChevronDown, Mouse } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { BreakpointTier } from "@/hooks/useBreakpointTier";
import { useBreakpointTier } from "@/hooks/useBreakpointTier";
import { person } from "@/lib/site-content";

type OverlayProps = {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
};

function introCfg(tier: BreakpointTier) {
  switch (tier) {
    case "mobile":
      return {
        stagger: 0.018,
        delayChildren: 0.025,
        wordDur: 0.3,
        subDur: 0.24,
        subDelay: 0.07,
        bodyDelay: 0.18,
        bodyDur: 0.28,
        glowDur: 2.2,
        cuePulse: 1.75,
        cueWheel: 1.15,
        wordBlurHidden: 6,
        subBlurHidden: 4,
      };
    case "tablet":
      return {
        stagger: 0.026,
        delayChildren: 0.036,
        wordDur: 0.38,
        subDur: 0.32,
        subDelay: 0.1,
        bodyDelay: 0.26,
        bodyDur: 0.32,
        glowDur: 2.85,
        cuePulse: 1.9,
        cueWheel: 1.28,
        wordBlurHidden: 8,
        subBlurHidden: 5,
      };
    default:
      return {
        stagger: 0.03,
        delayChildren: 0.042,
        wordDur: 0.44,
        subDur: 0.36,
        subDelay: 0.11,
        bodyDelay: 0.3,
        bodyDur: 0.34,
        glowDur: 3.2,
        cuePulse: 2.05,
        cueWheel: 1.35,
        wordBlurHidden: 11,
        subBlurHidden: 7,
      };
  }
}

function scrollCfg(tier: BreakpointTier) {
  switch (tier) {
    case "mobile":
      return {
        /* Wider spans = less early blur/scale — keeps hero copy readable on small screens */
        blurSpan: 0.1,
        scaleSpan: 0.1,
        yPow: 2.35,
        midPow: 1.85,
        endPow: 1.65,
        ring: [0, 0.26],
        ringOp: [0, 0.1],
        tilt: [0, 0.055],
        /* Hero fades, mid appears & stays visible longer, end appears & stays visible longer */
        heroOp: [0, 0.04, 0.12, 0.2],
        midOp:  [0.08, 0.15, 0.38, 0.5],
        endOp:  [0.3, 0.4, 0.62, 0.75],
        cueOp: [0, 0.04, 0.09],
        cueY: [0, 0.09],
        blurMax: 6,
      };
    case "tablet":
      return {
        blurSpan: 0.068,
        scaleSpan: 0.082,
        yPow: 2.05,
        midPow: 1.65,
        endPow: 1.52,
        ring: [0, 0.29],
        ringOp: [0, 0.12],
        tilt: [0, 0.065],
        heroOp: [0, 0.045, 0.13, 0.21],
        midOp:  [0.09, 0.16, 0.39, 0.52],
        endOp:  [0.31, 0.42, 0.64, 0.77],
        cueOp: [0, 0.045, 0.10],
        cueY: [0, 0.10],
        blurMax: 9,
      };
    default:
      return {
        blurSpan: 0.082,
        scaleSpan: 0.098,
        yPow: 1.85,
        midPow: 1.55,
        endPow: 1.45,
        ring: [0, 0.32],
        ringOp: [0, 0.14],
        tilt: [0, 0.075],
        heroOp: [0, 0.05, 0.14, 0.22],
        midOp:  [0.1, 0.18, 0.4, 0.54],
        endOp:  [0.33, 0.44, 0.67, 0.8],
        cueOp: [0, 0.05, 0.12],
        cueY: [0, 0.12],
        blurMax: 11,
      };
  }
}

function ScrollCue({
  scrollYProgress,
  tier,
  reduceMotion,
}: {
  scrollYProgress: MotionValue<number>;
  tier: BreakpointTier;
  reduceMotion: boolean;
}) {
  const s = scrollCfg(tier);
  const op = useTransform(scrollYProgress, s.cueOp, [1, 1, 0]);
  const y = useTransform(scrollYProgress, s.cueY, [0, 14]);
  const pulse = introCfg(tier).cuePulse;
  const wheel = introCfg(tier).cueWheel;
  const touchFirst = tier !== "desktop";
  /** Phones: static chevron — one fewer infinite WAAPI/RAF loop. */
  const mobileCueStatic = tier === "mobile";

  if (reduceMotion) {
    return (
      <motion.div
        style={{ opacity: op, y }}
        className="pointer-events-auto absolute bottom-4 left-1/2 z-20 flex w-[min(100%,20rem)] -translate-x-1/2 flex-col items-center gap-3 px-4 sm:bottom-6 md:bottom-10"
      >
        <p className="text-center text-xs font-medium text-zinc-700 dark:text-white/80">
          More below: work, experience, and contact.
        </p>
        <a
          href="#work"
          className="rounded-full border border-violet-500/35 bg-white/80 px-4 py-2.5 text-sm font-semibold text-violet-800 shadow-sm dark:border-violet-400/30 dark:bg-zinc-900/80 dark:text-violet-100"
        >
          Jump to work
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ opacity: op, y }}
      className="pointer-events-auto absolute bottom-4 left-1/2 z-20 flex w-[min(100%,20rem)] -translate-x-1/2 flex-col items-center gap-3 px-4 sm:bottom-6 md:bottom-10"
    >
      {touchFirst ? (
        <>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-800 dark:text-white/90 sm:text-[11px] sm:tracking-[0.18em]">
              Scroll for more
            </span>
            <span className="text-[11px] font-medium leading-snug text-zinc-600 dark:text-white/70 sm:text-xs">
              Projects, experience &amp; contact are below — or jump straight in.
            </span>
          </div>
          {mobileCueStatic ? (
            <ChevronDown
              className="h-8 w-8 text-violet-600 opacity-90 dark:text-violet-300 sm:h-7 sm:w-7"
              strokeWidth={2.25}
              aria-hidden
            />
          ) : (
            <div className="hero-cue-chevron-bounce" aria-hidden>
              <ChevronDown
                className="h-8 w-8 text-violet-600 opacity-90 dark:text-violet-300 sm:h-7 sm:w-7"
                strokeWidth={2.25}
              />
            </div>
          )}
          <a
            href="#work"
            className="rounded-full border border-violet-500/35 bg-white/80 px-4 py-2.5 text-sm font-semibold text-violet-800 shadow-sm transition hover:border-violet-500/55 hover:bg-white dark:border-violet-400/30 dark:bg-zinc-900/80 dark:text-violet-100 dark:hover:border-violet-400/50 dark:hover:bg-zinc-900"
          >
            Jump to work
          </a>
        </>
      ) : (
        <>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-700 dark:text-white/75">
            <Mouse className="h-3.5 w-3.5 opacity-80" strokeWidth={2} aria-hidden />
            Scroll to explore
          </span>
          <div
            role="img"
            aria-label="Animated scroll hint: scroll wheel moves to show you can scroll to explore the page"
            className="hero-cue-mouse-shell relative flex h-12 w-[22px] justify-center rounded-full border border-zinc-300/60 bg-white/10 dark:border-white/15 dark:bg-white/[0.04]"
            style={
              {
                "--hero-cue-pulse": `${pulse}s`,
                "--hero-cue-wheel": `${wheel}s`,
              } as React.CSSProperties
            }
          >
            <span className="hero-cue-mouse-wheel absolute top-2 h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-300" aria-hidden />
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function Overlay({
  scrollYProgress,
  reduceMotion,
}: OverlayProps) {
  const tier = useBreakpointTier();
  const ic = introCfg(tier);
  const sc = scrollCfg(tier);

  const { introContainer, nameReveal, subReveal } = useMemo(
    () => ({
      introContainer: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: ic.stagger, delayChildren: ic.delayChildren },
        },
      },
      nameReveal: {
        hidden: {
          opacity: 0,
          y: 28,
          rotateX: -10,
          filter: `blur(${Math.min(ic.wordBlurHidden, 8)}px)`,
        },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          transition: { duration: ic.wordDur, ease: [0.22, 1, 0.36, 1] as const },
        },
      },
      subReveal: {
        hidden: { opacity: 0, y: 14, filter: `blur(${ic.subBlurHidden}px)` },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: ic.subDur,
            delay: ic.subDelay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      },
    }),
    [ic]
  );

  const yHero = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return -28 * v;
    const eased = 1 - Math.pow(1 - v, sc.yPow);
    return -120 * eased;
  });
  const yMid = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return -16 * v;
    const eased = 1 - Math.pow(1 - v, sc.midPow);
    return -72 * eased;
  });
  const yEnd = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return -12 * v;
    const eased = 1 - Math.pow(1 - v, sc.endPow);
    return -52 * eased;
  });

  const blurHero = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return 0;
    const t = Math.min(1, v / sc.blurSpan);
    return Math.pow(t, 0.88) * sc.blurMax;
  });
  const scaleHero = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return 1;
    const t = Math.min(1, v / sc.scaleSpan);
    return 1 - 0.07 * Math.pow(t, 0.82);
  });
  const heroFilter = useMotionTemplate`blur(${blurHero}px)`;

  const ringScale = useTransform(scrollYProgress, sc.ring, [0.88, 1.35]);
  const ringOpacity = useTransform(scrollYProgress, sc.ringOp, [0.55, 0]);
  const tiltInner = useTransform(scrollYProgress, sc.tilt, [0, 6]);
  const lineGlow = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  const opHero = useTransform(scrollYProgress, sc.heroOp, [1, 1, 0.42, 0]);
  const opMid = useTransform(scrollYProgress, sc.midOp, [0, 1, 1, 0]);
  const opEnd = useTransform(scrollYProgress, sc.endOp, [0, 1, 1, 0]);

  const introState = reduceMotion ? "show" : "hidden";
  const introAnimate = "show";

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
      <div className="relative flex min-h-screen flex-1 items-center justify-center px-6 md:px-12">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[min(100%,560px)] w-[min(100%,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/10 dark:border-violet-400/15"
          style={{ scale: ringScale, opacity: ringOpacity }}
        />

        <motion.div
          style={{
            opacity: opHero,
            y: yHero,
            scale: scaleHero,
            filter: reduceMotion ? "none" : heroFilter,
          }}
          className="relative w-full max-w-[min(100%,72rem)] px-3 text-center [perspective:1200px] sm:px-4 md:px-6"
        >
          <motion.div className="relative mx-auto inline-block max-w-full hero-light-bg" style={{ rotateX: tiltInner }}>
            <span
              className={`pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-r from-violet-600/15 via-fuchsia-500/10 to-transparent blur-2xl dark:from-violet-500/25 dark:via-fuchsia-500/15 md:-inset-10 ${
                reduceMotion || tier === "mobile" ? "" : "hero-title-ambient-glow"
              }`}
              style={
                reduceMotion || tier === "mobile"
                  ? undefined
                  : ({ "--hero-glow-dur": `${ic.glowDur}s` } as CSSProperties)
              }
            />
            <motion.h1
              variants={introContainer}
              initial={introState}
              animate={introAnimate}
              className="relative mx-auto w-full max-w-[min(calc(100%_-_1.25rem),80rem)] text-center leading-[1.08] tracking-normal"
            >
              <motion.span
                variants={nameReveal}
                className="block w-full max-w-full whitespace-nowrap bg-gradient-to-br from-white via-zinc-100 to-zinc-200 bg-clip-text px-4 pb-2 font-sans text-[clamp(1.2rem,4vw,3.2rem)] font-bold tracking-tight text-transparent [filter:drop-shadow(0_2px_28px_rgba(255,255,255,0.12))]"
              >
                {person.displayName}
              </motion.span>
              <motion.span
                variants={subReveal}
                className="mt-3 block w-full whitespace-nowrap px-4 pb-2 text-[clamp(0.55rem,1.3vw,1.1rem)] font-medium leading-snug text-white/92 max-sm:text-white md:mt-3"
              >
                <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text pr-2 font-display text-transparent max-sm:from-violet-100 max-sm:to-fuchsia-100">
                  Software Engineer&nbsp;|&nbsp;Machine Learning&nbsp;|&nbsp;Artificial Intelligence
                </span>
              </motion.span>
            </motion.h1>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: opMid, y: yMid }}
          className="absolute left-4 top-1/2 max-w-[min(100%,28rem)] -translate-y-1/2 text-left md:left-12 lg:left-16"
        >
          <div className="relative">
            <motion.span
              className="mb-4 block h-px w-12 bg-gradient-to-r from-violet-400 to-transparent"
              style={{ opacity: lineGlow }}
            />
            <p className="font-display text-2xl font-medium leading-[1.15] tracking-tight text-white/95 md:text-4xl lg:text-[2.75rem]">
              I build digital experiences.
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: opEnd, y: yEnd }}
          className="absolute right-4 top-1/2 max-w-[min(100%,28rem)] -translate-y-1/2 text-right md:right-12 lg:right-16"
        >
          <div className="relative">
            <motion.span
              className="mb-4 ml-auto block h-px w-12 bg-gradient-to-l from-fuchsia-400 to-transparent"
              style={{ opacity: lineGlow }}
            />
            <p className="font-display text-2xl font-medium leading-[1.15] tracking-tight text-white/95 md:text-4xl lg:text-[2.75rem]">
              Bridging design and engineering.
            </p>
          </div>
        </motion.div>

        <ScrollCue
          scrollYProgress={scrollYProgress}
          tier={tier}
          reduceMotion={reduceMotion}
        />
      </div>
    </div>
  );
}
