'use client';

import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Spinner for actions that are working. Inherits colour and size from text. */
export function Spinner({ className = '' }: { className?: string }) {
  return <span className={`loader-ring ${className}`} role="presentation" aria-hidden="true" />;
}

/**
 * Three bouncing dots. Used where a spinner would read as "something is wrong"
 * rather than "something is being written" — the AI answer, mostly.
 */
export function ThinkingDots({ className = '' }: { className?: string }) {
  return (
    <span className={`loader-dots inline-flex items-center ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

/** Shimmering placeholder block. Width and height come from the caller. */
export function Skeleton({ className = '' }: { className?: string }) {
  return <span className={`skeleton block ${className}`} aria-hidden="true" />;
}

/**
 * Placeholder shaped like one enquiry row, so the panel does not jump when the
 * real rows arrive.
 */
export function SkeletonRow() {
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg border border-line bg-surface-2 px-2.5 py-2"
      aria-hidden="true"
    >
      <Skeleton className="h-7 w-7 shrink-0 rounded-md" />
      <span className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-2.5 w-1/2 rounded-full" />
        <Skeleton className="h-2 w-3/4 rounded-full" />
      </span>
      <Skeleton className="h-4 w-11 shrink-0 rounded-full" />
    </div>
  );
}

/**
 * Wraps a value that arrives after a beat: shows a shimmering bar of the same
 * height, then cross-fades to the real thing.
 */
export function LoadingSwap({
  loading,
  skeleton,
  children,
}: {
  loading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
}) {
  if (loading) return <>{skeleton}</>;
  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="block"
    >
      {children}
    </motion.span>
  );
}
