import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Proof } from '@/components/Proof';
import { Platforms } from '@/components/Platforms';
import { Pillars } from '@/components/Pillars';
import { HowItWorks } from '@/components/HowItWorks';
import { LeadTracking } from '@/components/LeadTracking';
import { AIAnalytics } from '@/components/AIAnalytics';
import { NoAgency } from '@/components/NoAgency';
import { Verticals } from '@/components/Verticals';
import { FAQ } from '@/components/FAQ';
import { QuickInquiryForm } from '@/components/QuickInquiryForm';
import { SEOHead, buildNextMetadata } from '@/components/SEOHead';
import { homePageGraph, SITE_URL } from '@/lib/structured-data';
import type { SEOMetadata } from '@/types';

const landingPageSEO: SEOMetadata = {
  title: 'Reach My Ads | Google & Instagram Ads for Small Businesses',
  description:
    'We run your ads on Google, Meta and LinkedIn, collect every call and WhatsApp enquiry in one inbox, and show which ad made each sale. No agency needed.',
  keywords: [
    'advertising for small business India',
    'run my Google ads',
    'Instagram ads for shops',
    'Google Meta LinkedIn ads from one place',
    'WhatsApp lead tracking',
    'lead management software India',
    'digital marketing without an agency',
    'cost per customer tracking',
    'ad management platform',
    'Google Ads for small business',
    'Instagram ads for small business',
    'Facebook ads management India',
    'digital marketing Thrissur',
    'digital marketing Kerala',
  ],
  ogImage: `${SITE_URL}/opengraph-image`,
  canonicalUrl: SITE_URL,
  structuredData: homePageGraph(),
};

export const metadata: Metadata = buildNextMetadata(landingPageSEO);

const contactMethods = [
  {
    label: 'team@reachmyads.com',
    href: 'mailto:team@reachmyads.com',
    note: 'We read every one',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    label: '+91 62382 99803',
    href: 'tel:+916238299803',
    note: 'Call or WhatsApp',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  },
];

export default function Home() {
  return (
    <>
      <SEOHead structuredData={landingPageSEO.structuredData} />

      <Hero />
      <Proof />
      <Platforms />
      <Pillars />
      <HowItWorks />
      <LeadTracking />
      <AIAnalytics />
      <NoAgency />
      <Verticals />
      <FAQ />

      {/* Closing call to action */}
      <section
        id="contact"
        className="band-brand relative overflow-hidden"
        aria-labelledby="contact-heading"
      >
        <div className="relative mx-auto max-w-[1100px] px-6 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="text-[14px] font-semibold text-ink-3">
                Get started
              </p>
              <h2
                id="contact-heading"
                className="h-display mt-4 text-[clamp(2.1rem,4.4vw,3.1rem)] text-ink"
              >
                Tell us what you sell.{' '}
                <br />
                We&apos;ll do the rest.
              </h2>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-ink-2">
                Your shop name or a link is all we need. You will hear back from
                the people who built this, not a sales team, and your ads can be live tomorrow.
              </p>

              <ul className="mt-9 space-y-3">
                {contactMethods.map((method) => (
                  <li key={method.label}>
                    <a
                      href={method.href}
                      className="group inline-flex items-center gap-3.5 text-[15px] font-medium text-ink transition-opacity hover:opacity-90"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/10 transition-colors group-hover:bg-white/20">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d={method.icon} />
                        </svg>
                      </span>
                      <span>
                        <span className="block">{method.label}</span>
                        <span className="block text-[13px] font-normal text-ink-3">
                          {method.note}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="lead-form"
              className="band-escape rounded-xl p-6 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] sm:p-8"
            >
              <h3 className="h-display text-[19px] text-ink">Send us a line</h3>
              <p className="mb-5 mt-2 text-[14.5px] leading-relaxed text-ink-2">
                Your email and what you sell. That is all we need to get going.
              </p>
              <QuickInquiryForm placement="footer" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
