'use client';

import { motion } from 'framer-motion';
import { Reveal } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';

const agency = [
  'A monthly retainer before a single ad runs',
  'Weeks of emails and meetings to launch',
  'One platform at a time, set up by hand',
  'A report once a month you cannot check',
  'Enquiries land wherever they land',
  'They own the account and the data',
];

const ours = [
  'Pay as you go. No retainer, nothing to sign',
  'Live in a day, from one link or a WhatsApp message',
  'Google, Meta and LinkedIn from one form',
  'Ask a question any time, in plain English',
  'Every enquiry in one list, and chased up',
  'It stays your account, and your data',
];

export function NoAgency() {
  return (
    <section id="no-agency" className="relative bg-canvas section" aria-labelledby="no-agency-heading">
      <div className="relative mx-auto max-w-[1040px] px-6">
        <Reveal className="mb-11 max-w-xl">
          <p className="mono-label">No agency required</p>
          <TextReveal
            as="h2"
            id="no-agency-heading"
            text="You do not need to hire anyone"
            accentWords={['anyone']}
            className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
          />
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
            We do the work an agency would do. You keep the account, the data, and the money you
            would have paid them every month.
          </p>
        </Reveal>

        <div className="grid items-center gap-5 md:grid-cols-[1fr_1.15fr]">
          {/* The old way — deliberately quieter */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-line bg-canvas p-7"
          >
            <p className="mono-label-muted">The usual way</p>
            <h3 className="h-display mt-2.5 text-[19px] text-ink-2">Hiring an agency</h3>

            <ul className="mt-6 space-y-3.5">
              {agency.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg className="mt-[3px] h-4 w-4 shrink-0 text-ink-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                  <span className="text-[14.5px] leading-relaxed text-ink-3">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ours — the one that should win the eye */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="card-feature-hero relative p-7 sm:p-8"
          >
            <span className="pill absolute -top-3 left-7">Recommended</span>

            <p className="mono-label">A better way</p>
            <h3 className="h-display mt-2.5 text-[22px] text-ink">Reach My Ads</h3>

            <ul className="mt-6 space-y-3.5">
              {ours.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + index * 0.07 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[15px] font-medium leading-relaxed text-ink">{item}</span>
                </motion.li>
              ))}
            </ul>

            <a
              href="#lead-form"
              className="btn-primary mt-7 inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-[15px]"
            >
              Get started
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
