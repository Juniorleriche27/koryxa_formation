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
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#06251c] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
            <Code2 size={14} /> Mise en pratique
          </span>
          <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl">
            Chaque module débouche sur une action concrète.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Les exercices utilisent des fichiers de départ, des résultats attendus, des indices progressifs et une solution séparée pour préserver l’apprentissage actif.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {exerciseTypes.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-[1.75rem] border border-[#06251c]/10 bg-[#f5fbf7] p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#bcf5d7] text-[#06251c]">
                <Icon size={22} />
              </span>
              <h3 className="mt-6 text-xl font-black tracking-[-0.03em] text-[#06251c]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] bg-[#06251c] p-6 text-white sm:p-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {examples.map(([title, description, Icon]) => (
              <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <Icon size={20} className="text-[#bcf5d7]" />
                <p className="mt-4 text-sm font-black text-white">{title}</p>
                <p className="mt-2 text-sm leading-7 text-white/65">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-[1.25rem] bg-white/[0.06] p-4 text-sm leading-7 text-white/70">
            <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[#bcf5d7]" />
            Les solutions sont stockées séparément des consignes. Elles ne seront accessibles qu’après publication et selon les règles de progression du parcours.
          </div>
        </div>
      </div>
    </section>
  );
}
