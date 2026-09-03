"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogIn, LogOut, UserRound } from "lucide-react";
import { accessAPI, clearAuthSession, type AccessUser } from "@/lib/api";

type Variant = "desktop" | "mobileHeader" | "mobileMenu";

export default function KoryxaUserNav({
  variant = "desktop",
  onCloseMobile,
}: {
  variant?: Variant;
  onCloseMobile?: () => void;
}) {
  const pathname = usePathname();
  const [user, setUser] = useState<AccessUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let active = true;

    accessAPI
      .me()
      .then(({ data }) => {
        if (active) setUser(data);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const initials = useMemo(() => {
    if (!user) return "";
    const source = user.name || user.email;
    return source
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [user]);

  const redirectTarget = pathname || "/";
  const signInUrl = `/login?next=${encodeURIComponent(redirectTarget)}`;

  async function logout() {
    clearAuthSession();
    try {
      await accessAPI.logout();
    } catch {
      // La navigation remettra l'interface à l'état déconnecté même si l'appel réseau échoue.
    }
    setUser(null);
    setOpen(false);
    onCloseMobile?.();
    window.location.href = "/";
  }

  const avatar = user ? (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-400 bg-emerald-50 text-sm font-black text-emerald-800 shadow-sm">
      {user.avatar_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.avatar_url}
          alt={`Photo de profil de ${user.name}`}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  ) : null;

  if (loading) {
    if (variant === "desktop") return <div className="hidden h-11 w-11 lg:block" aria-hidden="true" />;
    if (variant === "mobileHeader") return <div className="h-11 w-11 lg:hidden" aria-hidden="true" />;
    return null;
  }

  if (!user) {
    if (variant === "desktop") {
      return (
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={signInUrl}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 shadow-sm transition hover:border-emerald-500 hover:text-emerald-700"
          >
            <LogIn size={16} className="text-emerald-600" />
            <span>Connexion</span>
          </Link>
        </div>
      );
    }

    if (variant === "mobileHeader") {
      return null;
    }

    return (
      <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
        <Link
          href={signInUrl}
          onClick={onCloseMobile}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 transition hover:bg-slate-50"
        >
          <LogIn size={17} className="text-emerald-600" />
          Connexion
        </Link>
      </div>
    );
  }

  if (variant === "mobileMenu") {
    return (
      <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div className="flex items-center gap-3">
          {avatar}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-slate-900">{user.name}</p>
            <p className="truncate text-xs font-semibold text-slate-500">{user.email}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 text-xs font-black text-slate-900"
          >
            <UserRound size={15} className="text-emerald-600" />
            Mon espace
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-900"
          >
            <LogOut size={15} className="text-slate-500" />
            Déconnexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={menuRef}
      className={variant === "mobileHeader" ? "relative lg:hidden" : "relative hidden lg:block"}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Ouvrir le menu de ${user.name}`}
        className="inline-flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        {avatar}
        {variant === "desktop" ? <ChevronDown size={16} className="text-slate-500" /> : null}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-[70] mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/15"
        >
          <div className="border-b border-slate-100 px-3 py-3">
            <p className="truncate text-sm font-black text-slate-950">{user.name}</p>
            <p className="mt-1 truncate text-xs font-semibold text-slate-500">{user.email}</p>
          </div>
          <Link
            href="/dashboard"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-1 flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm font-bold text-slate-800 transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            <UserRound size={16} />
            Mon espace apprenant
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={logout}
            className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold text-slate-800 transition hover:bg-slate-100"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
