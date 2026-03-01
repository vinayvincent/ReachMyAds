import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

describe('useReducedMotion', () => {
  let listeners: Map<string, (event: MediaQueryListEvent) => void>;
  let matchesValue: boolean;

  function createMockMatchMedia(matches: boolean) {
    matchesValue = matches;
    listeners = new Map();
    return vi.fn().mockImplementation((query: string) => ({
      matches: matchesValue,
      media: query,
      addEventListener: vi.fn((_event: string, handler: (event: MediaQueryListEvent) => void) => {
        listeners.set(_event, handler);
      }),
      removeEventListener: vi.fn((_event: string) => {
        listeners.delete(_event);
      }),
    }));
  }

  beforeEach(() => {
    vi.stubGlobal('matchMedia', createMockMatchMedia(false));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when prefers-reduced-motion is not set', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when prefers-reduced-motion: reduce is active', () => {
    vi.stubGlobal('matchMedia', createMockMatchMedia(true));
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates when the media query changes', () => {
    vi.stubGlobal('matchMedia', createMockMatchMedia(false));
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    // Simulate the user toggling reduced motion on
    act(() => {
      const handler = listeners.get('change');
      if (handler) {
        handler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });

  it('cleans up the event listener on unmount', () => {
    const removeEventListenerMock = vi.fn();
    const mockMql = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerMock,
    };
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mockMql));

    const { unmount } = renderHook(() => useReducedMotion());
    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
