import { NextRequest, NextResponse } from "next/server";

import { checkTokenExpired, decrypt } from "@/lib/authentication";

import { ACCESS_TOKEN } from "./constants/authentication";
import { PAGE_LINKS, X_PATHNAME_KEY } from "./constants/common";
import { matchesRoutes } from "./lib/routes";
import { RoleEnum } from "./types/auth/iam.response";
import { PAGE_NAME } from "./types/common";

// Define route patterns for different access levels
const AUTH_ROUTES = ["/login", "/sign-up", "/register"];

const PUBLIC_ROUTES = ["/", "/about", "/contact", "/courses", "/knowledge"];

const PROTECTED_ROUTES = ["/profile", "/my-progress", "/log-activity"];

const ADMIN_ROUTES = ["/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get authentication token
  const cookie = req.cookies.get(ACCESS_TOKEN)?.value;
  const token = await decrypt(cookie);
  const isTokenExpired = checkTokenExpired(token?.exp || 0);
  const isAuthenticated = !isTokenExpired;

  // Create request headers for passing pathname
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(X_PATHNAME_KEY, pathname);

  // Check route access requirements
  const isAuthRoute = matchesRoutes(pathname, AUTH_ROUTES);
  const isPublicRoute = matchesRoutes(pathname, PUBLIC_ROUTES);
  const isProtectedRoute = matchesRoutes(pathname, PROTECTED_ROUTES);
  const isAdminRoute = matchesRoutes(pathname, ADMIN_ROUTES);

  // Handle auth routes (login, register)
  if (isAuthRoute) {
    if (isAuthenticated) {
      const userRoles = token?.roles || [];

      if (userRoles.includes(RoleEnum.Admin)) {
        return NextResponse.redirect(
          new URL(`/${PAGE_LINKS[PAGE_NAME.ADMIN_DASHBOARD]}`, req.url),
          {
            headers: requestHeaders,
          },
        );
      }

      if (userRoles.includes(RoleEnum.Monitor)) {
        return NextResponse.redirect(
          new URL(`/${PAGE_LINKS[PAGE_NAME.LOG_ACTIVITY]}`, req.url),
          {
            headers: requestHeaders,
          },
        );
      }

      // Redirect authenticated users away from auth pages
      return NextResponse.redirect(new URL("/", req.url), {
        headers: requestHeaders,
      });
    }
    // Allow access to auth routes for unauthenticated users
    return NextResponse.next({ headers: requestHeaders });
  }

  // Handle admin routes
  if (isAdminRoute) {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(
        new URL(`/${PAGE_LINKS[PAGE_NAME.LOGIN]}`, req.url),
        { headers: requestHeaders },
      );
    }

    // Check if user has admin role
    const userRole = token?.roles;

    if (!userRole.includes(RoleEnum.Admin)) {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL("/", req.url), {
        headers: requestHeaders,
      });
    }

    // Allow access for authenticated admin users
    return NextResponse.next({ headers: requestHeaders });
  }

  // Handle protected routes (non-admin)
  if (isProtectedRoute) {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(
        new URL(`/${PAGE_LINKS[PAGE_NAME.LOGIN]}`, req.url),
        { headers: requestHeaders },
      );
    }

    // Check if user has monitor role for log-activity page
    if (pathname.startsWith("/log-activity")) {
      const userRoles = token?.roles || [];
      if (
        !userRoles.includes(RoleEnum.Monitor) &&
        !userRoles.includes(RoleEnum.Admin)
      ) {
        // Redirect non-monitor users to home
        return NextResponse.redirect(
          new URL(`/${PAGE_LINKS[PAGE_NAME.HOME]}`, req.url),
          { headers: requestHeaders },
        );
      }
    }

    // Allow access for authenticated users
    return NextResponse.next({ headers: requestHeaders });
  }

  // Handle public routes and any other routes
  if (
    isPublicRoute ||
    !matchesRoutes(pathname, [
      ...AUTH_ROUTES,
      ...PROTECTED_ROUTES,
      ...ADMIN_ROUTES,
    ])
  ) {
    // Public routes are accessible to everyone
    return NextResponse.next({ headers: requestHeaders });
  }

  // Default: allow access with headers
  return NextResponse.next({ headers: requestHeaders });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
