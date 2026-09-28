'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, RevealItem } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';

const points = [
  'Calls, WhatsApp messages and website forms, all in one list',
  'Each one labelled with the ad and the campaign that brought it in',
  'Every enquiry has an owner, a next step and a date you last spoke',
  'Anyone nobody has replied to gets flagged for you',
  'Mark it bought and record the amount. We join it back to the ad',
  'The ones going nowhere get parked, so your list stays real',
];

/**
 * The four live stages of the lead lifecycle, in the order they actually
 * happen. The fifth state, parked, is deliberately not shown here — a lead
 * that goes nowhere leaves the list rather than sitting in it.
 */
const leads = [
  { name: 'New enquiry', via: 'WhatsApp · Instagram Reel', time: '2 min ago', state: 'new' as const },
  { name: 'Contacted', via: 'Call · Google Search ad', time: '1 hour ago', state: 'contacted' as const },
  { name: 'Worth chasing', via: 'Web form · Facebook ad', time: '2 days ago', state: 'qualified' as const },
  { name: 'Bought · ₹4,800', via: 'Call · Google Maps ad', time: 'Last week', state: 'won' as const },
];

const stateStyles = {
  new: { label: 'New', cls: 'bg-brand text-white' },
  contacted: { label: 'Contacted', cls: 'bg-brand-soft text-brand-ink' },
  qualified: {
    label: 'Qualified',
    cls: 'bg-[color:var(--waiting-soft)] text-[color:var(--waiting)]',
  },
  won: { label: 'Bought', cls: 'bg-[color:var(--won-soft)] text-[color:var(--won)]' },
};

function LeadInbox() {
  return (
    <div className="mock-window">
      <div className="mock-bar flex items-center gap-2 px-4 py-3">
        <p className="mono-label-muted">Your enquiries</p>
        <span className="pill-mono ml-auto">4 this week</span>
      </div>

      <div className="space-y-2 p-3 sm:p-4">
        {leads.map((lead, i) => {
          const style = stateStyles[lead.state];
          return (
            <motion.div
              key={lead.name}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                lead.state === 'qualified'
                  ? 'border-[color:var(--waiting)]/40 bg-[color:var(--waiting-soft)]'
                  : 'border-line bg-surface-2'
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[13px] font-bold text-brand-ink">
                {lead.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-ink">{lead.name}</p>
                <p className="truncate text-[12px] text-ink-3">{lead.via}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${style.cls}`}>
                  {style.label}
                </span>
                <span className="text-[11px] text-ink-3">{lead.time}</span>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-start gap-2.5 rounded-xl border border-brand-line bg-brand-soft p-3"
        >
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="text-[12.5px] leading-relaxed text-ink-2">
            <span className="font-semibold text-ink">One qualified enquiry has waited two days.</span>{' '}
            It came from your best-performing ad. Worth a reply today.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function LeadTracking() {
  return (
    <section id="leads" className="relative bg-canvas-soft section" aria-labelledby="leads-heading">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="mono-label">Leads, customers and sales</p>
            <TextReveal
              as="h2"
              id="leads-heading"
              text="From the first click to the sale"
              accentWords={['sale']}
              className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
            />
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
              Most tools tell you a click cost ₹14 and stop there. We keep following that
              person. Did they call, did they buy, what did they buy, and were they worth more than
              the ad cost. That is the only number that actually matters.
            </p>

            <Stagger className="mt-7 space-y-3" as="ul">
              {points.map((point) => (
                <RevealItem
                  key={point}
                  as="li"
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-2"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {point}
                </RevealItem>
              ))}
            </Stagger>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <LeadInbox />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
