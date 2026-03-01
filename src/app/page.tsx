import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import { Pricing } from '@/components/Pricing';
import { ContactForm } from '@/components/ContactForm';
import { QuickInquiryForm } from '@/components/QuickInquiryForm';
import { SEOHead, buildNextMetadata } from '@/components/SEOHead';
import type { SEOMetadata } from '@/types';

const landingPageSEO: SEOMetadata = {
  title: 'ReachMyAds - AI-Driven Ad Management Platform',
  description:
    'Create, manage, and optimize ads across Google, Meta, LinkedIn, and TikTok with AI-powered insights. One dashboard, every channel.',
  keywords: ['ad management', 'AI advertising', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'campaign optimization', 'multi-platform ads'],
  ogImage: 'https://reachmyads.com/og-image.png',
  canonicalUrl: 'https://reachmyads.com',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ReachMyAds',
    applicationCategory: 'BusinessApplication',
    description: 'AI-driven ad management platform for creating, managing, and optimizing campaigns across Google, Meta, LinkedIn, and TikTok.',
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
        <Features />
        <Testimonials />
        <Pricing />

        {/* Contact */}
        <section id="contact" className="relative bg-black py-28 sm:py-36" aria-label="Contact">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          <div className="bg-spotlight absolute inset-0" aria-hidden="true" />

          <div className="relative mx-auto max-w-[1200px] px-6">
            <div className="mx-auto max-w-xl text-center">
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-400/80">
                Contact
              </p>
              <h2 className="text-gradient-section text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.025em]">
                Get in touch
              </h2>
              <p className="mt-5 text-[15px] text-[#666] leading-[1.75]">
                Have a question or ready to get started? Drop us a message and
                we&apos;ll get back to you shortly.
              </p>
              <p className="mt-3 text-[12px] text-[#444]">
                Or email us directly at{' '}
                <a href="mailto:Admin@reachmyads.com" className="text-accent-400/80 transition-colors hover:text-white">
                  Admin@reachmyads.com
                </a>
              </p>
            </div>
            <div className="gradient-border-card mx-auto mt-14 max-w-xl rounded-2xl p-8 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <QuickInquiryForm placement="floating" />
    </>
  );
}
