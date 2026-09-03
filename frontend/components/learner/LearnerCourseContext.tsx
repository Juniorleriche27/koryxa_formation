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
    <section aria-label="Contexte du parcours" className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-2xl">
      <div className={`kx-container ${compact ? "py-2.5" : "py-3"}`}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-base font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              title="Retour à tous mes parcours"
            >
              K
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-400">
                  {courseSlug === "llm-rag" ? "Parcours IA" : "Parcours actif"}
                </span>
                <Link
                  href="/dashboard"
                  className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold text-slate-300 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  title="Voir toutes les formations"
                >
                  Tous les parcours
                </Link>
              </div>
              <p className="truncate text-sm font-black text-white sm:text-base">{course.title}</p>
            </div>
          </div>

          <nav aria-label="Navigation du parcours" className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Link
              href={courseRoutes.dashboard(courseSlug)}
              className={`inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                current === "overview" ? "bg-white text-slate-950 shadow-sm" : "bg-white/[0.06] text-slate-200 hover:bg-white/10"
              }`}
            >
              <LayoutDashboard size={14} />
              <span>Tableau de bord</span>
            </Link>
            <Link
              href={courseRoutes.modules(courseSlug)}
              aria-current={current === "overview" ? "page" : undefined}
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-white/[0.06] px-3 text-xs font-bold text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Layers3 size={14} />
              <span>Modules</span>
            </Link>
            <Link
              href={`/certificate?course=${encodeURIComponent(courseSlug)}`}
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-white/[0.06] px-3 text-xs font-bold text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Medal size={14} />
              <span className="hidden sm:inline">Certificat</span>
            </Link>
            <KoryxaUserNav />
            <KoryxaUserNav variant="mobileHeader" />
          </nav>
        </div>

        {!compact && total > 0 && (
          <div className="mt-3 border-t border-white/5 pt-2" aria-label={`Progression ${percentage}%`}>
            <div className="mb-1.5 flex items-center justify-between gap-4 text-[11px] font-bold text-slate-400">
              <span>{completed} sur {total} modules validés</span>
              <span className="font-mono text-emerald-400">{percentage}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
