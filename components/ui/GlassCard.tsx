import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

/** Glass panel — used in Projects and as a nano UI primitive. */
export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-xl transition-shadow duration-500 hover:border-white/20 hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}
