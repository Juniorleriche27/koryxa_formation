"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";

export default function ClerkUserSection({ isMobile = false, onCloseMobile }: { isMobile?: boolean; onCloseMobile?: () => void }) {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    if (isMobile) {
      return (
        <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#06251c] px-4 text-sm font-black text-white"
          >
            Espace apprenant <ArrowRight size={15} />
          </Link>
        </div>
      );
    }
    return (
      <div className="hidden items-center gap-4 lg:flex">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#06251c] px-5 text-sm font-black text-white shadow-sm"
        >
          <span>Espace apprenant</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  if (isSignedIn && user) {
    if (isMobile) {
      return (
        <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full p-0.5 ring-2 ring-emerald-500/40">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10",
                    },
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">Compte actif</span>
                </div>
                <p className="truncate text-sm font-black text-slate-900">
                  {user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#06251c] px-4 text-sm font-black text-white shadow-md shadow-emerald-950/20"
          >
            Mon Espace Apprenant <ArrowRight size={15} />
          </Link>
        </div>
      );
    }

    return (
      <div className="hidden items-center gap-3 lg:flex">
        <Link
          href="/dashboard"
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 text-xs font-black text-emerald-950 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-100"
          title="Accéder à mon espace apprenant"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Compte actif</span>
          <span className="max-w-[140px] truncate font-bold text-slate-700">
            {user.firstName || user.fullName || "Apprenant"}
          </span>
          <ArrowRight size={13} className="text-emerald-700 transition group-hover:translate-x-0.5" />
        </Link>
        <div className="flex items-center justify-center rounded-full p-0.5 ring-2 ring-emerald-500/30 transition hover:ring-emerald-500">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
            }}
          />
        </div>
      </div>
    );
  }

  // Utilisateur non connecté
  if (isMobile) {
    return (
      <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
        <a
          href="https://accounts.koryxa.fr/sign-in?redirect_url=https%3A%2F%2Fformation.koryxa.fr%2Fdashboard"
          onClick={onCloseMobile}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 transition hover:bg-slate-50"
        >
          <LogIn size={17} className="text-emerald-600" />
          Connexion
        </a>
        <Link
          href="/dashboard"
          onClick={onCloseMobile}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#06251c] px-4 text-sm font-black text-white transition hover:bg-emerald-700"
        >
          Espace apprenant <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-4 lg:flex">
      <a
        href="https://accounts.koryxa.fr/sign-in?redirect_url=https%3A%2F%2Fformation.koryxa.fr%2Fdashboard"
        className="inline-flex items-center gap-2 text-sm font-black text-slate-700 transition hover:text-emerald-700"
      >
        <LogIn size={17} className="text-emerald-600" />
        <span>Connexion</span>
      </a>
      <Link
        href="/dashboard"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#06251c] px-5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800"
      >
        <span>Espace apprenant</span>
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
