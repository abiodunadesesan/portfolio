"use client";

import { useEffect, useRef, useState } from "react";
import { CURSOR_VIEW_PROJECT, DATA_CURSOR_VIEW_PROJECT } from "@/lib/cursor";

/**
 * Default: soft ring + dot. Over `[data-cursor="view-project"]`: “View project” pill (Tricia-style).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const pill = useRef({ x: 0, y: 0 });
  const hoverProjectRef = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoverProject, setHoverProject] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    /** Touch-only: skip custom cursor. Reduced motion still gets the cursor (many users expect it on portfolio sites). */
    if (coarse) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lerpRing = reduce ? 0.45 : 0.12;
    const lerpPill = reduce ? 0.5 : 0.16;

    setActive(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const node = e.target instanceof Element ? e.target : (e.target as Node).parentElement;
      const over = !!node?.closest?.(`[${DATA_CURSOR_VIEW_PROJECT}="${CURSOR_VIEW_PROJECT}"]`);
      if (over !== hoverProjectRef.current) {
        hoverProjectRef.current = over;
        if (over) {
          pill.current = { x: e.clientX, y: e.clientY };
        } else {
          ring.current = { x: e.clientX, y: e.clientY };
        }
        setHoverProject(over);
      }
      setVisible(true);
    };
    const onLeave = () => {
      setVisible(false);
      hoverProjectRef.current = false;
      setHoverProject(false);
    };
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    let rafId = 0;
    const tick = () => {
      if (hoverProjectRef.current) {
        pill.current.x += (mouse.current.x - pill.current.x) * lerpPill;
        pill.current.y += (mouse.current.y - pill.current.y) * lerpPill;
        if (pillRef.current) {
          pillRef.current.style.transform = `translate3d(${pill.current.x}px, ${pill.current.y}px, 0) translate(-50%, -50%)`;
        }
      } else {
        ring.current.x += (mouse.current.x - ring.current.x) * lerpRing;
        ring.current.y += (mouse.current.y - ring.current.y) * lerpRing;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted || !active) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100000] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
      aria-hidden
    >
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 h-11 w-11 rounded-full border border-zinc-900/25 bg-zinc-900/[0.06] shadow-[0_0_20px_rgba(0,0,0,0.12)] will-change-transform transition-opacity duration-200 dark:border-white/30 dark:bg-white/[0.06] dark:shadow-[0_0_24px_rgba(255,255,255,0.08)] ${
          hoverProject ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={dotRef}
        className={`absolute left-0 top-0 h-2 w-2 rounded-full bg-zinc-900 shadow-[0_0_12px_3px_rgba(0,0,0,0.35)] will-change-transform transition-opacity duration-200 dark:bg-white dark:shadow-[0_0_18px_5px_rgba(255,255,255,0.45)] ${
          hoverProject ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={pillRef}
        className={`absolute left-0 top-0 will-change-transform transition-all duration-200 ${
          hoverProject ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <span className="inline-flex items-center rounded-full border border-zinc-900/20 bg-zinc-900/[0.93] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md dark:border-white/25 dark:bg-white/[0.12] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)]">
          View project
        </span>
      </div>
    </div>
  );
}
