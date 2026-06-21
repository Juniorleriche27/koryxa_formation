import type { Metadata } from "next";
import { KoryxaFormationPortal } from "@/components/marketing/KoryxaFormationPortal";

export const metadata: Metadata = {
  title: "KORYXA Formation — Formations IA, data et métiers augmentés",
  description:
    "Découvrez les formations KORYXA en intelligence artificielle, data analyse, automatisation IA et métiers augmentés. Chaque formation dispose de sa propre landing page.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KORYXA Formation — Formations IA, data et métiers augmentés",
    description:
      "Portail officiel des formations KORYXA : IA, data analyse, automatisation et développement IA appliqué.",
    type: "website",
    locale: "fr_FR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "KORYXA Formation",
  url: "https://formation.koryxa.fr",
  description: "Formations en intelligence artificielle, data analyse, automatisation IA et métiers augmentés.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Catalogue des formations KORYXA",
    itemListElement: [
      {
        "@type": "Course",
        name: "Python Data Analyst",
        description: "Formation Python Data Analyst avec notebooks, Pandas, analyse exploratoire, projet portfolio et certificat.",
        provider: {
          "@type": "EducationalOrganization",
          name: "KORYXA Formation",
        },
      },
      {
        "@type": "Course",
        name: "Assistant IA pour métier",
        description: "Formation en préparation pour utiliser l’intelligence artificielle dans les métiers et opérations.",
        provider: {
          "@type": "EducationalOrganization",
          name: "KORYXA Formation",
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <KoryxaFormationPortal />
    </>
  );
}
