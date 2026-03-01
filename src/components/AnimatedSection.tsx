'use client';

import { motion } from 'framer-motion';
import type { AnimationConfig } from '@/types';
import { useAnimation } from '@/hooks/useAnimation';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  /** Animation configuration. Defaults to fadeIn with scroll trigger. */
  animation?: Partial<AnimationConfig>;
  /** HTML tag to render. Defaults to 'div'. */
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'span';
  /** Additional CSS class names. */
  className?: string;
  /** Whether to respect prefers-reduced-motion. Defaults to true. */
  respectReducedMotion?: boolean;
}

/**
 * Reusable wrapper component that applies framer-motion animations
 * triggered by Intersection Observer when elements enter the viewport.
 *
 * Uses only CSS transform and opacity for GPU acceleration (Req 6.4).
 * Supports all animation types: fadeIn, slideUp, slideLeft, scaleIn,
 * parallax, typewriter, morphing (Req 6.2).
 */
export function AnimatedSection({
  children,
  animation,
  as = 'div',
  className,
  respectReducedMotion = true,
}: AnimatedSectionProps) {
  const { ref, initial, animate, transition } = useAnimation({
    ...animation,
    respectReducedMotion,
  });

  const MotionComponent = motion.create(as);

  return (
    <MotionComponent
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
