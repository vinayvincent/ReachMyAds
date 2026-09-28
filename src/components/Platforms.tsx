'use client';

import { BrandLogo } from './BrandLogo';
import { Reveal, Stagger, RevealItem } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';
import { TiltCard } from './motion/TiltCard';
import type { BrandKey } from '@/lib/brand-logos';

interface Network {
  /** One network can own several surfaces, so the logo is a list. */
  brands: BrandKey[];
  name: string;
  note: string;
  /** Where the ads actually appear. Shop-owner words, not ad-manager words. */
  places: string[];
  /** What this network is actually good at, for the card detail. */
  best: string;
}

/**
 * Three ad networks, not nine logos.
 *
 * Instagram, Facebook and click-to-WhatsApp are all placements inside Meta
 * Ads; Search, Maps, YouTube and Shopping are all placements inside Google
 * Ads. Listing them as separate platforms overstated what we connect to, so
 * they are named as surfaces under the network that actually serves them.
 */
const networks: Network[] = [
  {
    brands: ['google'],
    name: 'Google Ads',
    note: 'Search, Maps, YouTube & Shopping',
    places: ['Google Search', 'Maps', 'YouTube', 'Shopping'],
    best: 'People already looking for what you sell',
  },
  {
    brands: ['instagram', 'facebook', 'whatsapp'],
    name: 'Meta Ads',
    note: 'Instagram, Facebook & WhatsApp',
    places: ['Reels', 'Feed & Stories', 'Marketplace', 'Click to WhatsApp'],
    best: 'Showing the product off, and cheap conversations',
  },
  {
    brands: ['linkedin'],
    name: 'LinkedIn Ads',
    note: 'Feed & professional targeting',
    places: ['Feed', 'By job title', 'By company'],
    best: 'B2B and high-ticket',
  },
];

/**
 * Anticipated, not shipped. The connector architecture allows for these; none
 * of them is live, so the label above the marquee has to say so plainly.
 */
const roadmap = ['TikTok', 'Amazon Ads', 'X', 'Snapchat', 'Programmatic DSPs'];

export function Platforms() {
  return (
    <section
      id="platforms"
      className="relative overflow-hidden bg-canvas section"
      aria-labelledby="platforms-heading"
    >

      <div className="relative mx-auto max-w-[1180px] px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="mono-label">Where your ads go</p>
            <TextReveal
              as="h2"
              id="platforms-heading"
              text="Three networks. One form."
              accentWords={['Three']}
              className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
            />
          </Reveal>

          <Reveal delay={0.1} className="lg:pb-1">
            <p className="max-w-[36rem] text-[16.5px] leading-relaxed text-ink-2">
              You never open an ad manager. You never have to learn what a “bid strategy” is. You
              fill in one form once, and the same campaign goes up on Google, Meta and LinkedIn,
              each one set up the way that network wants it. Anything that stops working, we switch
              off.
            </p>
          </Reveal>
        </div>

        {/* Network grid. Tilt is what makes these feel like objects rather than icons. */}
        <Stagger className="mt-12 grid gap-3 sm:grid-cols-3" as="ul">
          {networks.map((network) => (
            <RevealItem key={network.name} as="li">
              <TiltCard className="h-full">
                <div className="card card-lift spotlight trace-top group flex h-full flex-col p-5 sm:p-6">
                  <span className="flex items-center gap-1.5">
                    {network.brands.map((brand) => (
                      <span
                        key={brand}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-canvas-soft transition-transform duration-400 group-hover:scale-108"
                      >
                        <BrandLogo brand={brand} className="h-[21px] w-[21px]" />
                      </span>
                    ))}
                  </span>

                  <span className="mt-5 block text-[16px] font-semibold text-ink">
                    {network.name}
                  </span>
                  <span className="mono-label-muted mt-1 block text-[9.5px]">{network.note}</span>

                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {network.places.map((place) => (
                      <span key={place} className="pill-mono">
                        {place}
                      </span>
                    ))}
                  </span>

                  <span className="mt-auto block pt-5 text-[13px] leading-snug text-ink-2">
                    {network.best}
                  </span>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <p className="mt-6 text-[13.5px] leading-relaxed text-ink-3">
            A campaign can go to one network or all three. If it publishes to two and the third
            rejects it, you are told which one and why.
          </p>
        </Reveal>
      </div>

      {/* Roadmap marquee */}
      <Reveal delay={0.1} className="mt-12">
        <div className="mx-auto mb-4 max-w-[1180px] px-6">
          <p className="mono-label-muted">Coming next</p>
        </div>
        <div className="marquee-mask overflow-hidden border-y border-line bg-canvas-soft py-3">
          <div className="marquee-track-slow">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
                {roadmap.map((name) => (
                  <span key={`${copy}-${name}`} className="flex items-center gap-5 px-5">
                    <span className="font-mono text-[12.5px] uppercase tracking-[0.1em] text-ink-3">
                      {name}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-brand/50" aria-hidden="true" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
