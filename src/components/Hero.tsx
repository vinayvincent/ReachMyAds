'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { HeroContent } from '@/types';
import { AnimatedSection } from '@/components/AnimatedSection';

const defaultHeroContent: HeroContent = {
  headline: 'AI-Powered Ad Management Across Every Platform',
  subheadline:
    'Create, manage, and optimize campaigns on Google, Meta, LinkedIn, and TikTok — all from one intelligent dashboard.',
  ctaText: 'Get Started Free',
  ctaLink: '#contact',
  backgroundAnimation: {
    type: 'fadeIn',
    duration: 1200,
    delay: 0,
    easing: 'easeOut',
    triggerOnScroll: false,
    threshold: 0,
  },
};

export interface HeroProps {
  content?: Partial<HeroContent>;
}

export function Hero({ content }: HeroProps) {
  const hero: HeroContent = { ...defaultHeroContent, ...content };

  return (
    <section
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black"
      aria-label="Hero"
    >
      {/* Aurora mesh gradient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-0 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/3 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 h-[600px] w-[800px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.1) 0%, transparent 60%)',
          }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -10, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      {/* Top-down fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 py-32 text-center lg:py-40">
        {/* Badge */}
        <AnimatedSection
          animation={{ type: 'fadeIn', duration: 600, delay: 0, triggerOnScroll: false }}
        >
          <motion.div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5"
            whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.12)' }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
            </span>
            <span className="text-[12px] font-medium tracking-wide text-[#777]">
              AI-Driven Ad Management Platform
            </span>
          </motion.div>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection
          animation={{ type: 'slideUp', duration: 800, delay: 100, triggerOnScroll: false }}
        >
          <h1 className="text-gradient-hero text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.035em]">
            {hero.headline}
          </h1>
        </AnimatedSection>

        {/* Subheadline */}
        <AnimatedSection
          animation={{ type: 'slideUp', duration: 800, delay: 250, triggerOnScroll: false }}
        >
          <p className="mx-auto mt-6 max-w-[540px] text-[15px] text-[#777] leading-[1.75] sm:text-[16px]">
            {hero.subheadline}
          </p>
        </AnimatedSection>

        {/* CTAs */}
        <AnimatedSection
          animation={{ type: 'slideUp', duration: 600, delay: 400, triggerOnScroll: false }}
        >
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={hero.ctaLink}
              className="btn-primary btn-beam group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
            >
              {hero.ctaText}
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#features"
              className="btn-secondary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Learn More
            </Link>
          </div>
        </AnimatedSection>

        {/* Metrics bar */}
        <AnimatedSection
          animation={{ type: 'fadeIn', duration: 800, delay: 600, triggerOnScroll: false }}
        >
          <div className="mx-auto mt-20 flex max-w-lg flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { value: '4', label: 'Ad Platforms' },
              { value: '2.5x', label: 'Avg. ROAS Lift' },
              { value: '30%', label: 'Cost Savings' },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.5 }}
              >
                <div className="metric-value text-[28px] font-bold text-white">{metric.value}</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#555]">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Platform trust bar */}
        <AnimatedSection
          animation={{ type: 'fadeIn', duration: 800, delay: 800, triggerOnScroll: false }}
        >
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#333]">
              Manage ads across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {['Google', 'Meta', 'LinkedIn', 'TikTok'].map((platform, i) => (
                <motion.span
                  key={platform}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                  className="text-[13px] font-medium text-[#444] transition-colors duration-200 hover:text-white"
                >
                  {platform}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" aria-hidden="true" />
    </section>
  );
}
