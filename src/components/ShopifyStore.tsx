'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, RevealItem } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * What the Shopify connection does, grouped by what a store owner wants out of
 * it. Each line maps to something in the backend's shopify module; Google
 * Merchant Center and LinkedIn purchase tracking are not built, so neither is
 * claimed here.
 */
const groups = [
  {
    title: 'Know which ad sold what',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    points: [
      'Every order traced back to the ad that brought the buyer',
      'Sales against spend for each campaign and each product',
      'Purchases reported to Meta and Google, so they find more people who buy',
    ],
  },
  {
    title: 'Ads that follow your stock',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    points: [
      'A product sells out and its ads pause; restock it and they start again',
      'Your products kept in a Meta catalogue, ready for product ads',
      'Ads for new customers skip the people who already bought',
    ],
  },
  {
    title: 'WhatsApp that sells for you',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    points: [
      'Cash-on-delivery orders confirmed on WhatsApp before you ship',
      'A reminder an hour after someone leaves at checkout',
      'Shipping updates, review requests and a nudge for buyers who have gone quiet',
    ],
  },
  {
    title: 'Buyers you can reach again',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    points: [
      'Every buyer added to your CRM, and a paid order closes their deal',
      'Ready-made groups: past buyers, cart leavers, top spenders, repeat buyers',
      'Sent to Meta and Google as audiences, only for people who said yes to marketing',
    ],
  },
];

/** Illustrative figures for the panel, not results from a real store. */
const orders = [
  { id: '#1042', item: 'Silver ring', via: 'Instagram Reels ad', pay: 'Prepaid', tone: 'won', total: '₹2,499' },
  { id: '#1041', item: 'Cotton kurta', via: 'Google Shopping ad', pay: 'COD confirmed', tone: 'won', total: '₹1,299' },
  { id: '#1040', item: 'Gift hamper', via: 'WhatsApp cart reminder', pay: 'Prepaid', tone: 'won', total: '₹3,150' },
  { id: '#1039', item: 'Silk dupatta', via: 'Facebook Feed ad', pay: 'COD waiting', tone: 'waiting', total: '₹899' },
] as const;

const payTone = {
  won: 'bg-[color:var(--won-soft)] text-[color:var(--won)]',
  waiting: 'bg-[color:var(--waiting-soft)] text-[color:var(--waiting)]',
} as const;

function StorePanel() {
  return (
    <div className="mock-window" aria-hidden="true">
      <div className="mock-bar flex items-center gap-2 px-4 py-3">
        <p className="mono-label-muted">Your Shopify store · last 30 days</p>
        <span className="pill-mono ml-auto">Connected</span>
      </div>

      <div className="space-y-3 p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Ad spend', value: '₹18,200' },
            { label: 'Sales from ads', value: '₹71,450' },
            { label: 'Back per ₹1', value: '₹3.93' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-line bg-surface-2 p-3">
              <p className="text-[11px] text-ink-3">{stat.label}</p>
              <p className="metric-value mt-1 text-[16px] font-semibold text-ink">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.45, delay: i * 0.09, ease: EASE }}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 p-2.5"
            >
              <span className="metric-value w-11 shrink-0 text-[11.5px] font-semibold text-ink-3">
                {order.id}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-semibold text-ink">{order.item}</span>
                <span className="block truncate text-[11.5px] text-ink-3">{order.via}</span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <span className="metric-value text-[12.5px] font-semibold text-ink">{order.total}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${payTone[order.tone]}`}>
                  {order.pay}
                </span>
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-start gap-2.5 rounded-xl border border-brand-line bg-brand-soft p-3"
        >
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[12.5px] leading-relaxed text-ink-2">
            <span className="font-semibold text-ink">Maroon silk saree is sold out.</span> We paused
            the 2 ads selling it and will start them again when it is back in stock.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function ShopifyStore() {
  return (
    <section id="shopify" className="relative bg-canvas section" aria-labelledby="shopify-heading">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="mono-label">Selling online? Shopify, built in</p>
            <TextReveal
              as="h2"
              id="shopify-heading"
              text="Your Shopify store, plugged straight in"
              accentWords={['Shopify']}
              className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
            />
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
              If you sell online, connect your Shopify store once. Your products, your customers and
              the last year of orders come across in a few minutes. From then on every order is joined
              to the ad that found the buyer, and the store, the ads, the CRM and WhatsApp look after
              each other. No extra apps to install, and nothing to copy across by hand.
            </p>
            <a
              href="#lead-form"
              className="btn-primary mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-[15px]"
            >
              Connect my store
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6 }}
          >
            <StorePanel />
          </motion.div>
        </div>

        <Stagger className="mt-14 grid gap-3 sm:grid-cols-2" as="ul">
          {groups.map((group) => (
            <RevealItem key={group.title} as="li" className="card h-full p-5 sm:p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-line bg-brand-soft text-brand-ink">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={group.icon} />
                </svg>
              </span>
              <h3 className="h-display mt-4 text-[18.5px] text-ink">{group.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {group.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
