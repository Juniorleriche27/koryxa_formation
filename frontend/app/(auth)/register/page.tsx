import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildKoryxaIdentityUrl } from "@/lib/koryxaIdentity";

export const metadata: Metadata = {
  title: "Créer mon compte KORYXA — KORYXA Formation",
  description: "Crée ton identité KORYXA pour accéder à KORYXA Formation.",
  robots: { index: false, follow: false },
};

type RegisterPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  redirect(buildKoryxaIdentityUrl({ mode: "sign-up", searchParams }));
}
