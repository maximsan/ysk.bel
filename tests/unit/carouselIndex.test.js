import { describe, it, expect } from 'vitest';
import { stepCarouselIndex } from '../../src/scripts/helpers/carouselIndex.js';

describe('carouselIndex', () => {
  it('steps forward and wraps', () => {
    expect(stepCarouselIndex(0, 1, 3)).toBe(1);
    expect(stepCarouselIndex(2, 1, 3)).toBe(0);
  });

  it('steps backward and wraps', () => {
    expect(stepCarouselIndex(0, -1, 3)).toBe(2);
    expect(stepCarouselIndex(1, -1, 3)).toBe(0);
  });

  it('returns 0 for non-positive length', () => {
    expect(stepCarouselIndex(2, 1, 0)).toBe(0);
    expect(stepCarouselIndex(2, 1, -1)).toBe(0);
  });
});
