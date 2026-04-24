import { createRequire } from 'node:module';
import { describe, it, expect } from 'vitest';

const require = createRequire(import.meta.url);
const homePageDom = require('../../src/scripts/constants/homePageDom.cjs');

const {
  SECTION_IDS,
  STATE_CLASS,
  MENU_CLASS,
  MAP_ELEMENT,
  PLAYWRIGHT_HOME_LOCATORS,
  GALLERY_SELECTORS,
  PHOTOSWIPE_OPTIONS,
  SITE_SELECTORS,
  STOCKING_QUERY,
  FORM_QUERY,
  buildStockingActiveZoomSelector,
  buildHomeActiveVideoHostSelector,
  idSelector,
} = homePageDom;

describe('homePageDom', () => {
  it('builds stocking active zoom selector', () => {
    expect(buildStockingActiveZoomSelector()).toBe(
      '#stocking .stocking-carousel__slide.is-active .stocking-carousel__zoom',
    );
  });

  it('builds active video host selector', () => {
    expect(buildHomeActiveVideoHostSelector()).toBe(
      '#videos .videos-showcase__slide.is-active .videos-showcase__lazy-host',
    );
  });

  it('idSelector prefixes hash', () => {
    expect(idSelector(SECTION_IDS.services)).toBe('#services');
  });

  it('exposes stable Playwright locators', () => {
    expect(PLAYWRIGHT_HOME_LOCATORS.header).toBe('header.header');
    expect(PLAYWRIGHT_HOME_LOCATORS.menu).toBe('.menu');
    expect(PLAYWRIGHT_HOME_LOCATORS.navbarToggler).toBe('.navbar-toggler');
    expect(PLAYWRIGHT_HOME_LOCATORS.services).toBe('section#services');
    expect(PLAYWRIGHT_HOME_LOCATORS.footer).toBe('footer.footer-social');
  });

  it('STATE_CLASS and MENU_CLASS use expected fragments', () => {
    expect(STATE_CLASS.active).toBe('is-active');
    expect(STATE_CLASS.mediaReady).toBe('is-media-ready');
    expect(MENU_CLASS.open).toBe('open');
    expect(MAP_ELEMENT.shellReadyClass).toBe('map-shell--ready');
  });

  it('exposes gallery and PhotoSwipe selectors used by photo-swipe.js', () => {
    expect(GALLERY_SELECTORS.mainRoot).toBe('.gallery');
    expect(GALLERY_SELECTORS.stockingHook).toBe('.js-stocking-photoswipe');
    expect(PHOTOSWIPE_OPTIONS.mainBgOpacity).toBe(1);
    expect(PHOTOSWIPE_OPTIONS.stockingBgOpacity).toBe(0.92);
  });

  it('SITE_SELECTORS align with layout classes', () => {
    expect(SITE_SELECTORS.scrollUp).toBe('.scroll-up');
    expect(SITE_SELECTORS.overlay).toBe('.overlay');
    expect(SITE_SELECTORS.openMenu).toBe('.open-menu');
  });

  it('STOCKING_QUERY uses data attributes from liquid', () => {
    expect(STOCKING_QUERY.carouselRoot).toBe('[data-stocking-carousel]');
    expect(STOCKING_QUERY.slide).toBe('[data-stocking-slide]');
  });

  it('FORM_QUERY matches gform markup', () => {
    expect(FORM_QUERY.gform).toBe('form.gform');
  });
});
