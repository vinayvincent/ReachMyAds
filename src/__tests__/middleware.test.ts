import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// We test the middleware by importing and calling it directly
import { middleware } from '../middleware';

function createRequest(
  url: string,
  headers: Record<string, string> = {}
): NextRequest {
  const req = new NextRequest(new URL(url, 'https://reachmyads.com'), {
    headers,
  });
  return req;
}

describe('Security Headers Middleware', () => {
  it('adds Content-Security-Policy header to responses', () => {
    const req = createRequest('/');
    const res = middleware(req);

    const csp = res.headers.get('Content-Security-Policy');
    expect(csp).toBeTruthy();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain("style-src 'self' 'unsafe-inline'");
    expect(csp).toContain("frame-ancestors 'none'");
  });

  it('adds HSTS header with 1 year max-age and includeSubDomains', () => {
    const req = createRequest('/');
    const res = middleware(req);

    expect(res.headers.get('Strict-Transport-Security')).toBe(
      'max-age=31536000; includeSubDomains'
    );
  });

  it('adds X-Content-Type-Options: nosniff', () => {
    const req = createRequest('/');
    const res = middleware(req);

    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
  });

  it('adds X-Frame-Options: DENY', () => {
    const req = createRequest('/');
    const res = middleware(req);

    expect(res.headers.get('X-Frame-Options')).toBe('DENY');
  });

  it('adds Referrer-Policy: strict-origin-when-cross-origin', () => {
    const req = createRequest('/');
    const res = middleware(req);

    expect(res.headers.get('Referrer-Policy')).toBe(
      'strict-origin-when-cross-origin'
    );
  });

  it('applies security headers to all page routes', () => {
    const routes = ['/', '/about', '/contact', '/dashboard', '/api/contact'];

    for (const route of routes) {
      const req = createRequest(route);
      const res = middleware(req);

      expect(res.headers.get('Content-Security-Policy')).toBeTruthy();
      expect(res.headers.get('Strict-Transport-Security')).toBeTruthy();
      expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
      expect(res.headers.get('X-Frame-Options')).toBe('DENY');
    }
  });
});

describe('HTTPS Enforcement', () => {
  it('redirects HTTP requests to HTTPS', () => {
    const req = createRequest('https://reachmyads.com/page', {
      'x-forwarded-proto': 'http',
    });
    const res = middleware(req);

    expect(res.status).toBe(301);
    const location = res.headers.get('location');
    expect(location).toContain('https://');
  });

  it('does not redirect HTTPS requests', () => {
    const req = createRequest('https://reachmyads.com/page', {
      'x-forwarded-proto': 'https',
    });
    const res = middleware(req);

    expect(res.status).not.toBe(301);
  });

  it('does not redirect when x-forwarded-proto is absent', () => {
    const req = createRequest('https://reachmyads.com/page');
    const res = middleware(req);

    expect(res.status).not.toBe(301);
  });
});

describe('CDN Cache Headers', () => {
  it('sets 1-year cache for hashed static assets under /_next/static/', () => {
    const req = createRequest('/_next/static/chunks/main-abc123.js');
    const res = middleware(req);

    expect(res.headers.get('Cache-Control')).toBe(
      'public, max-age=31536000, immutable'
    );
  });

  it('sets cache for nested static asset paths', () => {
    const req = createRequest('/_next/static/css/styles-def456.css');
    const res = middleware(req);

    expect(res.headers.get('Cache-Control')).toBe(
      'public, max-age=31536000, immutable'
    );
  });

  it('does not set long cache for non-static routes', () => {
    const req = createRequest('/');
    const res = middleware(req);

    expect(res.headers.get('Cache-Control')).not.toBe(
      'public, max-age=31536000, immutable'
    );
  });

  it('does not set long cache for API routes', () => {
    const req = createRequest('/api/contact');
    const res = middleware(req);

    expect(res.headers.get('Cache-Control')).not.toBe(
      'public, max-age=31536000, immutable'
    );
  });

  it('still applies security headers to static assets', () => {
    const req = createRequest('/_next/static/chunks/main-abc123.js');
    const res = middleware(req);

    expect(res.headers.get('Content-Security-Policy')).toBeTruthy();
    expect(res.headers.get('Strict-Transport-Security')).toBeTruthy();
  });
});
