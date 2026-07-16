import { ArrowRight, BookOpenCheck, BrainCircuit, Database, FileSearch, Network, ShieldCheck } from "lucide-react";

const glossary = [
  ["LLM", "Modèle qui génère du texte token après token."],
  ["RAG", "Recherche documentaire suivie d’une génération fondée sur les passages retrouvés."],
  ["Chunk", "Segment de document utilisé pour l’indexation et la recherche."],
  ["Embedding", "Vecteur numérique représentant le sens d’un texte."],
  ["Métadonnée", "Information qui permet d’identifier et de filtrer une source."],
  ["Prompt système", "Règles prioritaires qui encadrent le comportement du modèle."],
] as const;

const flow = [
  [FileSearch, "Documents"],
  [BookOpenCheck, "Chunks"],
  [Network, "Embeddings"],
  [Database, "Qdrant"],
  [BrainCircuit, "Réponse sourcée"],
] as const;

export function LlmRagTheoryPreview() {
  return (
    <section className="bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]">
            <BookOpenCheck size={14} /> Supports théoriques
          </span>
          <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl">
            Comprendre chaque concept avant de l’implémenter.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Le parcours comprend des fiches théoriques, un glossaire, des schémas et des aide-mémoires utilisables pendant les exercices.
          </p>
        </div>

        <div className="mt-12 rounded-[2rem] border border-[#06251c]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {flow.map(([Icon, label], index) => (
              <div key={label} className="flex flex-1 items-center gap-4 lg:flex-col lg:text-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#bcf5d7] text-[#06251c]">
                  <Icon size={22} />
                </span>
                <span className="text-sm font-black text-[#06251c]">{label}</span>
                {index < flow.length - 1 && <ArrowRight className="ml-auto h-5 w-5 text-[#00bd72] lg:ml-0 lg:rotate-0" />}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {glossary.map(([term, definition]) => (
            <article key={term} className="rounded-[1.5rem] border border-[#06251c]/10 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black tracking-[-0.02em] text-[#06251c]">{term}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{definition}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm leading-7">
            Les supports complets restent non publiés jusqu’à la recette du parcours. Cette prévisualisation montre uniquement le niveau de structuration prévu.
          </p>
        </div>
      </div>
    </section>
  );
}
