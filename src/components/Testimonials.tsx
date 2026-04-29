'use client';

import { motion } from 'framer-motion';
import type { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Chen',
    company: 'Director of Growth, Velocity Media',
    content: 'ReachMyAds didn\'t just automate our campaigns; it redefined our entire creative workflow. We\'ve seen a 42% increase in ROAS since switching from manual management.',
    avatar: '/images/avatars/avatar-1.png',
  },
  {
    id: 'test-2',
    name: 'Marcus Thorne',
    company: 'Founder, Thorne Digital',
    content: 'The cross-platform synchronization is institutional-grade. Managing Meta, Google, and TikTok from one dashboard used to be a dream; now it\'s our daily competitive advantage.',
    avatar: '/images/avatars/avatar-2.png',
  },
  {
    id: 'test-3',
    name: 'Elena Rodriguez',
    company: 'Head of E-commerce, Lumina Essentials',
    content: 'The AI Creative Hub is a game-changer. We can now test 10x more iterations than we could with our previous agency, and the results speak for themselves.',
    avatar: '/images/avatars/avatar-3.png',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 bg-dots opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gradient-section text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Trusted by the world's most <span className="text-gradient-blue">ambitious</span> teams
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-text-secondary"
          >
            Join 500+ agencies and brands that have scaled their advertising ROI with ReachMyAds.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 relative group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center overflow-hidden">
                  {testimonial.avatar ? (
                    <div className="text-accent-400 font-bold text-xl">{testimonial.name[0]}</div>
                  ) : (
                    <div className="text-white/20 font-bold text-xl">{testimonial.name[0]}</div>
                  )}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-white mb-0.5">{testimonial.name}</h3>
                  <p className="text-[13px] text-text-muted">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-text-secondary relative z-10 italic">
                "{testimonial.content}"
              </p>
              
              <div className="absolute top-8 right-8 text-accent-500/10 group-hover:text-accent-500/20 transition-colors pointer-events-none">
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
