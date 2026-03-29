"use client";

import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const reduceMotion = useReducedMotion();

  if (!mounted) {
    return (
      <div
        className={`h-11 w-11 shrink-0 rounded-xl border border-zinc-200/80 bg-white/50 dark:border-white/10 dark:bg-white/[0.04] ${className}`}
        aria-hidden
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      layout
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200/90 bg-gradient-to-br from-white to-zinc-100 text-violet-700 shadow-sm transition-colors dark:border-white/12 dark:from-zinc-900/90 dark:to-zinc-950 dark:text-violet-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="sr-only">Toggle color theme</span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0.5, opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <Moon className="h-5 w-5" strokeWidth={2} aria-hidden />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ rotate: isDark ? -90 : 0, scale: isDark ? 0.5 : 1, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <Sun className="h-5 w-5" strokeWidth={2} aria-hidden />
      </motion.span>
    </motion.button>
  );
}
