'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Reveal } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';
import { Skeleton } from './motion/Loaders';

interface Segment {
  text: string;
  bold?: boolean;
}

interface Question {
  chip: string;
  q: string;
  answer: Segment[];
  bars: { label: string; value: number; note: string }[];
}

const questions: Question[] = [
  {
    chip: 'What’s working?',
    q: 'Which ad is actually bringing me customers?',
    answer: [
      { text: 'Your ' },
      { text: 'Instagram ad', bold: true },
      { text: '. It brought ' },
      { text: '34 enquiries', bold: true },
      { text: ' this month at ₹198 each, less than half what Google is costing you.' },
    ],
    bars: [
      { label: 'Instagram', value: 92, note: '₹198 each' },
      { label: 'Google', value: 58, note: '₹441 each' },
      { label: 'Facebook', value: 40, note: '₹512 each' },
    ],
  },
  {
    chip: 'Am I wasting money?',
    q: 'Am I wasting money anywhere?',
    answer: [
      { text: 'Yes. Your ' },
      { text: 'LinkedIn ad', bold: true },
      { text: ' has spent ' },
      { text: '₹8,400', bold: true },
      { text: ' and brought 2 enquiries. Worth pausing it and putting that money into Instagram.' },
    ],
    bars: [
      { label: 'Instagram', value: 90, note: 'Keep going' },
      { label: 'Google', value: 55, note: 'Doing fine' },
      { label: 'LinkedIn', value: 12, note: 'Pause this' },
    ],
  },
  {
    chip: 'What sells best?',
    q: 'Which product is actually selling?',
    answer: [
      { text: 'Silk sarees: ' },
      { text: '41 of the 68 sales', bold: true },
      { text: ' last month, and the customers who bought them came mostly from ' },
      { text: 'Instagram Reels', bold: true },
      { text: '. Cotton sets sell, but at a third of the value.' },
    ],
    bars: [
      { label: 'Silk sarees', value: 91, note: '₹4,800 avg' },
      { label: 'Cotton sets', value: 48, note: '₹1,600 avg' },
      { label: 'Blouses', value: 26, note: '₹700 avg' },
    ],
  },
  {
    chip: 'What did a customer cost?',
    q: 'What did a customer cost me last month?',
    answer: [
      { text: '₹412 on average', bold: true },
      { text: ', down from ₹530 the month before. Your cheapest customers came in through ' },
      { text: 'WhatsApp', bold: true },
      { text: '. Those close nearly twice as often as form fills.' },
    ],
    bars: [
      { label: 'WhatsApp', value: 88, note: '₹287 each' },
      { label: 'Phone call', value: 62, note: '₹394 each' },
      { label: 'Web form', value: 35, note: '₹610 each' },
    ],
  },
];

function totalLength(segments: Segment[]) {
  return segments.reduce((sum, s) => sum + s.text.length, 0);
}

function RevealedAnswer({ segments, revealed }: { segments: Segment[]; revealed: number }) {
  let remaining = revealed;
  return (
    <>
      {segments.map((segment, i) => {
        if (remaining <= 0) return null;
        const slice = segment.text.slice(0, remaining);
        remaining -= segment.text.length;
        return (
          <span key={i} className={segment.bold ? 'font-semibold text-ink' : undefined}>
            {slice}
          </span>
        );
      })}
    </>
  );
}

function AIPanel() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [thinking, setThinking] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, margin: '-100px 0px' });
  const reduced = useReducedMotion();

  const question = questions[active]!;
  const total = totalLength(question.answer);
  const done = revealed >= total;

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setThinking(false);
      setRevealed(total);
      return;
    }

    setThinking(true);
    setRevealed(0);

    let frame = 0;
    const charsPerMs = total / 1800;

    const thinkTimer = setTimeout(() => {
      setThinking(false);
      const started = performance.now();
      const tick = (now: number) => {
        const count = Math.min(Math.floor((now - started) * charsPerMs), total);
        setRevealed(count);
        if (count < total) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, 550);

    return () => {
      clearTimeout(thinkTimer);
      cancelAnimationFrame(frame);
    };
  }, [active, inView, total, reduced]);

  return (
    <div ref={panelRef} className="mock-window">
      <div className="mock-bar flex items-center gap-2 px-4 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-white">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <p className="mono-label-muted">Ask Reach My Ads</p>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex justify-end">
          <motion.p
            key={`q-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-[88%] rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-[14px] text-white"
          >
            {question.q}
          </motion.p>
        </div>

        <div className="rounded-2xl rounded-tl-sm border border-line bg-surface-2 p-4">
          {thinking ? (
            <div className="min-h-[66px]" aria-label="Thinking">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-brand"
                    animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
                <span className="ml-1.5 text-[13px] text-ink-3">Checking your ads…</span>
              </div>
              {/* Placeholder lines shaped like the answer, so the panel does not
                  jump when the real sentence starts typing itself out. */}
              <div className="mt-3 space-y-2">
                <Skeleton className="h-2.5 w-[92%] rounded-full" />
                <Skeleton className="h-2.5 w-[78%] rounded-full" />
              </div>
            </div>
          ) : (
            <p className="min-h-[66px] text-[14px] leading-relaxed text-ink-2" aria-live="polite">
              <RevealedAnswer segments={question.answer} revealed={revealed} />
              {!done && <span className="caret ml-0.5" aria-hidden="true" />}
            </p>
          )}

          <motion.div initial={false} animate={{ opacity: done ? 1 : 0.25 }} transition={{ duration: 0.4 }} className="mt-4 space-y-2.5">
            {question.bars.map((bar, i) => (
              <div key={`${active}-${bar.label}`}>
                <div className="mb-1 flex items-center justify-between text-[12px]">
                  <span className="text-ink-2">{bar.label}</span>
                  <span className="metric-value font-semibold text-ink">{bar.note}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-line">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: i === 0 ? 'var(--brand)' : 'color-mix(in srgb, var(--brand) 32%, transparent)' }}
                    initial={{ width: 0 }}
                    animate={{ width: done ? `${bar.value}%` : 0 }}
                    transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-line pt-4">
          <span className="mono-label-muted self-center">Try asking</span>
          {questions.map((item, i) => (
            <button
              key={item.chip}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-all ${
                active === i
                  ? 'border-brand bg-brand text-white shadow-[var(--shadow-brand)]'
                  : 'border-line bg-surface text-ink-2 hover:-translate-y-0.5 hover:border-brand-line hover:text-brand-ink'
              }`}
            >
              {item.chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AIAnalytics() {
  return (
    <section id="ai" className="band-dark relative overflow-hidden section" aria-labelledby="ai-heading">

      <div className="relative mx-auto max-w-[1100px] px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="mono-label">Ask questions</p>
            <TextReveal
              as="h2"
              id="ai-heading"
              text="Just ask, in your own words"
              accentWords={['ask']}
              className="h-display mt-5 text-[clamp(2rem,4.2vw,3rem)] text-ink"
            />
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
              No charts to work out, and no jargon. Ask the question you actually have, in
              English, Malayalam or Hindi. Which ad brings the best customers, what your regulars
              buy, what a customer is worth. It knows, because it followed every sale.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
              It watches your ads for you, too. If one starts wasting money, you hear it from us
              before you spot it on your bill.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-line pt-6">
              {[
                { k: 'Follows', v: 'Ad → enquiry → sale' },
                { k: 'Answers in', v: 'Plain language' },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="mono-label-muted">{item.k}</dt>
                  <dd className="mt-1.5 text-[15px] font-semibold text-ink">{item.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <AIPanel />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
