import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import {
  sampleContactFormData,
  sampleSEOMetadata,
} from './fixtures';

describe('Testing framework smoke test', () => {
  it('vitest runs correctly', () => {
    expect(1 + 1).toBe(2);
  });

  it('shared fixtures are importable and well-formed', () => {
    expect(sampleContactFormData.email).toContain('@');
    expect(sampleSEOMetadata.title).toBeTruthy();
  });

  it('fast-check property-based testing works', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 100 }), (n) => {
        return n >= 0 && n <= 100;
      })
    );
  });
});
