"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { modulesAPI } from "@/lib/api";
import type { Module } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, Clock, ChevronRight } from "lucide-react";

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    modulesAPI.getAll()
      .then((r) => setModules(r.data))
      .catch((err) => {
        if (err?.response?.status !== 401) {
          setError("Impossible de charger les modules. Réessaie plus tard.");
        }
        // 401 handled globally by api interceptor
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#050c1a] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Tous les modules</h1>
          <p className="text-slate-400">Suis le parcours dans l&apos;ordre pour progresser efficacement.</p>
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-slate-400 py-20 justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
            />
            Chargement des modules...
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            {modules.map((module, i) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/modules/${module.id}`}
                  className="flex items-center gap-5 bg-white/3 hover:bg-white/6 rounded-2xl p-5 border border-white/8 hover:border-blue-500/40 transition group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">
                    {module.order_index}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-white group-hover:text-blue-300 transition truncate">{module.title}</h2>
                    <p className="text-slate-500 text-sm mt-0.5 truncate">{module.description}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 text-slate-500 text-sm">
                    {module.duration && (
                      <span className="hidden sm:flex items-center gap-1.5">
                        <Clock size={13} /> {module.duration}
                      </span>
                    )}
                    <ChevronRight size={16} className="group-hover:text-blue-400 transition" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
