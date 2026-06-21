import { proxyBackend } from "@/lib/backendProxy";

export async function POST(request: Request) {
  return proxyBackend(request, "/access/validation/final-project/submit");
}
