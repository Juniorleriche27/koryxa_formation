import { getFormationSession, getSupabaseServiceConfig, jsonError, serviceHeaders } from "@/lib/formationSession";

export async function POST(request: Request) {
  const session = await getFormationSession();
  if (!session) return jsonError("Session formation requise.", 401);

  const config = getSupabaseServiceConfig();
  if (!config) return jsonError("Supabase non configuré.", 503);

  const body = await request.json().catch(() => null);
  const submissionUrl = typeof body?.submission_url === "string" ? body.submission_url.trim() : "";
  const submissionNotes = typeof body?.submission_notes === "string" ? body.submission_notes.trim() : "";
  const headers = serviceHeaders(config.serviceRoleKey);

  const modulesResponse = await fetch(`${config.url}/rest/v1/modules?select=id,order_index&is_published=eq.true&order=order_index.asc`, { headers, cache: "no-store" });
  const progressResponse = await fetch(`${config.url}/rest/v1/formation_module_progress?select=module_id,status,completed&access_code_id=eq.${encodeURIComponent(session.accessId)}`, { headers, cache: "no-store" });

  if (!modulesResponse.ok || !progressResponse.ok) return jsonError("Progression certifiante indisponible.", 502);

  const modules = await modulesResponse.json();
  const progress = await progressResponse.json();
  const progressByModule = new Map(progress.map((row: { module_id: string; status: string; completed: boolean }) => [row.module_id, row]));
  const requiredModules = modules.filter((module: { order_index: number }) => module.order_index <= 6);
  const allValidated = requiredModules.every((module: { id: string }) => {
    const row = progressByModule.get(module.id) as { status?: string; completed?: boolean } | undefined;
    return Boolean(row?.completed || row?.status === "validated");
  });

  if (!allValidated) return jsonError("Projet final bloqué. Valide d'abord les modules 0 à 6.", 403);

  const now = new Date().toISOString();
  const response = await fetch(`${config.url}/rest/v1/formation_final_projects?on_conflict=access_code_id`, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({
      access_code_id: session.accessId,
      status: "submitted",
      submission_url: submissionUrl || null,
      submission_notes: submissionNotes || null,
      submitted_at: now,
    }),
  });

  if (!response.ok) return jsonError("Impossible de soumettre le projet final.", 502);
  const rows = await response.json();
  return Response.json(rows[0] || null);
}
