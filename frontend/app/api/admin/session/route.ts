import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminConfigIsReady,
  adminEmailMatches,
  adminSecretMatches,
  createAdminSession,
  getAdminSessionEmail,
} from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const email = await getAdminSessionEmail(request.cookies.get(ADMIN_COOKIE_NAME)?.value);

  if (!email) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, email });
}

export async function POST(request: NextRequest) {
  if (!adminConfigIsReady()) {
    return NextResponse.json(
      { message: "L'espace admin n'est pas encore configuré." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const secret = typeof body?.secret === "string" ? body.secret : "";

  if (!adminEmailMatches(email) || !adminSecretMatches(secret)) {
    return NextResponse.json({ message: "Accès administrateur refusé." }, { status: 401 });
  }

  const maxAge = 60 * 60 * 8;
  const response = NextResponse.json({ authenticated: true, email });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: await createAdminSession(email, maxAge),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
