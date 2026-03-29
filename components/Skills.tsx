import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerSkillCards } from "@/components/StaggerSkillCards";
import { NanoChip } from "@/components/ui/NanoChip";
import { links, skillGroups } from "@/lib/site-content";

export default function Skills() {
  return (
    <AnimatedSection
      id="skills"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-gradient-to-b from-stone-50 to-zinc-100/90 px-6 py-24 dark:border-white/10 dark:from-[#0a0a10] dark:to-[#060608] md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <NanoChip>Skills & tools</NanoChip>
        <h2
          id="skills-heading"
          className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
        >
          Stack & craft
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
          Grounded in your GitHub footprint and this portfolio&apos;s stack —
          extend with certifications and tools from{" "}
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-700 underline underline-offset-2 hover:text-zinc-900 dark:text-violet-300/90 dark:hover:text-white"
          >
            LinkedIn
          </a>
          .
        </p>

        <StaggerSkillCards groups={skillGroups} />
      </div>
    </AnimatedSection>
  );
}
