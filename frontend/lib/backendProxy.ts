import { ACCESS_COOKIE_NAME, getAccessSessionPayload } from "@/lib/accessControl";

function backendBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");
}

export function backendUrl(path: string) {
  return `${backendBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function proxyBackend(request: Request, path: string, init: RequestInit = {}) {
  const body = init.body ?? (request.method === "GET" || request.method === "HEAD" ? undefined : await request.text());
  const cookieHeader = request.headers.get("cookie") || "";
  const accessCookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ACCESS_COOKIE_NAME}=`))
    ?.slice(ACCESS_COOKIE_NAME.length + 1);
  const sessionPayload = await getAccessSessionPayload(accessCookie ? decodeURIComponent(accessCookie) : null);
  const internalSecret = (process.env.KORYXA_IDENTITY_BRIDGE_KEY || "").trim();

  const response = await fetch(backendUrl(path), {
    method: init.method || request.method,
    headers: {
      Accept: "application/json",
      "Content-Type": request.headers.get("content-type") || "application/json",
      cookie: cookieHeader,
      ...(sessionPayload?.sub && internalSecret
        ? {
            "x-koryxa-internal-secret": internalSecret,
            "x-koryxa-access-id": sessionPayload.sub,
          }
        : {}),
      ...(init.headers || {}),
    },
    body,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "application/json";
  const payload = await response.text();

  return new Response(payload, {
    status: response.status,
    headers: {
      "content-type": contentType,
    },
  });
}
