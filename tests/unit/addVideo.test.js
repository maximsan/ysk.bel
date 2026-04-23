import { describe, it, expect } from 'vitest';
import {
  normalizeVideoPreload,
  parseVideoExtensionTokens,
} from '../../src/scripts/helpers/addVideo.js';

describe('addVideo', () => {
  describe('parseVideoExtensionTokens', () => {
    it('trims tokens and defaults when empty', () => {
      expect(parseVideoExtensionTokens(null)).toEqual(['webm', 'mp4']);
      expect(parseVideoExtensionTokens('')).toEqual(['webm', 'mp4']);
      expect(parseVideoExtensionTokens(' webm , mp4 ')).toEqual(['webm', 'mp4']);
    });

    it('falls back when only commas or whitespace', () => {
      expect(parseVideoExtensionTokens(', ,')).toEqual(['webm', 'mp4']);
    });
  });

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
