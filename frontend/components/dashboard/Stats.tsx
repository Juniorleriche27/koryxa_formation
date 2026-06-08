import { Award, BookOpenCheck, Target } from "lucide-react";

interface StatsProps {
  totalModules: number;
  completedModules: number;
  percentage: number;
}

export default function Stats({ totalModules, completedModules, percentage }: StatsProps) {
  const stats = [
    { label: "Modules terminés", value: `${completedModules} / ${totalModules}`, icon: BookOpenCheck, hint: "Parcours validé" },
    { label: "Progression", value: `${percentage}%`, icon: Target, hint: "Objectif certificat" },
    { label: "Modules restants", value: Math.max(totalModules - completedModules, 0), icon: Award, hint: "Prochaine étape" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-white">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-200/80">{stat.hint}</p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-200 ring-1 ring-blue-300/20">
              <stat.icon size={20} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
