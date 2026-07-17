import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, FileText } from "lucide-react";
import type { Module } from "@/types";
import Badge from "@/components/ui/Badge";
import { courseRoutes } from "@/lib/courseConfig";

interface ModuleCardProps {
  module: Module;
  completed: boolean;
  courseSlug?: string;
}

export default function ModuleCard({ module, completed, courseSlug = "python-data-analyst" }: ModuleCardProps) {
  return (
    <Link
      href={courseRoutes.module(module.id, courseSlug)}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-300/35 hover:bg-white/[0.085] sm:p-6"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-cyan-400/20" />
      <div className="relative flex items-start justify-between gap-4">
        <Badge color="blue" className="bg-blue-400/10 text-blue-200 ring-blue-300/20">Module {module.order_index}</Badge>
        {completed ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-300/20">
            <CheckCircle2 size={13} /> Terminé
          </span>
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 text-slate-300 transition group-hover:bg-blue-500 group-hover:text-white">
            <ArrowRight size={16} />
          </span>
        )}
      </div>

      <div className="relative mt-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-200 ring-1 ring-blue-300/20">
          <FileText size={21} />
        </div>
        <h2 className="text-lg font-black leading-6 text-white transition group-hover:text-blue-100">{module.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{module.description}</p>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-400">
          <Clock3 size={15} className="text-cyan-300" />
          {module.duration || "Durée guidée"}
        </div>
      </div>
    </Link>
  );
}
