import type { Metadata } from "next";
import { DM_Sans, Great_Vibes, Syne } from "next/font/google";
import Script from "next/script";
import PortfolioHeader from "@/components/PortfolioHeader";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const signature = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Abiodun Caleb Adesesan — Software Engineer · AI/ML",
    template: "%s · Abiodun Caleb Adesesan",
  },
  description:
    "Senior software engineer portfolio: full-stack TypeScript & Next.js, ML/NLP (PEFT, Hugging Face), distributed systems, and production web apps. Open-source work on GitHub.",
  keywords: [
    "software engineer",
    "full-stack",
    "TypeScript",
    "Next.js",
    "machine learning",
    "AI/ML",
    "portfolio",
  ],
  openGraph: {
    title: "Abiodun Caleb Adesesan — Software Engineer · AI/ML",
    description:
      "Full-stack engineering, applied ML, and systems design — projects, experience, and stack.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abiodun Caleb Adesesan — Software Engineer · AI/ML",
    description:
      "Full-stack engineering, applied ML, and systems design.",
  },
};

/** Noupe AI chatbot — override with NEXT_PUBLIC_NOUPE_SCRIPT_URL if you rotate the embed */
const NOUPE_EMBED_DEFAULT =
  "https://www.noupe.com/embed/019d368ca7d778bc9cf666d65f517e14b7bf.js";

const noupeScriptSrc =
  process.env.NEXT_PUBLIC_NOUPE_SCRIPT_URL ?? NOUPE_EMBED_DEFAULT;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} ${signature.variable} font-sans antialiased`}
      >
        <PortfolioHeader />
        {children}
        <Script id="noupe-ai" src={noupeScriptSrc} strategy="lazyOnload" />
      </body>
    </html>
  );
}
