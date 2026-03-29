"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { drawImageCover } from "@/lib/canvas-draw";
import {
  getFrameSrc,
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
  g.addColorStop(0, "#070709");
  g.addColorStop(0.35, "#0e0c12");
  g.addColorStop(0.7, "#12101a");
  g.addColorStop(1, "#181528");
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sizeRef = useRef<SizeState>({ cssW: 0, cssH: 0, dpr: 1 });
  const rafRef = useRef<number | null>(null);
  const [imagesReady, setImagesReady] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let settled = 0;

    for (let i = 0; i < SEQUENCE_FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameSrc(i);
      images.push(img);
    }
    imagesRef.current = images;

    const mark = () => {
      settled++;
      if (settled >= SEQUENCE_FRAME_COUNT) setImagesReady(true);
    };
    images.forEach((img) => {
      img.onload = mark;
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
    const container = canvas?.parentElement;
    if (!canvas || !container) return false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = container.clientWidth;
    const cssH = container.clientHeight;
    if (cssW < 1 || cssH < 1) return false;

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

    let progress = scrollYProgress.get();
    if (reduceMotion) progress = 0.35;

    const max = SEQUENCE_FRAME_COUNT - 1;
    const idx = Math.min(max, Math.max(0, Math.round(progress * max)));
    paintFrame(ctx, idx, cssW, cssH);
  }, [ensureCanvasSize, paintFrame, scrollYProgress, reduceMotion]);

  const scheduleRender = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      renderFrame();
    });
  }, [renderFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ro = new ResizeObserver(() => {
      ensureCanvasSize();
      renderFrame();
    });
    ro.observe(container);
    ensureCanvasSize();
    renderFrame();
    return () => {
      ro.disconnect();
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [ensureCanvasSize, renderFrame, imagesReady]);

  useMotionValueEvent(scrollYProgress, "change", scheduleRender);

  useEffect(() => {
    if (!imagesReady) return;
    scheduleRender();
  }, [imagesReady, scheduleRender]);

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] w-full"
      aria-label="Scroll-driven image sequence"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-zinc-100 transition-colors duration-500 dark:bg-[#08080a]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full touch-pan-y"
          aria-hidden
        />
        <HeroAtmosphere
          scrollYProgress={scrollYProgress}
          reduceMotion={!!reduceMotion}
        />
        <Overlay scrollYProgress={scrollYProgress} reduceMotion={!!reduceMotion} />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 z-[5] h-[2px] w-full origin-left bg-gradient-to-r from-violet-600/90 via-fuchsia-600/75 to-transparent dark:from-violet-500/90 dark:via-fuchsia-500/70"
          style={{ scaleX: scrollYProgress }}
          aria-hidden
        />
      </div>
    </section>
  );
}
