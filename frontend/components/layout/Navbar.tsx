"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-[#050c1a]/90 border-b border-white/10 backdrop-blur-sm px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link href="/dashboard" className="text-lg sm:text-xl font-bold">
        <span className="text-blue-400">KORYXA</span>
        <span className="text-white hidden sm:inline"> Formation</span>
      </Link>
      <div className="flex items-center gap-3 sm:gap-6">
        <Link href="/modules"     className="text-slate-400 hover:text-white transition text-xs sm:text-sm font-medium">Modules</Link>
        <Link href="/certificate" className="text-slate-400 hover:text-white transition text-xs sm:text-sm font-medium hidden xs:block">Certificat</Link>
        <button onClick={logout}  className="text-xs sm:text-sm text-red-400 hover:text-red-300 font-medium transition">Quitter</button>
      </div>
    </nav>
  );
}
