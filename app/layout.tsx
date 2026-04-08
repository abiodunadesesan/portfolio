import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Great_Vibes, Instrument_Serif, Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import PortfolioHeader from "@/components/PortfolioHeader";
import VerticalScrollIndicator from "@/components/VerticalScrollIndicator";
import { CustomCursor } from "@/components/CustomCursor";
import { MotionProvider } from "@/components/MotionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getHeroPreloadFrameUrls } from "@/lib/sequence";
import "./globals.css";

// Clean, premium geometric display (Vecteezy-style vibe).
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
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

const navSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nav-serif",
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
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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
        className={`${display.variable} ${manrope.variable} ${footerSignature.variable} ${navSerif.variable} liquid-glass-body font-sans antialiased`}
      >
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[#f5f4f1] transition-colors duration-700 dark:bg-[#050505]"
          aria-hidden="true"
        >
          {/* Liquid mesh — lighter in dark mode for a sharper, editorial backdrop */}
          <div className="absolute inset-0 opacity-[0.38] dark:opacity-[0.07]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_100%_at_0%_-15%,rgba(139,92,246,0.22),transparent_58%)] dark:bg-[radial-gradient(ellipse_130%_100%_at_0%_-15%,rgba(139,92,246,0.09),transparent_62%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_90%_at_100%_-5%,rgba(56,189,248,0.18),transparent_52%)] dark:bg-[radial-gradient(ellipse_100%_90%_at_100%_-5%,rgba(56,189,248,0.06),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_115%,rgba(236,72,153,0.14),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_70%_at_50%_115%,rgba(236,72,153,0.05),transparent_58%)]" />
          </div>
          <div className="absolute inset-0 bg-black/[0.03] dark:bg-black/[0.62]" />
        </div>




        <a
          href="#main-content"
          className="sr-only absolute pointer-events-none opacity-0"
        >
          Skip to main content
        </a>

        <CustomCursor />
        <ThemeProvider>
          {/* Isolate stacking so the sticky nav paints above the hero canvas; hero stays full-bleed under the pill. */}
          <div className="relative isolate min-h-0">
            <PortfolioHeader />
            <MotionProvider>{children}</MotionProvider>
          </div>
        </ThemeProvider>
        <VerticalScrollIndicator />
        <Analytics />
        <SpeedInsights />
        <Script id="noupe-ai" src={noupeScriptSrc} strategy="lazyOnload" />
      </body>
    </html>
  );
}
