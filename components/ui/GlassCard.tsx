"use client";

import {
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  /** Pointer-following radial highlight (Tricia-style card hover). */
  spotlight?: boolean;
};

/** Glass panel — optional cursor spotlight on hover. */
export function GlassCard({ children, className = "", spotlight = false, ...rest }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!spotlight) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--spot-y", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const onPointerLeave = () => {
    if (!spotlight) return;
    ref.current?.style.setProperty("--spot-x", "50%");
    ref.current?.style.setProperty("--spot-y", "50%");
  };

  const base =
    "rounded-2xl border border-zinc-200/70 bg-white/70 p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.04)_inset] backdrop-blur-xl transition-shadow duration-500 hover:border-violet-300/60 hover:shadow-[0_8px_40px_-12px_rgba(109,40,217,0.2)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] dark:hover:border-white/20 dark:hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.35)]";

  const spotlightWrap = spotlight
    ? "group/spot relative overflow-hidden [--spot-x:50%] [--spot-y:50%]"
    : "";

  const style = spotlight
    ? ({ "--spot-x": "50%", "--spot-y": "50%" } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      onPointerMove={spotlight ? onPointerMove : undefined}
      onPointerLeave={spotlight ? onPointerLeave : undefined}
      className={`${base} ${spotlightWrap} ${className}`}
      style={style}
      {...rest}
    >
      {spotlight ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
            style={{
              background:
                "radial-gradient(520px circle at var(--spot-x) var(--spot-y), rgba(139,92,246,0.16), rgba(255,255,255,0.05) 38%, transparent 52%)",
            }}
          />
          <div className="relative z-[1] h-full min-h-0 min-w-0">{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
