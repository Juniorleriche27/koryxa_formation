import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME, createAccessSession } from "@/lib/accessControl";
import { grantKoryxaAdminFormationAccess, summarizeGrant } from "@/lib/formationAccessAdmin";
import { normalizeBridgeRedirect, verifyKoryxaAdminBridge } from "@/lib/koryxaAdminBridge";

function maintenanceRedirect(request: NextRequest, reason: string) {
  const url = new URL("/access", request.url);
  url.searchParams.set("reason", reason);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const ctx = request.nextUrl.searchParams.get("ctx");
  const sig = request.nextUrl.searchParams.get("sig");
  const payload = await verifyKoryxaAdminBridge(ctx, sig);

  if (!payload) {
    return maintenanceRedirect(request, "invalid_admin_bridge");
  }

  try {
    const grant = await grantKoryxaAdminFormationAccess({
      koryxaAdminUserId: payload.clerk_user_id,
      email: payload.email,
      name: payload.name,
      roleKey: payload.role_key,
      months: 2,
    });
    const summary = summarizeGrant(grant);

    if (summary.status !== "active" || !grant) {
      return maintenanceRedirect(request, `grant_${summary.status}`);
    }

    const redirectPath = normalizeBridgeRedirect(payload.redirect);
    const maxAge = 60 * 60 * 24 * 90;
    const session = await createAccessSession(
      {
        sub: grant.id,
        name: grant.student_name || grant.koryxa_admin_name || payload.name || "Apprenant KORYXA",
        email: grant.student_email || grant.koryxa_admin_email || payload.email || null,
      },
      maxAge
    );
    const response = NextResponse.redirect(new URL(redirectPath, request.url));

    response.cookies.set({
      name: ACCESS_COOKIE_NAME,
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return response;
  } catch {
    return maintenanceRedirect(request, "admin_bridge_error");
  }
}
