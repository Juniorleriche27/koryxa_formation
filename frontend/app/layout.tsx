import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Bot } from "lucide-react";
import ApiWakeStatus from "@/components/layout/ApiWakeStatus";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_FORMATION_PUBLIC_URL || process.env.NEXT_PUBLIC_APP_URL || "https://formation.koryxa.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KORYXA Formation — Formations IA, data et métiers augmentés",
    template: "%s | KORYXA Formation",
  },
  description:
    "Portail officiel des formations KORYXA en intelligence artificielle, data analyse, automatisation IA et métiers augmentés.",
  applicationName: "KORYXA Formation",
  authors: [{ name: "KORYXA" }],
  creator: "KORYXA",
  publisher: "KORYXA",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KORYXA Formation — Formations IA, data et métiers augmentés",
    description:
      "Découvrez les formations KORYXA : IA appliquée, data analyse, automatisation et métiers augmentés.",
    url: "/",
    siteName: "KORYXA Formation",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "KORYXA Formation — Formations IA, data et métiers augmentés",
    description: "Portail officiel des formations KORYXA en IA, data et automatisation.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050914",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <a
          href="https://assistant-formation.koryxa.fr"
          target="_blank"
          rel="noreferrer"
          aria-label="Ouvrir l’assistant KORYXA Formation"
          className="fixed bottom-4 right-4 z-[70] inline-flex h-14 items-center justify-center gap-3 rounded-full border border-[#bcf5d7]/30 bg-[#06251c] px-4 text-white shadow-2xl shadow-[#06251c]/25 transition hover:-translate-y-1 hover:bg-[#00bd72] hover:text-[#06251c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bd72] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-16 sm:px-5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#bcf5d7] text-[#06251c] sm:h-10 sm:w-10">
            <Bot size={20} aria-hidden="true" />
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#bcf5d7]">Assistant</span>
            <span className="block text-sm font-black">Besoin d’aide ?</span>
          </span>
        </a>
        <ApiWakeStatus />
      </body>
    </html>
  );
}
