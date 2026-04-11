'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { HeroContent } from '@/types';

const defaultHeroContent: HeroContent = {
  headline: 'Social Media Advertising Platform to Publish Ads Across Multiple Platforms',
  subheadline:
    'Manage and distribute your advertisements across multiple social media platforms from one powerful dashboard. Our platform helps businesses publish ads easily on Facebook, Instagram, LinkedIn, and more without managing each platform separately.\n\nSave time, increase reach, and improve marketing performance.\n\nStart managing all your social media advertisements from one place.',
  ctaText: 'Start Advertising Today',
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
        
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-gradient-hero text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.035em]">
            {hero.headline}
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="mx-auto mt-6 max-w-[700px] space-y-4 text-[15px] text-[#999] leading-[1.75] sm:text-[16px]">
            {hero.subheadline?.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
          </div>
        </motion.div>

        {/* Hero Image Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative mx-auto mt-20 max-w-[1000px] w-full isolate">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-500 to-purple-500 opacity-30 blur-xl" aria-hidden="true" />
            <div className="relative rounded-2xl bg-black/50 border border-white/10 p-2 backdrop-blur-md shadow-2xl">
              <div className="rounded-xl overflow-hidden bg-[#111] aspect-video relative">
                <Image
                  src="/images/hero-dashboard.png"
                  alt="ReachMyAds Dashboard Interface Mockup"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  className="opacity-90 transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" aria-hidden="true" />
    </section>
  );
}
