import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, Home } from "lucide-react";

export const metadata = {
  title: "Page introuvable (404) — KORYXA Formation",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050914] px-4 py-16 text-center text-white sm:px-6">
      <div className="relative mx-auto max-w-lg">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-blue-500/10 p-6 blur-2xl" />
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-200">
          <Compass size={14} /> Erreur 404
        </span>
        <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">
          Page introuvable
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
          L&apos;adresse demandée n&apos;existe pas ou le module a été déplacé dans un autre parcours.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/formations"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 text-sm font-black text-white shadow-xl shadow-blue-900/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            <BookOpen size={16} /> Catalogue des formations
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-6 text-sm font-black text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            <Home size={16} /> Mon espace apprenant
          </Link>
        </div>
      </div>
    </main>
  );
}
