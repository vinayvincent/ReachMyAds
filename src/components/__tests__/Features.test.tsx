import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Features } from '@/components/Features';
import type { Feature } from '@/types';

beforeAll(() => {
  // Mock matchMedia (required by useReducedMotion)
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

  // Mock IntersectionObserver (required by useAnimation with triggerOnScroll)
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

describe('Features', () => {
  it('renders all six default features', () => {
    render(<Features />);

    expect(screen.getByText('AI-Powered Optimization')).toBeInTheDocument();
    expect(screen.getByText('Multi-Platform Support')).toBeInTheDocument();
    expect(screen.getByText('Smart Budget Allocation')).toBeInTheDocument();
    expect(screen.getByText('Precision Audience Targeting')).toBeInTheDocument();
    expect(screen.getByText('Creative Generation')).toBeInTheDocument();
    expect(screen.getByText('Real-Time Analytics')).toBeInTheDocument();
  });

  it('renders section heading and description', () => {
    render(<Features />);

    expect(
      screen.getByRole('heading', { level: 2 }),
    ).toHaveTextContent('Everything you need to win at ads');
    expect(
      screen.getByText(/One platform, every channel/),
    ).toBeInTheDocument();
  });

  it('renders custom features when provided', () => {
    const custom: Feature[] = [
      { id: 'a', icon: '🔥', title: 'Custom A', description: 'Desc A', animationDelay: 0 },
      { id: 'b', icon: '⚡', title: 'Custom B', description: 'Desc B', animationDelay: 100 },
    ];

    render(<Features features={custom} />);

    expect(screen.getByText('Custom A')).toBeInTheDocument();
    expect(screen.getByText('Desc B')).toBeInTheDocument();
    expect(screen.queryByText('AI-Powered Optimization')).not.toBeInTheDocument();
  });

  it('has an accessible section landmark', () => {
    render(<Features />);
    expect(screen.getByRole('region', { name: 'Features' })).toBeInTheDocument();
  });

  it('hides feature icons from assistive technology', () => {
    const { container } = render(<Features />);
    const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBeGreaterThanOrEqual(6);
  });
});
