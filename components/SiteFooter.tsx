"use client";

import type { SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnalyticsCodeBlock from "@/components/AnalyticsCodeBlock";
import { footerBio, links, person } from "@/lib/site-content";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function IconGitHub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.063 2.063 0 1.139-.925 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconLinktree(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.415-1.414M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.415 1.414"
      />
    </svg>
  );
}

function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconWhatsApp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type SocialIconItem = {
  href: string;
  label: string;
  Icon: typeof IconGitHub;
};

const social: readonly SocialIconItem[] = [
  { href: links.github, label: "GitHub", Icon: IconGitHub },
  { href: links.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  { href: links.instagram, label: "Instagram", Icon: IconInstagram },
  { href: links.linktree, label: "Linktree", Icon: IconLinktree },
  { href: links.email, label: "Email", Icon: IconMail },
  { href: links.whatsapp, label: "WhatsApp", Icon: IconWhatsApp },
];

export default function SiteFooter() {
  const reduceMotion = useReducedMotion();

  return (
    <footer
      id="contact"
      className="relative z-20 scroll-mt-24 overflow-hidden border-t border-zinc-200/70 bg-gradient-to-b from-zinc-100 via-stone-50 to-zinc-200/80 md:scroll-mt-28 dark:border-white/10 dark:from-[#060608] dark:via-[#08080a] dark:to-[#030304]"
      aria-labelledby="footer-heading"
    >
      {/* Match site chrome: soft highlight + violet accent (same family as links / glass hover) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,rgba(139,92,246,0.11),transparent_55%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,rgba(139,92,246,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_90%_50%_at_50%_-15%,rgba(255,255,255,0.95),transparent)] dark:opacity-[0.06] dark:bg-[radial-gradient(ellipse_90%_50%_at_50%_-15%,rgba(255,255,255,0.45),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20 lg:py-24">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-xl flex-1">
            <motion.div
              variants={container}
              initial={reduceMotion ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-20px" }}
              className="space-y-6"
            >
              <motion.div variants={fadeUp} className="relative">
                <p
                  id="footer-heading"
                  className="font-footer-signature font-normal not-italic tracking-[0.02em] text-zinc-900 antialiased subpixel-antialiased [text-shadow:0_2px_28px_rgba(0,0,0,0.06)] dark:text-white dark:[text-shadow:0_0_52px_rgba(255,255,255,0.12)]"
                >
                  {/* Great Vibes (next/font) — calligraphic connecting script; not sans-serif. */}
                  <span
                    className="block max-w-[min(100%,36rem)] text-[clamp(2.5rem,8.5vw,4.75rem)] leading-[1.08] text-pretty sm:max-w-none sm:leading-[1.06] sm:whitespace-nowrap"
                    style={{
                      /* Resolved on `body` — includes next/font Great Vibes (`--font-footer-signature`) */
                      fontFamily: "var(--font-family-footer-signature)",
                      fontFeatureSettings: '"liga" 1, "kern" 1',
                    }}
                  >
                    {person.displayName}
                  </span>
                </p>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-display text-xs font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-white/55 sm:text-sm"
              >
                {person.role} <span className="text-zinc-400/80 dark:text-white/35">·</span> {person.tagline}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base leading-relaxed text-zinc-700 md:text-[1.05rem] md:leading-[1.65] dark:text-white/90"
              >
                {footerBio.body}
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.2, delay: reduceMotion ? 0 : 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-w-0 shrink-0 flex-col gap-6 lg:items-end lg:pt-2"
          >
            <nav aria-label="Social links" className="flex flex-col gap-6 lg:items-end">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-white/40">
                Connect
              </p>
              <ul className="flex flex-wrap gap-3 lg:justify-end">
                {social.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <motion.a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={label}
                      title={label}
                      whileHover={reduceMotion ? undefined : { scale: 1.06, y: -2 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/90 bg-white/70 text-zinc-700 shadow-sm shadow-zinc-900/5 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/[0.08] hover:text-violet-700 hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.35)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/85 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:border-violet-400/35 dark:hover:text-white dark:hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.45)]"
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="w-full min-w-0 max-w-md lg:max-w-sm">
              <AnalyticsCodeBlock />
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.22 }}
          className="mt-14 border-t border-zinc-200/80 pt-8 text-center text-xs text-zinc-500 md:text-left dark:border-white/[0.07] dark:text-white/35"
        >
          © {new Date().getFullYear()} {person.displayName}. Built with Next.js.
        </motion.p>
      </div>
    </footer>
  );
}
