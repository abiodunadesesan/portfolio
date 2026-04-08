import type { Metadata } from "next";
import ContactPageLayout from "@/components/ContactPageLayout";
import { person } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${person.displayName} — project inquiries, collaborations, and booking a call via Calendly.`,
};

export default function ContactPage() {
  return <ContactPageLayout />;
}
