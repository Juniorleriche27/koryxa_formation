"use client";

export function useAuth() {
  const login = (redirectPath = "/dashboard") => {
    window.location.href = `/access?redirect=${encodeURIComponent(redirectPath)}`;
  };

  const logout = async () => {
    await fetch("/api/access/logout", { method: "POST" }).catch(() => null);
    window.location.href = "/access";
  };

  return { login, logout };
}
