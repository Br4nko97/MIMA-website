import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter_Tight, Instrument_Serif } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import { LenisProvider } from "@/components/effects/lenis-provider";
import { CustomCursor } from "@/components/effects/cursor";
import { AmbientLights } from "@/components/effects/ambient-lights";
import { Grain } from "@/components/effects/grain";
import { AudioAmbient } from "@/components/effects/audio-ambient";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

const fontSans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
const fontDisplay = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});
const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
const fontSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "MIMA · Archivio del Collettivo",
    template: "%s · MIMA",
  },
  description:
    "Archivio del collettivo MIMA. Documenti, apparizioni, mitologia. Mantova, est. 2007.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  openGraph: {
    title: "MIMA · Archivio del Collettivo",
    description:
      "Sette soggetti. Una sola frequenza. Documentati per posterità.",
    type: "website",
    locale: "it_IT",
  },
  twitter: { card: "summary_large_image", title: "MIMA" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} ${fontSerif.variable} dark`}
      suppressHydrationWarning
    >
      <body className="grain-overlay antialiased">
        <AmbientLights />
        <Grain />
        <ScrollProgress />
        <CustomCursor />
        <AudioAmbient />
        <Providers>
          <LenisProvider>
            <Nav />
            <main id="main" className="relative">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
