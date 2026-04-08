"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { posts } from "@/lib/site-content";
import { ArrowUpRight } from "lucide-react";

export default function WritingSection() {
  return (
    <AnimatedSection
      id="writing"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-white px-6 py-24 dark:border-white/10 dark:bg-[#0a0a10] md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="writing-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <NanoChip>Writing</NanoChip>
            <h2
              id="writing-heading"
              className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
            >
              Notes &amp; experiments
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
              Short posts that show how I think—trade-offs, experiments, and lessons learned.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {posts.map((p) => {
            const isLink = !!p.href;
            const card = (
              <GlassCard className={isLink ? "group cursor-pointer" : ""}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                      {p.date}
                    </p>
                    <p className="font-display mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {p.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-white/55">{p.blurb}</p>
                  </div>
                  {isLink ? (
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-500 transition group-hover:text-violet-700 dark:text-white/45 dark:group-hover:text-violet-200" aria-hidden />
                  ) : null}
                </div>
              </GlassCard>
            );
            return isLink ? (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a10]"
              >
                {card}
              </a>
            ) : (
              <div key={p.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

