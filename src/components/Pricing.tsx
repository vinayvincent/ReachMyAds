'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-transparent relative overflow-hidden">
      <div className="bg-spotlight absolute inset-0 opacity-50" aria-hidden="true" />
      
      <div className="mx-auto max-w-[1200px] px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-gradient-section text-4xl font-bold tracking-tight sm:text-6xl mb-8">
            The Future of <span className="text-gradient-blue">Ad Scalability</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary dark:text-slate-300 leading-relaxed mb-12">
            We're currently finalizing our next-generation pricing plans. Our institutional-grade AI optimization 
            and omnichannel synchronization engine will soon be accessible to ambitious brands through 
            specifically tailored tiers designed for hyper-scaling.
          </p>
          
          <div className="glass-panel p-10 lg:p-16 inline-block w-full max-w-4xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-8 rounded-full bg-accent-500/10 px-6 py-2 text-[12px] font-bold tracking-[0.2em] uppercase text-accent-600 ring-1 ring-accent-600/20 badge-glow">
                Under Development
              </div>
              
              <h3 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">Institutional-Grade Accessibility</h3>
              <p className="text-text-muted dark:text-slate-400 mb-12 max-w-xl mx-auto text-[16px] leading-relaxed">
                We are calibrating our final pricing tiers to ensure maximum value for brands of every scale. 
                Join the exclusive waitlist to secure grandfathered rates and early-access priority.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-12 text-left">
                {[
                  'Tiered Performance Insights',
                  'Custom Brand AI Models',
                  'Omnichannel Bulk Sync',
                  'Real-time ROAS Balancing',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-text-secondary dark:text-slate-300">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500/20 text-accent-600">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[14px] font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                <a 
                  href="#contact" 
                  className="btn-primary group h-14 px-12 rounded-2xl text-[15px] font-bold tracking-wide w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  Join the Waitlist
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
