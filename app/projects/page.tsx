import Link from "next/link";
import { NanoChip } from "@/components/ui/NanoChip";
import { GlassCard } from "@/components/ui/GlassCard";
import SiteFooter from "@/components/SiteFooter";
import { caseStudies, links, projects, person } from "@/lib/site-content";
import { ArrowUpRight, Calendar } from "lucide-react";

export const metadata = {
  title: `Projects · ${person.displayName}`,
  description: "Case studies and selected projects.",
};

export default function ProjectsPage() {
  return (
    <>
    <main id="main-content" className="relative z-10">
      <section className="border-b border-white/10 bg-[#0a0a0a] px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Recent projects</p>
          <h1 className="font-display mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Elevating brands and products through engineering that ships.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400 md:text-base">
            Case studies and builds spanning web apps, client sites, and applied ML.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-900 transition hover:bg-white"
            >
              Contact now
            </Link>
            <a
              href={links.bookCall}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Book a call
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-12 md:pt-20">
      <div className="mb-12">
        <NanoChip>Projects</NanoChip>
        <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
          All projects
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-white/55 md:text-base">
          A fuller view of the work: narrative case studies plus additional builds.
        </p>
      </div>

      <section aria-labelledby="case-studies-heading" className="mb-16">
        <h2
          id="case-studies-heading"
          className="font-display text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl"
        >
          Case studies
        </h2>
        <div className="mt-6 grid gap-6 lg:gap-8">
          {caseStudies.map((c) => (
            <GlassCard key={c.href} className="group" data-cursor="view-project">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                    {c.category} · {c.year}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-white/55">{c.problem}</p>
                </div>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm shadow-zinc-900/5 backdrop-blur-sm transition hover:border-violet-300/60 hover:bg-violet-50/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-violet-400/25 dark:hover:bg-violet-500/[0.08] md:mt-0"
                >
                  Open <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
                </a>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div>
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
                <div>
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
                <div>
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
            </GlassCard>
          ))}
        </div>
      </section>

      <section aria-labelledby="more-projects-heading">
        <h2
          id="more-projects-heading"
          className="font-display text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl"
        >
          More projects
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view-project"
              className="block outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#08080c]"
            >
              <GlassCard className="group h-full cursor-pointer">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                  {p.tag}
                </p>
                <p className="font-display mt-2 text-xl font-semibold tracking-tight text-zinc-900 transition group-hover:text-violet-800 dark:text-white dark:group-hover:text-violet-100">
                  {p.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-white/55">{p.blurb}</p>
              </GlassCard>
            </a>
          ))}
        </div>
      </section>
      </div>
    </main>
    <SiteFooter />
    </>
  );
}

