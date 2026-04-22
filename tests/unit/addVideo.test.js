import { describe, it, expect } from 'vitest';
import { normalizeVideoPreload } from '../../src/scripts/helpers/addVideo.js';

describe('addVideo', () => {
  describe('normalizeVideoPreload', () => {
    it('defaults to metadata', () => {
      expect(normalizeVideoPreload(undefined)).toBe('metadata');
      expect(normalizeVideoPreload(null)).toBe('metadata');
      expect(normalizeVideoPreload('')).toBe('metadata');
    });

    it('accepts allowed keywords case-insensitively', () => {
      expect(normalizeVideoPreload('none')).toBe('none');
      expect(normalizeVideoPreload('AUTO')).toBe('auto');
      expect(normalizeVideoPreload('Metadata')).toBe('metadata');
    });

    it('falls back for unknown values', () => {
      expect(normalizeVideoPreload('bogus')).toBe('metadata');
    });
  });
});
