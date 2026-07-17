import Link from "next/link";
import { ArrowLeft, BookOpenCheck, FlaskConical, GraduationCap, LayoutDashboard, Layers3 } from "lucide-react";

import { courseCatalog, courseRoutes, type CourseSlug } from "@/lib/courseConfig";

type Props = {
  courseSlug: string;
  current?: "overview" | "module";
  completed?: number;
  total?: number;
  compact?: boolean;
};

export default function LearnerCourseContext({
  courseSlug,
  current = "overview",
  completed = 0,
  total = 0,
  compact = false,
}: Props) {
  const course = courseCatalog[courseSlug as CourseSlug] ?? courseCatalog["python-data-analyst"];
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section aria-label="Contexte du parcours" className="border-b border-white/10 bg-slate-950/45 backdrop-blur-xl">
      <div className={`kx-container ${compact ? "py-3" : "py-4"}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-200 ring-1 ring-white/10">
              {courseSlug === "llm-rag" ? <FlaskConical size={20} /> : <GraduationCap size={20} />}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Parcours actif</p>
              <p className="truncate text-sm font-black text-white sm:text-base">{course.title}</p>
              <p className="truncate text-xs text-slate-400">{course.shortDescription}</p>
            </div>
          </div>

          <nav aria-label="Navigation du parcours" className="flex flex-wrap items-center gap-2">
            <Link
              href={courseRoutes.dashboard(courseSlug)}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/[0.06] px-3 text-sm font-bold text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <LayoutDashboard size={15} /> Tableau de bord
            </Link>
            <Link
              href={courseRoutes.modules(courseSlug)}
              aria-current={current === "overview" ? "page" : undefined}
              className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
                current === "overview" ? "bg-white text-slate-950" : "bg-white/[0.06] text-slate-200 hover:bg-white/10"
              }`}
            >
              <Layers3 size={15} /> Parcours
            </Link>
            <span className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold ${current === "module" ? "bg-white text-slate-950" : "bg-white/[0.04] text-slate-500"}`}>
              <BookOpenCheck size={15} /> Module
            </span>
            <Link
              href={course.landingPath}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/[0.06] px-3 text-sm font-bold text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <ArrowLeft size={15} /> Présentation
            </Link>
          </nav>
        </div>

        {!compact && total > 0 && (
          <div className="mt-4" aria-label={`Progression ${percentage}%`}>
            <div className="mb-2 flex items-center justify-between gap-4 text-xs font-bold text-slate-400">
              <span>{completed} module{completed > 1 ? "s" : ""} validé{completed > 1 ? "s" : ""} sur {total}</span>
              <span>{percentage}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all" style={{ width: `${percentage}%` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
