import type { PageConfig } from '@/types';

/**
 * Escapes HTML special characters to prevent XSS in meta tag content.
 * Handles &, <, >, ", and ' characters.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Builds an HTML string containing SEO head tags from a PageConfig.
 *
 * Generates: title, meta description, canonical URL, Open Graph tags,
 * Twitter Card tags, keywords meta tag, and JSON-LD structured data script block.
 *
 * Preconditions:
 * - page.seoMeta has non-empty title and description
 * - page.seoMeta.canonicalUrl is a valid URL on reachmyads.com domain
 * - page.seoMeta.structuredData is valid JSON-LD
 *
 * Postconditions:
 * - Returned string contains <title>, <meta name="description">,
 *   <link rel="canonical">, OG tags, Twitter Card tags, and JSON-LD script block
 */
export function buildSEOHead(page: PageConfig): string {
  const meta = page.seoMeta;
  const tags: string[] = [];

  // Core meta tags
  tags.push(`<title>${escapeHtml(meta.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeHtml(meta.description)}" />`);
  tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" />`);

  // Open Graph tags
  tags.push(`<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  tags.push(`<meta property="og:url" content="${escapeHtml(meta.canonicalUrl)}" />`);
  tags.push(`<meta property="og:type" content="website" />`);
  if (meta.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`);
  }

  // Twitter Card tags
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);

  // Keywords
  if (meta.keywords.length > 0) {
    tags.push(`<meta name="keywords" content="${escapeHtml(meta.keywords.join(', '))}" />`);
  }

  // Structured Data (JSON-LD)
  tags.push(`<script type="application/ld+json">${JSON.stringify(meta.structuredData)}</script>`);

  return tags.join('\n');
}
