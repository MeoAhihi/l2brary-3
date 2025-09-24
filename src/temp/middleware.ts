import { NextRequest, NextResponse } from "next/server";

import { checkTokenExpired, decrypt } from "@/lib/authentication";

import { ACCESS_TOKEN } from "../constants/authentication";
import { PAGE_LINKS, X_PATHNAME_KEY } from "../constants/common";
import { PAGE_NAME } from "../types/common";

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

  //Authentication
  const cookie = req.cookies.get(ACCESS_TOKEN)?.value;
  const token = await decrypt(cookie);
  const isTokenExpired = checkTokenExpired(token);
  const segments = pathname.split("/").slice(2);

  const lastPathname = segments.join("/");

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    lastPathname.startsWith(route),
  );
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    lastPathname.startsWith(route),
  );

  const isRedirectToLogin = isProtectedRoute && (!token?.id || isTokenExpired);
  const isRedirectToDashboard = isPublicRoute && token?.id;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(X_PATHNAME_KEY, pathname);

  // No login
  if (isRedirectToLogin) {
    return NextResponse.redirect(
      new URL(`/${PAGE_LINKS[PAGE_NAME.LOGIN]}`, req.url),
      {
        headers: requestHeaders,
      },
    );
  }

  // Redirect to /dashboard if the user is authenticated
  if (isRedirectToDashboard) {
    return NextResponse.redirect(
      new URL(`/${PAGE_LINKS[PAGE_NAME.DASHBOARD]}`, req.url),
      {
        headers: requestHeaders,
      },
    );
  }

  // Removed multi-language logic for redirections

  // Create a new request with modified headers
  const modifiedRequest = new NextRequest(req.url, {
    headers: requestHeaders,
  });

  return modifiedRequest;
}

export const config = {
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"], // Apply to all pages except API & static files
};
