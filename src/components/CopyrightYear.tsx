'use client';

import { useState, useEffect } from 'react';

/**
 * A hydration-safe copyright year component.
 * Renders nothing on the server to ensure perfect consistency during hydration,
 * then displays the current year once the client has mounted.
 */
export function CopyrightYear() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a stable placeholder or null during SSR to avoid mismatch.
    // Using a span with the standard year ensures the layout doesn't shift much.
    return <span suppressHydrationWarning>2026</span>;
  }

  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
