/**
 * Initialize drag-and-drop file upload zone.
 * @param {Object} options
 * @param {HTMLElement} options.uploadArea
 * @param {HTMLInputElement} options.fileInput
 * @param {HTMLElement} options.previewContainer
 * @param {HTMLImageElement} options.previewImage
 * @param {HTMLElement} options.filenameEl
 * @param {HTMLElement} options.removeBtn
 * @param {(file: File) => void | Promise<void>} options.onFileSelected
 * @param {() => void} [options.onReset]
 */
export function initUploadZone({
    uploadArea,
    fileInput,
    previewContainer,
    previewImage,
    filenameEl,
    removeBtn,
    onFileSelected,
    onReset,
}) {
    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInput.click();
        }
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('is-dragover');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('is-dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('is-dragover');
        const file = e.dataTransfer?.files?.[0];
        if (file?.type.startsWith('image/')) {
            processFile(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    });

    removeBtn.addEventListener('click', resetUpload);

    function processFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target?.result ?? '';
            filenameEl.textContent = `فایل: ${file.name}`;
            previewContainer.classList.add('is-active');
            uploadArea.classList.add('is-hidden');
            onFileSelected(file);
        };
        reader.readAsDataURL(file);
    }

    function resetUpload() {
        previewContainer.classList.remove('is-active');
        uploadArea.classList.remove('is-hidden');
        previewImage.src = '';
        filenameEl.textContent = '';
        fileInput.value = '';
        onReset?.();
    }

    return { resetUpload };
}
