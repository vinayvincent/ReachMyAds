import { describe, expect, it, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

import { proxy } from '../proxy';

/**
 * `next start` stamps `x-forwarded-proto: http` on every plain-HTTP request, so
 * the HTTPS redirect fires on a local production build too. The redirect is a
 * 301, which browsers cache permanently against the origin — so a single visit
 * to a local production build used to leave `http://localhost:3000` redirecting
 * to a port with no TLS listener, breaking `next dev` in that browser
 * afterwards. These tests pin the loopback exemption that prevents it.
 */
function request(host: string, proto = 'http', path = '/') {
  return new NextRequest(`http://${host}${path}`, {
    headers: { host, 'x-forwarded-proto': proto },
  });
}

/** The redirect only applies outside development. */
function inProduction<T>(fn: () => T): T {
  const previous = process.env.NODE_ENV;
  vi.stubEnv('NODE_ENV', 'production');
  try {
    return fn();
  } finally {
    vi.stubEnv('NODE_ENV', previous ?? 'test');
  }
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('proxy — HTTPS enforcement', () => {
  it('redirects a plain-HTTP request on a real host to HTTPS', () => {
    const response = inProduction(() => proxy(request('reachmyads.com')));

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toMatch(/^https:/);
  });

  it.each(['localhost', '127.0.0.1', 'app.localhost'])(
    'does not redirect over loopback host %s',
    (host) => {
      const response = inProduction(() => proxy(request(host)));

      expect(response.status).not.toBe(301);
      expect(response.headers.get('location')).toBeNull();
    },
  );

  it('does not redirect in development', () => {
    // Only the literal 'development' counts as dev; the test runner sets
    // NODE_ENV to 'test', which the proxy treats as production.
    vi.stubEnv('NODE_ENV', 'development');
    const response = proxy(request('reachmyads.com'));

    expect(response.status).not.toBe(301);
  });
});

describe('proxy — security headers', () => {
  it('sends HSTS on a real host over HTTPS', () => {
    const response = inProduction(() => proxy(request('reachmyads.com', 'https')));

    expect(response.headers.get('strict-transport-security')).toBe(
      'max-age=31536000; includeSubDomains',
    );
  });

  it('never sends HSTS over loopback, so a browser cannot pin HTTPS to localhost', () => {
    const response = inProduction(() => proxy(request('localhost', 'https')));

    expect(response.headers.get('strict-transport-security')).toBeNull();
  });

  it('still applies the other security headers over loopback', () => {
    const response = inProduction(() => proxy(request('localhost')));

    expect(response.headers.get('content-security-policy')).toContain("default-src 'self'");
    expect(response.headers.get('x-frame-options')).toBe('DENY');
    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
  });
});
