const TOAST_DURATION_MS = 3000;

/**
 * Show a toast notification message.
 * @param {string} message
 * @param {number} [durationMs]
 */
export function showToast(message, durationMs = TOAST_DURATION_MS) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('is-visible');

    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => {
        toast.classList.remove('is-visible');
    }, durationMs);
}
