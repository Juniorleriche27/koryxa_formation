import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";

type FinalProjectRow = {
  id: string;
  access_code_id: string;
  status: string;
  submission_url: string | null;
  submission_notes: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  graded_at: string | null;
  score_points: number | null;
  feedback: string | null;
  admin_notes: string | null;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
};

type AccessCodeRow = {
  id: string;
  student_name?: string | null;
  student_email?: string | null;
  partner_name?: string | null;
  partner_email?: string | null;
};

type GradePayload = {
  id?: string;
  user_id?: string;
  status?: "needs_revision" | "graded" | "validated" | "rejected";
  score_points?: number;
  feedback?: string;
  admin_notes?: string;
};

const SELECT_COLUMNS = [
  "id",
  "access_code_id",
  "status",
  "submission_url",
  "submission_notes",
  "submitted_at",
  "reviewed_at",
  "graded_at",
  "score_points",
  "feedback",
  "admin_notes",
  "reviewed_by",
  "created_at",
  "updated_at",
].join(",");

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return {
    url: url.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

function serviceHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.response) return admin.response;

  const config = getSupabaseConfig();
  if (!config) return jsonError("Supabase n'est pas configuré côté serveur.", 503);
  const headers = serviceHeaders(config.serviceRoleKey);

  const response = await fetch(
    `${config.url}/rest/v1/formation_final_projects?select=${SELECT_COLUMNS}&order=updated_at.desc`,
    { headers, cache: "no-store" }
  );

  if (!response.ok) return jsonError("Impossible de charger les projets finaux.", 502);

  const projects = (await response.json()) as FinalProjectRow[];
  const accessIds = Array.from(new Set(projects.map((project) => project.access_code_id).filter(Boolean)));

  if (accessIds.length === 0) return NextResponse.json({ projects: [] });

  const accessResponse = await fetch(
    `${config.url}/rest/v1/formation_access_codes?select=id,student_name,student_email,partner_name,partner_email&id=in.(${accessIds.map(encodeURIComponent).join(",")})`,
    { headers, cache: "no-store" }
  );

  const accessRows = accessResponse.ok ? ((await accessResponse.json()) as AccessCodeRow[]) : [];
  const accessById = new Map(accessRows.map((access) => [access.id, access]));

  return NextResponse.json({
    projects: projects.map((project) => {
      const access = accessById.get(project.access_code_id);
      return {
        ...project,
        user_id: project.access_code_id,
        profiles: {
          full_name: access?.student_name || access?.partner_name || "Apprenant",
          email: access?.student_email || access?.partner_email || null,
        },
      };
    }),
  });
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.response) return admin.response;

  const config = getSupabaseConfig();
  if (!config) return jsonError("Supabase n'est pas configuré côté serveur.", 503);

  const body = (await request.json().catch(() => null)) as GradePayload | null;
  const id = typeof body?.id === "string" ? body.id : "";
  const accessCodeId = typeof body?.user_id === "string" ? body.user_id : "";
  const status = body?.status || "graded";
  const score = Number(body?.score_points);
  const feedback = typeof body?.feedback === "string" ? body.feedback.trim() : "";
  const adminNotes = typeof body?.admin_notes === "string" ? body.admin_notes.trim() : "";

  if (!id && !accessCodeId) return jsonError("Projet final introuvable.");
  if (!["needs_revision", "graded", "validated", "rejected"].includes(status)) return jsonError("Statut projet invalide.");
  if ((status === "graded" || status === "validated") && (!Number.isFinite(score) || score < 0 || score > 60)) {
    return jsonError("La note du projet final doit être comprise entre 0 et 60.");
  }

  const now = new Date().toISOString();
  const payload = {
    status,
    score_points: status === "graded" || status === "validated" ? score : null,
    feedback: feedback || null,
    admin_notes: adminNotes || null,
    reviewed_by: admin.email,
    reviewed_at: now,
    graded_at: status === "graded" || status === "validated" ? now : null,
  };

  const filter = id ? `id=eq.${encodeURIComponent(id)}` : `access_code_id=eq.${encodeURIComponent(accessCodeId)}`;
  const response = await fetch(`${config.url}/rest/v1/formation_final_projects?${filter}&select=${SELECT_COLUMNS}`, {
    method: "PATCH",
    headers: {
      ...serviceHeaders(config.serviceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) return jsonError("Impossible de corriger ce projet final.", 502);

  const rows = await response.json();
  return NextResponse.json({ project: rows[0] || null });
}
