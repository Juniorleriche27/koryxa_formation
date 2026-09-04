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
  title: "Méthode Pédagogique — KORYXA Formation",
  description: "Découvrez la méthode KORYXA : un apprentissage par l'action, des données réelles et un livrable certifiant.",
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
    description: "Vous avancez à travers des exercices guidés et des notebooks qui s’assemblent progressivement en un vrai projet.",
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
    description: "Vous apprenez à expliquer votre démarche, vos choix techniques et la valeur de ce que vous avez construit.",
    icon: Rocket,
  },
];

const outcomes = [
  "Vous comprenez ce que vous faites, au lieu de simplement recopier du code passif.",
  "Vous avancez avec une progression claire, balisée et mesurable.",
  "Vous terminez avec un projet réel directement exploitable sur votre portfolio.",
  "Vous obtenez une certification souveraine vérifiable par identifiant unique.",
];

export default function MethodePage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <Header />

      <section className="relative overflow-hidden bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#00a86b]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.75fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <Compass size={14} /> Pédagogie KORYXA
            </span>
            <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-950">
              Moins de théorie passive.<br />
              <em className="text-[#00a86b] not-italic">Plus de résultats concrets.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
              La méthode KORYXA transforme un objectif professionnel en progression guidée, puis en projet final capable de prouver ce que vous savez réellement faire.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link
                href="/formations"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:-translate-y-0.5 hover:bg-[#008b58]"
              >
                Choisir une formation <ArrowRight size={17} />
              </Link>
              <Link
                href="/pour-qui"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                Vérifier si cette méthode vous convient
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[#dfe5d8] bg-white p-7 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a86b]/15 text-[#008b58]">
              <Workflow size={22} />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold text-slate-950">La logique du parcours</h2>
            <div className="mt-6 grid gap-2.5">
              {["Objectif réel métier", "Notions essentielles & Notebooks", "Exercices guidés pas à pas", "Projet final de portfolio", "Certification KORYXA vérifiable"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-[#faf9f5] px-4 py-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00a86b] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfe5d8] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <Sparkles size={14} /> Les 5 Étapes Clés
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Une progression pensée pour vous faire terminer.
            </h2>
            <p className="mx-auto mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Chaque étape prépare la suivante. Vous savez toujours ce que vous apprenez, pourquoi vous l’apprenez et ce que cela permet de construire.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-5">
            {steps.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="rounded-3xl border border-[#dfe5d8] bg-[#faf9f5] p-6 transition hover:border-[#00a86b] hover:shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-bold text-[#008b58]">{number}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm text-[#008b58]">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="mt-6 font-serif text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f5] border-b border-[#dfe5d8] px-4 py-20 text-slate-950 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <CheckCircle2 size={15} /> Ce que vous obtenez
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Une compétence comprise, pratiquée et prouvée.
            </h2>
            <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
              La méthode KORYXA ne cherche pas à vous noyer sous des heures de vidéos passives. Elle vous amène directement à un livrable vérifiable prêt pour votre carrière.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00a86b]" />
                <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-[#dfe5d8] bg-white p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12 shadow-sm">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <CheckCircle2 size={15} /> Prochaine étape
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-black text-slate-950">
              Choisissez maintenant le parcours qui correspond à vos ambitions.
            </h2>
            <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600">
              Comparez les 8 formations certifiantes disponibles, leurs compétences clés et démarrez immédiatement.
            </p>
          </div>
          <Link
            href="/formations"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:bg-[#008b58]"
          >
            Voir les formations <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
