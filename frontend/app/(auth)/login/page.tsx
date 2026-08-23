import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildKoryxaIdentityUrl } from "@/lib/koryxaIdentity";

export const metadata: Metadata = {
  title: "Connexion KORYXA Identity — KORYXA Formation",
  description: "Connecte-toi avec ton identité KORYXA pour accéder à KORYXA Formation.",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  redirect(buildKoryxaIdentityUrl({ mode: "sign-in", searchParams }));
}
