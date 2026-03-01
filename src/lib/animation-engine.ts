import type { AnimationConfig, AnimationEngineAPI } from '@/types';

// =============================================================================
// Animation Variants (CSS transform + opacity only for GPU acceleration)
// =============================================================================

export interface AnimationVariant {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
}

/**
 * Returns framer-motion-compatible initial/animate states for each animation type.
 * Uses only transform and opacity properties for GPU acceleration (Req 6.4).
 */
export function getAnimationVariant(type: AnimationConfig['type']): AnimationVariant {
  switch (type) {
    case 'fadeIn':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };
    case 'slideUp':
      return {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
      };
    case 'slideLeft':
      return {
        initial: { opacity: 0, x: 60 },
        animate: { opacity: 1, x: 0 },
      };
    case 'scaleIn':
      return {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
      };
    case 'parallax':
      return {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
      };
    case 'typewriter':
      return {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
      };
    case 'morphing':
      return {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
      };
  }
}

// =============================================================================
// Default animation config
// =============================================================================

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  type: 'fadeIn',
  duration: 600,
  delay: 0,
  easing: 'easeOut',
  triggerOnScroll: true,
  threshold: 0.1,
};

// =============================================================================
// Reduced-motion detection helper
// =============================================================================

/**
 * Returns true when the user has enabled prefers-reduced-motion in their OS.
 * Safe to call in non-browser environments (returns false).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// =============================================================================
// Animation Engine (Intersection Observer based)
// =============================================================================

interface RegisteredElement {
  config: AnimationConfig;
  observer: IntersectionObserver | null;
  triggered: boolean;
}

/**
 * Creates an AnimationEngine instance that manages scroll-triggered animations
 * using Intersection Observer with configurable thresholds (Req 6.1, 6.5).
 *
 * Supports: fadeIn, slideUp, slideLeft, scaleIn, parallax, typewriter, morphing (Req 6.2).
 * Uses only CSS transform and opacity for GPU acceleration (Req 6.4).
 * Respects prefers-reduced-motion: sets duration to 0 and skips animations (Req 6.3).
 */
export function createAnimationEngine(): AnimationEngineAPI & {
  getRegisteredElements(): Map<HTMLElement, RegisteredElement>;
  isPaused(): boolean;
  isReducedMotion(): boolean;
} {
  const elements = new Map<HTMLElement, RegisteredElement>();
  let paused = false;
  const reducedMotion = prefersReducedMotion();

  function applyInitialStyles(el: HTMLElement, config: AnimationConfig): void {
    // When reduced motion is enabled, jump straight to the final state (Req 6.3)
    if (reducedMotion) {
      applyFinalStyles(el, config);
      return;
    }

    const variant = getAnimationVariant(config.type);
    el.style.willChange = 'transform, opacity';
    el.style.transition = 'none';

    if (variant.initial.opacity !== undefined) {
      el.style.opacity = String(variant.initial.opacity);
    }
    if (variant.initial.y !== undefined) {
      el.style.transform = `translateY(${variant.initial.y}px)`;
    } else if (variant.initial.x !== undefined) {
      el.style.transform = `translateX(${variant.initial.x}px)`;
    } else if (variant.initial.scale !== undefined) {
      el.style.transform = `scale(${variant.initial.scale})`;
    }
  }

  /** Apply the final visible state with no transition (for reduced motion). */
  function applyFinalStyles(el: HTMLElement, config: AnimationConfig): void {
    const variant = getAnimationVariant(config.type);
    el.style.transition = 'none';
    el.style.willChange = 'auto';

    if (variant.animate.opacity !== undefined) {
      el.style.opacity = String(variant.animate.opacity);
    }
    if (variant.animate.y !== undefined) {
      el.style.transform = `translateY(${variant.animate.y}px)`;
    } else if (variant.animate.x !== undefined) {
      el.style.transform = `translateX(${variant.animate.x}px)`;
    } else if (variant.animate.scale !== undefined) {
      el.style.transform = `scale(${variant.animate.scale})`;
    } else {
      el.style.transform = 'none';
    }
  }

  function applyAnimateStyles(el: HTMLElement, config: AnimationConfig): void {
    // When reduced motion is enabled, apply final state instantly (Req 6.3)
    if (reducedMotion) {
      applyFinalStyles(el, config);
      return;
    }

    const variant = getAnimationVariant(config.type);
    const durationSec = config.duration / 1000;
    const delaySec = config.delay / 1000;

    el.style.transition = `transform ${durationSec}s ${config.easing} ${delaySec}s, opacity ${durationSec}s ${config.easing} ${delaySec}s`;

    if (variant.animate.opacity !== undefined) {
      el.style.opacity = String(variant.animate.opacity);
    }
    if (variant.animate.y !== undefined) {
      el.style.transform = `translateY(${variant.animate.y}px)`;
    } else if (variant.animate.x !== undefined) {
      el.style.transform = `translateX(${variant.animate.x}px)`;
    } else if (variant.animate.scale !== undefined) {
      el.style.transform = `scale(${variant.animate.scale})`;
    } else {
      el.style.transform = 'none';
    }
  }

  function createObserver(
    el: HTMLElement,
    config: AnimationConfig
  ): IntersectionObserver {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !paused) {
            const registered = elements.get(el);
            if (registered && !registered.triggered) {
              registered.triggered = true;
              applyAnimateStyles(el, config);
              observer.unobserve(el);
            }
          }
        }
      },
      { threshold: config.threshold }
    );
    return observer;
  }

  const engine: AnimationEngineAPI & {
    getRegisteredElements(): Map<HTMLElement, RegisteredElement>;
    isPaused(): boolean;
    isReducedMotion(): boolean;
  } = {
    registerElement(el: HTMLElement, config: AnimationConfig): void {
      // Clean up if already registered
      const existing = elements.get(el);
      if (existing?.observer) {
        existing.observer.disconnect();
      }

      applyInitialStyles(el, config);

      let observer: IntersectionObserver | null = null;
      if (config.triggerOnScroll) {
        observer = createObserver(el, config);
        observer.observe(el);
      }

      elements.set(el, { config, observer, triggered: false });
    },

    unregisterElement(el: HTMLElement): void {
      const registered = elements.get(el);
      if (registered) {
        if (registered.observer) {
          registered.observer.disconnect();
        }
        elements.delete(el);
      }
    },

    triggerAnimation(el: HTMLElement): void {
      const registered = elements.get(el);
      if (registered && !paused) {
        registered.triggered = true;
        applyAnimateStyles(el, registered.config);
        if (registered.observer) {
          registered.observer.unobserve(el);
        }
      }
    },

    pauseAll(): void {
      paused = true;
    },

    resumeAll(): void {
      paused = false;
    },

    getRegisteredElements() {
      return elements;
    },

    isPaused() {
      return paused;
    },

    isReducedMotion() {
      return reducedMotion;
    },
  };

  return engine;
}
