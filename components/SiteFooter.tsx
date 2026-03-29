"use client";

import type { SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnalyticsCodeBlock from "@/components/AnalyticsCodeBlock";
import { footerBio, links, person } from "@/lib/site-content";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
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

const social = [
  { href: links.github, label: "GitHub", Icon: IconGitHub },
  { href: links.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  { href: links.linktree, label: "Linktree", Icon: IconLinktree },
  { href: links.email, label: "Email", Icon: IconMail },
] as const;

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
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-6"
            >
              <motion.div variants={fadeUp} className="relative">
                <p
                  id="footer-heading"
                  className="font-signature text-[clamp(2.25rem,7vw,3.75rem)] leading-[1.05] tracking-wide text-zinc-900 drop-shadow-[0_2px_24px_rgba(0,0,0,0.08)] dark:text-white dark:drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)]"
                >
                  {person.displayName}
                </p>
                {!reduceMotion && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px w-0 bg-zinc-400/50 dark:bg-white/25"
                    initial={{ width: 0 }}
                    whileInView={{ width: "min(12rem, 40%)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                {reduceMotion && (
                  <span className="absolute -bottom-1 left-0 block h-px w-[min(12rem,40%)] bg-zinc-400/50 dark:bg-white/25" />
                )}
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-display text-sm font-medium uppercase tracking-[0.2em] text-zinc-600 dark:text-white/75"
              >
                {person.role} <span className="text-zinc-400 dark:text-white/40">·</span> {person.tagline}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base leading-relaxed text-zinc-700 md:text-[1.05rem] md:leading-[1.65] dark:text-white/90"
              >
                {footerBio.body}
              </motion.p>

              <motion.div variants={fadeUp} className="pt-2">
                <AnalyticsCodeBlock />
              </motion.div>
            </motion.div>
          </div>

          <motion.nav
            aria-label="Social links"
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex shrink-0 flex-col gap-6 lg:items-end lg:pt-2"
          >
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
                    whileHover={reduceMotion ? undefined : { scale: 1.06, y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200/90 bg-white/70 text-zinc-700 shadow-sm shadow-zinc-900/5 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/[0.08] hover:text-violet-700 hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.35)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/85 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:border-violet-400/35 dark:hover:text-white dark:hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.45)]"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        <motion.p
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reduceMotion ? 0 : 0.35, duration: 0.5 }}
          className="mt-14 border-t border-zinc-200/80 pt-8 text-center text-xs text-zinc-500 md:text-left dark:border-white/[0.07] dark:text-white/35"
        >
          © {new Date().getFullYear()} {person.displayName}. Built with Next.js.
        </motion.p>
      </div>
    </footer>
  );
}
