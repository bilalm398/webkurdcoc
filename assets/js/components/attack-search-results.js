import { escapeHtml } from '../utils/escape-html.js';

/**
 * Render attack finder match results.
 * @param {HTMLElement} container
 * @param {Array<{similarity: number, detected_troops: string[], video_url: string, video_timestamp: number, youtuber_name: string}>} matches
 */
export function renderAttackSearchResults(container, matches) {
    if (!matches?.length) {
        container.innerHTML = `<div class="empty-state">هیچ ئەنجامێک نەدۆزرایەوە</div>`;
        return;
    }

    const sorted = [...matches].sort((a, b) => b.similarity - a.similarity);

    const cards = sorted.map((match) => {
        const troops = (match.detected_troops || []).map(escapeHtml).join(', ');
        return `
            <article class="match-card">
                <div class="match-card__meta">
                    <span class="match-card__stat">
                        هاوشێوەی: <strong>${escapeHtml(match.similarity)}%</strong>
                    </span>
                </div>
                <p class="match-card__troops"><strong>هێزەکان:</strong> ${troops || '—'}</p>
                <div class="match-card__actions">
                    <a href="${escapeHtml(match.video_url)}" target="_blank" rel="noopener noreferrer" class="btn btn--youtube">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8.051 1.999h-.002C3.52 1.999 1 2.335 1 8c0 5.664 2.52 6 7.049 6h.002C12.58 14 15 13.664 15 8c0-5.665-2.42-6.001-6.949-6.001zM6 11V5l5 3-5 3z"/>
                        </svg>
                        سەیری ئەتاکی سێ ستاری (${escapeHtml(match.video_timestamp)}s)
                    </a>
                </div>
                <p class="match-card__youtuber">${escapeHtml(match.youtuber_name)}</p>
            </article>
        `;
    }).join('');

    container.innerHTML = `<div class="match-list">${cards}</div>`;
}

export function renderError(container, message) {
    container.innerHTML = `<div class="error-state">${escapeHtml(message)}</div>`;
}
