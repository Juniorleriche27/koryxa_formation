"use client";

import Link from "next/link";
import { BookOpen, LogOut, Medal } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/82 backdrop-blur-2xl">
      <div className="kx-container flex h-16 items-center justify-between gap-4">
        <Link href="/dashboard" className="group flex items-center gap-3" aria-label="Retour au tableau de bord KORYXA Formation">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-blue-500/25">
            K
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-tight text-white sm:text-base">KORYXA Formation</span>
            <span className="hidden text-xs font-medium text-slate-400 sm:block">Python Data Academy</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/modules"
            className="inline-flex h-10 items-center gap-2 rounded-2xl px-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:ring-offset-[#07111f]"
          >
            <BookOpen size={16} />
            <span className="hidden sm:inline">Modules</span>
          </Link>
          <Link
            href="/certificate"
            className="hidden h-10 items-center gap-2 rounded-2xl px-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:ring-offset-[#07111f] sm:inline-flex"
          >
            <Medal size={16} />
            Certificat
          </Link>
          <button
            onClick={logout}
            className="inline-flex h-10 items-center gap-2 rounded-2xl px-3 text-sm font-bold text-red-300 transition hover:bg-red-400/10 hover:text-red-200 focus-visible:ring-offset-[#07111f]"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
