import { describe, it, expect } from 'vitest';
import {
  buildInfoBannerDismissCookie,
  hasInfoBannerDismissCookie,
} from '../../src/scripts/helpers/infoBannerCookie.js';

describe('infoBannerCookie', () => {
  describe('hasInfoBannerDismissCookie', () => {
    it('is false when cookie absent', () => {
      expect(hasInfoBannerDismissCookie('')).toBe(false);
      expect(hasInfoBannerDismissCookie('foo=bar')).toBe(false);
    });

    it('is true when info-banner cookie present', () => {
      expect(hasInfoBannerDismissCookie('info-banner=false')).toBe(true);
      expect(hasInfoBannerDismissCookie('a=1; info-banner=false; b=2')).toBe(
        true,
      );
    });
  });

  describe('buildInfoBannerDismissCookie', () => {
    it('omits Secure on http', () => {
      expect(buildInfoBannerDismissCookie(false)).toBe(
        'info-banner=false; max-age=86400; Path=/; SameSite=Lax',
      );
    });

    it('adds Secure on https', () => {
      expect(buildInfoBannerDismissCookie(true)).toBe(
        'info-banner=false; max-age=86400; Path=/; SameSite=Lax; Secure',
      );
    });
  });
});
