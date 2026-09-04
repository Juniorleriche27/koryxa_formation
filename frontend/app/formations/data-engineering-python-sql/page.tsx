import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  GitBranch,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Network,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { courseRoutes } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

export const metadata: Metadata = {
  title: "Data Engineering avec Python et SQL — KORYXA Formation",
  description:
    "Apprenez à construire des pipelines de données fiables avec Python, SQL, PostgreSQL, dbt, Airflow et Docker.",
  alternates: { canonical: "/formations/data-engineering-python-sql" },
  openGraph: {
    title: "Data Engineering avec Python et SQL — KORYXA Formation",
    description:
      "Un parcours complet de 64 heures avec 12 modules, exercices pratiques et projet final de plateforme analytique.",
    type: "website",
    locale: "fr_FR",
  },
};

const modules = [
  "Fondations du Data Engineering & architectures modernes",
  "Ingestion de données avec Python (APIs, JSON, Parquet)",
  "PostgreSQL et modélisation relationnelle pour la data",
  "Formats de fichiers analytiques et stockage objet (S3/MinIO)",
  "Pipelines ETL et ELT robustes avec Python et SQL",
  "Qualité des données, tests automatisés et contrats",
  "Entrepôts de données (DWH) et modélisation dimensionnelle",
  "Transformations modulaires et documentées avec dbt",
  "Orchestration avancée avec Apache Airflow (DAGs, backfills)",
  "Conteneurisation et reproductibilité avec Docker & Compose",
  "Observabilité, alerting, métriques et gestion des pannes",
  "Industrialisation, rédaction de runbooks et déploiement",
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Data Engineering avec Python et SQL",
  description:
    "Parcours professionnel pour construire, tester, orchestrer et superviser des pipelines de données avec Python, SQL, PostgreSQL, dbt, Airflow et Docker.",
  provider: { "@type": "EducationalOrganization", name: "KORYXA Formation" },
  courseMode: "online",
  inLanguage: "fr-FR",
  timeRequired: "PT64H",
};

export default function DataEngineeringPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#dfe5d8]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white px-4 py-2 text-xs font-bold text-[#008b58] shadow-sm">
              <Sparkles size={14} className="text-[#00a86b]" /> Parcours Professionnel Data Engineering · Projet Certifiant
            </span>

            <h1 className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]">
              Construisez des pipelines fiables, testés et observables.
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center">
              Maîtrisez le cycle complet du Data Engineering moderne : ingestion Python, PostgreSQL, architectures ETL/ELT, dbt, Apache Airflow, conteneurs Docker et monitoring.
            </p>

            {/* Centered CTA row */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <PurchaseCourseLink
                courseSlug="data-engineering-python-sql"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
              >
                Commencer la formation <ArrowRight size={16} />
              </PurchaseCourseLink>
              <a
                href="#programme"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe5d8] bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-[#faf9f5]"
              >
                <PlayCircle size={16} /> Voir le programme
              </a>
            </div>

            {/* Centered reassurance checkmarks */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5"><LockKeyhole size={15} className="text-[#00a86b]" /> Accès immédiat et à vie</span>
              <span className="inline-flex items-center gap-1.5"><Star size={15} className="text-amber-500 fill-amber-500" /> 49 000 FCFA tarif unique</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#00a86b]" /> Certificat officiel inclus</span>
            </div>

            {/* Centered showcase card */}
            <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xl text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dfe5d8] pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008b58]">Projet final de fin de parcours</p>
                  <h2 className="mt-1 text-2xl font-serif font-bold text-slate-950">Plateforme analytique de ventes de bout en bout</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a86b]/10 px-3.5 py-1.5 text-xs font-bold text-[#008b58]">
                  Projet Portfolio
                </span>
              </div>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Ingérez des fichiers et une API externe, alimentez PostgreSQL, transformez et testez avec dbt, orchestrez les flux quotidiens avec Apache Airflow et conteneurisez l'ensemble sous Docker.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Ingestion Python idempotente",
                  "Schéma en étoile PostgreSQL",
                  "Transformations & tests dbt",
                  "DAGs Airflow & Docker Compose",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3.5">
                    <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-[#dfe5d8]">
                {[
                  [Clock3, "64 h", "Volume de pratique"],
                  [Layers3, "12", "Modules structurés"],
                  [GraduationCap, "Certificat", "Inclus à la fin"],
                ].map(([Icon, value, label]) => {
                  const ItemIcon = Icon as typeof Clock3;
                  return (
                    <div key={label as string} className="rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3 text-center">
                      <ItemIcon size={16} className="mx-auto text-[#00a86b]" />
                      <p className="mt-1.5 text-base sm:text-lg font-bold text-slate-950">{value as string}</p>
                      <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{label as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Compétences professionnelles */}
        <section id="competences" className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                <TrendingUp size={14} /> Savoir-faire clé
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                De la donnée brute au datamart exploitable.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Le parcours vous apprend à concevoir des systèmes data robustes, reproductibles, testables et faciles à maintenir en production.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Database, title: "Ingérer", text: "Fichiers, APIs REST, format Parquet, stockage raw et traçabilité de la provenance." },
                { icon: GitBranch, title: "Transformer", text: "Pipelines ETL/ELT avec SQL, dbt, modélisation dimensionnelle et tests de qualité." },
                { icon: Workflow, title: "Orchestrer", text: "Création de DAGs Apache Airflow, gestion des retries, backfills et alertes d’échec." },
                { icon: ShieldCheck, title: "Fiabiliser", text: "Contrats de données, observabilité, SLA de mise à jour, sécurité et runbooks de production." },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Programme complet */}
        <section id="programme" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
                <Layers3 size={14} /> Programme complet
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                12 modules pour maîtriser une stack data moderne.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Apprenez les outils standards de l'industrie : Python, SQL, PostgreSQL, dbt, Apache Airflow et Docker.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((title, index) => (
                <article
                  key={title}
                  className="group flex flex-col justify-between rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-sm transition hover:border-[#00a86b]/40 hover:shadow-md"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">
                      Module {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">Leçons techniques guidées, exercices pratiques de code, notebooks et quiz de validation.</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projet portfolio */}
        <section id="projet" className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                <Target size={14} /> Projet fil rouge
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                Livrez une plateforme analytique complète.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Vous construisez une chaîne de données quotidienne, rejouable, documentée et prête à alimenter un dashboard de décision métier.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                "Zone raw et staging traçables",
                "Chargement incrémental avec watermark",
                "Schéma en étoile PostgreSQL",
                "Projet dbt testé et documenté",
                "DAG Airflow avec retries et backfill",
                "Docker Compose, logs et runbook d’exploitation",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-5 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00a86b]" />
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="prix" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 border-t border-[#dfe5d8]">
          <div className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
              <GraduationCap size={14} /> Formation complète
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Rejoignez le parcours Data Engineering
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              12 modules complets, TP sur machines virtuelles, projet portfolio évalué et certificat officiel KORYXA.
            </p>

            <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-10 shadow-xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#008b58]">Accès complet au parcours</p>
              <div className="mt-4 flex items-baseline justify-center gap-3">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">49 000 FCFA</span>
                <span className="text-base sm:text-lg font-medium text-slate-400 line-through">69 000 FCFA</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-[#008b58]">Paiement unique · Accès à vie garanti</p>

              <div className="mt-6 space-y-3 text-left border-t border-[#dfe5d8] pt-6">
                {[
                  "12 modules progressifs de l'ingestion à l'orchestration",
                  "Stack moderne : Python, SQL, PostgreSQL, dbt, Airflow, Docker",
                  "Projet d'architecture de données noté sur 60 points",
                  "Certificat officiel d'achèvement KORYXA",
                  "Accès continu aux ressources et mises à jour",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <PurchaseCourseLink
                  courseSlug="data-engineering-python-sql"
                  className="w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
                >
                  Commencer la formation <ArrowRight size={16} />
                </PurchaseCourseLink>
              </div>
              <p className="mt-4 text-xs text-slate-500">Paiement sécurisé via Mobile Money ou Carte Bancaire</p>
            </div>
          </div>
        </section>

        <FooterSEO />
      </main>
    </>
  );
}
