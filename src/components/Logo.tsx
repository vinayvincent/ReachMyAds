import type { CSSProperties } from 'react';
import {
  LOGO_BOX,
  LOGO_VIEWBOX,
  MARK_BOX,
  MARK_CENTER,
  MARK_STROKE,
  MARK_STROKE_WIDTH,
  MARK_VIEWBOX,
  WORDMARK_LETTERS,
  WORDMARK_PATH,
} from '@/lib/brand';

interface BrandSvgProps {
  className?: string;
  /**
   * Accessible name. Leave it out when the logo sits inside a link or button
   * that is already labelled, so screen readers don't hear the name twice.
   */
  title?: string;
}

/** Shared a11y attributes: named image when titled, decoration otherwise. */
function a11y(title?: string) {
  return title
    ? ({ role: 'img', 'aria-label': title } as const)
    : ({ 'aria-hidden': true } as const);
}

/**
 * The mark's single stroke. Pass a class to animate it: the motion classes in
 * globals.css draw it on with stroke-dasharray, so it is measured in
 * `pathLength` units of 100.
 */
function MarkStroke({ className }: { className?: string }) {
  return (
    <path
      className={className}
      pathLength={className ? 100 : undefined}
      d={MARK_STROKE}
      fill="none"
      stroke="currentColor"
      strokeWidth={MARK_STROKE_WIDTH}
      strokeLinecap="round"
    />
  );
}

/**
 * The full Reach My Ads lockup: mark plus wordmark.
 *
 * Drawn in `currentColor` and coloured by the `text-logo` token, which is the
 * brand navy on light pages and white on dark ones. Size it by height only;
 * the width follows from the artwork's proportions.
 *
 * `animated` makes the mark redraw itself every few seconds. The wordmark
 * always stays put, so the name is readable at every moment.
 */
export function Logo({
  className = 'h-8 w-auto',
  title,
  animated = false,
}: BrandSvgProps & { animated?: boolean }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      width={LOGO_BOX.width}
      height={LOGO_BOX.height}
      className={`block shrink-0 overflow-visible text-logo ${animated ? 'logo-anim' : ''} ${className}`}
      focusable="false"
      {...a11y(title)}
    >
      <MarkStroke className={animated ? 'logo-anim__stroke' : undefined} />
      <path d={WORDMARK_PATH} fill="currentColor" />
    </svg>
  );
}

/** The mark on its own, for tight spaces. */
export function LogoMark({ className = 'h-8 w-auto', title }: BrandSvgProps) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      width={MARK_BOX.width}
      height={MARK_BOX.height}
      className={`block shrink-0 text-logo ${className}`}
      focusable="false"
      {...a11y(title)}
    >
      <MarkStroke />
    </svg>
  );
}

/**
 * The looping loader: the mark draws itself from the foot of the stem, holds,
 * then withdraws into the tip of the arm and repeats. Used while a route loads.
 */
export function LoaderMark({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      width={MARK_BOX.width}
      height={MARK_BOX.height}
      className={`brand-loader text-logo ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <MarkStroke className="brand-loader__stroke" />
    </svg>
  );
}

/** Where the mark starts in the intro: centred on the lockup, and larger. */
const INTRO_START = {
  x: LOGO_BOX.x + LOGO_BOX.width / 2,
  scale: 1.6,
};

/**
 * The brand intro: the mark draws itself in the middle, as in the logo pack,
 * slides into place, and the name rises in letter by letter. CSS-only, so it
 * plays before any JavaScript has arrived.
 */
export function LogoIntro({ className = 'h-auto w-72' }: { className?: string }) {
  const markStyle = {
    '--intro-from': `translate(${INTRO_START.x}px, ${MARK_CENTER.y}px) scale(${INTRO_START.scale}) translate(${-MARK_CENTER.x}px, ${-MARK_CENTER.y}px)`,
    '--intro-to': `translate(${MARK_CENTER.x}px, ${MARK_CENTER.y}px) scale(1) translate(${-MARK_CENTER.x}px, ${-MARK_CENTER.y}px)`,
  } as CSSProperties;

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      width={LOGO_BOX.width}
      height={LOGO_BOX.height}
      className={`logo-intro overflow-visible text-logo ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Letters rise from behind this edge rather than fading in from nowhere. */}
        <clipPath id="logo-intro-clip">
          <rect x={140} y={20} width={560} height={116} />
        </clipPath>
      </defs>

      <g className="logo-intro__mark" style={markStyle}>
        <MarkStroke className="logo-intro__stroke" />
      </g>

      <g clipPath="url(#logo-intro-clip)">
        {WORDMARK_LETTERS.map((d, i) => (
          <path
            key={i}
            className="logo-intro__letter"
            style={{ animationDelay: `${(1.55 + i * 0.035).toFixed(3)}s` }}
            d={d}
          />
        ))}
      </g>
    </svg>
  );
}
