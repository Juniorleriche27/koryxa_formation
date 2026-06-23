import type { Metadata } from "next";
import { KoryxaFormationPortal } from "@/components/marketing/KoryxaFormationPortal";

export const metadata: Metadata = {
  title: "KORYXA Formation — Formations pratiques en IA, Data et Automatisation",
  description:
    "Apprenez l'IA, la data analyse et l'automatisation avec des formations pratiques KORYXA orientées projets, portfolio, exercices et compétences concrètes.",
  keywords: [
    "formation IA",
    "formation data analyse",
    "formation Python",
    "formation Python Data Analyst",
    "formation automatisation IA",
    "formation intelligence artificielle",
    "formation pratique IA",
    "formation chatbot IA",
    "formation RAG",
    "formation IA appliquée",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KORYXA Formation — Formations pratiques en IA, Data et Automatisation",
    description:
      "Découvrez les formations KORYXA pour apprendre l'IA, la data analyse et l'automatisation à travers des projets concrets, des parcours guidés et des preuves de compétence visibles.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "KORYXA Formation — Formations pratiques en IA, Data et Automatisation",
    description:
      "Des parcours pratiques pour apprendre, construire et prouver vos compétences en IA, data et automatisation.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "KORYXA Formation",
  url: "https://formation.koryxa.fr",
  description: "Formations pratiques en IA, data analyse et automatisation orientées projets concrets.",
};

const catalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Catalogue des formations KORYXA",
  itemListElement: [
    {
      "@type": "Course",
      name: "Formation Analyse de données avec Python",
      description:
        "Formation pratique pour apprendre Python, Pandas, NumPy, la visualisation, l'analyse exploratoire et construire un projet portfolio.",
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
        text: "La formation Analyse de données avec Python est le parcours principal actuellement disponible. Elle couvre Python, Pandas, NumPy, la visualisation, l'analyse exploratoire et un projet final portfolio.",
      },
    },
    {
      "@type": "Question",
      name: "Les formations LLM/RAG, Assistant IA et Automatisation sont-elles déjà ouvertes ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Ces parcours sont en préparation ou en roadmap. Ils ne doivent pas être considérés comme ouverts à l'achat tant que leur offre, leur landing dédiée et leur tunnel d'accès ne sont pas validés.",
      },
    },
    {
      "@type": "Question",
      name: "Est-ce seulement une plateforme de vidéos ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. L'objectif de KORYXA Formation est de guider l'apprenant vers une pratique réelle, avec modules, exercices, ressources, projet final et preuve de compétence.",
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
