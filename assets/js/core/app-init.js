import { onReady } from '../utils/dom-ready.js';

onReady(() => {
    document.body.classList.add('is-ready');

    initActiveNav();
    initHeaderScroll();
    initScrollReveal();
});

function initActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const map = {
        'index.html': 'home',
        'base_search.html': 'base',
        'bases.html': 'bases',
        'attack_finder.html': 'attack',
        'trending_base.html': 'trending',
        'common_attack.html': 'armies',
    };
    const current = map[path] || '';

    document.querySelectorAll('[data-nav]').forEach((link) => {
        const isActive = link.dataset.nav === current;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
            // Smoothly auto-scroll active nav link into view on mobile
            setTimeout(() => {
                link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }, 100);
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;

    const onScroll = () => {
        const currentScrollY = window.scrollY;

        // Visual states
        header.classList.toggle('is-scrolled', currentScrollY > 12);

        // Smart hiding/showing header based on scroll direction
        if (currentScrollY > 80) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down - hide header to maximize screen estate
                header.classList.add('header--hidden');
            } else {
                // Scrolling up - show header for quick access
                header.classList.remove('header--hidden');
            }
        } else {
            // At the top - always show
            header.classList.remove('header--hidden');
        }

        lastScrollY = Math.max(0, currentScrollY);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

function initScrollReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.reveal');

    if (prefersReduced || !elements.length) {
        elements.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.08 }
    );

    elements.forEach((el) => observer.observe(el));
}
