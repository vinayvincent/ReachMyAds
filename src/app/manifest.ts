import type { MetadataRoute } from 'next';
import { BRAND_NAVY } from '@/lib/brand';
import { SITE_NAME } from '@/lib/structured-data';

/** Lets the site be added to a phone's home screen with the brand icon. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: 'Advertising and lead tracking for small businesses.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: BRAND_NAVY,
    icons: [
      { src: '/assets/icons/reachmyads-icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/assets/icons/reachmyads-icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/icons/reachmyads-icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/assets/icons/reachmyads-icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
