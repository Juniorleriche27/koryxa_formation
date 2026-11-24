import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { MessageCircle } from "lucide-react";
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
  themeColor: "#faf9f5",
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <>
      {children}
      <a
        href="https://assistant-formation.koryxa.fr"
        target="_blank"
        rel="noreferrer"
        aria-label="Besoin d’aide ?"
        title="Besoin d'aide ?"
        className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-[#00a86b] text-white shadow-xl shadow-emerald-900/25 transition-all duration-200 hover:-translate-y-1 hover:bg-[#008b58] hover:shadow-2xl hover:shadow-emerald-900/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a86b] focus-visible:ring-offset-2"
      >
        <MessageCircle size={26} aria-hidden="true" />
      </a>
      <ApiWakeStatus />
    </>
  );

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {clerkKey ? (
          <ClerkProvider
            publishableKey={clerkKey}
            signInUrl="https://accounts.koryxa.fr/sign-in"
            signUpUrl="https://accounts.koryxa.fr/sign-up"
          >
            {content}
          </ClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}
