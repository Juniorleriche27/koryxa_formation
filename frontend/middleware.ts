import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  getExpectedAccessToken,
  isValidAccessSession,
} from "@/lib/accessControl";

const KORYXA_LOGIN = process.env.NEXT_PUBLIC_KORYXA_SITE_URL + "/login";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const hasSignedAccess = await isValidAccessSession(accessToken);

  if (!hasSignedAccess) {
    const expectedAccessToken = await getExpectedAccessToken();
    const hasLegacyAccess = Boolean(expectedAccessToken && accessToken === expectedAccessToken);

    if (!hasLegacyAccess) {
      const accessUrl = request.nextUrl.clone();
      accessUrl.pathname = "/access";
      accessUrl.search = "";
      accessUrl.searchParams.set("redirect", pathname + request.nextUrl.search);
      return NextResponse.redirect(accessUrl);
    }
  }

  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  const session = request.cookies.get("innova_session")?.value;
  if (!session) {
    const returnUrl = APP_URL + pathname;
    const loginUrl = `${KORYXA_LOGIN}?redirect=${encodeURIComponent(returnUrl)}`;
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/modules/:path*", "/certificate/:path*"],
};
