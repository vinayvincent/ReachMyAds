'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';

interface Vertical {
  id: string;
  name: string;
  emoji: string;
  busy: string;
  ask: string[];
  sale: string;
}

const verticals: Vertical[] = [
  {
    id: 'clothing',
    name: 'Clothing',
    emoji: '👗',
    busy: 'Onam, Diwali, Puja and wedding season, when a fortnight can carry your whole quarter.',
    ask: ['Occasion', 'Size', 'Budget'],
    sale: 'A bill at the counter.',
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    emoji: '🍽️',
    busy: 'Weekends, festivals, wedding season, match days, and rainy evenings.',
    ask: ['Date', 'How many people', 'Occasion'],
    sale: 'A table booked and honoured.',
  },
  {
    id: 'coaching',
    name: 'Coaching centres',
    emoji: '📚',
    busy: 'Admission season and the week results come out. Miss it and you miss the year.',
    ask: ['Class', 'Subject', 'Target exam'],
    sale: 'An enrolment, with the fee paid.',
  },
  {
    id: 'clinics',
    name: 'Clinics',
    emoji: '🩺',
    busy: 'Seasonal illness, post-festival, January, and school medical deadlines.',
    ask: ['Which service', 'Preferred time'],
    sale: 'An appointment attended.',
  },
  {
    id: 'realestate',
    name: 'Real estate',
    emoji: '🏠',
    busy: 'Akshaya Tritiya, Navratri, Gudi Padwa and the financial year end.',
    ask: ['Budget', 'Configuration', 'Locality'],
    sale: 'A site visit that turns into a booking.',
  },
  {
    id: 'repair',
    name: 'Home services',
    emoji: '🔧',
    busy: 'Monsoon for waterproofing, summer for AC, pre-festival for deep cleaning.',
    ask: ['What needs fixing', 'Area', 'How urgent'],
    sale: 'A job done and invoiced.',
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    emoji: '💍',
    busy: 'Akshaya Tritiya, Dhanteras, Onam and wedding season. The dates move every year.',
    ask: ['Occasion', 'Metal', 'Budget'],
    sale: 'A bill, and a customer worth remembering.',
  },
  {
    id: 'salon',
    name: 'Salon & gym',
    emoji: '💇',
    busy: 'January, pre-wedding months and festival weeks.',
    ask: ['Which service', 'Preferred slot'],
    sale: 'A package or membership.',
  },
];

export function Verticals() {
  const [active, setActive] = useState(0);
  const vertical = verticals[active]!;

  return (
    <section
      id="verticals"
      className="relative border-y border-line bg-canvas-soft section"
      aria-labelledby="verticals-heading"
    >
      <div className="relative mx-auto max-w-[980px] px-6">
        <Reveal className="mb-9 max-w-xl">
          <p className="mono-label">Set up for your trade</p>
          <TextReveal
            as="h2"
            id="verticals-heading"
            text="We already know your business"
            accentWords={['know']}
            className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
          />
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
            A jeweller and a dental clinic need very different ads, at very different times of
            year. Pick your trade and see what we have already set up for it.
          </p>
        </Reveal>

        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Choose your trade">
          {verticals.map((v, i) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              id={`vertical-tab-${v.id}`}
              aria-selected={active === i}
              aria-controls="vertical-panel"
              onClick={() => setActive(i)}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13.5px] font-semibold transition-all duration-250 ${
                active === i
                  ? 'border-brand bg-brand text-white shadow-[var(--shadow-brand)]'
                  : 'border-line bg-surface text-ink-2 hover:-translate-y-0.5 hover:border-brand-line hover:text-brand-ink'
              }`}
            >
              <span aria-hidden="true">{v.emoji}</span>
              {v.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={vertical.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            id="vertical-panel"
            role="tabpanel"
            aria-labelledby={`vertical-tab-${vertical.id}`}
            className="card grid gap-6 p-6 sm:grid-cols-3 sm:p-7"
          >
            <div>
              <p className="mono-label-muted">Busiest when</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{vertical.busy}</p>
            </div>
            <div>
              <p className="mono-label-muted">We ask each enquiry</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {vertical.ask.map((item) => (
                  <span key={item} className="pill-mono">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mono-label-muted">A sale means</p>
              <p className="mt-2 text-[14.5px] font-semibold leading-relaxed text-ink">{vertical.sale}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
