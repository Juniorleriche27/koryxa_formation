"use client";

import Link from "next/link";
import { ArrowLeft, BookOpenCheck, FlaskConical, GraduationCap, LayoutDashboard, Layers3, Medal } from "lucide-react";
import { courseCatalog, courseRoutes, type CourseSlug } from "@/lib/courseConfig";
import KoryxaUserNav from "@/components/auth/KoryxaUserNav";

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
    <section aria-label="Contexte du parcours" className="sticky top-0 z-50 border-b border-[#dfe5d8] bg-white/95 backdrop-blur-md">
      <div className={`kx-container ${compact ? "py-2.5" : "py-3"}`}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 transition hover:opacity-90"
              title="Retour au hub des parcours"
            >
              <div className="flex flex-col">
                <span className="font-serif text-lg font-black tracking-tight text-slate-950 leading-none">
                  KORYXA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#008b58] leading-tight">
                  Pôle Formation
                </span>
              </div>
            </Link>

            <div className="hidden sm:block border-l border-[#dfe5d8] pl-3 min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#008b58]">
                  {courseSlug === "llm-rag" ? "Parcours IA" : "Parcours actif"}
                </span>
                <Link
                  href="/dashboard"
                  className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100"
                  title="Voir toutes les formations"
                >
                  Tous les parcours
                </Link>
              </div>
              <p className="truncate text-xs font-bold text-slate-900 max-w-[200px] md:max-w-xs">{course.title}</p>
            </div>
          </div>

          <nav aria-label="Navigation du parcours" className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Link
              href={courseRoutes.dashboard(courseSlug)}
              className={`inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                current === "overview"
                  ? "bg-[#00a86b] text-white shadow-xs"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <LayoutDashboard size={14} />
              <span>Tableau de bord</span>
            </Link>
            <Link
              href={courseRoutes.modules(courseSlug)}
              aria-current={current === "overview" ? "page" : undefined}
              className={`inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                current === "module"
                  ? "bg-[#00a86b] text-white shadow-xs"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Layers3 size={14} />
              <span>Modules</span>
            </Link>
            <Link
              href={`/certificate?course=${encodeURIComponent(courseSlug)}`}
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Medal size={14} />
              <span className="hidden sm:inline">Certificat</span>
            </Link>
            <KoryxaUserNav />
            <KoryxaUserNav variant="mobileHeader" />
          </nav>
        </div>

        {!compact && total > 0 && (
          <div className="mt-3 border-t border-[#dfe5d8] pt-2" aria-label={`Progression ${percentage}%`}>
            <div className="mb-1.5 flex items-center justify-between gap-4 text-[11px] font-bold text-slate-500">
              <span>{completed} sur {total} modules validés</span>
              <span className="font-mono text-[#008b58]">{percentage}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
              <div
                className="h-full rounded-full bg-[#00a86b] transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
