import { proxyBackend } from "@/lib/backendProxy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const course = url.searchParams.get("course");
  const target = course ? "/access/certificates/me?course=" + encodeURIComponent(course) : "/access/certificates/me";
  return proxyBackend(request, target);
}
