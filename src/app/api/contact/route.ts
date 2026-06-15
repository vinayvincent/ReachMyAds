import { NextRequest, NextResponse } from 'next/server';
import { validateCsrfToken } from '@/lib/csrf';
import {
  sanitizeContactFormData,
  sanitizeQuickInquiryData,
  contactFormSchema,
  quickInquirySchema,
} from '@/lib/sanitize';
import {
  generateSubmissionId,
  saveSubmission,
  updateSubmissionStatus,
} from '@/lib/submissions';
import { checkRateLimit, recordSubmission } from '@/lib/rate-limiter';
import { queueAndSend } from '@/lib/email-service';
import type { ContactFormData, ContactSubmission, SubmissionResult } from '@/types';

const ADMIN_EMAIL = 'team@reachmyads.com';

/**
 * Implements the handleContactSubmission() algorithm from the design doc.
 *
 * Steps:
 * 1. CSRF token validation
 * 2. Honeypot bot detection (silent reject)
 * 3. Validate and sanitize inputs
 * 4. Persist submission with status 'pending'
 * 5. Queue email to admin
 * 6. On email failure, return success but mark as 'failed'
 */
export async function POST(request: NextRequest): Promise<NextResponse<SubmissionResult>> {
  try {
    const body = await request.json();

    // Step 1: CSRF token validation
    const csrfToken = body.csrfToken as string | undefined;
    if (!validateCsrfToken(csrfToken)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing CSRF token' },
        { status: 403 }
      );
    }

    // Determine submission source
    const source = body.source === 'quick_inquiry' ? 'quick_inquiry' : 'contact_form';

    // Step 2: Rate limiting (shared across both form types)
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '0.0.0.0';

    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.message },
        { status: 429 }
      );
    }

    // ---- Quick Inquiry path ----
    if (source === 'quick_inquiry') {
      const inquiryData = { email: body.email ?? '', inquiry: body.inquiry ?? '' };

      // Validate
      const validation = quickInquirySchema.safeParse(inquiryData);
      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of validation.error.issues) {
          const field = issue.path[0] as string;
          if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        }
        return NextResponse.json(
          { success: false, error: fieldErrors },
          { status: 400 },
        );
      }

      const sanitized = sanitizeQuickInquiryData(inquiryData);

      const submission: ContactSubmission = {
        id: generateSubmissionId(),
        name: 'Quick Inquiry',
        email: sanitized.email,
        message: sanitized.inquiry,
        source: 'quick_inquiry',
        ipAddress: clientIp,
        submittedAt: new Date(),
        status: 'pending',
      };

      saveSubmission(submission);
      recordSubmission(clientIp);

      try {
        await queueAndSend({
          submissionId: submission.id,
          to: ADMIN_EMAIL,
          subject: `Quick inquiry from ${sanitized.email}`,
          body: `Email: ${sanitized.email}\n\nInquiry:\n${sanitized.inquiry}`,
          replyTo: sanitized.email,
        });
      } catch {
        updateSubmissionStatus(submission.id, 'failed');
      }

      return NextResponse.json(
        { success: true, message: "Inquiry sent! We'll be in touch." },
        { status: 200 },
      );
    }

    // ---- Contact Form path ----
    const formData: ContactFormData = {
      name: body.name ?? '',
      email: body.email ?? '',
      company: body.company,
      phone: body.phone,
      message: body.message ?? '',
      honeypot: body.honeypot,
    };

    // Honeypot detection — silently reject bot submissions
    if (formData.honeypot && formData.honeypot.length > 0) {
      return NextResponse.json(
        { success: true, message: 'Message sent!' },
        { status: 200 }
      );
    }

    // Validate inputs
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      return NextResponse.json(
        { success: false, error: fieldErrors },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const sanitized = sanitizeContactFormData(formData);

    // Persist submission with status 'pending'
    const submission: ContactSubmission = {
      id: generateSubmissionId(),
      name: sanitized.name,
      email: sanitized.email,
      company: sanitized.company,
      phone: sanitized.phone,
      message: sanitized.message,
      source: 'contact_form',
      ipAddress: clientIp,
      submittedAt: new Date(),
      status: 'pending',
    };

    saveSubmission(submission);

    // Record for rate limiting
    recordSubmission(clientIp);

    // Queue email via email service (handles retry logic)
    try {
      await queueAndSend({
        submissionId: submission.id,
        to: ADMIN_EMAIL,
        subject: `New inquiry from ${sanitized.name}`,
        body: formatEmailBody(sanitized),
        replyTo: sanitized.email,
      });
    } catch {
      // On email queue failure, return success to user but mark as 'failed'
      updateSubmissionStatus(submission.id, 'failed');
    }

    return NextResponse.json(
      { success: true, message: "Message sent! We'll get back to you soon." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

function formatEmailBody(data: ContactFormData): string {
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
  ];
  if (data.company) lines.push(`Company: ${data.company}`);
  if (data.phone) lines.push(`Phone: ${data.phone}`);
  lines.push('', `Message:`, data.message);
  return lines.join('\n');
}
