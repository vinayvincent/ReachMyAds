import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ContactForm } from '@/components/ContactForm';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CSRF_TOKEN = 'fake-csrf-token';

function mockFetch(overrides?: Partial<{ csrfOk: boolean; submitResponse: object; submitStatus: number }>) {
  const opts = { csrfOk: true, submitResponse: { success: true, message: "Message sent! We'll get back to you soon." }, submitStatus: 200, ...overrides };

  return vi.fn().mockImplementation((url: string, init?: RequestInit) => {
    // CSRF token endpoint
    if (typeof url === 'string' && url.includes('/api/csrf')) {
      return Promise.resolve({
        ok: opts.csrfOk,
        json: () => Promise.resolve({ csrfToken: CSRF_TOKEN }),
      });
    }
    // Contact submission endpoint
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

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^name/i), 'Jane Doe');
  await user.type(screen.getByLabelText(/^email/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/^message/i), 'I would like to learn more about your platform.');
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ContactForm', () => {
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

  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('has an accessible section landmark', () => {
    render(<ContactForm />);
    expect(screen.getByRole('region', { name: /contact form/i })).toBeInTheDocument();
  });

  it('includes a hidden honeypot field (Req 3.6)', () => {
    const { container } = render(<ContactForm />);
    const honeypot = container.querySelector('#contact-honeypot');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot?.closest('[aria-hidden="true"]')).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Client-side validation (Req 3.2)
  // -------------------------------------------------------------------------

  it('shows validation error when name is empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^email/i), 'a@b.com');
    await user.type(screen.getByLabelText(/^message/i), 'Hello, this is a valid message.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^name/i), 'Jane');
    await user.type(screen.getByLabelText(/^email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/^message/i), 'Hello, this is a valid message.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('shows validation error when message is too short', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^name/i), 'Jane');
    await user.type(screen.getByLabelText(/^email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^message/i), 'Short');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Successful submission (Req 3.1, 3.4)
  // -------------------------------------------------------------------------

  it('submits form data with CSRF token and shows success message', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Wait for CSRF token fetch
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/csrf');
    });

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/message sent/i);
    });

    // Verify the POST body included csrfToken
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const postCall = fetchSpy.mock.calls.find((c: any) => c[1]?.method === 'POST');
    expect(postCall).toBeDefined();
    const body = JSON.parse(postCall![1].body);
    expect(body.csrfToken).toBe(CSRF_TOKEN);
    expect(body.name).toBe('Jane Doe');
    expect(body.email).toBe('jane@example.com');
  });

  // -------------------------------------------------------------------------
  // Server-side field errors
  // -------------------------------------------------------------------------

  it('displays server-side field validation errors', async () => {
    fetchSpy = mockFetch({
      submitResponse: { success: false, error: { email: 'Email already registered' } },
      submitStatus: 400,
    });
    vi.stubGlobal('fetch', fetchSpy);

    const user = userEvent.setup();
    render(<ContactForm />);

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledWith('/api/csrf'));
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText('Email already registered')).toBeInTheDocument();
    });
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
    render(<ContactForm />);

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledWith('/api/csrf'));
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/too many requests/i);
    });
  });

  it('shows network error when fetch throws', async () => {
    // CSRF fetch succeeds, but submission fetch throws
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
    render(<ContactForm />);

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledWith('/api/csrf'));
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/network error/i);
    });
  });

  // -------------------------------------------------------------------------
  // Button state
  // -------------------------------------------------------------------------

  it('disables submit button while submitting', async () => {
    // Make the POST hang so we can check the disabled state
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
    render(<ContactForm />);

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledWith('/api/csrf'));
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Button should show "Sending…" and be disabled
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    });

    // Resolve the POST
    resolvePost!({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true, message: 'Message sent!' }),
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
    });
  });
});
