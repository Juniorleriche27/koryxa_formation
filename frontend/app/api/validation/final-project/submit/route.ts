import { proxyBackend } from "@/lib/backendProxy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const url = new URL(request.url);
  const course = url.searchParams.get("course");
  const target = course ? "/access/validation/final-project/submit?course=" + encodeURIComponent(course) : "/access/validation/final-project/submit";
  return proxyBackend(request, target);
}
