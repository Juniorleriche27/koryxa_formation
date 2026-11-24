"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  BrainCircuit,
  Check,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Layers3,
  LineChart,
  LockKeyhole,
  Network,
  Package,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import KoryxaUserNav from "@/components/auth/KoryxaUserNav";

interface CourseItem {
  id: string;
  slug: string;
  title: string;
  category: "Fondamentaux" | "Analytics & Data" | "IA & Ingénierie";
  tagline: string;
  duration: string;
  modulesCount: number;
  price: string;
  oldPrice: string;
  badge?: string;
  icon: typeof BarChart3;
  iconColor: string;
  iconBg: string;
  detailUrl: string;
  checkoutUrl: string;
  highlights: string[];
}

const COURSES: CourseItem[] = [
  // 1. Fondamentaux (5 000 FCFA)
  {
    id: "excel",
    slug: "excel-data-analyst",
    title: "Excel Data Analyst",
    category: "Fondamentaux",
    tagline: "Tableaux croisés, formules avancées, Power Query & Dashboard commercial en 1 clic.",
    duration: "28h pratique",
    modulesCount: 12,
    price: "5 000 FCFA",
    oldPrice: "39 000 FCFA",
    badge: "Indispensable",
    icon: BarChart3,
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-50 border-emerald-200",
    detailUrl: "/formations/excel-data-analyst",
    checkoutUrl: "/checkout?course=excel-data-analyst",
    highlights: ["Power Query & DAX", "Dashboard commercial", "4 classeurs XLSX réels"],
  },
  {
    id: "sql",
    slug: "sql-data-analyst",
    title: "SQL Data Analyst (PostgreSQL)",
    category: "Fondamentaux",
    tagline: "Requêtes d'entreprise, jointures, CTE, fonctions de fenêtre et vues analytiques.",
    duration: "30h pratique",
    modulesCount: 12,
    price: "5 000 FCFA",
    oldPrice: "39 000 FCFA",
    badge: "Recommandé",
    icon: Database,
    iconColor: "text-blue-700",
    iconBg: "bg-blue-50 border-blue-200",
    detailUrl: "/formations/sql-data-analyst",
    checkoutUrl: "/checkout?course=sql-data-analyst",
    highlights: ["PostgreSQL & CTE", "Vues analytiques", "Base e-commerce réelle"],
  },

  // 2. Analytics & Data (8 000 FCFA)
  {
    id: "python",
    slug: "python-data-analyst",
    title: "Python Data Analyst",
    category: "Analytics & Data",
    tagline: "Manipulation de données avec Pandas & NumPy, nettoyage et analyses exploratoires.",
    duration: "25h pratique",
    modulesCount: 7,
    price: "8 000 FCFA",
    oldPrice: "25 000 FCFA",
    badge: "Populaire",
    icon: Code2,
    iconColor: "text-amber-700",
    iconBg: "bg-amber-50 border-amber-200",
    detailUrl: "/formations/python-data-analyst",
    checkoutUrl: "/checkout?course=python-data-analyst",
    highlights: ["Pandas & NumPy in-browser", "Visualisations claires", "Projet portfolio d'entreprise"],
  },
  {
    id: "power-bi",
    slug: "power-bi-data-analyst",
    title: "Power BI Data Analyst",
    category: "Analytics & Data",
    tagline: "Modélisation en étoile, DAX avancé, KPIs exécutifs et rapports interactifs.",
    duration: "32h pratique",
    modulesCount: 12,
    price: "8 000 FCFA",
    oldPrice: "35 000 FCFA",
    badge: "Top Recrutement",
    icon: BarChart3,
    iconColor: "text-amber-700",
    iconBg: "bg-amber-50 border-amber-200",
    detailUrl: "/formations/power-bi-data-analyst",
    checkoutUrl: "/checkout?course=power-bi-data-analyst",
    highlights: ["Modèle en étoile & DAX", "Tableau de bord financier", "Sécurité RLS intégrée"],
  },
  {
    id: "stats",
    slug: "statistics-data-science-python",
    title: "Statistiques & Data Science",
    category: "Analytics & Data",
    tagline: "Inférence statistique, segmentation RFM, tests d'hypothèses et séries temporelles.",
    duration: "35h pratique",
    modulesCount: 12,
    price: "8 000 FCFA",
    oldPrice: "35 000 FCFA",
    icon: LineChart,
    iconColor: "text-indigo-700",
    iconBg: "bg-indigo-50 border-indigo-200",
    detailUrl: "/formations/statistics-data-science-python",
    checkoutUrl: "/checkout?course=statistics-data-science-python",
    highlights: ["2 500 clients RFM réels", "730 jours prévision ventes", "Scipy & Statsmodels"],
  },

  // 3. IA & Ingénierie (12 000 FCFA)
  {
    id: "ml",
    slug: "machine-learning-python",
    title: "Machine Learning avec Python",
    category: "IA & Ingénierie",
    tagline: "Algorithmes prédictifs avec scikit-learn, optimisation, SHAP et cas réel de churn.",
    duration: "36h pratique",
    modulesCount: 12,
    price: "12 000 FCFA",
    oldPrice: "45 000 FCFA",
    badge: "Scikit-Learn",
    icon: BrainCircuit,
    iconColor: "text-purple-700",
    iconBg: "bg-purple-50 border-purple-200",
    detailUrl: "/formations/machine-learning-python",
    checkoutUrl: "/checkout?course=machine-learning-python",
    highlights: ["Scikit-learn & SHAP", "Modèle prédiction churn", "24 notebooks téléchargeables"],
  },
  {
    id: "data-eng",
    slug: "data-engineering-python-sql",
    title: "Data Engineering (Python & SQL)",
    category: "IA & Ingénierie",
    tagline: "Pipelines de données robustes, PostgreSQL, dbt Core, Airflow, Docker et qualité.",
    duration: "40h pratique",
    modulesCount: 12,
    price: "12 000 FCFA",
    oldPrice: "45 000 FCFA",
    badge: "Big Data & Pipelines",
    icon: Cpu,
    iconColor: "text-teal-700",
    iconBg: "bg-teal-50 border-teal-200",
    detailUrl: "/formations/data-engineering-python-sql",
    checkoutUrl: "/checkout?course=data-engineering-python-sql",
    highlights: ["PostgreSQL & dbt", "Orchestration Airflow", "Docker Compose complet"],
  },
  {
    id: "llm-rag",
    slug: "llm-rag",
    title: "LLM RAG Developer",
    category: "IA & Ingénierie",
    tagline: "Assistants de recherche sur documents privés avec Qdrant, embeddings, Streamlit et RAGAS.",
    duration: "35h pratique",
    modulesCount: 12,
    price: "12 000 FCFA",
    oldPrice: "45 000 FCFA",
    badge: "RAG & Agents",
    icon: Network,
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-50 border-emerald-200",
    detailUrl: "/formations/llm-rag",
    checkoutUrl: "/checkout?course=llm-rag",
    highlights: ["Qdrant Vector DB", "Corpus entreprise réaliste", "App Streamlit déployable"],
  },
];

interface CareerPack {
  slug: string;
  title: string;
  eyebrow: string;
  badge: string;
  description: string;
  courses: string[];
  price: string;
  oldPrice: string;
  saving: string;
  featured: boolean;
  checkoutUrl: string;
  whatsappUrl: string;
}

const PACKS: CareerPack[] = [
  {
    slug: "full-stack-data-analyst",
    title: "Pack Full-Stack Data Analyst",
    eyebrow: "Essentiel Entreprise",
    badge: "3 Formations Clés",
    description: "La chaîne d'analyse complète : tableur avancé Excel, requêtes SQL PostgreSQL et reporting exécutif Power BI.",
    courses: [
      "Excel Data Analyst (Power Query & TCD)",
      "SQL Data Analyst (PostgreSQL & CTE)",
      "Power BI Data Analyst (DAX & Star Schema)",
    ],
    price: "15 000 FCFA",
    oldPrice: "25 000 FCFA",
    saving: "Économie de 10 000 FCFA (-40%)",
    featured: false,
    checkoutUrl: "/checkout?pack=full-stack-data-analyst",
    whatsappUrl: "https://wa.me/22892092572?text=Bonjour%20KORYXA,%20je%20souhaite%20commander%20le%20Pack%20Full-Stack%20Data%20Analyst%20(15%20000%20FCFA).",
  },
  {
    slug: "data-scientist-ai-engineer",
    title: "Pack Data Scientist & IA",
    eyebrow: "Le Plus Populaire",
    badge: "4 Formations Spécialisées",
    description: "Le cursus complet pour concevoir des modèles prédictifs, maîtriser les statistiques et déployer des agents IA documentaires.",
    courses: [
      "Python Data Analyst (Pandas & EDA)",
      "Statistiques & Data Science (RFM & Prévision)",
      "Machine Learning avec Python (Scikit-Learn)",
      "LLM RAG Developer (Qdrant & Embeddings)",
    ],
    price: "25 000 FCFA",
    oldPrice: "40 000 FCFA",
    saving: "Économie de 15 000 FCFA (-38%)",
    featured: true,
    checkoutUrl: "/checkout?pack=data-scientist-ai-engineer",
    whatsappUrl: "https://wa.me/22892092572?text=Bonjour%20KORYXA,%20je%20souhaite%20commander%20le%20Pack%20Data%20Scientist%20%26%20AI%20Engineer%20(25%20000%20FCFA).",
  },
  {
    slug: "data-ultimate-all-access",
    title: "Pack Ultime All-Access",
    eyebrow: "Tout le Catalogue",
    badge: "Les 8 Formations Incluses",
    description: "Accès total et illimité aux 8 parcours de formation, tous les classeurs réels, projets portfolios et certifications officielles.",
    courses: [
      "Les 8 parcours complets (Excel, SQL, Python, Power BI, Stats, ML, RAG, Data Eng)",
      "Tous les projets portfolios avec corrigés détaillés",
      "Certifications officielles vérifiables par QR code",
    ],
    price: "35 000 FCFA",
    oldPrice: "70 000 FCFA",
    saving: "Économie massive de 35 000 FCFA (-50%)",
    featured: false,
    checkoutUrl: "/checkout?pack=data-ultimate-all-access",
    whatsappUrl: "https://wa.me/22892092572?text=Bonjour%20KORYXA,%20je%20souhaite%20commander%20le%20Pack%20Data%20Ultimate%20All-Access%20(35%20000%20FCFA).",
  },
];

export default function MinimalStorefront() {
  const [activeTab, setActiveTab] = useState<"courses" | "packs">("courses");

  return (
    <div className="min-h-screen bg-[#faf9f5] text-slate-950 flex flex-col justify-between antialiased selection:bg-[#00a86b]/20 selection:text-slate-950">
      {/* 1. Header Ultra-Compact */}
      <header className="sticky top-0 z-40 border-b border-[#dfe5d8] bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="KORYXA Formation">
            <span className="relative flex h-8 w-8 overflow-hidden rounded-lg border border-slate-200 bg-white p-0.5 shadow-xs transition group-hover:scale-105">
              <Image
                src="/assets/brand/koryxa-formation-logo.webp"
                alt="KORYXA"
                width={32}
                height={32}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                KORY<span className="text-[#00a86b]">XA</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500">Pôle Formation</span>
            </div>
          </Link>

          {/* Profil utilisateur / Connexion uniquement (Chemin unique) */}
          <div className="flex items-center gap-2.5">
            <KoryxaUserNav variant="desktop" />
          </div>
        </div>
      </header>

      {/* 2. Main Storefront Container (Above-the-fold optimization) */}
      <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:py-8 max-w-7xl mx-auto w-full">
        {/* Punchy Hero Strip */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-3.5 py-1 text-xs font-semibold text-[#008b58] mb-3 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a86b]" />
            Tarifs Révisés • Paiement Mobile Money &amp; CB
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.12]">
            Formations Pratiques Data &amp; IA.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Apprenez directement dans votre navigateur. Projets réels d&apos;entreprises, certifications vérifiables et accès instantané après paiement.
          </p>

          {/* Segmented Switcher : Formations vs Packs */}
          <div className="mt-4 inline-flex items-center rounded-xl bg-slate-200/70 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("courses")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "courses"
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <Layers3 size={15} className={activeTab === "courses" ? "text-[#00a86b]" : "text-slate-400"} />
              Toutes les Formations ({COURSES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("packs")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "packs"
                  ? "bg-[#00a86b] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <Package size={15} className={activeTab === "packs" ? "text-white" : "text-slate-500"} />
              Packs Carrière ({PACKS.length})
              <span className="rounded-full bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2">
                -50%
              </span>
            </button>
          </div>
        </div>

        {/* 3. View A: 8 Course Cards Grid (Directement scannable, zéro sous-filtre) */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {COURSES.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#dfe5d8] bg-white p-4 shadow-xs hover:shadow-md hover:border-[#00a86b] transition-all duration-200"
                >
                  <div>
                    {/* Top Bar : Icon + Category */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${c.iconBg} ${c.iconColor}`}>
                        <Icon size={20} />
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        {c.category}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h2 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#008b58] transition-colors">
                      {c.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {c.tagline}
                    </p>

                    {/* Highlights */}
                    <ul className="mt-3 space-y-1 border-t border-slate-100 pt-2.5 text-[11px] text-slate-600">
                      {c.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check size={12} className="text-[#00a86b] shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Pricing & Single Path Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-2.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-slate-950 tracking-tight">
                          {c.price}
                        </span>
                        <span className="text-[11px] text-slate-400 line-through font-semibold">
                          {c.oldPrice}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500">
                        {c.duration}
                      </span>
                    </div>

                    <Link
                      href={c.checkoutUrl}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#00a86b] px-3 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#008b58] transition-all"
                    >
                      S&apos;inscrire ({c.price}) <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. View B: 3 Career Packs Cards */}
        {activeTab === "packs" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {PACKS.map((pack) => (
              <div
                key={pack.slug}
                className={`relative flex flex-col justify-between rounded-3xl border p-5 sm:p-6 transition-all ${
                  pack.featured
                    ? "border-2 border-[#00a86b] bg-white shadow-xl ring-4 ring-[#00a86b]/10"
                    : "border-[#dfe5d8] bg-white shadow-xs hover:border-[#00a86b]/60"
                }`}
              >
                {pack.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00a86b] px-3.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Recommandé Métier
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">
                      {pack.eyebrow}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                      {pack.badge}
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {pack.title}
                  </h2>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {pack.description}
                  </p>

                  <div className="my-4 border-t border-slate-100 pt-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Formations incluses dans ce pack :
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {pack.courses.map((course, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#00a86b] shrink-0 mt-0.5" />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                        {pack.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-bold">
                        {pack.oldPrice}
                      </span>
                    </div>
                    <span className="rounded-full bg-emerald-100 text-[#008b58] text-[10px] font-bold px-2 py-0.5">
                      {pack.saving}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={pack.checkoutUrl}
                      className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                        pack.featured
                          ? "bg-[#00a86b] text-white shadow-md hover:bg-[#008b58]"
                          : "bg-slate-900 text-white hover:bg-[#00a86b]"
                      }`}
                    >
                      Commander ce Pack ({pack.price}) <ArrowRight size={15} />
                    </Link>
                    <a
                      href={pack.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-[11px] font-medium text-slate-500 hover:text-[#008b58] transition-colors"
                    >
                      Commander via WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. Direct Trust Bar (Payment & Sovereign Learning Guarantee) */}
        <section className="mt-6 rounded-2xl border border-[#dfe5d8] bg-white p-3.5 sm:p-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Smartphone size={14} className="text-[#00a86b]" />
              Paiement instantané Wave, Orange Money, MTN, Moov &amp; CB
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <LockKeyhole size={14} className="text-[#00a86b]" />
              Accès immédiat et à vie à votre cockpit d&apos;apprentissage
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Award size={14} className="text-[#00a86b]" />
              Certificat KORYXA officiel vérifiable en ligne
            </span>
          </div>
        </section>
      </main>

      {/* 6. Footer Minimal */}
      <footer className="border-t border-[#dfe5d8] bg-white px-4 py-4 text-center text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} KORYXA — Pôle Formation. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <a
              href="https://wa.me/22892092572"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008b58] font-bold hover:underline"
            >
              Support WhatsApp (+228 92 09 25 72)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
