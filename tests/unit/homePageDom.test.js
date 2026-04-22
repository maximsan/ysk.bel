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
    expect(idSelector(SECTION_IDS.services)).toBe('#desc');
  });

  it('exposes stable Playwright locators', () => {
    expect(PLAYWRIGHT_HOME_LOCATORS.header).toBe('header.header');
    expect(PLAYWRIGHT_HOME_LOCATORS.menu).toBe('.menu');
    expect(PLAYWRIGHT_HOME_LOCATORS.navbarToggler).toBe('.navbar-toggler');
    expect(PLAYWRIGHT_HOME_LOCATORS.footer).toBe('footer.footer-social');
  });

  it('STATE_CLASS and MENU_CLASS use expected fragments', () => {
    expect(STATE_CLASS.active).toBe('is-active');
    expect(STATE_CLASS.mediaReady).toBe('is-media-ready');
    expect(MENU_CLASS.open).toBe('open');
    expect(MAP_ELEMENT.shellReadyClass).toBe('map-shell--ready');
  });
});
