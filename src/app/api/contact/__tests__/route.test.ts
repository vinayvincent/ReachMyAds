import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../route';
import { generateCsrfToken } from '@/lib/csrf';
import { clearSubmissions, getAllSubmissions } from '@/lib/submissions';
import { clearEmailQueue, getQueuedEmails } from '@/lib/email-queue';
import { resetRateLimiter } from '@/lib/rate-limiter';

function makeRequest(body: Record<string, unknown>, headers?: Record<string, string>): NextRequest {
  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: 'I am interested in your ad management platform.',
    csrfToken: generateCsrfToken(),
    ...overrides,
  };
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    clearSubmissions();
    clearEmailQueue();
    resetRateLimiter();
  });

  // =========================================================================
  // CSRF Token Validation (Requirement 12.3)
  // =========================================================================

  describe('CSRF token validation', () => {
    it('rejects requests with missing CSRF token', async () => {
      const req = makeRequest({
        name: 'Jane',
        email: 'jane@example.com',
        message: 'Hello, this is a test message.',
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(403);
      expect(data.success).toBe(false);
      expect(data.error).toContain('CSRF');
    });

    it('rejects requests with invalid CSRF token', async () => {
      const req = makeRequest({
        name: 'Jane',
        email: 'jane@example.com',
        message: 'Hello, this is a test message.',
        csrfToken: 'totally-invalid-token',
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(403);
      expect(data.success).toBe(false);
    });

    it('rejects requests with tampered CSRF token', async () => {
      const token = generateCsrfToken();
      const tampered = token.slice(0, -4) + 'xxxx';

      const req = makeRequest({
        name: 'Jane',
        email: 'jane@example.com',
        message: 'Hello, this is a test message.',
        csrfToken: tampered,
      });

      const res = await POST(req);
      expect(res.status).toBe(403);
    });
  });

  // =========================================================================
  // Honeypot Detection (Requirement 3.6)
  // =========================================================================

  describe('honeypot bot detection', () => {
    it('silently rejects submissions with non-empty honeypot field', async () => {
      const req = makeRequest(validBody({ honeypot: 'bot-filled-this' }));

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Message sent!');

      // Should NOT persist or queue email
      expect(getAllSubmissions()).toHaveLength(0);
      expect(getQueuedEmails()).toHaveLength(0);
    });

    it('processes submissions with empty honeypot field normally', async () => {
      const req = makeRequest(validBody({ honeypot: '' }));

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(getAllSubmissions()).toHaveLength(1);
    });

    it('processes submissions with undefined honeypot field normally', async () => {
      const req = makeRequest(validBody());

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(getAllSubmissions()).toHaveLength(1);
    });
  });

  // =========================================================================
  // Input Validation (Requirement 3.2)
  // =========================================================================

  describe('input validation', () => {
    it('rejects empty name', async () => {
      const req = makeRequest(validBody({ name: '' }));

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toHaveProperty('name');
    });

    it('rejects invalid email', async () => {
      const req = makeRequest(validBody({ email: 'not-an-email' }));

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toHaveProperty('email');
    });

    it('rejects message shorter than 10 characters', async () => {
      const req = makeRequest(validBody({ message: 'Short' }));

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toHaveProperty('message');
    });
  });

  // =========================================================================
  // Sanitization (Requirement 3.3)
  // =========================================================================

  describe('input sanitization', () => {
    it('strips HTML tags from inputs before storing', async () => {
      const req = makeRequest(validBody({
        name: '<b>Jane</b>',
        message: 'Hello <script>alert("xss")</script> this is a test message.',
      }));

      const res = await POST(req);
      expect(res.status).toBe(200);

      const submissions = getAllSubmissions();
      expect(submissions).toHaveLength(1);
      expect(submissions[0]!.name).toBe('Jane');
      expect(submissions[0]!.message).not.toContain('<script>');
      expect(submissions[0]!.message).not.toContain('<b>');
    });
  });

  // =========================================================================
  // Successful Submission (Requirements 3.1, 3.4)
  // =========================================================================

  describe('successful submission', () => {
    it('persists submission with status pending then updates to sent', async () => {
      const req = makeRequest(validBody());

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Message sent');

      const submissions = getAllSubmissions();
      expect(submissions).toHaveLength(1);
      expect(submissions[0]!.status).toBe('sent');
      expect(submissions[0]!.source).toBe('contact_form');
    });

    it('queues email to team@reachmyads.com', async () => {
      const req = makeRequest(validBody());

      await POST(req);

      const emails = getQueuedEmails();
      expect(emails).toHaveLength(1);
      expect(emails[0]!.to).toBe('team@reachmyads.com');
      expect(emails[0]!.replyTo).toBe('jane@example.com');
      expect(emails[0]!.subject).toContain('Jane Smith');
    });

    it('includes submitted data in email body', async () => {
      const req = makeRequest(validBody({
        company: 'Acme Corp',
        phone: '+1234567890',
      }));

      await POST(req);

      const emails = getQueuedEmails();
      expect(emails[0]!.body).toContain('Jane Smith');
      expect(emails[0]!.body).toContain('jane@example.com');
      expect(emails[0]!.body).toContain('Acme Corp');
      expect(emails[0]!.body).toContain('+1234567890');
    });
  });

  // =========================================================================
  // Email Queue Failure (Requirement 3.5)
  // =========================================================================

  describe('email queue failure handling', () => {
    it('returns success to user but marks submission as failed on email queue error', async () => {
      // Mock enqueueEmail to throw
      const emailQueue = await import('@/lib/email-queue');
      const originalEnqueue = emailQueue.enqueueEmail;
      vi.spyOn(emailQueue, 'enqueueEmail').mockRejectedValueOnce(new Error('Queue unavailable'));

      const req = makeRequest(validBody());

      const res = await POST(req);
      const data = await res.json();

      // User sees success
      expect(res.status).toBe(200);
      expect(data.success).toBe(true);

      // But submission is marked as failed internally
      const submissions = getAllSubmissions();
      expect(submissions).toHaveLength(1);
      expect(submissions[0]!.status).toBe('failed');

      // Restore
      vi.mocked(emailQueue.enqueueEmail).mockImplementation(originalEnqueue);
    });
  });
});
