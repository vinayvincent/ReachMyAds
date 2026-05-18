'use client';

import { motion } from 'framer-motion';

const platforms = [
  { name: 'Google Ads', icon: '/images/google-ads.png' },
  { name: 'Meta', icon: '/images/meta.png' },
  { name: 'TikTok', icon: '/images/tiktok.png' },
  { name: 'LinkedIn', icon: '/images/linkedin.png' },
  { name: 'Snapchat', icon: '/images/snapchat.png' },
  { name: 'X / Twitter', icon: '/images/x.png' },
];

export function TrustedBy() {
  return (
    <section className="py-12 bg-transparent border-y border-slate-200/50 dark:border-slate-800/50">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-center text-[13px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-10">
          Scale your reach across every major network
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 group cursor-default"
              suppressHydrationWarning
            >
              <span className="text-xl font-bold tracking-tight text-slate-700 dark:text-slate-200 group-hover:text-accent-600 transition-colors drop-shadow-sm">
                {platform.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
