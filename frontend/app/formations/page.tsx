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
    <main className="kx-marketing min-h-screen bg-white pt-16 text-slate-950 lg:pt-20">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#06251c] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <Image src="/assets/landing/hero/koryxa-learning-hero.jpg" alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,37,28,.94)_0%,rgba(6,37,28,.78)_48%,rgba(6,37,28,.42)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.7fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bcf5d7]/30 bg-[#bcf5d7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]"><Sparkles size={14} /> Catalogue KORYXA</span>
            <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Choisissez une compétence. Construisez une vraie preuve.</h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/75 sm:text-lg">Des parcours pratiques et des packs métiers en data, intelligence artificielle et automatisation, conçus pour vous faire progresser jusqu’à un résultat concret.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#packs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:-translate-y-0.5 hover:bg-[#bcf5d7]">Voir les Packs Métiers (-30%) <ArrowRight size={17} /></a>
              <a href="#formations" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/14">Parcours individuels</a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {pillars.map(({ title, text, icon: Icon }) => <div key={title} className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur-xl"><Icon className="h-5 w-5 text-[#bcf5d7]" /><h2 className="mt-4 text-lg font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></div>)}
          </div>
        </div>
      </section>

      {/* Section Packs Carrière & Bundles */}
      <section id="packs" className="bg-[#0b1e19] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
              <BadgePercent size={15} /> Packs Métiers & Cursus Complets
            </span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Accélérez votre carrière avec un pack tout-en-un.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Regroupez plusieurs formations complémentaires pour maîtriser un métier complet tout en bénéficiant de réductions exclusives.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {careerPacks.map((pack) => (
              <div
                key={pack.title}
                className={`relative flex flex-col justify-between rounded-[2.25rem] border p-7 shadow-2xl transition sm:p-8 ${
                  pack.featured
                    ? "border-emerald-300/40 bg-gradient-to-b from-[#10382b] to-[#081e17] ring-2 ring-emerald-400/30"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                {pack.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 px-4 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#06251c] shadow-lg shadow-emerald-950/40">
                    ⭐ Choix Recommandé
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
                      {pack.eyebrow}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-slate-200">
                      {pack.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-black text-white">{pack.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{pack.description}</p>

                  <div className="my-6 border-t border-white/10 pt-6">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                      Formations incluses :
                    </p>
                    <ul className="mt-3 space-y-2.5 text-sm text-slate-200">
                      {pack.courses.map((course, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">{pack.price}</span>
                      <span className="text-sm font-bold text-slate-400 line-through">
                        {pack.oldPrice}
                      </span>
                    </div>
                    <span className="mt-1 inline-block text-xs font-black text-emerald-300">
                      {pack.saving}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/checkout?pack=${pack.slug}`}
                      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black transition ${
                        pack.featured
                          ? "bg-emerald-400 text-[#06251c] shadow-lg shadow-emerald-900/40 hover:bg-emerald-300"
                          : "border border-white/15 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Commander ce Pack <ArrowRight size={16} />
                    </Link>
                    <a
                      href={`https://wa.me/22892092572?text=${encodeURIComponent(pack.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-xs font-bold text-slate-400 transition hover:text-emerald-300"
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
      <section id="formations" className="bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]"><Target size={14} /> Les parcours individuels</span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl lg:text-6xl">Une formation ciblée par compétence.</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">Comparez les objectifs, le niveau, le résultat attendu et le prix avant de choisir votre parcours.</p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {tracks.map(({ title, eyebrow, description, objective, level, format, icon: Icon, href, active, featured, price, oldPrice, outcome, tags }) => (
              <article key={title} className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 shadow-sm sm:p-8 ${featured ? "border-emerald-300/30 bg-[#06251c] text-white shadow-2xl shadow-emerald-950/20" : active ? "border-[#00bd72]/35 bg-white shadow-[#06251c]/8" : "border-[#06251c]/10 bg-white/80"}`}>
                {featured && <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(16,185,129,.22),transparent_18rem),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[length:auto,40px_40px,40px_40px]" />}
                <div className="relative flex items-start justify-between gap-4">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${featured ? "bg-emerald-300 text-[#06251c]" : active ? "bg-[#bcf5d7] text-[#06251c]" : "bg-[#06251c]/6 text-[#06251c]/65"}`}><Icon size={25} /></span>
                  <span className={`rounded-full px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] ${active ? "bg-[#00bd72] text-[#06251c]" : "bg-[#06251c]/8 text-[#06251c]/55"}`}>{eyebrow}</span>
                </div>

                <div className="relative">
                  <h3 className={`mt-8 text-2xl font-black tracking-[-0.03em] sm:text-3xl ${featured ? "text-white" : "text-[#06251c]"}`}>{title}</h3>
                  <p className={`mt-4 text-sm leading-7 sm:text-base ${featured ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
                  {outcome && <p className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black ${featured ? "bg-emerald-300/12 text-emerald-200" : "bg-emerald-50 text-emerald-800"}`}>{outcome}</p>}
                </div>

                <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
                  {[{ label: "Objectif", value: objective, icon: Target }, { label: "Niveau", value: level, icon: GraduationCap }, { label: "Format", value: format, icon: Clock3 }].map(({ label, value, icon: DetailIcon }) => (
                    <div key={label} className={`rounded-2xl p-4 ${featured ? "border border-white/10 bg-white/[0.06]" : "bg-[#f2fbf5]"}`}>
                      <DetailIcon className="h-4 w-4 text-[#00bd72]" />
                      <p className={`mt-3 text-[0.68rem] font-black uppercase tracking-[0.12em] ${featured ? "text-emerald-200/70" : "text-slate-500"}`}>{label}</p>
                      <p className={`mt-2 text-sm font-bold leading-6 ${featured ? "text-white" : "text-[#06251c]"}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="relative mt-6 flex flex-wrap gap-2">
                  {tags.map(tag => <span key={tag} className={`rounded-full px-3 py-1.5 text-xs font-black ${featured ? "bg-white/8 text-slate-200" : "bg-[#06251c]/6 text-[#06251c]/65"}`}>{tag}</span>)}
                </div>

                <div className={`relative mt-8 border-t pt-6 ${featured ? "border-white/10" : "border-[#06251c]/8"}`}>
                  {price && <div className="mb-5 flex flex-wrap items-end gap-3"><p className={`text-2xl font-black ${featured ? "text-white" : "text-[#06251c]"}`}>{price}</p>{oldPrice && <p className="pb-1 text-sm font-bold text-slate-400 line-through">{oldPrice}</p>}<span className={`pb-1 text-xs font-black uppercase tracking-[.12em] ${featured ? "text-emerald-200" : "text-emerald-700"}`}>Tarif de lancement</span></div>}
                  <Link href={href} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-black transition ${featured ? "bg-emerald-300 text-[#06251c] hover:bg-white" : active ? "bg-[#06251c] text-white hover:bg-[#008f58]" : "text-[#06251c]/55"}`}>{active ? "Voir le programme complet" : "Voir les informations"} <ArrowRight size={16} /></Link>
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
