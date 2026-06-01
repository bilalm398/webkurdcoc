/**
 * Run callback when DOM is ready.
 * @param {() => void} callback
 */
export function onReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}
