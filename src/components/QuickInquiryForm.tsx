'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quickInquirySchema, type QuickInquirySchemaType } from '@/lib/sanitize';

export interface QuickInquiryFormProps {
  placement?: 'header' | 'sidebar' | 'footer' | 'floating';
  endpoint?: string;
}

const placementClasses: Record<NonNullable<QuickInquiryFormProps['placement']>, string> = {
  header: 'w-full max-w-xl mx-auto',
  sidebar: 'w-full max-w-sm',
  footer: 'w-full max-w-xl mx-auto',
  floating: 'fixed bottom-6 right-6 z-50 w-80 glass-card rounded-2xl p-5',
};

export function QuickInquiryForm({
  placement = 'footer',
  endpoint = '/api/contact',
}: QuickInquiryFormProps) {
  const [csrfToken, setCsrfToken] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickInquirySchemaType>({
    resolver: zodResolver(quickInquirySchema),
    defaultValues: { email: '', inquiry: '' },
  });

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch('/api/csrf');
        const data = await res.json();
        setCsrfToken(data.csrfToken ?? '');
      } catch { /* silently fail */ }
    }
    fetchToken();
  }, []);

  async function onSubmit(data: QuickInquirySchemaType) {
    setSubmitStatus('idle');
    setSubmitMessage('');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'quick_inquiry', csrfToken }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message ?? "Inquiry sent! We'll be in touch.");
        reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(typeof result.error === 'string' ? result.error : 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    }
  }

  const isFloating = placement === 'floating';

  if (isFloating && isMinimized) {
    return (
      <motion.button
        type="button"
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-glow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
        aria-label="Open quick inquiry form"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.section
        aria-label="Quick inquiry form"
        className={placementClasses[placement]}
        initial={isFloating ? { opacity: 0, y: 20, scale: 0.95 } : undefined}
        animate={isFloating ? { opacity: 1, y: 0, scale: 1 } : undefined}
        exit={isFloating ? { opacity: 0, y: 20, scale: 0.95 } : undefined}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {isFloating && (
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#e5e5e5]">Quick Inquiry</span>
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[#555] transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Minimize inquiry form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {submitStatus === 'success' && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 flex items-center gap-2 rounded-lg border border-success/20 bg-success/5 px-3 py-2 text-[12px] font-medium text-success"
          >
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {submitMessage}
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 rounded-lg border border-error/20 bg-error/5 px-3 py-2 text-[12px] font-medium text-error"
          >
            {submitMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
          <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
            <label htmlFor="qi-honeypot">Do not fill this field</label>
            <input id="qi-honeypot" type="text" tabIndex={-1} autoComplete="off" name="honeypot" />
          </div>

          <div>
            <label htmlFor="qi-email" className="mb-1.5 block text-[12px] font-medium text-[#888]">
              Email <span className="text-accent-400/70" aria-hidden="true">*</span>
            </label>
            <input
              id="qi-email" type="email" autoComplete="email" aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'qi-email-error' : undefined}
              className="input-nextgen" placeholder="you@company.com"
              {...register('email')}
            />
            {errors.email && <p id="qi-email-error" role="alert" className="mt-1 text-[11px] text-error">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="qi-inquiry" className="mb-1.5 block text-[12px] font-medium text-[#888]">
              Message <span className="text-accent-400/70" aria-hidden="true">*</span>
            </label>
            <textarea
              id="qi-inquiry" rows={isFloating ? 3 : 4} aria-required="true"
              aria-invalid={!!errors.inquiry}
              aria-describedby={errors.inquiry ? 'qi-inquiry-error' : undefined}
              className="input-nextgen resize-y" placeholder="Your question"
              {...register('inquiry')}
            />
            {errors.inquiry && <p id="qi-inquiry-error" role="alert" className="mt-1 text-[11px] text-error">{errors.inquiry.message}</p>}
          </div>

          <motion.button
            type="submit" disabled={isSubmitting}
            className="btn-primary btn-beam w-full rounded-xl px-4 py-2.5 text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 disabled:cursor-not-allowed disabled:opacity-50"
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending…
              </span>
            ) : 'Send Inquiry'}
          </motion.button>
        </form>
      </motion.section>
    </AnimatePresence>
  );
}
