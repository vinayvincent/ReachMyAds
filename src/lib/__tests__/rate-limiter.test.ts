import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  checkRateLimit,
  recordSubmission,
  resetRateLimiter,
  LIMITS,
} from '../rate-limiter';

describe('rate-limiter', () => {
  beforeEach(() => {
    resetRateLimiter();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // =========================================================================
  // Per-IP Rate Limiting (Requirement 4.1)
  // =========================================================================

  describe('per-IP rate limiting', () => {
    it('allows submissions under the per-IP limit', () => {
      const ip = '192.168.1.1';

      for (let i = 0; i < LIMITS.PER_IP; i++) {
        const result = checkRateLimit(ip);
        expect(result.allowed).toBe(true);
        recordSubmission(ip);
      }
    });

    it('rejects submissions at the per-IP limit', () => {
      const ip = '192.168.1.1';

      // Fill up the limit
      for (let i = 0; i < LIMITS.PER_IP; i++) {
        recordSubmission(ip);
      }

      const result = checkRateLimit(ip);
      expect(result.allowed).toBe(false);
      expect(result.message).toBe('Too many requests. Please try again later.');
    });

    it('does not affect other IPs', () => {
      const ip1 = '192.168.1.1';
      const ip2 = '192.168.1.2';

      // Fill up ip1
      for (let i = 0; i < LIMITS.PER_IP; i++) {
        recordSubmission(ip1);
      }

      // ip2 should still be allowed
      const result = checkRateLimit(ip2);
      expect(result.allowed).toBe(true);
    });

    it('allows submissions again after the window expires', () => {
      vi.useFakeTimers();
      const ip = '192.168.1.1';

      // Fill up the limit
      for (let i = 0; i < LIMITS.PER_IP; i++) {
        recordSubmission(ip);
      }

      expect(checkRateLimit(ip).allowed).toBe(false);

      // Advance past the window
      vi.advanceTimersByTime(LIMITS.WINDOW_MS + 1);

      expect(checkRateLimit(ip).allowed).toBe(true);
    });
  });

  // =========================================================================
  // Global Rate Limiting (Requirement 4.2)
  // =========================================================================

  describe('global rate limiting', () => {
    it('rejects submissions when global limit is reached', () => {
      // Fill up the global limit with different IPs
      for (let i = 0; i < LIMITS.GLOBAL; i++) {
        recordSubmission(`10.0.0.${i}`);
      }

      // A new IP should be rejected due to global limit
      const result = checkRateLimit('10.0.1.1');
      expect(result.allowed).toBe(false);
      expect(result.message).toBe('Too many requests. Please try again later.');
    });

    it('allows submissions again after global window expires', () => {
      vi.useFakeTimers();

      // Fill up the global limit
      for (let i = 0; i < LIMITS.GLOBAL; i++) {
        recordSubmission(`10.0.0.${i}`);
      }

      expect(checkRateLimit('10.0.1.1').allowed).toBe(false);

      // Advance past the window
      vi.advanceTimersByTime(LIMITS.WINDOW_MS + 1);

      expect(checkRateLimit('10.0.1.1').allowed).toBe(true);
    });
  });

  // =========================================================================
  // Rate Limit Message (Requirement 4.3)
  // =========================================================================

  describe('rate limit message', () => {
    it('returns the correct message when rate limited', () => {
      const ip = '192.168.1.1';

      for (let i = 0; i < LIMITS.PER_IP; i++) {
        recordSubmission(ip);
      }

      const result = checkRateLimit(ip);
      expect(result.message).toBe('Too many requests. Please try again later.');
    });

    it('returns no message when allowed', () => {
      const result = checkRateLimit('192.168.1.1');
      expect(result.allowed).toBe(true);
      expect(result.message).toBeUndefined();
    });
  });

  // =========================================================================
  // Cleanup of expired entries
  // =========================================================================

  describe('cleanup', () => {
    it('cleans up expired IP entries to prevent memory leaks', () => {
      vi.useFakeTimers();
      const ip = '192.168.1.1';

      recordSubmission(ip);

      // Advance past the window + cleanup interval
      vi.advanceTimersByTime(LIMITS.WINDOW_MS + 5 * 60 * 1000 + 1);

      // Trigger cleanup via checkRateLimit
      checkRateLimit(ip);

      // The IP should be allowed again (old entries cleaned up)
      expect(checkRateLimit(ip).allowed).toBe(true);
    });
  });

  // =========================================================================
  // checkRateLimit does not record submissions
  // =========================================================================

  describe('check vs record separation', () => {
    it('checkRateLimit does not consume a rate limit slot', () => {
      const ip = '192.168.1.1';

      // Check many times without recording
      for (let i = 0; i < 10; i++) {
        const result = checkRateLimit(ip);
        expect(result.allowed).toBe(true);
      }
    });
  });

  // =========================================================================
  // Reset
  // =========================================================================

  describe('resetRateLimiter', () => {
    it('clears all rate limit state', () => {
      const ip = '192.168.1.1';

      for (let i = 0; i < LIMITS.PER_IP; i++) {
        recordSubmission(ip);
      }

      expect(checkRateLimit(ip).allowed).toBe(false);

      resetRateLimiter();

      expect(checkRateLimit(ip).allowed).toBe(true);
    });
  });
});
