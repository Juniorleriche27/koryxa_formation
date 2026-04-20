"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { saveToken, removeToken } from "@/lib/auth";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await authAPI.login({ email, password });
    saveToken(res.data.access_token);
    router.push("/dashboard");
    setLoading(false);
  };

  const logout = async () => {
    await authAPI.logout();
    removeToken();
    setUser(null);
    router.push("/login");
  };

  return { user, loading, login, logout };
}
