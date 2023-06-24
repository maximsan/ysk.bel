export const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--doc-height', `${doc.clientHeight}px`);
};
window.addEventListener('resize', documentHeight);
// TODO: check what to do with height because it work fine only with resize
// window.addEventListener('scroll', documentHeight)
