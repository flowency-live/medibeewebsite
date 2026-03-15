import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for route protection
 *
 * Handles authentication checks and redirects for protected routes.
 * Note: Full auth validation happens on the client/server; this is a first-pass check.
 */

// Routes that require authentication
const protectedRoutes = {
  candidate: [
    '/candidate/dashboard',
    '/candidate/profile',
    '/candidate/cv',
    '/candidate/settings',
    '/candidate/onboarding',
  ],
  client: [
    '/client/dashboard',
    '/client/organisation',
    '/client/candidates',
    '/client/shortlists',
    '/client/contacts',
    '/client/subscription',
    '/client/settings',
  ],
  admin: [
    '/admin/dashboard',
    '/admin/candidates',
    '/admin/clients',
    '/admin/contacts',
    '/admin/analytics',
  ],
};

// Auth pages (redirect away if already logged in)
const authPages = {
  candidate: ['/candidate/login', '/candidate/register'],
  client: ['/client/login', '/client/register'],
  admin: ['/admin/login'],
};

// Token cookie names
const TOKEN_COOKIE = 'medibee_token';
const SESSION_COOKIE = 'medibee_session'; // For Cognito-based auth

/**
 * Decode JWT payload (without verification - verification happens server-side)
 */
function decodeJWTPayload(token: string): { type?: string; exp?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
function isTokenExpired(token: string): boolean {
  const payload = decodeJWTPayload(token);
  if (!payload?.exp) return true;
  return payload.exp < Math.floor(Date.now() / 1000);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookie (check both legacy token and new session cookie)
  // Note: localStorage isn't accessible in middleware, so we use cookies
  const legacyToken = request.cookies.get(TOKEN_COOKIE)?.value;
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  const token = sessionToken || legacyToken;

  // Determine user type from token
  let userType: 'candidate' | 'client' | 'admin' | null = null;
  let isValidToken = false;

  if (token && !isTokenExpired(token)) {
    const payload = decodeJWTPayload(token);
    if (payload?.type === 'candidate' || payload?.type === 'client' || payload?.type === 'admin') {
      userType = payload.type;
      isValidToken = true;
    }
  }

  // Check if current route requires authentication
  const isProtectedCandidateRoute = protectedRoutes.candidate.some((route) =>
    pathname.startsWith(route)
  );
  const isProtectedClientRoute = protectedRoutes.client.some((route) =>
    pathname.startsWith(route)
  );
  const isProtectedAdminRoute = protectedRoutes.admin.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without valid token
  if (isProtectedCandidateRoute && (!isValidToken || userType !== 'candidate')) {
    const loginUrl = new URL('/candidate/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedClientRoute && (!isValidToken || userType !== 'client')) {
    const loginUrl = new URL('/client/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedAdminRoute && (!isValidToken || userType !== 'admin')) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect away from auth pages if already logged in
  const isCandidateAuthPage = authPages.candidate.some((route) =>
    pathname.startsWith(route)
  );
  const isClientAuthPage = authPages.client.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminAuthPage = authPages.admin.some((route) =>
    pathname.startsWith(route)
  );

  if (isCandidateAuthPage && isValidToken && userType === 'candidate') {
    return NextResponse.redirect(new URL('/candidate/dashboard', request.url));
  }

  if (isClientAuthPage && isValidToken && userType === 'client') {
    return NextResponse.redirect(new URL('/client/dashboard', request.url));
  }

  if (isAdminAuthPage && isValidToken && userType === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all candidate routes
    '/candidate/:path*',
    // Match all client routes
    '/client/:path*',
    // Match all admin routes
    '/admin/:path*',
  ],
};
