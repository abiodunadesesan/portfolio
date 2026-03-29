"use client";

import { useEffect, useState } from "react";
import { analyticsFallback } from "@/lib/site-content";

type Stats = {
  totalVisitors: number;
  totalVisits: number;
  pageViews: number;
  asOfLabel: string;
};

export default function AnalyticsCodeBlock() {
  const [stats, setStats] = useState<Stats>(() => ({
    totalVisitors: analyticsFallback.totalVisitors,
    totalVisits: analyticsFallback.totalVisits,
    pageViews: analyticsFallback.pageViews,
    asOfLabel: analyticsFallback.asOfLabel,
  }));

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const visitorId = (() => {
        try {
          const k = "portfolio_vid";
          let id = localStorage.getItem(k);
          if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(k, id);
          }
          return id;
        } catch {
          return `anon-${Date.now()}`;
        }
      })();

      const sessionVisit = (() => {
        try {
          const k = "portfolio_session_tracked";
          if (sessionStorage.getItem(k)) return false;
          sessionStorage.setItem(k, "1");
          return true;
        } catch {
          return true;
        }
      })();

      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, sessionVisit }),
        });
      } catch {
        /* offline — still try GET */
      }

      try {
        const res = await fetch("/api/analytics", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Stats & { source?: string };
        if (cancelled) return;
        setStats({
          totalVisitors: Number(data.totalVisitors) || 0,
          totalVisits: Number(data.totalVisits) || 0,
          pageViews: Number(data.pageViews) || 0,
          asOfLabel: data.asOfLabel ?? analyticsFallback.asOfLabel,
        });
      } catch {
        /* keep fallback */
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <figure
      className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/75 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-shadow duration-500 hover:border-violet-300/60 hover:shadow-[0_0_36px_-10px_rgba(139,92,246,0.2)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:border-white/15 dark:hover:shadow-[0_0_36px_-10px_rgba(168,85,247,0.35)] md:p-6"
      aria-label="Site analytics"
    >
      <pre className="font-mono text-[13px] leading-relaxed text-zinc-800 md:text-sm dark:text-white/90">
        <code>
          <span className="text-zinc-500 dark:text-zinc-500">
            {"// "}
            {stats.asOfLabel}
          </span>
          {"\n"}
          <span className="text-sky-700 dark:text-sky-300">const</span>
          <span className="text-zinc-800 dark:text-white"> </span>
          <span className="text-amber-800 dark:text-amber-100">totalVisitors</span>
          <span className="text-rose-600 dark:text-rose-300">=</span>
          <span className="text-emerald-700 dark:text-lime-300">{stats.totalVisitors}</span>
          <span className="text-zinc-800 dark:text-white">;</span>
          {"\n"}
          <span className="text-sky-700 dark:text-sky-300">const</span>
          <span className="text-zinc-800 dark:text-white"> </span>
          <span className="text-amber-800 dark:text-amber-100">totalVisits</span>
          <span className="text-rose-600 dark:text-rose-300">=</span>
          <span className="text-emerald-700 dark:text-lime-300">{stats.totalVisits}</span>
          <span className="text-zinc-800 dark:text-white">;</span>
          {"\n"}
          <span className="text-sky-700 dark:text-sky-300">const</span>
          <span className="text-zinc-800 dark:text-white"> </span>
          <span className="text-amber-800 dark:text-amber-100">pageViews</span>
          <span className="text-rose-600 dark:text-rose-300">=</span>
          <span className="text-emerald-700 dark:text-lime-300">{stats.pageViews}</span>
          <span className="text-zinc-800 dark:text-white">;</span>
        </code>
      </pre>
    </figure>
  );
}
