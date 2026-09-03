"use client";

export function useAuth() {
  const login = () => {
    window.location.href = "https://accounts.koryxa.fr/sign-in";
  };

  const logout = async () => {
    await fetch("/api/access/logout", { method: "POST" }).catch(() => null);
    window.location.href = "https://accounts.koryxa.fr/sign-in";
  };

  return { login, logout };
}
