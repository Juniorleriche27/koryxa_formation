import { createHmac } from "crypto";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const PROJECT_SLUG = "koryxa-formation";
const DEFAULT_CALLBACK = "https://api.formation.koryxa.fr/access/koryxa-identity/callback";

function bridgeKey() {
  return (process.env.KORYXA_IDENTITY_BRIDGE_KEY || "").trim();
}

function callbackUrl() {
  return (process.env.KORYXA_FORMATION_IDENTITY_CALLBACK_URL || DEFAULT_CALLBACK).trim();
}

function normalizeRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/access";
  if (value.startsWith("/login") || value.startsWith("/register")) return "/access";
  return value;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export async function GET(request: NextRequest) {
  const authContext = auth();
  if (!authContext.userId) {
    const signIn = new URL("https://accounts.koryxa.fr/sign-in");
    signIn.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signIn);
  }

  const secret = bridgeKey();
  if (!secret) {
    const access = new URL("/access", request.url);
    access.searchParams.set("identity_error", "bridge_missing");
    return NextResponse.redirect(access);
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase() || "";
  if (!email) {
    const access = new URL("/access", request.url);
    access.searchParams.set("identity_error", "email_missing");
    return NextResponse.redirect(access);
  }

  const name = user?.fullName?.trim() || user?.firstName?.trim() || email;
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    v: 1,
    project: PROJECT_SLUG,
    purpose: "learner_identity",
    clerk_user_id: authContext.userId,
    email,
    name,
    iat: now,
    exp: now + 120,
    redirect: normalizeRedirect(request.nextUrl.searchParams.get("redirect")),
  };

  const ctx = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const target = new URL(callbackUrl());
  target.searchParams.set("ctx", ctx);
  target.searchParams.set("sig", sign(ctx, secret));

  return NextResponse.redirect(target);
}
