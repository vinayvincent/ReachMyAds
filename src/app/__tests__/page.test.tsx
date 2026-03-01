import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import Home from '@/app/page';
import { buildNextMetadata } from '@/components/SEOHead';

// Mock matchMedia for framer-motion / useReducedMotion
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

  // Mock fetch for CSRF token (used by ContactForm and QuickInquiryForm)
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve({ csrfToken: 'test-token' }),
  });
});

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Landing page (page.tsx)', () => {
  it('renders all four sections: Hero, Features, Testimonials, Pricing', () => {
    render(<Home />);

    expect(screen.getByRole('region', { name: 'Hero' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Features' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Testimonials' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Pricing' })).toBeInTheDocument();
  });

  it('renders Contact section with ContactForm', () => {
    render(<Home />);

    expect(screen.getByRole('region', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Get in Touch/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Contact form' })).toBeInTheDocument();
  });

  it('renders floating QuickInquiryForm', () => {
    render(<Home />);

    expect(screen.getByRole('region', { name: 'Quick inquiry form' })).toBeInTheDocument();
  });

  it('renders JSON-LD structured data script block', () => {
    const { container } = render(<Home />);
    const jsonLdScript = container.querySelector('script[type="application/ld+json"]');
    expect(jsonLdScript).toBeInTheDocument();

    const data = JSON.parse(jsonLdScript!.textContent!);
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('SoftwareApplication');
    expect(data.name).toBe('ReachMyAds');
    expect(data.applicationCategory).toBe('BusinessApplication');
  });

  it('includes SoftwareApplication offers in JSON-LD', () => {
    const { container } = render(<Home />);
    const jsonLdScript = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(jsonLdScript!.textContent!);

    expect(data.offers).toBeDefined();
    expect(data.offers['@type']).toBe('AggregateOffer');
    expect(data.offers.priceCurrency).toBe('USD');
  });

  it('wraps sections in a <main> element', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

describe('Landing page SEO metadata', () => {
  it('exports valid Next.js metadata via buildNextMetadata', async () => {
    // Import the metadata export from the page module
    const pageModule = await import('@/app/page');
    const metadata = pageModule.metadata;

    expect(metadata).toBeDefined();
    expect(metadata.title).toBe('ReachMyAds - AI-Driven Ad Management Platform');
    expect(metadata.description).toContain('Google, Meta, LinkedIn, and TikTok');
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();
    expect(metadata.alternates?.canonical).toBe('https://reachmyads.com');
  });

  it('buildNextMetadata produces correct OG tags', () => {
    const seo = {
      title: 'Test Title',
      description: 'Test description',
      keywords: ['test'],
      ogImage: 'https://reachmyads.com/og.png',
      canonicalUrl: 'https://reachmyads.com',
      structuredData: { '@context': 'https://schema.org' },
    };

    const meta = buildNextMetadata(seo);
    expect(meta.openGraph?.title).toBe('Test Title');
    expect(meta.openGraph?.description).toBe('Test description');
    expect(meta.twitter).toBeDefined();
  });
});
