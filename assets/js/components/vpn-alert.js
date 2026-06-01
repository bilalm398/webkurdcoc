/**
 * VPN Alert Component
 * Handles the premium fade-out animation, scroll-lock unlocking, 
 * and accessibility features (Escape to dismiss, auto-focus).
 */
export function initVpnAlert() {
    const overlay = document.getElementById('vpn-alert');
    if (!overlay) return;

    const dhikrTextEl = overlay.querySelector('.dhikr-text');
    if (!dhikrTextEl) return;

    const phrases = [
        "سُبْحَانَ اللَّهِ",
        "وَالْحَمْدُ لِلَّهِ",
        "وَلا إِلَهَ إِلا اللَّهُ",
        "وَاللَّهُ أَكْبَرُ"
    ];

    let currentIndex = 0;

    setInterval(() => {
        // Trigger exit animation
        dhikrTextEl.style.opacity = '0';
        dhikrTextEl.style.transform = 'translateY(-5px)';

        // Switch content and trigger enter animation
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % phrases.length;
            dhikrTextEl.textContent = phrases[currentIndex];
            dhikrTextEl.style.opacity = '1';
            dhikrTextEl.style.transform = 'translateY(0)';
        }, 300); // Syncs with the transition duration
    }, 4000); // Cycle every 4 seconds
}
