import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
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
    tags: ["Python", "Pandas", "Visualisation", "Portfolio"],
  },
  {
    title: "Chatbot IA avec documents",
    eyebrow: "Ouverture prochaine",
    description: "Comprenez comment connecter des documents, une recherche intelligente et une interface conversationnelle utile.",
    objective: "Construire un assistant capable d’exploiter vos contenus.",
    level: "Débutant accompagné",
    format: "Cas pratique + prototype",
    icon: BrainCircuit,
    href: "/faq",
    active: false,
    tags: ["IA", "RAG", "Documents", "Chatbot"],
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
    tags: ["No-code", "Workflows", "Automatisation", "Opérations"],
  },
];

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
        <Image
          src="/assets/landing/hero/koryxa-learning-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,37,28,.94)_0%,rgba(6,37,28,.78)_48%,rgba(6,37,28,.42)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.7fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bcf5d7]/30 bg-[#bcf5d7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
              <Sparkles size={14} /> Catalogue KORYXA
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Choisissez une compétence. Construisez une vraie preuve.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/75 sm:text-lg">
              Des parcours pratiques en data, intelligence artificielle et automatisation, conçus pour vous faire progresser jusqu’à un résultat concret.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/formations/python-data-analyst" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:-translate-y-0.5 hover:bg-[#bcf5d7]">
                Commencer par Python Data Analyst <ArrowRight size={17} />
              </Link>
              <Link href="/methode" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/14">
                Découvrir la méthode
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {pillars.map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur-xl">
                <Icon className="h-5 w-5 text-[#bcf5d7]" />
                <h2 className="mt-4 text-lg font-black">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]">
              <Target size={14} /> Les parcours
            </span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl lg:text-6xl">
              Une formation pour chaque objectif.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Comparez les objectifs, le niveau et le format avant de choisir le parcours qui correspond réellement à votre besoin.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {tracks.map(({ title, eyebrow, description, objective, level, format, icon: Icon, href, active, tags }) => (
              <article key={title} className={`flex h-full flex-col rounded-[2rem] border p-6 shadow-sm sm:p-8 ${active ? "border-[#00bd72]/35 bg-white shadow-[#06251c]/8" : "border-[#06251c]/10 bg-white/80"}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${active ? "bg-[#bcf5d7] text-[#06251c]" : "bg-[#06251c]/6 text-[#06251c]/65"}`}>
                    <Icon size={25} />
                  </span>
                  <span className={`rounded-full px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] ${active ? "bg-[#00bd72] text-[#06251c]" : "bg-[#06251c]/8 text-[#06251c]/55"}`}>
                    {eyebrow}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-black tracking-[-0.03em] text-[#06251c] sm:text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{description}</p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-[#f2fbf5] p-4">
                    <Target className="h-4 w-4 text-[#00bd72]" />
                    <p className="mt-3 text-[0.68rem] font-black uppercase tracking-[0.12em] text-slate-500">Objectif</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#06251c]">{objective}</p>
                  </div>
                  <div className="rounded-2xl bg-[#f2fbf5] p-4">
                    <GraduationCap className="h-4 w-4 text-[#00bd72]" />
                    <p className="mt-3 text-[0.68rem] font-black uppercase tracking-[0.12em] text-slate-500">Niveau</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#06251c]">{level}</p>
                  </div>
                  <div className="rounded-2xl bg-[#f2fbf5] p-4">
                    <Clock3 className="h-4 w-4 text-[#00bd72]" />
                    <p className="mt-3 text-[0.68rem] font-black uppercase tracking-[0.12em] text-slate-500">Format</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#06251c]">{format}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#06251c]/6 px-3 py-1.5 text-xs font-black text-[#06251c]/65">{tag}</span>
                  ))}
                </div>

                <div className="mt-8 border-t border-[#06251c]/8 pt-6">
                  <Link href={href} className={`inline-flex items-center gap-2 text-sm font-black ${active ? "text-[#008f58]" : "text-[#06251c]/55"}`}>
                    {active ? "Voir le programme complet" : "Voir les informations"} <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.25rem] bg-[#06251c] p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
              <CheckCircle2 size={15} /> Recommandation KORYXA
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Commencez par le parcours déjà disponible.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Python Data Analyst vous donne une base immédiatement exploitable et un projet concret à présenter.
            </p>
          </div>
          <Link href="/formations/python-data-analyst" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:bg-[#bcf5d7]">
            Voir le parcours <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
