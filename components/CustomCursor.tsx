"use client";

import { useEffect, useRef, useState } from "react";
import {
  CURSOR_INTERACTIVE,
  CURSOR_VIEW_PROJECT,
  DATA_CURSOR,
} from "@/lib/cursor";

type CursorMode = "default" | "interactive" | "project";

function getEventTargetElement(e: Event): Element | null {
  const t = e.target;
  if (t instanceof Element) return t;
  const anyE = e as unknown as { composedPath?: () => unknown[] };
  const path0 = anyE.composedPath?.()?.[0];
  return path0 instanceof Element ? path0 : null;
}

function getCursorMode(target: EventTarget | null): CursorMode {
  if (!target || !(target instanceof Element)) return "default";
  if (target.closest("#hero") || target.closest("footer")) return "default";
  if (target.closest(`[${DATA_CURSOR}="${CURSOR_VIEW_PROJECT}"]`)) return "project";
  if (target.closest(`[${DATA_CURSOR}="${CURSOR_INTERACTIVE}"]`)) return "interactive";
  const interactive = target.closest(
    "a[href], button:not([disabled]), [role='button']:not([disabled]), input[type='submit'], input[type='button'], summary, label[for]",
  );
  if (interactive) return "interactive";
  return "default";
}

/**
 * Default: soft ring + dot. Interactive: larger lagging ring. `[data-cursor="view-project"]`: “View project” pill.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const pill = useRef({ x: 0, y: 0 });
  const modeRef = useRef<CursorMode>("default");

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Robust desktop detection across Safari/Chrome:
    // Enable if the device can hover (desktop/trackpad) OR reports any fine pointer.
    // Disable only on touch-only environments.
    const canHover = window.matchMedia("(hover: hover)").matches;
    const anyFine = window.matchMedia("(any-pointer: fine)").matches;
    const isTouchOnly =
      ((typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) || "ontouchstart" in window) &&
      !canHover &&
      !anyFine;
    if (isTouchOnly) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lerpRing = reduce ? 0.45 : 0.12;
    const lerpPill = reduce ? 0.5 : 0.16;

    setActive(true);
    document.documentElement.classList.add("custom-cursor-active");

    // Initialize position so the cursor is visible immediately on load.
    const initialX = Math.round(window.innerWidth / 2);
    const initialY = Math.round(window.innerHeight / 2);
    mouse.current = { x: initialX, y: initialY };
    ring.current = { x: initialX, y: initialY };
    pill.current = { x: initialX, y: initialY };
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${initialX}px, ${initialY}px, 0) translate(-50%, -50%) scale(1)`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${initialX}px, ${initialY}px, 0) translate(-50%, -50%) scale(1)`;
    }
    // Mark ready immediately (prevents “default cursor only” perception).
    document.documentElement.classList.add("custom-cursor-ready");

    const onMove = (e: PointerEvent | MouseEvent) => {
      document.documentElement.classList.add("custom-cursor-ready");
      mouse.current = { x: e.clientX, y: e.clientY };
      const next = getCursorMode(getEventTargetElement(e));
      const prev = modeRef.current;
      if (next !== prev) {
        if (next === "project") {
          pill.current = { x: e.clientX, y: e.clientY };
        } else if (prev === "project") {
          ring.current = { x: e.clientX, y: e.clientY };
        }
        setMode(next);
      }
      modeRef.current = next;

      const dotScale = next === "interactive" ? 1.12 : 1;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
    };
    // Avoid hiding on leave; some browsers fire mouseleave unexpectedly (making the cursor disappear).
    const onLeave = () => {};

    const moveOpts = { passive: true } as const;
    const onMouseMove = (e: MouseEvent) => onMove(e);
    window.addEventListener("pointermove", onMove, moveOpts);
    window.addEventListener("mousemove", onMouseMove, moveOpts);
    window.addEventListener("mouseleave", onLeave);

    let rafId = 0;
    const tick = () => {
      if (modeRef.current === "project") {
        pill.current.x += (mouse.current.x - pill.current.x) * lerpPill;
        pill.current.y += (mouse.current.y - pill.current.y) * lerpPill;
        if (pillRef.current) {
          pillRef.current.style.transform = `translate3d(${pill.current.x}px, ${pill.current.y}px, 0) translate(-50%, -50%)`;
        }
      } else {
        ring.current.x += (mouse.current.x - ring.current.x) * lerpRing;
        ring.current.y += (mouse.current.y - ring.current.y) * lerpRing;
        const ringScale = modeRef.current === "interactive" ? 1.38 : 1;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active", "custom-cursor-ready");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted || !active) {
    return null;
  }

  const project = mode === "project";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100000] overflow-hidden"
      style={{ opacity: 1 }}
      aria-hidden
    >
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 h-11 w-11 rounded-full border border-zinc-900/30 bg-zinc-900/[0.07] shadow-[0_0_22px_rgba(0,0,0,0.14)] mix-blend-difference will-change-transform transition-opacity duration-200 dark:border-white/45 dark:bg-white/[0.08] dark:shadow-[0_0_34px_rgba(255,255,255,0.12)] ${
          project ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={dotRef}
        className={`absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-zinc-900 shadow-[0_0_16px_5px_rgba(0,0,0,0.45)] ring-2 ring-white/25 mix-blend-difference will-change-transform transition-opacity duration-200 dark:bg-white dark:shadow-[0_0_26px_8px_rgba(255,255,255,0.6)] dark:ring-white/25 ${
          project ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={pillRef}
        className={`absolute left-0 top-0 will-change-transform transition-all duration-200 ${
          project ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <span className="inline-flex items-center rounded-full border border-zinc-900/20 bg-zinc-900/[0.93] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md dark:border-white/25 dark:bg-white/[0.12] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)]">
          View project
        </span>
      </div>
    </div>
  );
}
