'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BrandLogo } from '../BrandLogo';
import { PIPELINE_BASE, PIPELINE_STAGES, formatINR, leadFor, type Lead } from './data';

/**
 * The pipeline under the ads. `tick` is the id of the newest captured lead:
 * lead `k` sits in stage `tick - k`, so every tick drops a new lead into New
 * and moves each earlier one a column to the right, until it is won.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function sourceLabel(lead: Lead) {
  return `${lead.campaign.label} ad`;
}

/** Number that slides to its new value instead of snapping. */
function Ticker({ value, className = '' }: { value: string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function LeadCard({ lead, stage }: { lead: Lead; stage: number }) {
  const won = stage === 3;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`h-full rounded-lg border bg-surface p-2 shadow-[var(--shadow-sm)] transition-colors duration-500 sm:p-2.5 ${
        won ? 'border-[color:var(--won)]/40' : stage === 0 ? 'border-brand-line' : 'border-line'
      }`}
    >
      <span className="flex items-center gap-1.5 text-[10.5px] text-ink-3">
        <BrandLogo brand={lead.campaign.brand} className="h-3 w-3 shrink-0" />
        <span className="hidden truncate sm:inline">{sourceLabel(lead)}</span>
      </span>
      <span className="mt-1 block truncate text-[12px] font-semibold text-ink sm:text-[12.5px]">{lead.name}</span>
      <span className="hidden truncate text-[11px] text-ink-2 sm:block">{lead.want}</span>
      <span
        className={`metric-value mt-1 block truncate text-[11.5px] font-semibold transition-colors duration-500 sm:text-[12px] ${
          won ? 'text-[color:var(--won)]' : 'text-ink-3'
        }`}
      >
        ₹{formatINR(lead.value)}
      </span>
    </motion.div>
  );
}

export function Pipeline({ tick }: { tick: number }) {
  const reduced = useReducedMotion();

  // Leads and sales added since the base figures, which describe tick -1.
  const newLeads = Math.max(0, tick + 1);
  const wonIds = Array.from({ length: Math.max(0, tick - 2) }, (_, i) => i);
  const revenue = PIPELINE_BASE.revenue + wonIds.reduce((sum, id) => sum + leadFor(id).value, 0);
  const leads = PIPELINE_BASE.leads + newLeads;
  const won = PIPELINE_BASE.won + wonIds.length;
  const rate = ((won / leads) * 100).toFixed(1);

  const counts = [...PIPELINE_BASE.columnCounts];
  counts[3] = won;

  const onBoard = [0, 1, 2, 3].map((stage) => leadFor(tick - stage));
  const newest = onBoard[0]!;
  const justWon = onBoard[3]!;

  const metrics: [string, string][] = [
    ['Leads this month', String(leads)],
    ['Customers won', String(won)],
    ['Revenue from ads', `₹${formatINR(revenue)}`],
    ['Lead to sale', `${rate}%`],
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-lg)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="text-[13px] font-semibold text-ink">Leads and sales</p>
        <p className="text-[11.5px] text-ink-3">Every ad, one pipeline</p>
      </div>

      <dl className="grid grid-cols-2 border-b border-line sm:grid-cols-4">
        {metrics.map(([label, value], i) => (
          <div
            key={label}
            className={`px-3 py-2.5 ${i % 2 === 1 ? 'border-l border-line' : ''} ${
              i >= 2 ? 'border-t border-line sm:border-t-0' : ''
            } ${i === 2 ? 'sm:border-l' : ''}`}
          >
            <dt className="truncate text-[10.5px] text-ink-3">{label}</dt>
            <dd className="metric-value mt-0.5 text-[15px] font-semibold text-ink">
              <Ticker value={value} />
            </dd>
          </div>
        ))}
      </dl>

      <div className="bg-canvas-soft p-2.5">
        <div className="grid grid-cols-4 gap-2">
          {PIPELINE_STAGES.map((stage, s) => (
            <p
              key={stage}
              className="flex min-w-0 items-center justify-between gap-1 px-0.5 text-[11px] font-semibold text-ink-2"
            >
              <span className="truncate">{stage}</span>
              <span className="metric-value rounded bg-surface px-1.5 text-[10.5px] font-medium text-ink-3">
                <Ticker value={String(counts[s])} />
              </span>
            </p>
          ))}
        </div>

        {/* One lane for all four cards. Each card slides a column to the right
            on every tick; CSS transitions the move, Framer the enter and exit. */}
        <div className="relative mt-1.5 h-[76px] sm:h-[92px]">
          <div className="absolute inset-0 grid grid-cols-4 gap-2" aria-hidden="true">
            {PIPELINE_STAGES.map((stage) => (
              <span key={stage} className="mx-1.5 mt-2 rounded-lg border border-line bg-surface/70" />
            ))}
          </div>
          <AnimatePresence initial={false}>
            {onBoard.map((lead, s) => (
              <div
                key={lead.id}
                className="absolute left-0 top-0 h-full"
                style={{
                  width: 'calc((100% - 1.5rem) / 4)',
                  transform: `translateX(calc(${s} * (100% + 0.5rem)))`,
                  transition: reduced ? undefined : 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <LeadCard lead={lead} stage={s} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ul className="divide-y divide-line border-t border-line text-[11.5px]">
        <li className="flex items-center gap-2 px-4 py-2">
          <BrandLogo brand="whatsapp" className="h-3.5 w-3.5 shrink-0" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={newest.id}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-w-0 truncate text-ink-2"
            >
              <span className="font-semibold text-ink">{newest.name}</span> got a WhatsApp reply in 3s,
              logged against the {newest.campaign.label} ad
            </motion.span>
          </AnimatePresence>
        </li>
        <li className="flex items-center gap-2 px-4 py-2">
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[color:var(--won)] text-white">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={justWon.id}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-w-0 truncate text-ink-2"
            >
              <span className="font-semibold text-ink">{justWon.name}</span> bought,{' '}
              <span className="font-semibold text-[color:var(--won)]">₹{formatINR(justWon.value)}</span>,
              traced to {sourceLabel(justWon)}
            </motion.span>
          </AnimatePresence>
        </li>
      </ul>
    </div>
  );
}
