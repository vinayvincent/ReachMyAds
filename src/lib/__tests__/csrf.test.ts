import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateCsrfToken, validateCsrfToken } from '../csrf';

describe('CSRF Token Utilities', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateCsrfToken', () => {
    it('generates a token with 3 dot-separated parts', () => {
      const token = generateCsrfToken();
      const parts = token.split('.');
      expect(parts).toHaveLength(3);
    });

    it('generates unique tokens on each call', () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('validateCsrfToken', () => {
    it('validates a freshly generated token', () => {
      const token = generateCsrfToken();
      expect(validateCsrfToken(token)).toBe(true);
    });

    it('rejects undefined', () => {
      expect(validateCsrfToken(undefined)).toBe(false);
    });

    it('rejects null', () => {
      expect(validateCsrfToken(null)).toBe(false);
    });

    it('rejects empty string', () => {
      expect(validateCsrfToken('')).toBe(false);
    });

    it('rejects malformed token (wrong number of parts)', () => {
      expect(validateCsrfToken('only-one-part')).toBe(false);
      expect(validateCsrfToken('two.parts')).toBe(false);
      expect(validateCsrfToken('a.b.c.d')).toBe(false);
    });

    it('rejects token with tampered signature', () => {
      const token = generateCsrfToken();
      const tampered = token.slice(0, -4) + 'xxxx';
      expect(validateCsrfToken(tampered)).toBe(false);
    });

    it('rejects token with tampered timestamp', () => {
      const token = generateCsrfToken();
      const parts = token.split('.');
      const tampered = `9999999999999.${parts[1]}.${parts[2]}`;
      expect(validateCsrfToken(tampered)).toBe(false);
    });

    it('rejects expired token (older than 1 hour)', () => {
      // Generate a token, then advance time past expiry
      const token = generateCsrfToken();
      const oneHourAndOneMs = 60 * 60 * 1000 + 1;
      vi.spyOn(Date, 'now').mockReturnValue(Date.now() + oneHourAndOneMs);
      expect(validateCsrfToken(token)).toBe(false);
    });
  });
});
