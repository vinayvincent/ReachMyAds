'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Testimonial } from '@/types';
import { AnimatedSection } from '@/components/AnimatedSection';

const defaultTestimonials: Testimonial[] = [
  { id: 'testimonial-1', name: 'Sarah Chen', company: 'Luminary Digital', content: 'ReachMyAds completely transformed how we manage campaigns. The AI budget allocation alone saved us 30% on ad spend while boosting conversions across Google and Meta.' },
  { id: 'testimonial-2', name: 'Marcus Rivera', company: 'Apex Growth Co.', content: 'Managing four ad platforms used to eat up our entire week. Now our team handles everything from one dashboard in a fraction of the time. The AI recommendations are spot on.' },
  { id: 'testimonial-3', name: 'Priya Patel', company: 'NovaBrand Agency', content: 'The multi-platform creative generation is a game changer. We launch campaigns across TikTok, LinkedIn, and Meta simultaneously with tailored creatives for each channel.' },
  { id: 'testimonial-4', name: 'James Okafor', company: 'Trident Media Group', content: 'We saw a 2.5x improvement in ROAS within the first month. The real-time analytics and AI-driven audience targeting make it easy to double down on what works.' },
];

const AUTO_ROTATE_INTERVAL = 5000;

export interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = testimonials.length;

  const goToNext = useCallback(() => { setActiveIndex((p) => (p + 1) % count); }, [count]);
  const goToPrev = useCallback(() => { setActiveIndex((p) => (p - 1 + count) % count); }, [count]);
  const goToSlide = useCallback((i: number) => { setActiveIndex(i); }, []);

  useEffect(() => {
    if (isPaused || count <= 1) return;
    const t = setInterval(goToNext, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(t);
  }, [isPaused, goToNext, count]);

  if (count === 0) return null;
  const current = testimonials[activeIndex]!;

  return (
    <section id="testimonials" className="relative bg-black py-28 sm:py-36" aria-label="Testimonials">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      <div className="bg-spotlight-bottom absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <AnimatedSection
          animation={{ type: 'slideUp', duration: 700, delay: 0, triggerOnScroll: true, threshold: 0.1 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-400/80">
            Testimonials
          </p>
          <h2 className="text-gradient-section text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.025em]">
            What our clients say
          </h2>
          <p className="mt-5 text-[15px] text-[#666] leading-[1.75]">
            Trusted by agencies and businesses to deliver results across every ad platform.
          </p>
        </AnimatedSection>

        <div
          className="relative mx-auto mt-16 max-w-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          {/* Arrows */}
          <button type="button" onClick={goToPrev} className="absolute left-0 top-1/2 z-10 -translate-x-2 -translate-y-1/2 rounded-full border border-white/[0.06] bg-black/80 p-2.5 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:-translate-x-14" aria-label="Previous testimonial">
            <ChevronLeftIcon />
          </button>
          <button type="button" onClick={goToNext} className="absolute right-0 top-1/2 z-10 translate-x-2 -translate-y-1/2 rounded-full border border-white/[0.06] bg-black/80 p-2.5 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:translate-x-14" aria-label="Next testimonial">
            <ChevronRightIcon />
          </button>

          {/* Card */}
          <div className="card-surface rounded-2xl p-8 sm:p-14" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
                aria-label={`Testimonial from ${current.name}`}
              >
                {/* Star rating */}
                <div className="mx-auto mb-6 flex items-center justify-center gap-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[15px] leading-[1.8] text-[#aaa] sm:text-[16px]">
                  &ldquo;{current.content}&rdquo;
                </p>

                <footer className="mt-8">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04] text-[13px] font-semibold text-accent-400 ring-1 ring-white/[0.06]" aria-hidden="true">
                    {current.avatar ? (
                      <img src={current.avatar} alt="" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      getInitials(current.name)
                    )}
                  </div>
                  <cite className="not-italic">
                    <span className="block text-[14px] font-semibold text-[#e5e5e5]">{current.name}</span>
                    <span className="block text-[12px] text-[#555]">{current.company}</span>
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Dots + counter */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="text-[11px] font-medium tabular-nums text-[#444]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((t, i) => (
                <button
                  key={t.id} type="button" role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goToSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-accent-500' : 'w-1.5 bg-[#222] hover:bg-[#444]'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium tabular-nums text-[#444]">
              {String(count).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function getInitials(name: string): string {
  return name.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
