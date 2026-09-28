import type { ReactNode } from 'react';

export interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  /** Kept for API compatibility. The button no longer follows the cursor. */
  strength?: number;
  ariaLabel?: string;
}

/** Plain link styled as a button. */
export function MagneticButton({ children, href, className = '', ariaLabel }: MagneticButtonProps) {
  return (
    <a href={href} aria-label={ariaLabel} className={className}>
      {children}
    </a>
  );
}
