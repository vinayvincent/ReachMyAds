/**
 * In-memory email queue for contact form submissions.
 * Will be replaced with a real message queue (e.g., SQS, Redis) later.
 */

export interface EmailMessage {
  id: string;
  submissionId: string;
  to: string;
  subject: string;
  body: string;
  replyTo: string;
  queuedAt: Date;
}

const queue: Map<string, EmailMessage> = new Map();

let idCounter = 0;

export function generateEmailId(): string {
  idCounter++;
  return `email-${Date.now()}-${idCounter}`;
}

/**
 * Enqueues an email for delivery.
 */
export async function enqueueEmail(message: Omit<EmailMessage, 'id' | 'queuedAt'>): Promise<EmailMessage> {
  const entry: EmailMessage = {
    ...message,
    id: generateEmailId(),
    queuedAt: new Date(),
  };
  queue.set(entry.id, entry);
  return entry;
}

/** Get a queued email by ID */
export function getQueuedEmail(id: string): EmailMessage | undefined {
  const msg = queue.get(id);
  return msg ? { ...msg } : undefined;
}

/** Find queued email by submission ID */
export function findEmailBySubmissionId(submissionId: string): EmailMessage | undefined {
  for (const msg of queue.values()) {
    if (msg.submissionId === submissionId) {
      return { ...msg };
    }
  }
  return undefined;
}

/** Get all queued emails (for testing) */
export function getQueuedEmails(): EmailMessage[] {
  return Array.from(queue.values()).map((m) => ({ ...m }));
}

/** Clear the queue (for testing) */
export function clearEmailQueue(): void {
  queue.clear();
  idCounter = 0;
}
