import type { Metadata } from "next";
import { MaintenanceAccessPage } from "@/components/marketing/MaintenanceAccessPage";

export const metadata: Metadata = {
  title: "Inscription en maintenance — KORYXA Formation",
  description: "L’inscription apprenant KORYXA Formation est temporairement fermée pendant la migration vers KORYXA Admin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return <MaintenanceAccessPage source="register" />;
}
