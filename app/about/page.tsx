import type { Metadata } from "next";
import AboutPageLayout from "@/components/AboutPageLayout";
import { person } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: `About ${person.displayName} — full-stack software engineer with an AI/ML focus. Projects, process, and how to work together.`,
};

export default function AboutPage() {
  return <AboutPageLayout />;
}
