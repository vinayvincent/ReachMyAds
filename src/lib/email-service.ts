/**
 * Email service with message queue and retry logic using Resend.
 *
 * - Queues emails to info@reachmyads.com asynchronously
 * - Includes submitted data in email body with reply-to set to submitter's email
 * - Retries every 5 minutes for up to 1 hour on failure (max 12 attempts)
 * - Marks submission as 'failed' when all retries exhausted
 *
 * Configuration (via environment variables):
 *   RESEND_API_KEY - Resend API key (required for real email delivery)
 *
 * When RESEND_API_KEY is not set, emails are logged to console (dev mode).
 */

import { Resend } from 'resend';
import { enqueueEmail } from '@/lib/email-queue';
import { updateSubmissionStatus } from '@/lib/submissions';

// Retry config: every 5 minutes for up to 1 hour = 12 attempts
const RETRY_INTERVAL_MS = 5 * 60 * 1000;
const MAX_RETRY_DURATION_MS = 60 * 60 * 1000;
const MAX_RETRIES = Math.floor(MAX_RETRY_DURATION_MS / RETRY_INTERVAL_MS);

export interface EmailSendRequest {
  submissionId: string;
  to: string;
  subject: string;
  body: string;
  replyTo: string;
}

export interface RetryEntry {
  emailId: string;
  submissionId: string;
  request: EmailSendRequest;
  attempts: number;
  maxRetries: number;
  firstAttemptAt: Date;
  lastAttemptAt: Date;
  nextRetryAt: Date | null;
  status: 'pending' | 'sent' | 'failed';
}

// In-memory retry tracking
const retryEntries: Map<string, RetryEntry> = new Map();
const retryTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();

// ---------------------------------------------------------------------------
// Resend client
// ---------------------------------------------------------------------------

let _resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (_resend) return _resend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  _resend = new Resend(apiKey);
  return _resend;
}

// ---------------------------------------------------------------------------
// Email sender (pluggable for testing)
// ---------------------------------------------------------------------------

async function defaultEmailSender(request: EmailSendRequest): Promise<boolean> {
  const resend = getResendClient();

  if (!resend) {
    console.log('[email-service] No RESEND_API_KEY configured. Email logged:');
    console.log(`  To: ${request.to}`);
    console.log(`  Subject: ${request.subject}`);
    console.log(`  Reply-To: ${request.replyTo}`);
    console.log(`  Body:\n${request.body}`);
    return true;
  }

  const { error } = await resend.emails.send({
    from: 'ReachMyAds <onboarding@resend.dev>',
    to: request.to,
    subject: request.subject,
    text: request.body,
    replyTo: request.replyTo,
  });

  if (error) {
    console.error('[email-service] Resend error:', error);
    return false;
  }

  return true;
}

let emailSender: (request: EmailSendRequest) => Promise<boolean> = defaultEmailSender;

/** Override the email sender (for testing) */
export function setEmailSender(sender: (request: EmailSendRequest) => Promise<boolean>): void {
  emailSender = sender;
}

/** Reset to default sender (for testing) */
export function resetEmailSender(): void {
  emailSender = defaultEmailSender;
}

// ---------------------------------------------------------------------------
// Queue + Send with retry
// ---------------------------------------------------------------------------

export async function queueAndSend(request: EmailSendRequest): Promise<RetryEntry> {
  const emailMessage = await enqueueEmail({
    submissionId: request.submissionId,
    to: request.to,
    subject: request.subject,
    body: request.body,
    replyTo: request.replyTo,
  });

  const now = new Date();
  const entry: RetryEntry = {
    emailId: emailMessage.id,
    submissionId: request.submissionId,
    request,
    attempts: 0,
    maxRetries: MAX_RETRIES,
    firstAttemptAt: now,
    lastAttemptAt: now,
    nextRetryAt: null,
    status: 'pending',
  };

  retryEntries.set(emailMessage.id, entry);
  await attemptSend(entry);
  return getRetryEntry(emailMessage.id)!;
}

async function attemptSend(entry: RetryEntry): Promise<void> {
  entry.attempts++;
  entry.lastAttemptAt = new Date();

  try {
    const success = await emailSender(entry.request);
    if (success) {
      entry.status = 'sent';
      entry.nextRetryAt = null;
      updateSubmissionStatus(entry.submissionId, 'sent');
    } else {
      handleFailure(entry);
    }
  } catch {
    handleFailure(entry);
  }
}

function handleFailure(entry: RetryEntry): void {
  const elapsed = Date.now() - entry.firstAttemptAt.getTime();
  if (entry.attempts >= MAX_RETRIES || elapsed >= MAX_RETRY_DURATION_MS) {
    entry.status = 'failed';
    entry.nextRetryAt = null;
    updateSubmissionStatus(entry.submissionId, 'failed');
  } else {
    entry.status = 'pending';
    entry.nextRetryAt = new Date(Date.now() + RETRY_INTERVAL_MS);
    scheduleRetry(entry);
  }
}

function scheduleRetry(entry: RetryEntry): void {
  const existingTimer = retryTimers.get(entry.emailId);
  if (existingTimer) clearTimeout(existingTimer);

  const timer = setTimeout(() => {
    retryTimers.delete(entry.emailId);
    attemptSend(entry);
  }, RETRY_INTERVAL_MS);

  retryTimers.set(entry.emailId, timer);
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getRetryEntry(emailId: string): RetryEntry | undefined {
  const entry = retryEntries.get(emailId);
  return entry ? { ...entry } : undefined;
}

export function getRetryEntryBySubmissionId(submissionId: string): RetryEntry | undefined {
  for (const entry of retryEntries.values()) {
    if (entry.submissionId === submissionId) return { ...entry };
  }
  return undefined;
}

export function getFailedEntries(): RetryEntry[] {
  return Array.from(retryEntries.values())
    .filter((e) => e.status === 'failed')
    .map((e) => ({ ...e }));
}

export function getAllRetryEntries(): RetryEntry[] {
  return Array.from(retryEntries.values()).map((e) => ({ ...e }));
}

export function clearEmailService(): void {
  for (const timer of retryTimers.values()) clearTimeout(timer);
  retryTimers.clear();
  retryEntries.clear();
  resetEmailSender();
}

/** Reset the Resend client (for testing) */
export function resetResendClient(): void {
  _resend = null;
}

export const EMAIL_SERVICE_CONFIG = {
  RETRY_INTERVAL_MS,
  MAX_RETRY_DURATION_MS,
  MAX_RETRIES,
} as const;
