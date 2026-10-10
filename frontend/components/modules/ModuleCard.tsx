import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, FileText } from "lucide-react";
import type { Module } from "@/types";
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
      className="group relative block overflow-hidden rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-[#00a86b]/60 hover:shadow-md sm:p-6"
    >
      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-flex items-center rounded-lg border border-emerald-200 bg-[#faf9f5] px-2.5 py-1 text-xs font-bold text-[#008b58]">
          Module {module.order_index}
        </span>
        {completed ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-[#008b58]">
            <CheckCircle2 size={13} /> Validé
          </span>
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-[#00a86b] group-hover:text-white">
            <ArrowRight size={15} />
          </span>
        )}
      </div>

      <div className="relative mt-5">
        <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
          <FileText size={18} />
        </div>
        <h2 className="text-base font-bold leading-snug text-slate-950 transition group-hover:text-[#008b58]">{module.title}</h2>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">{module.description}</p>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Clock3 size={14} className="text-[#00a86b]" />
          {module.duration || "Durée guidée"}
        </div>
      </div>
    </Link>
  );
}
