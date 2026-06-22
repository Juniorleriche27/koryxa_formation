import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME, getAccessSessionPayload } from "@/lib/accessControl";
import { findGrantById, summarizeGrant } from "@/lib/formationAccessAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ModuleRow = {
  id: string;
  title: string | null;
  duration: string | null;
  estimated_hours: number | null;
  platform_points: number | null;
  requires_quiz: boolean | null;
  quiz_pass_score: number | null;
  order_index: number | null;
};

type ProgressRow = {
  module_id: string;
  completed?: boolean | null;
  status?: string | null;
  quiz_best_score?: number | null;
  completed_at?: string | null;
  validated_at?: string | null;
  platform_points_awarded?: number | null;
};

const QUIZ_PASS_SCORE = 12;

function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return {
    url: url.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

async function supabaseGet<T>(path: string): Promise<T> {
  const config = supabaseConfig();
  if (!config) {
    throw new Error("Supabase formation non configuré.");
  }

  const response = await fetch(`${config.url}${path}`, {
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase a répondu ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

function isValidated(row?: ProgressRow | null) {
  return Boolean(row && (row.completed || row.status === "validated"));
}

export async function GET(request: NextRequest) {
  const session = await getAccessSessionPayload(request.cookies.get(ACCESS_COOKIE_NAME)?.value);

  if (!session || session.sub === "legacy-access") {
    return NextResponse.json({ message: "Session formation requise." }, { status: 401 });
  }

  const grant = await findGrantById(session.sub);
  const summary = summarizeGrant(grant);

  if (!grant || summary.status !== "active") {
    return NextResponse.json({ message: "Session formation invalide." }, { status: 401 });
  }

  const modules = await supabaseGet<ModuleRow[]>(
    "/rest/v1/modules?select=id,title,duration,estimated_hours,platform_points,requires_quiz,quiz_pass_score,order_index&is_published=eq.true&order=order_index.asc"
  );
  const progressRows = await supabaseGet<ProgressRow[]>(
    `/rest/v1/formation_module_progress?select=module_id,completed,status,quiz_best_score,completed_at,validated_at,platform_points_awarded&access_code_id=eq.${encodeURIComponent(grant.id)}`
  );

  const progressByModuleId = new Map(progressRows.map((row) => [row.module_id, row]));
  const result = modules.map((module) => {
    const orderIndex = Number(module.order_index ?? 0);
    const previous = modules.find((item) => Number(item.order_index ?? -1) === orderIndex - 1);
    const previousValidated = orderIndex === 0 || (previous ? isValidated(progressByModuleId.get(previous.id)) : false);
    const row = progressByModuleId.get(module.id);
    const validated = isValidated(row);
    const status = validated
      ? "validated"
      : !previousValidated
        ? "locked"
        : row?.status === "quiz_failed" || row?.status === "in_progress"
          ? row.status
          : "available";

    return {
      module_id: module.id,
      order_index: module.order_index,
      title: module.title,
      duration: module.duration,
      estimated_hours: module.estimated_hours,
      platform_points: module.platform_points,
      requires_quiz: module.requires_quiz,
      quiz_pass_score: module.quiz_pass_score || QUIZ_PASS_SCORE,
      status,
      is_accessible: previousValidated,
      is_validated: validated,
      quiz_best_score: row?.quiz_best_score ?? null,
      validated_at: row?.validated_at || row?.completed_at || null,
      platform_points_awarded: row?.platform_points_awarded || 0,
    };
  });

  return NextResponse.json({ modules: result });
}
