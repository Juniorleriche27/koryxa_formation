import type { Metadata } from "next";
import { MaintenanceAccessPage } from "@/components/marketing/MaintenanceAccessPage";

export const metadata: Metadata = {
  title: "Connexion en maintenance — KORYXA Formation",
  description: "La connexion apprenant KORYXA Formation est temporairement fermée pendant la migration vers KORYXA Admin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <MaintenanceAccessPage source="login" />;
}
