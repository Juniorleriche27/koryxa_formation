"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Clock3, Compass, Layers3, Lock, RefreshCw, Trophy } from "lucide-react";
import { getApiErrorMessage, modulesAPI, validationAPI } from "@/lib/api";
import type { Module, ModuleStatus } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";

type ModuleWithStatus = Module & { validation?: ModuleStatus };

function statusCopy(status?: ModuleStatus) {
  if (!status) return { label: "Disponible", className: "bg-blue-400/10 text-blue-200 ring-blue-300/20" };
  if (status.is_validated) return { label: "Validé", className: "bg-emerald-400/10 text-emerald-200 ring-emerald-300/20" };
  if (status.status === "locked") return { label: "À débloquer", className: "bg-slate-400/10 text-slate-300 ring-white/10" };
  if (status.status === "quiz_failed") return { label: "QCM à refaire", className: "bg-amber-400/10 text-amber-200 ring-amber-300/20" };
  if (status.status === "in_progress") return { label: "En cours", className: "bg-cyan-400/10 text-cyan-200 ring-cyan-300/20" };
  return { label: "Disponible", className: "bg-blue-400/10 text-blue-200 ring-blue-300/20" };
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [statuses, setStatuses] = useState<ModuleStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorDetails, setErrorDetails] = useState("");
  const [statusWarning, setStatusWarning] = useState("");

  useEffect(() => {
    async function loadModules() {
      setLoading(true);
      setError("");
      setErrorDetails("");
      setStatusWarning("");

      try {
        const [modulesResponse, statusResponse] = await Promise.allSettled([
          modulesAPI.getAll(),
          validationAPI.getModuleStatuses(),
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
      } catch (err) {
        setError("Impossible de charger les modules. Réessaie plus tard.");
        setErrorDetails(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    loadModules();
  }, []);

  const modulesWithStatus = useMemo<ModuleWithStatus[]>(() => {
    const byId = new Map(statuses.map((status) => [status.module_id, status]));
    return modules.map((module) => ({ ...module, validation: byId.get(module.id) }));
  }, [modules, statuses]);

  const validatedCount = modulesWithStatus.filter((module) => module.validation?.is_validated).length;
  const totalPlatformPoints = modulesWithStatus.reduce((total, module) => total + Number(module.validation?.platform_points_awarded || 0), 0);

  return (
    <div className="kx-dark-page flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.25),transparent_34rem),radial-gradient(circle_at_82%_18%,rgba(14,165,233,0.12),transparent_28rem)]" />
          <div className="kx-container relative py-8 sm:py-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
              <div>
                <span className="kx-dark-eyebrow">Parcours certifiant</span>
                <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">
                  Avance dans le bon ordre, valide chaque étape.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Chaque module se débloque après validation du précédent. Les QCM réussis à partir de 12/20 alimentent ton score plateforme sur 40 points.
                </p>
              </div>
              <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Compass className="h-7 w-7 text-blue-200" />
                  <div>
                    <p className="text-3xl font-black text-white">{modules.length || "—"}</p>
                    <p className="text-sm font-semibold text-slate-400">modules du parcours</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
                    <p className="text-2xl font-black text-emerald-200">{validatedCount}</p>
                    <p className="text-xs font-bold text-slate-400">validés</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
                    <p className="text-2xl font-black text-blue-200">{totalPlatformPoints}/40</p>
                    <p className="text-xs font-bold text-slate-400">score plateforme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kx-container py-8 sm:py-12">
          {loading && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-16 text-center text-slate-300 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mx-auto h-8 w-8 rounded-full border-2 border-blue-400 border-t-transparent" />
              <p className="mt-4 font-bold">Chargement du parcours…</p>
            </div>
          )}

          {error && (
            <div className="rounded-3xl border border-red-300/20 bg-red-400/10 p-6 text-red-100 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-6 w-6 shrink-0" />
                <div>
                  <p className="text-lg font-black">{error}</p>
                  <p className="mt-2 text-sm leading-6 text-red-100/80">Le backend peut être en réveil. Réessaie après quelques secondes.</p>
                </div>
              </div>
              {errorDetails && <pre className="mt-4 max-h-56 overflow-auto rounded-2xl bg-slate-950/70 p-4 text-xs text-red-50">{errorDetails}</pre>}
            </div>
          )}

          {statusWarning && !error && (
            <div className="mb-5 rounded-3xl border border-amber-300/20 bg-amber-400/10 p-5 text-amber-100 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-black">Progression certifiante indisponible temporairement.</p>
                  <p className="mt-1 text-sm leading-6 text-amber-100/80">Les modules restent visibles, mais les badges de verrouillage peuvent être incomplets.</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="grid gap-5">
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
                  ? "group grid gap-5 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-300/35 hover:bg-white/[0.085] md:grid-cols-[5rem_1fr_auto] md:items-center"
                  : "grid gap-5 rounded-3xl border border-white/10 bg-white/[0.035] p-5 opacity-75 shadow-2xl shadow-slate-950/10 backdrop-blur-xl md:grid-cols-[5rem_1fr_auto] md:items-center";

                const content = (
                  <>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-3xl text-2xl font-black ring-1 ${accessible ? "bg-blue-400/10 text-blue-100 ring-blue-300/20" : "bg-white/5 text-slate-500 ring-white/10"}`}>
                      {accessible ? module.order_index : <Lock size={24} />}
                    </div>
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge color="blue" className="bg-blue-400/10 text-blue-200 ring-blue-300/20">Module {module.order_index}</Badge>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${copy.className}`}>
                          {validation?.is_validated && <CheckCircle2 size={13} />}
                          {validation?.status === "quiz_failed" && <RefreshCw size={13} />}
                          {validation?.status === "locked" && <Lock size={13} />}
                          {copy.label}
                        </span>
                        {module.duration && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-xs font-bold text-slate-300 ring-1 ring-white/10"><Clock3 size={13} /> {module.duration}</span>}
                        {validation?.quiz_best_score != null && <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-400/10 px-3 py-1 text-xs font-bold text-purple-200 ring-1 ring-purple-300/20"><Trophy size={13} /> QCM {validation.quiz_best_score}/20</span>}
                      </div>
                      <h2 className={`text-xl font-black transition ${accessible ? "text-white group-hover:text-blue-100" : "text-slate-300"}`}>{module.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{module.description}</p>
                      {!accessible && <p className="mt-3 text-sm font-semibold text-slate-500">Valide le module précédent pour débloquer cette étape.</p>}
                      {fallbackLocked && <p className="mt-2 text-sm font-semibold text-amber-200/80">Progression en vérification : accès bloqué par sécurité.</p>}
                    </div>
                    <div className="flex items-center justify-between gap-4 md:justify-end">
                      <span className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition ${accessible ? "bg-white text-slate-950 group-hover:bg-blue-600 group-hover:text-white" : "bg-white/10 text-slate-500"}`}>
                        {accessible ? "Ouvrir" : "Bloqué"} {accessible ? <ArrowRight size={16} /> : <Lock size={16} />}
                      </span>
                      {accessible && <ChevronRight className="hidden text-slate-500 transition group-hover:text-blue-200 md:block" size={18} />}
                    </div>
                  </>
                );

                return (
                  <motion.div key={module.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                    {accessible ? (
                      <Link href={`/modules/${module.id}`} className={cardClass}>
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

              {modules.length === 0 && (
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-16 text-center shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                  <Layers3 className="mx-auto h-10 w-10 text-blue-200" />
                  <p className="mt-4 text-lg font-black text-white">Aucun module disponible.</p>
                  <p className="mt-2 text-sm text-slate-400">Les modules apparaîtront ici dès qu’ils seront publiés.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
