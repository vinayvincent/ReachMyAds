import { describe, it, expect } from 'vitest';
import {
  stripHtmlTags,
  removeScriptTags,
  removeNewlines,
  sanitize,
  sanitizeHeaderField,
  sanitizeContactFormData,
  sanitizeQuickInquiryData,
  contactFormSchema,
  quickInquirySchema,
} from '@/lib/sanitize';

// =============================================================================
// Sanitization Function Tests
// =============================================================================

describe('stripHtmlTags', () => {
  it('removes simple HTML tags', () => {
    expect(stripHtmlTags('<b>bold</b>')).toBe('bold');
  });

  it('removes nested HTML tags', () => {
    expect(stripHtmlTags('<div><p>text</p></div>')).toBe('text');
  });

  it('removes self-closing tags', () => {
    expect(stripHtmlTags('hello<br/>world')).toBe('helloworld');
  });

  it('returns plain text unchanged', () => {
    expect(stripHtmlTags('no tags here')).toBe('no tags here');
  });

  it('handles empty string', () => {
    expect(stripHtmlTags('')).toBe('');
  });
});

describe('removeScriptTags', () => {
  it('removes script tags with content', () => {
    expect(removeScriptTags('<script>alert("xss")</script>')).toBe('');
  });

  it('removes script tags case-insensitively', () => {
    expect(removeScriptTags('<SCRIPT>alert("xss")</SCRIPT>')).toBe('');
  });

  it('removes script tags with attributes', () => {
    expect(removeScriptTags('<script type="text/javascript">code</script>')).toBe('');
  });

  it('preserves non-script content', () => {
    expect(removeScriptTags('hello<script>bad</script>world')).toBe('helloworld');
  });
});

describe('removeNewlines', () => {
  it('removes \\n characters', () => {
    expect(removeNewlines('line1\nline2')).toBe('line1line2');
  });

  it('removes \\r characters', () => {
    expect(removeNewlines('line1\rline2')).toBe('line1line2');
  });

  it('removes \\r\\n sequences', () => {
    expect(removeNewlines('line1\r\nline2')).toBe('line1line2');
  });

  it('returns string without newlines unchanged', () => {
    expect(removeNewlines('no newlines')).toBe('no newlines');
  });
});

describe('sanitize', () => {
  it('strips script tags and HTML', () => {
    expect(sanitize('<script>alert("xss")</script><b>text</b>')).toBe('text');
  });

  it('trims whitespace', () => {
    expect(sanitize('  hello  ')).toBe('hello');
  });

  it('handles complex XSS payloads', () => {
    const payload = '<img src=x onerror=alert(1)>safe text';
    const result = sanitize(payload);
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).toContain('safe text');
  });
});

describe('sanitizeHeaderField', () => {
  it('removes HTML and newlines', () => {
    expect(sanitizeHeaderField('<b>name</b>\ninjection')).toBe('nameinjection');
  });

  it('prevents email header injection via newlines', () => {
    const malicious = 'user@example.com\r\nBcc: attacker@evil.com';
    const result = sanitizeHeaderField(malicious);
    expect(result).not.toContain('\r');
    expect(result).not.toContain('\n');
  });
});

describe('sanitizeContactFormData', () => {
  it('sanitizes all fields', () => {
    const data = {
      name: '<b>John</b>\nDoe',
      email: 'john@example.com\r\nBcc: evil@hack.com',
      company: '<script>alert("xss")</script>Acme',
      phone: '+1-555-0100',
      message: '<p>Hello, I am interested.</p>',
    };
    const result = sanitizeContactFormData(data);
    expect(result.name).toBe('JohnDoe');
    expect(result.email).not.toContain('\r');
    expect(result.email).not.toContain('\n');
    expect(result.company).toBe('Acme');
    expect(result.phone).toBe('+1-555-0100');
    expect(result.message).toBe('Hello, I am interested.');
  });

  it('handles optional fields as undefined', () => {
    const data = {
      name: 'Jane',
      email: 'jane@example.com',
      message: 'This is a test message.',
    };
    const result = sanitizeContactFormData(data);
    expect(result.company).toBeUndefined();
    expect(result.phone).toBeUndefined();
  });
});

describe('sanitizeQuickInquiryData', () => {
  it('sanitizes email and inquiry', () => {
    const data = {
      email: 'user@test.com\nBcc: evil@hack.com',
      inquiry: '<script>alert("xss")</script>Tell me more',
    };
    const result = sanitizeQuickInquiryData(data);
    expect(result.email).not.toContain('\n');
    expect(result.inquiry).toBe('Tell me more');
  });
});

// =============================================================================
// Zod Schema Validation Tests
// =============================================================================

describe('contactFormSchema', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'This is a valid message that is long enough.',
  };

  it('accepts valid contact form data', () => {
    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('accepts data with optional fields', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      company: 'Acme Corp',
      phone: '+1-555-0100',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = contactFormSchema.safeParse({ ...validData, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects name over 100 characters', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      name: 'a'.repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty email', () => {
    const result = contactFormSchema.safeParse({ ...validData, email: '' });
    expect(result.success).toBe(false);
  });

  it('rejects message shorter than 10 characters', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      message: 'short',
    });
    expect(result.success).toBe(false);
  });

  it('rejects message over 5000 characters', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      message: 'a'.repeat(5001),
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid phone format', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      phone: 'abc',
    });
    expect(result.success).toBe(false);
  });

  it('accepts empty string phone (optional)', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      phone: '',
    });
    expect(result.success).toBe(true);
  });
});

describe('quickInquirySchema', () => {
  const validData = {
    email: 'user@example.com',
    inquiry: 'I would like to learn more about your services.',
  };

  it('accepts valid quick inquiry data', () => {
    const result = quickInquirySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = quickInquirySchema.safeParse({
      ...validData,
      email: 'bad-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty email', () => {
    const result = quickInquirySchema.safeParse({
      ...validData,
      email: '',
    });
    expect(result.success).toBe(false);
  });

  it('rejects inquiry shorter than 10 characters', () => {
    const result = quickInquirySchema.safeParse({
      ...validData,
      inquiry: 'short',
    });
    expect(result.success).toBe(false);
  });

  it('rejects inquiry over 5000 characters', () => {
    const result = quickInquirySchema.safeParse({
      ...validData,
      inquiry: 'a'.repeat(5001),
    });
    expect(result.success).toBe(false);
  });
});
