"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2, ChevronRight, Clock3, Compass, Layers3 } from "lucide-react";
import { getApiErrorMessage, modulesAPI } from "@/lib/api";
import type { Module } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  useEffect(() => {
    modulesAPI
      .getAll()
      .then((response) => setModules(response.data))
      .catch((error) => {
        if (error?.response?.status !== 401) {
          setError("Impossible de charger les modules. Réessaie plus tard.");
          setErrorDetails(getApiErrorMessage(error));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="kx-dark-page flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.25),transparent_34rem),radial-gradient(circle_at_82%_18%,rgba(14,165,233,0.12),transparent_28rem)]" />
          <div className="kx-container relative py-8 sm:py-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
              <div>
                <span className="kx-dark-eyebrow">Parcours complet</span>
                <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">
                  Tous les modules, dans le bon ordre.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Avance étape par étape : bases, manipulation de données, visualisation, analyse et projet final.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
                <Compass className="h-7 w-7 text-blue-200" />
                <p className="mt-4 text-3xl font-black text-white">{modules.length || "—"}</p>
                <p className="mt-1 text-sm font-semibold text-slate-400">modules disponibles</p>
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

          {!loading && !error && (
            <div className="grid gap-5">
              {modules.map((module, index) => (
                <motion.div key={module.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                  <Link
                    href={`/modules/${module.id}`}
                    className="group grid gap-5 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-300/35 hover:bg-white/[0.085] md:grid-cols-[5rem_1fr_auto] md:items-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-400/10 text-2xl font-black text-blue-100 ring-1 ring-blue-300/20">
                      {module.order_index}
                    </div>
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge color="blue" className="bg-blue-400/10 text-blue-200 ring-blue-300/20">Module {module.order_index}</Badge>
                        {module.duration && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-xs font-bold text-slate-300 ring-1 ring-white/10"><Clock3 size={13} /> {module.duration}</span>}
                      </div>
                      <h2 className="text-xl font-black text-white transition group-hover:text-blue-100">{module.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{module.description}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 md:justify-end">
                      <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition group-hover:bg-blue-600 group-hover:text-white">
                        Ouvrir <ArrowRight size={16} />
                      </span>
                      <ChevronRight className="hidden text-slate-500 transition group-hover:text-blue-200 md:block" size={18} />
                    </div>
                  </Link>
                </motion.div>
              ))}

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
