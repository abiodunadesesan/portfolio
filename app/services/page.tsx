import type { Metadata } from "next";
import ServicesPageLayout from "@/components/ServicesPageLayout";
import { person } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services",
  description: `Services — full-stack builds, AI/ML prototypes, and UI engineering. ${person.displayName}.`,
};

export default function ServicesPage() {
  return <ServicesPageLayout />;
}
