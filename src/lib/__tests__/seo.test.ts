import { describe, it, expect } from 'vitest';
import { escapeHtml, buildSEOHead } from '@/lib/seo';
import { sampleSEOMetadata } from '@/__tests__/fixtures';
import type { PageConfig } from '@/types';

describe('escapeHtml', () => {
  it('escapes ampersands', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('escapes angle brackets', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it('escapes double quotes', () => {
    expect(escapeHtml('say "hello"')).toBe('say &quot;hello&quot;');
  });

  it('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe('it&#x27;s');
  });

  it('returns empty string unchanged', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('leaves safe strings unchanged', () => {
    expect(escapeHtml('Hello World 123')).toBe('Hello World 123');
  });
});

describe('buildSEOHead', () => {
  const page: PageConfig = { seoMeta: sampleSEOMetadata };

  it('includes a <title> tag', () => {
    const html = buildSEOHead(page);
    expect(html).toContain(`<title>${escapeHtml(sampleSEOMetadata.title)}</title>`);
  });

  it('includes a meta description tag', () => {
    const html = buildSEOHead(page);
    expect(html).toContain(
      `<meta name="description" content="${escapeHtml(sampleSEOMetadata.description)}" />`
    );
  });

  it('includes a canonical link tag', () => {
    const html = buildSEOHead(page);
    expect(html).toContain(
      `<link rel="canonical" href="${escapeHtml(sampleSEOMetadata.canonicalUrl)}" />`
    );
  });

  it('includes Open Graph tags', () => {
    const html = buildSEOHead(page);
    expect(html).toContain('og:title');
    expect(html).toContain('og:description');
    expect(html).toContain('og:url');
    expect(html).toContain('og:type');
    expect(html).toContain('og:image');
  });

  it('includes Twitter Card tags', () => {
    const html = buildSEOHead(page);
    expect(html).toContain('twitter:card');
    expect(html).toContain('twitter:title');
    expect(html).toContain('twitter:description');
  });

  it('includes keywords meta tag when keywords are provided', () => {
    const html = buildSEOHead(page);
    expect(html).toContain(
      `<meta name="keywords" content="${sampleSEOMetadata.keywords.join(', ')}" />`
    );
  });

  it('omits keywords meta tag when keywords array is empty', () => {
    const noKeywords: PageConfig = {
      seoMeta: { ...sampleSEOMetadata, keywords: [] },
    };
    const html = buildSEOHead(noKeywords);
    expect(html).not.toContain('keywords');
  });

  it('includes JSON-LD structured data script block', () => {
    const html = buildSEOHead(page);
    expect(html).toContain('<script type="application/ld+json">');
    expect(html).toContain(JSON.stringify(sampleSEOMetadata.structuredData));
    expect(html).toContain('</script>');
  });

  it('omits og:image when ogImage is empty', () => {
    const noImage: PageConfig = {
      seoMeta: { ...sampleSEOMetadata, ogImage: '' },
    };
    const html = buildSEOHead(noImage);
    expect(html).not.toContain('og:image');
  });

  it('escapes HTML in title to prevent XSS', () => {
    const xssPage: PageConfig = {
      seoMeta: { ...sampleSEOMetadata, title: '<script>alert("xss")</script>' },
    };
    const html = buildSEOHead(xssPage);
    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;');
  });
});
