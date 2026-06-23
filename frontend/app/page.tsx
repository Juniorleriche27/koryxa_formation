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
    {
      "@type": "Course",
      name: "Python Data Analyst",
      description: "Formation pratique pour apprendre Python, organiser des données, créer des graphiques et construire un projet portfolio.",
      provider: {
        "@type": "EducationalOrganization",
        name: "KORYXA Formation",
      },
      courseMode: "online",
      inLanguage: "fr-FR",
    },
    {
      "@type": "Course",
      name: "Chatbot IA avec documents",
      description: "Parcours à venir pour apprendre à relier des documents, une recherche intelligente et une interface chatbot.",
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
        text: "La formation Python Data Analyst est actuellement disponible. Les autres parcours sont présentés comme bientôt disponibles ou en préparation.",
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
