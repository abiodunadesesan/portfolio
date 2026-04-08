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
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Safari / hybrid devices can misreport pointer capabilities.
    // Only skip on truly touch-only environments (no fine pointer detected at all).
    const anyFine = window.matchMedia("(any-pointer: fine)").matches;
    const anyCoarse = window.matchMedia("(any-pointer: coarse)").matches;
    if (anyCoarse && !anyFine) return;

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
    setVisible(true);

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
      setVisible(true);
    };
    const onLeave = () => {
      setVisible(false);
      modeRef.current = "default";
      setMode("default");
    };
    const onEnter = () => {
      document.documentElement.classList.add("custom-cursor-ready");
      setVisible(true);
    };

    const moveOpts = { passive: true } as const;
    const onMouseMove = (e: MouseEvent) => onMove(e);
    window.addEventListener("pointermove", onMove, moveOpts);
    window.addEventListener("mousemove", onMouseMove, moveOpts);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

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
      window.removeEventListener("mouseenter", onEnter);
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
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
      aria-hidden
    >
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 h-11 w-11 rounded-full border border-zinc-900/25 bg-zinc-900/[0.06] shadow-[0_0_20px_rgba(0,0,0,0.12)] will-change-transform transition-opacity duration-200 dark:border-white/30 dark:bg-white/[0.06] dark:shadow-[0_0_24px_rgba(255,255,255,0.08)] ${
          project ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={dotRef}
        className={`absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-zinc-900 shadow-[0_0_14px_4px_rgba(0,0,0,0.4)] ring-2 ring-white/25 will-change-transform transition-opacity duration-200 dark:bg-white dark:shadow-[0_0_20px_6px_rgba(255,255,255,0.5)] dark:ring-white/20 ${
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
