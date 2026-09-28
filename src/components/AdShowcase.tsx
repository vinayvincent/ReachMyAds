'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BrandLogo } from './BrandLogo';
import { CountUp } from './motion/CountUp';
import {
  FacebookFeedAd,
  GoogleSearchAd,
  InstagramReelAd,
  LinkedInLeadAd,
  YouTubeInStreamAd,
} from './showcase/ads';
import { CAMPAIGNS, SLOT_MS, leadFor, type Platform } from './showcase/data';
import { Pipeline } from './showcase/Pipeline';

/**
 * The hero visual. Above: the ads we run, one platform at a time, each drawn
 * the way that platform shows it. Below: the pipeline those ads feed. Both run
 * off one clock, so the lead an ad produces is the one that lands in New.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** How far into an ad's slot its lead is captured. */
const CAPTURE_MS = 4200;

const CREATIVES: Record<Platform, () => React.ReactElement> = {
  google: GoogleSearchAd,
  instagram: InstagramReelAd,
  youtube: YouTubeInStreamAd,
  facebook: FacebookFeedAd,
  linkedin: LinkedInLeadAd,
};

export function AdShowcase() {
  const reduced = useReducedMotion();
  const [slot, setSlot] = useState(0);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    if (reduced) {
      setCaptured(true);
      return;
    }
    setCaptured(false);
    const capture = window.setTimeout(() => setCaptured(true), CAPTURE_MS);
    const next = window.setTimeout(() => setSlot((s) => s + 1), SLOT_MS);
    return () => {
      window.clearTimeout(capture);
      window.clearTimeout(next);
    };
  }, [slot, reduced]);

  const count = CAMPAIGNS.length;
  const active = slot % count;
  const campaign = CAMPAIGNS[active]!;
  const Creative = CREATIVES[campaign.platform];
  const lead = leadFor(slot);
  const tick = captured ? slot : slot - 1;

  /** Jumps forward to a platform, so the pipeline keeps moving the right way. */
  function show(index: number) {
    setSlot((s) => s + ((index - (s % count) + count) % count || count));
  }

  const stats = [
    [campaign.stats.reachLabel, campaign.stats.reach, ''],
    ['Clicks', campaign.stats.clicks, ''],
    ['Leads', campaign.stats.leads, ''],
    ['Cost / lead', campaign.stats.costPerLead, '₹'],
  ] as const;

  return (
    <div className="mx-auto grid w-full max-w-[580px] gap-4">
      {/* ── The ads ── */}
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-lg)]">
        <div className="flex items-center gap-1 border-b border-line px-2 pt-1.5" role="tablist" aria-label="Ad platforms">
          {CAMPAIGNS.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.platform}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => !isActive && show(i)}
                className={`relative flex items-center gap-1.5 rounded-t-md px-2.5 pb-2.5 pt-1.5 text-[12.5px] font-medium transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-3 hover:text-ink-2'
                }`}
              >
                <BrandLogo brand={c.brand} className="h-4 w-4" colored={isActive} />
                <span className={isActive ? 'inline' : 'hidden sm:inline'}>{c.label}</span>
                {isActive && (
                  <span className="absolute inset-x-1.5 bottom-0 h-[2px] overflow-hidden rounded-full bg-line">
                    <motion.span
                      key={slot}
                      className="block h-full origin-left bg-brand"
                      initial={{ scaleX: reduced ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduced ? 0 : SLOT_MS / 1000, ease: 'linear' }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3 px-4 pt-3 text-[12px]">
          <p className="truncate text-ink-2">
            <span className="font-semibold text-ink">{campaign.business}</span> · {campaign.format}
          </p>
          <p className="flex shrink-0 items-center gap-1.5 font-medium text-[color:var(--won)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--won)]" aria-hidden="true" />
            Running
          </p>
        </div>

        {/* Preview stage. Fixed height, so switching formats never moves the page. */}
        <div className="relative mx-3 mt-3 flex h-[330px] items-center justify-center overflow-hidden rounded-lg bg-canvas-soft p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={slot}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex h-full w-full items-center justify-center"
            >
              <Creative />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The moment the ad turns into a lead */}
        <div className="relative mx-3 mt-2 h-10 overflow-hidden" role="status">
          <AnimatePresence mode="wait" initial={false}>
            {captured ? (
              <motion.p
                key={`lead-${slot}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex h-full items-center gap-2.5 rounded-lg border border-brand-line bg-brand-soft px-3 text-[12px] text-ink-2"
              >
                <BrandLogo brand={campaign.brand} className="h-3.5 w-3.5 shrink-0" />
                <span className="min-w-0 truncate">
                  <span className="font-semibold text-ink">New lead: {lead.name}</span> · {lead.want}
                </span>
                <span className="ml-auto hidden shrink-0 font-medium text-brand-ink sm:inline">Added to pipeline</span>
              </motion.p>
            ) : (
              <motion.p
                key={`wait-${slot}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-full items-center gap-2.5 px-3 text-[12px] text-ink-3"
              >
                <span className="loader-dots text-ink-3" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                Watching for calls, messages and form fills
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <dl className="mt-2 grid grid-cols-4 divide-x divide-line border-t border-line">
          {stats.map(([label, value, prefix]) => (
            <div key={label} className="min-w-0 px-3 py-2.5">
              <dt className="truncate text-[10.5px] text-ink-3">{label}</dt>
              <dd className="metric-value text-[14px] font-semibold text-ink">
                <CountUp key={`${slot}-${label}`} to={value} prefix={prefix} indian duration={1.2} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── What the ads produce ── */}
      <Pipeline tick={tick} />
    </div>
  );
}
