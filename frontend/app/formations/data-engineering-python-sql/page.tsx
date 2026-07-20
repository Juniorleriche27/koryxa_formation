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
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { courseRoutes } from "@/lib/courseConfig";

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
  "Fondations du Data Engineering",
  "Ingestion de données avec Python",
  "PostgreSQL et modélisation relationnelle",
  "Formats, APIs et stockage objet",
  "Pipelines ETL et ELT avec Python et SQL",
  "Qualité, tests et contrats de données",
  "Entrepôts de données et modélisation analytique",
  "Transformations avec dbt",
  "Orchestration avec Apache Airflow",
  "Docker et environnements reproductibles",
  "Observabilité, logs et fiabilité",
  "Industrialisation et restitution",
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
      <main className="min-h-screen bg-[#f5f8fb] text-[#0d2238]">
        <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-[#f5f8fb]/90 backdrop-blur-xl">
          <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/formations" className="flex items-center gap-3 font-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0d2238] text-cyan-300">DE</span>
              <span>
                <span className="block text-[10px] uppercase tracking-[.18em] text-cyan-700">KORYXA Formation</span>
                <span className="block text-sm">Data Engineering avec Python et SQL</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-7 text-sm font-bold lg:flex" aria-label="Navigation de la formation">
              <a href="#programme">Programme</a>
              <a href="#projet">Projet</a>
              <a href="#competences">Compétences</a>
            </nav>
            <Link href={courseRoutes.access("data-engineering-python-sql")} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0d2238] px-5 text-sm font-black text-white transition hover:bg-cyan-700">
              Accès apprenant
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden bg-[#08182a] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(34,211,238,.2),transparent_28rem),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[length:auto,48px_48px,48px_48px]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.75fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-cyan-200">
                <Sparkles size={14} /> Parcours professionnel disponible
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[.95] tracking-[-.055em] sm:text-6xl lg:text-7xl">
                Construisez des pipelines fiables, testés et observables.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Maîtrisez le cycle complet du Data Engineering : ingestion Python, PostgreSQL, ETL/ELT, dbt, Airflow, Docker, qualité et observabilité.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={courseRoutes.access("data-engineering-python-sql")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-6 py-4 text-sm font-black text-[#08182a] transition hover:-translate-y-0.5 hover:bg-white">
                  Accéder à la formation <ArrowRight size={17} />
                </Link>
                <a href="#programme" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[.06] px-6 py-4 text-sm font-black">
                  Voir le programme
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[{ icon: Clock3, label: "64 heures" }, { icon: Layers3, label: "12 modules" }, { icon: GraduationCap, label: "Certificat inclus" }].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4">
                    <Icon className="text-cyan-200" size={20} />
                    <span className="text-sm font-bold">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/[.07] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-7">
              <div className="rounded-[1.5rem] bg-[#f0fbff] p-6 text-[#0d2238]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black uppercase tracking-[.12em] text-cyan-900">Projet final</span>
                  <Network className="text-cyan-700" />
                </div>
                <h2 className="mt-6 text-3xl font-black tracking-[-.04em]">Plateforme analytique de ventes</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Ingestérez des fichiers et une API, chargez PostgreSQL, transformez avec dbt, orchestrez avec Airflow et livrez un datamart observable.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Ingestion idempotente", "PostgreSQL", "dbt + Airflow", "Docker + runbook"].map((item) => (
                    <p key={item} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-bold shadow-sm">
                      <CheckCircle2 size={16} className="text-cyan-700" /> {item}
                    </p>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="competences" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Compétences professionnelles</span>
              <h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl">De la source brute au datamart exploitable.</h2>
              <p className="mt-6 text-base leading-8 text-slate-600">
                Le parcours vous apprend à concevoir des systèmes data reproductibles, testables et maintenables, pas seulement à déplacer des fichiers.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Database, title: "Ingestérer", text: "Fichiers, APIs, Parquet, stockage raw et provenance." },
                { icon: GitBranch, title: "Transformer", text: "ETL/ELT, SQL, dbt, modèles analytiques et tests." },
                { icon: Workflow, title: "Orchestrer", text: "DAGs Airflow, retries, backfills et dépendances." },
                { icon: ShieldCheck, title: "Fiabiliser", text: "Qualité, observabilité, SLA, sécurité et runbooks." },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-[1.75rem] border border-slate-900/10 bg-white p-6 shadow-sm">
                  <Icon className="text-cyan-700" />
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="programme" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Programme complet</span>
              <h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl">12 modules pour maîtriser une stack data moderne.</h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {modules.map((title, index) => (
                <article key={title} className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-[#f7fbfd] p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0d2238] text-sm font-black text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Leçons guidées, exercice pratique, ressources et validation.</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projet" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.25rem] bg-[#0d2238] p-7 text-white sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-12">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-cyan-200"><Target size={15} /> Projet portfolio</span>
              <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">Livrez une plateforme analytique complète.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Vous construisez une chaîne data quotidienne, rejouable, documentée et prête à alimenter un dashboard métier.
              </p>
            </div>
            <div className="grid gap-3">
              {["Zone raw et staging traçables", "Chargement incrémental avec watermark", "Schéma en étoile PostgreSQL", "Projet dbt testé et documenté", "DAG Airflow avec retries et backfill", "Docker Compose, logs et runbook"].map((item) => (
                <p key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4 text-sm font-bold">
                  <CheckCircle2 className="text-cyan-300" size={18} /> {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cyan-200 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-950">Formation disponible</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.04em] sm:text-4xl">Commencez votre parcours Data Engineering.</h2>
            </div>
            <Link href={courseRoutes.access("data-engineering-python-sql")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0d2238] px-7 py-4 text-sm font-black text-white transition hover:bg-cyan-800">
              Accéder à la formation <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
