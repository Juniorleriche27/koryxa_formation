"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

export default function ClerkUserSection({ isMobile = false, onCloseMobile }: { isMobile?: boolean; onCloseMobile?: () => void }) {
  const [returnUrl, setReturnUrl] = useState("https://formation.koryxa.fr");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReturnUrl(window.location.href);
    }
  }, []);

  const signInUrl = `https://accounts.koryxa.fr/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`;

  if (isMobile) {
    return (
      <>
        <SignedIn>
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
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
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Compte actif</span>
                <p className="truncate text-sm font-black text-slate-900">Connecté</p>
              </div>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
            <a
              href={signInUrl}
              onClick={onCloseMobile}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 transition hover:bg-slate-50"
            >
              <LogIn size={17} className="text-emerald-600" />
              Connexion
            </a>
          </div>
        </SignedOut>
      </>
    );
  }

  return (
    <div className="hidden items-center gap-3 lg:flex">
      <SignedIn>
        <div className="flex items-center justify-center rounded-full p-0.5 ring-2 ring-emerald-500/40 transition hover:ring-emerald-500">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
            }}
          />
        </div>
      </SignedIn>
      <SignedOut>
        <a
          href={signInUrl}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 shadow-sm transition hover:border-emerald-500 hover:text-emerald-700"
        >
          <LogIn size={16} className="text-emerald-600" />
          <span>Connexion</span>
        </a>
      </SignedOut>
    </div>
  );
}
