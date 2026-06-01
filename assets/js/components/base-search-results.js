import { escapeHtml } from '../utils/escape-html.js';

/**
 * Render base search match results.
 * @param {HTMLElement} container
 * @param {Array<{similarity: number, youtuber_name: string, base_link: string, youtube_url: string}>} matches
 */
export function renderBaseSearchResults(container, matches) {
    if (!matches?.length) {
        container.innerHTML = `
            <div class="empty-state">هیچ بنکەیەک نەدۆزرایەوە</div>
        `;
        return;
    }

    const cards = matches.map((match) => `
        <article class="match-card">
            <div class="match-card__meta">
                <span class="match-card__stat">
                    <svg class="match-card__stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    هاوشێوەی: <strong>${escapeHtml(match.similarity)}%</strong>
                </span>
                <span class="match-card__stat">
                    <svg class="match-card__stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    یوتیوبەر: <strong>${escapeHtml(match.youtuber_name)}</strong>
                </span>
            </div>
            <div class="match-card__actions">
                <a href="${escapeHtml(match.base_link)}" target="_blank" rel="noopener noreferrer" class="btn btn--amber">
                    کۆپی بەیس
                </a>
                <a href="${escapeHtml(match.youtube_url)}" target="_blank" rel="noopener noreferrer" class="btn btn--youtube">
                    ڤیدیۆ
                </a>
            </div>
        </article>
    `).join('');

    container.innerHTML = `<div class="match-list">${cards}</div>`;
}

/**
 * Show API error in results container.
 * @param {HTMLElement} container
 * @param {string} message
 */
export function renderError(container, message) {
    container.innerHTML = `<div class="error-state">${escapeHtml(message)}</div>`;
}
