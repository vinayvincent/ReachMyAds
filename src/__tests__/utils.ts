import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

/**
 * Custom render function that wraps components with any needed providers.
 * Extend this as the app grows (e.g., add theme, auth, or store providers).
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

export { render, screen, waitFor, within } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
