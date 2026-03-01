import type { ContactSubmission } from '@/types';

/**
 * In-memory store for contact submissions.
 * Will be replaced with a database later.
 */
const submissions: Map<string, ContactSubmission> = new Map();

let idCounter = 0;

export function generateSubmissionId(): string {
  idCounter++;
  return `sub-${Date.now()}-${idCounter}`;
}

export function saveSubmission(submission: ContactSubmission): void {
  submissions.set(submission.id, { ...submission });
}

export function getSubmission(id: string): ContactSubmission | undefined {
  const sub = submissions.get(id);
  return sub ? { ...sub } : undefined;
}

export function updateSubmissionStatus(
  id: string,
  status: ContactSubmission['status']
): void {
  const submission = submissions.get(id);
  if (submission) {
    submission.status = status;
    if (status === 'sent') {
      submission.emailSentAt = new Date();
    }
  }
}

export function getAllSubmissions(): ContactSubmission[] {
  return Array.from(submissions.values()).map((s) => ({ ...s }));
}

/** Clear all submissions (for testing) */
export function clearSubmissions(): void {
  submissions.clear();
  idCounter = 0;
}
