import dynamic from "next/dynamic";
import Experience from "@/components/Experience";
import PageTransition from "@/components/PageTransition";
import Projects from "@/components/Projects";
import SiteFooter from "@/components/SiteFooter";
import Skills from "@/components/Skills";

const ScrollyCanvas = dynamic(() => import("@/components/ScrollyCanvas"), {
  ssr: true,
  loading: () => (
    <section
      className="relative h-[500vh] w-full"
      aria-label="Loading scroll sequence"
    >
      <div className="sticky top-0 h-screen w-full bg-zinc-100 dark:bg-[#08080a]" />
    </section>
  ),
});

export default function Home() {
  return (
    <PageTransition>
      <ScrollyCanvas />
      <Projects />
      <Experience />
      <Skills />
      <SiteFooter />
    </PageTransition>
  );
}
