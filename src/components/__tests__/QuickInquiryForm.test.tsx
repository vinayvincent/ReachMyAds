import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QuickInquiryForm } from '@/components/QuickInquiryForm';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CSRF_TOKEN = 'fake-csrf-token';

function mockFetch(
  overrides?: Partial<{
    csrfOk: boolean;
    submitResponse: object;
    submitStatus: number;
  }>,
) {
  const opts = {
    csrfOk: true,
    submitResponse: { success: true, message: "Inquiry sent! We'll be in touch." },
    submitStatus: 200,
    ...overrides,
  };

  return vi.fn().mockImplementation((url: string, init?: RequestInit) => {
    if (typeof url === 'string' && url.includes('/api/csrf')) {
      return Promise.resolve({
        ok: opts.csrfOk,
        json: () => Promise.resolve({ csrfToken: CSRF_TOKEN }),
      });
    }
    if (init?.method === 'POST') {
      return Promise.resolve({
        ok: opts.submitStatus >= 200 && opts.submitStatus < 300,
        status: opts.submitStatus,
        json: () => Promise.resolve(opts.submitResponse),
      });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  });
}

async function fillValidInquiry(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^email/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/^message/i), 'I would like to learn more about your platform.');
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('QuickInquiryForm', () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchSpy = mockFetch();
    vi.stubGlobal('fetch', fetchSpy);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  it('renders email and message fields with submit button', () => {
    render(<QuickInquiryForm />);

    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send inquiry/i })).toBeInTheDocument();
  });

  it('has an accessible section landmark', () => {
    render(<QuickInquiryForm />);
    expect(screen.getByRole('region', { name: /quick inquiry form/i })).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Placement variants (Req 5.4)
  // -------------------------------------------------------------------------

  it('applies floating placement classes', () => {
    render(<QuickInquiryForm placement="floating" />);
    const section = screen.getByRole('region', { name: /quick inquiry form/i });
    expect(section.className).toContain('fixed');
    expect(section.className).toContain('z-50');
  });

  it('shows minimize button in floating variant', () => {
    render(<QuickInquiryForm placement="floating" />);
    expect(screen.getByRole('button', { name: /minimize inquiry form/i })).toBeInTheDocument();
  });

  it('minimizes to a chat bubble and expands back', async () => {
    const user = userEvent.setup();
    render(<QuickInquiryForm placement="floating" />);

    // Click minimize
    await user.click(screen.getByRole('button', { name: /minimize inquiry form/i }));

    // Form should be hidden, chat bubble should appear
    expect(screen.queryByRole('region', { name: /quick inquiry form/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open quick inquiry form/i })).toBeInTheDocument();

    // Click expand
    await user.click(screen.getByRole('button', { name: /open quick inquiry form/i }));

    // Form should be visible again
    expect(screen.getByRole('region', { name: /quick inquiry form/i })).toBeInTheDocument();
  });

  it('does not show minimize button in non-floating variants', () => {
    render(<QuickInquiryForm placement="header" />);
    expect(screen.queryByRole('button', { name: /minimize inquiry form/i })).not.toBeInTheDocument();
  });

  it('applies header placement classes', () => {
    render(<QuickInquiryForm placement="header" />);
    const section = screen.getByRole('region', { name: /quick inquiry form/i });
    expect(section.className).toContain('max-w-xl');
  });

  it('applies sidebar placement classes', () => {
    render(<QuickInquiryForm placement="sidebar" />);
    const section = screen.getByRole('region', { name: /quick inquiry form/i });
    expect(section.className).toContain('max-w-sm');
  });

  // -------------------------------------------------------------------------
  // Client-side validation (Req 5.3)
  // -------------------------------------------------------------------------

  it('shows validation error for empty email', async () => {
    const user = userEvent.setup();
    render(<QuickInquiryForm />);

    await user.type(screen.getByLabelText(/^message/i), 'This is a valid inquiry message.');
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<QuickInquiryForm />);

    await user.type(screen.getByLabelText(/^email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/^message/i), 'This is a valid inquiry message.');
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('shows validation error when message is too short', async () => {
    const user = userEvent.setup();
    render(<QuickInquiryForm />);

    await user.type(screen.getByLabelText(/^email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^message/i), 'Short');
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Successful submission (Req 5.1, 5.2)
  // -------------------------------------------------------------------------

  it('submits with source=quick_inquiry and CSRF token, shows success', async () => {
    const user = userEvent.setup();
    render(<QuickInquiryForm />);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/csrf');
    });

    await fillValidInquiry(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/inquiry sent/i);
    });

    // Verify POST body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const postCall = fetchSpy.mock.calls.find((c: any) => c[1]?.method === 'POST');
    expect(postCall).toBeDefined();
    const body = JSON.parse(postCall![1].body);
    expect(body.csrfToken).toBe(CSRF_TOKEN);
    expect(body.source).toBe('quick_inquiry');
    expect(body.email).toBe('jane@example.com');
    expect(body.inquiry).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Error handling
  // -------------------------------------------------------------------------

  it('shows error message on server error', async () => {
    fetchSpy = mockFetch({
      submitResponse: { success: false, error: 'Too many requests. Please try again later.' },
      submitStatus: 429,
    });
    vi.stubGlobal('fetch', fetchSpy);

    const user = userEvent.setup();
    render(<QuickInquiryForm />);

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledWith('/api/csrf'));
    await fillValidInquiry(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/too many requests/i);
    });
  });

  it('shows network error when fetch throws', async () => {
    fetchSpy = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (typeof url === 'string' && url.includes('/api/csrf')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ csrfToken: CSRF_TOKEN }) });
      }
      if (init?.method === 'POST') {
        return Promise.reject(new Error('Network failure'));
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
    vi.stubGlobal('fetch', fetchSpy);

    const user = userEvent.setup();
    render(<QuickInquiryForm />);

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledWith('/api/csrf'));
    await fillValidInquiry(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/network error/i);
    });
  });

  // -------------------------------------------------------------------------
  // Button state
  // -------------------------------------------------------------------------

  it('disables submit button while submitting', async () => {
    let resolvePost: (v: unknown) => void;
    fetchSpy = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (typeof url === 'string' && url.includes('/api/csrf')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ csrfToken: CSRF_TOKEN }) });
      }
      if (init?.method === 'POST') {
        return new Promise((resolve) => { resolvePost = resolve; });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
    vi.stubGlobal('fetch', fetchSpy);

    const user = userEvent.setup();
    render(<QuickInquiryForm />);

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledWith('/api/csrf'));
    await fillValidInquiry(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    });

    resolvePost!({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true, message: 'Inquiry sent!' }),
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /send inquiry/i })).toBeEnabled();
    });
  });
});
