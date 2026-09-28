'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Reveal } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';
import { SpotlightCard } from './SpotlightCard';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Small inline visuals, one per pillar ────────────────────── */

// `short` is given rather than truncated: slicing these to four characters
// turns WhatsApp into "WHAT" and LinkedIn into "LINK", which read as English
// words instead of brands.
const spread = [
  { label: 'Instagram', short: 'IG', pct: 94, spend: '₹12,400' },
  { label: 'Google', short: 'GOOGLE', pct: 71, spend: '₹9,100' },
  { label: 'WhatsApp', short: 'WA', pct: 58, spend: '₹4,800' },
  { label: 'Facebook', short: 'FB', pct: 44, spend: '₹3,600' },
  { label: 'YouTube', short: 'YT', pct: 31, spend: '₹2,200' },
  { label: 'LinkedIn', short: 'LI', pct: 22, spend: '₹1,400' },
];

function SpreadVisual() {
  const reduced = useReducedMotion();
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4" aria-hidden="true">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="mono-label-muted text-[9.5px]">Budget, this month</span>
        <span className="metric-value text-[11.5px] font-semibold text-ink">₹33,500</span>
      </div>

      {/* Columns, so the tall bento cell reads as a real chart. */}
      <div className="flex h-28 items-end gap-2">
        {spread.map((item, i) => (
          <div key={item.label} className="flex h-full flex-1 flex-col justify-end gap-1.5">
            <motion.span
              className="w-full rounded-t-sm"
              style={{
                background:
                  i === 0 ? 'var(--brand)' : `color-mix(in srgb, var(--brand) ${34 - i * 4}%, transparent)`,
              }}
              initial={reduced ? false : { height: 0 }}
              whileInView={{ height: `${item.pct}%` }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.75, delay: i * 0.07, ease: EASE }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex gap-2 border-t border-line pt-2.5">
        {spread.map((item) => (
          <span
            key={item.label}
            className="flex-1 truncate text-center font-mono text-[8.5px] uppercase tracking-[0.04em] text-ink-3"
          >
            {item.short}
          </span>
        ))}
      </div>
    </div>
  );
}

const inboxRows = [
  { who: 'From your Reels ad', ch: 'WhatsApp', tone: 'brand', status: 'New' },
  { who: 'From your Search ad', ch: 'Missed call', tone: 'waiting', status: '2 hrs' },
  { who: 'From your Feed ad', ch: 'Web form', tone: 'brand', status: 'New' },
  { who: 'From your Maps ad', ch: 'Call · 4 min', tone: 'won', status: 'Won' },
];

const inboxDot = {
  brand: 'var(--brand)',
  waiting: 'var(--waiting)',
  won: 'var(--won)',
} as const;

function InboxVisual() {
  const reduced = useReducedMotion();
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4" aria-hidden="true">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="mono-label-muted text-[9.5px]">Today</span>
        <span className="metric-value text-[11.5px] font-semibold text-ink">4 new</span>
      </div>

      <div className="space-y-1.5">
        {inboxRows.map((row, i) => (
          <motion.div
            key={row.who}
            initial={reduced ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.45, delay: i * 0.09, ease: EASE }}
            className="flex items-center gap-2.5 rounded-lg border border-line bg-surface px-2.5 py-2"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: inboxDot[row.tone as keyof typeof inboxDot] }}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-semibold text-ink">{row.who}</span>
              <span className="block truncate font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-3">
                {row.ch}
              </span>
            </span>
            <span className="metric-value shrink-0 text-[10px] font-semibold text-ink-3">
              {row.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AskVisual() {
  return (
    <div className="space-y-2 rounded-xl border border-line bg-surface-2 p-4" aria-hidden="true">
      <div className="ml-auto w-fit max-w-[88%] rounded-xl rounded-br-sm bg-brand px-3 py-2 text-[12.5px] text-white">
        Which ad is actually working?
      </div>
      <div className="w-fit max-w-[94%] rounded-xl rounded-tl-sm border border-line bg-surface px-3 py-2 text-[12.5px] leading-snug text-ink-2">
        Instagram: <span className="font-semibold text-ink">₹198 a lead</span>, less than half what
        Google costs you.
      </div>
      <div className="ml-auto w-fit max-w-[88%] rounded-xl rounded-br-sm bg-brand px-3 py-2 text-[12.5px] text-white">
        Move some budget across?
      </div>
    </div>
  );
}

/* ── Content ─────────────────────────────────────────────────── */

const pillars = [
  {
    n: '01',
    title: 'We write and run your ads',
    body: 'Tell us what you sell. Every ad goes through the same production line: research, strategy, copy, design, then a score it has to pass before it can go live. Once it is running, we tell you what to change and why, and move your money to whatever is working.',
    icon: 'M3 17l6-6 4 4 8-8M21 7h-5m5 0v5',
    link: { label: 'See the platforms', href: '#platforms' },
    visual: SpreadVisual,
    span: 'lg:col-span-7',
    wide: false,
    featured: false,
  },
  {
    n: '02',
    title: 'Every customer in one place',
    body: 'Phone calls, WhatsApp messages and website forms all land in one simple list, and move along it: contacted, worth chasing, bought. You record what they bought, and it stays joined to the ad that found them.',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    link: { label: 'See lead tracking', href: '#leads' },
    visual: InboxVisual,
    span: 'lg:col-span-5',
    wide: false,
    featured: true,
  },
  {
    n: '03',
    title: 'Ask us anything',
    body: 'Type a question the way you would ask a friend. Which ad brings the best customers, which product sells most, what a customer is worth. You get a straight answer, with no charts to work out.',
    icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    link: { label: 'See a real answer', href: '#ai' },
    visual: AskVisual,
    span: 'lg:col-span-12',
    wide: true,
    featured: false,
  },
];

export function Pillars() {
  return (
    <section className="relative bg-canvas-soft section" aria-labelledby="pillars-heading">
      <div className="relative mx-auto max-w-[1180px] px-6">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mono-label">Everything in one place</p>
          <TextReveal
            as="h2"
            id="pillars-heading"
            text="Three jobs. We do all three."
            accentWords={['Three']}
            className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
          />
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
            Most tools stop at the click. We keep going, from the brief and the first ad, through
            the enquiry, to the sale and what was actually in the basket.
          </p>
        </Reveal>

        <div className="grid gap-3.5 lg:grid-cols-12">
          {pillars.map((pillar, index) => {
            const Visual = pillar.visual;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px 0px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                className={pillar.span}
              >
                <SpotlightCard
                  className={`group h-full p-6 sm:p-7 ${
                    pillar.wide
                      ? 'grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-12'
                      : 'flex flex-col'
                  } ${pillar.featured ? 'card-feature-hero' : 'card card-lift'}`}
                >
                  <div className={pillar.wide ? 'flex flex-col' : 'contents'}>
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-400 group-hover:scale-108 ${
                        pillar.featured
                          ? 'bg-brand text-white shadow-[var(--shadow-brand)]'
                          : 'border border-brand-line bg-brand-soft text-brand-ink'
                      }`}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d={pillar.icon} />
                      </svg>
                    </span>
                    <span className="metric-value text-[11.5px] font-semibold text-ink-3">{pillar.n}</span>
                  </div>

                  <h3 className="h-display mt-5 text-[19.5px] text-ink">{pillar.title}</h3>
                  <p className="mt-2.5 max-w-[38rem] text-[14.5px] leading-relaxed text-ink-2">
                    {pillar.body}
                  </p>

                  {/* Stacked cards push the visual to the bottom so the row's
                      tallest card does not open a gap under the copy. */}
                  {!pillar.wide && (
                    <div className="mt-auto pt-6">
                      <Visual />
                    </div>
                  )}

                  <a
                    href={pillar.link.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-ink"
                  >
                    <span className="link-underline">{pillar.link.label}</span>
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  </div>

                  {pillar.wide && (
                    <div className="w-full">
                      <Visual />
                    </div>
                  )}
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
