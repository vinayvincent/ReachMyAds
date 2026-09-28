'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TextReveal } from './motion/TextReveal';
import { Reveal } from './motion/Reveal';
import { BrandLogo } from './BrandLogo';
import type { BrandKey } from '@/lib/brand-logos';

const EASE = [0.16, 1, 0.3, 1] as const;

interface Step {
  n: string;
  title: string;
  body: string;
  aside: string;
}

const steps: Step[] = [
  {
    n: '01',
    title: 'Tell us what you sell',
    body: 'A link to your website, or just your shop name on Google Maps. Send it from the form here, or message it to us on WhatsApp and never open a login at all. That is genuinely all we need to start.',
    aside: 'Takes about two minutes.',
  },
  {
    n: '02',
    title: 'We build and run the ads',
    body: 'We research your market, write the ads, design them, pick who sees them and set a sensible budget. Each one is scored on whether it fits your goal before anybody can publish it. Then it goes live on Google, Meta and LinkedIn at once.',
    aside: 'Usually live within a day.',
  },
  {
    n: '03',
    title: 'Enquiries land in one inbox',
    body: 'Phone calls, WhatsApp messages and website forms, all in one place. Each one is labelled with the ad that brought it in, and moved along as you contact them. Anyone still waiting for a reply, we flag.',
    aside: 'Nothing falls through.',
  },
  {
    n: '04',
    title: 'You see what actually worked',
    body: 'Which ads brought you real customers, and what each one cost. Every change we suggest comes with the reason and what we expect it to do. You say yes, or let it run on its own.',
    aside: 'Reviewed every week.',
  },
];

/* ── Per-step visuals ────────────────────────────────────────── */

function PanelChrome({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mock-window">
      <div className="mock-bar flex items-center gap-2 px-3.5 py-2.5">
        <span className="mono-label-muted">{label}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function StepOne() {
  return (
    <PanelChrome label="Step 01 · Your business">
      <div className="space-y-3">
        <div>
          <p className="mono-label-muted text-[9.5px]">Website or Maps listing</p>
          <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-brand-line bg-surface-2 px-3 py-2.5">
            <svg className="h-3.5 w-3.5 shrink-0 text-ink-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 11-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" />
            </svg>
            <span className="font-mono text-[12px] text-ink">g.page/anand-textiles-thrissur</span>
            <span className="caret ml-auto" aria-hidden="true" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { k: 'Trade', v: 'Clothing' },
            { k: 'Area', v: 'Thrissur, 12 km' },
            { k: 'Busiest', v: 'Onam · Wedding' },
            { k: 'A sale is', v: 'A bill at the counter' },
          ].map((row) => (
            <div key={row.k} className="rounded-lg border border-line bg-surface-2 px-2.5 py-2">
              <p className="mono-label-muted text-[9px]">{row.k}</p>
              <p className="mt-0.5 text-[12.5px] font-semibold text-ink">{row.v}</p>
            </div>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-[11.5px] text-ink-3">
          <svg className="h-3.5 w-3.5 text-[color:var(--won)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          We filled the rest in from your listing.
        </p>
      </div>
    </PanelChrome>
  );
}

const adDrafts: { brand: BrandKey; name: string; copy: string }[] = [
  { brand: 'instagram', name: 'Instagram · Reels', copy: 'Onam collection just landed. Silk sarees from ₹2,400.' },
  { brand: 'google', name: 'Google · Search', copy: 'Silk Sarees in Thrissur | Open Today Till 9pm' },
  { brand: 'whatsapp', name: 'WhatsApp · Click to chat', copy: 'Message us for size and price before you visit.' },
];

function StepTwo() {
  const reduced = useReducedMotion();
  return (
    <PanelChrome label="Step 02 · Ads we wrote for you">
      <div className="space-y-2">
        {adDrafts.map((ad, i) => (
          <motion.div
            key={ad.name}
            initial={reduced ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.14, ease: EASE }}
            className="flex items-start gap-2.5 rounded-lg border border-line bg-surface-2 p-2.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-canvas">
              <BrandLogo brand={ad.brand} className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="mono-label-muted block text-[9px]">{ad.name}</span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-ink">{ad.copy}</span>
            </span>
            <span className="shrink-0 rounded-full bg-[color:var(--won-soft)] px-2 py-0.5 text-[9.5px] font-bold text-[color:var(--won)]">
              Live
            </span>
          </motion.div>
        ))}
        <p className="pt-1 text-[11.5px] text-ink-3">
          …and one for every other placement. Nothing goes live until it passes the check.
        </p>
      </div>
    </PanelChrome>
  );
}

const inboxRows = [
  { name: 'New customer', via: 'WhatsApp · Reels ad', tone: 'new' as const, time: '2 min' },
  { name: 'Missed call', via: 'Phone · Search ad', tone: 'waiting' as const, time: '2 hrs' },
  { name: 'New customer', via: 'Web form · Feed ad', tone: 'new' as const, time: '4 hrs' },
];

const inboxTone = {
  new: 'bg-brand text-white',
  waiting: 'bg-[color:var(--waiting-soft)] text-[color:var(--waiting)]',
};

function StepThree() {
  const reduced = useReducedMotion();
  return (
    <PanelChrome label="Step 03 · One inbox">
      <div className="space-y-2">
        {inboxRows.map((row, i) => (
          <motion.div
            key={row.via}
            initial={reduced ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.13, ease: EASE }}
            className="flex items-center gap-2.5 rounded-lg border border-line bg-surface-2 px-2.5 py-2"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[11px] font-bold text-brand-ink">
              {row.name.charAt(0)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-semibold text-ink">{row.name}</span>
              <span className="block truncate text-[10.5px] text-ink-3">{row.via}</span>
            </span>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold ${inboxTone[row.tone]}`}>
              {row.tone === 'new' ? 'New' : `Waiting ${row.time}`}
            </span>
          </motion.div>
        ))}
        <div className="flex items-start gap-2 rounded-lg border border-brand-line bg-brand-soft px-2.5 py-2">
          <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          <p className="text-[11.5px] leading-snug text-ink-2">
            A call went unanswered. <span className="font-semibold text-ink">Ring them back?</span>
          </p>
        </div>
      </div>
    </PanelChrome>
  );
}

const resultBars = [
  { label: 'Instagram Reels', pct: 94, cost: '₹198', tone: 'good' as const },
  { label: 'Google Search', pct: 61, cost: '₹441', tone: 'ok' as const },
  { label: 'Facebook Feed', pct: 44, cost: '₹512', tone: 'ok' as const },
  { label: 'LinkedIn', pct: 11, cost: '₹4,200', tone: 'bad' as const },
];

function StepFour() {
  const reduced = useReducedMotion();
  return (
    <PanelChrome label="Step 04 · Cost per customer">
      <div className="space-y-3">
        {resultBars.map((bar, i) => (
          <div key={bar.label}>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[12px] text-ink-2">{bar.label}</span>
              <span className="metric-value text-[12px] font-semibold text-ink">{bar.cost}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    bar.tone === 'good'
                      ? 'var(--brand)'
                      : bar.tone === 'bad'
                        ? 'var(--ink-3)'
                        : 'color-mix(in srgb, var(--brand) 42%, transparent)',
                }}
                initial={reduced ? false : { width: 0 }}
                animate={{ width: `${bar.pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              />
            </div>
          </div>
        ))}
        <p className="border-t border-line pt-3 text-[11.5px] leading-snug text-ink-2">
          <span className="font-semibold text-ink">We moved LinkedIn&apos;s budget to Reels.</span>{' '}
          Same spend, roughly three times the enquiries.
        </p>
      </div>
    </PanelChrome>
  );
}

const panels = [StepOne, StepTwo, StepThree, StepFour];

/* ── Section ─────────────────────────────────────────────────── */

function StepBlock({
  step,
  index,
  onEnter,
  isActive,
}: {
  step: Step;
  index: number;
  onEnter: (i: number) => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // The narrow band keeps exactly one step active as the page moves.
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  const Panel = panels[index]!;

  return (
    <li ref={ref} className="lg:flex lg:min-h-[54vh] lg:items-center lg:py-8">
      <div className="flex gap-5">
        {/* Rail */}
        <div className="hidden shrink-0 flex-col items-center lg:flex">
          <span
            className={`metric-value flex h-10 w-10 items-center justify-center rounded-full border text-[13px] font-semibold transition-all duration-500 ${
              isActive
                ? 'border-brand bg-brand text-white shadow-[var(--shadow-brand)]'
                : 'border-line bg-surface text-ink-3'
            }`}
          >
            {step.n}
          </span>
          {index < steps.length - 1 && (
            <span className="mt-2 w-px flex-1 bg-line" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <span className="metric-value mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-line bg-brand-soft text-[12px] font-semibold text-brand-ink lg:hidden">
            {step.n}
          </span>

          <h3
            className={`h-display text-[clamp(1.4rem,2.8vw,1.85rem)] transition-colors duration-500 ${
              isActive ? 'text-ink' : 'text-ink lg:text-ink-3'
            }`}
          >
            {step.title}
          </h3>
          <p className="mt-3 max-w-[34rem] text-[15.5px] leading-relaxed text-ink-2">{step.body}</p>
          <p className="mono-label-muted mt-4">{step.aside}</p>

          {/* Inline panel on small screens, where nothing can be sticky */}
          <div className="mt-6 lg:hidden">
            <Panel />
          </div>
        </div>
      </div>
    </li>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const ActivePanel = panels[active]!;

  return (
    <section
      id="how-it-works"
      className="relative border-y border-line bg-canvas section"
      aria-labelledby="how-heading"
    >
      <div className="relative mx-auto max-w-[1180px] px-6">
        <Reveal className="mb-12 max-w-xl">
          <p className="mono-label">How it works</p>
          <TextReveal
            as="h2"
            id="how-heading"
            text="Four steps. That is the whole thing."
            accentWords={['Four']}
            className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
          />
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
            No onboarding call. No slide deck. No three-week wait. Send us a link and we get to
            work the same day.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <ol className="space-y-10 lg:space-y-0">
            {steps.map((step, i) => (
              <StepBlock
                key={step.n}
                step={step}
                index={i}
                isActive={active === i}
                onEnter={setActive}
              />
            ))}
          </ol>

          {/* Sticky companion panel — desktop only */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[19vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.985 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative"
                >
                  <ActivePanel />
                </motion.div>
              </AnimatePresence>

              <div className="relative mt-4 flex justify-center gap-1.5">
                {steps.map((step, i) => (
                  <span
                    key={step.n}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      active === i ? 'w-7 bg-brand' : 'w-3 bg-line-strong'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
