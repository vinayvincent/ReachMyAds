import { brandLogos, type BrandKey } from '@/lib/brand-logos';

export interface BrandLogoProps {
  brand: BrandKey;
  className?: string;
  /** Draw in the official brand colour instead of inheriting currentColor. */
  colored?: boolean;
}

/** TikTok and X are officially black, which disappears on a dark ground. */
const MONOCHROME_BRANDS = new Set<BrandKey>(['tiktok', 'x']);

/**
 * Renders an official platform logo. Decorative by default — the platform name
 * is always shown as text alongside, so the mark itself stays aria-hidden.
 */
export function BrandLogo({ brand, className = 'h-6 w-6', colored = true }: BrandLogoProps) {
  const logo = brandLogos[brand];

  // The black marks follow --ink instead, so they invert with the theme.
  const usesInk = colored && MONOCHROME_BRANDS.has(brand);

  return (
    <svg
      role="img"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={usesInk ? `${className} text-ink` : className}
      fill={colored && !usesInk ? `#${logo.hex}` : 'currentColor'}
    >
      <path d={logo.path} />
    </svg>
  );
}

export { brandLogos };
export type { BrandKey };
