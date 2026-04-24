import { describe, it, expect } from 'vitest';
import { validEmail, isSpamHoneypot } from '@scripts/form-submission/formSubmissionCore.js';

describe('formSubmissionCore', () => {
  describe('validEmail', () => {
    it('accepts typical addresses', () => {
      expect(validEmail('a@b.co')).toBe(true);
      expect(validEmail('user.name@example.com')).toBe(true);
    });

    it('rejects invalid', () => {
      expect(validEmail('')).toBe(false);
      expect(validEmail('not-an-email')).toBe(false);
      expect(validEmail('@nodomain.com')).toBe(false);
    });
  });

  describe('isSpamHoneypot', () => {
    it('is true when honeypot has any truthy value', () => {
      expect(isSpamHoneypot('x')).toBe(true);
      expect(isSpamHoneypot(' ')).toBe(true);
    });

    it('is false when empty', () => {
      expect(isSpamHoneypot('')).toBe(false);
      expect(isSpamHoneypot(undefined)).toBe(false);
      expect(isSpamHoneypot(null)).toBe(false);
    });
  });
});
