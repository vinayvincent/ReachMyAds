import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { TrustedBy } from '@/components/TrustedBy';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { ComparisonTable } from '@/components/ComparisonTable';
import { HowItWorks } from '@/components/HowItWorks';
import { Pricing } from '@/components/Pricing';
import { QuickInquiryForm } from '@/components/QuickInquiryForm';
import { SEOHead, buildNextMetadata } from '@/components/SEOHead';
import type { SEOMetadata } from '@/types';

const landingPageSEO: SEOMetadata = {
  title: 'Reach My Ads | AI-Powered Cross-Channel Advertising',
  description:
    'Scale your advertising across Google, Meta, TikTok, and more with the worlds most advanced AI ad management platform. One dashboard, every channel.',
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
      <main className="bg-transparent">
        <Hero />
        <TrustedBy />
        <FeaturesGrid />
        <HowItWorks />
        <ComparisonTable />
        <Pricing />

        {/* Contact */}
        <section id="contact" className="relative bg-transparent py-28 sm:py-36" aria-label="Contact">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          <div className="bg-spotlight absolute inset-0" aria-hidden="true" />

          <div className="relative mx-auto max-w-[1200px] px-6">
            <div className="mx-auto max-w-xl text-center">
              <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
                Get Started
              </p>
              <h2 className="text-4xl font-bold leading-tight tracking-tight mb-12 text-slate-900 dark:text-white">
                Ready to scale your <span className="text-gradient-blue">advertising</span> ROI?
              </h2>
              
              <div className="grid grid-cols-1 gap-12">
                {/* Inquiry Form */}
                <div className="glass-panel p-8 text-left">
                  <QuickInquiryForm />
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                  <a
                    href="mailto:team@reachmyads.com"
                    className="group flex items-center gap-3 text-[14px] font-medium text-slate-600 dark:text-slate-300 transition-all hover:text-slate-900 dark:hover:text-white"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 transition-all group-hover:bg-accent-50 group-hover:ring-accent-200">
                      <svg className="h-5 w-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    team@reachmyads.com
                  </a>
                  <div className="hidden h-4 w-px bg-slate-200 dark:bg-slate-700 sm:block" />
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                    <div className="flex items-center gap-3 text-[14px] font-medium text-slate-600 dark:text-slate-300">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 transition-all hover:bg-accent-50 hover:ring-accent-200">
                        <svg className="h-5 w-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <a href="tel:+916238299803" className="transition-all hover:text-slate-900 dark:hover:text-white">+91 62382 99803</a>
                    </div>
                    <div className="hidden h-4 w-px bg-slate-200 dark:bg-slate-700 sm:block" />
                    <div className="flex items-center gap-3 text-[14px] font-medium text-slate-600 dark:text-slate-300">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 transition-all hover:bg-accent-50 hover:ring-accent-200">
                        <svg className="h-5 w-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <a href="tel:+917012112355" className="transition-all hover:text-slate-900 dark:hover:text-white">+91 70121 12355</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
