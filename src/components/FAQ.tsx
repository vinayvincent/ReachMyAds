'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/lib/faq-data';
import { Reveal } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';


function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  id,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  id: string;
}) {
  return (
    <div className={`card overflow-hidden transition-colors ${isOpen ? 'border-brand-line' : ''}`}>
      <h3>
        <button
          type="button"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
        >
          <span className={`text-[16px] font-semibold transition-colors ${isOpen ? 'text-brand-ink' : 'text-ink'}`}>
            {question}
          </span>
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              isOpen ? 'rotate-45 border-brand bg-brand text-white' : 'border-line text-ink-3'
            }`}
            aria-hidden="true"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-[15px] leading-relaxed text-ink-2 sm:px-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-canvas section"
      aria-labelledby="faq-heading"
    >
      <div className="relative mx-auto grid max-w-[1180px] gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="mono-label">FAQ</p>
            <TextReveal
              as="h2"
              id="faq-heading"
              text="Common questions"
              accentWords={['questions']}
              className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
            />
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">
              Still not sure about something? Email{' '}
              <a href="mailto:team@reachmyads.com" className="font-semibold text-brand-ink link-underline">
                team@reachmyads.com
              </a>{' '}
              and one of us will reply. Not a support queue.
            </p>
          </div>
        </Reveal>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              id={`faq-${index}`}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
