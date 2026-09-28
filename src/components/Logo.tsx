import type { CSSProperties } from 'react';
import {
  LOADER_VIEWBOX,
  LOGO_BOX,
  LOGO_VIEWBOX,
  MARK_CENTER,
  MARK_DOT,
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

function MarkShapes() {
  return (
    <>
      <path
        d={MARK_STROKE}
        fill="none"
        stroke="currentColor"
        strokeWidth={MARK_STROKE_WIDTH}
        strokeLinecap="round"
      />
      <circle cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} fill="currentColor" />
    </>
  );
}

/**
 * The mark with its motion hooks: the stroke redraws, the dot lands and a
 * ring goes out from it, then it holds still for most of the cycle. Timing
 * lives in globals.css under "Header logo motion".
 */
function AnimatedMarkShapes() {
  return (
    <>
      <path className="logo-anim__stroke" pathLength={100} d={MARK_STROKE} />
      <circle className="logo-anim__ring" cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} />
      <circle className="logo-anim__dot" cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} />
    </>
  );
}

/**
 * The full Reach My Ads lockup: mark plus wordmark.
 *
 * Drawn in `currentColor` and coloured by the `text-logo` token, which is the
 * brand navy on light pages and white on dark ones. Size it by height only;
 * the width follows from the artwork's proportions.
 *
 * `animated` makes the mark replay its draw every few seconds. The wordmark
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
      {animated ? <AnimatedMarkShapes /> : <MarkShapes />}
      <path d={WORDMARK_PATH} fill="currentColor" />
    </svg>
  );
}

/** The mark on its own, for tight spaces. */
export function LogoMark({ className = 'h-8 w-8', title }: BrandSvgProps) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      width={92}
      height={92}
      className={`block shrink-0 text-logo ${className}`}
      focusable="false"
      {...a11y(title)}
    >
      <MarkShapes />
    </svg>
  );
}

/**
 * The looping loader: the stroke rises, the dot lands and sends out two
 * rings, then the whole mark clears and repeats. Used while a route loads.
 */
export function LoaderMark({ className = 'h-auto w-20' }: { className?: string }) {
  return (
    <svg
      viewBox={LOADER_VIEWBOX}
      width={184}
      height={184}
      className={`brand-loader text-logo ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path className="brand-loader__stroke" pathLength={100} d={MARK_STROKE} />
      <circle className="brand-loader__ring" cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} />
      <circle
        className="brand-loader__ring brand-loader__ring--late"
        cx={MARK_DOT.cx}
        cy={MARK_DOT.cy}
        r={MARK_DOT.r}
      />
      <circle className="brand-loader__dot" cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} />
    </svg>
  );
}

/** Where the mark starts in the intro: centred on the lockup, and larger. */
const INTRO_START = {
  x: LOGO_BOX.x + LOGO_BOX.width / 2,
  scale: 1.6,
};

/**
 * The brand intro, as in the launch video: the mark draws itself in the
 * middle, sends out its rings, slides into place, and the name rises in
 * letter by letter. The rings keep pulsing if the page is still loading.
 * CSS-only, so it plays before any JavaScript has arrived.
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
        <path className="logo-intro__stroke" pathLength={100} d={MARK_STROKE} />
        <circle className="logo-intro__ring" cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} />
        <circle
          className="logo-intro__ring logo-intro__ring--late"
          cx={MARK_DOT.cx}
          cy={MARK_DOT.cy}
          r={MARK_DOT.r}
        />
        <circle className="logo-intro__dot" cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} />
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
