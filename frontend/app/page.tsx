import type { Metadata } from "next";
import { KoryxaFormationPortal } from "@/components/marketing/KoryxaFormationPortal";

export const metadata: Metadata = {
  title: "KORYXA Formation — Apprendre la data et l'IA par des projets concrets",
  description:
    "Apprenez Python, la data et l'IA appliquée avec KORYXA Formation. Des parcours pratiques, des exercices guidés et un projet visible à construire.",
  keywords: [
    "formation Python",
    "formation data analyse",
    "formation IA",
    "formation pratique IA",
    "formation Python Data Analyst",
    "apprendre Python",
    "projet portfolio data",
    "formation automatisation IA",
    "chatbot IA documents",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KORYXA Formation — Apprendre en construisant des projets concrets",
    description:
      "Des formations pratiques pour apprendre Python, la data et l'IA appliquée avec des exercices, des projets et une preuve visible de compétence.",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/assets/landing/hero/koryxa-learning-hero.jpg",
        width: 1200,
        height: 630,
        alt: "KORYXA Formation — apprendre en construisant des projets concrets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KORYXA Formation — Apprendre en construisant",
    description: "Apprenez Python, la data et l'IA appliquée avec des projets concrets.",
    images: ["/assets/landing/hero/koryxa-learning-hero.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "KORYXA Formation",
  url: "https://formation.koryxa.fr",
  description: "Formations pratiques en data, IA et automatisation pour apprendre en construisant des projets concrets.",
};

const catalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Formations KORYXA",
  itemListElement: [
    {
      "@type": "Course",
      name: "Analyse de données avec Python",
      description:
        "Formation pratique pour apprendre Python, organiser des données, créer des graphiques et construire un projet portfolio.",
      provider: {
        "@type": "EducationalOrganization",
        name: "KORYXA Formation",
      },
      courseMode: "online",
      inLanguage: "fr-FR",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle formation est disponible aujourd'hui ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La formation Analyse de données avec Python est disponible. Elle aide à apprendre Python, organiser des données, créer des graphiques et construire un projet portfolio.",
      },
    },
    {
      "@type": "Question",
      name: "Ai-je besoin d'être développeur ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Le parcours est progressif et s'adresse aux personnes motivées qui veulent apprendre avec des exemples concrets.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce que je vais construire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous construisez un projet d'analyse de données avec notebooks, graphiques, interprétation et résultat présentable.",
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
