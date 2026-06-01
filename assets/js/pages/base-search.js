import { onReady } from '../utils/dom-ready.js';
import { initUploadZone } from '../components/upload-zone.js';
import { setLoading, clearResults } from '../components/loading-state.js';
import { renderBaseSearchResults, renderError } from '../components/base-search-results.js';
import { setToolStep } from '../utils/tool-steps.js';

const API_URL = 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/search-base';

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
        onFileSelected: (file) => searchBase(file, loadingEl, resultsEl),
        onReset: () => {
            setLoading(loadingEl, false);
            clearResults(resultsEl);
            setToolStep(1);
        },
    });

    setToolStep(1);
});

async function searchBase(file, loadingEl, resultsEl) {
    setToolStep(2);
    setLoading(loadingEl, true);
    clearResults(resultsEl);

    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(API_URL, { method: 'POST', body: formData });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            throw new Error('Invalid JSON response');
        }

        renderBaseSearchResults(resultsEl, data.matches || []);
        setToolStep(3);
    } catch (error) {
        renderError(resultsEl, error.message || 'هەڵەیەک ڕوویدا');
        console.error(error);
    } finally {
        setLoading(loadingEl, false);
    }
}
