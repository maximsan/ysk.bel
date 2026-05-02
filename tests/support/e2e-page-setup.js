const DISABLED_MOTION_STYLE = `
*,
*::before,
*::after {
  animation-delay: 0s !important;
  animation-duration: 0s !important;
  animation-iteration-count: 1 !important;
  caret-color: transparent !important;
  scroll-behavior: auto !important;
  transition-delay: 0s !important;
  transition-duration: 0s !important;
}
`;

export async function disablePageMotion(page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript((cssText) => {
    const installStyle = () => {
      if (document.getElementById('e2e-disabled-motion-style')) {
        return;
      }

      const styleElement = document.createElement('style');
      styleElement.id = 'e2e-disabled-motion-style';
      styleElement.textContent = cssText;
      (document.head || document.documentElement).appendChild(styleElement);
    };

    if (document.documentElement) {
      installStyle();
      return;
    }

    document.addEventListener('DOMContentLoaded', installStyle, { once: true });
  }, DISABLED_MOTION_STYLE);
}

export async function applyDisabledMotionStyle(page) {
  await page.addStyleTag({ content: DISABLED_MOTION_STYLE });
}
