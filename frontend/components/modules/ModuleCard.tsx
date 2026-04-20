import Link from "next/link";
import { clsx } from "clsx";
import type { Module } from "@/types";
import Badge from "@/components/ui/Badge";

interface ModuleCardProps {
  module: Module;
  completed: boolean;
}

export default function ModuleCard({ module, completed }: ModuleCardProps) {
  return (
    <Link href={`/modules/${module.id}`}
      className={clsx(
        "bg-white/5 rounded-2xl p-6 border-2 transition hover:bg-white/8 block backdrop-blur-sm",
        completed ? "border-green-500/50" : "border-white/10 hover:border-blue-500/50"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <Badge color="blue">Module {module.order_index}</Badge>
        {completed && <span className="text-xs font-semibold text-green-400">✓ Terminé</span>}
      </div>
      <h2 className="text-lg font-bold text-white">{module.title}</h2>
      <p className="text-slate-400 text-sm mt-2 line-clamp-2">{module.description}</p>
      <p className="text-xs text-slate-500 mt-4">{module.duration}</p>
    </Link>
  );
}
