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
      <div className="min-h-screen bg-[#faf9f5] text-slate-950 flex flex-col antialiased">
        {/* Header KORYXA Hub */}
        <header className="sticky top-0 z-50 border-b border-[#dfe5d8] bg-white/95 backdrop-blur-md">
          <div className="kx-container flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
              <div className="flex flex-col">
                <span className="font-serif text-lg font-black tracking-tight text-slate-950 leading-none">
                  KORYXA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#008b58] leading-tight">
                  Pôle Formation
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-[#008b58]">
                Espace Apprenant Central
              </span>
              <KoryxaUserNav />
              <KoryxaUserNav variant="mobileHeader" />
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Hub */}
          <section className="relative overflow-hidden border-b border-[#dfe5d8] bg-white py-12 sm:py-16">
            <div className="kx-container relative text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                <GraduationCap size={14} /> Espace Apprenant
              </span>
              <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                Vos parcours de formation KORYXA
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Sélectionnez le parcours que vous souhaitez travailler pour accéder directement à vos leçons, vos laboratoires interactifs et vos certifications.
              </p>
            </div>
          </section>

          {/* Grille des parcours */}
          <section className="kx-container py-10 sm:py-14">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Catalogue certifiant</p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-slate-950">Choisissez votre parcours actif</h2>
              </div>
              <span className="rounded-full border border-[#dfe5d8] bg-white px-3.5 py-1 text-xs font-semibold text-slate-600">
                {coursesList.length} formations certifiantes
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {coursesList.map(([slug, course]) => (
                <div
                  key={slug}
                  className="group flex flex-col justify-between rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-xs transition hover:-translate-y-0.5 hover:border-[#00a86b]/60 hover:shadow-md"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                        <GraduationCap size={20} />
                      </span>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#008b58]">
                        Certifiant
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-slate-950 transition group-hover:text-[#008b58]">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#dfe5d8] pt-4">
                    <Link
                      href={courseRoutes.dashboard(slug)}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-4 text-xs font-bold text-white shadow-xs transition hover:bg-[#008b58]"
                    >
                      <span>Entrer dans la formation</span>
                      <ArrowRight size={14} />
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
    <div className="min-h-screen bg-[#faf9f5] text-slate-950 flex flex-col antialiased">
      {/* Header contextualisé du parcours */}
      <LearnerCourseContext courseSlug={courseSlug} completed={completedCount} total={modules.length} current="overview" />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-[#dfe5d8] bg-white">
          <div className="kx-container relative py-8 sm:py-12 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                  Tableau de bord apprenant
                </span>
                <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                  {`Continuez votre parcours ${courseMeta.title}.`}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                  Reprenez au bon endroit, suivez votre progression et avancez module par module jusqu&apos;à l&apos;obtention de votre certificat officiel KORYXA.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {nextModule && (
                    <Link
                      href={courseRoutes.module(nextModule.id, courseSlug)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
                    >
                      Reprendre le prochain module <ArrowRight size={16} />
                    </Link>
                  )}
                  <Link
                    href={courseRoutes.modules(courseSlug)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] px-6 py-3 text-sm font-bold text-slate-800 shadow-xs transition hover:bg-white"
                  >
                    Voir tous les modules
                  </Link>
                </div>
              </div>

              <aside className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-5 shadow-xs">
                <div className="rounded-xl bg-white border border-[#dfe5d8] p-5 shadow-xs">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                    <Flame size={16} className="text-amber-500" /> Étape recommandée
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-slate-950 tracking-tight">
                    {nextModule ? nextModule.title : "Chargement du parcours"}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {nextModule ? nextModule.description : "Préparation de votre espace apprenant."}
                  </p>
                  {nextModule && (
                    <Link
                      href={courseRoutes.module(nextModule.id, courseSlug)}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#00a86b]"
                    >
                      Ouvrir ce module <ArrowRight size={14} />
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
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Modules du programme</p>
                  <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-slate-950">Progression étape par étape</h2>
                </div>
                <Link
                  href={courseRoutes.modules(courseSlug)}
                  className="text-xs font-bold text-[#008b58] transition hover:underline"
                >
                  Voir le parcours complet →
                </Link>
              </div>

              {recentModules.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {recentModules.map((module) => (
                    <ModuleCard key={module.id} module={module} completed={isCompleted(module.id)} courseSlug={courseSlug} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-[#dfe5d8] bg-white p-8 text-center shadow-xs">
                  <BookOpen className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="mt-3 text-base font-bold text-slate-950">Préparation des modules…</p>
                  <p className="mt-1 text-xs text-slate-500">Le parcours apparaîtra ici dès que les modules seront chargés.</p>
                </div>
              )}
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-xs">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                  <Sparkles size={18} />
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-950">Méthode KORYXA</h3>
                <div className="mt-4 space-y-2.5">
                  {["1. Lire le cours structuré", "2. Pratiquer dans le lab", "3. Tester sa compréhension", "4. Valider le projet final"].map((step) => (
                    <div key={step} className="flex items-center gap-2.5 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-2.5 text-xs font-semibold text-slate-700">
                      <CheckCircle2 size={15} className="text-[#00a86b] shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-slate-950">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                  <CheckCircle2 size={16} className="text-[#00a86b]" />
                  <span>Objectif Certificat</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                  Chaque module validé vous rapproche du certificat d&apos;achèvement officiel vérifiable KORYXA, valorisable sur LinkedIn et votre CV.
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
