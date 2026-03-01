import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Hero } from '@/components/Hero';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Hero', () => {
  it('renders default headline, subheadline, and CTA', () => {
    render(<Hero />);

    expect(
      screen.getByRole('heading', { level: 1 }),
    ).toHaveTextContent('AI-Powered Ad Management Across Every Platform');

    expect(
      screen.getByText(/Create, manage, and optimize campaigns/),
    ).toBeInTheDocument();

    const cta = screen.getByRole('link', { name: /Get Started Free/ });
    expect(cta).toHaveAttribute('href', '#contact');
  });

  it('renders custom content when provided', () => {
    render(
      <Hero
        content={{
          headline: 'Custom Headline',
          subheadline: 'Custom sub',
          ctaText: 'Sign Up Now',
          ctaLink: '/signup',
        }}
      />,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Custom Headline');
    expect(screen.getByText('Custom sub')).toBeInTheDocument();

    const cta = screen.getByRole('link', { name: 'Sign Up Now' });
    expect(cta).toHaveAttribute('href', '/signup');
  });

  it('has an accessible section landmark', () => {
    render(<Hero />);
    expect(screen.getByRole('region', { name: 'Hero' })).toBeInTheDocument();
  });

  it('hides background orbs from assistive technology', () => {
    const { container } = render(<Hero />);
    const hidden = container.querySelector('[aria-hidden="true"]');
    expect(hidden).toBeInTheDocument();
  });
});
