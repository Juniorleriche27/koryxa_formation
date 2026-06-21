import { proxyBackend } from "@/lib/backendProxy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RouteContext = {
  params: {
    moduleId: string;
  };
};

export async function POST(request: Request, context: RouteContext) {
  return proxyBackend(request, `/access/validation/quiz/${encodeURIComponent(context.params.moduleId)}/submit`);
}
