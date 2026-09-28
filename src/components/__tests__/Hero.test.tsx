import { render, screen, within } from '@testing-library/react';
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

describe('Hero', () => {
  it('renders the default headline, subheadline and both calls to action', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('We run your ads.');
    expect(heading).toHaveTextContent('You get customers.');

    expect(
      screen.getByText(/Running the ads is only the start/),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Get started/ })).toHaveAttribute(
      'href',
      '#lead-form',
    );
    expect(screen.getByRole('link', { name: /See how it works/ })).toHaveAttribute(
      'href',
      '#how-it-works',
    );
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
    expect(screen.getByRole('link', { name: /Sign Up Now/ })).toHaveAttribute('href', '/signup');
  });

  it('labels the section by its own heading', () => {
    render(<Hero />);
    const region = screen.getByRole('region', { name: /We run your ads/ });
    expect(region).toBeInTheDocument();
  });

  it('names every advertising surface it claims to run', () => {
    render(<Hero />);

    const strip = screen.getByText(/Your ads go out on/).parentElement!;

    for (const brand of ['Google', 'Instagram', 'Facebook', 'WhatsApp', 'YouTube', 'LinkedIn']) {
      expect(within(strip).getByText(brand)).toBeInTheDocument();
    }
  });

  it('hides decorative background layers from assistive technology', () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
