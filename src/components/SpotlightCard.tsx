import type { ReactNode } from 'react';

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}

/** Static card wrapper. */
export function SpotlightCard({ children, className = '', as: Tag = 'div' }: SpotlightCardProps) {
  return <Tag className={className}>{children}</Tag>;
}
