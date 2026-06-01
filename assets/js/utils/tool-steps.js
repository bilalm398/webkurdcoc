/**
 * Update upload tool step indicators.
 * @param {1|2|3} step - 1 upload, 2 analyzing, 3 results
 */
export function setToolStep(step) {
    document.querySelectorAll('.tool-step').forEach((el) => {
        const n = Number(el.dataset.step);
        el.classList.toggle('is-active', n === step);
        el.classList.toggle('is-done', n < step);
    });
}
