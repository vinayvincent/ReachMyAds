'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Connect Accounts',
    description: 'Securely link your Google, Meta, and TikTok ad accounts in seconds.',
  },
  {
    step: '02',
    title: 'Launch Campaigns',
    description: 'Use our AI Creative Hub to build and deploy high-converting ads across all channels.',
  },
  {
    step: '03',
    title: 'Scale Automatically',
    description: 'Our AI optimizes your spend in real-time to focus on what actually drives sales.',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <>
      <div className="mb-8 text-[80px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-accent-400 to-accent-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 select-none drop-shadow-sm">
        {step.step}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-accent-600 transition-colors">
        {step.title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {step.description}
      </p>
      
      {/* Connector line for desktop */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-[28px] left-[calc(100%+32px)] w-[calc(100%-64px)] h-px bg-gradient-to-r from-accent-500/20 via-accent-500/10 to-transparent" />
      )}
    </>
  );

  if (!mounted) {
    return (
      <div className="relative group">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="relative group"
    >
      {content}
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 bg-transparent border-y border-slate-200/50">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
              Three steps to <span className="text-gradient-blue">unstoppable</span> growth
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/10 to-transparent mb-6 mx-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
