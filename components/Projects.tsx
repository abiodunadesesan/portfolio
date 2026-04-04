import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerProjectCards } from "@/components/StaggerProjectCards";
import { NanoChip } from "@/components/ui/NanoChip";
import { links, projects } from "@/lib/site-content";

export default function Projects() {
  return (
    <AnimatedSection
      id="work"
      className="relative z-20 scroll-mt-24 border-t border-zinc-200/60 bg-gradient-to-b from-zinc-50 via-neutral-50 to-stone-100/90 px-6 pt-14 pb-24 dark:border-white/10 dark:from-[#060608] dark:via-[#08080c] dark:to-[#0a0a10] md:scroll-mt-28 md:px-12 md:pt-20 md:pb-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <NanoChip>GitHub · Case studies</NanoChip>
            <h2
              id="projects-heading"
              className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
            >
              Selected projects
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-600 md:text-base dark:text-white/55">
              Public repos spanning TypeScript, JavaScript, PHP, and applied ML —
              dashboards, commerce, microservices, and NLP research.
            </p>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-violet-700 underline-offset-4 transition hover:text-zinc-900 hover:underline dark:text-violet-300/90 dark:hover:text-white"
            >
              View all on GitHub →
            </a>
          </div>
        </div>

        <StaggerProjectCards items={projects} />
      </div>
    </AnimatedSection>
  );
}
