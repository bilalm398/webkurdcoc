/**
 * Toggle loading indicator visibility.
 * @param {HTMLElement} loadingEl
 * @param {boolean} isLoading
 */
export function setLoading(loadingEl, isLoading) {
    if (!loadingEl) return;
    loadingEl.classList.toggle('is-active', isLoading);
}

/**
 * Clear results panel content.
 * @param {HTMLElement} resultsEl
 */
export function clearResults(resultsEl) {
    if (resultsEl) resultsEl.innerHTML = '';
}
