import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import { Testimonials } from '@/components/Testimonials';
import type { Testimonial } from '@/types';

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

const sampleTestimonials: Testimonial[] = [
  { id: 't1', name: 'Alice Johnson', company: 'Acme Inc', content: 'Great platform for managing ads.' },
  { id: 't2', name: 'Bob Smith', company: 'Beta Corp', content: 'Saved us hours every week.' },
  { id: 't3', name: 'Carol Lee', company: 'Gamma LLC', content: 'AI recommendations are fantastic.' },
];

describe('Testimonials', () => {
  it('renders section heading and description', () => {
    render(<Testimonials testimonials={sampleTestimonials} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('What our clients say');
    expect(screen.getByText(/Trusted by agencies/)).toBeInTheDocument();
  });

  it('renders the first testimonial by default', () => {
    render(<Testimonials testimonials={sampleTestimonials} />);

    expect(screen.getByText(/Great platform for managing ads/)).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Acme Inc')).toBeInTheDocument();
  });

  it('navigates to next testimonial when clicking next arrow', async () => {
    render(<Testimonials testimonials={sampleTestimonials} />);

    const nextBtn = screen.getByRole('button', { name: 'Next testimonial' });
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.getByText(/Saved us hours every week/)).toBeInTheDocument();
    });
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('navigates to previous testimonial when clicking prev arrow', async () => {
    render(<Testimonials testimonials={sampleTestimonials} />);

    const prevBtn = screen.getByRole('button', { name: 'Previous testimonial' });
    fireEvent.click(prevBtn);

    // Wraps around to last testimonial
    await waitFor(() => {
      expect(screen.getByText(/AI recommendations are fantastic/)).toBeInTheDocument();
    });
    expect(screen.getByText('Carol Lee')).toBeInTheDocument();
  });

  it('navigates via dot navigation', async () => {
    render(<Testimonials testimonials={sampleTestimonials} />);

    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(3);

    fireEvent.click(dots[2]!);

    await waitFor(() => {
      expect(screen.getByText(/AI recommendations are fantastic/)).toBeInTheDocument();
    });
  });

  it('auto-rotates to the next testimonial', () => {
    vi.useFakeTimers();
    render(<Testimonials testimonials={sampleTestimonials} />);

    const dots = screen.getAllByRole('tab');
    expect(dots[0]!).toHaveAttribute('aria-selected', 'true');

    act(() => {
      vi.advanceTimersByTime(5100);
    });

    // After auto-rotate, the second dot should be active
    expect(dots[1]!).toHaveAttribute('aria-selected', 'true');
    expect(dots[0]!).toHaveAttribute('aria-selected', 'false');

    vi.useRealTimers();
  });

  it('has accessible carousel region with roledescription', () => {
    render(<Testimonials testimonials={sampleTestimonials} />);

    const carousel = screen.getByRole('region', { name: 'Client testimonials' });
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('has an accessible section landmark', () => {
    render(<Testimonials testimonials={sampleTestimonials} />);
    expect(screen.getByRole('region', { name: 'Testimonials' })).toBeInTheDocument();
  });

  it('marks active dot with aria-selected', () => {
    render(<Testimonials testimonials={sampleTestimonials} />);

    const dots = screen.getAllByRole('tab');
    expect(dots[0]!).toHaveAttribute('aria-selected', 'true');
    expect(dots[1]!).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(dots[1]!);

    expect(dots[1]!).toHaveAttribute('aria-selected', 'true');
    expect(dots[0]!).toHaveAttribute('aria-selected', 'false');
  });

  it('renders default testimonials when none provided', () => {
    render(<Testimonials />);

    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Luminary Digital')).toBeInTheDocument();
  });

  it('renders nothing when given an empty array', () => {
    const { container } = render(<Testimonials testimonials={[]} />);
    expect(container.querySelector('section')).toBeNull();
  });

  it('displays initials in avatar placeholder', () => {
    render(<Testimonials testimonials={sampleTestimonials} />);
    expect(screen.getByText('AJ')).toBeInTheDocument();
  });

  it('includes aria-live region for screen reader announcements', () => {
    const { container } = render(<Testimonials testimonials={sampleTestimonials} />);
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });
});
