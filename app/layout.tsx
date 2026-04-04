import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans, Great_Vibes, Syne } from "next/font/google";
import Script from "next/script";
import PortfolioHeader from "@/components/PortfolioHeader";
import { CustomCursor } from "@/components/CustomCursor";
import { MotionProvider } from "@/components/MotionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getHeroPreloadFrameUrls } from "@/lib/sequence";
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

/** Connecting script for hero + footer name (Great Vibes). Parisienne is a similar Google Fonts option with more bounce. */
const footerSignature = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-footer-signature",
  display: "swap",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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

const heroPreloadUrls = getHeroPreloadFrameUrls();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        {heroPreloadUrls.map((href) => (
          <link key={href} rel="preload" href={href} as="image" fetchPriority="high" />
        ))}
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${footerSignature.variable} liquid-glass-body font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-24 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:bg-zinc-900 dark:focus:text-white"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <ThemeProvider>
          <PortfolioHeader />
          <MotionProvider>
            {children}
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <Script id="noupe-ai" src={noupeScriptSrc} strategy="lazyOnload" />
      </body>
    </html>
  );
}
