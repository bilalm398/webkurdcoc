/**
 * Build skeleton loading cards for grid layouts.
 * @param {number} count
 * @returns {string}
 */
export function buildCardSkeleton(count = 6) {
    return Array.from({ length: count }, () => `
        <article class="skeleton-card" aria-hidden="true">
            <div class="skeleton-card__media"></div>
            <div class="skeleton-card__body">
                <div class="skeleton-line skeleton-line--short"></div>
                <div class="skeleton-line skeleton-line--medium"></div>
                <div class="skeleton-line skeleton-line--btn"></div>
            </div>
        </article>
    `).join('');
}

/**
 * Wrap skeleton cards in a grid container class.
 * @param {number} count
 * @param {string} gridClass
 * @returns {string}
 */
export function buildGridSkeleton(count, gridClass = 'skeleton-grid') {
    return `<div class="${gridClass}">${buildCardSkeleton(count)}</div>`;
}
