"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * - `LazyMotion` + `domAnimation`: smaller than importing the full motion feature set.
 * - `MotionConfig reducedMotion="user"`: honors `prefers-reduced-motion` for Framer-driven motion.
 * - Hero loops (orb drift, cues, title glow) use CSS `@keyframes` in `globals.css` so they run on the
 *   compositor without JS tickers; `prefers-reduced-motion` is duplicated there for belt-and-suspenders.
 * - Scroll-linked hero UI still uses Framer `useScroll` / `useTransform` (small surface vs dropping scroll physics).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict={false}>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
