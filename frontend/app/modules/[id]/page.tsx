"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Download, BookOpen, Clock, ChevronRight } from "lucide-react";
import { modulesAPI, notebookAPI } from "@/lib/api";
import { useProgress } from "@/hooks/useProgress";
import type { Module } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import { ExternalLink } from "lucide-react";
import ModuleProgress from "@/components/modules/ModuleProgress";
import NotebookViewer, { NotebookCell } from "@/components/modules/NotebookViewer";
import AIAssistant from "@/components/modules/AIAssistant";
import QuizBlock from "@/components/modules/QuizBlock";

export default function ModuleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [module, setModule]       = useState<Module | null>(null);
  const [cells, setCells]         = useState<NotebookCell[]>([]);
  const [loadingNb, setLoadingNb] = useState(false);
  const [tab, setTab]             = useState<"cours" | "ressources">("cours");
  const { isCompleted, markCompleted } = useProgress();

  useEffect(() => {
    modulesAPI.getOne(id).then((r) => setModule(r.data));
  }, [id]);

  useEffect(() => {
    if (!module) return;
    setLoadingNb(true);
    notebookAPI.getContent(id)
      .then((r) => setCells(r.data.cells))
      .catch(() => setCells([]))
      .finally(() => setLoadingNb(false));
  }, [module, id]);

  if (!module) return (
    <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );

  const downloadUrl = notebookAPI.getDownloadUrl(id);

  return (
    <div className="min-h-screen bg-[#050c1a] text-white flex flex-col">
      <Navbar />

      {/* Header module */}
      <div className="border-b border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                <span>Modules</span>
                <ChevronRight size={14} />
                <span className="text-white">Module {module.order_index}</span>
              </div>
              <Badge color="blue">Module {module.order_index}</Badge>
              <h1 className="text-3xl font-bold mt-3 mb-2">{module.title}</h1>
              <p className="text-slate-400 max-w-xl">{module.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Clock size={14} /> {module.duration}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <BookOpen size={14} /> {cells.length} cellules
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:shrink-0">
              <a href={downloadUrl} download>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition w-full justify-center"
                >
                  <Download size={16} /> Télécharger .ipynb
                </motion.button>
              </a>
              <ModuleProgress completed={isCompleted(id)} onComplete={() => markCompleted(id)} />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-8 bg-white/3 p-1 rounded-xl w-fit">
            {(["cours", "ressources"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition ${
                  tab === t ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {t === "cours" ? "📖 Cours" : (
                  <>
                    🔗 Ressources
                    {module.resources && module.resources.length > 0 && (
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                        tab === "ressources" ? "bg-white/20 text-white" : "bg-blue-500/30 text-blue-300"
                      }`}>
                        {module.resources.length}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">

        {tab === "cours" && (
          <>
            {loadingNb ? (
              <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
                Chargement du notebook...
              </div>
            ) : cells.length > 0 ? (
              <>
                <NotebookViewer cells={cells} moduleTitle={module.title} />
                <QuizBlock moduleId={id} onComplete={() => markCompleted(id)} />

                {/* Ressources rapides sous le notebook */}
                {module.resources && module.resources.length > 0 && (
                  <div className="mt-8 border-t border-white/5 pt-8">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ExternalLink size={14} /> Ressources du module
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {module.resources.map((r) => (
                        <a
                          key={r.id}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white/3 hover:bg-white/6 border border-white/8 hover:border-blue-500/40 text-sm text-slate-300 hover:text-white px-4 py-2 rounded-xl transition"
                        >
                          <Badge color={r.type === "video" ? "orange" : "blue"}>{r.type}</Badge>
                          {r.title}
                          <ExternalLink size={12} className="text-slate-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 text-slate-500">
                <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
                <p>Le contenu de ce module sera bientôt disponible.</p>
              </div>
            )}
          </>
        )}

        {tab === "ressources" && (
          <div className="space-y-4 max-w-2xl">
            {module.resources && module.resources.length > 0 ? (
              module.resources.map((r) => (
                <motion.a
                  key={r.id} href={r.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 bg-white/3 rounded-xl p-4 border border-white/8 hover:border-blue-500/40 transition block"
                >
                  <Badge color={r.type === "video" ? "orange" : "blue"}>{r.type}</Badge>
                  <div>
                    <p className="font-medium text-white">{r.title}</p>
                    {r.description && <p className="text-slate-400 text-sm mt-0.5">{r.description}</p>}
                  </div>
                </motion.a>
              ))
            ) : (
              <p className="text-slate-500">Aucune ressource pour ce module.</p>
            )}
          </div>
        )}
      </main>

      <AIAssistant moduleId={id} moduleTitle={module.title} />
      <Footer />
    </div>
  );
}
