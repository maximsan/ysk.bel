'use strict';

/** Global layout / landmark class fragments (no leading dot). */
const LAYOUT_CLASS = {
  headerTag: 'header',
  headerBlock: 'header',
  cooperationBanner: 'cooperation-banner',
  infoBannerSection: 'section-container',
  infoBannerBlock: 'info-banner',
  heroTag: 'section',
  hero: 'hero',
  heroIntro: 'intro',
  heroScrollCue: 'hero__scroll-cue',
  heroScrollCueHidden: 'is-hidden',
  footerTag: 'footer',
  footerSocial: 'footer-social',
  overlay: 'overlay',
  crossIcon: 'cross-icon',
};

/** Bootstrap / utility classes referenced from JS. */
const CSS_UTILITY_CLASS = {
  hidden: 'hidden',
};

module.exports = { LAYOUT_CLASS, CSS_UTILITY_CLASS };
