import { proxyBackend } from "@/lib/backendProxy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  return proxyBackend(request, "/access/certificates/issue");
}
