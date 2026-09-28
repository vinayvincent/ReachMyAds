'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BrandLogo } from '../BrandLogo';
import { AlignerMark, KitchenScene, SadyaScene } from './scenes';
import { SLOT_MS } from './data';

/**
 * The five ad formats, each drawn the way its platform draws it. Every one
 * plays a short loop of its own when it mounts, the way the real ad would:
 * a search being typed, a Reel panning with captions, a skip countdown.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Moves through timed phases after mount. Holds the last phase on reduced motion. */
function usePhases(timesMs: number[]) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (reduced) {
      setPhase(timesMs.length);
      return;
    }
    const timers = timesMs.map((t, i) => window.setTimeout(() => setPhase(i + 1), t));
    return () => timers.forEach(window.clearTimeout);
    // The schedule is fixed per ad, so it only needs to run on mount.
  }, [reduced]);
  return phase;
}

/** Types `text` out a character at a time. */
function useTyped(text: string, delayMs = 250, perCharMs = 55) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let timer = 0;
    const start = window.setTimeout(function tick() {
      i += 1;
      setCount(i);
      if (i < text.length) timer = window.setTimeout(tick, perCharMs);
    }, delayMs);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timer);
    };
  }, [text, delayMs, perCharMs, reduced]);
  return { typed: text.slice(0, count), done: count >= text.length };
}

function Icon({ d, className = 'h-3.5 w-3.5', width = 2 }: { d: string; className?: string; width?: number }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={width} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const PATHS = {
  pin: 'M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  directions: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  comment: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  chevron: 'M9 5l7 7-7 7',
  globe: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18',
  music: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z',
  skip: 'M5 5l8 7-8 7V5zm12 0v14',
  thumb: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
};

/* ── Google: local search ad for an Onam sale ────────────────── */

export function GoogleSearchAd() {
  const { typed, done } = useTyped('onam saree offers kochi');
  return (
    <div className="w-full max-w-[440px]" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 shadow-[var(--shadow-sm)]">
        <BrandLogo brand="google" className="h-4 w-4 shrink-0" />
        <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">
          {typed}
          <span className="type-caret ml-px inline-block h-[14px] w-px translate-y-[2px] bg-ink" />
        </span>
        <Icon d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" className="h-4 w-4 text-ink-3" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mt-3 rounded-xl border border-line bg-surface p-4 shadow-[var(--shadow-md)]"
      >
        <p className="text-[11.5px] font-bold text-ink">Sponsored</p>
        <div className="mt-2 flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7a1f2b] text-[12px] font-bold text-[#f3d27a]">
            K
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[12.5px] text-ink">Kasavu House</span>
            <span className="block truncate text-[11px] text-ink-3">www.kasavuhouse.in › onam-sale</span>
          </span>
        </div>
        <p className="mt-2 text-[16px] leading-snug text-[#1a0dab] dark:text-[#8ab4f8]">
          Onam Sale in Kochi | Up to 40% Off Kasavu Sarees
        </p>
        <p className="mt-1 flex items-center gap-1 text-[12px] text-ink-2">
          <span className="text-[#e37400]">4.7 ★★★★★</span>
          <span className="text-ink-3">(1,286) · Clothing store</span>
        </p>
        <p className="mt-1 text-[12.5px] leading-snug text-ink-2">
          Handwoven kasavu sarees, set mundu and kids&apos; pattu pavada. Free alteration. Offer
          ends 15 September.
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-[12px] text-ink-2">
          <Icon d={PATHS.pin} className="h-3.5 w-3.5 text-ink-3" />
          MG Road, Ernakulam · <span className="text-[color:var(--won)]">Open</span> until 9 pm
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            [PATHS.phone, 'Call'],
            [PATHS.directions, 'Directions'],
            [null, 'Onam collection'],
          ].map(([d, label]) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[12px] text-[#1a0dab] dark:text-[#8ab4f8]"
            >
              {d && <Icon d={d} className="h-3.5 w-3.5" />}
              {label}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Instagram: restaurant Reel ──────────────────────────────── */

const REEL_CAPTIONS = ['Onam sadya at Malabar Table', '26 dishes on one leaf · ₹549', 'Book your table for Thiruvonam'];

export function InstagramReelAd() {
  const phase = usePhases([2000, 3200, 4000]);
  const caption = Math.min(phase, 2);
  const liked = phase >= 2;
  const ctaLit = phase >= 3;

  return (
    <div className="relative aspect-[9/16] h-full overflow-hidden rounded-[18px] bg-black shadow-[var(--shadow-lg)]">
      <SadyaScene className="kenburns absolute inset-0 h-full w-full" />

      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

      <div className="absolute inset-x-2.5 top-2 h-[2px] overflow-hidden rounded-full bg-white/35">
        <div
          className="reel-progress h-full w-full origin-left rounded-full bg-white"
          style={{ animationDuration: `${SLOT_MS}ms` }}
        />
      </div>
      <div className="absolute left-3 right-3 top-4 flex items-center justify-between text-white">
        <span className="text-[13px] font-bold">Reels</span>
        <Icon d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z" className="h-4 w-4" />
      </div>

      {/* Caption stickers, as the creator's edit would place them */}
      <div className="absolute inset-x-0 top-[15%] flex justify-center px-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={caption}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="max-w-[78%] rounded-md bg-white px-2 py-1 text-center text-[11.5px] font-bold leading-tight text-[#141414]"
          >
            {REEL_CAPTIONS[caption]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-[44%] right-2 flex flex-col items-center gap-3 text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.7))]">
        <span className="flex flex-col items-center gap-0.5">
          <motion.svg
            className="h-[19px] w-[19px]"
            viewBox="0 0 24 24"
            stroke={liked ? '#ff3040' : 'currentColor'}
            fill={liked ? '#ff3040' : 'none'}
            strokeWidth={2}
            animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={PATHS.heart} />
          </motion.svg>
          <span className="text-[9.5px] font-semibold">{liked ? '3,913' : '3,912'}</span>
        </span>
        <span className="flex flex-col items-center gap-0.5">
          <Icon d={PATHS.comment} className="h-[19px] w-[19px]" />
          <span className="text-[9.5px] font-semibold">204</span>
        </span>
        <Icon d={PATHS.send} className="h-[18px] w-[18px]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-3 pb-3 text-white">
        <div className="flex items-center gap-2 pr-6">
          <span className="rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-black bg-[#1f3b2a] text-[9px] font-bold text-[#f1d38a]">
              MT
            </span>
          </span>
          <span className="leading-tight">
            <span className="block text-[11.5px] font-semibold">malabartable.kochi</span>
            <span className="block text-[9.5px] text-white/75">Sponsored</span>
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[10.5px] leading-snug text-white/90">
          Thiruvonam sadya, served on the leaf from 11:30. Panampilly Nagar.
        </p>
        <p className="mt-1 flex items-center gap-1 text-[9.5px] text-white/80">
          <Icon d={PATHS.music} className="h-3 w-3" />
          Original audio · malabartable.kochi
        </p>
        <motion.div
          animate={{
            backgroundColor: ctaLit ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.2)',
            color: ctaLit ? '#141414' : '#ffffff',
          }}
          transition={{ duration: 0.35 }}
          className="mt-2 flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold"
        >
          Book a table
          <Icon d={PATHS.chevron} className="h-3 w-3" width={3} />
        </motion.div>
      </div>
    </div>
  );
}

/* ── YouTube: in-stream ad with skip countdown ───────────────── */

export function YouTubeInStreamAd() {
  const phase = usePhases([1000, 2000, 3000, 4000, 5000]);
  const secondsLeft = 5 - phase;
  return (
    <div className="w-full max-w-[440px]">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-[var(--shadow-lg)]">
        <KitchenScene className="kenburns absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
          <span className="rounded-sm bg-[#f5c518] px-1.5 py-px text-[10px] font-bold text-[#141414]">Ad</span>
          <span className="text-[11px] font-medium">0:0{Math.min(phase + 1, 6)} · oaklineinteriors.in</span>
        </div>

        <div className="absolute bottom-3 right-0 flex items-center gap-2 border border-r-0 border-white/25 bg-black/70 px-3 py-1.5 text-[11.5px] font-medium text-white">
          {secondsLeft > 0 ? (
            <span className="tabular-nums">Skip in {secondsLeft}</span>
          ) : (
            <>
              Skip Ads
              <Icon d={PATHS.skip} className="h-3.5 w-3.5" />
            </>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25">
          <div
            className="reel-progress h-full w-full origin-left bg-[#f5c518]"
            style={{ animationDuration: `${SLOT_MS}ms` }}
          />
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 shadow-[var(--shadow-sm)]">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3ede4] text-[12px] font-bold text-[#6b4f2f]">
          O
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[13px] font-semibold text-ink">
            Modular kitchens, fitted in 45 days
          </span>
          <span className="block truncate text-[11.5px] text-ink-3">Sponsored · Oakline Interiors, Kochi</span>
        </span>
        <span className="shrink-0 rounded-full bg-[#065fd4] px-3.5 py-1.5 text-[12px] font-semibold text-white">
          Get quote
        </span>
      </div>
    </div>
  );
}

/* ── Facebook: dental clinic feed ad ─────────────────────────── */

export function FacebookFeedAd() {
  const phase = usePhases([3000]);
  return (
    <div
      className="w-full max-w-[340px] overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-lg)]"
      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      <div className="flex items-center gap-2.5 px-3 pt-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f766e] text-[13px] font-bold text-white">
          P
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold text-ink">Pearl Dental Studio</span>
          <span className="flex items-center gap-1 text-[11px] text-ink-3">
            Sponsored · <Icon d={PATHS.globe} className="h-3 w-3" width={1.8} />
          </span>
        </span>
      </div>
      <p className="px-3 pb-2.5 pt-2 text-[12.5px] leading-snug text-ink">
        Straighter teeth without metal braces. Free 3D smile scan this month in Edappally.
      </p>

      <div className="relative flex aspect-[2.3/1] items-center overflow-hidden bg-[#e3f3ef] px-4">
        <div className="relative z-10 max-w-[52%]">
          <p className="text-[17px] font-bold leading-tight text-[#0f3d3a]">Free 3D smile scan</p>
          <p className="mt-1 text-[11px] font-medium text-[#2c6b64]">Aligner plan in one visit</p>
        </div>
        <AlignerMark className="absolute right-3 top-1/2 h-[78%] -translate-y-1/2" />
        <span className="scan-sweep absolute bottom-3 top-3 w-[2px] rounded-full bg-[#14b8a6]" />
      </div>

      <div className="flex items-center gap-3 bg-surface-2 px-3 py-2">
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-[10px] uppercase text-ink-3">pearldental.in</span>
          <span className="block truncate text-[13px] font-semibold text-ink">Book your free scan</span>
        </span>
        <span className="shrink-0 rounded-md bg-line px-3 py-1.5 text-[12px] font-semibold text-ink">Book now</span>
      </div>

      <div className="flex items-center justify-between px-3 py-2 text-[11.5px] text-ink-3">
        <span className="flex items-center gap-1.5">
          <span className="flex -space-x-1">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877f2] text-white ring-2 ring-[color:var(--surface)]">
              <Icon d={PATHS.thumb} className="h-2.5 w-2.5" width={2.6} />
            </span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#f33e58] text-white ring-2 ring-[color:var(--surface)]">
              <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={PATHS.heart} />
              </svg>
            </span>
          </span>
          <span className="tabular-nums">{phase >= 1 ? '487' : '486'}</span>
        </span>
        <span>41 comments · 12 shares</span>
      </div>
    </div>
  );
}

/* ── LinkedIn: lead gen ad for a training academy ────────────── */

const CODE_LINES = [
  ['#7dd3fc', '42%'],
  ['#c4b5fd', '64%'],
  ['#86efac', '36%'],
  ['#fcd34d', '56%'],
  ['#7dd3fc', '28%'],
] as const;

export function LinkedInLeadAd() {
  const reduced = useReducedMotion();
  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-lg)]">
      <div className="flex items-center gap-2.5 px-3 pt-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0b1f3a] text-[14px] font-bold text-[#7dd3fc]">
          S
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold text-ink">Stackwise Academy</span>
          <span className="block text-[11px] text-ink-3">12,408 followers</span>
          <span className="block text-[11px] text-ink-3">Promoted</span>
        </span>
      </div>
      <p className="px-3 pb-2.5 pt-2 text-[12.5px] leading-snug text-ink">
        Our Kakkanad weekend batch starts 7 October. 12 weeks of hands-on DevOps, with placement
        support from 40+ hiring partners.
      </p>

      <div className="relative flex aspect-[2.4/1] items-center gap-3 overflow-hidden bg-[#0b1f3a] px-4">
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-bold leading-tight text-white">DevOps &amp; Cloud</p>
          <p className="mt-1 text-[11px] text-[#9fb3cc]">Weekend batch · Infopark, Kakkanad</p>
          <span className="mt-2 inline-block rounded bg-[#7dd3fc] px-1.5 py-0.5 text-[10px] font-bold text-[#0b1f3a]">
            Starts 7 Oct
          </span>
        </div>
        <div className="w-[44%] rounded-md border border-white/10 bg-[#0f2a4d] p-2">
          <div className="mb-1.5 flex gap-1">
            {['#f87171', '#fbbf24', '#4ade80'].map((c) => (
              <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          {CODE_LINES.map(([color, width], i) => (
            <motion.span
              key={i}
              className="mb-1 block h-[5px] rounded-full"
              style={{ background: color }}
              initial={reduced ? false : { width: 0 }}
              animate={{ width }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.35, ease: EASE }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 px-3 py-2.5">
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[13px] font-semibold text-ink">Weekend DevOps batch</span>
          <span className="block text-[11px] text-ink-3">stackwise.in</span>
        </span>
        <span className="shrink-0 rounded-full border border-[#0a66c2] px-3 py-1 text-[12px] font-semibold text-[#0a66c2] dark:border-[#71b7fb] dark:text-[#71b7fb]">
          Download brochure
        </span>
      </div>
    </div>
  );
}
