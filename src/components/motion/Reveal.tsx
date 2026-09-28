'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EASE = [0.16, 1, 0.3, 1] as const;

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

export interface RevealProps {
  children: ReactNode;
  /** Which way the element travels in from. */
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  /** Distance past the viewport edge before it fires. */
  margin?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'span';
}

/**
 * Single scroll-triggered entrance. Reduced-motion users get the final state
 * immediately rather than a shortened animation.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.62,
  className,
  margin = '-72px 0px',
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = offsets[direction];
  const Tag = motion[as];

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export interface StaggerProps {
  children: ReactNode;
  className?: string;
  margin?: string;
  as?: 'div' | 'ul' | 'ol' | 'section';
}

/** Parent that walks its RevealItem children in one after another. */
export function Stagger({ children, className, margin = '-64px 0px', as = 'div' }: StaggerProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
    >
      {children}
    </Tag>
  );
}

export interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

/** Child of <Stagger>. Inherits the parent's timing. */
export function RevealItem({ children, className, as = 'div' }: RevealItemProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className} variants={childVariants}>
      {children}
    </Tag>
  );
}
