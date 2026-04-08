"use client";

import { useMemo, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { links } from "@/lib/site-content";
import { Calendar, Mail, Send } from "lucide-react";

type ContactState = {
  name: string;
  email: string;
  message: string;
};

function buildMailto({ name, email, message }: ContactState) {
  const subject = `Project inquiry from ${name || "Website visitor"}`;
  const body = [
    "Hi Caleb,",
    "",
    message || "(No message provided)",
    "",
    "—",
    `Name: ${name || "-"}`,
    `Email: ${email || "-"}`,
  ].join("\n");
  return `${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactSection() {
  const [state, setState] = useState<ContactState>({ name: "", email: "", message: "" });
  const [didCopy, setDidCopy] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const mailtoHref = useMemo(() => buildMailto(state), [state]);

  return (
    <AnimatedSection
      id="contact-form"
      className="relative z-20 -mt-6 scroll-mt-24 rounded-t-[2.5rem] border-t border-zinc-200/60 bg-gradient-to-b from-zinc-100 via-neutral-50 to-stone-100/90 px-6 py-24 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.35)] dark:border-white/10 dark:from-[#111113] dark:via-[#0a0a0c] dark:to-[#060608] dark:shadow-none md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <NanoChip>Contact</NanoChip>
            <h2
              id="contact-heading"
              className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
            >
              Let’s build something together
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
              Send a message or book a call. I usually respond within 24–48 hours.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={links.bookCall}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm shadow-zinc-900/5 backdrop-blur-sm transition hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/20"
            >
              <Calendar className="h-4 w-4 opacity-80" aria-hidden />
              Book a call
            </a>
            <a
              href={links.email}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-violet-500/25 bg-violet-50/70 px-5 py-2.5 text-sm font-semibold text-violet-800 shadow-sm shadow-violet-900/10 transition hover:border-violet-500/45 hover:bg-violet-100/70 dark:border-violet-400/20 dark:bg-violet-500/[0.10] dark:text-violet-100 dark:hover:border-violet-400/35 dark:hover:bg-violet-500/[0.16]"
            >
              <Mail className="h-4 w-4 opacity-80" aria-hidden />
              Email
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <GlassCard spotlight className="h-full">
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus("sending");
                setError(null);
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                      name: state.name,
                      email: state.email,
                      message: state.message,
                    }),
                  });
                  const data = (await res.json()) as {
                    ok?: boolean;
                    error?: string;
                    warned?: boolean;
                    warning?: string;
                  };
                  if (!res.ok || !data.ok) {
                    setStatus("error");
                    setError(data.error || "Failed to send. Please try again.");
                    return;
                  }
                  setStatus("sent");
                  if (data.warned && data.warning) {
                    setError(data.warning);
                  }
                  setState({ name: "", email: "", message: "" });
                } catch {
                  setStatus("error");
                  setError("Failed to send. Please try again.");
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-white/45">
                    Name
                  </span>
                  <input
                    value={state.name}
                    onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                    className="h-12 w-full rounded-2xl border border-zinc-200/80 bg-white/70 px-4 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-white/45">
                    Email
                  </span>
                  <input
                    value={state.email}
                    onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                    className="h-12 w-full rounded-2xl border border-zinc-200/80 bg-white/70 px-4 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </label>
              </div>

              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-white/45">
                  Message
                </span>
                <textarea
                  value={state.message}
                  onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
                  className="min-h-36 w-full resize-y rounded-2xl border border-zinc-200/80 bg-white/70 px-4 py-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35"
                  placeholder="What are you building? What does success look like?"
                />
              </label>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-violet-600 px-6 text-sm font-semibold text-white transition hover:bg-violet-500 hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-violet-500 dark:hover:bg-violet-400"
                >
                  <Send className="h-4 w-4" aria-hidden />
                  {status === "sending" ? "Sending…" : "Send"}
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `Name: ${state.name}\nEmail: ${state.email}\n\n${state.message}`
                      );
                      setDidCopy(true);
                      window.setTimeout(() => setDidCopy(false), 1500);
                    } catch {
                      // ignore
                    }
                  }}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 px-6 text-sm font-semibold text-zinc-900 shadow-sm shadow-zinc-900/5 backdrop-blur-sm transition hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/20"
                >
                  {didCopy ? "Copied" : "Copy message"}
                </button>
              </div>

              {status === "sent" ? (
                <div className="pt-2">
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
                    Message saved. I’ll get back to you soon.
                  </p>
                  {error ? (
                    <p className="mt-1 text-xs text-amber-600 dark:text-amber-300">{error}</p>
                  ) : null}
                </div>
              ) : null}
              {status === "error" && error ? (
                <div className="pt-2">
                  <p className="text-sm font-medium text-rose-600 dark:text-rose-300">{error}</p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-white/45">
                    If this keeps failing, use{" "}
                    <a className="underline underline-offset-4" href={mailtoHref}>
                      email
                    </a>
                    .
                  </p>
                </div>
              ) : null}
            </form>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard spotlight>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                Prefer direct email?
              </p>
              <p className="font-display mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {links.email.replace("mailto:", "")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-white/55">
                Share a short overview, timeline, and links (if any). I’ll reply with next steps and a simple plan.
              </p>
              <a
                className="mt-4 inline-flex text-sm font-semibold text-violet-700 underline underline-offset-4 transition hover:text-zinc-900 dark:text-violet-200 dark:hover:text-white"
                href={mailtoHref}
              >
                Open email draft →
              </a>
            </GlassCard>

            <GlassCard spotlight>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
                Availability
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-white/55">
                Open to engineering roles, freelance projects, and collaborations.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

