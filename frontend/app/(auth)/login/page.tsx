import type { Metadata } from "next";
import { Suspense } from "react";
import LearnerAuthForm from "@/components/auth/LearnerAuthForm";

export const metadata: Metadata = {
  title: "Connexion apprenant — KORYXA Formation",
  description: "Connecte-toi à ton compte apprenant KORYXA Formation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LearnerAuthForm mode="login" />
    </Suspense>
  );
}
