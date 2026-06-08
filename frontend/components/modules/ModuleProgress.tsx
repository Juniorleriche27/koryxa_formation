import { CheckCircle2 } from "lucide-react";

interface ModuleProgressProps {
  completed: boolean;
  onComplete: () => void;
}

export default function ModuleProgress({ completed, onComplete }: ModuleProgressProps) {
  if (completed) {
    return (
      <div className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-5 text-sm font-bold text-emerald-100">
        <CheckCircle2 size={17} /> Module terminé
      </div>
    );
  }

  return (
    <button
      onClick={onComplete}
      className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white px-5 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700"
    >
      Marquer comme terminé
    </button>
  );
}
