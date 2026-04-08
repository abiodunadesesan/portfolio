"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import WhyChooseMeSection from "@/components/WhyChooseMeSection";
import LetsConnectSection from "@/components/LetsConnectSection";
import Image from "next/image";
import {
  aboutPage,
  aboutSkillPills,
  caseStudies,
  educationCredential,
  endorsedByLines,
  links,
  person,
  recommendationExcerpts,
  recommendationsCredentialsSection,
  referencesAvailability,
} from "@/lib/site-content";
import { ArrowUpRight, Calendar, GraduationCap, Quote } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";

export default function AboutPageLayout() {
  return (
    <>
      <main id="main-content" className="relative z-10">
        <section className="border-b border-white/10 bg-[#0a0a0a] px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <NanoChip className="border-white/15 bg-white/5 text-white/70">Recent projects</NanoChip>
            <p className="font-display mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500 md:text-xs">
              {person.role}
            </p>
            <h1 className="font-display mt-2 max-w-4xl text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-4xl lg:text-5xl">
              {aboutPage.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {aboutPage.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See all projects
              </Link>
              <a
                href={links.bookCall}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
              >
                <Calendar className="h-4 w-4" aria-hidden />
                Book a call
              </a>
            </div>
          </div>
        </section>

        <AnimatedSection className="border-b border-zinc-200/60 bg-white px-6 py-20 dark:border-white/10 dark:bg-[#0a0a10] md:px-12 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
              Software engineer &amp; developer
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
              {person.displayName}, {person.role}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-white/55">{aboutPage.sub}</p>

            <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900/40">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/caleb-portrait.jpg"
                    alt="Abiodun Caleb Adesesan — professional portrait"
                    fill
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 1024px) 100vw, 40rem"
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/5 dark:ring-white/10" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-800 backdrop-blur-sm dark:border-emerald-400/25 dark:bg-emerald-950/50 dark:text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                  {aboutPage.availability}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <NanoChip>{aboutPage.introChip}</NanoChip>
                <p className="mt-2 text-sm text-zinc-600 dark:text-white/55">{aboutPage.casualCallout}</p>
                <p className="font-display mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  {person.role} · {aboutPage.location}
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 dark:bg-violet-500"
                >
                  Project inquiry
                </Link>
                <p className="mt-8 text-base leading-relaxed text-zinc-700 dark:text-white/80">{aboutPage.bio}</p>
                <p className="mt-6 font-display text-sm font-semibold text-zinc-900 dark:text-white">
                  {aboutPage.tagline}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {aboutSkillPills.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="border-b border-zinc-200/60 bg-gradient-to-b from-white to-zinc-50 px-6 py-20 dark:border-white/10 dark:from-[#0a0a10] dark:to-[#060608] md:px-12 md:py-28">
          <div className="mx-auto max-w-6xl">
            <NanoChip>{recommendationsCredentialsSection.chip}</NanoChip>
            <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
              {recommendationsCredentialsSection.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-white/60">
              {recommendationsCredentialsSection.lead}
            </p>

            <div className="mt-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/90 px-4 py-4 dark:border-white/10 dark:bg-white/[0.03] md:px-6 md:py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                Endorsed by
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-white/70">
                {endorsedByLines.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-500/80 dark:bg-violet-300/80" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="mt-10 grid gap-8 lg:grid-cols-2">
              {recommendationExcerpts.map((rec) => (
                <li key={`${rec.institution}-${rec.recommender}`}>
                  <article className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-200/80 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/10">
                        <Quote className="h-5 w-5 text-violet-600 dark:text-violet-300" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/45">
                          {rec.kind === "professional"
                            ? "Professional reference"
                            : rec.kind === "academic"
                              ? "Academic reference"
                              : "Institutional reference"}
                        </p>
                        <p className="font-display mt-1 text-lg font-semibold text-zinc-900 dark:text-white">{rec.institution}</p>
                        <p className="mt-1 text-sm text-zinc-700 dark:text-white/75">
                          <span className="font-medium">{rec.recommender}</span>
                          <span className="text-zinc-500 dark:text-white/50"> · {rec.role}</span>
                        </p>
                      </div>
                    </div>
                    {rec.paraphrased ? (
                      <div className="mt-6 border-l-2 border-amber-400/50 pl-4 dark:border-amber-500/40">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700/90 dark:text-amber-200/90">
                          Paraphrased summary
                        </p>
                        <div className="mt-2 space-y-3">
                          {rec.quotes.map((q, i) => (
                            <p key={i} className="text-sm leading-relaxed text-zinc-700 dark:text-white/80">
                              {q}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 space-y-4 border-l-2 border-violet-400/40 pl-4 dark:border-violet-500/35">
                        {rec.quotes.map((q, i) => (
                          <blockquote
                            key={i}
                            className="text-sm italic leading-relaxed text-zinc-700 dark:text-white/80"
                          >
                            “{q}”
                          </blockquote>
                        ))}
                      </div>
                    )}
                    {rec.contextNote ? (
                      <p className="mt-5 text-xs leading-relaxed text-zinc-500 dark:text-white/45">{rec.contextNote}</p>
                    ) : null}
                    {rec.footnote ? (
                      <p className="mt-4 text-xs font-medium text-zinc-600 dark:text-white/50">{rec.footnote}</p>
                    ) : null}
                  </article>
                </li>
              ))}
              <li key="education-credential">
                <article className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-200/80 bg-emerald-50 dark:border-emerald-500/25 dark:bg-emerald-500/10">
                      <GraduationCap className="h-5 w-5 text-emerald-700 dark:text-emerald-300" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/45">
                        {educationCredential.label}
                      </p>
                      <p className="font-display mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
                        {educationCredential.degree}
                      </p>
                      <p className="mt-1 text-sm text-zinc-700 dark:text-white/75">
                        {educationCredential.institution}
                        <span className="text-zinc-500 dark:text-white/45"> · {educationCredential.year}</span>
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-zinc-700 dark:text-white/75">{educationCredential.description}</p>
                </article>
              </li>
            </ul>

            <div className="mt-12 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-6 dark:border-white/10 dark:bg-white/[0.04] md:p-8">
              <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">{referencesAvailability.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-white/60">{referencesAvailability.description}</p>
              <p className="mt-3 text-xs text-zinc-500 dark:text-white/45">{referencesAvailability.footnote}</p>
              <Link
                href={referencesAvailability.ctaHref}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-violet-500/35 bg-violet-50 px-5 text-sm font-semibold text-violet-800 transition hover:bg-violet-100 dark:border-violet-400/25 dark:bg-violet-500/10 dark:text-violet-200 dark:hover:bg-violet-500/15"
              >
                {referencesAvailability.ctaLabel}
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="border-b border-zinc-200/60 bg-gradient-to-b from-zinc-50 to-white px-6 py-20 dark:border-white/10 dark:from-[#060608] dark:to-[#0a0a10] md:px-12 md:py-28">
          <div className="mx-auto max-w-6xl">
            <NanoChip>What I&apos;ve been working on</NanoChip>
            <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
              Latest work
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-white/55">
              A showcase where engineering, product thinking, and polish meet.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {caseStudies.slice(0, 4).map((c) => (
                <Link key={c.href} href="/projects" className="group block" data-cursor="view-project">
                  <GlassCard spotlight className="h-full transition group-hover:border-violet-300/50">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/45">
                      {c.category} · {c.year}
                    </p>
                    <p className="font-display mt-2 text-xl font-semibold text-zinc-900 group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-200">
                      {c.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-white/55">{c.problem}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 dark:text-violet-300">
                      View details <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </GlassCard>
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/projects"
                className="inline-flex text-sm font-semibold text-violet-700 underline-offset-4 hover:underline dark:text-violet-300"
              >
                See all projects →
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <WhyChooseMeSection />
        <LetsConnectSection />
      </main>
      <SiteFooter />
    </>
  );
}
