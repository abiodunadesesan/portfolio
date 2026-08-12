/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { useMemo, useState } from "react";
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

  const dragHandlers = useMemo(
    () =>
      dials.map((dial, idx) => ({
        onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
          if (dial.locked) return;
          const startY = e.clientY;
          const start = dials[idx]?.value ?? 0;
          const el = e.currentTarget;
          el.setPointerCapture(e.pointerId);

          const onMove = (ev: PointerEvent) => {
            const delta = Math.round((startY - ev.clientY) * 0.42);
            const next = Math.max(0, Math.min(100, start + delta));
            setDials((prev) => {
              const copy = [...prev];
              copy[idx] = { ...copy[idx]!, value: next };
              return copy;
            });
          };

          const onUp = () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerup", onUp);
            el.removeEventListener("pointercancel", onUp);
          };

          el.addEventListener("pointermove", onMove);
          el.addEventListener("pointerup", onUp);
          el.addEventListener("pointercancel", onUp);
        },
      })),
    [dials]
  );

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
                  {...dragHandlers[index]}
                  role="slider"
                  aria-label={item.label}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={item.value}
                  className={`relative h-20 w-20 touch-none select-none rounded-full border shadow-sm transition-transform duration-150 active:scale-[0.97] ${
                    item.accent
                      ? "border-violet-500/40 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-400 text-white shadow-violet-900/30"
                      : "cursor-ns-resize border-zinc-300 bg-gradient-to-br from-white to-zinc-100 dark:border-white/15 dark:from-zinc-800 dark:to-zinc-900"
                  }`}
                >
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={`${item.label}-tick-${i}`}
                      className={`absolute left-1/2 top-1/2 h-[1px] w-2 origin-left ${
                        item.accent ? "bg-black/25 dark:bg-white/35" : "bg-zinc-400/60 dark:bg-white/30"
                      }`}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateX(33px)`,
                      }}
                    />
                  ))}
                  <span
                    className={`absolute left-1/2 top-1/2 h-6 w-[2px] -translate-x-1/2 -translate-y-[85%] rounded-full ${
                      item.accent ? "bg-white" : "bg-zinc-900 dark:bg-white/85"
                    }`}
                    style={{ transform: `translate(-50%, -85%) rotate(${turn}deg)` }}
                  />
                  <span
                    className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      item.accent ? "bg-zinc-900" : "bg-zinc-900"
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
