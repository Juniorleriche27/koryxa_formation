import { FileCheck2, KeyRound, LockKeyhole, ShieldAlert } from "lucide-react";

const controls = [
  [FileCheck2, "Documents contrôlés", "Extensions, type MIME, taille et nom de fichier sont validés avant traitement."],
  [ShieldAlert, "Prompt injection", "Le corpus est traité comme une donnée, jamais comme une instruction prioritaire."],
  [KeyRound, "Secrets protégés", "Aucune clé, configuration interne ou erreur brute ne doit apparaître dans les réponses."],
  [LockKeyhole, "Accès aux solutions", "Les solutions et contenus non publiés restent protégés derrière les contrôles d’accès."],
] as const;

export function LlmRagSecurityPreview() {
  return (
    <section className="bg-[#06251c] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
            <LockKeyhole size={14} /> Sécurité intégrée
          </span>
          <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            Protéger les documents, les utilisateurs et les réponses.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/70">
            Le parcours apprend à traiter la sécurité comme une partie du produit : validation des fichiers, refus hors contexte, secrets absents des logs et accès contrôlés.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {controls.map(([Icon, title, description]) => (
            <article key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
              <Icon className="h-6 w-6 text-[#bcf5d7]" />
              <h3 className="mt-5 text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/65">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
