import { Bug, Code2, FileCode2, Lightbulb, ListChecks, Trophy } from "lucide-react";

const exerciseTypes = [
  {
    title: "Exercice guidé",
    description: "Une consigne structurée avec fichiers de départ, étapes et résultat attendu.",
    icon: ListChecks,
  },
  {
    title: "Débogage",
    description: "Un pipeline volontairement cassé à diagnostiquer puis corriger proprement.",
    icon: Bug,
  },
  {
    title: "Challenge",
    description: "Un problème plus ouvert à résoudre avec justification technique et critères de réussite.",
    icon: Trophy,
  },
] as const;

const examples = [
  ["Chunking", "Comparer deux stratégies et mesurer leur impact sur le corpus.", Code2],
  ["Qdrant", "Créer une indexation idempotente et filtrable par métadonnées.", FileCode2],
  ["Prompt RAG", "Corriger un prompt vulnérable aux injections documentaires.", Bug],
] as const;

export function LlmRagExercisePreview() {
  return (
    <section className="bg-white border-t border-[#dfe5d8] px-4 py-20 text-slate-950 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#008b58]">
            <Code2 size={14} /> Mise en pratique
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-slate-950">
            Chaque module débouche sur une action concrète.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600">
            Les exercices utilisent des fichiers de départ, des résultats attendus, des indices progressifs et une solution séparée pour préserver l’apprentissage actif.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {exerciseTypes.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                <Icon size={22} />
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-[#faf9f5] p-6 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {examples.map(([title, description, Icon]) => (
              <div key={title} className="rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-sm">
                <Icon size={20} className="text-[#00a86b]" />
                <p className="mt-4 text-sm font-bold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-[#00a86b]/10 p-4 text-sm leading-relaxed text-slate-800">
            <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[#00a86b]" />
            Les solutions sont stockées séparément des consignes. Elles ne seront accessibles qu’après publication et selon les règles de progression du parcours.
          </div>
        </div>
      </div>
    </section>
  );
}
