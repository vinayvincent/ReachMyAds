import type { Metadata } from 'next';
import type { SEOMetadata } from '@/types';

/**
 * Generates a Next.js Metadata object from SEOMetadata.
 * Use this in page-level `generateMetadata()` or `export const metadata`.
 */
export function buildNextMetadata(seo: SEOMetadata): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      // A page's openGraph replaces the layout's wholesale in Next.js, so the
      // site-wide fields have to be restated here or they drop off the page.
      siteName: 'Reach My Ads',
      locale: 'en_IN',
      type: 'website',
      ...(seo.ogImage
        ? { images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}

/**
 * SEOHead component that renders JSON-LD structured data as a script tag.
 * In Next.js App Router, standard meta tags are handled via the Metadata API
 * (see buildNextMetadata), but JSON-LD must be rendered as a component.
 */
export function SEOHead({ structuredData }: { structuredData: SEOMetadata['structuredData'] }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
