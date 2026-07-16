import { Brain, CheckCircle2, CircleHelp, Flag, ListChecks, ShieldCheck } from "lucide-react";

const formats = [
  {
    title: "QCM",
    description: "Vérifier les notions, l’architecture et les choix techniques.",
    icon: ListChecks,
  },
  {
    title: "Vrai / faux",
    description: "Repérer rapidement une idée fausse ou une mauvaise pratique.",
    icon: CheckCircle2,
  },
  {
    title: "Compréhension",
    description: "Expliquer le rôle d’un composant ou diagnostiquer une situation.",
    icon: Brain,
  },
  {
    title: "Mini-défi",
    description: "Choisir la meilleure action dans un cas concret de projet RAG.",
    icon: Flag,
  },
] as const;

export function LlmRagQuizPreview() {
  return (
    <section className="bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]">
            <CircleHelp size={14} /> Quiz et validations
          </span>
          <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl">
            Valider la compréhension avant de débloquer la suite.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Chaque module possède une validation courte. Après soumission, l’apprenant reçoit la bonne réponse, une explication et les notions à revoir.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-[1.5rem] border border-[#06251c]/10 bg-white p-5 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#06251c] text-[#bcf5d7]">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-black tracking-[-0.02em] text-[#06251c]">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.75rem] bg-[#00bd72] p-6 text-[#06251c]">
            <p className="text-xs font-black uppercase tracking-[0.16em]">Seuil de réussite</p>
            <p className="mt-3 text-5xl font-black tracking-[-0.06em]">12/20</p>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#06251c]/75">
              Une validation réussie débloque le module suivant. Une tentative échouée recommande les parties à revoir.
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-[#06251c] p-6 text-white">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#bcf5d7]" />
              <div>
                <p className="font-black">Réponses protégées avant soumission</p>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  L’API publique du quiz ne renvoie jamais la bonne réponse. Les corrections détaillées apparaissent uniquement après l’enregistrement de la tentative.
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4 text-sm leading-7 text-white/70">
              Le dernier module contient également un test final de connaissances avant la remise du projet.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
