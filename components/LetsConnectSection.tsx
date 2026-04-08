"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { NanoChip } from "@/components/ui/NanoChip";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";
import { VerbCrossFade } from "@/components/VerbCrossFade";
import { connectOffers, connectVerbs, links } from "@/lib/site-content";
import { Calendar, FolderGit2 } from "lucide-react";

export default function LetsConnectSection() {
  return (
    <AnimatedSection
      id="lets-connect"
      className="binary-matrix relative z-20 scroll-mt-24 bg-[#0a0a0a] px-6 pb-8 pt-20 md:scroll-mt-28 md:px-12 md:pb-12 md:pt-28"
      aria-labelledby="lets-connect-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/50 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.6)] backdrop-blur-sm md:rounded-[2.5rem]">
          <div className="grid gap-10 p-8 md:grid-cols-2 md:gap-12 md:p-12 lg:p-14">
            <div className="flex flex-col justify-center">
              <NanoChip className="border-white/15 bg-white/5 text-white/70">
                Let&apos;s connect
              </NanoChip>
              <h2
                id="lets-connect-heading"
                className="font-display mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
              >
                <span className="text-white">Let&apos;s </span>
                <VerbCrossFade verbs={connectVerbs} className="align-baseline" />
                <span className="text-white"> incredible products </span>
                <span className="text-zinc-500">together.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
                Two clear starting points—pick what fits. We can refine scope on a quick call.
              </p>

              <div className="mt-8 space-y-6">
                {connectOffers.map((o) => (
                  <SpotlightSurface key={o.title} variant="dark" className="rounded-2xl border border-white/10 bg-black/30 p-5 md:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <p className="font-display text-lg font-semibold text-white md:text-xl">
                        {o.title}
                      </p>
                      <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        {o.priceLabel}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{o.description}</p>
                  </SpotlightSurface>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="/projects"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                >
                  <FolderGit2 className="h-4 w-4 opacity-90" aria-hidden />
                  See all projects
                </a>
                <a
                  href={links.bookCall}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-900 shadow-lg shadow-black/30 transition hover:bg-zinc-100"
                >
                  <Calendar className="h-4 w-4 opacity-90" aria-hidden />
                  Book a call
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[280px] items-center justify-center md:min-h-[360px]">
              <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black shadow-2xl">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(139,92,246,0.35), transparent 50%), radial-gradient(ellipse 70% 50% at 80% 80%, rgba(236,72,153,0.15), transparent 45%)",
                  }}
                />
                <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                    Preview
                  </p>
                  <p className="font-display mt-3 text-2xl font-semibold text-white md:text-3xl">
                    Black collection
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Replace with your project screenshot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
