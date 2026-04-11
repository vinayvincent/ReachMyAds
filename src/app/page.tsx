import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { QuickInquiryForm } from '@/components/QuickInquiryForm';
import { SEOHead, buildNextMetadata } from '@/components/SEOHead';
import type { SEOMetadata } from '@/types';

const landingPageSEO: SEOMetadata = {
  title: 'Reach My Ads',
  description:
    'Create, manage, and optimize ads across Google, Meta, LinkedIn, and TikTok with AI-powered insights. One dashboard, every channel.',
  keywords: ['ad management', 'AI advertising', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'campaign optimization', 'multi-platform ads'],
  ogImage: 'https://reachmyads.com/og-image.png',
  canonicalUrl: 'https://reachmyads.com',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Social Media Advertising Platform',
    applicationCategory: 'BusinessApplication',
    description: 'Manage and distribute your advertisements across multiple social media platforms from one powerful dashboard.',
    url: 'https://reachmyads.com',
    operatingSystem: 'Web',
    offers: { '@type': 'AggregateOffer', lowPrice: '49', highPrice: '399', priceCurrency: 'USD' },
  },
};

export const metadata: Metadata = buildNextMetadata(landingPageSEO);

export default function Home() {
  return (
    <>
      <SEOHead structuredData={landingPageSEO.structuredData} />
      <main>
        <Hero />

        {/* Contact */}
        <section id="contact" className="relative bg-black py-28 sm:py-36" aria-label="Contact">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          <div className="bg-spotlight absolute inset-0" aria-hidden="true" />

          <div className="relative mx-auto max-w-[1200px] px-6">
            <div className="mx-auto max-w-xl text-center">
              <p className="mb-4 text-[20px] font-semibold uppercase tracking-[0.2em] text-accent-400/80">
                Contact
              </p>
              <h2 className="text-gradient-section text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.025em]">
                Start Advertising Across Multiple Social Media Platforms Today
              </h2>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                <a
                  href="mailto:Admin@reachmyads.com"
                  className="group flex items-center gap-3 text-[14px] font-medium text-white/70 transition-all hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-accent-400/10 group-hover:ring-accent-400/20">
                    <svg className="h-4 w-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Admin@reachmyads.com
                </a>
                <div className="hidden h-4 w-px bg-white/10 sm:block" />
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                  <div className="flex items-center gap-3 text-[14px] font-medium text-white/70">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all hover:bg-accent-400/10 hover:ring-accent-400/20">
                      <svg className="h-4 w-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <a href="tel:+916238299803" className="transition-all hover:text-white">+91 62382 99803</a>
                  </div>
                  <div className="hidden h-4 w-px bg-white/10 sm:block" />
                  <div className="flex items-center gap-3 text-[14px] font-medium text-white/70">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all hover:bg-accent-400/10 hover:ring-accent-400/20">
                      <svg className="h-4 w-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <a href="tel:+917012112355" className="transition-all hover:text-white">+91 70121 12355</a>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-4 text-[15px] text-[#888] leading-[1.75]">
                {/* Contact section text removed as requested */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
