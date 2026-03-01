import { z } from 'zod';
import type { ContactFormData, QuickInquiryData } from '@/types';

// =============================================================================
// Sanitization Functions
// =============================================================================

/**
 * Strips all HTML tags from a string.
 */
export function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Removes <script> tags and their content from a string.
 * Handles variations like <SCRIPT>, <script type="...">, etc.
 */
export function removeScriptTags(input: string): string {
  return input.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

/**
 * Removes newline characters (\r, \n) from a string.
 * Used to prevent email header injection in fields like name and email.
 */
export function removeNewlines(input: string): string {
  return input.replace(/[\r\n]/g, '');
}

/**
 * Full sanitization pipeline: removes script tags, strips remaining HTML tags,
 * and trims whitespace.
 */
export function sanitize(input: string): string {
  let result = removeScriptTags(input);
  result = stripHtmlTags(result);
  result = result.trim();
  return result;
}

/**
 * Sanitizes a header field (name, email) by also removing newlines
 * to prevent email header injection.
 */
export function sanitizeHeaderField(input: string): string {
  let result = sanitize(input);
  result = removeNewlines(result);
  return result;
}

/**
 * Sanitizes all fields of a ContactFormData object.
 */
export function sanitizeContactFormData(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeHeaderField(data.name),
    email: sanitizeHeaderField(data.email),
    company: data.company ? sanitize(data.company) : undefined,
    phone: data.phone ? sanitizeHeaderField(data.phone) : undefined,
    message: sanitize(data.message),
    honeypot: data.honeypot,
  };
}

/**
 * Sanitizes all fields of a QuickInquiryData object.
 */
export function sanitizeQuickInquiryData(data: QuickInquiryData): QuickInquiryData {
  return {
    email: sanitizeHeaderField(data.email),
    inquiry: sanitize(data.inquiry),
  };
}

// =============================================================================
// Zod Validation Schemas
// =============================================================================

/** Phone number regex: optional, allows common formats */
const phoneRegex = /^\+?[\d\s\-().]{7,20}$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be 5000 characters or less'),
  honeypot: z.string().optional(),
});

export const quickInquirySchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  inquiry: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be 5000 characters or less'),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
export type QuickInquirySchemaType = z.infer<typeof quickInquirySchema>;
