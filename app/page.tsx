import Experience from "@/components/Experience";
import PageTransition from "@/components/PageTransition";
import Projects from "@/components/Projects";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import SiteFooter from "@/components/SiteFooter";
import Skills from "@/components/Skills";

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
