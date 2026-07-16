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
  description: "Découvrez à qui s’adressent les parcours pratiques KORYXA Formation.",
};

const profiles = [
  {
    title: "Débutants motivés",
    description: "Vous partez de zéro ou presque, mais vous voulez apprendre avec une progression claire et un résultat concret.",
    icon: GraduationCap,
    examples: ["Découvrir un nouveau métier", "Acquérir une base solide", "Éviter les parcours trop théoriques"],
  },
  {
    title: "Professionnels en évolution",
    description: "Vous souhaitez ajouter la data, l’IA ou l’automatisation à votre métier actuel sans reprendre des études longues.",
    icon: BriefcaseBusiness,
    examples: ["Gagner en autonomie", "Moderniser ses méthodes", "Créer un avantage professionnel"],
  },
  {
    title: "Entrepreneurs et indépendants",
    description: "Vous avez besoin de construire des outils utiles pour vendre, analyser, automatiser ou mieux piloter votre activité.",
    icon: Rocket,
    examples: ["Automatiser une tâche", "Créer un assistant métier", "Comprendre ses données"],
  },
  {
    title: "Curieux orientés projet",
    description: "Vous apprenez mieux en construisant qu’en regardant des heures de contenu sans application immédiate.",
    icon: Lightbulb,
    examples: ["Créer un portfolio", "Tester une idée", "Apprendre en pratiquant"],
  },
];

const signals = [
  "Vous voulez comprendre sans jargon inutile.",
  "Vous préférez apprendre avec des exemples concrets.",
  "Vous avez besoin d’un résultat visible à la fin.",
  "Vous voulez progresser à votre rythme, sans perdre le fil.",
  "Vous cherchez une compétence réellement exploitable.",
  "Vous êtes prêt à pratiquer, pas seulement à regarder.",
];

const useCases = [
  {
    title: "Changer de trajectoire",
    text: "Construire une première compétence crédible et un projet à montrer pour préparer une évolution professionnelle.",
    icon: Compass,
  },
  {
    title: "Renforcer son métier",
    text: "Ajouter une compétence complémentaire à votre activité actuelle pour gagner en autonomie et en efficacité.",
    icon: Workflow,
  },
  {
    title: "Lancer un projet",
    text: "Transformer une idée en prototype, analyse ou automatisation utile, sans attendre de tout maîtriser.",
    icon: Target,
  },
];

export default function PourQuiPage() {
  return (
    <main className="kx-marketing min-h-screen bg-white pt-16 text-slate-950 lg:pt-20">
      <Header />

      <section className="relative overflow-hidden bg-[#06251c] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(188,245,215,.18),transparent_23rem),radial-gradient(circle_at_82%_20%,rgba(0,189,114,.14),transparent_28rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.75fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bcf5d7]/30 bg-[#bcf5d7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
              <Users size={14} /> Pour qui
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Pour celles et ceux qui veulent apprendre utile.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/72 sm:text-lg">
              KORYXA Formation s’adresse aux personnes qui veulent comprendre, pratiquer et terminer avec une compétence concrète, pas simplement consommer du contenu.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/formations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:-translate-y-0.5 hover:bg-[#bcf5d7]">
                Voir les formations <ArrowRight size={17} />
              </Link>
              <Link href="/methode" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/14">
                Comprendre la méthode
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/8 p-6 backdrop-blur-xl sm:p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#bcf5d7] text-[#06251c]">
              <Sparkles size={22} />
            </span>
            <h2 className="mt-6 text-2xl font-black tracking-[-0.04em]">Vous vous reconnaîtrez ici si…</h2>
            <div className="mt-6 grid gap-3">
              {signals.slice(0, 4).map((signal) => (
                <div key={signal} className="flex gap-3 rounded-2xl border border-white/8 bg-white/6 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00bd72]" />
                  <p className="text-sm font-bold leading-6 text-white/78">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]">
              <Users size={14} /> Profils
            </span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl lg:text-6xl">
              Plusieurs profils. Une même exigence de résultat.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Le niveau de départ peut changer. Ce qui compte, c’est votre volonté de pratiquer et d’aller jusqu’au bout d’un projet utile.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {profiles.map(({ title, description, icon: Icon, examples }) => (
              <article key={title} className="rounded-[2rem] border border-[#06251c]/10 bg-white p-6 shadow-sm sm:p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#bcf5d7] text-[#06251c]">
                  <Icon size={24} />
                </span>
                <h3 className="mt-7 text-2xl font-black tracking-[-0.035em] text-[#06251c] sm:text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
                <div className="mt-6 grid gap-2.5">
                  {examples.map((example) => (
                    <div key={example} className="flex items-center gap-3 rounded-2xl bg-[#f2fbf5] px-4 py-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00bd72]" />
                      <span className="text-sm font-bold text-[#06251c]">{example}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]">
              <Target size={14} /> Cas d’usage
            </span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl">
              Vous n’avez pas besoin du même parcours pour la même raison.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {useCases.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-[1.75rem] border border-[#06251c]/10 bg-[#f5fbf7] p-6 sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#06251c] shadow-sm">
                  <Icon size={21} />
                </span>
                <h3 className="mt-6 text-xl font-black tracking-[-0.03em] text-[#06251c]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06251c] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
              <CheckCircle2 size={15} /> Vérification rapide
            </span>
            <h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-0.05em] sm:text-5xl">
              Cette approche vous convient-elle vraiment ?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/65">
              KORYXA est fait pour vous si vous cherchez une progression guidée, une pratique régulière et un résultat final concret.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {signals.map((signal) => (
              <div key={signal} className="flex gap-3 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00bd72]" />
                <p className="text-sm font-bold leading-7 text-white/80">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.25rem] bg-[#f5fbf7] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#008f58]">
              <CheckCircle2 size={15} /> Prochaine étape
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#06251c] sm:text-4xl">Choisissez le parcours qui correspond à votre objectif actuel.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Comparez les formations disponibles, leur niveau, leur format et le résultat final attendu.
            </p>
          </div>
          <Link href="/formations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:bg-[#bcf5d7]">
            Voir les formations <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
