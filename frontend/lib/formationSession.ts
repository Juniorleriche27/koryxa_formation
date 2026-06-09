import { cookies } from "next/headers";
import { ACCESS_COOKIE_NAME, getAccessSessionPayload } from "@/lib/accessControl";
import { findGrantById, summarizeGrant } from "@/lib/formationAccessAdmin";

export type FormationSession = {
  accessId: string;
  name?: string | null;
  email?: string | null;
};

export async function getFormationSession(): Promise<FormationSession | null> {
  const token = cookies().get(ACCESS_COOKIE_NAME)?.value;
  const payload = await getAccessSessionPayload(token);

  if (!payload || payload.sub === "legacy-access") {
    return null;
  }

  const grant = await findGrantById(payload.sub);
  const summary = summarizeGrant(grant);

  if (summary.status !== "active" || !grant) {
    return null;
  }

  return {
    accessId: grant.id,
    name: grant.student_name || grant.partner_name || payload.name,
    email: grant.student_email || grant.partner_email || payload.email,
  };
}

export function getSupabaseServiceConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return {
    url: url.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

export function serviceHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

export function jsonError(message: string, status = 400) {
  return Response.json({ message }, { status });
}
