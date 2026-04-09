import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerProjectCards } from "@/components/StaggerProjectCards";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { getFallbackPreviewDataUrl, getProjectPreviewImageUrl } from "@/lib/preview";
import { caseStudies, links, projects } from "@/lib/site-content";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  return (
    <AnimatedSection
      id="work"
      className="binary-matrix relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-gradient-to-b from-zinc-50 via-neutral-50 to-stone-100/90 px-6 pt-14 pb-24 dark:border-white/10 dark:from-[#060608] dark:via-[#08080c] dark:to-[#0a0a10] md:scroll-mt-28 md:px-12 md:pt-20 md:pb-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <NanoChip>Selected work</NanoChip>
            <h2
              id="projects-heading"
              className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
            >
              Case studies (high-signal)
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
              A few projects shown the way recruiters and clients read them: problem → approach → outcomes.
            </p>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-violet-700 underline-offset-4 transition hover:text-zinc-900 hover:underline dark:text-violet-300/90 dark:hover:text-white"
            >
              View all on GitHub →
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:gap-8">
          {caseStudies.map((c) => (
            <GlassCard key={c.href} spotlight className="group" data-cursor="view-project">
              <details className="group/details">
                <summary className="cursor-pointer list-none select-none">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                        {c.category} · {c.year}
                      </p>
                      <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-white/55">
                        {c.problem}
                      </p>
                    </div>
                    <div className="hidden shrink-0 md:block md:w-[15.5rem]">
                      {(() => {
                        const preview =
                          c.previewImage ??
                          getProjectPreviewImageUrl(c.href) ??
                          getFallbackPreviewDataUrl(c.title);
                        return preview ? (
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-200/70 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent shadow-sm shadow-zinc-900/5 dark:border-white/10">
                            <img
                              src={preview}
                              alt={`${c.title} preview`}
                              loading="lazy"
                              className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                            />
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent dark:from-black/55"
                            />
                          </div>
                        ) : null;
                      })()}
                    </div>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm shadow-zinc-900/5 backdrop-blur-sm transition hover:border-violet-300/60 hover:bg-violet-50/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-violet-400/25 dark:hover:bg-violet-500/[0.08] md:mt-0"
                    >
                      Open
                      <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
                    </a>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.tech.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75"
                      >
                        {t}
                      </span>
                    ))}
                    <span className="inline-flex items-center rounded-full border border-violet-200/70 bg-violet-50/60 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-400/15 dark:bg-violet-500/[0.07] dark:text-violet-200/80">
                      Click for details
                    </span>
                  </div>
                </summary>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                      Approach
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-white/75">
                      {c.approach.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500/70 dark:bg-violet-300/70" aria-hidden />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                      Challenges
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-white/75">
                      {c.challenges.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400/70 dark:bg-white/30" aria-hidden />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                      Outcomes
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-white/75">
                      {c.outcomes.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500/70 dark:bg-emerald-300/70" aria-hidden />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            </GlassCard>
          ))}
        </div>

        <div className="mt-14">
          <div className="mb-6">
            <NanoChip>More projects</NanoChip>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-white/55">
              Additional repos and builds. I keep this list curated—quality over quantity.
            </p>
          </div>
          <StaggerProjectCards items={projects} />
        </div>
      </div>
    </AnimatedSection>
  );
}
