import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const backendUrl = (
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL
)?.replace(/\/+$/, "");

const isProtected = (path: string) =>
  path === "/dashboard" || path.startsWith("/dashboard/");

const authRoutes = ["/login", "/signup"];

// A session cookie can outlive its session (expired, revoked, database reset).
// getSessionCookie only checks that the cookie exists, so on /login and
// /signup we ask the backend whether the session is still valid. Without this,
// a stale cookie would redirect the user away from /login while every API call
// returns 401. Only these two pages pay for the extra request.
async function hasValidSession(request: NextRequest) {
  if (!backendUrl) return false;

  try {
    const response = await fetch(`${backendUrl}/api/auth/get-session`, {
      headers: { cookie: request.headers.get("cookie") ?? "" },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return false;

    const data = await response.json();
    return Boolean(data?.session);
  } catch {
    // Backend down or slow: show the login form instead of blocking the user.
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  // Not logged in -> block dashboard (fast, cookie-only check; the backend
  // still verifies the session on every API call)
  if (isProtected(pathname) && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // Really logged in -> skip login/signup
  if (
    authRoutes.includes(pathname) &&
    sessionCookie &&
    (await hasValidSession(request))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login", "/signup"],
};