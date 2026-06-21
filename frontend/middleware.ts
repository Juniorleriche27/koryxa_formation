import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE_NAME } from "@/lib/accessControl";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");

function redirectToMaintenanceAccess(request: NextRequest) {
  const accessUrl = new URL("/access", request.url);
  accessUrl.searchParams.set("from", request.nextUrl.pathname + request.nextUrl.search);

  const response = NextResponse.redirect(accessUrl);
  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie") || "";
  const response = await fetch(`${API_URL}/access/session`, {
    headers: { cookie, Accept: "application/json" },
    cache: "no-store",
  }).catch(() => null);

  if (!response?.ok) {
    return redirectToMaintenanceAccess(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/modules/:path*", "/certificate/:path*"],
};
