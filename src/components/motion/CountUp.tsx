'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface CountUpProps {
  to: number;
  /** Rendered before the number, e.g. a currency symbol. */
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  /** Group thousands the Indian way (1,20,000) rather than 120,000. */
  indian?: boolean;
}

function format(value: number, decimals: number, indian: boolean) {
  return value.toLocaleString(indian ? 'en-IN' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * True once the page's first render has been hydrated. Counters mounted after
 * that (a client-side navigation, or a demo swapping its numbers) have never
 * been seen, so they can safely start from zero.
 */
let hydrated = false;

/**
 * Counts from zero to `to` the first time it scrolls into view.
 *
 * The real number is what the server renders, so search engines, AI crawlers
 * and anyone without JavaScript read "3 ad networks", not "0". A counter that
 * is already on screen when the page loads keeps its number; one further down
 * drops to zero while still out of sight and counts up when it is reached.
 */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.5,
  className,
  indian = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Inset top and bottom only. An all-round inset hid narrow numbers near the
  // left edge on phones, which then never counted and sat at zero.
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(to);
  const [armed, setArmed] = useState(false);
  // Mirrors `armed` for effects in the same commit, which still see the old state.
  const armedRef = useRef(false);

  // Runs before paint, so resetting to zero never shows as a flicker.
  useLayoutEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offscreen = rect.top > window.innerHeight || rect.bottom < 0;
    if (hydrated || offscreen) {
      armedRef.current = true;
      setValue(0);
      setArmed(true);
    }
  }, [reduced]);

  useEffect(() => {
    hydrated = true;
  }, []);

  // Not counting (reduced motion, or it was on screen at load): just show the number.
  useEffect(() => {
    if (reduced || !armedRef.current) setValue(to);
  }, [reduced, to]);

  useEffect(() => {
    if (!inView || !armed || reduced) return;

    let frame = 0;
    const started = performance.now();
    const totalMs = duration * 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - started) / totalMs, 1);
      // Ease-out cubic, so it decelerates into the final number.
      setValue(to * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, armed, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value, decimals, indian)}
      {suffix}
    </span>
  );
}
