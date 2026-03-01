import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Pricing } from '@/components/Pricing';
import type { PricingPlan } from '@/types';

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

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: readonly number[] = [];
    private cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) { this.cb = cb; }
    observe(el: Element) {
      this.cb(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        this,
      );
    }
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] { return []; }
  }
  global.IntersectionObserver = MockIntersectionObserver;
});

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Pricing', () => {
  it('renders all three default plans', () => {
    render(<Pricing />);

    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders section heading and description', () => {
    render(<Pricing />);

    expect(
      screen.getByRole('heading', { level: 2 }),
    ).toHaveTextContent('Simple, transparent pricing');
    expect(
      screen.getByText(/Choose the plan that fits your business/),
    ).toBeInTheDocument();
  });

  it('renders prices for each default plan', () => {
    render(<Pricing />);

    expect(screen.getByText('$49')).toBeInTheDocument();
    expect(screen.getByText('$149')).toBeInTheDocument();
    expect(screen.getByText('$399')).toBeInTheDocument();
  });

  it('renders features for each plan', () => {
    render(<Pricing />);

    expect(screen.getByText('1 ad platform')).toBeInTheDocument();
    expect(screen.getByText('Advanced AI optimization')).toBeInTheDocument();
    expect(screen.getByText('SLA guarantee')).toBeInTheDocument();
  });

  it('highlights the popular plan with a badge', () => {
    render(<Pricing />);

    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders CTA links with correct hrefs', () => {
    render(<Pricing />);

    const links = screen.getAllByRole('link');
    const hrefs = links.map((link) => link.getAttribute('href'));

    expect(hrefs).toContain('#contact');
  });

  it('renders custom plans when provided', () => {
    const custom: PricingPlan[] = [
      {
        id: 'basic',
        name: 'Basic Plan',
        price: 19,
        currency: 'USD',
        billingPeriod: 'monthly',
        features: ['Feature A', 'Feature B'],
        ctaText: 'Try Now',
        ctaLink: '/signup',
      },
    ];

    render(<Pricing plans={custom} />);

    expect(screen.getByText('Basic Plan')).toBeInTheDocument();
    expect(screen.getByText('$19')).toBeInTheDocument();
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Try Now' })).toHaveAttribute('href', '/signup');
    expect(screen.queryByText('Starter')).not.toBeInTheDocument();
  });

  it('has an accessible section landmark', () => {
    render(<Pricing />);
    expect(screen.getByRole('region', { name: 'Pricing' })).toBeInTheDocument();
  });

  it('renders yearly billing period label correctly', () => {
    const yearlyPlan: PricingPlan[] = [
      {
        id: 'annual',
        name: 'Annual',
        price: 499,
        currency: 'USD',
        billingPeriod: 'yearly',
        features: ['All features'],
        ctaText: 'Subscribe',
        ctaLink: '/signup',
      },
    ];

    render(<Pricing plans={yearlyPlan} />);

    expect(screen.getByText('/yr')).toBeInTheDocument();
  });
});
