import { redirect } from "next/navigation";
import { buildKoryxaAdminAuthUrl } from "@/lib/koryxaAdminAuth";

export default function LegacyRegisterRedirect() {
  redirect(buildKoryxaAdminAuthUrl("/dashboard"));
}
