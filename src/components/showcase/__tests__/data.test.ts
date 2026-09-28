import { describe, it, expect } from 'vitest';
import { CAMPAIGNS, formatINR, leadFor } from '../data';

describe('formatINR', () => {
  it('groups digits the Indian way', () => {
    expect(formatINR(6800)).toBe('6,800');
    expect(formatINR(240000)).toBe('2,40,000');
    expect(formatINR(4862000)).toBe('48,62,000');
    expect(formatINR(549)).toBe('549');
  });
});

describe('leadFor', () => {
  it('takes each lead from the campaign in the same slot', () => {
    CAMPAIGNS.forEach((campaign, i) => {
      expect(leadFor(i).campaign).toBe(campaign);
    });
  });

  it('wraps negative ids, which appear before the first capture', () => {
    expect(leadFor(-1).campaign).toBe(CAMPAIGNS[CAMPAIGNS.length - 1]);
    expect(leadFor(-1).name).toBeTruthy();
  });

  it('alternates names on each pass through the campaigns', () => {
    expect(leadFor(0).name).not.toBe(leadFor(CAMPAIGNS.length).name);
    expect(leadFor(0).name).toBe(leadFor(CAMPAIGNS.length * 2).name);
  });
});
