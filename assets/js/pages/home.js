import { onReady } from '../utils/dom-ready.js';
import { showToast } from '../utils/toast.js';
import { initVpnAlert } from '../components/vpn-alert.js';

onReady(() => {
    initVpnAlert();

    const comingSoonLink = document.querySelector('[data-coming-soon]');
    if (comingSoonLink) {
        comingSoonLink.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('بەمزوانە بەردەست دەبێت!');
        });
    }
});
