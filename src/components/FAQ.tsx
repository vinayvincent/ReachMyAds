'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How does the AI ad generation work?',
    answer: 'Our AI analyzes your product URL or description and uses trained models for each specific platform to generate copy and visual concepts that are proven to perform on that network.',
  },
  {
    question: 'Does ReachMyAds handle the actual billing for the ad platforms?',
    answer: 'No, we connect to your existing ad accounts where your billing info is already stored. ReachMyAds only orchestrates the campaigns and provides the interface for management and optimization.',
  },
  {
    question: 'How does the AI creative cloning work?',
    answer: 'You can input any URL from the Meta Ad Library or your own top performers, and our AI analyzes the visual elements, copy structure, and hook frequency to generate high-performing variations tailored to your specific brand DNA.',
  },
  {
    question: 'Which platforms do you support?',
    answer: 'Currently, we support Google Ads, Meta (Facebook & Instagram), TikTok, LinkedIn, Snapchat, and X (formerly Twitter). We are constantly adding new networks.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use enterprise-grade encryption and official OAuth 2.0 protocols for all platform connections to ensure your data and ad accounts are always safe. We never store your passwords.',
  },
  {
    question: 'Is there a limit to the number of campaigns I can launch?',
    answer: 'Every plan comes with generous limits, and our enterprise-tier plans support unlimited campaigns and horizontal scaling across hundreds of accounts simultaneously.',
  },
  {
    question: 'How secure is my connection to Meta and Google APIs?',
    answer: 'We use official API integrations and never store your sensitive login credentials. Your security is our priority, which is why we use rotating API tokens and institutional-grade encryption.',
  },
  {
    question: 'Can I use Reach My Ads with my existing agencies?',
    answer: 'Absolutely. Many of our users are agencies themselves, or brands who want to give their internal teams and external partners a unified tool for better collaboration and transparency.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes, all our plans come with a 14-day free trial so you can experience the power of AI-driven advertising risk-free.',
  },
  {
    question: 'Can I export my performance data for external reports?',
    answer: 'Yes, we support full data exports in CSV and XLSX formats, and our Pro plans include automated PDF reporting for stakeholders.',
  },
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/[0.05]">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left group"
      >
        <span className={`text-[17px] font-medium transition-colors ${isOpen ? 'text-accent-400' : 'text-white group-hover:text-accent-400/80'}`}>
          {question}
        </span>
        <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <svg className="h-6 w-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[15px] leading-relaxed text-text-secondary dark:text-slate-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32 bg-black">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary dark:text-slate-300">
            Everything you need to know about Reach My Ads.
          </p>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
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
