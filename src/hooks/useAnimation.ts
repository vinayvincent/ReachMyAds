'use client';

import { useRef, useEffect, useState } from 'react';
import type { AnimationConfig } from '@/types';
import { getAnimationVariant, DEFAULT_ANIMATION_CONFIG } from '@/lib/animation-engine';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { TargetAndTransition, Easing } from 'framer-motion';

export interface UseAnimationOptions extends Partial<AnimationConfig> {
  /** Whether to respect prefers-reduced-motion. Defaults to true. */
  respectReducedMotion?: boolean;
}

export interface UseAnimationResult {
  ref: React.RefObject<HTMLDivElement | null>;
  initial: TargetAndTransition | false;
  animate: TargetAndTransition;
  transition: {
    duration: number;
    delay: number;
    ease: Easing;
  };
  isInView: boolean;
}

/**
 * React hook that provides framer-motion animation props driven by
 * Intersection Observer for scroll-triggered animations.
 *
 * Uses `initial={false}` so content is visible on first paint (SSR-safe),
 * then applies entrance animations when the element scrolls into view.
 */
export function useAnimation(options: UseAnimationOptions = {}): UseAnimationResult {
  const config: AnimationConfig = {
    ...DEFAULT_ANIMATION_CONFIG,
    ...options,
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(!config.triggerOnScroll);

  const osReducedMotion = useReducedMotion();
  const prefersReducedMotion =
    options.respectReducedMotion !== false && osReducedMotion;

  useEffect(() => {
    if (!config.triggerOnScroll || !ref.current) {
      return;
    }

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(el);
          }
        }
      },
      { threshold: config.threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.triggerOnScroll, config.threshold]);

  const variant = getAnimationVariant(config.type);
  const duration = prefersReducedMotion ? 0 : config.duration / 1000;
  const delay = prefersReducedMotion ? 0 : config.delay / 1000;

  // Always use initial=false: content is visible on first paint (SSR-safe),
  // and framer-motion plays animations from the animate state directly.
  return {
    ref,
    initial: false,
    animate: isInView ? variant.animate : variant.initial,
    transition: {
      duration,
      delay,
      ease: config.easing as Easing,
    },
    isInView,
  };
}
