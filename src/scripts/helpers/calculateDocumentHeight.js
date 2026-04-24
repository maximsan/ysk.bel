/** Sets CSS custom property `--doc-height` from `document.documentElement.clientHeight`. */
export function documentHeight() {
  const doc = document.documentElement;
  doc.style.setProperty('--doc-height', `${doc.clientHeight}px`);
}
