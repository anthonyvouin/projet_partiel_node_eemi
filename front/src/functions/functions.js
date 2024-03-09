export const clickOnCloseButton = (e) => {
    return ( !e.target.farthestViewportElement && e.target.className === 'p-sidebar-mask p-component-overlay p-component-overlay-enter p-sidebar-visible p-sidebar-right')
    ||(e.target.farthestViewportElement && e.target.farthestViewportElement.classList.value === 'p-icon p-sidebar-close-icon white')
    || (!e.target.farthestViewportElement && e.target.className === 'p-icon p-sidebar-close-icon white')
    || (!e.target.farthestViewportElement && e.target.className === 'p-sidebar-close p-sidebar-icon p-link focus-sidebar-close-button')
    ||(!e.target.farthestViewportElement && e.target.classList.value === 'p-icon p-sidebar-close-icon white')
}