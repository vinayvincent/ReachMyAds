import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CountUp } from '@/components/motion/CountUp';

/**
 * The shared setup reports every observed element as immediately visible, and
 * jsdom drives no animation frames — so the value settles at its start rather
 * than its target. These cover the formatting contract, which is what callers
 * actually depend on.
 */
describe('CountUp', () => {
  it('renders a prefix and suffix around the number', () => {
    render(<CountUp to={0} prefix="₹" suffix="+" />);
    expect(screen.getByText('₹0+')).toBeInTheDocument();
  });

  it('honours the requested decimal places', () => {
    render(<CountUp to={0} decimals={2} />);
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  it('applies the caller class so it can be styled as a metric', () => {
    const { container } = render(<CountUp to={0} className="metric-value" />);
    expect(container.querySelector('.metric-value')).toBeInTheDocument();
  });
});
