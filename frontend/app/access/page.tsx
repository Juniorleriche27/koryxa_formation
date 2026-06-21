import type { Metadata } from "next";
import { MaintenanceAccessPage } from "@/components/marketing/MaintenanceAccessPage";

export const metadata: Metadata = {
  title: "Accès en maintenance — KORYXA Formation",
  description: "L’accès apprenant KORYXA Formation est temporairement fermé pendant la migration vers KORYXA Admin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccessPage() {
  return <MaintenanceAccessPage source="access" />;
}
