import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createAnimationEngine,
  getAnimationVariant,
  DEFAULT_ANIMATION_CONFIG,
  prefersReducedMotion,
} from '@/lib/animation-engine';
import type { AnimationConfig } from '@/types';

// =============================================================================
// Mock IntersectionObserver
// =============================================================================

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: IntersectionCallback | null = null;
let observerOptions: IntersectionObserverInit | undefined;
const observeMock = vi.fn();
const unobserveMock = vi.fn();
const disconnectMock = vi.fn();

class MockIntersectionObserver {
  constructor(callback: IntersectionCallback, options?: IntersectionObserverInit) {
    observerCallback = callback;
    observerOptions = options;
  }
  observe = observeMock;
  unobserve = unobserveMock;
  disconnect = disconnectMock;
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// Default matchMedia mock (no reduced motion)
vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));

function makeConfig(overrides: Partial<AnimationConfig> = {}): AnimationConfig {
  return { ...DEFAULT_ANIMATION_CONFIG, ...overrides };
}

function createElement(): HTMLElement {
  const el = document.createElement('div');
  return el;
}

// =============================================================================
// getAnimationVariant tests
// =============================================================================

describe('getAnimationVariant', () => {
  const animationTypes: AnimationConfig['type'][] = [
    'fadeIn', 'slideUp', 'slideLeft', 'scaleIn', 'parallax', 'typewriter', 'morphing',
  ];

  it.each(animationTypes)('returns initial and animate states for %s', (type) => {
    const variant = getAnimationVariant(type);
    expect(variant).toHaveProperty('initial');
    expect(variant).toHaveProperty('animate');
    expect(typeof variant.initial).toBe('object');
    expect(typeof variant.animate).toBe('object');
  });

  it('fadeIn uses only opacity', () => {
    const v = getAnimationVariant('fadeIn');
    expect(v.initial).toEqual({ opacity: 0 });
    expect(v.animate).toEqual({ opacity: 1 });
  });

  it('slideUp uses opacity and y transform', () => {
    const v = getAnimationVariant('slideUp');
    expect(v.initial.opacity).toBe(0);
    expect(v.initial.y).toBeDefined();
    expect(v.animate.opacity).toBe(1);
    expect(v.animate.y).toBe(0);
  });

  it('slideLeft uses opacity and x transform', () => {
    const v = getAnimationVariant('slideLeft');
    expect(v.initial.opacity).toBe(0);
    expect(v.initial.x).toBeDefined();
    expect(v.animate.opacity).toBe(1);
    expect(v.animate.x).toBe(0);
  });

  it('scaleIn uses opacity and scale transform', () => {
    const v = getAnimationVariant('scaleIn');
    expect(v.initial.opacity).toBe(0);
    expect(v.initial.scale).toBeDefined();
    expect(v.animate.opacity).toBe(1);
    expect(v.animate.scale).toBe(1);
  });
});

// =============================================================================
// createAnimationEngine tests
// =============================================================================

describe('createAnimationEngine', () => {
  beforeEach(() => {
    observerCallback = null;
    observerOptions = undefined;
    observeMock.mockClear();
    unobserveMock.mockClear();
    disconnectMock.mockClear();
  });

  it('implements all AnimationEngineAPI methods', () => {
    const engine = createAnimationEngine();
    expect(typeof engine.registerElement).toBe('function');
    expect(typeof engine.unregisterElement).toBe('function');
    expect(typeof engine.triggerAnimation).toBe('function');
    expect(typeof engine.pauseAll).toBe('function');
    expect(typeof engine.resumeAll).toBe('function');
  });

  describe('registerElement', () => {
    it('registers an element and creates an IntersectionObserver', () => {
      const engine = createAnimationEngine();
      const el = createElement();
      const config = makeConfig({ threshold: 0.5 });

      engine.registerElement(el, config);

      expect(engine.getRegisteredElements().has(el)).toBe(true);
      expect(observeMock).toHaveBeenCalledWith(el);
      expect(observerOptions?.threshold).toBe(0.5);
    });

    it('applies initial styles to the element', () => {
      const engine = createAnimationEngine();
      const el = createElement();
      const config = makeConfig({ type: 'fadeIn' });

      engine.registerElement(el, config);

      expect(el.style.opacity).toBe('0');
      expect(el.style.willChange).toBe('transform, opacity');
    });

    it('does not create observer when triggerOnScroll is false', () => {
      const engine = createAnimationEngine();
      const el = createElement();
      const config = makeConfig({ triggerOnScroll: false });

      observeMock.mockClear();
      engine.registerElement(el, config);

      expect(engine.getRegisteredElements().has(el)).toBe(true);
      // Observer should not be created for non-scroll elements
      expect(observeMock).not.toHaveBeenCalled();
    });

    it('cleans up previous observer when re-registering', () => {
      const engine = createAnimationEngine();
      const el = createElement();
      const config = makeConfig();

      engine.registerElement(el, config);
      engine.registerElement(el, makeConfig({ type: 'slideUp' }));

      expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('unregisterElement', () => {
    it('removes element and disconnects observer', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      engine.registerElement(el, makeConfig());
      engine.unregisterElement(el);

      expect(engine.getRegisteredElements().has(el)).toBe(false);
      expect(disconnectMock).toHaveBeenCalled();
    });

    it('does nothing for unregistered elements', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      // Should not throw
      engine.unregisterElement(el);
      expect(engine.getRegisteredElements().size).toBe(0);
    });
  });

  describe('triggerAnimation', () => {
    it('applies animate styles to a registered element', () => {
      const engine = createAnimationEngine();
      const el = createElement();
      const config = makeConfig({ type: 'fadeIn', duration: 500, delay: 100 });

      engine.registerElement(el, config);
      engine.triggerAnimation(el);

      expect(el.style.opacity).toBe('1');
    });

    it('does nothing when engine is paused', () => {
      const engine = createAnimationEngine();
      const el = createElement();
      const config = makeConfig({ type: 'fadeIn' });

      engine.registerElement(el, config);
      engine.pauseAll();
      engine.triggerAnimation(el);

      // Should still have initial opacity since paused
      expect(el.style.opacity).toBe('0');
    });

    it('does nothing for unregistered elements', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      // Should not throw
      engine.triggerAnimation(el);
    });
  });

  describe('pauseAll / resumeAll', () => {
    it('pauses and resumes the engine', () => {
      const engine = createAnimationEngine();

      expect(engine.isPaused()).toBe(false);
      engine.pauseAll();
      expect(engine.isPaused()).toBe(true);
      engine.resumeAll();
      expect(engine.isPaused()).toBe(false);
    });

    it('prevents animations from triggering when paused', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      engine.registerElement(el, makeConfig({ type: 'slideUp' }));
      engine.pauseAll();
      engine.triggerAnimation(el);

      // Element should still have initial styles
      expect(el.style.opacity).toBe('0');
    });

    it('allows animations after resuming', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      engine.registerElement(el, makeConfig({ type: 'fadeIn' }));
      engine.pauseAll();
      engine.triggerAnimation(el);
      expect(el.style.opacity).toBe('0');

      engine.resumeAll();
      engine.triggerAnimation(el);
      expect(el.style.opacity).toBe('1');
    });
  });

  describe('Intersection Observer callback', () => {
    it('triggers animation when element enters viewport', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      engine.registerElement(el, makeConfig({ type: 'fadeIn' }));

      // Simulate intersection
      expect(observerCallback).not.toBeNull();
      observerCallback!([
        { isIntersecting: true, target: el } as unknown as IntersectionObserverEntry,
      ]);

      expect(el.style.opacity).toBe('1');
    });

    it('does not trigger when element is not intersecting', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      engine.registerElement(el, makeConfig({ type: 'fadeIn' }));

      observerCallback!([
        { isIntersecting: false, target: el } as unknown as IntersectionObserverEntry,
      ]);

      expect(el.style.opacity).toBe('0');
    });

    it('does not trigger when engine is paused', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      engine.registerElement(el, makeConfig({ type: 'fadeIn' }));
      engine.pauseAll();

      observerCallback!([
        { isIntersecting: true, target: el } as unknown as IntersectionObserverEntry,
      ]);

      expect(el.style.opacity).toBe('0');
    });
  });
});

// =============================================================================
// DEFAULT_ANIMATION_CONFIG tests
// =============================================================================

describe('DEFAULT_ANIMATION_CONFIG', () => {
  it('has sensible defaults', () => {
    expect(DEFAULT_ANIMATION_CONFIG.type).toBe('fadeIn');
    expect(DEFAULT_ANIMATION_CONFIG.duration).toBeGreaterThan(0);
    expect(DEFAULT_ANIMATION_CONFIG.triggerOnScroll).toBe(true);
    expect(DEFAULT_ANIMATION_CONFIG.threshold).toBeGreaterThanOrEqual(0);
    expect(DEFAULT_ANIMATION_CONFIG.threshold).toBeLessThanOrEqual(1);
  });
});

// =============================================================================
// prefersReducedMotion helper tests
// =============================================================================

describe('prefersReducedMotion', () => {
  it('returns false when matchMedia reports no-preference', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    expect(prefersReducedMotion()).toBe(false);
  });

  it('returns true when matchMedia reports reduce', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    expect(prefersReducedMotion()).toBe(true);
  });
});

// =============================================================================
// createAnimationEngine reduced-motion tests
// =============================================================================

describe('createAnimationEngine with prefers-reduced-motion', () => {
  const animationTypes: AnimationConfig['type'][] = [
    'fadeIn', 'slideUp', 'slideLeft', 'scaleIn', 'parallax', 'typewriter', 'morphing',
  ];

  beforeEach(() => {
    observerCallback = null;
    observerOptions = undefined;
    observeMock.mockClear();
    unobserveMock.mockClear();
    disconnectMock.mockClear();
  });

  describe('when reduced motion is enabled', () => {
    beforeEach(() => {
      vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    });

    afterEach(() => {
      vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    });

    it('isReducedMotion returns true', () => {
      const engine = createAnimationEngine();
      expect(engine.isReducedMotion()).toBe(true);
    });

    it.each(animationTypes)(
      'registerElement applies final state immediately for %s (no transition)',
      (type) => {
        const engine = createAnimationEngine();
        const el = createElement();
        const config = makeConfig({ type, duration: 1000, delay: 500 });

        engine.registerElement(el, config);

        // Should have no transition
        expect(el.style.transition).toBe('none');
        // Should show final opacity (1)
        expect(el.style.opacity).toBe('1');
      }
    );

    it('triggerAnimation applies final state with no transition', () => {
      const engine = createAnimationEngine();
      const el = createElement();
      const config = makeConfig({ type: 'slideUp', duration: 800 });

      engine.registerElement(el, config);
      engine.triggerAnimation(el);

      expect(el.style.transition).toBe('none');
      expect(el.style.opacity).toBe('1');
    });

    it('does not set will-change on registered elements', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      engine.registerElement(el, makeConfig({ type: 'fadeIn' }));

      expect(el.style.willChange).toBe('auto');
    });
  });

  describe('when reduced motion is NOT enabled', () => {
    beforeEach(() => {
      vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    });

    it('isReducedMotion returns false', () => {
      const engine = createAnimationEngine();
      expect(engine.isReducedMotion()).toBe(false);
    });

    it('registerElement applies initial hidden state', () => {
      const engine = createAnimationEngine();
      const el = createElement();

      engine.registerElement(el, makeConfig({ type: 'fadeIn' }));

      expect(el.style.opacity).toBe('0');
      expect(el.style.willChange).toBe('transform, opacity');
    });

    it('triggerAnimation applies animation styles to element', () => {
      const engine = createAnimationEngine();
      const el = createElement();
      const config = makeConfig({ type: 'fadeIn', duration: 600, delay: 100 });

      engine.registerElement(el, config);
      // After register, element should be in initial state
      expect(el.style.opacity).toBe('0');

      engine.triggerAnimation(el);

      // After triggering, the element should have the final animated opacity
      expect(el.style.opacity).toBe('1');
    });
  });
});
