type NanoChipProps = {
  children: React.ReactNode;
  className?: string;
};

/** Compact pill label — extra UI chrome for sections and meta. */
export function NanoChip({ children, className = "" }: NanoChipProps) {
  return (
    <span
      className={`font-tech inline-flex items-center rounded-full border border-zinc-300/80 bg-zinc-900/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 dark:border-white/15 dark:bg-white/5 dark:text-white/60 ${className}`}
    >
      {children}
    </span>
  );
}
