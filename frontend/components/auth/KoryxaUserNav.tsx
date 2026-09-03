"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LogIn } from "lucide-react";

const ClerkUserSection = dynamic(() => import("./ClerkUserSection"), {
  ssr: false,
  loading: () => (
    <div className="hidden items-center gap-3 lg:flex">
      <a
        href="https://accounts.koryxa.fr/sign-in?redirect_url=https%3A%2F%2Fformation.koryxa.fr"
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 shadow-sm"
      >
        <LogIn size={16} className="text-emerald-600" />
        <span>Connexion</span>
      </a>
    </div>
  ),
});

export default function KoryxaUserNav({ isMobile = false, onCloseMobile }: { isMobile?: boolean; onCloseMobile?: () => void }) {
  const [returnUrl, setReturnUrl] = useState("https://formation.koryxa.fr");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReturnUrl(window.location.href);
    }
  }, []);

  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (hasClerkKey) {
    return <ClerkUserSection isMobile={isMobile} onCloseMobile={onCloseMobile} />;
  }

  const signInUrl = `https://accounts.koryxa.fr/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`;

  // Fallback quand Clerk n'est pas configuré en local
  if (isMobile) {
    return (
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
    );
  }

  return (
    <div className="hidden items-center gap-3 lg:flex">
      <a
        href={signInUrl}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 shadow-sm transition hover:border-emerald-500 hover:text-emerald-700"
      >
        <LogIn size={16} className="text-emerald-600" />
        <span>Connexion</span>
      </a>
    </div>
  );
}
