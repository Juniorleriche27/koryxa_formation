import { proxyBackend } from "@/lib/backendProxy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const url = new URL(request.url);
  const course = url.searchParams.get("course");
  const target = course ? "/access/certificates/issue?course=" + encodeURIComponent(course) : "/access/certificates/issue";
  return proxyBackend(request, target);
}
