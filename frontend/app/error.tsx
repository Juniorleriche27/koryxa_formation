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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f5] px-4 py-16 text-center text-slate-950 sm:px-6">
      <div className="relative mx-auto max-w-lg rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600">
          <AlertTriangle size={32} />
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-700">
          Une anomalie est survenue
        </span>
        <h1 className="mt-6 font-serif text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
          Impossible d&apos;afficher cette page
        </h1>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
          Une erreur temporaire s&apos;est produite lors du traitement de votre demande. Vous pouvez réessayer ou revenir au catalogue.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 text-sm font-bold text-white shadow-lg shadow-[#00a86b]/20 transition hover:bg-[#008b58]"
          >
            <RefreshCw size={16} /> Réessayer
          </button>
          <Link
            href="/formations"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] px-6 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
          >
            <BookOpen size={16} /> Retour aux formations
          </Link>
        </div>
      </div>
    </main>
  );
}
