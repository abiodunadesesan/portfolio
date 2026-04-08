"use client";

import Link from "next/link";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseMeSection from "@/components/WhyChooseMeSection";
import ProcessSection from "@/components/ProcessSection";
import FaqSection from "@/components/FaqSection";
import LetsConnectSection from "@/components/LetsConnectSection";
import SiteFooter from "@/components/SiteFooter";
import { links, person } from "@/lib/site-content";
import { Calendar } from "lucide-react";

export default function ServicesPageLayout() {
  return (
    <>
      <main id="main-content">
        <section className="border-b border-white/10 bg-[#0a0a0a] px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Our services</p>
            <h1 className="font-display mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              High-performing websites &amp; products, engineered for you.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Strategic, modern builds that engage and convert—not just look good in a portfolio. From Next.js apps to
              WordPress marketing sites and ML prototypes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-zinc-100 px-6 text-sm font-semibold text-zinc-900 transition hover:border-violet-200/60 hover:bg-violet-50/55 hover:text-violet-950"
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
            <p className="mt-6 text-xs text-zinc-600">
              {person.displayName} · {person.role} · {person.tagline}
            </p>
          </div>
        </section>

        <ServicesSection />
        <WhyChooseMeSection />
        <ProcessSection />
        <FaqSection />
        <LetsConnectSection />
      </main>
      <SiteFooter />
    </>
  );
}
