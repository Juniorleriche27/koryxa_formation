"use client";
import { safeReturnUrl } from "@/lib/redirectUtils";

const KORYXA_LOGIN  = process.env.NEXT_PUBLIC_KORYXA_SITE_URL + "/login";
const KORYXA_LOGOUT = process.env.NEXT_PUBLIC_KORYXA_LOGOUT_URL ?? (process.env.NEXT_PUBLIC_KORYXA_SITE_URL + "/logout");
const APP_URL       = process.env.NEXT_PUBLIC_APP_URL ?? "";

export function useAuth() {
  const login = (redirectPath = "/dashboard") => {
    const returnUrl = safeReturnUrl(APP_URL + redirectPath);
    window.location.href = `${KORYXA_LOGIN}?redirect=${encodeURIComponent(returnUrl)}`;
  };

  const logout = () => {
    const returnUrl = APP_URL;
    window.location.href = `${KORYXA_LOGOUT}?redirect=${encodeURIComponent(returnUrl)}`;
  };

  return { login, logout };
}
