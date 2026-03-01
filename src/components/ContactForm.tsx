'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactFormSchema, type ContactFormSchemaType } from '@/lib/sanitize';

export interface ContactFormProps {
  endpoint?: string;
}

export function ContactForm({ endpoint = '/api/contact' }: ContactFormProps) {
  const [csrfToken, setCsrfToken] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', company: '', phone: '', message: '', honeypot: '' },
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

  async function onSubmit(data: ContactFormSchemaType) {
    setSubmitStatus('idle');
    setSubmitMessage('');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, csrfToken }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message ?? "Message sent! We'll get back to you soon.");
        reset();
      } else if (res.status === 400 && typeof result.error === 'object') {
        for (const [field, msg] of Object.entries(result.error as Record<string, string>)) {
          setError(field as keyof ContactFormSchemaType, { message: msg });
        }
      } else {
        setSubmitStatus('error');
        setSubmitMessage(typeof result.error === 'string' ? result.error : 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    }
  }

  return (
    <section aria-label="Contact form" className="mx-auto w-full max-w-2xl">
      <AnimatePresence mode="wait">
        {submitStatus === 'success' && (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-6 flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-[13px] font-medium text-success"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {submitMessage}
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            key="error"
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-6 flex items-center gap-3 rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-[13px] font-medium text-error"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {submitMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Honeypot */}
        <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
          <label htmlFor="contact-honeypot">Do not fill this field</label>
          <input id="contact-honeypot" type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-[13px] font-medium text-[#888]">
              Name <span className="text-accent-400/70" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name" type="text" autoComplete="name" aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className="input-nextgen" placeholder="Your name"
              {...register('name')}
            />
            {errors.name && <p id="contact-name-error" role="alert" className="mt-1.5 text-[12px] text-error">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-[13px] font-medium text-[#888]">
              Email <span className="text-accent-400/70" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email" type="email" autoComplete="email" aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className="input-nextgen" placeholder="you@company.com"
              {...register('email')}
            />
            {errors.email && <p id="contact-email-error" role="alert" className="mt-1.5 text-[12px] text-error">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-company" className="mb-2 block text-[13px] font-medium text-[#888]">Company</label>
            <input
              id="contact-company" type="text" autoComplete="organization"
              aria-describedby={errors.company ? 'contact-company-error' : undefined}
              className="input-nextgen" placeholder="Your company"
              {...register('company')}
            />
            {errors.company && <p id="contact-company-error" role="alert" className="mt-1.5 text-[12px] text-error">{errors.company.message}</p>}
          </div>
          <div>
            <label htmlFor="contact-phone" className="mb-2 block text-[13px] font-medium text-[#888]">Phone</label>
            <input
              id="contact-phone" type="tel" autoComplete="tel"
              aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
              className="input-nextgen" placeholder="+1 (555) 000-0000"
              {...register('phone')}
            />
            {errors.phone && <p id="contact-phone-error" role="alert" className="mt-1.5 text-[12px] text-error">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-[13px] font-medium text-[#888]">
            Message <span className="text-accent-400/70" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message" rows={4} aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className="input-nextgen resize-y"
            placeholder="How can we help you?"
            {...register('message')}
          />
          {errors.message && <p id="contact-message-error" role="alert" className="mt-1.5 text-[12px] text-error">{errors.message.message}</p>}
        </div>

        <motion.button
          type="submit" disabled={isSubmitting}
          className="btn-primary btn-beam w-full rounded-xl px-6 py-3.5 text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 disabled:cursor-not-allowed disabled:opacity-50"
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending…
            </span>
          ) : 'Send Message'}
        </motion.button>
      </form>
    </section>
  );
}
