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
 * Uses `initial={false}` during SSR so content is visible on first paint,
 * then applies entrance animations after hydration on the client.
 */
export function useAnimation(options: UseAnimationOptions = {}): UseAnimationResult {
  const config: AnimationConfig = {
    ...DEFAULT_ANIMATION_CONFIG,
    ...options,
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isInView, setIsInView] = useState(!config.triggerOnScroll);

  const osReducedMotion = useReducedMotion();
  const prefersReducedMotion =
    options.respectReducedMotion !== false && osReducedMotion;

  // Track client mount so we don't render opacity:0 during SSR
  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  // During SSR or before mount: use `false` so framer-motion renders
  // the animate state directly (content visible on first paint).
  // After mount: use the real initial state so animations can play.
  const initial: TargetAndTransition | false = !hasMounted || prefersReducedMotion
    ? false
    : variant.initial;

  return {
    ref,
    initial,
    animate: isInView ? variant.animate : (hasMounted ? variant.initial : variant.animate),
    transition: {
      duration,
      delay,
      ease: config.easing as Easing,
    },
    isInView,
  };
}
