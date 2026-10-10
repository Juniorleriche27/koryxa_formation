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
        <div key={stat.label} className="rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-xs">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold text-[#008b58]">{stat.hint}</p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
              <stat.icon size={20} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
