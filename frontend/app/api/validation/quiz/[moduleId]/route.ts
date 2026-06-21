import { proxyBackend } from "@/lib/backendProxy";

type RouteContext = {
  params: {
    moduleId: string;
  };
};

export async function GET(request: Request, context: RouteContext) {
  return proxyBackend(request, `/access/validation/quiz/${encodeURIComponent(context.params.moduleId)}`);
}
