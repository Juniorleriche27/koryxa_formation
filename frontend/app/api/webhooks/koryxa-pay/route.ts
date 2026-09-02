import { NextRequest, NextResponse } from "next/server";

const CAREER_PACKS: Record<string, { title: string; courses: string[] }> = {
  "full-stack-data-analyst": {
    title: "Pack Full-Stack Data Analyst",
    courses: ["excel-data-analyst", "sql-data-analyst", "power-bi-data-analyst"],
  },
  "data-scientist-ai-engineer": {
    title: "Pack Data Scientist & AI Engineer",
    courses: ["python-data-analyst", "statistics-data-science-python", "machine-learning-python", "llm-rag"],
  },
  "data-ultimate-all-access": {
    title: "Pack Data Ultimate All-Access",
    courses: [
      "python-data-analyst",
      "excel-data-analyst",
      "sql-data-analyst",
      "power-bi-data-analyst",
      "statistics-data-science-python",
      "machine-learning-python",
      "data-engineering-python-sql",
      "llm-rag",
    ],
  },
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request: NextRequest) {
  const expectedKey =
    process.env.KORYXA_IDENTITY_BRIDGE_KEY ||
    process.env.KORYXA_INTERNAL_SECRET ||
    "";

  const bridgeKey = request.headers.get("x-koryxa-bridge-key") || request.headers.get("x-koryxa-internal-secret") || "";

  if (!expectedKey || bridgeKey !== expectedKey) {
    return jsonError("Accès webhook non autorisé.", 401);
  }

  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    return jsonError("Payload invalide.");
  }

  const event = payload.event || "payment.success";
  if (event === "payment.failed") {
    return NextResponse.json({ success: true, status: "acknowledged", event });
  }

  const itemType = payload.item_type === "pack" ? "pack" : "course";
  const itemSlug = typeof payload.item_slug === "string" ? payload.item_slug.trim() : "";
  const learnerEmail = typeof payload.learner_email === "string" ? payload.learner_email.trim().toLowerCase() : "";
  const clerkUserId = typeof payload.clerk_user_id === "string" ? payload.clerk_user_id.trim() : learnerEmail;

  if (!itemSlug || !learnerEmail) {
    return jsonError("item_slug et learner_email sont requis.");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return jsonError("Configuration Supabase manquante côté serveur.", 500);
  }

  let courseSlugs: string[] = [];
  if (itemType === "pack") {
    const pack = CAREER_PACKS[itemSlug];
    if (!pack) {
      return jsonError(`Pack inconnu : ${itemSlug}`, 404);
    }
    courseSlugs = pack.courses;
  } else {
    courseSlugs = [itemSlug];
  }

  const now = new Date().toISOString();
  const enrolled: string[] = [];

  for (const slug of courseSlugs) {
    // 1. Trouver le cours
    const courseRes = await fetch(
      `${supabaseUrl}/rest/v1/courses?slug=eq.${encodeURIComponent(slug)}&select=id,slug,title&limit=1`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      }
    );

    const courseData = await courseRes.json().catch(() => []);
    if (!Array.isArray(courseData) || courseData.length === 0) continue;
    const course = courseData[0];

    // 2. Insérer/mettre à jour la commande
    await fetch(`${supabaseUrl}/rest/v1/formation_orders`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        learner_user_id: clerkUserId,
        learner_email: learnerEmail,
        course_id: course.id,
        amount: itemType === "pack" ? 0 : Number(payload.amount || 0),
        currency: payload.currency || "XOF",
        status: "paid",
        payment_method: payload.payment_method || "koryxa_pay",
        payment_reference: payload.payment_reference || payload.transaction_id || `KP-${Date.now()}`,
        partner_code: payload.partner_code || null,
        paid_at: now,
      }),
    });

    // 3. Insérer ou activer l'enrôlement
    const existingEnrollRes = await fetch(
      `${supabaseUrl}/rest/v1/formation_enrollments?learner_user_id=eq.${encodeURIComponent(clerkUserId)}&course_id=eq.${encodeURIComponent(course.id)}&limit=1`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      }
    );

    const existingEnroll = await existingEnrollRes.json().catch(() => []);
    if (Array.isArray(existingEnroll) && existingEnroll.length > 0) {
      await fetch(`${supabaseUrl}/rest/v1/formation_enrollments?id=eq.${encodeURIComponent(existingEnroll[0].id)}`, {
        method: "PATCH",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "active",
          access_source: "koryxa_pay",
          revoked_at: null,
        }),
      });
    } else {
      await fetch(`${supabaseUrl}/rest/v1/formation_enrollments`, {
        method: "POST",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learner_user_id: clerkUserId,
          course_id: course.id,
          status: "active",
          access_source: "koryxa_pay",
        }),
      });
    }

    enrolled.push(slug);
  }

  return NextResponse.json({
    success: true,
    transaction_id: payload.transaction_id || `KP-${Date.now()}`,
    item_type: itemType,
    item_slug: itemSlug,
    enrolled_courses: enrolled,
    learner_email: learnerEmail,
  });
}
