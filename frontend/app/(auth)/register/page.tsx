import type { Metadata } from "next";
import { Suspense } from "react";
import LearnerAuthForm from "@/components/auth/LearnerAuthForm";

export const metadata: Metadata = {
  title: "Inscription apprenant — KORYXA Formation",
  description: "Crée ton compte apprenant KORYXA Formation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <LearnerAuthForm mode="register" />
    </Suspense>
  );
}
