import { randomBytes, createHmac } from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'reachmyads-csrf-secret-key';
const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

/**
 * Generates a CSRF token with an embedded timestamp for expiry validation.
 * Format: `<timestamp>.<signature>`
 */
export function generateCsrfToken(): string {
  const timestamp = Date.now().toString();
  const nonce = randomBytes(16).toString('hex');
  const payload = `${timestamp}.${nonce}`;
  const signature = createHmac('sha256', CSRF_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Validates a CSRF token: checks format, signature integrity, and expiry.
 * Returns true if the token is valid and not expired.
 */
export function validateCsrfToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  const timestamp = parts[0]!;
  const nonce = parts[1]!;
  const signature = parts[2]!;

  // Verify signature
  const payload = `${timestamp}.${nonce}`;
  const expectedSignature = createHmac('sha256', CSRF_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return false;
  }

  // Check expiry
  const tokenTime = parseInt(timestamp, 10);
  if (isNaN(tokenTime)) {
    return false;
  }

  if (Date.now() - tokenTime > TOKEN_EXPIRY_MS) {
    return false;
  }

  return true;
}
