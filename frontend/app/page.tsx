import type { Metadata } from "next";
import { KoryxaFormationPortal } from "@/components/marketing/KoryxaFormationPortal";

export const metadata: Metadata = {
  title: "KORYXA Formation — Formations pratiques en Data, IA et Automatisation",
  description:
    "Découvrez les parcours KORYXA Formation pour apprendre la data, l'IA et l'automatisation par des projets concrets. Chaque formation possède sa page dédiée.",
  keywords: [
    "KORYXA Formation",
    "formation IA",
    "formation data analyse",
    "formation Python",
    "formation automatisation IA",
    "formation chatbot IA",
    "formation IA appliquée",
    "formation pratique",
    "parcours data IA automatisation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KORYXA Formation — Portail des formations pratiques",
    description:
      "Un portail général pour choisir une formation en data, IA ou automatisation, puis accéder à la page dédiée de chaque parcours.",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/assets/landing/hero/koryxa-learning-hero.jpg",
        width: 1200,
        height: 630,
        alt: "KORYXA Formation — portail des parcours pratiques",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KORYXA Formation — Portail des formations pratiques",
    description: "Choisissez un parcours en data, IA ou automatisation et accédez à sa page dédiée.",
    images: ["/assets/landing/hero/koryxa-learning-hero.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "KORYXA Formation",
  url: "https://formation.koryxa.fr",
  description: "Portail de formations pratiques en data, IA et automatisation.",
};

const catalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Formations KORYXA",
  itemListElement: [
    ["Python Data Analyst", "Apprendre Python, organiser des données, créer des analyses et construire un projet portfolio."],
    ["Excel Data Analyst", "Nettoyer, analyser et automatiser des données avec Excel, Power Query et Power Pivot."],
    ["LLM RAG Developer", "Construire des assistants IA documentaires avec recherche vectorielle et réponses sourcées."],
    ["Power BI Data Analyst", "Préparer, modéliser et visualiser les données avec Power Query, DAX et Power BI Service."],
    ["SQL Data Analyst avec PostgreSQL", "Interroger, relier et analyser les données avec SQL, PostgreSQL, CTE et fonctions de fenêtre."],
  ].map(([name, description]) => ({
    "@type": "Course",
    name,
    description,
    provider: { "@type": "EducationalOrganization", name: "KORYXA Formation" },
    courseMode: "online",
    inLanguage: "fr-FR",
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Cette page concerne-t-elle une seule formation ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Cette page est le portail général KORYXA Formation. Elle présente l'ensemble des parcours, puis chaque formation possède sa page dédiée.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle formation est disponible aujourd'hui ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les parcours Python Data Analyst, Excel Data Analyst, LLM RAG Developer, Power BI Data Analyst et SQL Data Analyst avec PostgreSQL sont actuellement disponibles.",
      },
    },
    {
      "@type": "Question",
      name: "Où voir le détail d'une formation ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depuis la section Formations, chaque parcours renvoie vers sa page dédiée lorsque celle-ci est disponible. La page générale sert d'entrée principale.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <KoryxaFormationPortal />
    </>
  );
}
