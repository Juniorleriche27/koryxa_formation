import { getFormationSession, getSupabaseServiceConfig, jsonError, serviceHeaders } from "@/lib/formationSession";

type RouteContext = {
  params: {
    moduleId: string;
  };
};

export async function GET(_request: Request, context: RouteContext) {
  const session = await getFormationSession();
  if (!session) return jsonError("Session formation requise.", 401);

  const config = getSupabaseServiceConfig();
  if (!config) return jsonError("Supabase non configuré.", 503);

  const headers = serviceHeaders(config.serviceRoleKey);
  const moduleId = context.params.moduleId;

  const moduleResponse = await fetch(`${config.url}/rest/v1/modules?select=*&id=eq.${encodeURIComponent(moduleId)}&limit=1`, { headers, cache: "no-store" });

  if (!moduleResponse.ok) return jsonError("Module introuvable.", 404);
  const moduleRows = await moduleResponse.json();
  const courseModule = moduleRows[0];
  if (!courseModule) return jsonError("Module introuvable.", 404);

  // Vérification d'accès sans appel HTTP interne fragile.
  const modulesResponse = await fetch(`${config.url}/rest/v1/modules?select=id,order_index&is_published=eq.true&order=order_index.asc`, { headers, cache: "no-store" });
  const progressResponse = await fetch(`${config.url}/rest/v1/formation_module_progress?select=module_id,status,completed&access_code_id=eq.${encodeURIComponent(session.accessId)}`, { headers, cache: "no-store" });
  if (!modulesResponse.ok || !progressResponse.ok) return jsonError("Progression certifiante indisponible.", 502);
  const modules = await modulesResponse.json();
  const progress = await progressResponse.json();
  const progressByModule = new Map(progress.map((row: { module_id: string; status: string; completed: boolean }) => [row.module_id, row]));
  const previous = modules.find((item: { order_index: number }) => item.order_index === courseModule.order_index - 1);
  const previousProgress = previous ? progressByModule.get(previous.id) as { status?: string; completed?: boolean } | undefined : null;
  const isAccessible = courseModule.order_index === 0 || Boolean(previousProgress?.completed || previousProgress?.status === "validated");
  if (!isAccessible) return jsonError("Module bloqué. Valide le module précédent avant de passer au QCM.", 403);

  const questionsResponse = await fetch(
    `${config.url}/rest/v1/quiz_questions?select=id,order_index,question,options,difficulty,skill&module_id=eq.${encodeURIComponent(moduleId)}&is_active=eq.true&order=order_index.asc`,
    { headers, cache: "no-store" }
  );

  if (!questionsResponse.ok) return jsonError("Impossible de charger le QCM.", 502);
  const questions = await questionsResponse.json();
  if (!questions.length) return jsonError("Aucun QCM préparé pour ce module.", 404);

  return Response.json({
    module_id: moduleId,
    pass_score: courseModule.quiz_pass_score || 12,
    questions,
  });
}
