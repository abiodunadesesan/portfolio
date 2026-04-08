"use client";

import { useEffect, useRef, useState } from "react";
import { CURSOR_INTERACTIVE, CURSOR_VIEW_PROJECT, DATA_CURSOR } from "@/lib/cursor";

type CursorMode = "default" | "interactive" | "project";

function getTargetElement(e: Event): Element | null {
  const t = e.target;
  if (t instanceof Element) return t;
  const anyE = e as unknown as { composedPath?: () => unknown[] };
  const path0 = anyE.composedPath?.()?.[0];
  return path0 instanceof Element ? path0 : null;
}

/** Match globals.css — only enable where we also hide the system cursor. */
function shouldUseCustomCursor() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getMode(el: Element | null): CursorMode {
  if (!el) return "default";
  if (el.closest("#hero") || el.closest("footer")) return "default";
  if (el.closest(`[${DATA_CURSOR}="${CURSOR_VIEW_PROJECT}"]`)) return "project";
  if (el.closest(`[${DATA_CURSOR}="${CURSOR_INTERACTIVE}"]`)) return "interactive";
  const interactive = el.closest(
    "a[href], button:not([disabled]), [role='button']:not([disabled]), input[type='submit'], input[type='button'], summary, label[for]",
  );
  return interactive ? "interactive" : "default";
}

/**
 * Premium portfolio cursor (desktop only)
 * - Default: small bright dot + soft glow follower (lag)
 * - Interactive: slight magnetic pull + subtle scale
 * - Project hover: floating “View project” pill that follows the cursor
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const glow = useRef({ x: 0, y: 0 });
  const pill = useRef({ x: 0, y: 0 });
  const modeRef = useRef<CursorMode>("default");
  const pressedRef = useRef(false);
  const magneticRectRef = useRef<DOMRect | null>(null);

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!shouldUseCustomCursor()) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lerpGlow = reduce ? 0.55 : 0.14;
    const lerpPill = reduce ? 0.6 : 0.18;

    setActive(true);
    document.documentElement.classList.add("custom-cursor-on");

    const markReady = () => document.documentElement.classList.add("custom-cursor-ready");

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouse.current = { x: cx, y: cy };
    glow.current = { x: cx, y: cy };
    pill.current = { x: cx, y: cy };

    const applyInstantPositions = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(1)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(1)`;
      }
      if (pillRef.current) {
        const ox = 18;
        const oy = 16;
        pillRef.current.style.transform = `translate3d(${cx + ox}px, ${cy + oy}px, 0) translate(-50%, -50%) scale(0.95)`;
      }
    };
    applyInstantPositions();
    requestAnimationFrame(() => {
      applyInstantPositions();
      markReady();
    });

    const onMove = (e: PointerEvent | MouseEvent) => {
      markReady();

      const el = getTargetElement(e);
      const next = getMode(el);
      const prev = modeRef.current;
      if (next !== prev) {
        setMode(next);
        if (next === "project") pill.current = { x: e.clientX, y: e.clientY };
        if (prev === "project") glow.current = { x: e.clientX, y: e.clientY };
      }
      modeRef.current = next;

      // Magnetic feel over interactive elements (very subtle).
      let tx = e.clientX;
      let ty = e.clientY;
      if (next === "interactive" && el) {
        const host = el.closest(
          "a[href], button:not([disabled]), [role='button']:not([disabled]), input[type='submit'], input[type='button'], summary, label[for]",
        );
        if (host) {
          const r = host.getBoundingClientRect();
          magneticRectRef.current = r;
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const strength = pressedRef.current ? 0.09 : 0.14;
          tx = e.clientX + (cx - e.clientX) * strength;
          ty = e.clientY + (cy - e.clientY) * strength;
        }
      } else {
        magneticRectRef.current = null;
      }

      mouse.current = { x: tx, y: ty };

      // Dot leads (minimal lag) with click scale.
      const dotScale = pressedRef.current ? 0.82 : next === "interactive" ? 1.08 : 1;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
    };

    const onDown = () => {
      pressedRef.current = true;
    };
    const onUp = () => {
      pressedRef.current = false;
    };

    const opts = { passive: true } as const;
    const onMouseMove = (e: MouseEvent) => onMove(e);
    window.addEventListener("pointermove", onMove, opts);
    window.addEventListener("mousemove", onMouseMove, opts);
    window.addEventListener("pointerdown", onDown, opts);
    window.addEventListener("pointerup", onUp, opts);
    window.addEventListener("blur", onUp);

    let rafId = 0;
    const tick = () => {
      // Glow follower
      glow.current.x += (mouse.current.x - glow.current.x) * lerpGlow;
      glow.current.y += (mouse.current.y - glow.current.y) * lerpGlow;

      const showPill = modeRef.current === "project";
      if (glowRef.current) {
        const glowScale = pressedRef.current ? 0.92 : modeRef.current === "interactive" ? 1.12 : 1;
        glowRef.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0) translate(-50%, -50%) scale(${glowScale})`;
        glowRef.current.style.opacity = showPill ? "0" : "1";
      }

      if (showPill) {
        pill.current.x += (mouse.current.x - pill.current.x) * lerpPill;
        pill.current.y += (mouse.current.y - pill.current.y) * lerpPill;
      }
      if (pillRef.current) {
        // Offset so it feels like a CTA beside the cursor (not centered on it).
        const ox = 18;
        const oy = 16;
        const scale = showPill ? (pressedRef.current ? 0.98 : 1) : 0.95;
        pillRef.current.style.transform = `translate3d(${pill.current.x + ox}px, ${pill.current.y + oy}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-on", "custom-cursor-ready");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onUp);
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
      aria-hidden
    >
      {/* soft glow follower — tinted so it reads on light + dark backgrounds */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-14 w-14 rounded-full bg-violet-500/22 blur-[12px] will-change-transform transition-opacity duration-150 dark:bg-white/12 dark:blur-[10px]"
      />

      {/* dot: light ring for contrast on pale bg, glow on dark */}
      <div
        ref={dotRef}
        className={`absolute left-0 top-0 h-2 w-2 rounded-full border border-zinc-900/35 bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.95),0_0_14px_rgba(99,102,241,0.35)] will-change-transform transition-[opacity,transform] duration-150 dark:border-white/45 dark:shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_0_18px_6px_rgba(255,255,255,0.35)] ${
          project ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        ref={pillRef}
        className={`absolute left-0 top-0 will-change-transform transition-[opacity,transform] duration-200 ease-[cubic-bezier(.22,1,.36,1)] ${
          project ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <span className="inline-flex items-center rounded-full bg-zinc-100/95 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_18px_60px_-18px_rgba(0,0,0,0.65)] ring-1 ring-black/10 backdrop-blur-md">
          View project
        </span>
      </div>
    </div>
  );
}
