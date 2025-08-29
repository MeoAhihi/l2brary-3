import { NextRequest, NextResponse } from "next/server";

import { PAGE_LINKS, X_PATHNAME_KEY } from "./constants/common";
import { ACCESS_TOKEN } from "./constants/authentication";
import { checkTokenExpired, decrypt } from "@/lib/authentication";
import { PAGE_NAME } from "./types/common";

const PROTECTED_ROUTES = [
  PAGE_LINKS[PAGE_NAME.DASHBOARD],
  PAGE_LINKS[PAGE_NAME.BIRTHDAY],
  PAGE_LINKS[PAGE_NAME.MEMBERS],
  PAGE_LINKS[PAGE_NAME.PROFILE],
];

const PUBLIC_ROUTES = [
  PAGE_LINKS[PAGE_NAME.LOGIN],
  PAGE_LINKS[PAGE_NAME.SIGN_UP],
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get(ACCESS_TOKEN)?.value;
  const token = await decrypt(cookie);
  const isAuthenticated = !!token?.id && !checkTokenExpired(token);

  // Normalize headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(X_PATHNAME_KEY, pathname);

  // Handle root path access
  if (pathname === "/") {
    const url = isAuthenticated
      ? PAGE_LINKS[PAGE_NAME.DASHBOARD]
      : PAGE_LINKS[PAGE_NAME.LOGIN];
    return NextResponse.redirect(new URL(`/${url}`, req.url), {
      headers: requestHeaders,
    });
  }

  // Determine the current route type
  const cleanPath = pathname.slice(1); // Remove leading '/'
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    cleanPath.startsWith(route),
  );
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    cleanPath.startsWith(route),
  );

  // Redirect unauthenticated users from protected routes to the login page
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/${PAGE_LINKS[PAGE_NAME.LOGIN]}`, req.url),
      { headers: requestHeaders },
    );
  }

  // Redirect authenticated users from public routes to the dashboard
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/${PAGE_LINKS[PAGE_NAME.DASHBOARD]}`, req.url),
      { headers: requestHeaders },
    );
  }

  // Allow the request to proceed, attaching the modified headers
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Apply middleware to all paths except for API routes, Next.js internals, and static files.
  matcher: ["/", "/((?!api|_next|.*\..*).*)"],
};
