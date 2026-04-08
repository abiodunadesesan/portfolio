"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { NanoChip } from "@/components/ui/NanoChip";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";
import { faqs, links, testimonials } from "@/lib/site-content";
import { Calendar, Mail, Plus, X } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqSpotlight = testimonials[0];

  return (
    <AnimatedSection
      id="faq"
      className="binary-matrix relative z-20 scroll-mt-24 border-t border-white/5 bg-[#0a0a0a] px-6 py-24 md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left: Tricia-style — heading + testimonial + CTAs */}
          <div>
            <NanoChip className="border-white/15 bg-white/5 text-white/70">FAQ Section</NanoChip>
            <h2
              id="faq-heading"
              className="font-display mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
            >
              <span className="text-white">Questions,</span>{" "}
              <span className="text-zinc-500">Answers</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
              Get quick answers to your most pressing questions.
            </p>

            <SpotlightSurface
              variant="dark"
              className="mt-8 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-lg font-semibold text-white"
                  aria-hidden
                >
                  {faqSpotlight.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-semibold text-white">{faqSpotlight.name}</p>
                  {faqSpotlight.org ? (
                    <p className="text-sm text-zinc-500">{faqSpotlight.org}</p>
                  ) : null}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-amber-400/90">5.0</span>
                    <span className="text-amber-400/90" aria-hidden>
                      ★★★★★
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    &ldquo;{faqSpotlight.quote}&rdquo;
                  </p>
                </div>
              </div>
            </SpotlightSurface>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/projects"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-transparent px-6 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                See all projects
              </a>
              <a
                href="#contact-form"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-900 transition hover:bg-white"
              >
                Contact now
              </a>
              <a
                href={links.bookCall}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Calendar className="h-4 w-4" aria-hidden />
                Book a call
              </a>
              <a
                href={links.email}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email
              </a>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="space-y-2">
            {faqs.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <SpotlightSurface
                  key={f.q}
                  variant="dark"
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen
                      ? "border-white/20 bg-zinc-900/70"
                      : "border-white/10 bg-zinc-900/30 hover:border-white/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-semibold leading-snug text-white md:text-lg">
                      {f.q}
                    </span>
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
                      aria-hidden
                    >
                      {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="border-t border-white/10 px-5 pb-5 pt-0 md:px-6">
                      <p className="pt-4 text-sm leading-relaxed text-zinc-400">{f.a}</p>
                    </div>
                  ) : null}
                </SpotlightSurface>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
