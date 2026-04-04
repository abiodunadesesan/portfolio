"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { NanoChip } from "@/components/ui/NanoChip";
import { links } from "@/lib/site-content";
import { ExternalLink } from "lucide-react";


const topSkills = [
  "React.js",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "UI/UX Design",
  "Next.js",
  "Firebase",
  "SQL",
  "Python",
  "REST APIs",
  "Git / GitHub",
  "HTML & CSS",
];

export default function About() {
  return (
    <AnimatedSection
      id="about"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-white px-6 py-24 dark:border-white/10 dark:bg-[#0a0a10] md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-4xl">
        <NanoChip>About Me</NanoChip>
        <h2
          id="about-heading"
          className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
        >
          Who I Am
        </h2>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-zinc-700 md:text-lg dark:text-white/80">
          <p>
            I am a Software Engineer specializing in full-stack development,
            with a strong focus on creating intuitive and engaging user
            experiences. My expertise spans React, Node.js, JavaScript, UI/UX
            design, and platforms like Firebase and HubSpot. With a solid
            foundation in HTML, CSS, and Git, I develop innovative and efficient
            solutions that enhance user engagement and satisfaction.
          </p>
          <p>
            As a full-stack developer, I excel in bridging the gap between
            front-end interfaces and back-end functionality, ensuring seamless
            integration and optimal performance. I collaborate closely with
            product managers, UX designers, and backend developers to deliver
            user-centered, scalable applications. My experience in designing and
            implementing user interfaces enables me to create visually appealing
            and functional designs tailored to modern user needs.
          </p>
          <p>
            I am committed to continuous learning and staying up-to-date with
            the latest technologies and trends in software development. Combining
            my technical expertise, creative vision, and passion for user
            experience, I am driven to contribute meaningfully to impactful and
            innovative projects.
          </p>
        </div>

        {/* Skills marquee */}
        <div className="mt-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-white/40">
            Top Skills
          </p>
          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0a0a10]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0a0a10]" />
            <div className="skills-marquee mb-2">
              {[...topSkills, ...topSkills].map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-sm font-medium text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0a0a10]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0a0a10]" />
            <div className="skills-marquee-r">
              {[...topSkills.slice(4), ...topSkills.slice(0, 4), ...topSkills.slice(4), ...topSkills.slice(0, 4)].map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border border-violet-200/70 bg-violet-50/60 px-3.5 py-1 text-sm font-medium text-violet-700 dark:border-violet-400/15 dark:bg-violet-500/[0.07] dark:text-violet-300/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-violet-700 transition hover:border-violet-500/60 hover:bg-violet-100 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/20"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn Profile
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-200 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80 dark:hover:bg-white/[0.08]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub — 10 repos
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
