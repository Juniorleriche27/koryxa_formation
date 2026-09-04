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
    <main className="min-h-screen bg-[#faf9f5] pt-16 text-slate-950 lg:pt-20">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#050b08] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <Image src="/assets/landing/hero/koryxa-learning-hero.jpg" alt="" fill priority className="object-cover opacity-25" sizes="100vw" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,168,107,.2),transparent_32rem),linear-gradient(180deg,#050b08_0%,#07190f_50%,#050b08_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.7fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/40 bg-[#00a86b]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#86efac]">
              <Sparkles size={14} /> Catalogue d&apos;Excellence KORYXA
            </span>
            <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              Maîtrisez les compétences qui comptent. Prouvez votre valeur sur le marché.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-slate-300 sm:text-lg">
              Des parcours d’excellence et packs métiers en Data, IA et Automatisation, conçus pour transformer la théorie en réalisations concrètes et certifiées.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <a href="#packs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:-translate-y-0.5 hover:bg-[#008b58]">
                Voir les Packs Métiers (-30%) <ArrowRight size={17} />
              </a>
              <a href="#formations" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10">
                Parcours individuels
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {pillars.map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <Icon className="h-5 w-5 text-[#86efac]" />
                <h2 className="mt-4 font-serif text-lg font-bold text-white">{title}</h2>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Packs Carrière & Bundles */}
      <section id="packs" className="border-t border-[#1b3d29] bg-[#07190f] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/40 bg-[#00a86b]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#86efac]">
              <BadgePercent size={15} /> Packs Métiers & Cursus Complets
            </span>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Accélérez votre carrière avec un pack tout-en-un.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Regroupez plusieurs formations complémentaires pour maîtriser un métier complet tout en bénéficiant de réductions exclusives.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {careerPacks.map((pack) => (
              <div
                key={pack.title}
                className={`relative flex flex-col justify-between rounded-3xl border p-7 shadow-2xl transition sm:p-8 ${
                  pack.featured
                    ? "border-[#00a86b]/60 bg-gradient-to-b from-[#0d2e1c] to-[#07190f] ring-2 ring-[#00a86b]/40"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                {pack.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#00a86b] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    ⭐ Choix Recommandé
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#86efac]">
                      {pack.eyebrow}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-200">
                      {pack.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-bold text-white">{pack.title}</h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">{pack.description}</p>

                  <div className="my-6 border-t border-white/10 pt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Formations incluses :
                    </p>
                    <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-200">
                      {pack.courses.map((course, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={16} className="mt-0.5 shrink-0 text-[#00a86b]" />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-black text-white">{pack.price}</span>
                      <span className="text-sm font-bold text-slate-400 line-through">
                        {pack.oldPrice}
                      </span>
                    </div>
                    <span className="mt-1 inline-block text-xs font-bold text-[#86efac]">
                      {pack.saving}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/checkout?pack=${pack.slug}`}
                      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                        pack.featured
                          ? "bg-[#00a86b] text-white shadow-lg hover:bg-[#008b58]"
                          : "border border-white/15 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Commander ce Pack <ArrowRight size={16} />
                    </Link>
                    <a
                      href={`https://wa.me/22892092572?text=${encodeURIComponent(pack.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-xs font-semibold text-slate-400 transition hover:text-[#86efac]"
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
              <article key={title} className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${featured ? "border-[#00a86b]/50 bg-[#07190f] text-white shadow-2xl" : active ? "border-[#dfe5d8] bg-white hover:border-[#00a86b]" : "border-slate-200 bg-white/80"}`}>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${featured ? "bg-[#00a86b] text-white" : active ? "bg-[#00a86b]/15 text-[#008b58]" : "bg-slate-100 text-slate-600"}`}>
                      <Icon size={24} />
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${featured ? "bg-[#00a86b]/20 text-[#86efac] border border-[#00a86b]/30" : active ? "bg-[#00a86b]/15 text-[#008b58] border border-[#00a86b]/30" : "bg-slate-100 text-slate-500"}`}>
                      {eyebrow}
                    </span>
                  </div>

                  <h3 className={`mt-6 font-serif text-2xl font-bold tracking-tight ${featured ? "text-white" : "text-slate-950"}`}>
                    {title}
                  </h3>
                  <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${featured ? "text-slate-300" : "text-slate-600"}`}>
                    {description}
                  </p>
                  {outcome && (
                    <p className={`mt-4 inline-flex rounded-xl px-3.5 py-1.5 text-xs font-bold ${featured ? "bg-[#00a86b]/20 text-[#86efac]" : "bg-[#00a86b]/10 text-[#008b58]"}`}>
                      {outcome}
                    </p>
                  )}

                  <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                    {[{ label: "Objectif", value: objective, icon: Target }, { label: "Niveau", value: level, icon: GraduationCap }, { label: "Format", value: format, icon: Clock3 }].map(({ label, value, icon: DetailIcon }) => (
                      <div key={label} className={`rounded-xl p-3 ${featured ? "border border-white/10 bg-white/[0.04]" : "bg-slate-50 border border-slate-100"}`}>
                        <DetailIcon className={`h-4 w-4 ${featured ? "text-[#86efac]" : "text-[#00a86b]"}`} />
                        <p className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${featured ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
                        <p className={`mt-1 text-xs font-semibold leading-snug ${featured ? "text-white" : "text-slate-900"}`}>{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {tags.map(tag => (
                      <span key={tag} className={`rounded-lg px-2.5 py-0.5 font-mono text-[10px] font-semibold ${featured ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-600"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`mt-8 border-t pt-5 ${featured ? "border-white/10" : "border-slate-100"}`}>
                  {price && (
                    <div className="mb-4 flex flex-wrap items-baseline gap-2.5">
                      <p className={`font-serif text-2xl font-black ${featured ? "text-white" : "text-slate-950"}`}>{price}</p>
                      {oldPrice && <p className="text-xs font-semibold text-slate-400 line-through">{oldPrice}</p>}
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${featured ? "text-[#86efac]" : "text-[#008b58]"}`}>Tarif officiel</span>
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
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-[#06251c] to-slate-950 p-8 text-white shadow-2xl sm:p-12 lg:p-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#bcf5d7]/30 bg-[#bcf5d7]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
                <Briefcase size={14} /> Offre Entreprises & Cabinets
              </span>
              <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Montez en compétences vos équipes sur la Data & l&apos;IA.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                Vous dirigez une entreprise, une PME ou un cabinet ? Offrez à vos collaborateurs des compétences immédiatement opérationnelles en Excel, SQL, Power BI et IA documentaire.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                  <CheckCircle2 size={18} className="text-emerald-400" /> Remise de -25% dès 3 accès
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                  <CheckCircle2 size={18} className="text-emerald-400" /> Facturation entreprise certifiée
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                  <CheckCircle2 size={18} className="text-emerald-400" /> Suivi de progression pour le RH
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                  <CheckCircle2 size={18} className="text-emerald-400" /> Support pédagogique dédié
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md">
              <p className="text-sm font-black text-white">Besoin d&apos;un devis ou d&apos;une convention ?</p>
              <p className="text-xs leading-5 text-slate-300">
                Contactez directement notre équipe pour une proposition adaptée au nombre de collaborateurs.
              </p>
              <a
                href="https://wa.me/22892092572?text=Bonjour%20KORYXA,%20je%20souhaite%20un%20devis%20pour%20former%20mon%20%C3%A9quipe%20en%20entreprise."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 text-sm font-black text-[#06251c] transition hover:bg-emerald-300"
              >
                <MessageCircleMore size={17} /> Échanger sur WhatsApp
              </a>
              <a
                href="mailto:contact@koryxa.fr?subject=Demande%20de%20devis%20formation%20entreprise"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/20"
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
