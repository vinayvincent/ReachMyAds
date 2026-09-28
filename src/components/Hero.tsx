'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BrandLogo } from './BrandLogo';
import { AdShowcase } from './AdShowcase';
import type { BrandKey } from '@/lib/brand-logos';
import type { HeroContent } from '@/types';

const defaultHeroContent: HeroContent = {
  headline: 'We run your ads. You get customers.',
  subheadline:
    'Running the ads is only the start. One form puts the same campaign on Google, Meta and LinkedIn. Every call and message lands in one place, we help you reply, our AI tells you what to change next, and every sale is traced back to the ad that made it. One system, instead of five.',
  ctaText: 'Get started',
  ctaLink: '#lead-form',
  backgroundAnimation: {
    type: 'morphing',
    duration: 15,
    delay: 0,
    easing: 'easeInOut',
    triggerOnScroll: false,
    threshold: 0,
  },
};

/**
 * Surfaces, not networks. These are the names a shop owner recognises. All
 * six are placements inside the three networks we actually connect to
 * (Google Ads, Meta Ads, LinkedIn Ads), which the line below the strip says.
 */
const heroBrands: { key: BrandKey; label: string }[] = [
  { key: 'google', label: 'Google' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'linkedin', label: 'LinkedIn' },
];

/* ── Hero ────────────────────────────────────────────────────── */

export interface HeroProps {
  content?: Partial<HeroContent>;
}

export function Hero({ content }: HeroProps) {
  const hero: HeroContent = { ...defaultHeroContent, ...content };
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-line bg-canvas pb-14 pt-14 sm:pb-20 sm:pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* ── Copy ── */}
        <div>
          <h1
            id="hero-heading"
            className="h-display text-[clamp(2.6rem,6.2vw,4.3rem)] text-ink"
          >
            {content?.headline ? (
              hero.headline
            ) : (
              <>
                <span className="block">We run your ads. </span>
                <span className="block">
                  You get <span className="text-accent">customers</span>.
                </span>
              </>
            )}
          </h1>

          <p
            className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-ink-2 sm:text-[18.5px]"
          >
            {hero.subheadline}
          </p>

          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={hero.ctaLink}
              className="btn-primary group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-[16px]"
            >
              {hero.ctaText}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.4}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <a
              href="#how-it-works"
              className="btn-secondary inline-flex items-center justify-center rounded-lg px-6 py-3 text-[16px]"
            >
              See how it works
            </a>
          </div>

          {/* Platform strip. The showcase only shows three adverts, so this is
              where the full reach is actually stated. */}
          <div
            className="mt-10 border-t border-line pt-6"
          >
            <p className="mono-label-muted">
              Your ads go out on Google, Meta and LinkedIn
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              {heroBrands.map((brand) => (
                <li
                  key={brand.key}
                  className="flex items-center gap-1.5"
                  title={brand.label}
                >
                  <BrandLogo brand={brand.key} className="h-[22px] w-[22px]" />
                  <span className="text-[13px] font-semibold text-ink-2">{brand.label}</span>
                </li>
              ))}

            </ul>
          </div>
        </div>

        {/* ── Product panel ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative"
        >
          <AdShowcase />
        </motion.div>
      </div>
    </section>
  );
}
