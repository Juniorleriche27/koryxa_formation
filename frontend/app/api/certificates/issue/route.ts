import { getFormationSession, getSupabaseServiceConfig, jsonError, serviceHeaders } from "@/lib/formationSession";

export async function POST(request: Request) {
  const session = await getFormationSession();
  if (!session) return jsonError("Session formation requise.", 401);

  const config = getSupabaseServiceConfig();
  if (!config) return jsonError("Supabase non configuré.", 503);

  const statusResponse = await fetch(new URL("/api/validation/certification/me", request.url), {
    headers: { cookie: request.headers.get("cookie") || "" },
    cache: "no-store",
  });
  const certificationStatus = await statusResponse.json().catch(() => null);

  if (!statusResponse.ok || !certificationStatus?.is_eligible) {
    return Response.json(
      { message: "Certificat non disponible.", certification_status: certificationStatus },
      { status: 403 }
    );
  }

  const headers = serviceHeaders(config.serviceRoleKey);
  const existingResponse = await fetch(
    `${config.url}/rest/v1/formation_certificates?select=*&access_code_id=eq.${encodeURIComponent(session.accessId)}&limit=1`,
    { headers, cache: "no-store" }
  );
  if (existingResponse.ok) {
    const existing = (await existingResponse.json())[0];
    if (existing) return Response.json({ ...existing, certification_status: certificationStatus });
  }

  const response = await fetch(`${config.url}/rest/v1/formation_certificates?select=*`, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      access_code_id: session.accessId,
      platform_score: certificationStatus.platform_score,
      project_score: certificationStatus.project_score,
      final_score: certificationStatus.final_score,
      eligibility_snapshot: certificationStatus,
    }),
  });

  if (!response.ok) return jsonError("Impossible de générer le certificat.", 502);
  const certificate = (await response.json())[0];
  return Response.json({ ...certificate, certification_status: certificationStatus });
}
