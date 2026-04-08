import dynamic from "next/dynamic";
import Experience from "@/components/Experience";
import PageTransition from "@/components/PageTransition";
import Projects from "@/components/Projects";
import SiteFooter from "@/components/SiteFooter";
import Skills from "@/components/Skills";
import About from "@/components/About";
import QuickActions from "@/components/QuickActions";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WritingSection from "@/components/WritingSection";
import ContactSection from "@/components/ContactSection";
import StatsSection from "@/components/StatsSection";
import RecentProjectsSection from "@/components/RecentProjectsSection";
import WhyChooseMeSection from "@/components/WhyChooseMeSection";
import FaqSection from "@/components/FaqSection";
import LetsConnectSection from "@/components/LetsConnectSection";

const ScrollyCanvas = dynamic(() => import("@/components/ScrollyCanvas"), {
  ssr: true,
  loading: () => (
    <section
      className="relative z-0 h-[300vh] w-full"
      aria-label="Loading hero scroll sequence"
    >
      <div className="sticky top-0 z-0 h-[100dvh] min-h-[100svh] w-full bg-zinc-100 dark:bg-[#121212]" />
    </section>
  ),
});

export default function Home() {
  return (
    <PageTransition>
      <ScrollyCanvas />
      <QuickActions />
      <About />
      <Projects />
      <ServicesSection />
      <ProcessSection />
      <RecentProjectsSection />
      <WhyChooseMeSection />
      <StatsSection />
      <TestimonialsSection />
      <Experience />
      <Skills />
      <WritingSection />
      <FaqSection />
      <LetsConnectSection />
      <ContactSection />
      <SiteFooter />
    </PageTransition>
  );
}
