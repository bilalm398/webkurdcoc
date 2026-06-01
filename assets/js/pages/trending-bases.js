import { onReady } from '../utils/dom-ready.js';
import { toArabicNumerals } from '../utils/arabic-numerals.js';
import { escapeHtml } from '../utils/escape-html.js';
import { buildCardSkeleton } from '../utils/skeleton.js';

const BASE_API = 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/trending-bases?type=base&days=7&limit=20';
const ATTACK_API = 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/trending-bases?type=attack&days=7&limit=20';

let attacksLoaded = false;

onReady(() => {
    const basesGrid = document.getElementById('basesGrid');
    const attackGrid = document.getElementById('attackGrid');
    const baseTab = document.querySelector('[data-tab="bases"]');
    const attackTab = document.querySelector('[data-tab="attack"]');

    baseTab?.addEventListener('click', () => switchTab('bases', basesGrid, attackGrid, baseTab, attackTab));
    attackTab?.addEventListener('click', () => switchTab('attack', basesGrid, attackGrid, baseTab, attackTab));

    loadBases(basesGrid);
});

function switchTab(type, basesGrid, attackGrid, baseTab, attackTab) {
    const isBases = type === 'bases';

    baseTab?.setAttribute('aria-selected', String(isBases));
    attackTab?.setAttribute('aria-selected', String(!isBases));
    baseTab?.classList.toggle('is-active', isBases);
    attackTab?.classList.toggle('is-active', !isBases);

    if (basesGrid) {
        basesGrid.classList.toggle('is-hidden', !isBases);
        basesGrid.hidden = !isBases;
    }
    if (attackGrid) {
        attackGrid.classList.toggle('is-hidden', isBases);
        attackGrid.hidden = isBases;
    }

    if (isBases) {
        loadBases(basesGrid);
    } else if (!attacksLoaded) {
        loadAttacks(attackGrid);
    } else {
        attackGrid?.classList.add('tab-panel');
        requestAnimationFrame(() => attackGrid?.classList.remove('tab-panel'));
    }
}

function showSkeleton(grid) {
    if (!grid) return;
    grid.innerHTML = buildCardSkeleton(6);
    grid.classList.remove('stagger-children', 'is-visible');
}

async function loadBases(grid) {
    if (!grid) return;
    showSkeleton(grid);

    try {
        const res = await fetch(BASE_API);
        const data = await res.json();
        renderBases(grid, data.results || []);
    } catch {
        grid.innerHTML = '<p class="trending-grid__status error-state">هەڵەیەک ڕوویدا لە بارکردن</p>';
    }
}

async function loadAttacks(grid) {
    if (!grid) return;
    showSkeleton(grid);

    try {
        const res = await fetch(ATTACK_API);
        const data = await res.json();
        attacksLoaded = true;
        renderAttacks(grid, data.results || []);
    } catch {
        grid.innerHTML = '<p class="trending-grid__status error-state">هەڵەیەک ڕوویدا لە بارکردن</p>';
    }
}

function animateGrid(grid) {
    grid.classList.add('stagger-children');
    requestAnimationFrame(() => grid.classList.add('is-visible'));
}

function renderBases(grid, bases) {
    if (!bases.length) {
        grid.innerHTML = '<p class="trending-grid__status">هیچ بەیسێک نەدۆزرایەوە</p>';
        return;
    }

    grid.innerHTML = bases.map((base, index) => {
        const rank = index + 1;
        const image = `https://clashfox.com${escapeHtml(base.image_url)}`;
        const match = base.avg_similarity.toFixed(1);

        return `
            <article class="trending-card">
                <div class="trending-card__media">
                    <img src="${image}" alt="بەیس #${rank}" class="trending-card__image" loading="lazy" decoding="async">
                    <span class="trending-card__rank">${toArabicNumerals(rank)}</span>
                    ${rank <= 3 ? '<span class="trending-card__badge">HOT</span>' : ''}
                </div>
                <div class="trending-card__body">
                    <div class="trending-card__header">
                        <span class="trending-card__type">TH18 BASE</span>
                        <span class="trending-card__match">${toArabicNumerals(match)}%</span>
                    </div>
                    <div class="trending-card__actions">
                        <a href="${escapeHtml(base.url)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">کۆپیکردن</a>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    animateGrid(grid);
}

function renderAttacks(grid, items) {
    if (!items.length) {
        grid.innerHTML = '<p class="trending-grid__status">هیچ ئەنجامێک نەدۆزرایەوە</p>';
        return;
    }

    grid.innerHTML = items.map((item, index) => {
        const rank = index + 1;
        const videoId = item.url.split('v=')[1]?.split('&')[0];
        const image = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : 'https://clashfox.com/default.jpg';
        const match = item.avg_similarity.toFixed(1);

        return `
            <article class="trending-card">
                <div class="trending-card__media">
                    <img src="${escapeHtml(image)}" alt="ئەتاک #${rank}" class="trending-card__image" loading="lazy" decoding="async">
                    <span class="trending-card__rank">${toArabicNumerals(rank)}</span>
                    ${rank <= 3 ? '<span class="trending-card__badge trending-card__badge--attack">ATTACK</span>' : ''}
                </div>
                <div class="trending-card__body">
                    <div class="trending-card__header">
                        <span class="trending-card__type">${escapeHtml(item.youtuber || 'Attack Video')}</span>
                        <span class="trending-card__match">${toArabicNumerals(match)}%</span>
                    </div>
                    <div class="trending-card__actions">
                        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">سەیرکردن</a>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    animateGrid(grid);
}
