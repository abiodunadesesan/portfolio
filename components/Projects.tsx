import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerProjectCards } from "@/components/StaggerProjectCards";
import { NanoChip } from "@/components/ui/NanoChip";
import { links, projects } from "@/lib/site-content";

export default function Projects() {
  return (
    <AnimatedSection
      id="work"
      className="relative z-20 scroll-mt-24 border-t border-white/10 bg-gradient-to-b from-[#060608] via-[#08080c] to-[#0a0a10] px-6 py-24 md:scroll-mt-28 md:px-12 md:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <NanoChip>GitHub · Case studies</NanoChip>
            <h2
              id="projects-heading"
              className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl"
            >
              Selected projects
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/55 md:text-base">
              Public repos spanning TypeScript, JavaScript, PHP, and applied ML —
              dashboards, commerce, microservices, and NLP research.
            </p>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-violet-300/90 underline-offset-4 transition hover:text-white hover:underline"
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
