'use client';

import { motion } from 'framer-motion';
import type { Feature } from '@/types';
import { AnimatedSection } from '@/components/AnimatedSection';

const defaultFeatures: Feature[] = [
  { id: 'ai-optimization', icon: '🤖', title: 'AI-Powered Optimization', description: 'Leverage machine learning to automatically optimize your ad spend, targeting, and creatives for maximum ROI across every platform.', animationDelay: 0 },
  { id: 'multi-platform', icon: '🌐', title: 'Multi-Platform Support', description: 'Manage campaigns on Google, Meta, LinkedIn, and TikTok from a single dashboard — no more switching between ad managers.', animationDelay: 80 },
  { id: 'budget-allocation', icon: '💰', title: 'Smart Budget Allocation', description: 'AI analyzes performance data to distribute your budget across platforms where it delivers the highest returns.', animationDelay: 160 },
  { id: 'audience-targeting', icon: '🎯', title: 'Precision Audience Targeting', description: 'Reach the right people with AI-driven audience suggestions based on demographics, interests, and behavioral signals.', animationDelay: 240 },
  { id: 'creative-generation', icon: '✨', title: 'Creative Generation', description: 'Generate ad copy and creative variations tailored to each platform, so your message resonates everywhere it appears.', animationDelay: 320 },
  { id: 'analytics-dashboard', icon: '📊', title: 'Real-Time Analytics', description: 'Track impressions, clicks, conversions, and ROAS in real time with a unified analytics dashboard across all channels.', animationDelay: 400 },
];

export interface FeaturesProps {
  features?: Feature[];
}

export function Features({ features = defaultFeatures }: FeaturesProps) {
  return (
    <section
      id="features"
      className="relative bg-black py-28 sm:py-36"
      aria-label="Features"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6">
        <AnimatedSection
          animation={{ type: 'slideUp', duration: 700, delay: 0, triggerOnScroll: true, threshold: 0.1 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-400/80">
            Features
          </p>
          <h2 className="text-gradient-section text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.025em]">
            Everything you need to win at ads
          </h2>
          <p className="mt-5 text-[15px] text-[#666] leading-[1.75]">
            One platform, every channel. Let AI handle the heavy lifting while you focus on growing your business.
          </p>
        </AnimatedSection>

        <div className="mt-20 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <AnimatedSection
      animation={{
        type: 'slideUp',
        duration: 500,
        delay: feature.animationDelay,
        triggerOnScroll: true,
        threshold: 0.1,
      }}
    >
      <motion.div
        className="card-feature group rounded-2xl p-7"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-lg ring-1 ring-white/[0.06] transition-all duration-300 group-hover:bg-accent-500/10 group-hover:ring-accent-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          aria-hidden="true"
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ duration: 0.2 }}
        >
          {feature.icon}
        </motion.div>
        <h3 className="mt-5 text-[15px] font-semibold text-[#e5e5e5]">
          {feature.title}
        </h3>
        <p className="mt-2.5 text-[13px] text-[#666] leading-[1.7]">
          {feature.description}
        </p>
      </motion.div>
    </AnimatedSection>
  );
}
