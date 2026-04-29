'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { HeroContent } from '@/types';

const defaultHeroContent: HeroContent = {
  headline: 'Institutional-Grade AI. Omnichannel Synchronization.',
  subheadline:
    'The world\'s most advanced AI ad management ecosystem. Harmonize your strategy across Google, Meta, TikTok, and LinkedIn with predictive optimization and real-time cross-channel intelligence.',
  ctaText: 'Experience the Future',
  ctaLink: '#contact',
  backgroundAnimation: {
    type: 'morphing',
    duration: 15,
    delay: 0,
    easing: 'easeInOut',
    triggerOnScroll: false,
    threshold: 0
  }
};

export interface HeroProps {
  content?: Partial<HeroContent>;
}

export function Hero({ content }: HeroProps) {
  const hero: HeroContent = { ...defaultHeroContent, ...content };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use static values during SSR to prevent hydration mismatch,
  // then animate on the client after mount.
  const shouldAnimate = mounted;

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-transparent pt-20"
      aria-label="Hero"
    >
      {/* Background visual layering */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle grid with fade */}
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        
        {/* Animated Aurora Glows — only animate after mount */}
        {shouldAnimate && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-accent-500/10 blur-[120px] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
                x: [0, -60, 0],
                y: [0, 40, 0],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full"
            />
          </>
        )}
        {!shouldAnimate && (
          <>
            <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-accent-500/10 blur-[120px] rounded-full opacity-30" />
            <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full opacity-20" />
          </>
        )}
      </div>

      <div className="relative z-10 w-full max-w-[1200px] px-6 text-center">
        
        {/* Headline */}
        {shouldAnimate ? (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 text-[clamp(3.5rem,9vw,6.5rem)] font-black leading-[1.05] tracking-tighter text-slate-900 drop-shadow-xl"
          >
            Social Advertising <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-accent-500 to-accent-700 italic pr-2 drop-shadow-md">Evolved.</span>
          </motion.h1>
        ) : (
          <h1 className="mb-8 text-[clamp(3.5rem,9vw,6.5rem)] font-black leading-[1.05] tracking-tighter text-slate-900 drop-shadow-xl">
            Social Advertising <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-accent-500 to-accent-700 italic pr-2 drop-shadow-md">Evolved.</span>
          </h1>
        )}

        {/* Subheadline */}
        {shouldAnimate ? (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-12 max-w-3xl text-[18px] text-text-secondary leading-relaxed sm:text-[20px]"
          >
            Scale your advertising horizontally across every network with a single click. 
            Stop managing silos and start <span className="text-slate-900 font-bold">hyper-scaling</span> your ROI 
            with automated creative intelligence and omnichannel synchronization.
          </motion.p>
        ) : (
          <p className="mx-auto mb-12 max-w-3xl text-[18px] text-text-secondary leading-relaxed sm:text-[20px]">
            Scale your advertising horizontally across every network with a single click. 
            Stop managing silos and start <span className="text-slate-900 font-bold">hyper-scaling</span> your ROI 
            with automated creative intelligence and omnichannel synchronization.
          </p>
        )}

        {/* CTAs */}
        {shouldAnimate ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href={hero.ctaLink}
              className="btn-primary btn-beam group h-14 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-2xl px-8 text-[15px] font-bold"
            >
              {hero.ctaText}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#features"
              className="btn-secondary h-14 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-2xl px-8 text-[15px]"
            >
              View Demo
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={hero.ctaLink}
              className="btn-primary btn-beam group h-14 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-2xl px-8 text-[15px] font-bold"
            >
              {hero.ctaText}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#features"
              className="btn-secondary h-14 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-2xl px-8 text-[15px]"
            >
              View Demo
            </Link>
          </div>
        )}

        {/* Dashboard Preview */}
        {shouldAnimate ? (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-20 relative px-4 lg:px-0"
          >
            <div className="relative mx-auto max-w-[1000px] group">
              {/* Glow effect on hover */}
              <div className="absolute -inset-4 rounded-[40px] bg-accent-500/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative rounded-[24px] overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                  </div>
                  <div className="mx-auto text-[11px] font-medium text-slate-400 tracking-widest uppercase">ReachMyAds Dashboard</div>
                </div>
                <div className="aspect-[16/9] relative bg-black/40">
                  <Image
                    src="/images/hero-dashboard.png"
                    alt="ReachMyAds AI Dashboard Visualization"
                    fill
                    className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="mt-20 relative px-4 lg:px-0">
            <div className="relative mx-auto max-w-[1000px] group">
              <div className="absolute -inset-4 rounded-[40px] bg-accent-500/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative rounded-[24px] overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                  </div>
                  <div className="mx-auto text-[11px] font-medium text-slate-400 tracking-widest uppercase">ReachMyAds Dashboard</div>
                </div>
                <div className="aspect-[16/9] relative bg-black/40">
                  <Image
                    src="/images/hero-dashboard.png"
                    alt="ReachMyAds AI Dashboard Visualization"
                    fill
                    className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
