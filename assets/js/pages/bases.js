import { onReady } from '../utils/dom-ready.js';
import { toArabicNumerals } from '../utils/arabic-numerals.js';
import { escapeHtml } from '../utils/escape-html.js';
import { showToast } from '../utils/toast.js';
import { buildCardSkeleton } from '../utils/skeleton.js';

// Real Town Hall Bases API endpoints routed through the Cloudflare proxy
const API_URLS = {
    13: 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/th-bases/th13/list?status=published',
    14: 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/th-bases/th14/list?status=published',
    15: 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/th-bases/th15/list?status=published',
    16: 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/th-bases/th16/list?status=published',
    17: 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/th-bases/th17/list?status=published',
    18: 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/th-bases/th18/list?status=published'
};
// State management for current loaded bases and filters
let currentBases = [];
let currentFilter = 'all';
let activeLevel = 18;


onReady(() => {
    const thCards = document.querySelectorAll('.th-card');
    const basesGrid = document.getElementById('basesGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!basesGrid) return;

    // Attach click listeners to selector cards to load real bases
    thCards.forEach(card => {
        card.addEventListener('click', () => {
            const level = card.dataset.level;
            if (!level) return;

            thCards.forEach(c => c.classList.remove('is-active'));
            card.classList.add('is-active');

            activeLevel = parseInt(level, 10);
            loadBases(activeLevel, basesGrid);
        });
    });

    // Attach click listeners to filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.dataset.filter;
            if (!filterValue) return;

            currentFilter = filterValue;

            // Toggle active classes
            filterButtons.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            // Re-render bases based on new filter
            renderBases(basesGrid, currentBases, activeLevel);
        });
    });

    // Load TH18 as the default view
    const defaultCard = document.querySelector('.th-card--18');
    if (defaultCard) {
        defaultCard.classList.add('is-active');
        activeLevel = 18;
        loadBases(18, basesGrid);
    }

    // Scroll to Top Button functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('is-visible');
            } else {
                scrollTopBtn.classList.remove('is-visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

async function loadBases(level, grid) {
    if (!grid) return;

    // Trigger loading skeletons
    grid.innerHTML = buildCardSkeleton(6);
    grid.classList.remove('stagger-children', 'is-visible');

    // Reset filtering UI on loading a new TH level
    currentFilter = 'all';
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === 'all') {
            btn.classList.add('is-active');
        } else {
            btn.classList.remove('is-active');
        }
    });

    const url = API_URLS[level];
    if (!url) {
        grid.innerHTML = '<p class="bases-grid__status error-state">هەڵەیەک ڕوویدا لە بارکردنی زانیارییەکان</p>';
        return;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('API server returned error status');
        
        const data = await res.json();
        currentBases = data.bases || [];
        renderBases(grid, currentBases, level);
    } catch (err) {
        console.error('Fetch bases error:', err);
        grid.innerHTML = '<p class="bases-grid__status error-state">هەڵەیەک ڕوویدا لە هێنانی زانیارییەکان لە سێرڤەرەوە</p>';
    }
}

function renderBases(grid, bases, level) {
    if (!bases.length) {
        grid.innerHTML = '<p class="bases-grid__status">هیچ بەیسێکی بڵاوکراوە نەدۆزرایەوە بۆ ئەم ئاستە</p>';
        return;
    }

    // Apply active tag filter client-side
    let filteredBases = bases;
    if (currentFilter !== 'all') {
        filteredBases = bases.filter(base => base.tags && base.tags.includes(currentFilter));
    }

    if (!filteredBases.length) {
        grid.innerHTML = '<p class="bases-grid__status">هیچ بەیسێک نەدۆزرایەوە بۆ ئەم فلتەرە لەم ئاستەدا / No bases found for this filter</p>';
        return;
    }

    grid.innerHTML = filteredBases.map((base, index) => {
        const rank = index + 1;
        const imageUrl = `https://clashfox.com/${base.image_path}`;

        return `
            <article class="trending-card">
                <div class="trending-card__media">
                    <img src="${escapeHtml(imageUrl)}" alt="بەیس #${rank}" class="trending-card__image" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='townhall_images/imgi_24_weeklybases.webp';">
                    <span class="trending-card__rank">${toArabicNumerals(rank)}</span>
                    ${rank <= 3 ? '<span class="trending-card__badge">NEW</span>' : ''}
                </div>
                <div class="trending-card__body">
                    <div class="trending-card__actions">
                        <a href="${escapeHtml(base.base_link)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary base-copy-btn" data-link="${escapeHtml(base.base_link)}">
                            <svg class="icon" viewBox="0 0 24 24" width="14" height="14"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/></svg>
                            <span>کۆپیکردنی بەیس</span>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    // Trigger grid entry animations
    grid.classList.add('stagger-children');
    requestAnimationFrame(() => grid.classList.add('is-visible'));

    // Attach click listeners to Copy buttons to write the real link to clipboard
    const copyBtns = grid.querySelectorAll('.base-copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const link = btn.dataset.link;
            if (!link) return;

            navigator.clipboard.writeText(link).then(() => {
                showToast('بەیسەکە بە سەرکەوتوویی کۆپی کرا! / Base copied!');
            }).catch(() => {
                // Fallback for older browsers
                const tempInput = document.createElement('input');
                tempInput.value = link;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast('بەیسەکە بە سەرکەوتوویی کۆپی کرا! / Base copied!');
            });
        });
    });
}
