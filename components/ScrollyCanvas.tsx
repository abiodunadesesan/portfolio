"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { drawImageCover } from "@/lib/canvas-draw";
import {
  getFrameSrc,
  HERO_PRELOAD_FRAME_INDICES,
  SEQUENCE_FRAME_COUNT,
  SEQUENCE_SOURCE_CROP,
} from "@/lib/sequence";
import HeroAtmosphere from "./HeroAtmosphere";
import Overlay from "./Overlay";

/** Cinematic fill when frames are missing or still loading — no on-canvas copy. */
function drawPlaceholder(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#121212");
  g.addColorStop(0.35, "#121212");
  g.addColorStop(0.7, "#121212");
  g.addColorStop(1, "#121212");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const vignette = ctx.createRadialGradient(
    w * 0.5,
    h * 0.45,
    Math.min(w, h) * 0.15,
    w * 0.5,
    h * 0.5,
    Math.max(w, h) * 0.65
  );
  vignette.addColorStop(0, "rgba(120, 90, 200, 0.08)");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.45)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}

type SizeState = { cssW: number; cssH: number; dpr: number };

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollProgressBarRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sizeRef = useRef<SizeState>({ cssW: 0, cssH: 0, dpr: 1 });
  const rafRef = useRef<number | null>(null);
  const [imagesReady, setImagesReady] = useState(false);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001
  });

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let settled = 0;

    const preloadSet = new Set<number>(HERO_PRELOAD_FRAME_INDICES);
    for (let i = 0; i < SEQUENCE_FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      if (preloadSet.has(i)) {
        img.fetchPriority = "high";
      }
      img.src = getFrameSrc(i);
      images.push(img);
    }
    imagesRef.current = images;

    const mark = () => {
      settled++;
      if (settled >= SEQUENCE_FRAME_COUNT) setImagesReady(true);
    };
    images.forEach((img, idx) => {
      img.onload = () => {
        mark();
        if (idx === 0) setFirstFrameReady(true);
      };
      img.onerror = mark;
    });

    return () => {
      imagesRef.current = [];
    };
  }, []);

  const paintFrame = useCallback(
    (ctx: CanvasRenderingContext2D, index: number, cssW: number, cssH: number) => {
      ctx.clearRect(0, 0, cssW, cssH);
      const img = imagesRef.current[index];
      if (img?.complete && img.naturalWidth > 0) {
        drawImageCover(ctx, img, cssW, cssH, SEQUENCE_SOURCE_CROP);
      } else {
        drawPlaceholder(ctx, cssW, cssH);
      }
    },
    []
  );

  /** Resize backing store only when CSS size or DPR changes — not on every scroll tick. */
  const ensureCanvasSize = useCallback((): boolean => {
    const canvas = canvasRef.current;
    const host = stickyRef.current;
    if (!canvas || !host) return false;

    const rect = host.getBoundingClientRect();
    let cssW = Math.round(rect.width);
    let cssH = Math.round(rect.height);
    // Mobile sticky/vh can report 0 briefly; never allow a blank canvas.
    if (cssW < 1) cssW = Math.max(1, Math.round(window.innerWidth));
    if (cssH < 1) cssH = Math.max(1, Math.round(window.innerHeight));

    const raw = window.devicePixelRatio || 1;
    /** Narrow screens: cap DPR to reduce canvas fill cost (still sharp on most phones). */
    const dpr = cssW < 768 ? Math.min(raw, 1.5) : Math.min(raw, 2);

    const prev = sizeRef.current;
    if (prev.cssW === cssW && prev.cssH === cssH && prev.dpr === dpr) {
      return true;
    }

    sizeRef.current = { cssW, cssH, dpr };
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return true;
  }, []);

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!ensureCanvasSize()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { cssW, cssH } = sizeRef.current;

    let progress = smoothProgress.get();
    if (reduceMotion) progress = 0.35;

    const max = SEQUENCE_FRAME_COUNT - 1;
    const idx = Math.min(max, Math.max(0, Math.round(progress * max)));
    paintFrame(ctx, idx, cssW, cssH);
  }, [ensureCanvasSize, paintFrame, smoothProgress, reduceMotion]);

  const scheduleRender = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      renderFrame();
    });
  }, [renderFrame]);

  useEffect(() => {
    const host = stickyRef.current;
    if (!host) return;

    const ro = new ResizeObserver(() => {
      ensureCanvasSize();
      renderFrame();
    });
    ro.observe(host);
    ensureCanvasSize();
    renderFrame();
    return () => {
      ro.disconnect();
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [ensureCanvasSize, renderFrame]);

  const onScrollProgressChange = useCallback(() => {
    const el = scrollProgressBarRef.current;
    if (el) el.style.transform = `scaleX(${smoothProgress.get()})`;
    scheduleRender();
  }, [smoothProgress, scheduleRender]);

  useMotionValueEvent(smoothProgress, "change", onScrollProgressChange);

  useEffect(() => {
    if (!imagesReady) return;
    scheduleRender();
    const el = scrollProgressBarRef.current;
    if (el) el.style.transform = `scaleX(${smoothProgress.get()})`;
  }, [imagesReady, scheduleRender, smoothProgress]);

  useEffect(() => {
    if (!firstFrameReady) return;
    scheduleRender();
  }, [firstFrameReady, scheduleRender]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh]"
      aria-label="Hero: cinematic scroll sequence. Scroll down to advance frames; text and controls sit above the canvas."
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-visible bg-zinc-100 transition-colors duration-500 dark:bg-[#121212]"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full touch-pan-y"
          aria-hidden
        />
        <HeroAtmosphere
          scrollYProgress={smoothProgress}
          reduceMotion={!!reduceMotion}
        />
        <Overlay scrollYProgress={smoothProgress} reduceMotion={!!reduceMotion} />
        <div
          ref={scrollProgressBarRef}
          className="pointer-events-none absolute bottom-0 left-0 z-[5] h-[2px] w-full origin-left bg-gradient-to-r from-violet-600/90 via-fuchsia-600/75 to-transparent will-change-transform dark:from-violet-500/90 dark:via-fuchsia-500/70"
          style={{ transform: "scaleX(0)" }}
          aria-hidden
        />
      </div>
    </section>
  );
}
