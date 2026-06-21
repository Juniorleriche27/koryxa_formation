import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formation Python Data Analyst — Python, Pandas, EDA et portfolio",
  description:
    "Formation Python Data Analyst KORYXA : apprenez Python, Pandas, nettoyage de données, visualisation, analyse exploratoire, quiz, projet portfolio et certificat.",
  alternates: {
    canonical: "/formations/python-data-analyst",
  },
  openGraph: {
    title: "Formation Python Data Analyst — KORYXA Formation",
    description:
      "Une formation pratique pour apprendre Python, Pandas, l’analyse de données et construire un projet portfolio.",
    url: "/formations/python-data-analyst",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation Python Data Analyst — KORYXA Formation",
    description: "Python, Pandas, EDA, notebooks, quiz, projet portfolio et certificat.",
  },
};

export default function PythonDataAnalystLayout({ children }: { children: React.ReactNode }) {
  return children;
}
