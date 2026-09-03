"use client";

import { useEffect, useMemo, useState } from "react";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function ProfileAvatar({ size = "desktop" }: { size?: "desktop" | "mobile" }) {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  const initials = useMemo(() => {
    const name = user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress || "KORYXA";
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [user]);

  const label = user?.fullName || user?.primaryEmailAddress?.emailAddress || "Profil KORYXA";
  const dimensions = size === "mobile" ? "h-10 w-10" : "h-11 w-11";

  return (
    <button
      type="button"
      onClick={() => openUserProfile()}
      aria-label={`Ouvrir le profil de ${label}`}
      title={label}
      className={`${dimensions} relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-400 bg-emerald-50 text-sm font-black text-emerald-800 shadow-sm transition hover:border-emerald-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2`}
    >
      {user?.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.imageUrl}
          alt={`Photo de profil de ${label}`}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span aria-hidden="true">{initials || "K"}</span>
      )}
    </button>
  );
}

export default function ClerkUserSection({
  isMobile = false,
  onCloseMobile,
}: {
  isMobile?: boolean;
  onCloseMobile?: () => void;
}) {
  const [returnUrl, setReturnUrl] = useState("https://formation.koryxa.fr");
  const { user } = useUser();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReturnUrl(window.location.href);
    }
  }, []);

  const signInUrl = `https://accounts.koryxa.fr/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`;
  const displayName = user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress || "Compte KORYXA";

  if (isMobile) {
    return (
      <>
        <SignedIn>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
            <ProfileAvatar size="mobile" />
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Compte actif</span>
              <p className="truncate text-sm font-black text-slate-900">{displayName}</p>
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
        <ProfileAvatar />
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
