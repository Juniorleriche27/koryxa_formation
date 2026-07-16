import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FileCheck2,
  Layers3,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { FooterSEO, Header } from "@/components/marketing/KoryxaFormationPortal";

export const metadata = {
  title: "Méthode — KORYXA Formation",
  description: "Comprenez la méthode KORYXA : choisir, apprendre, construire et montrer.",
};

const steps = [
  {
    number: "01",
    title: "Choisir un objectif utile",
    description: "Vous partez d’un besoin concret, d’un métier ou d’un projet à accomplir, pas d’une liste de notions abstraites.",
    icon: Target,
  },
  {
    number: "02",
    title: "Comprendre l’essentiel",
    description: "Chaque notion est expliquée simplement, avec juste assez de théorie pour pouvoir agir avec confiance.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Construire par étapes",
    description: "Vous avancez à travers des exercices guidés qui s’assemblent progressivement en un vrai projet.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Produire une preuve",
    description: "Le parcours se termine par un livrable visible : analyse, prototype, automatisation ou assistant fonctionnel.",
    icon: FileCheck2,
  },
  {
    number: "05",
    title: "Savoir présenter le résultat",
    description: "Vous apprenez à expliquer votre démarche, vos choix et la valeur de ce que vous avez construit.",
    icon: Rocket,
  },
];

const outcomes = [
  "Vous comprenez ce que vous faites, au lieu de simplement recopier.",
  "Vous avancez avec une progression claire et mesurable.",
  "Vous terminez avec un résultat exploitable ou montrable.",
  "Vous pouvez réutiliser la méthode sur un autre projet.",
];

export default function MethodePage() {
  return (
    <main className="kx-marketing min-h-screen bg-white pt-16 text-slate-950 lg:pt-20">
      <Header />

      <section className="relative overflow-hidden bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(188,245,215,.65),transparent_22rem),radial-gradient(circle_at_85%_20%,rgba(0,189,114,.12),transparent_26rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.75fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]">
              <Compass size={14} /> Méthode KORYXA
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-[#06251c] sm:text-6xl lg:text-7xl">
              Apprendre moins de théorie. Construire plus de résultats.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              La méthode KORYXA transforme un objectif concret en progression guidée, puis en projet final capable de prouver ce que vous savez réellement faire.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/formations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:-translate-y-0.5 hover:bg-[#bcf5d7]">
                Choisir une formation <ArrowRight size={17} />
              </Link>
              <Link href="/pour-qui" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#06251c]/12 bg-white px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:border-[#00bd72]/40 hover:bg-[#f2fbf5]">
                Vérifier si cette méthode vous convient
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#06251c]/10 bg-white p-6 shadow-xl shadow-[#06251c]/8 sm:p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06251c] text-[#bcf5d7]">
              <Workflow size={22} />
            </span>
            <h2 className="mt-6 text-2xl font-black tracking-[-0.04em] text-[#06251c]">La logique du parcours</h2>
            <div className="mt-6 grid gap-3">
              {["Objectif réel", "Notions essentielles", "Exercices guidés", "Projet final", "Présentation du résultat"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f2fbf5] px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#bcf5d7] text-xs font-black text-[#06251c]">{index + 1}</span>
                  <span className="text-sm font-black text-[#06251c]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]">
              <Sparkles size={14} /> Les étapes
            </span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl lg:text-6xl">
              Une progression pensée pour vous faire terminer.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Chaque étape prépare la suivante. Vous savez toujours ce que vous apprenez, pourquoi vous l’apprenez et ce que cela permet de construire.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-5">
            {steps.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="rounded-[1.75rem] border border-[#06251c]/10 bg-[#f5fbf7] p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-black tracking-[0.14em] text-[#00bd72]">{number}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#06251c] shadow-sm">
                    <Icon size={18} />
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-black leading-tight tracking-[-0.03em] text-[#06251c]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06251c] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
              <CheckCircle2 size={15} /> Ce que vous obtenez
            </span>
            <h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-0.05em] sm:text-5xl">
              Une compétence comprise, pratiquée et prouvée.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/65">
              La méthode ne cherche pas à vous impressionner avec du contenu. Elle cherche à vous amener jusqu’à un résultat que vous pouvez utiliser, expliquer et améliorer.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((item) => (
              <div key={item} className="flex gap-3 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00bd72]" />
                <p className="text-sm font-bold leading-7 text-white/80">{item}</p>
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
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#06251c] sm:text-4xl">Choisissez maintenant le parcours qui correspond à votre objectif.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Comparez les formations disponibles, leur niveau et leur résultat final avant de commencer.
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
