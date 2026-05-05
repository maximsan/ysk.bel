export function documentHeight() {
  const doc = document.documentElement;
  doc.style.setProperty('--doc-height', `${doc.clientHeight}px`);
}
