import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ApiWakeStatus from "@/components/layout/ApiWakeStatus";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050914",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <ApiWakeStatus />
      </body>
    </html>
  );
}
