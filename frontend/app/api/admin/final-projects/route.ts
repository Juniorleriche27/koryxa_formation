import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";

type FinalProjectRow = {
  id: string;
  user_id: string;
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

type ProfileRow = {
  id: string;
  full_name?: string | null;
  email?: string | null;
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
  "user_id",
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

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

function adminProfileIdHeader(adminEmail: string) {
  return encodeURIComponent(`email.eq.${adminEmail}`);
}

async function getAdminProfileId(config: { url: string; serviceRoleKey: string }, adminEmail: string) {
  const response = await fetch(
    `${config.url}/rest/v1/profiles?select=id&or=(${adminProfileIdHeader(adminEmail)})&limit=1`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) return null;
  const rows = (await response.json()) as { id: string }[];
  return rows[0]?.id || null;
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.response) return admin.response;

  const config = getSupabaseConfig();
  if (!config) return jsonError("Supabase n'est pas configuré côté serveur.", 503);

  const response = await fetch(
    `${config.url}/rest/v1/final_projects?select=${SELECT_COLUMNS}&order=updated_at.desc`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return jsonError("Impossible de charger les projets finaux.", 502);
  }

  const projects = (await response.json()) as FinalProjectRow[];
  const userIds = Array.from(new Set(projects.map((project) => project.user_id).filter(Boolean)));

  if (userIds.length === 0) {
    return NextResponse.json({ projects });
  }

  const profilesResponse = await fetch(
    `${config.url}/rest/v1/profiles?select=id,full_name,email&id=in.(${userIds.map(encodeURIComponent).join(",")})`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    }
  );

  if (!profilesResponse.ok) {
    return NextResponse.json({ projects });
  }

  const profiles = (await profilesResponse.json()) as ProfileRow[];
  const profilesById = new Map(profiles.map((profile) => [profile.id, profile]));
  return NextResponse.json({
    projects: projects.map((project) => ({
      ...project,
      profiles: project.user_id ? profilesById.get(project.user_id) || null : null,
    })),
  });
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.response) return admin.response;

  const config = getSupabaseConfig();
  if (!config) return jsonError("Supabase n'est pas configuré côté serveur.", 503);

  const body = (await request.json().catch(() => null)) as GradePayload | null;
  const id = typeof body?.id === "string" ? body.id : "";
  const userId = typeof body?.user_id === "string" ? body.user_id : "";
  const status = body?.status || "graded";
  const score = Number(body?.score_points);
  const feedback = typeof body?.feedback === "string" ? body.feedback.trim() : "";
  const adminNotes = typeof body?.admin_notes === "string" ? body.admin_notes.trim() : "";

  if (!id && !userId) {
    return jsonError("Projet final introuvable.");
  }

  if (!["needs_revision", "graded", "validated", "rejected"].includes(status)) {
    return jsonError("Statut projet invalide.");
  }

  if ((status === "graded" || status === "validated") && (!Number.isFinite(score) || score < 0 || score > 60)) {
    return jsonError("La note du projet final doit être comprise entre 0 et 60.");
  }

  const now = new Date().toISOString();
  const adminProfileId = admin.email ? await getAdminProfileId(config, admin.email) : null;
  const payload = {
    status,
    score_points: status === "graded" || status === "validated" ? score : null,
    feedback: feedback || null,
    admin_notes: adminNotes || null,
    reviewed_by: adminProfileId,
    reviewed_at: now,
    graded_at: status === "graded" || status === "validated" ? now : null,
  };

  const filter = id ? `id=eq.${encodeURIComponent(id)}` : `user_id=eq.${encodeURIComponent(userId)}`;
  const response = await fetch(`${config.url}/rest/v1/final_projects?${filter}&select=${SELECT_COLUMNS}`, {
    method: "PATCH",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return jsonError("Impossible de corriger ce projet final.", 502);
  }

  const rows = await response.json();
  return NextResponse.json({ project: rows[0] || null });
}
