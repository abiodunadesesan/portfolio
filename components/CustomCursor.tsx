"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CURSOR_INTERACTIVE, CURSOR_VIEW_PROJECT, DATA_CURSOR } from "@/lib/cursor";

type CursorMode = "default" | "interactive" | "project";

function getTargetElement(e: Event): Element | null {
  const t = e.target;
  if (t instanceof Element) return t;
  const anyE = e as unknown as { composedPath?: () => unknown[] };
  const path0 = anyE.composedPath?.()?.[0];
  return path0 instanceof Element ? path0 : null;
}

/** True when a fine pointer is available (mouse / trackpad). Excludes typical phones. */
function shouldUseCustomCursor() {
  if (typeof window === "undefined") return false;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const anyFine = window.matchMedia("(any-pointer: fine)").matches;
  const coarseOnly =
    window.matchMedia("(pointer: coarse)").matches && !anyFine && !fine;
  return !coarseOnly && (fine || anyFine);
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
 * Native arrow + sharp white follower dot that lerps behind the pointer.
 * Interactive targets: subtle violet accent (no big white “bloom”).
 */
function CustomCursorLayer() {
  const followerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  const pill = useRef({ x: 0, y: 0 });
  const modeRef = useRef<CursorMode>("default");
  const pressedRef = useRef(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /** Higher = snappier; still visibly lags behind the arrow. */
    const lerpFollower = reduce ? 0.5 : 0.42;
    const lerpPill = reduce ? 0.65 : 0.22;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouse.current = { x: cx, y: cy };
    follower.current = { x: cx, y: cy };
    pill.current = { x: cx, y: cy };

    const applyFollower = () => {
      const el = followerRef.current;
      if (!el) return;
      const showPill = modeRef.current === "project";
      if (showPill) {
        el.style.opacity = "0";
        return;
      }
      el.style.opacity = "1";
      const interactive = modeRef.current === "interactive";
      const scale = pressedRef.current ? 0.88 : interactive ? 1.05 : 1;
      el.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const applyPill = () => {
      if (!pillRef.current) return;
      const ox = 18;
      const oy = 16;
      const showPill = modeRef.current === "project";
      const scale = showPill ? (pressedRef.current ? 0.98 : 1) : 0.95;
      pillRef.current.style.transform = `translate3d(${pill.current.x + ox}px, ${pill.current.y + oy}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const sync = () => {
      applyFollower();
      applyPill();
    };
    sync();
    requestAnimationFrame(sync);

    const onMove = (e: PointerEvent | MouseEvent) => {
      const el = getTargetElement(e);
      const next = getMode(el);
      const prev = modeRef.current;
      if (next !== prev) {
        setMode(next);
        if (next === "project") pill.current = { x: e.clientX, y: e.clientY };
      }
      modeRef.current = next;
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => {
      pressedRef.current = true;
    };
    const onUp = () => {
      pressedRef.current = false;
    };

    const opts = { passive: true, capture: true } as const;
    const doc = document;
    const onMouseMove = (e: MouseEvent) => onMove(e);
    doc.addEventListener("pointermove", onMove, opts);
    doc.addEventListener("mousemove", onMouseMove, opts);
    doc.addEventListener("pointerdown", onDown, opts);
    doc.addEventListener("pointerup", onUp, opts);
    window.addEventListener("blur", onUp);

    let rafId = 0;
    const tick = () => {
      follower.current.x += (mouse.current.x - follower.current.x) * lerpFollower;
      follower.current.y += (mouse.current.y - follower.current.y) * lerpFollower;

      if (modeRef.current === "project") {
        pill.current.x += (mouse.current.x - pill.current.x) * lerpPill;
        pill.current.y += (mouse.current.y - pill.current.y) * lerpPill;
      }

      applyFollower();
      applyPill();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      doc.removeEventListener("pointermove", onMove, opts);
      doc.removeEventListener("mousemove", onMouseMove, opts);
      doc.removeEventListener("pointerdown", onDown, opts);
      doc.removeEventListener("pointerup", onUp, opts);
      window.removeEventListener("blur", onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const project = mode === "project";
  const interactive = mode === "interactive";

  const layer = (
    <div
      data-cursor-root
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 2147483647 }}
      aria-hidden
    >
      <div
        ref={followerRef}
        className={`absolute left-0 top-0 h-2.5 w-2.5 rounded-full will-change-transform ${
          interactive && !project
            ? "border border-violet-400/45 bg-white shadow-[0_0_12px_rgba(139,92,246,0.42)] ring-2 ring-violet-400/35 dark:border-violet-300/40 dark:bg-zinc-100 dark:shadow-[0_0_14px_rgba(167,139,250,0.32)] dark:ring-violet-400/25"
            : "border border-zinc-900/25 bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.9),0_1px_6px_rgba(0,0,0,0.22)] dark:border-white/35 dark:bg-zinc-50 dark:shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_0_10px_rgba(255,255,255,0.22)]"
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

  if (typeof document === "undefined") return null;
  return createPortal(layer, document.body);
}

/**
 * Desktop: native cursor + lagging sharp dot; project cards show the pill.
 */
export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [useCursor, setUseCursor] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ok = shouldUseCustomCursor();
    setUseCursor(ok);
    const mqFine = window.matchMedia("(any-pointer: fine)");
    const mqPointer = window.matchMedia("(pointer: fine)");
    const sync = () => setUseCursor(shouldUseCustomCursor());
    mqFine.addEventListener("change", sync);
    mqPointer.addEventListener("change", sync);
    return () => {
      mqFine.removeEventListener("change", sync);
      mqPointer.removeEventListener("change", sync);
    };
  }, [mounted]);

  if (!mounted || !useCursor) {
    return null;
  }

  return <CustomCursorLayer />;
}
