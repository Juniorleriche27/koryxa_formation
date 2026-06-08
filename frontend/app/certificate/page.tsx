"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2, Download, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CertificatePage() {
  const issuedAt = new Date().toISOString();
  const formattedDate = new Date(issuedAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="kx-dark-page flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(59,130,246,0.24),transparent_34rem),radial-gradient(circle_at_80%_75%,rgba(168,85,247,0.14),transparent_28rem)]" />
          <div className="mx-auto max-w-5xl relative">
            <div className="mb-8 text-center">
              <span className="kx-dark-eyebrow">Certificat KORYXA</span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-6xl">Certificat de complétion</h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Une preuve claire de progression, à formaliser après validation complète du parcours.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white p-4 text-slate-950 shadow-2xl shadow-blue-950/35 sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_24rem),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_24rem)]" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white/80 p-6 text-center sm:p-10 lg:p-14">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/25">
                  <Award size={38} />
                </div>
                <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-blue-700">KORYXA Tech Store présente</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Analyse de Données avec Python</h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
                  Ce certificat atteste la complétion du parcours KORYXA Formation Python Data, incluant notebooks, exercices, quiz et projet final.
                </p>

                <div className="mx-auto my-8 h-px max-w-xl bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { icon: CheckCircle2, label: "Progression", value: "À valider" },
                    { icon: ShieldCheck, label: "Statut", value: "Formation KORYXA" },
                    { icon: Sparkles, label: "Date", value: formattedDate },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
                      <item.icon className="h-5 w-5 text-blue-600" />
                      <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                      <p className="mt-1 text-sm font-black text-slate-950">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 p-5 text-left">
                  <p className="font-black text-blue-950">Validation administrative requise</p>
                  <p className="mt-2 text-sm leading-6 text-blue-800">
                    Le certificat final sera formalisé après vérification de la progression complète et des activités demandées.
                  </p>
                </div>

                <button disabled className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-200 px-6 py-4 text-sm font-black text-slate-500 disabled:cursor-not-allowed">
                  <Download size={17} /> Téléchargement bientôt disponible
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
