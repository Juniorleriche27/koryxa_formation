import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ApiWakeStatus from "@/components/layout/ApiWakeStatus";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "KORYXA Formation — Analyse de Données avec Python",
  description: "Apprends l'analyse de données avec Python, de zéro à professionnel, dans une plateforme claire et guidée.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans">
        {children}
        <ApiWakeStatus />
      </body>
    </html>
  );
}
