/**
 * Video Intro Component
 * Handles the session logic, scroll-lock, event listeners,
 * and smooth fade-out cleanup for the premium gold video intro.
 */

export function initVideoIntro() {
    const overlay = document.getElementById('video-intro-overlay');
    if (!overlay) return;

    const video = document.getElementById('intro-video');
    const skipBtn = document.getElementById('skip-intro-btn');

    // 1. Session check to prevent annoyance
    const hasIntroPlayed = sessionStorage.getItem('kurd-coc-intro-played');
    if (hasIntroPlayed === 'true') {
        // Quick silent removal to prevent any layout shifts
        overlay.remove();
        return;
    }

    // 2. Lock scrolling of the body while the intro is active
    document.body.classList.add('intro-scroll-lock');

    let isTerminated = false;

    // Elegant termination & transition clean-up sequence
    const terminateIntro = () => {
        if (isTerminated) return;
        isTerminated = true;

        // Add class to trigger the smooth CSS scale & opacity exit transition
        overlay.classList.add('video-intro--fading-out');

        // Pause video to free up decoding resources
        if (video) {
            try {
                video.pause();
            } catch (e) {
                // Ignore any pause errors
            }
        }

        // Store play state in sessionStorage so they only see it once per session
        sessionStorage.setItem('kurd-coc-intro-played', 'true');

        // Wait for the transition to finish (0.75s) before removing from DOM
        setTimeout(() => {
            document.body.classList.remove('intro-scroll-lock');
            overlay.remove();
        }, 750);
    };

    // 3. Setup event listeners for user input and completion
    if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid double triggering on wrapper click
            terminateIntro();
        });
    }

    // Allow user to click anywhere on the intro overlay to bypass (ultra non-annoying)
    overlay.addEventListener('click', () => {
        terminateIntro();
    });

    // Handle normal completion when video finishes playing
    if (video) {
        video.addEventListener('ended', terminateIntro);
        
        // Proactive play call to satisfy various browser rendering loops (already muted)
        video.play().catch((error) => {
            console.warn('Autoplay prevented or video load failure:', error);
            // If autoplay is blocked entirely, trigger immediate exit or fallback gracefully
        });
    }

    // 4. Fallback safeguard timeout (5 seconds maximum)
    // Ensures that if the video gets stuck, loads extremely slowly, or fails, the user is never locked out
    setTimeout(terminateIntro, 5000);
}
