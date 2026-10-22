'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, RevealItem } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';

const EASE = [0.16, 1, 0.3, 1] as const;

interface Product {
  key: 'ads' | 'crm' | 'whatsapp' | 'shopify';
  name: string;
  body: string;
  /** Where on the page the product is explained in full. */
  href: string;
  icon: string;
  tag?: string;
}

/**
 * The four products, as the backend names them (ads, crm, wa, shop). Each one
 * works alone, but the point of this section is that they share one set of
 * records, so the copy leans on what passes between them.
 */
const products: Product[] = [
  {
    key: 'ads',
    name: 'Ads',
    body: 'Google, Meta and LinkedIn from one form. We write them, run them and move the money to what works.',
    href: '#platforms',
    icon: 'M3 17l6-6 4 4 8-8M21 7h-5m5 0v5',
  },
  {
    key: 'crm',
    name: 'CRM',
    body: 'Every lead, deal, task and follow-up, each one labelled with the ad that started it.',
    href: '#leads',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    key: 'whatsapp',
    name: 'WhatsApp',
    body: 'Your business number, one shared inbox, and messages that go out on their own at the right moment.',
    href: '#leads',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    key: 'shopify',
    name: 'Shopify',
    body: 'Connect your store once. Products, orders and buyers come across, and every order is traced to its ad.',
    href: '#shopify',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    tag: 'For online stores',
  },
];

/**
 * What passes between the products. Every line is a connection the backend
 * runs today (see billing/Connections.java); keep it that way.
 */
const links = [
  {
    from: 'Ads',
    to: 'CRM',
    text: 'Someone answers your ad. They land in the CRM with the ad’s name already on them.',
  },
  {
    from: 'CRM',
    to: 'WhatsApp',
    text: 'Move a deal to the next stage and the right WhatsApp message goes out by itself.',
  },
  {
    from: 'Shopify',
    to: 'CRM',
    text: 'A paid order closes the matching deal and records what they spent.',
  },
  {
    from: 'Shopify',
    to: 'CRM',
    text: 'Someone leaves at checkout. Your team gets a call to make, with the basket on it.',
  },
  {
    from: 'CRM + Shopify',
    to: 'Ads',
    text: 'Ads meant for new customers skip the people who already bought from you.',
  },
  {
    from: 'Shopify',
    to: 'Ads',
    text: 'A product sells out and its ads pause. It comes back in stock and they start again.',
  },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative bg-canvas section" aria-labelledby="ecosystem-heading">
      <div className="relative mx-auto max-w-[1180px] px-6">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <p className="mono-label">One place for the whole business</p>
            <TextReveal
              as="h2"
              id="ecosystem-heading"
              text="Ads, CRM, WhatsApp and your store. One login."
              accentWords={['One']}
              className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
            />
          </Reveal>

          <Reveal delay={0.1} className="lg:pb-1">
            <p className="max-w-[36rem] text-[16.5px] leading-relaxed text-ink-2">
              Most small businesses pay an agency for the ads, buy a CRM on the side, use another
              tool for WhatsApp and add a handful of Shopify apps, then copy things between them by
              hand. Here it is one system. The ads, your customers, your chats and your orders share
              the same records, so each part knows what the others did, and you never have to go
              anywhere else.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" as="ul">
          {products.map((product) => (
            <RevealItem key={product.key} as="li">
              <a
                href={product.href}
                className={`group flex h-full flex-col p-5 sm:p-6 ${
                  product.key === 'shopify' ? 'card-feature-hero' : 'card card-lift'
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      product.key === 'shopify'
                        ? 'bg-brand text-white shadow-[var(--shadow-brand)]'
                        : 'border border-brand-line bg-brand-soft text-brand-ink'
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d={product.icon} />
                    </svg>
                  </span>
                  {product.tag && <span className="pill-mono">{product.tag}</span>}
                </span>

                <span className="h-display mt-5 block text-[19.5px] text-ink">{product.name}</span>
                <span className="mt-2 block text-[14.5px] leading-relaxed text-ink-2">
                  {product.body}
                </span>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-brand-ink">
                  <span className="link-underline">See how</span>
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </RevealItem>
          ))}
        </Stagger>

        <div className="mt-14">
          <Reveal>
            <h3 className="h-display text-[21px] text-ink">How the parts talk to each other</h3>
            <p className="mt-2 max-w-[38rem] text-[15px] leading-relaxed text-ink-2">
              None of this needs setting up between tools, because there is only one tool.
            </p>
          </Reveal>

          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {links.map((link, i) => (
              <motion.li
                key={link.text}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px 0px' }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.08, ease: EASE }}
                className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-start sm:gap-4"
              >
                <span className="flex shrink-0 items-center gap-1.5 pt-0.5">
                  <span className="pill-mono">{link.from}</span>
                  <svg className="h-3.5 w-3.5 text-ink-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-label="to">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="pill-mono">{link.to}</span>
                </span>
                <span className="text-[14.5px] leading-relaxed text-ink-2">{link.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
