"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

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

export default function KoryxaUserNav(props: {
  variant?: Variant;
  onCloseMobile?: () => void;
}) {
  // Production always provides this key. Keeping the public build usable
  // without secrets also lets preview/local builds render a login action.
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    if (props.variant === "mobileMenu") {
      return (
        <Link href="/login" onClick={props.onCloseMobile} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-4 py-3 text-sm font-bold text-white">
          <LogIn size={17} /> Connexion
        </Link>
      );
    }
    return null;
  }

  return <ClerkKoryxaUserNav {...props} />;
}
