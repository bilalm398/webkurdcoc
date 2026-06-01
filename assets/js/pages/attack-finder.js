import { onReady } from '../utils/dom-ready.js';
import { initUploadZone } from '../components/upload-zone.js';
import { setLoading, clearResults } from '../components/loading-state.js';
import { renderAttackSearchResults, renderError } from '../components/attack-search-results.js';
import { setToolStep } from '../utils/tool-steps.js';

const API_URL = 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/search-attack';

onReady(() => {
    const loadingEl = document.getElementById('loading');
    const resultsEl = document.getElementById('results');

    initUploadZone({
        uploadArea: document.getElementById('upload-area'),
        fileInput: document.getElementById('file-input'),
        previewContainer: document.getElementById('preview-container'),
        previewImage: document.getElementById('preview-image'),
        filenameEl: document.getElementById('filename'),
        removeBtn: document.getElementById('remove-btn'),
        onFileSelected: (file) => searchAttack(file, loadingEl, resultsEl),
        onReset: () => {
            setLoading(loadingEl, false);
            clearResults(resultsEl);
            setToolStep(1);
        },
    });

    setToolStep(1);
});

async function searchAttack(file, loadingEl, resultsEl) {
    setToolStep(2);
    setLoading(loadingEl, true);
    clearResults(resultsEl);

    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(API_URL, { method: 'POST', body: formData });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        renderAttackSearchResults(resultsEl, data.matches || []);
        setToolStep(3);
    } catch (error) {
        renderError(resultsEl, `API Error: ${error.message}`);
        console.error(error);
    } finally {
        setLoading(loadingEl, false);
    }
}
