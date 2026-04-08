"use client";

import ContactSection from "@/components/ContactSection";
import LetsConnectSection from "@/components/LetsConnectSection";
import SiteFooter from "@/components/SiteFooter";
import { GlassCard } from "@/components/ui/GlassCard";
import { contactPageStats, links, testimonials } from "@/lib/site-content";
import { Calendar } from "lucide-react";

export default function ContactPageLayout() {
  const spotlight = testimonials[0];

  return (
    <>
      <main id="main-content">
        <section className="border-b border-white/10 bg-[#0a0a0a] px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Let&apos;s connect</p>
            <h1 className="font-display mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              Let&apos;s collaborate and begin the work.
            </h1>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {contactPageStats.map((s) => (
                <GlassCard
                  key={s.label}
                  className="border-white/10 bg-zinc-900/50 text-center dark:bg-zinc-900/50"
                >
                  <p className="font-display text-3xl font-semibold text-white md:text-4xl">{s.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">{s.label}</p>
                </GlassCard>
              ))}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
              <GlassCard className="border-white/10 bg-zinc-900/50 dark:bg-zinc-900/50">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-sm font-semibold text-white"
                    aria-hidden
                  >
                    {spotlight.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-white">{spotlight.name}</p>
                    {spotlight.org ? <p className="text-sm text-zinc-500">{spotlight.org}</p> : null}
                    <div className="mt-2 flex items-center gap-2 text-amber-400/90">
                      <span className="text-sm font-semibold">5.0</span>
                      <span aria-hidden>★★★★★</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">&ldquo;{spotlight.quote}&rdquo;</p>
                  </div>
                </div>
              </GlassCard>

              <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-zinc-900/30 p-8">
                <p className="font-display text-lg font-semibold text-white">Prefer to book a call?</p>
                <p className="mt-2 text-sm text-zinc-400">
                  Pick a time that works—no back-and-forth. Calendly opens in a new tab.
                </p>
                <a
                  href={links.bookCall}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                >
                  <Calendar className="h-4 w-4" aria-hidden />
                  Book a 30‑minute call
                </a>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
        <LetsConnectSection />
      </main>
      <SiteFooter />
    </>
  );
}
