import { describe, it, expect } from 'vitest';
import { documentHeight } from '../../src/scripts/helpers/calculateDocumentHeight.js';

describe('calculateDocumentHeight', () => {
  it('sets --doc-height from documentElement.clientHeight', () => {
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 900,
    });
    documentHeight();
    expect(document.documentElement.style.getPropertyValue('--doc-height')).toBe(
      '900px',
    );
  });
});
