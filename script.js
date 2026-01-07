document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Video Lightbox Logic
    const lightbox = document.getElementById('videoLightbox');
    const playBtn = document.querySelector('.hero-media-pill');
    const closeBtn = document.querySelector('.close-lightbox');
    const videoIframe = document.getElementById('heroVideo');
    const youtubeUrl = "https://www.youtube.com/embed/38e5_JDtsWk?autoplay=1";

    if (playBtn && lightbox) {
        playBtn.addEventListener('click', () => {
            videoIframe.src = youtubeUrl;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            videoIframe.src = ""; // Stop video
            document.body.style.overflow = 'auto'; // Restore scrolling
        };

        closeBtn.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                closeLightbox();
            }
        });
    }

    // Handle Client Logo Fallbacks
    document.querySelectorAll('.client-list img').forEach(img => {
        // Check if image is already broken (for cached fast-failing)
        if (img.complete && img.naturalHeight === 0) {
            handleImageError(img);
        }

        img.onerror = () => handleImageError(img);
    });

    function handleImageError(img) {
        const span = document.createElement('span');
        span.className = 'client-fallback';
        span.textContent = img.alt || 'Client';
        img.replaceWith(span);
    }
});
