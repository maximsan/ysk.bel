export const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--doc-height', `${doc.clientHeight}px`);
};

// on load
documentHeight();
// on resize
window.addEventListener('resize', documentHeight);
