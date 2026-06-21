import { proxyBackend } from "@/lib/backendProxy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  return proxyBackend(request, "/access/certificates/me");
}
