import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, Home } from "lucide-react";

export const metadata = {
  title: "Page introuvable (404) — KORYXA Formation",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f5] px-4 py-16 text-center text-slate-950 sm:px-6">
      <div className="relative mx-auto max-w-lg rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
          <Compass size={14} /> Erreur 404
        </span>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
          Page introuvable
        </h1>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
          L&apos;adresse demandée n&apos;existe pas ou la formation a été déplacée.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/formations"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 text-sm font-bold text-white shadow-lg shadow-[#00a86b]/20 transition hover:bg-[#008b58]"
          >
            <BookOpen size={16} /> Catalogue des formations
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] px-6 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
          >
            <Home size={16} /> Accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
