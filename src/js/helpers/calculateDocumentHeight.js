export const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${doc.clientHeight}px`)
}
window.addEventListener('resize', documentHeight)
