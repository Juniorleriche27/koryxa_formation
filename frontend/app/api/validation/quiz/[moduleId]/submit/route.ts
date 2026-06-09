import { getFormationSession, getSupabaseServiceConfig, jsonError, serviceHeaders } from "@/lib/formationSession";

type RouteContext = {
  params: {
    moduleId: string;
  };
};

type QuestionRow = {
  id: string;
  answer: string;
  skill?: string | null;
  explanation?: string | null;
};

export async function POST(request: Request, context: RouteContext) {
  const session = await getFormationSession();
  if (!session) return jsonError("Session formation requise.", 401);

  const config = getSupabaseServiceConfig();
  if (!config) return jsonError("Supabase non configuré.", 503);

  const body = await request.json().catch(() => null);
  const answers = (body?.answers || {}) as Record<string, string>;
  const moduleId = context.params.moduleId;
  const headers = serviceHeaders(config.serviceRoleKey);

  const [moduleResponse, questionsResponse] = await Promise.all([
    fetch(`${config.url}/rest/v1/modules?select=*&id=eq.${encodeURIComponent(moduleId)}&limit=1`, { headers, cache: "no-store" }),
    fetch(`${config.url}/rest/v1/quiz_questions?select=id,answer,skill,explanation&module_id=eq.${encodeURIComponent(moduleId)}&is_active=eq.true`, { headers, cache: "no-store" }),
  ]);

  if (!moduleResponse.ok || !questionsResponse.ok) return jsonError("Impossible de corriger le QCM.", 502);
  const module = (await moduleResponse.json())[0];
  const questions = (await questionsResponse.json()) as QuestionRow[];

  if (!module) return jsonError("Module introuvable.", 404);
  if (!questions.length) return jsonError("Aucun QCM préparé pour ce module.", 404);

  let correct = 0;
  const reviewSections: string[] = [];
  const explanations: string[] = [];
  const normalizedAnswers = Object.fromEntries(
    Object.entries(answers).map(([key, value]) => [key, String(value).trim().toUpperCase()])
  );

  questions.forEach((question) => {
    const answer = normalizedAnswers[question.id];
    if (answer === question.answer) {
      correct += 1;
      return;
    }

    const skill = question.skill || "partie du module";
    if (!reviewSections.includes(skill)) reviewSections.push(skill);
    if (question.explanation) explanations.push(question.explanation);
  });

  const total = questions.length;
  const score = Math.round((correct / total) * 20);
  const passScore = Number(module.quiz_pass_score || 12);
  const passed = score >= passScore;
  const now = new Date().toISOString();

  await fetch(`${config.url}/rest/v1/formation_quiz_attempts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      access_code_id: session.accessId,
      module_id: moduleId,
      score,
      max_score: 20,
      passed,
      answers: normalizedAnswers,
      correct_count: correct,
      total_questions: total,
      review_sections: reviewSections,
      feedback: passed
        ? "QCM validé. Module suivant débloqué."
        : "QCM non validé. Consulte les parties recommandées puis refais le QCM.",
    }),
  });

  const existingResponse = await fetch(
    `${config.url}/rest/v1/formation_module_progress?select=*&access_code_id=eq.${encodeURIComponent(session.accessId)}&module_id=eq.${encodeURIComponent(moduleId)}&limit=1`,
    { headers, cache: "no-store" }
  );
  const existing = existingResponse.ok ? (await existingResponse.json())[0] : null;
  const alreadyValidated = Boolean(existing?.completed || existing?.status === "validated");
  const moduleValidated = passed || alreadyValidated;

  const progressPayload = {
    access_code_id: session.accessId,
    module_id: moduleId,
    completed: moduleValidated,
    completed_at: passed && !alreadyValidated ? now : existing?.completed_at || null,
    status: moduleValidated ? "validated" : "quiz_failed",
    started_at: existing?.started_at || now,
    last_seen_at: now,
    validated_at: passed && !alreadyValidated ? now : existing?.validated_at || null,
    quiz_best_score: Math.max(score, Number(existing?.quiz_best_score || 0)),
    platform_points_awarded: moduleValidated ? Number(module.platform_points || 0) : Number(existing?.platform_points_awarded || 0),
    validation_source: passed ? "quiz" : existing?.validation_source || null,
  };

  await fetch(`${config.url}/rest/v1/formation_module_progress?on_conflict=access_code_id,module_id`, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(progressPayload),
  });

  return Response.json({
    module_id: moduleId,
    score,
    max_score: 20,
    pass_score: passScore,
    passed,
    module_validated: moduleValidated,
    correct_count: correct,
    total_questions: total,
    review_sections: reviewSections,
    feedback: passed
      ? "QCM validé. Module suivant débloqué."
      : "QCM non validé. Consulte les parties recommandées puis refais le QCM.",
    explanations: explanations.slice(0, 5),
  });
}
