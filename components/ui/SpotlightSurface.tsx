"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Dark section (FAQ): stronger violet + light bloom. */
  variant?: "light" | "dark";
};

/** Cursor-following radial highlight for non–GlassCard panels (e.g. FAQ rows). */
export function SpotlightSurface({ children, className = "", variant = "light" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--sx", "50%");
    ref.current?.style.setProperty("--sy", "50%");
  };

  const bg =
    variant === "dark"
      ? "radial-gradient(520px circle at var(--sx) var(--sy), rgba(139,92,246,0.28), rgba(255,255,255,0.06) 40%, transparent 55%)"
      : "radial-gradient(520px circle at var(--sx) var(--sy), rgba(139,92,246,0.14), transparent 48%)";

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group/spot relative overflow-hidden ${className}`}
      style={{ "--sx": "50%", "--sy": "50%" } as CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: bg }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
