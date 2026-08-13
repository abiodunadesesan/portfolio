"use client";

import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { drawImageCover } from "@/lib/canvas-draw";
import { useBreakpointTier } from "@/hooks/useBreakpointTier";
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
  const tier = useBreakpointTier();
  const isMobile = tier === "mobile";
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const sizeRef = useRef<SizeState>({ cssW: 0, cssH: 0, dpr: 1 });
  const lastFrameIndexRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);
  const scheduleRenderRef = useRef<() => void>(() => {});
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [canvasPrimed, setCanvasPrimed] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 450,
    damping: 32,
    restDelta: 0.001
  });
  const progressValue = isMobile ? scrollYProgress : smoothProgress;

  useEffect(() => {
    imagesRef.current = Array.from({ length: SEQUENCE_FRAME_COUNT }, () => null);

    // Load only the critical frames up-front. Everything else loads on-demand while scrolling.
    const load = (idx: number, priority: "high" | "low" = "low") => {
      if (idx < 0 || idx >= SEQUENCE_FRAME_COUNT) return;
      if (imagesRef.current[idx]) return;
      const img = new Image();
      img.decoding = "async";
      img.fetchPriority = priority;
      img.onload = () => {
        if (idx === 0) setFirstFrameReady(true);
        // Force repaint when a frame arrives; prevents temporary blank/placeholder stalls.
        lastFrameIndexRef.current = -1;
        scheduleRenderRef.current();
      };
      img.src = getFrameSrc(idx);
      imagesRef.current[idx] = img;
    };

    // Always load first frame so the hero paints quickly.
    load(0, "high");
    const idleToken: number | null =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => {
            HERO_PRELOAD_FRAME_INDICES.forEach((i) => {
              if (i !== 0) load(i, "low");
            });
          }, { timeout: 1200 })
        : window.setTimeout(() => {
            HERO_PRELOAD_FRAME_INDICES.forEach((i) => {
              if (i !== 0) load(i, "low");
            });
          }, 600);

    return () => {
      if (idleToken != null) {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleToken);
        } else {
          clearTimeout(idleToken);
        }
      }
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
    const dpr = cssW < 768 ? Math.min(raw, 1.25) : Math.min(raw, 2);

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

    let progress = progressValue.get();
    if (reduceMotion) progress = 0.35;

    const max = SEQUENCE_FRAME_COUNT - 1;
    const idx = Math.min(max, Math.max(0, Math.round(progress * max)));

    // On-demand image loading + lookahead to keep scrolling smooth.
    const loadAround = (center: number, isMobile: boolean) => {
      const start = isMobile ? -1 : -2;
      const end = isMobile ? 3 : 6;
      for (let k = start; k <= end; k++) {
        const i = center + k;
        if (i < 0 || i >= SEQUENCE_FRAME_COUNT) continue;
        if (!imagesRef.current[i]) {
          const img = new Image();
          img.decoding = "async";
          img.fetchPriority = k === 0 ? "high" : "low";
          img.onload = () => {
            if (i === 0) setFirstFrameReady(true);
            lastFrameIndexRef.current = -1;
            scheduleRenderRef.current();
          };
          img.src = getFrameSrc(i);
          imagesRef.current[i] = img;
        }
      }
    };
    loadAround(idx, cssW < 768);

    const frameAtIndex = imagesRef.current[idx];
    const hasTarget = !!frameAtIndex?.complete && frameAtIndex.naturalWidth > 0;

    if (idx === lastFrameIndexRef.current && hasTarget) return;

    // If target frame isn't ready yet, render nearest loaded frame instead of blank placeholder.
    let drawIdx = idx;
    if (!hasTarget) {
      let nearest = -1;
      for (let d = 1; d <= 8 && nearest === -1; d++) {
        const left = idx - d;
        const right = idx + d;
        const leftImg = left >= 0 ? imagesRef.current[left] : null;
        const rightImg = right <= max ? imagesRef.current[right] : null;
        if (leftImg?.complete && leftImg.naturalWidth > 0) nearest = left;
        else if (rightImg?.complete && rightImg.naturalWidth > 0) nearest = right;
      }
      if (nearest !== -1) drawIdx = nearest;
    }

    lastFrameIndexRef.current = idx;
    paintFrame(ctx, drawIdx, cssW, cssH);
    if (!canvasPrimed) setCanvasPrimed(true);
  }, [canvasPrimed, ensureCanvasSize, paintFrame, progressValue, reduceMotion]);

  const scheduleRender = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      renderFrame();
    });
  }, [renderFrame]);

  useEffect(() => {
    scheduleRenderRef.current = scheduleRender;
  }, [scheduleRender]);

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
    // Mobile browsers sometimes report transient zero/placeholder sizes at first paint.
    const rafA = window.requestAnimationFrame(() => {
      ensureCanvasSize();
      lastFrameIndexRef.current = -1;
      renderFrame();
    });
    const rafB = window.requestAnimationFrame(() => {
      ensureCanvasSize();
      lastFrameIndexRef.current = -1;
      renderFrame();
    });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafA);
      cancelAnimationFrame(rafB);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [ensureCanvasSize, renderFrame]);

  useMotionValueEvent(progressValue, "change", scheduleRender);

  useEffect(() => {
    if (!firstFrameReady) return;
    // Repaint frame 0 after poster removal; avoids getting stuck on placeholder.
    lastFrameIndexRef.current = -1;
    scheduleRender();
  }, [firstFrameReady, scheduleRender]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative z-0 h-[150vh] w-full md:h-[180vh]"
      aria-label="Hero: cinematic scroll sequence. Scroll down to advance frames; text and controls sit above the canvas."
    >
      <div
        ref={stickyRef}
        className="relative sticky top-0 z-0 h-[100dvh] min-h-[100svh] w-full overflow-visible bg-zinc-100 transition-colors duration-500 dark:bg-[#121212]"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full touch-pan-y"
          aria-hidden
        />
        {!firstFrameReady || !canvasPrimed ? (
          <div className="absolute inset-0 z-[1]">
            <NextImage
              src="/sequence/poster.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
        <HeroAtmosphere
          scrollYProgress={smoothProgress}
          reduceMotion={!!reduceMotion}
        />
        <Overlay scrollYProgress={smoothProgress} reduceMotion={!!reduceMotion} />
      </div>
    </section>
  );
}
