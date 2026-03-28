import type { Metadata } from "next";
import { DM_Sans, Great_Vibes, Syne } from "next/font/google";
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
  title: "Abiodun Caleb Adesesan — Software Engineer · AI/ML",
  description:
    "Portfolio of Abiodun Caleb Adesesan — full-stack web, dashboards, microservices, and applied ML. GitHub: abiodunadesesan.",
};

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
        {children}
      </body>
    </html>
  );
}
