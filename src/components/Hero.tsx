'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { HeroContent } from '@/types';

const defaultHeroContent: HeroContent = {
  headline: 'Institutional-Grade AI. Omnichannel Synchronization.',
  subheadline:
    "The world's most advanced AI ad management ecosystem. Harmonize your strategy across Google, Meta, TikTok, and LinkedIn with predictive optimization and real-time cross-channel intelligence.",
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

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-transparent pt-20"
      aria-label="Hero"
    >
      {/* Background visual layering */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle grid with fade */}
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

        {/* Aurora glows — rendered as plain divs on server, animated only after client mount */}
        {mounted ? (
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
        ) : (
          <>
            <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-accent-500/10 blur-[120px] rounded-full opacity-30" />
            <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full opacity-20" />
          </>
        )}
      </div>

      <div className="relative z-10 w-full max-w-[1200px] px-6 text-center">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 text-[clamp(3.5rem,9vw,6.5rem)] font-black leading-[1.05] tracking-tighter text-slate-900 dark:text-white drop-shadow-xl"
          suppressHydrationWarning
        >
          Social Advertising <br className="hidden md:block" />
          <span className="text-blue-600">Evolved.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-12 max-w-3xl text-[18px] text-slate-600 dark:text-slate-300 leading-relaxed sm:text-[20px]"
          suppressHydrationWarning
        >
          Scale your advertising horizontally across every network with a single click. Stop managing silos and start <span className="text-slate-900 dark:text-white font-bold">hyper-scaling</span> your ROI with automated creative intelligence and omnichannel synchronization.
        </motion.p>


        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-20 relative px-4 lg:px-0"
          suppressHydrationWarning
        >
          <div className="relative mx-auto max-w-[1000px] group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-4 rounded-[40px] bg-accent-500/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative rounded-[24px] overflow-hidden border border-slate-200/50 dark:border-white/10 bg-slate-100/80 dark:bg-black/60 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-200/50 dark:border-white/10 bg-white/5 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-white/10" />
                </div>
                <div className="mx-auto text-[11px] font-medium text-slate-400 tracking-widest uppercase">ReachMyAds Dashboard</div>
              </div>
              <div className="aspect-[16/9] relative bg-slate-200/50 dark:bg-black/40">
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
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/80 dark:from-black to-transparent pointer-events-none" />
    </section>
  );
}
