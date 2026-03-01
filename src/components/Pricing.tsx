'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { PricingPlan } from '@/types';
import { AnimatedSection } from '@/components/AnimatedSection';

const defaultPlans: PricingPlan[] = [
  { id: 'starter', name: 'Starter', price: 49, currency: 'USD', billingPeriod: 'monthly', features: ['1 ad platform', 'Up to 5 campaigns', 'Basic AI recommendations', 'Email support', 'Standard analytics'], ctaText: 'Get Started', ctaLink: '#contact' },
  { id: 'professional', name: 'Professional', price: 149, currency: 'USD', billingPeriod: 'monthly', isPopular: true, features: ['All 4 ad platforms', 'Unlimited campaigns', 'Advanced AI optimization', 'Priority support', 'Real-time analytics', 'Creative generation'], ctaText: 'Get Started', ctaLink: '#contact' },
  { id: 'enterprise', name: 'Enterprise', price: 399, currency: 'USD', billingPeriod: 'monthly', features: ['All 4 ad platforms', 'Unlimited campaigns', 'Full AI suite', 'Dedicated account manager', 'Custom integrations', 'Advanced reporting', 'SLA guarantee'], ctaText: 'Contact Us', ctaLink: '#contact' },
];

export interface PricingProps {
  plans?: PricingPlan[];
}

export function Pricing({ plans = defaultPlans }: PricingProps) {
  return (
    <section id="pricing" className="relative bg-black py-28 sm:py-36" aria-label="Pricing">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6">
        <AnimatedSection
          animation={{ type: 'slideUp', duration: 700, delay: 0, triggerOnScroll: true, threshold: 0.1 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-400/80">
            Pricing
          </p>
          <h2 className="text-gradient-section text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.025em]">
            Simple, transparent pricing
          </h2>
          <p className="mt-5 text-[15px] text-[#666] leading-[1.75]">
            Choose the plan that fits your business. Upgrade or downgrade anytime.
          </p>
        </AnimatedSection>

        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} delay={index * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, delay }: { plan: PricingPlan; delay: number }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: plan.currency, minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(plan.price);

  return (
    <AnimatedSection
      animation={{ type: 'slideUp', duration: 500, delay, triggerOnScroll: true, threshold: 0.1 }}
    >
      <motion.div
        className={`relative flex flex-col rounded-2xl p-8 ${
          plan.isPopular ? 'popular-card lg:scale-[1.02]' : 'card-surface'
        }`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {plan.isPopular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-500 to-violet-500 px-4 py-1 text-[11px] font-semibold text-white shadow-glow">
            Most Popular
          </span>
        )}

        <div>
          <h3 className="text-[14px] font-semibold text-[#999]">{plan.name}</h3>
          <p className="mt-4">
            <span className={`metric-value text-[42px] font-bold ${plan.isPopular ? 'text-shimmer' : 'text-white'}`}>
              {formattedPrice}
            </span>
            <span className="text-[13px] text-[#444]">/{plan.billingPeriod === 'yearly' ? 'yr' : 'mo'}</span>
          </p>
        </div>

        <ul className="mt-8 flex-1 space-y-3" role="list">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-[13px] text-[#777]">
              <CheckIcon isPopular={plan.isPopular} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href={plan.ctaLink}
            className={`btn-beam block w-full rounded-xl px-6 py-3 text-center text-[13px] font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 ${
              plan.isPopular
                ? 'btn-primary focus-visible:outline-accent-400'
                : 'btn-secondary focus-visible:outline-white'
            }`}
          >
            {plan.ctaText}
          </Link>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

function CheckIcon({ isPopular }: { isPopular?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isPopular ? 'text-accent-400' : 'text-[#444]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
