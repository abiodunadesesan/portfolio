import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerTimeline } from "@/components/StaggerTimeline";
import { NanoChip } from "@/components/ui/NanoChip";
import { experience, links } from "@/lib/site-content";

export default function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="relative z-20 scroll-mt-24 border-t border-white/10 bg-[#0a0a10] px-6 py-24 md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-6xl">
        <NanoChip>Experience & timeline</NanoChip>
        <h2
          id="experience-heading"
          className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl"
        >
          How I work
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          Snapshot aligned with your public work and direction — tighten dates
          and employer names from your CV (
          <a
            href={links.linkedin}
            className="text-violet-300/90 underline underline-offset-2 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          ) anytime.
        </p>

        <StaggerTimeline items={experience} />
      </div>
    </AnimatedSection>
  );
}
