import { redirect } from "next/navigation";
import { buildKoryxaAdminAuthUrl } from "@/lib/koryxaAdminAuth";

type AccessPageProps = {
  searchParams?: {
    redirect?: string;
  };
};

export default function AccessPage({ searchParams }: AccessPageProps) {
  const requestedRedirect = searchParams?.redirect || "/dashboard";
  redirect(buildKoryxaAdminAuthUrl(requestedRedirect));
}
