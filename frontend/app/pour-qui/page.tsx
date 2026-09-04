import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  GraduationCap,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { FooterSEO, Header } from "@/components/marketing/KoryxaFormationPortal";

export const metadata = {
  title: "Pour qui — KORYXA Formation",
  description: "Découvrez à qui s’adressent les parcours pratiques KORYXA Formation en Data, IA et Automatisation.",
};

const profiles = [
  {
    title: "Débutants & Reconversion",
    description: "Vous partez de zéro ou presque, mais vous voulez apprendre avec une progression claire, sans jargon et avec un livrable tangible.",
    icon: GraduationCap,
    examples: ["Découvrir les métiers de la data & de l'IA", "Acquérir une base technique solide", "Éviter les formations trop théoriques"],
  },
  {
    title: "Professionnels & Analystes",
    description: "Vous souhaitez ajouter Python, SQL, Power BI ou les LLM à votre métier actuel pour gagner en impact et automatiser vos analyses.",
    icon: BriefcaseBusiness,
    examples: ["Automatiser les reportings récurrents", "Accéder à des opportunités mieux rémunérées", "Créer un avantage concurrentiel fort"],
  },
  {
    title: "Entrepreneurs & Dirigeants",
    description: "Vous avez besoin d’outils concrets pour analyser vos ventes, créer des assistants IA documentaires et optimiser vos opérations.",
    icon: Rocket,
    examples: ["Exploiter vos données sans recruter une agence", "Créer un assistant IA privé pour vos documents", "Piloter avec des dashboards décisionnels"],
  },
  {
    title: "Développeurs & Ingénieurs",
    description: "Vous voulez intégrer les technologies d'IA moderne (LLM RAG, Qdrant, pipelines de données fiables) à votre stack de production.",
    icon: Lightbulb,
    examples: ["Construire des architectures RAG robustes", "Déployer des pipelines dbt et Airflow", "Concevoir des agents IA autonomes"],
  },
];

const signals = [
  "Vous voulez comprendre sans jargon mathématique inutile.",
  "Vous préférez apprendre en manipulant du code et des données réelles.",
  "Vous avez besoin d’un livrable portfolio visible pour prouver votre compétence.",
  "Vous voulez progresser avec des quiz et des notebooks interactifs intégrés.",
  "Vous cherchez des compétences directement valorisables sur le marché du travail.",
  "Vous souhaitez obtenir une certification officielle et vérifiable publiquement.",
];

const useCases = [
  {
    title: "Changer de trajectoire professionnelle",
    text: "Construire une première compétence certifiée et un portfolio solide pour postuler avec assurance aux postes data & IA.",
    icon: Compass,
  },
  {
    title: "Renforcer son impact au travail",
    text: "Ajouter la maîtrise des données décisionnelles et des assistants IA à votre quotidien pour démultiplier votre productivité.",
    icon: Workflow,
  },
  {
    title: "Lancer ou moderniser son entreprise",
    text: "Transformer vos données en tableaux de bord stratégiques et intégrer l'IA générative dans vos processus d'affaires.",
    icon: Target,
  },
];

export default function PourQuiPage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] pt-16 text-slate-950 lg:pt-20">
      <Header />

      <section className="relative overflow-hidden bg-[#faf9f5] border-b border-[#dfe5d8] px-4 py-16 sm:px-6 lg:px-8 lg:py-24 text-slate-950">
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.75fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
              <Users size={14} /> Profils & Objectifs
            </span>
            <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-950">
              Pour celles et ceux qui veulent apprendre utile.
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
              KORYXA Formation s’adresse aux personnes qui veulent comprendre, pratiquer et terminer avec une compétence concrète, pas simplement consommer des heures de vidéos.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link
                href="/formations"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
              >
                Explorer nos 8 formations <ArrowRight size={17} />
              </Link>
              <Link
                href="/methode"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#dfe5d8] bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-[#faf9f5]"
              >
                Comprendre la méthode
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[#dfe5d8] bg-white p-7 sm:p-8 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a86b]/10 text-[#008b58]">
              <Sparkles size={22} />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold text-slate-950">Vous vous reconnaîtrez ici si…</h2>
            <div className="mt-6 grid gap-2.5">
              {signals.slice(0, 4).map((signal) => (
                <div key={signal} className="flex items-center gap-3 rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-3.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00a86b]" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <Users size={14} /> 4 Profils Types
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Des parcours adaptés à votre niveau et à vos ambitions.
            </h2>
            <p className="mx-auto mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Le point de départ importe peu : ce qui fait la différence, c’est votre volonté de coder et de construire des compétences valorisables.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {profiles.map(({ title, description, icon: Icon, examples }) => (
              <article key={title} className="rounded-3xl border border-[#dfe5d8] bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#00a86b] hover:shadow-xl sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00a86b]/15 text-[#008b58]">
                  <Icon size={26} />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">{description}</p>
                <div className="mt-6 grid gap-2.5">
                  {examples.map((example) => (
                    <div key={example} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-[#faf9f5] px-4 py-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00a86b]" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{example}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dfe5d8] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              3 cas d’usage majeurs
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div key={uc.title} className="rounded-3xl border border-[#dfe5d8] bg-[#faf9f5] p-7 transition hover:border-[#00a86b] hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a86b]/15 text-[#008b58]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-slate-950">{uc.title}</h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">{uc.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/formations"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-8 py-4 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:bg-[#008b58]"
            >
              Explorer les 8 parcours du catalogue <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
