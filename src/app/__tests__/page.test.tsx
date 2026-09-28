import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import Home from '@/app/page';
import { buildNextMetadata } from '@/components/SEOHead';

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

  // Sections reveal on scroll, so the observer must report them as visible.
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: readonly number[] = [];
    private cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) {
      this.cb = cb;
    }
    observe(el: Element) {
      this.cb([{ isIntersecting: true, target: el } as IntersectionObserverEntry], this);
    }
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  global.IntersectionObserver = MockIntersectionObserver;

  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve({ csrfToken: 'test-token' }),
  });
});

/** Reads the page's own JSON-LD graph (the layout renders identity separately). */
function readGraph(container: HTMLElement) {
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).toBeInTheDocument();
  return JSON.parse(script!.textContent!);
}

describe('Landing page (page.tsx)', () => {
  it('renders every section of the page', () => {
    render(<Home />);

    for (const name of [
      /We run your ads/,
      /Three networks/,
      /Three jobs/,
      /Four steps/,
      /From the first click to the sale/,
      /Just ask, in your own words/,
      /You do not need to hire anyone/,
      /We already know your business/,
      /Common questions/,
    ]) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument();
    }
  });

  it('renders the closing contact section with the lead form', () => {
    render(<Home />);

    expect(
      screen.getByRole('region', { name: /Tell us what you sell/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Send us a line', level: 3 })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /team@reachmyads\.com\s*We read every one/ }),
    ).toHaveAttribute('href', 'mailto:team@reachmyads.com');
    expect(screen.getByRole('link', { name: /\+91 62382 99803/ })).toHaveAttribute(
      'href',
      'tel:+916238299803',
    );
  });

  it('exposes the at-a-glance product facts', () => {
    render(<Home />);
    expect(
      screen.getByRole('region', { name: 'Reach My Ads at a glance' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Ad networks, one form')).toBeInTheDocument();
  });

  it('renders a JSON-LD @graph rather than a single loose node', () => {
    const { container } = render(<Home />);
    const data = readGraph(container);

    expect(data['@context']).toBe('https://schema.org');
    expect(Array.isArray(data['@graph'])).toBe(true);
  });

  it('describes the software, the service, the steps and the FAQ to crawlers', () => {
    const { container } = render(<Home />);
    const types = readGraph(container)['@graph'].map((node: { '@type': string }) => node['@type']);

    expect(types).toEqual(
      expect.arrayContaining([
        'WebPage',
        'SoftwareApplication',
        'Service',
        'HowTo',
        'ItemList',
        'FAQPage',
      ]),
    );
  });

  // Our fee is quoted per business, so the graph must not publish a price that
  // would then be repeated back by search results and AI assistants.
  it('publishes no price for the SoftwareApplication', () => {
    const { container } = render(<Home />);
    const graph = readGraph(container)['@graph'] as Record<string, unknown>[];
    const software = graph.find((node) => node['@type'] === 'SoftwareApplication')!;

    expect(software.offers).toBeUndefined();
  });

  it('lists every advertising network as an ItemList for crawlers', () => {
    const { container } = render(<Home />);
    const graph = readGraph(container)['@graph'] as Record<string, unknown>[];
    const list = graph.find((node) => node['@type'] === 'ItemList')!;
    const names = (list.itemListElement as { name: string }[]).map((item) => item.name);

    expect(names).toEqual([
      'Google Ads — Search, Maps, YouTube and Shopping',
      'Meta Ads — Instagram, Facebook and click-to-WhatsApp',
      'LinkedIn Ads',
    ]);
    expect(list.numberOfItems).toBe(names.length);
  });

  it('gives the HowTo four ordered steps', () => {
    const { container } = render(<Home />);
    const graph = readGraph(container)['@graph'] as Record<string, unknown>[];
    const howTo = graph.find((node) => node['@type'] === 'HowTo')!;
    const steps = howTo.step as { position: number; name: string }[];

    expect(steps).toHaveLength(4);
    expect(steps.map((s) => s.position)).toEqual([1, 2, 3, 4]);
  });
});

describe('Landing page SEO metadata', () => {
  it('exports valid Next.js metadata via buildNextMetadata', async () => {
    const pageModule = await import('@/app/page');
    const metadata = pageModule.metadata;

    expect(metadata).toBeDefined();
    expect(metadata.title).toBe(
      'Reach My Ads | Google & Instagram Ads for Small Businesses',
    );
    expect(metadata.description).toContain('Google, Meta and LinkedIn');
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
