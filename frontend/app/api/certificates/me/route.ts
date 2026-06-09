import { getFormationSession, getSupabaseServiceConfig, jsonError, serviceHeaders } from "@/lib/formationSession";

export async function GET() {
  const session = await getFormationSession();
  if (!session) return jsonError("Session formation requise.", 401);

  const config = getSupabaseServiceConfig();
  if (!config) return jsonError("Supabase non configuré.", 503);

  const response = await fetch(
    `${config.url}/rest/v1/formation_certificates?select=*&access_code_id=eq.${encodeURIComponent(session.accessId)}&limit=1`,
    { headers: serviceHeaders(config.serviceRoleKey), cache: "no-store" }
  );

  if (!response.ok) return jsonError("Impossible de charger le certificat.", 502);
  const certificate = (await response.json())[0];
  if (!certificate) return jsonError("Certificat non disponible.", 404);

  return Response.json(certificate);
}
