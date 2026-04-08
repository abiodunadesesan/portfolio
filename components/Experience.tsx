import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerTimeline } from "@/components/StaggerTimeline";
import { NanoChip } from "@/components/ui/NanoChip";
import { experience, links } from "@/lib/site-content";

export default function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-white px-6 py-24 dark:border-white/10 dark:bg-[#0a0a10] md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-6xl">
        <NanoChip>Experience</NanoChip>
        <h2
          id="experience-heading"
          className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
        >
          Experience & achievements
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
          A quick timeline of what I’ve been building. Full details live on{" "}
          <a
            href={links.linkedin}
            className="text-violet-700 underline underline-offset-2 hover:text-zinc-900 dark:text-violet-300/90 dark:hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>

        <StaggerTimeline items={experience} />
      </div>
    </AnimatedSection>
  );
}
