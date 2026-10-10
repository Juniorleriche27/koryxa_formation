"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Clock3, Compass, Layers3, Lock, RefreshCw, Trophy } from "lucide-react";
import { getApiErrorMessage, modulesAPI, validationAPI } from "@/lib/api";
import { DEFAULT_COURSE_SLUG, EXCEL_DATA_ANALYST_COURSE_SLUG, POWER_BI_DATA_ANALYST_COURSE_SLUG, SQL_DATA_ANALYST_COURSE_SLUG, LLM_RAG_COURSE_SLUG, courseCatalog, courseRoutes, readCourseSlug } from "@/lib/courseConfig";
import type { Module, ModuleStatus } from "@/types";
import Footer from "@/components/layout/Footer";
import LearnerCourseContext from "@/components/learner/LearnerCourseContext";

type ModuleWithStatus = Module & { validation?: ModuleStatus };

function statusCopy(status?: ModuleStatus) {
  if (!status) return { label: "Disponible", className: "bg-blue-50 text-blue-700 border-blue-200" };
  if (status.is_validated) return { label: "Validé", className: "bg-emerald-50 text-[#008b58] border-emerald-200" };
  if (status.status === "locked") return { label: "À débloquer", className: "bg-slate-100 text-slate-600 border-slate-200" };
  if (status.status === "quiz_failed") return { label: "QCM à refaire", className: "bg-amber-50 text-amber-700 border-amber-200" };
  if (status.status === "in_progress") return { label: "En cours", className: "bg-cyan-50 text-cyan-700 border-cyan-200" };
  return { label: "Disponible", className: "bg-blue-50 text-blue-700 border-blue-200" };
}

export default function ModulesPage() {
  const [courseSlug, setCourseSlug] = useState(DEFAULT_COURSE_SLUG);
  const [modules, setModules] = useState<Module[]>([]);
  const [statuses, setStatuses] = useState<ModuleStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusWarning, setStatusWarning] = useState("");

  useEffect(() => {
    async function loadModules() {
      const requestedCourse = readCourseSlug(window.location.search);
      setCourseSlug(requestedCourse);
      setLoading(true);
      setError("");
      setStatusWarning("");

      try {
        const [modulesResponse, statusResponse] = await Promise.allSettled([
          modulesAPI.getAll(requestedCourse),
          validationAPI.getModuleStatuses(requestedCourse),
        ]);

        if (modulesResponse.status === "fulfilled") {
          setModules(modulesResponse.value.data);
        } else {
          throw modulesResponse.reason;
        }

        if (statusResponse.status === "fulfilled") {
          setStatuses(statusResponse.value.data.modules || []);
        } else {
          setStatusWarning(getApiErrorMessage(statusResponse.reason));
        }
      } catch {
        setError("Impossible de charger les modules. Réessaie plus tard.");
      } finally {
        setLoading(false);
      }
    }

    loadModules();
  }, []);

  const modulesWithStatus: ModuleWithStatus[] = useMemo(() => {
    const byId = new Map(statuses.map((status) => [status.module_id, status]));
    return modules.map((module) => ({ ...module, validation: byId.get(module.id) }));
  }, [modules, statuses]);

  const validatedCount = modulesWithStatus.filter((module) => module.validation?.is_validated).length;
  const totalPlatformPoints = modulesWithStatus.reduce((total, module) => total + Number(module.validation?.platform_points_awarded || 0), 0);
  const courseMeta = courseCatalog[courseSlug as keyof typeof courseCatalog] ?? courseCatalog[DEFAULT_COURSE_SLUG];
  const dedicatedLearnerLayout = courseSlug !== DEFAULT_COURSE_SLUG;

  return (
    <div className="min-h-screen bg-[#faf9f5] text-slate-950 flex flex-col antialiased">
      <LearnerCourseContext courseSlug={courseSlug} completed={validatedCount} total={modules.length} current="module" />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-[#dfe5d8] bg-white">
          <div className="kx-container relative py-8 sm:py-12 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                  {courseMeta.title}
                </span>
                <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                  Avancez dans l&apos;ordre, validez chaque étape.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                  Chaque module se débloque après validation du précédent. Progressez à votre rythme et reprenez toujours au dernier point atteint.
                </p>
              </div>

              <div className="grid gap-3 rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-5 shadow-xs">
                <div className="flex items-center gap-3">
                  <Compass className="h-7 w-7 text-[#00a86b]" />
                  <div>
                    <p className="text-3xl font-black text-slate-950">{modules.length || "—"}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">modules du parcours</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl bg-white p-3 border border-[#dfe5d8]">
                    <p className="text-2xl font-black text-[#008b58]">{validatedCount}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">validés</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 border border-[#dfe5d8]">
                    <p className="text-2xl font-black text-slate-950">{totalPlatformPoints}/40</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">score plateforme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kx-container py-8 sm:py-12">
          {loading && (
            <div aria-live="polite" aria-busy="true" className="rounded-2xl border border-[#dfe5d8] bg-white px-6 py-16 text-center text-slate-600 shadow-xs">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mx-auto h-8 w-8 rounded-full border-2 border-[#00a86b] border-t-transparent" />
              <p className="mt-4 font-bold text-slate-950">Chargement du parcours…</p>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 shadow-xs">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-red-600" />
                <div>
                  <p className="text-lg font-bold">{error}</p>
                  <p className="mt-2 text-sm leading-relaxed text-red-700">Le serveur est peut-être en cours de réveil. Veuillez réessayer dans quelques secondes.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <RefreshCw size={16} /> Réessayer
              </button>
            </div>
          )}

          {statusWarning && !error && (
            <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-xs">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="font-bold">Progression certifiante temporairement indisponible.</p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-700">Les modules restent accessibles, mais les statuts de validation peuvent mettre un instant à s&apos;actualiser.</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && modulesWithStatus.length === 0 && (
            <div className="rounded-2xl border border-[#dfe5d8] bg-white p-12 text-center text-slate-500 shadow-xs">
              <p className="text-base font-bold text-slate-900">Aucun module disponible.</p>
              <p className="mt-1 text-xs text-slate-500">Les modules de ce parcours seront bientôt publiés.</p>
            </div>
          )}

          {!loading && !error && modulesWithStatus.length > 0 && (
            <div className="grid gap-4">
              {modulesWithStatus.map((module, index) => {
                const validation = module.validation;
                const accessible = validation?.is_accessible ?? module.order_index === 0;
                const fallbackLocked = !validation && module.order_index > 0;
                const copy = statusCopy(validation || (fallbackLocked ? {
                  module_id: module.id,
                  order_index: module.order_index,
                  title: module.title,
                  status: "locked",
                  is_accessible: false,
                  is_validated: false,
                } as ModuleStatus : undefined));

                const cardClass = accessible
                  ? "group grid gap-5 rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-[#00a86b]/60 hover:shadow-md md:grid-cols-[4.5rem_1fr_auto] md:items-center sm:p-6"
                  : "grid gap-5 rounded-2xl border border-[#dfe5d8] bg-[#faf9f5]/70 p-5 opacity-75 md:grid-cols-[4.5rem_1fr_auto] md:items-center sm:p-6";

                const content = (
                  <>
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black ${accessible ? "bg-[#00a86b]/10 text-[#008b58] border border-emerald-200" : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                      {accessible ? module.order_index : <Lock size={20} />}
                    </div>

                    <div className="min-w-0">
                      <div className="mb-2.5 flex flex-wrap items-center gap-2">
                        <span className="rounded-lg border border-emerald-200 bg-[#faf9f5] px-2.5 py-0.5 text-xs font-bold text-[#008b58]">
                          Module {module.order_index}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${copy.className}`}>
                          {validation?.is_validated && <CheckCircle2 size={13} />}
                          {validation?.status === "quiz_failed" && <RefreshCw size={13} />}
                          {validation?.status === "locked" && <Lock size={13} />}
                          {copy.label}
                        </span>
                        {module.duration && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                            <Clock3 size={13} className="text-[#00a86b]" /> {module.duration}
                          </span>
                        )}
                        {validation?.quiz_best_score != null && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700">
                            <Trophy size={13} /> QCM {validation.quiz_best_score}/20
                          </span>
                        )}
                      </div>

                      <h2 className={`font-serif text-lg font-bold transition ${accessible ? "text-slate-950 group-hover:text-[#008b58]" : "text-slate-600"}`}>
                        {module.title}
                      </h2>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                        {module.description}
                      </p>
                      {!accessible && (
                        <p className="mt-2 text-xs font-semibold text-slate-500">
                          Validez le module précédent pour débloquer automatiquement cette étape.
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4 md:justify-end">
                      <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${accessible ? "bg-[#00a86b] text-white group-hover:bg-[#008b58] shadow-xs" : "bg-slate-200 text-slate-500"}`}>
                        {accessible ? "Ouvrir" : "Bloqué"} {accessible ? <ArrowRight size={14} /> : <Lock size={14} />}
                      </span>
                      {accessible && <ChevronRight className="hidden text-slate-400 transition group-hover:text-[#008b58] md:block" size={18} />}
                    </div>
                  </>
                );

                return (
                  <motion.div key={module.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                    {accessible ? (
                      <Link href={courseRoutes.module(module.id, courseSlug)} className={cardClass}>
                        {content}
                      </Link>
                    ) : (
                      <div className={cardClass} aria-disabled="true">
                        {content}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
