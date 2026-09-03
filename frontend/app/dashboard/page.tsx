"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Flame, GraduationCap, Layers, Sparkles } from "lucide-react";
import { modulesAPI } from "@/lib/api";
import { courseCatalog, courseRoutes, readCourseSlug, DEFAULT_COURSE_SLUG, type CourseSlug } from "@/lib/courseConfig";
import { useProgress } from "@/hooks/useProgress";
import type { Module } from "@/types";
import ProgressBar from "@/components/dashboard/ProgressBar";
import Stats from "@/components/dashboard/Stats";
import ModuleCard from "@/components/modules/ModuleCard";
import LearnerCourseContext from "@/components/learner/LearnerCourseContext";
import Footer from "@/components/layout/Footer";
import KoryxaUserNav from "@/components/auth/KoryxaUserNav";

export default function DashboardPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [courseSlug, setCourseSlug] = useState<string>(DEFAULT_COURSE_SLUG);
  const [hasExplicitCourse, setHasExplicitCourse] = useState(false);
  const { isCompleted } = useProgress();

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const explicit = params.has("course") && Boolean(params.get("course")?.trim());
    setHasExplicitCourse(explicit);

    const selectedCourse = readCourseSlug(window.location.search);
    setCourseSlug(selectedCourse);

    if (explicit) {
      modulesAPI
        .getAll(selectedCourse)
        .then((response) => setModules(response.data))
        .catch(() => undefined);
    }
  }, []);

  const completedCount = modules.filter((module) => isCompleted(module.id)).length;
  const completion = modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0;
  const nextModule = useMemo(() => modules.find((module) => !isCompleted(module.id)) || modules[0], [modules, isCompleted]);
  const recentModules = modules.slice(0, 6);
  const courseMeta = courseCatalog[courseSlug as keyof typeof courseCatalog] ?? courseCatalog[DEFAULT_COURSE_SLUG];

  // Vue 1 : Hub général quand aucun cours n'est précisé dans l'URL
  if (!hasExplicitCourse) {
    const coursesList = Object.entries(courseCatalog);

    return (
      <div className="kx-dark-page flex min-h-screen flex-col">
        {/* Header unique KORYXA Hub */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-2xl">
          <div className="kx-container flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20">
                K
              </span>
              <div>
                <span className="block text-sm font-black text-white sm:text-base">KORYXA Formation</span>
                <span className="block text-[11px] font-bold text-emerald-400">Espace Apprenant Central</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <KoryxaUserNav />
              <KoryxaUserNav variant="mobileHeader" />
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Hub */}
          <section className="relative overflow-hidden border-b border-white/10 py-10 sm:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(16,185,129,0.22),transparent_32rem),radial-gradient(circle_at_82%_20%,rgba(59,130,246,0.15),transparent_28rem)]" />
            <div className="kx-container relative">
              <span className="kx-dark-eyebrow">Espace Apprenant</span>
              <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">
                Vos parcours de formation KORYXA
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Sélectionnez la formation que vous souhaitez travailler pour accéder à vos modules d’apprentissage, vos notebooks interactifs et vos certifications.
              </p>
            </div>
          </section>

          {/* Grille des parcours */}
          <section className="kx-container py-10 sm:py-14">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">Catalogue disponible</p>
                <h2 className="mt-1 text-2xl font-black text-white">Choisissez votre parcours</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-slate-400">
                {coursesList.length} parcours
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {coursesList.map(([slug, course]) => (
                <div
                  key={slug}
                  className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-white/[0.07]"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20">
                        <GraduationCap size={20} />
                      </span>
                      <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-300">
                        Certifiant
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white transition group-hover:text-emerald-300">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-4">
                    <Link
                      href={courseRoutes.dashboard(slug)}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 text-sm font-black text-slate-950 shadow-md shadow-emerald-500/20 transition hover:bg-emerald-400"
                    >
                      <span>Entrer dans la formation</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Vue 2 : Espace dédié au parcours choisi (ex: ?course=python-data-analyst)
  return (
    <div className="kx-dark-page flex flex-col">
      {/* Header unique du parcours — aucun doublon */}
      <LearnerCourseContext courseSlug={courseSlug} completed={completedCount} total={modules.length} current="overview" />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(59,130,246,0.25),transparent_34rem),radial-gradient(circle_at_82%_20%,rgba(20,184,166,0.12),transparent_28rem)]" />
          <div className="kx-container relative py-8 sm:py-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
              <div>
                <span className="kx-dark-eyebrow">Espace apprenant</span>
                <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">
                  {`Continue ton parcours ${courseMeta.title} avec clarté.`}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Reprends au bon endroit, suis ta progression et avance module par module jusqu’au certificat.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {nextModule && (
                    <Link href={courseRoutes.module(nextModule.id, courseSlug)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-black text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-emerald-400">
                      Reprendre le prochain module <ArrowRight size={18} />
                    </Link>
                  )}
                  <Link href={courseRoutes.modules(courseSlug)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10">
                    Voir tous les modules
                  </Link>
                </div>
              </div>

              <aside className="rounded-3xl border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
                <div className="rounded-2xl bg-white p-5 text-slate-950 shadow-soft">
                  <p className="flex items-center gap-2 text-sm font-black"><Flame size={17} className="text-orange-500" /> Priorité du jour</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight">{nextModule ? nextModule.title : "Chargement du parcours"}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {nextModule ? nextModule.description : "Préparation de ton espace apprenant."}
                  </p>
                  {nextModule && (
                    <Link href={courseRoutes.module(nextModule.id, courseSlug)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-600">
                      Ouvrir maintenant <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="kx-container py-8 sm:py-12">
          <Stats totalModules={modules.length} completedModules={completedCount} percentage={completion} />
          <div className="mt-6">
            <ProgressBar percentage={completion} />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem]">
            <div>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">Modules recommandés</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Continue dans l’ordre</h2>
                </div>
                <Link href={courseRoutes.modules(courseSlug)} className="text-sm font-black text-blue-200 transition hover:text-white">Voir le parcours complet →</Link>
              </div>

              {recentModules.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {recentModules.map((module) => (
                    <ModuleCard key={module.id} module={module} completed={isCompleted(module.id)} courseSlug={courseSlug} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                  <BookOpen className="mx-auto h-10 w-10 text-blue-200" />
                  <p className="mt-4 text-lg font-black text-white">Préparation des modules…</p>
                  <p className="mt-2 text-sm text-slate-400">Le parcours apparaîtra ici dès que les modules seront chargés.</p>
                </div>
              )}
            </div>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                <Sparkles className="h-6 w-6 text-cyan-200" />
                <h3 className="mt-4 text-lg font-black text-white">Méthode KORYXA</h3>
                <div className="mt-4 space-y-3">
                  {["Lire", "Exécuter", "Comprendre", "Valider"].map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400/10 text-sm font-black text-blue-200 ring-1 ring-blue-300/20">{index + 1}</span>
                      <span className="text-sm font-bold text-slate-200">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5 text-emerald-100 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                <CheckCircle2 className="h-6 w-6" />
                <h3 className="mt-4 text-lg font-black">Objectif certificat</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/80">
                  Termine les modules, valide les quiz et garde une progression propre jusqu’au certificat.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
