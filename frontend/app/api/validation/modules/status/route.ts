import { getFormationSession, getSupabaseServiceConfig, jsonError, serviceHeaders } from "@/lib/formationSession";

type ModuleRow = {
  id: string;
  title: string;
  description?: string;
  order_index: number;
  duration?: string;
  estimated_hours?: number;
  platform_points?: number;
  requires_quiz?: boolean;
  quiz_pass_score?: number;
};

type ProgressRow = {
  module_id: string;
  status: "locked" | "available" | "in_progress" | "quiz_failed" | "validated";
  completed: boolean;
  quiz_best_score?: number | null;
  validated_at?: string | null;
  completed_at?: string | null;
  platform_points_awarded?: number | null;
};

export async function GET() {
  const session = await getFormationSession();
  if (!session) return jsonError("Session formation requise.", 401);

  const config = getSupabaseServiceConfig();
  if (!config) return jsonError("Supabase non configuré.", 503);

  const headers = serviceHeaders(config.serviceRoleKey);
  const [modulesResponse, progressResponse] = await Promise.all([
    fetch(`${config.url}/rest/v1/modules?select=*&is_published=eq.true&order=order_index.asc`, { headers, cache: "no-store" }),
    fetch(`${config.url}/rest/v1/formation_module_progress?select=*&access_code_id=eq.${encodeURIComponent(session.accessId)}`, { headers, cache: "no-store" }),
  ]);

  if (!modulesResponse.ok) return jsonError("Impossible de charger les modules.", 502);
  if (!progressResponse.ok) return jsonError("Impossible de charger la progression certifiante.", 502);

  const modules = (await modulesResponse.json()) as ModuleRow[];
  const progress = (await progressResponse.json()) as ProgressRow[];
  const progressByModule = new Map(progress.map((row) => [row.module_id, row]));

  const result = modules.map((module) => {
    const previous = modules.find((item) => item.order_index === module.order_index - 1);
    const previousProgress = previous ? progressByModule.get(previous.id) : null;
    const currentProgress = progressByModule.get(module.id);
    const previousValidated = module.order_index === 0 || Boolean(previousProgress?.completed || previousProgress?.status === "validated");
    const isValidated = Boolean(currentProgress?.completed || currentProgress?.status === "validated");
    const isAccessible = module.order_index === 0 || previousValidated;
    const status = isValidated
      ? "validated"
      : !isAccessible
      ? "locked"
      : currentProgress?.status === "quiz_failed" || currentProgress?.status === "in_progress"
      ? currentProgress.status
      : "available";

    return {
      module_id: module.id,
      order_index: module.order_index,
      title: module.title,
      duration: module.duration,
      estimated_hours: module.estimated_hours,
      platform_points: module.platform_points,
      requires_quiz: module.requires_quiz,
      quiz_pass_score: module.quiz_pass_score || 12,
      status,
      is_accessible: isAccessible,
      is_validated: isValidated,
      quiz_best_score: currentProgress?.quiz_best_score ?? null,
      validated_at: currentProgress?.validated_at || currentProgress?.completed_at || null,
      platform_points_awarded: currentProgress?.platform_points_awarded || 0,
    };
  });

  return Response.json({ modules: result });
}
