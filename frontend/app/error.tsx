"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, BookOpen, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Loguer l'erreur côté client si nécessaire
    console.error("Erreur d'application interceptée:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050914] px-4 py-16 text-center text-white sm:px-6">
      <div className="relative mx-auto max-w-lg">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-red-400/20 bg-red-500/10 text-red-300 shadow-xl shadow-red-950/40">
          <AlertTriangle size={32} />
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-red-200">
          Une anomalie est survenue
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
          Impossible d&apos;afficher cette page
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
          Une erreur temporaire s&apos;est produite lors du traitement de votre demande. Vous pouvez réessayer ou revenir au catalogue.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 text-sm font-black text-white shadow-xl shadow-blue-900/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            <RefreshCw size={16} /> Réessayer
          </button>
          <Link
            href="/formations"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-6 text-sm font-black text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            <BookOpen size={16} /> Retour aux formations
          </Link>
        </div>
      </div>
    </main>
  );
}
