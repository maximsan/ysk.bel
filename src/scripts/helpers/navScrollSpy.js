/**
 * Sets `aria-current="true"` on in-page nav links whose section intersects
 * the viewport center (token-driven active style in `_header.scss`).
 */
export function initNavScrollSpy() {
  const navLinks = Array.from(
    document.querySelectorAll('.navbar .nav-link[href^="#"]'),
  );
  const linksBySectionId = new Map();
  for (const link of navLinks) {
    const id = link.getAttribute('href')?.slice(1);
    if (!id) continue;
    if (!linksBySectionId.has(id)) {
      linksBySectionId.set(id, []);
    }
    linksBySectionId.get(id).push(link);
  }

  const sectionElements = [];
  for (const id of linksBySectionId.keys()) {
    const el = document.getElementById(id);
    if (el) {
      sectionElements.push(el);
    }
  }
  if (sectionElements.length === 0) {
    return;
  }

  function clearActive() {
    for (const link of navLinks) {
      link.removeAttribute('aria-current');
    }
  }

  function activateSectionId(id) {
    const links = linksBySectionId.get(id);
    if (!links?.length) {
      return;
    }
    clearActive();
    for (const link of links) {
      link.setAttribute('aria-current', 'true');
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const intersecting = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (intersecting.length === 0) {
        return;
      }
      const id = intersecting[0].target.id;
      if (id) {
        activateSectionId(id);
      }
    },
    {
      root: null,
      rootMargin: '-42% 0px -42% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    },
  );

  for (const section of sectionElements) {
    observer.observe(section);
  }

  function applyHash() {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && linksBySectionId.has(hash)) {
      activateSectionId(hash);
    }
  }

  window.addEventListener('hashchange', applyHash);
  applyHash();
}
