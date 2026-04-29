import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  queueAndSend,
  setEmailSender,
  clearEmailService,
  getRetryEntry,
  getRetryEntryBySubmissionId,
  getFailedEntries,
  getAllRetryEntries,
  EMAIL_SERVICE_CONFIG,
  type EmailSendRequest,
} from '@/lib/email-service';
import { clearEmailQueue, getQueuedEmails, findEmailBySubmissionId } from '@/lib/email-queue';
import { clearSubmissions, saveSubmission, getSubmission } from '@/lib/submissions';
import type { ContactSubmission } from '@/types';

function makeRequest(overrides: Partial<EmailSendRequest> = {}): EmailSendRequest {
  return {
    submissionId: 'sub-test-1',
    to: 'admin@reachmyads.com',
    subject: 'New inquiry from Test User',
    body: 'Name: Test User\nEmail: test@example.com\n\nMessage:\nHello world test message',
    replyTo: 'test@example.com',
    ...overrides,
  };
}

function createSubmission(id: string): void {
  const submission: ContactSubmission = {
    id,
    name: 'Test User',
    email: 'test@example.com',
    message: 'Hello world test message',
    source: 'contact_form',
    ipAddress: '127.0.0.1',
    submittedAt: new Date(),
    status: 'pending',
  };
  saveSubmission(submission);
}

describe('Email Service', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    clearEmailService();
    clearEmailQueue();
    clearSubmissions();
  });

  afterEach(() => {
    clearEmailService();
    vi.useRealTimers();
  });

  // ===========================================================================
  // Queuing and immediate send (Requirements 3.1, 13.4)
  // ===========================================================================

  describe('queueAndSend', () => {
    it('queues email and sends immediately on success', async () => {
      createSubmission('sub-test-1');
      setEmailSender(async () => true);

      const entry = await queueAndSend(makeRequest());

      expect(entry.status).toBe('sent');
      expect(entry.attempts).toBe(1);
      expect(entry.nextRetryAt).toBeNull();

      // Submission status updated to 'sent'
      const sub = getSubmission('sub-test-1');
      expect(sub?.status).toBe('sent');

      // Email is in the queue
      const emails = getQueuedEmails();
      expect(emails).toHaveLength(1);
      expect(emails[0]!.to).toBe('admin@reachmyads.com');
      expect(emails[0]!.replyTo).toBe('test@example.com');
    });

    it('includes submitted data in email body', async () => {
      createSubmission('sub-test-1');
      setEmailSender(async () => true);

      await queueAndSend(makeRequest());

      const emails = getQueuedEmails();
      expect(emails[0]!.body).toContain('Test User');
      expect(emails[0]!.body).toContain('test@example.com');
    });

    it('sets reply-to to submitter email', async () => {
      createSubmission('sub-reply');
      setEmailSender(async () => true);

      await queueAndSend(makeRequest({
        submissionId: 'sub-reply',
        replyTo: 'submitter@example.com',
      }));

      const emails = getQueuedEmails();
      expect(emails[0]!.replyTo).toBe('submitter@example.com');
    });

    it('always queues email to admin@reachmyads.com', async () => {
      createSubmission('sub-admin');
      setEmailSender(async () => true);

      await queueAndSend(makeRequest({ submissionId: 'sub-admin' }));

      const emails = getQueuedEmails();
      expect(emails[0]!.to).toBe('admin@reachmyads.com');
    });
  });

  // ===========================================================================
  // Retry logic (Requirements 14.1, 14.2)
  // ===========================================================================

  describe('retry logic', () => {
    it('schedules retry on first failure', async () => {
      createSubmission('sub-retry-1');
      setEmailSender(async () => false);

      const entry = await queueAndSend(makeRequest({ submissionId: 'sub-retry-1' }));

      expect(entry.status).toBe('pending');
      expect(entry.attempts).toBe(1);
      expect(entry.nextRetryAt).not.toBeNull();
    });

    it('retries every 5 minutes', async () => {
      createSubmission('sub-retry-interval');
      let callCount = 0;
      setEmailSender(async () => {
        callCount++;
        return callCount >= 3; // succeed on 3rd attempt
      });

      await queueAndSend(makeRequest({ submissionId: 'sub-retry-interval' }));
      expect(callCount).toBe(1);

      // Advance 5 minutes — triggers 2nd attempt
      await vi.advanceTimersByTimeAsync(EMAIL_SERVICE_CONFIG.RETRY_INTERVAL_MS);
      expect(callCount).toBe(2);

      // Advance another 5 minutes — triggers 3rd attempt (success)
      await vi.advanceTimersByTimeAsync(EMAIL_SERVICE_CONFIG.RETRY_INTERVAL_MS);
      expect(callCount).toBe(3);

      const entry = getRetryEntryBySubmissionId('sub-retry-interval');
      expect(entry?.status).toBe('sent');
    });

    it('marks as sent and updates submission on successful retry', async () => {
      createSubmission('sub-retry-success');
      let attempt = 0;
      setEmailSender(async () => {
        attempt++;
        return attempt >= 2;
      });

      await queueAndSend(makeRequest({ submissionId: 'sub-retry-success' }));

      // First attempt fails
      expect(getSubmission('sub-retry-success')?.status).toBe('pending');

      // Advance to trigger retry
      await vi.advanceTimersByTimeAsync(EMAIL_SERVICE_CONFIG.RETRY_INTERVAL_MS);

      const sub = getSubmission('sub-retry-success');
      expect(sub?.status).toBe('sent');

      const entry = getRetryEntryBySubmissionId('sub-retry-success');
      expect(entry?.status).toBe('sent');
      expect(entry?.attempts).toBe(2);
    });

    it('marks as failed after max retries exhausted', async () => {
      createSubmission('sub-max-retry');
      setEmailSender(async () => false);

      await queueAndSend(makeRequest({ submissionId: 'sub-max-retry' }));

      // Advance through all retry intervals
      for (let i = 0; i < EMAIL_SERVICE_CONFIG.MAX_RETRIES; i++) {
        await vi.advanceTimersByTimeAsync(EMAIL_SERVICE_CONFIG.RETRY_INTERVAL_MS);
      }

      const entry = getRetryEntryBySubmissionId('sub-max-retry');
      expect(entry?.status).toBe('failed');
      expect(entry?.attempts).toBe(EMAIL_SERVICE_CONFIG.MAX_RETRIES);

      const sub = getSubmission('sub-max-retry');
      expect(sub?.status).toBe('failed');
    });

    it('handles sender throwing errors as failures', async () => {
      createSubmission('sub-throw');
      setEmailSender(async () => { throw new Error('Network error'); });

      const entry = await queueAndSend(makeRequest({ submissionId: 'sub-throw' }));

      expect(entry.status).toBe('pending');
      expect(entry.attempts).toBe(1);
    });
  });

  // ===========================================================================
  // Queue entry guarantee (Requirement 14.3)
  // ===========================================================================

  describe('queue entry guarantee', () => {
    it('every sent submission has a corresponding queue entry', async () => {
      createSubmission('sub-guarantee');
      setEmailSender(async () => true);

      await queueAndSend(makeRequest({ submissionId: 'sub-guarantee' }));

      const sub = getSubmission('sub-guarantee');
      expect(sub?.status).toBe('sent');

      const emailEntry = findEmailBySubmissionId('sub-guarantee');
      expect(emailEntry).toBeDefined();
      expect(emailEntry!.replyTo).toBe('test@example.com');
    });

    it('queue entry exists even when send fails', async () => {
      createSubmission('sub-fail-queue');
      setEmailSender(async () => false);

      await queueAndSend(makeRequest({ submissionId: 'sub-fail-queue' }));

      const emailEntry = findEmailBySubmissionId('sub-fail-queue');
      expect(emailEntry).toBeDefined();
      expect(emailEntry!.to).toBe('admin@reachmyads.com');
    });
  });

  // ===========================================================================
  // Admin dashboard surfacing (Requirement 14.2)
  // ===========================================================================

  describe('admin dashboard surfacing', () => {
    it('getFailedEntries returns entries that exhausted retries', async () => {
      createSubmission('sub-admin-fail');
      setEmailSender(async () => false);

      await queueAndSend(makeRequest({ submissionId: 'sub-admin-fail' }));

      // Exhaust all retries
      for (let i = 0; i < EMAIL_SERVICE_CONFIG.MAX_RETRIES; i++) {
        await vi.advanceTimersByTimeAsync(EMAIL_SERVICE_CONFIG.RETRY_INTERVAL_MS);
      }

      const failed = getFailedEntries();
      expect(failed).toHaveLength(1);
      expect(failed[0]!.submissionId).toBe('sub-admin-fail');
    });

    it('getFailedEntries does not include sent entries', async () => {
      createSubmission('sub-sent');
      setEmailSender(async () => true);

      await queueAndSend(makeRequest({ submissionId: 'sub-sent' }));

      const failed = getFailedEntries();
      expect(failed).toHaveLength(0);
    });
  });

  // ===========================================================================
  // Config validation
  // ===========================================================================

  describe('configuration', () => {
    it('retry interval is 5 minutes', () => {
      expect(EMAIL_SERVICE_CONFIG.RETRY_INTERVAL_MS).toBe(5 * 60 * 1000);
    });

    it('max retry duration is 1 hour', () => {
      expect(EMAIL_SERVICE_CONFIG.MAX_RETRY_DURATION_MS).toBe(60 * 60 * 1000);
    });

    it('max retries is 12 (1 hour / 5 minutes)', () => {
      expect(EMAIL_SERVICE_CONFIG.MAX_RETRIES).toBe(12);
    });
  });
});
