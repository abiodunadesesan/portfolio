import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

/** Glass panel — used in Projects and as a nano UI primitive. */
export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200/70 bg-white/70 p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.04)_inset] backdrop-blur-xl transition-shadow duration-500 hover:border-violet-300/60 hover:shadow-[0_8px_40px_-12px_rgba(109,40,217,0.2)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] dark:hover:border-white/20 dark:hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}
