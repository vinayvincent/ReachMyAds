import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/structured-data';

/**
 * Real "last changed" dates, not the build time. Google stops trusting
 * lastmod when it changes on every deploy without the page changing, so bump
 * a date only when that page's content actually changes.
 */
const UPDATED = {
  home: '2026-09-28',
  about: '2026-09-28',
  legal: '2026-05-27',
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: UPDATED.home,
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${SITE_URL}/opengraph-image`, `${SITE_URL}/assets/logo/reachmyads-logo-on-white.png`],
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: UPDATED.about,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: UPDATED.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: UPDATED.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
