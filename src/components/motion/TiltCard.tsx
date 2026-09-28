import type { ReactNode } from 'react';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility. The card no longer tilts. */
  max?: number;
  spotlight?: boolean;
}

/** Static card wrapper. */
export function TiltCard({ children, className = '' }: TiltCardProps) {
  return <div className={className}>{children}</div>;
}
