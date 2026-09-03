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
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/dashboard";
  if (value.startsWith("/login") || value.startsWith("/register")) return "/dashboard";
  if (value.startsWith("/access")) {
    const searchIdx = value.indexOf("?");
    return searchIdx >= 0 ? `/dashboard${value.slice(searchIdx)}` : "/dashboard";
  }
  return value;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export async function GET(request: NextRequest) {
  const redirectTarget = normalizeRedirect(request.nextUrl.searchParams.get("redirect"));

  try {
    const authContext = auth();
    if (!authContext?.userId) {
      const signIn = new URL("https://accounts.koryxa.fr/sign-in");
      signIn.searchParams.set("redirect_url", request.url);
      return NextResponse.redirect(signIn);
    }

    const secret = bridgeKey();
    if (!secret) {
      return NextResponse.redirect(new URL(redirectTarget, request.url));
    }

    const user = await currentUser().catch(() => null);
    const email = user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase() || "";
    if (!email) {
      return NextResponse.redirect(new URL(redirectTarget, request.url));
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
      redirect: redirectTarget,
    };

    const ctx = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const target = new URL(callbackUrl());
    target.searchParams.set("ctx", ctx);
    target.searchParams.set("sig", sign(ctx, secret));

    return NextResponse.redirect(target);
  } catch {
    // Si Clerk server SDK n'est pas configuré sur le domaine ou en cas d'erreur de token, redirection sûre vers le dashboard
    return NextResponse.redirect(new URL(redirectTarget, request.url));
  }
}
