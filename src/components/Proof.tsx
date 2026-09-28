'use client';

import { CountUp } from './motion/CountUp';
import { Stagger, RevealItem, Reveal } from './motion/Reveal';

/**
 * Deliberately facts about the product rather than customer statistics.
 * Inventing social proof would be the fastest way to lose it.
 */
const facts = [
  { to: 3, label: 'Ad networks, one form', note: 'Google Ads, Meta Ads, LinkedIn Ads', suffix: '' },
  { to: 3, label: 'Ways a customer can reach you', note: 'Phone call, WhatsApp, website form', suffix: '' },
  { to: 1, label: 'Inbox they all land in', note: 'Each one tagged with the ad that brought it', suffix: '' },
  { to: 1, label: 'Day to go live', note: 'From your link to ads running', suffix: '' },
];

export function Proof() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-canvas" aria-label="Reach My Ads at a glance">

      <div className="relative mx-auto max-w-[1180px] px-6 py-12 sm:py-14">
        <Reveal className="mb-8">
          <p className="mono-label-muted">The short version</p>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4" as="ul">
          {facts.map((fact) => (
            <RevealItem key={fact.label} as="li">
              <p className="metric-value text-[clamp(2.4rem,5vw,3.3rem)] font-semibold leading-none text-ink">
                <CountUp to={fact.to} suffix={fact.suffix} duration={1.3} />
              </p>
              <p className="mt-3 text-[14.5px] font-semibold leading-snug text-ink">{fact.label}</p>
              <p className="mt-1 text-[13px] leading-snug text-ink-3">{fact.note}</p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
