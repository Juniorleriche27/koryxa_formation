"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { LogIn, LogOut, UserRound } from "lucide-react";
import { accessAPI, type AccessUser } from "@/lib/api";

type Variant = "desktop" | "mobileHeader" | "mobileMenu";

const avatarAppearance = {
  elements: {
    userButtonAvatarBox: "h-10 w-10",
    userButtonTrigger:
      "rounded-full focus:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
  },
};

function ClerkKoryxaUserNav({
  variant = "desktop",
  onCloseMobile,
}: {
  variant?: Variant;
  onCloseMobile?: () => void;
}) {
  const { isLoaded, isSignedIn } = useUser();
  const signInUrl = `/login?next=${encodeURIComponent(
    typeof window === "undefined" ? "/" : `${window.location.pathname}${window.location.search}`,
  )}`;

  if (!isLoaded) {
    return variant === "mobileMenu" ? null : <div className="h-10 w-10" aria-hidden="true" />;
  }

  if (variant === "mobileMenu") {
    return isSignedIn ? (
      <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
        <span>Compte KORYXA actif</span>
        <UserButton appearance={avatarAppearance} />
      </div>
    ) : (
      <Link
        href={signInUrl}
        onClick={onCloseMobile}
        className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-4 py-3 text-sm font-bold text-white"
      >
        <LogIn size={17} /> Connexion
      </Link>
    );
  }

  const visibility = variant === "mobileHeader" ? "inline-flex lg:hidden" : "hidden lg:inline-flex";

  return (
    <div className={`${visibility} items-center`}>
      <SignedIn>
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:px-2.5 sm:py-1.5">
          <span className="hidden text-xs font-bold text-slate-800 sm:inline">Compte actif</span>
          <UserButton appearance={avatarAppearance} />
        </div>
      </SignedIn>
      <SignedOut>
        <Link
          href={signInUrl}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 shadow-sm transition hover:border-emerald-500 hover:text-emerald-700"
        >
          <LogIn size={16} className="text-emerald-600" />
          <span className={variant === "mobileHeader" ? "hidden sm:inline" : ""}>Connexion</span>
        </Link>
      </SignedOut>
    </div>
  );
}

function FormationSessionUserNav({ variant = "desktop", onCloseMobile }: {
  variant?: Variant;
  onCloseMobile?: () => void;
}) {
  const [user, setUser] = useState<AccessUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    accessAPI.me().then(({ data }) => setUser(data)).catch(() => setUser(null));
  }, []);

  if (!user) {
    if (variant === "mobileMenu") return <Link href="/login" onClick={onCloseMobile} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-4 py-3 text-sm font-bold text-white"><LogIn size={17} /> Connexion</Link>;
    return null;
  }

  const button = (
    <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:px-2.5 sm:py-1.5" aria-expanded={open}>
      <span className="hidden text-xs font-bold text-slate-800 sm:inline">Compte actif</span>
      {user.avatar_url ? <img src={user.avatar_url} alt={user.name} referrerPolicy="no-referrer" className="h-10 w-10 rounded-full object-cover" /> : <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-black text-emerald-800">{(user.name || user.email).charAt(0).toUpperCase()}</span>}
    </button>
  );

  if (variant === "mobileMenu") return <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><span className="text-sm font-semibold">Compte KORYXA actif</span>{button}</div>;
  return (
    <div className={`${variant === "mobileHeader" ? "inline-flex lg:hidden" : "relative hidden lg:inline-flex"}`}>
      {button}
      {open ? <div className="absolute right-0 top-full z-[70] mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-100 px-5 py-4"><p className="font-bold text-slate-950">{user.name}</p><p className="text-sm text-slate-500">{user.email}</p></div>
        <Link href="/dashboard" className="flex items-center gap-3 px-5 py-4 text-sm text-slate-700 hover:bg-slate-50"><UserRound size={17} /> Mon espace apprenant</Link>
        <button type="button" onClick={() => accessAPI.logout().finally(() => { window.location.href = "/"; })} className="flex w-full items-center gap-3 border-t border-slate-100 px-5 py-4 text-sm text-slate-700 hover:bg-slate-50"><LogOut size={17} /> Déconnexion</button>
      </div> : null}
    </div>
  );
}

export default function KoryxaUserNav(props: {
  variant?: Variant;
  onCloseMobile?: () => void;
}) {
  // Production always provides this key. Keeping the public build usable
  // without secrets also lets preview/local builds render a login action.
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <FormationSessionUserNav {...props} />;
  }

  return <ClerkKoryxaUserNav {...props} />;
}
