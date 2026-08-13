/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { useRef, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";

type Dial = {
  label: string;
  value: number;
  accent?: boolean;
  locked?: boolean;
};

const INITIAL_DIALS: Dial[] = [
  { label: "TypeScript", value: 95 },
  { label: "Next.js", value: 94 },
  { label: "React", value: 90 },
  { label: "Node.js", value: 78 },
  { label: "Tailwind CSS", value: 88 },
  { label: "Zustand", value: 82 },
  { label: "JavaScript", value: 75 },
  { label: "Taste", value: 100, accent: true, locked: true },
];

export default function Skills() {
  const [dials, setDials] = useState<Dial[]>(INITIAL_DIALS);
  const dragStateRef = useRef<{ index: number; startY: number; startValue: number } | null>(null);

  const onDialPointerDown = (idx: number, dial: Dial, e: React.PointerEvent<HTMLDivElement>) => {
    if (dial.locked) return;
    e.preventDefault();
    dragStateRef.current = {
      index: idx,
      startY: e.clientY,
      startValue: dials[idx]?.value ?? 0,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDialPointerMove = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.index !== idx) return;
    e.preventDefault();
    const delta = Math.round((drag.startY - e.clientY) * 0.42);
    const next = Math.max(0, Math.min(100, drag.startValue + delta));
    setDials((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx]!, value: next };
      return copy;
    });
  };

  const onDialPointerEnd = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.index !== idx) return;
    dragStateRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <AnimatedSection
      id="skills"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-gradient-to-b from-zinc-50 via-stone-50 to-zinc-100/90 px-6 py-20 text-zinc-900 dark:border-white/10 dark:from-[#09090d] dark:via-[#0a0a10] dark:to-[#060608] dark:text-white md:scroll-mt-28 md:px-12 md:py-24"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">03 // </p>
            <h2
              id="skills-heading"
              className="font-display mt-1 text-3xl font-semibold tracking-tight md:text-4xl"
            >
              stack — twist the knobs
            </h2>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
            drag ↕ to play
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {dials.map((item, index) => {
            const turn = -130 + (item.value / 100) * 260;
            return (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div
                  onPointerDown={(e) => onDialPointerDown(index, item, e)}
                  onPointerMove={(e) => onDialPointerMove(index, e)}
                  onPointerUp={(e) => onDialPointerEnd(index, e)}
                  onPointerCancel={(e) => onDialPointerEnd(index, e)}
                  aria-label={item.label}
                  className={`relative h-20 w-20 touch-none select-none rounded-full transition-transform duration-150 active:scale-[0.97] ${
                    item.accent
                      ? "border border-orange-500/40 bg-gradient-to-br from-[#ff7850] via-[#ff5c43] to-[#f24d3d] shadow-[0_8px_20px_rgba(241,76,57,0.35)] dark:border-violet-400/35 dark:from-[#d76cff] dark:via-[#c657ff] dark:to-[#b23cff] dark:shadow-[0_8px_20px_rgba(147,51,234,0.35)]"
                      : "cursor-ns-resize border border-zinc-300 bg-gradient-to-br from-[#f8f5ea] via-[#efe9dc] to-[#ddd7c9] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_16px_rgba(26,26,26,0.12)] dark:border-white/15 dark:from-[#2f2f3a] dark:via-[#262630] dark:to-[#1b1b24] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_16px_rgba(0,0,0,0.45)]"
                  }`}
                >
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={`${item.label}-tick-${i}`}
                      className={`absolute left-1/2 top-1/2 h-[1.5px] w-1.5 origin-left rounded-full ${
                        item.accent ? "bg-black/20 dark:bg-white/45" : "bg-zinc-500/45 dark:bg-white/35"
                      }`}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateX(32px)`,
                      }}
                    />
                  ))}
                  <span
                    className={`absolute inset-[6px] rounded-full ${
                      item.accent
                        ? "bg-black/5 dark:bg-white/5"
                        : "bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] dark:bg-black/15 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    }`}
                  />
                  <span
                    className={`absolute left-1/2 top-1/2 h-[2.5px] w-7 origin-left -translate-y-1/2 rounded-full ${
                      item.accent ? "bg-white/95 dark:bg-zinc-950/90" : "bg-zinc-900 dark:bg-white/90"
                    }`}
                    style={{ transform: `translate(-12%, -50%) rotate(${turn}deg)` }}
                  />
                  <span
                    className={`absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      item.accent ? "bg-zinc-950 dark:bg-zinc-900" : "bg-zinc-950 dark:bg-zinc-100/95"
                    }`}
                  />
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600 dark:text-white/60">
                  {item.label}
                </p>
                <p className="text-xs font-medium text-zinc-700 dark:text-white/75">{item.value}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-white/45">
          Self-rated, not a real benchmark. “Taste” stays maxed. Everything else shifts with how recently I used
          each tool.
        </p>
      </div>
    </AnimatedSection>
  );
}
