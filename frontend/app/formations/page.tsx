import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Database,
  GraduationCap,
  Layers3,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { FooterSEO, Header } from "@/components/marketing/KoryxaFormationPortal";

export const metadata = {
  title: "Formations — KORYXA Formation",
  description: "Découvrez les parcours KORYXA en data, IA et automatisation.",
};

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

      <section className="relative overflow-hidden bg-[#06251c] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <Image src="/assets/landing/hero/koryxa-learning-hero.jpg" alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,37,28,.94)_0%,rgba(6,37,28,.78)_48%,rgba(6,37,28,.42)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.7fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bcf5d7]/30 bg-[#bcf5d7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]"><Sparkles size={14} /> Catalogue KORYXA</span>
            <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Choisissez une compétence. Construisez une vraie preuve.</h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/75 sm:text-lg">Des parcours pratiques en data, intelligence artificielle et automatisation, conçus pour vous faire progresser jusqu’à un résultat concret.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/formations/llm-rag" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:-translate-y-0.5 hover:bg-[#bcf5d7]">Découvrir LLM RAG Developer <ArrowRight size={17} /></Link>
              <Link href="/methode" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/14">Découvrir la méthode</Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {pillars.map(({ title, text, icon: Icon }) => <div key={title} className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur-xl"><Icon className="h-5 w-5 text-[#bcf5d7]" /><h2 className="mt-4 text-lg font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]"><Target size={14} /> Les parcours</span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl lg:text-6xl">Une formation pour chaque objectif.</h2>
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

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.25rem] bg-[#06251c] p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
          <div><span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]"><CheckCircle2 size={15} /> Sept parcours structurés</span><h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Choisissez entre Excel, SQL, Python, Power BI, Data Science, Machine Learning et IA documentaire.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Excel structure l’analyse opérationnelle. SQL donne un accès direct aux bases de données. Python approfondit le travail par le code. Power BI transforme les sources en rapports partagés. LLM RAG permet de construire des assistants IA fondés sur des documents vérifiables. Machine Learning vous apprend à construire des modèles prédictifs robustes et explicables.</p></div>
          <Link href="/formations/excel-data-analyst" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:bg-[#bcf5d7]">Découvrir Excel Data Analyst <ArrowRight size={17} /></Link>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
