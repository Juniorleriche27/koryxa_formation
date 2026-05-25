import { NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME, accessTokenFor } from "@/lib/accessControl";

export async function POST(request: Request) {
  const expectedCode = process.env.KORYXA_FORMATION_ACCESS_CODE;

  if (!expectedCode) {
    return NextResponse.json(
      { message: "Le code d'accès n'est pas encore configuré." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!code || code !== expectedCode.trim()) {
    return NextResponse.json(
      { message: "Code incorrect. Vérifie le code reçu après validation du paiement." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: await accessTokenFor(expectedCode),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });

  return response;
}
