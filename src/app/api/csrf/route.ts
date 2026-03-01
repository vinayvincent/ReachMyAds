import { NextResponse } from 'next/server';
import { generateCsrfToken } from '@/lib/csrf';

/**
 * GET /api/csrf — returns a fresh CSRF token for client-side forms.
 */
export async function GET() {
  const token = generateCsrfToken();
  return NextResponse.json({ csrfToken: token });
}
