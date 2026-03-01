/**
 * In-memory rate limiter for contact form submissions.
 * Uses a sliding window approach with per-IP and global limits.
 *
 * - Per-IP: max 3 submissions per hour
 * - Global: max 100 submissions per hour across all IPs
 *
 * Expired entries are cleaned up automatically to prevent memory leaks.
 */

const PER_IP_LIMIT = 3;
const GLOBAL_LIMIT = 100;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

const RATE_LIMIT_MESSAGE = 'Too many requests. Please try again later.';

/** Stores timestamps of submissions per IP */
const ipTimestamps: Map<string, number[]> = new Map();

/** Stores timestamps of all submissions globally */
let globalTimestamps: number[] = [];

/** Last cleanup time to avoid cleaning up too frequently */
let lastCleanup = Date.now();
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export interface RateLimitResult {
  allowed: boolean;
  message?: string;
}

/**
 * Removes expired timestamps from the given array.
 * Returns a new array with only timestamps within the sliding window.
 */
function pruneTimestamps(timestamps: number[], now: number): number[] {
  const cutoff = now - WINDOW_MS;
  return timestamps.filter((t) => t > cutoff);
}

/**
 * Periodically cleans up expired entries from the IP map
 * to prevent memory leaks from IPs that no longer submit.
 */
function cleanupExpiredEntries(now: number): void {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) {
    return;
  }
  lastCleanup = now;

  const cutoff = now - WINDOW_MS;
  for (const [ip, timestamps] of ipTimestamps.entries()) {
    const valid = timestamps.filter((t) => t > cutoff);
    if (valid.length === 0) {
      ipTimestamps.delete(ip);
    } else {
      ipTimestamps.set(ip, valid);
    }
  }

  globalTimestamps = globalTimestamps.filter((t) => t > cutoff);
}

/**
 * Checks whether a submission from the given IP is allowed.
 * Enforces both per-IP and global rate limits using a sliding window.
 *
 * Does NOT record the submission — call `recordSubmission()` after
 * the submission is actually accepted and processed.
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  // Periodic cleanup of stale entries
  cleanupExpiredEntries(now);

  // Check global limit first
  const recentGlobal = pruneTimestamps(globalTimestamps, now);
  if (recentGlobal.length >= GLOBAL_LIMIT) {
    return { allowed: false, message: RATE_LIMIT_MESSAGE };
  }

  // Check per-IP limit
  const ipEntries = ipTimestamps.get(ip) ?? [];
  const recentIp = pruneTimestamps(ipEntries, now);
  if (recentIp.length >= PER_IP_LIMIT) {
    return { allowed: false, message: RATE_LIMIT_MESSAGE };
  }

  return { allowed: true };
}

/**
 * Records a submission for rate limiting purposes.
 * Call this after the submission has been accepted.
 */
export function recordSubmission(ip: string): void {
  const now = Date.now();

  // Record per-IP
  const ipEntries = ipTimestamps.get(ip) ?? [];
  ipEntries.push(now);
  ipTimestamps.set(ip, ipEntries);

  // Record global
  globalTimestamps.push(now);
}

/** Reset all rate limit state (for testing) */
export function resetRateLimiter(): void {
  ipTimestamps.clear();
  globalTimestamps = [];
  lastCleanup = Date.now();
}

/** Expose constants for testing */
export const LIMITS = {
  PER_IP: PER_IP_LIMIT,
  GLOBAL: GLOBAL_LIMIT,
  WINDOW_MS,
} as const;
