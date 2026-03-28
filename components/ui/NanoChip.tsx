type NanoChipProps = {
  children: React.ReactNode;
  className?: string;
};

/** Compact pill label — extra UI chrome for sections and meta. */
export function NanoChip({ children, className = "" }: NanoChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 ${className}`}
    >
      {children}
    </span>
  );
}
