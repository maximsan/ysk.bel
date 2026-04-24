import { LAYOUT_CLASS } from '../constants/dom/layout.cjs';
import { SITE_SELECTORS } from '../constants/dom/siteSelectors.cjs';

/**
 * Hide the hero scroll-cue the moment the page starts scrolling.
 *
 * Rationale: the cue is an attention-seeking micro-affordance — useful before
 * the user scrolls, noisy after. Once any scroll has happened we fade it out
 * permanently (no re-show on scroll-up — that pattern nagged the previous info
 * banner and we explicitly dropped it here).
 *
 * The listener is `passive`, one-shot, and uses `requestAnimationFrame` to
 * avoid a layout read on the initial scroll frame. Safe to call when the hero
 * is absent (e.g. on secondary pages) — early-returns.
 */
export function initHeroScrollCue() {
  const cue = document.querySelector(SITE_SELECTORS.heroScrollCue);
  if (!cue) {
    return;
  }

  let hidden = false;
  const hide = () => {
    if (hidden) {
      return;
    }
    hidden = true;
    window.requestAnimationFrame(() => {
      cue.classList.add(LAYOUT_CLASS.heroScrollCueHidden);
    });
  };

  /* Using { once: true } for the scroll listener lets the browser clean up
   * automatically — no manual removeEventListener bookkeeping needed. */
  window.addEventListener('scroll', hide, { passive: true, once: true });

  /* Also hide if the user clicks the cue itself (acts as an anchor). */
  cue.addEventListener('click', hide, { once: true });
}
