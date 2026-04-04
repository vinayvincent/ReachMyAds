import { NextResponse, type NextRequest } from 'next/server';

/**
 * Security headers applied to all responses.
 * - CSP: Strict policy allowing inline styles for Tailwind/framer-motion
 * - HSTS: 1 year max-age with includeSubDomains
 * - X-Content-Type-Options: Prevent MIME sniffing
 * - X-Frame-Options: Prevent clickjacking
 * - Referrer-Policy: Limit referrer info to origin on cross-origin
 */
const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

/** Cache duration for hashed static assets (1 year in seconds). */
const STATIC_CACHE_MAX_AGE = 31536000;

/**
 * Checks if a request path points to a hashed static asset.
 * Next.js hashed assets live under /_next/static/ and contain content hashes.
 */
function isHashedStaticAsset(pathname: string): boolean {
  return pathname.startsWith('/_next/static/');
}

/**
 * Checks if the request is using a non-TLS connection.
 * In production, the x-forwarded-proto header indicates the original protocol
 * when behind a load balancer or CDN.
 */
function isNonTlsConnection(request: NextRequest): boolean {
  const proto = request.headers.get('x-forwarded-proto');
  return proto === 'http';
}

/**
 * Builds the HTTPS redirect URL for a given request.
 */
function buildHttpsRedirectUrl(request: NextRequest): string {
  const url = request.nextUrl.clone();
  url.protocol = 'https';
  return url.toString();
}

export function proxy(request: NextRequest) {
  // Enforce HTTPS in production only (skip on localhost dev server)
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev && isNonTlsConnection(request)) {
    return NextResponse.redirect(buildHttpsRedirectUrl(request), 301);
  }

  const response = NextResponse.next();

  // Apply security headers to all responses
  for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
    // Skip HSTS in development to avoid browser caching HTTPS for localhost
    if (isDev && header === 'Strict-Transport-Security') continue;
    response.headers.set(header, value);
  }

  // Apply CDN cache headers for hashed static assets (1 year)
  if (isHashedStaticAsset(request.nextUrl.pathname)) {
    response.headers.set(
      'Cache-Control',
      `public, max-age=${STATIC_CACHE_MAX_AGE}, immutable`
    );
  }

  return response;
}

/**
 * Match all routes except internal Next.js resources that don't need middleware.
 * We apply to all paths to ensure security headers are universal.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
