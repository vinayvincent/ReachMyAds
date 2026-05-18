'use client';

import { motion } from 'framer-motion';

const comparisons = [
  { feature: 'Multi-platform management', standard: 'Manual syncing', reach: 'Unified Dashboard' },
  { feature: 'Creative Generation', standard: 'External agencies', reach: 'Built-in AI Creator' },
  { feature: 'Budget Optimization', standard: 'Weekly manual checks', reach: 'Real-time AI Scaling' },
  { feature: 'Data Analytics', standard: 'Platform silos', reach: 'Cross-channel Insights' },
  { feature: 'Reporting', standard: 'Spreadsheets', reach: 'Live Automated Reports' },
];

function ComparisonRow({ item, index }: { item: typeof comparisons[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
      className="grid grid-cols-3 items-stretch group hover:bg-white dark:hover:bg-slate-900 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 rounded-2xl relative z-10 transition-all duration-300 ease-out border border-transparent hover:border-slate-100 dark:hover:border-slate-800 bg-transparent"
      suppressHydrationWarning
    >
      <div className="p-6 text-[15px] font-bold text-slate-800 dark:text-slate-100">{item.feature}</div>
      <div className="p-6 text-[15px] text-slate-500 dark:text-slate-400">{item.standard}</div>
      <div className="p-6 text-[16px] font-bold text-accent-700 dark:text-accent-400 bg-accent-50/80 dark:bg-accent-500/10 border-l border-accent-100/50 dark:border-accent-500/20 flex items-center gap-2">
        <svg className="h-5 w-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {item.reach}
      </div>
    </motion.div>
  );
}

export function ComparisonTable() {
  return (
    <section className="relative py-24 sm:py-32 bg-transparent border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-transparent" />
      <div className="mx-auto max-w-[1000px] px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400">Reach My Ads?</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            See how our AI-powered approach compares to traditional ad management.
          </p>
        </div>

        <div className="relative overflow-visible rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 p-2 sm:p-4">
          <div className="grid grid-cols-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 rounded-t-2xl">
            <div className="p-6 text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Feature</div>
            <div className="p-6 text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Standard Ads</div>
            <div className="p-6 text-[14px] font-black text-accent-700 dark:text-accent-400 uppercase tracking-widest bg-accent-50/50 dark:bg-accent-500/10 border-l border-accent-100/50 dark:border-accent-500/20 rounded-tr-2xl">Reach My Ads</div>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            {comparisons.map((item, index) => (
              <ComparisonRow key={item.feature} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
