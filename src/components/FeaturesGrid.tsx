'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Cross-Channel Command Center',
    description: 'Centralize your entire digital footprint. Command Google, Meta, TikTok, and LinkedIn campaigns from a unified, institutional-grade interface engineered for rapid execution and total visibility.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: 'AI Creative Hub 2.0',
    description: 'Transform concepts into conversion. Leverage state-of-the-art generative AI to synthesize high-impact ad copy and visual assets, mathematically optimized for every platform unique algorithmic DNA.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.337a4 4 0 01-2.58.344l-1.637-.327a4 4 0 01-2.03-3.41V8a2 2 0 012-2h3.414a2 2 0 011.414.586L19 11.414a2 2 0 010 2.828l-4.586 4.586a2 2 0 01-2.828 0L19.428 15.428z" />
      </svg>
    ),
  },
  {
    title: 'Smart Budget Allocation',
    description: 'Eliminate capital inefficiency. Our predictive engine autonomously reallocates investment toward highest-yield opportunities in real-time, ensuring maximum ROAS across your entire portfolio.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Predictive Intelligence',
    description: 'Project performance with surgical precision. Access deep-tier historical insights and machine learning models that forecast campaign success and consumer behavior before you commit a single dollar.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Autonomous Multivariate Testing',
    description: 'Radical experimentation at scale. Continuously synthesize and test thousands of multivariate combinations to pinpoint the exact intersection of creative, audience, and message.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: 'AI Creative Cloner',
    description: 'Instantly replicate high-performing ad structures from the Meta Ad Library using state-of-the-art vision models and automated copy synthesis.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
  },
  {
    title: 'Executive Strategic Support',
    description: 'Bespoke strategic partnership. Benefit from dedicated fractional CMOs and 24/7 technical engineering teams committed to maintaining your competitive edge.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Performance Forecasting',
    description: 'Predict campaign ROI with surgical precision using ML models that analyze deep-tier historical insights before you commit a single dollar.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'ROAS Auto-Balancing',
    description: 'Real-time cross-channel budget shifting. Our engine captures peak conversion windows across every platform to ensure maximum portfolio efficiency.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <>
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/10 group-hover:bg-accent-500/10 group-hover:ring-accent-500/20 transition-all duration-300">
        <div className="text-accent-600 group-hover:text-accent-700 transition-colors">
          {feature.icon}
        </div>
      </div>
      <h3 className="mb-3 text-[18px] font-semibold text-slate-900 dark:text-white tracking-tight">
        {feature.title}
      </h3>
      <p className="text-[15px] leading-relaxed text-text-secondary dark:text-slate-300">
        {feature.description}
      </p>
    </>
  );

  if (!mounted) {
    return (
      <div className="card-feature group rounded-3xl p-8 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card-feature group rounded-3xl p-8 backdrop-blur-sm"
    >
      {content}
    </motion.div>
  );
}

function SectionHeader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-2xl text-center mb-20">
        <p className="text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-600 mb-4">
          Features
        </p>
        <h2 className="text-gradient-section text-4xl font-bold tracking-tight sm:text-5xl">
          Everything you need to dominate social advertising
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl text-center mb-20">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-600 mb-4"
      >
        Features
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gradient-section text-4xl font-bold tracking-tight sm:text-5xl"
      >
        Everything you need to dominate social advertising
      </motion.h2>
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-small opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <SectionHeader />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
