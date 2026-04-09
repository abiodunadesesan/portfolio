"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { recentHighlights } from "@/lib/site-content";
import { getFallbackPreviewDataUrl, getProjectPreviewImageUrl } from "@/lib/preview";
import { ArrowUpRight } from "lucide-react";

export default function RecentProjectsSection() {
  return (
    <AnimatedSection
      id="recent"
      className="binary-matrix relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-gradient-to-b from-zinc-50 via-neutral-50 to-stone-100/90 px-6 py-24 dark:border-white/10 dark:from-[#060608] dark:via-[#08080c] dark:to-[#0a0a10] md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="recent-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <NanoChip>Recent projects</NanoChip>
            <h2
              id="recent-heading"
              className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
            >
              Recent highlights
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
              A quick gallery of recent work—design, engineering, and outcomes in one glance.
            </p>
          </div>
          <a
            href="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm shadow-zinc-900/5 backdrop-blur-sm transition hover:border-violet-300/60 hover:bg-violet-50/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-violet-400/25 dark:hover:bg-violet-500/[0.08]"
          >
            See all projects <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {recentHighlights.map((p) => {
            const preview = p.previewImage ?? getProjectPreviewImageUrl(p.href);
            return (
              <a
                key={p.href}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor="view-project"
                className="block outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#08080c]"
              >
                <GlassCard spotlight className="group h-full cursor-pointer">
                  <div className="flex h-full flex-col gap-4">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200/70 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent dark:border-white/10 dark:from-violet-500/20 dark:via-fuchsia-500/10">
                      {preview ? (
                        <>
                          <img
                            src={preview}
                            alt={`${p.title} preview`}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = getFallbackPreviewDataUrl(p.title);
                            }}
                            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)] opacity-35 dark:opacity-15"
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent dark:from-black/55"
                          />
                        </>
                      ) : (
                        <div className="h-full w-full bg-[radial-gradient(ellipse_80%_70%_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)] opacity-40 dark:opacity-15" />
                      )}
                    </div>
                    <div className="mt-auto">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                        {p.category} · {p.year}
                      </p>
                      <p className="font-display mt-2 text-lg font-semibold tracking-tight text-zinc-900 transition group-hover:text-violet-800 dark:text-white dark:group-hover:text-violet-100">
                        {p.title}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </a>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

