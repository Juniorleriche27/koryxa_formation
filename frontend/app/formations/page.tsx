import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  Bot,
  BrainCircuit,
  Briefcase,
  Check,
  CheckCircle2,
  Clock3,
  Database,
  GraduationCap,
  Layers3,
  LineChart,
  Mail,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { FooterSEO, Header } from "@/components/marketing/KoryxaFormationPortal";

export const metadata = {
  title: "Formations & Packs Carrière — KORYXA Formation",
  description: "Découvrez les parcours et packs carrière KORYXA en data, IA, Power BI, Python et automatisation.",
};

const careerPacks = [
  {
    slug: "full-stack-data-analyst",
    title: "Pack Full-Stack Data Analyst",
    eyebrow: "Essentiel Métier",
    badge: "Indispensable Entreprise",
    description: "La chaîne complète de l'analyste de données : du traitement tableur à la base de données SQL jusqu'au tableau de bord de direction Power BI.",
    courses: [
      "Excel Data Analyst (Formules, Power Query, TCD)",
      "SQL Data Analyst (PostgreSQL, CTE, Vues analytiques)",
      "Power BI Data Analyst (DAX, Modélisation, RLS)",
    ],
    price: "89 000 FCFA",
    oldPrice: "127 000 FCFA",
    saving: "Économie de 38 000 FCFA (-30%)",
    featured: false,
    outcome: "Autonomie totale sur l'analyse et le reporting décisionnel",
    whatsappText: "Bonjour KORYXA, je souhaite commander le Pack Full-Stack Data Analyst (89 000 FCFA).",
  },
  {
    slug: "data-scientist-ai-engineer",
    title: "Pack Data Scientist & AI Engineer",
    eyebrow: "Le Plus Populaire",
    badge: "Carrière d'Avenir",
    description: "Le cursus complet pour concevoir des modèles prédictifs, maîtriser les statistiques avancées et déployer des agents IA conversationnels basés sur vos documents.",
    courses: [
      "Python Data Analyst (NumPy, Pandas, Visualisation)",
      "Statistiques & Data Science (Inférence, Prévision de ventes)",
      "Machine Learning avec Python (Scikit-Learn, SHAP, Churn)",
      "LLM RAG Developer (Embeddings, Vector DB, Qdrant)",
    ],
    price: "129 000 FCFA",
    oldPrice: "186 000 FCFA",
    saving: "Économie de 57 000 FCFA (-31%)",
    featured: true,
    outcome: "Double compétence hautement recherchée : Data Science & IA Appliquée",
    whatsappText: "Bonjour KORYXA, je souhaite commander le Pack Data Scientist & AI Engineer (129 000 FCFA).",
  },
  {
    slug: "data-ultimate-all-access",
    title: "Pack Data Ultimate All-Access",
    eyebrow: "Accès Total à Vie",
    badge: "Tout le Catalogue",
    description: "L'accès illimité et permanent aux 8 parcours de formation actuels et à toutes leurs futures mises à jour pour une maîtrise totale des technologies data.",
    courses: [
      "Les 8 parcours complets (Excel, SQL, Power BI, Python, Stats, ML, RAG, Data Eng)",
      "Tous les projets portfolios, corrigés et certifications inclus",
      "Accès prioritaire à toutes les nouvelles formations",
    ],
    price: "199 000 FCFA",
    oldPrice: "372 000 FCFA",
    saving: "Économie massive de 173 000 FCFA (-46%)",
    featured: false,
    outcome: "Le pass complet pour devenir le profil le plus complet du marché",
    whatsappText: "Bonjour KORYXA, je souhaite commander le Pack Data Ultimate All-Access (199 000 FCFA).",
  },
];

const tracks = [
  {
    title: "Python Data Analyst",
    eyebrow: "Parcours disponible",
    description: "Apprenez à manipuler des données avec Python, produire des analyses claires et construire un projet portfolio crédible.",
    objective: "Passer de données brutes à une analyse présentable.",
    level: "Débutant à intermédiaire",
    format: "Modules guidés + projet final",
    icon: BarChart3,
    href: "/formations/python-data-analyst",
    active: true,
    featured: false,
    price: "29 000 FCFA",
    oldPrice: null,
    outcome: "Projet d’analyse de données portfolio",
    tags: ["Python", "Pandas", "Visualisation", "Portfolio"],
  },
  {
    title: "Excel Data Analyst",
    eyebrow: "Parcours disponible",
    description: "Maîtrisez l’outil le plus utilisé en entreprise pour nettoyer, analyser, automatiser et présenter des données utiles à la décision.",
    objective: "Construire un dashboard commercial actualisable et professionnel.",
    level: "Débutant à intermédiaire avancé",
    format: "12 modules + fichiers pratiques + projet final",
    icon: BarChart3,
    href: "/formations/excel-data-analyst",
    active: true,
    featured: false,
    price: "39 000 FCFA",
    oldPrice: "49 000 FCFA",
    outcome: "Dashboard Excel professionnel",
    tags: ["Excel", "Power Query", "Power Pivot", "Dashboard"],
  },
  {
    title: "LLM RAG Developer",
    eyebrow: "Parcours disponible",
    description: "Apprenez à construire des assistants IA capables d’exploiter des documents privés, retrouver les bons passages et répondre avec des sources vérifiables.",
    objective: "Créer un produit RAG fiable, sécurisé et présentable à un client ou recruteur.",
    level: "Débutant technique à intermédiaire",
    format: "12 modules + 5 labs + projet final",
    icon: BrainCircuit,
    href: "/formations/llm-rag",
    active: true,
    featured: true,
    price: "49 000 FCFA",
    oldPrice: "69 000 FCFA",
    outcome: "Assistant documentaire RAG déployable",
    tags: ["LLM", "RAG", "Qdrant", "Streamlit"],
  },
  {
    title: "SQL Data Analyst avec PostgreSQL",
    eyebrow: "Parcours disponible",
    description: "Interrogez, reliez et analysez les données avec SQL, PostgreSQL, CTE, fonctions de fenêtre et vues analytiques.",
    objective: "Livrer une analyse commerciale complète depuis une base PostgreSQL.",
    level: "Débutant à intermédiaire avancé",
    format: "12 modules + scripts SQL + datasets + projet final",
    icon: Database,
    href: "/formations/sql-data-analyst",
    active: true,
    featured: false,
    price: "39 000 FCFA",
    oldPrice: "49 000 FCFA",
    outcome: "Analyse PostgreSQL professionnelle",
    tags: ["SQL", "PostgreSQL", "CTE", "Power BI"],
  },
  {
    title: "Power BI Data Analyst",
    eyebrow: "Parcours disponible",
    description: "Préparez, modélisez et visualisez les données pour construire des rapports Power BI utiles, actualisables et sécurisés.",
    objective: "Livrer un rapport de pilotage commercial complet.",
    level: "Débutant à intermédiaire avancé",
    format: "12 modules + fichiers pratiques + projet final",
    icon: BarChart3,
    href: "/formations/power-bi-data-analyst",
    active: true,
    featured: false,
    price: "49 000 FCFA",
    oldPrice: "59 000 FCFA",
    outcome: "Rapport Power BI professionnel",
    tags: ["Power BI", "Power Query", "DAX", "RLS"],
  },
  {
    title: "Statistiques & Data Science avec Python",
    eyebrow: "Parcours disponible",
    description: "Comprenez les méthodes statistiques, réalisez des tests d’hypothèses, segmentez vos clients et prévoyez vos ventes avec Python.",
    objective: "Livrer une étude complète de prévision des ventes et segmentation client.",
    level: "Intermédiaire",
    format: "12 modules + 24 leçons + notebooks + projet final",
    icon: LineChart,
    href: "/formations/statistics-data-science-python",
    active: true,
    featured: false,
    price: "49 000 FCFA",
    oldPrice: "59 000 FCFA",
    outcome: "Projet Data Science portfolio",
    tags: ["Statistiques", "Python", "K-Means", "Séries Temporelles"],
  },
  {
    title: "Machine Learning avec Python",
    eyebrow: "Parcours disponible",
    description: "Construisez, comparez, optimisez et interprétez des modèles de Machine Learning avec Python et scikit-learn.",
    objective: "Livrer un modèle de prédiction du churn client complet et défendable.",
    level: "Intermédiaire",
    format: "12 modules + notebooks + projet final",
    icon: BrainCircuit,
    href: "/formations/machine-learning-python",
    active: true,
    featured: false,
    price: "59 000 FCFA",
    oldPrice: "69 000 FCFA",
    outcome: "Projet Machine Learning portfolio",
    tags: ["Python", "scikit-learn", "SHAP", "Validation"],
  },
  {
    title: "Data Engineering avec Python et SQL",
    eyebrow: "Parcours disponible",
    description: "Construisez des pipelines fiables avec Python, PostgreSQL, dbt, Airflow, Docker et des contrôles de qualité.",
    objective: "Livrer une plateforme analytique de ventes complète et observable.",
    level: "Intermédiaire",
    format: "12 modules + fichiers pratiques + projet final",
    icon: Database,
    href: "/formations/data-engineering-python-sql",
    active: true,
    featured: false,
    price: "69 000 FCFA",
    oldPrice: "79 000 FCFA",
    outcome: "Plateforme Data Engineering portfolio",
    tags: ["Python", "PostgreSQL", "dbt", "Airflow"],
  },
  {
    title: "Assistant IA pour métier",
    eyebrow: "En préparation",
    description: "Appliquez l’IA à un contexte concret pour écrire, synthétiser, organiser et produire plus efficacement.",
    objective: "Créer un assistant adapté à un besoin métier réel.",
    level: "Tous niveaux",
    format: "Ateliers + cas métier",
    icon: Bot,
    href: "/faq",
    active: false,
    featured: false,
    price: null,
    oldPrice: null,
    outcome: null,
    tags: ["Productivité", "IA métier", "Prompts", "Processus"],
  },
  {
    title: "Automatisation IA & no-code",
    eyebrow: "En préparation",
    description: "Structurez des workflows simples pour réduire les tâches répétitives et fluidifier vos opérations.",
    objective: "Automatiser une tâche utile de bout en bout.",
    level: "Débutant",
    format: "Workflows guidés",
    icon: Workflow,
    href: "/faq",
    active: false,
    featured: false,
    price: null,
    oldPrice: null,
    outcome: null,
    tags: ["No-code", "Workflows", "Automatisation", "Opérations"],
  },
] as const;

const pillars = [
  { title: "Comprendre", text: "Des explications claires avant la pratique.", icon: GraduationCap },
  { title: "Construire", text: "Un livrable concret dans chaque parcours.", icon: Layers3 },
  { title: "Montrer", text: "Une preuve visible de ce que vous savez faire.", icon: Sparkles },
];

export default function FormationsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <Header />

      {/* Hero Section Centrée Lumineuse */}
      <section className="relative overflow-hidden bg-[#faf9f5] px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24 border-b border-[#dfe5d8]">
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
            <Sparkles size={14} /> Catalogue d&apos;Excellence KORYXA
          </span>
          <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-slate-950">
            Maîtrisez les compétences qui comptent.<br />
            <em className="text-[#00a86b] not-italic">Prouvez votre valeur sur le marché.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
            Des parcours d’excellence et packs métiers en Data, IA et Automatisation, conçus pour transformer la théorie en réalisations concrètes et certifiées.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a href="#packs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:-translate-y-0.5 hover:bg-[#008b58]">
              Voir les Packs Métiers (-30%) <ArrowRight size={17} />
            </a>
            <a href="#formations" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50">
              Parcours individuels
            </a>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3 text-left">
            {pillars.map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-serif text-lg font-bold text-slate-950">{title}</h2>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Packs Carrière & Bundles */}
      <section id="packs" className="border-b border-[#dfe5d8] bg-white px-4 py-20 text-slate-950 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <BadgePercent size={15} /> Packs Métiers & Cursus Complets
            </span>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950">
              Accélérez votre carrière avec un pack tout-en-un.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Regroupez plusieurs formations complémentaires pour maîtriser un métier complet tout en bénéficiant de réductions exclusives.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {careerPacks.map((pack) => (
              <div
                key={pack.title}
                className={`relative flex flex-col justify-between rounded-3xl border p-7 sm:p-8 transition-all duration-300 ${
                  pack.featured
                    ? "border-2 border-[#00a86b] bg-[#faf9f5] shadow-xl ring-4 ring-[#00a86b]/10"
                    : "border-[#dfe5d8] bg-white shadow-sm hover:shadow-md hover:border-[#00a86b]/50"
                }`}
              >
                {pack.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#00a86b] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    ⭐ Choix Recommandé
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">
                      {pack.eyebrow}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                      {pack.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-bold text-slate-950">{pack.title}</h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">{pack.description}</p>

                  <div className="my-6 border-t border-slate-100 pt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Formations incluses :
                    </p>
                    <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {pack.courses.map((course, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={16} className="mt-0.5 shrink-0 text-[#00a86b]" />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-black text-slate-950">{pack.price}</span>
                      <span className="text-sm font-bold text-slate-400 line-through">
                        {pack.oldPrice}
                      </span>
                    </div>
                    <span className="mt-1 inline-block rounded-full bg-[#00a86b]/15 px-2.5 py-0.5 text-xs font-bold text-[#008b58]">
                      {pack.saving}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/checkout?pack=${pack.slug}`}
                      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                        pack.featured
                          ? "bg-[#00a86b] text-white shadow-lg hover:bg-[#008b58]"
                          : "border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
                      }`}
                    >
                      Commander ce Pack <ArrowRight size={16} />
                    </Link>
                    <a
                      href={`https://wa.me/22892092572?text=${encodeURIComponent(pack.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-xs font-semibold text-slate-500 transition hover:text-[#008b58]"
                    >
                      Ou commander directement via WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Parcours Individuels */}
      <section id="formations" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <Target size={14} /> Les parcours individuels
            </span>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950">
              Une formation ciblée par compétence.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Comparez les objectifs, le niveau, le résultat attendu et le prix avant de choisir votre parcours.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {tracks.map(({ title, eyebrow, description, objective, level, format, icon: Icon, href, active, featured, price, oldPrice, outcome, tags }) => (
              <article
                key={title}
                className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
                  featured
                    ? "border-2 border-[#00a86b]/60 bg-white shadow-xl ring-2 ring-[#00a86b]/10"
                    : active
                    ? "border-[#dfe5d8] bg-white shadow-sm hover:border-[#00a86b] hover:shadow-md"
                    : "border-slate-200 bg-white/80"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a86b]/15 text-[#008b58]">
                      <Icon size={24} />
                    </span>
                    <span className="rounded-full border border-[#00a86b]/30 bg-[#00a86b]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                      {eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-bold tracking-tight text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>
                  {outcome && (
                    <p className="mt-4 inline-flex rounded-xl bg-[#00a86b]/10 px-3.5 py-1.5 text-xs font-bold text-[#008b58]">
                      {outcome}
                    </p>
                  )}

                  <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                    {[{ label: "Objectif", value: objective, icon: Target }, { label: "Niveau", value: level, icon: GraduationCap }, { label: "Format", value: format, icon: Clock3 }].map(({ label, value, icon: DetailIcon }) => (
                      <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                        <DetailIcon className="h-4 w-4 text-[#00a86b]" />
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
                        <p className="mt-1 text-xs font-semibold leading-snug text-slate-900">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {tags.map(tag => (
                      <span key={tag} className="rounded-lg bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5">
                  {price && (
                    <div className="mb-4 flex flex-wrap items-baseline gap-2.5">
                      <p className="font-serif text-2xl font-black text-slate-950">{price}</p>
                      {oldPrice && <p className="text-xs font-semibold text-slate-400 line-through">{oldPrice}</p>}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#008b58]">Tarif officiel</span>
                    </div>
                  )}
                  <Link
                    href={href}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                      featured
                        ? "bg-[#00a86b] text-white hover:bg-[#008b58]"
                        : active
                        ? "bg-slate-950 text-white hover:bg-[#00a86b]"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {active ? "Voir le programme complet" : "Voir les informations"} <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Entreprises & Équipes B2B */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24 border-t border-[#dfe5d8]">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-[#dfe5d8] bg-[#faf9f5] p-8 text-slate-950 shadow-xl sm:p-12 lg:p-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#008b58]">
                <Briefcase size={14} /> Offre Entreprises & Cabinets
              </span>
              <h2 className="mt-6 font-serif text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-slate-950">
                Montez en compétences vos équipes sur la Data & l&apos;IA.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Vous dirigez une entreprise, une PME ou un cabinet ? Offrez à vos collaborateurs des compétences immédiatement opérationnelles en Excel, SQL, Power BI et IA documentaire.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={18} className="text-[#00a86b]" /> Remise de -25% dès 3 accès
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={18} className="text-[#00a86b]" /> Facturation entreprise certifiée
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={18} className="text-[#00a86b]" /> Suivi de progression pour le RH
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={18} className="text-[#00a86b]" /> Support pédagogique dédié
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-[#dfe5d8] bg-white p-6 shadow-md">
              <p className="font-serif text-base font-bold text-slate-950">Besoin d&apos;un devis ou d&apos;une convention ?</p>
              <p className="text-xs leading-5 text-slate-600">
                Contactez directement notre équipe pour une proposition adaptée au nombre de collaborateurs.
              </p>
              <a
                href="https://wa.me/22892092572?text=Bonjour%20KORYXA,%20je%20souhaite%20un%20devis%20pour%20former%20mon%20%C3%A9quipe%20en%20entreprise."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#00a86b] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#008b58]"
              >
                <MessageCircleMore size={17} /> Échanger sur WhatsApp
              </a>
              <a
                href="mailto:contact@koryxa.fr?subject=Demande%20de%20devis%20formation%20entreprise"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                <Mail size={17} /> Demander un devis par Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
