import { getFormationSession, getSupabaseServiceConfig, jsonError, serviceHeaders } from "@/lib/formationSession";

const CERTIFICATE_MIN_DAYS = 21;
const PASSING_SCORE = 60;

function daysBetween(value?: string | null) {
  if (!value) return 0;
  const start = new Date(value).getTime();
  if (!Number.isFinite(start)) return 0;
  return Math.max(0, Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24)));
}

export async function GET() {
  const session = await getFormationSession();
  if (!session) return jsonError("Session formation requise.", 401);

  const config = getSupabaseServiceConfig();
  if (!config) return jsonError("Supabase non configuré.", 503);
  const headers = serviceHeaders(config.serviceRoleKey);

  const [grantResponse, modulesResponse, progressResponse, projectResponse] = await Promise.all([
    fetch(`${config.url}/rest/v1/formation_access_codes?select=activated_at,access_until,certificate_eligible_from&id=eq.${encodeURIComponent(session.accessId)}&limit=1`, { headers, cache: "no-store" }),
    fetch(`${config.url}/rest/v1/modules?select=id,order_index,platform_points&is_published=eq.true&order=order_index.asc`, { headers, cache: "no-store" }),
    fetch(`${config.url}/rest/v1/formation_module_progress?select=*&access_code_id=eq.${encodeURIComponent(session.accessId)}`, { headers, cache: "no-store" }),
    fetch(`${config.url}/rest/v1/formation_final_projects?select=*&access_code_id=eq.${encodeURIComponent(session.accessId)}&limit=1`, { headers, cache: "no-store" }),
  ]);

  if (!grantResponse.ok || !modulesResponse.ok || !progressResponse.ok || !projectResponse.ok) {
    return jsonError("Impossible de calculer le certificat.", 502);
  }

  const grant = (await grantResponse.json())[0] || null;
  const modules = await modulesResponse.json();
  const progress = await progressResponse.json();
  const project = (await projectResponse.json())[0] || null;
  const progressByModule = new Map(progress.map((row: { module_id: string }) => [row.module_id, row]));
  const requiredModules = modules.filter((module: { order_index: number }) => module.order_index <= 6);

  let modulesValidated = 0;
  let platformScore = 0;
  const missingModules: string[] = [];

  requiredModules.forEach((module: { id: string; order_index: number; platform_points?: number }) => {
    const row = progressByModule.get(module.id) as { completed?: boolean; status?: string; platform_points_awarded?: number } | undefined;
    if (row?.completed || row?.status === "validated") {
      modulesValidated += 1;
      platformScore += Number(row.platform_points_awarded || module.platform_points || 0);
    } else {
      missingModules.push(`Module ${module.order_index}`);
    }
  });

  const projectIsGraded = Boolean(project && ["graded", "validated"].includes(project.status));
  const projectScore = projectIsGraded ? Number(project.score_points || 0) : 0;
  const finalScore = Math.min(100, platformScore + projectScore);
  const daysElapsed = daysBetween(grant?.activated_at);
  const daysRemaining = Math.max(0, CERTIFICATE_MIN_DAYS - daysElapsed);

  const blockingReasons: string[] = [];
  if (!grant?.activated_at) blockingReasons.push("Aucun accès formation activé n'a été trouvé.");
  if (daysRemaining > 0) blockingReasons.push(`Il reste ${daysRemaining} jour(s) avant le délai minimum de 21 jours pour le certificat.`);
  if (missingModules.length) blockingReasons.push(`Modules non validés : ${missingModules.join(", ")}`);
  if (!projectIsGraded) blockingReasons.push("Projet final non noté.");
  if (finalScore < PASSING_SCORE) blockingReasons.push("Score final inférieur à 60/100.");

  return Response.json({
    user_id: session.accessId,
    platform_score: platformScore,
    project_score: projectScore,
    final_score: finalScore,
    modules_validated: modulesValidated,
    modules_required: 7,
    access_activated_at: grant?.activated_at || null,
    access_until: grant?.access_until || null,
    certificate_eligible_from: grant?.certificate_eligible_from || null,
    is_eligible: blockingReasons.length === 0,
    blocking_reasons: blockingReasons,
    days_elapsed_since_activation: daysElapsed,
    days_remaining_for_certificate: daysRemaining,
    final_project: project,
  });
}
