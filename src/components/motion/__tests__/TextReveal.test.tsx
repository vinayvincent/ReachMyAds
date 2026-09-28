import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TextReveal } from '@/components/motion/TextReveal';

describe('TextReveal', () => {
  it('keeps the accessible name intact despite splitting the text per word', () => {
    render(<TextReveal as="h2" text="Nine platforms. One request." />);

    // Word separators live outside each clipping box precisely so this name
    // survives the split. Query by name to exercise that computation rather
    // than the raw text content.
    expect(
      screen.getByRole('heading', { level: 2, name: 'Nine platforms. One request.' }),
    ).toBeInTheDocument();
  });

  it('can be referenced by aria-labelledby', () => {
    render(
      <section aria-labelledby="probe-heading">
        <TextReveal as="h2" id="probe-heading" text="Never lose an enquiry again" />
      </section>,
    );

    expect(
      screen.getByRole('region', { name: 'Never lose an enquiry again' }),
    ).toBeInTheDocument();
  });

  it('renders the text exactly once, so copy and paste is not duplicated', () => {
    render(<TextReveal as="h2" text="Four steps" />);
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Four steps');
  });

  it('accents only the requested words, ignoring punctuation and case', () => {
    const { container } = render(
      <TextReveal as="h2" text="Three jobs. We do all three." accentWords={['Three']} />,
    );

    const accented = container.querySelectorAll('.text-accent');
    // Matches both "Three" and the trailing "three." — punctuation is stripped.
    expect(accented).toHaveLength(2);
  });

  it('renders the heading level it is asked for', () => {
    render(<TextReveal as="h1" text="Your ads, running" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
