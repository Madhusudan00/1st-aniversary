const bgMusic = document.getElementById('bgMusic');
const videos = document.querySelectorAll('video');
let musicWasPlaying = false;

// Music Toggle
function toggleMusic() {
    const btn = document.getElementById('music-toggle');
    if (bgMusic.paused) {
        bgMusic.play();
        btn.textContent = '❚❚';
    } else {
        bgMusic.pause();
        btn.textContent = '♪';
    }
}

document.getElementById('music-toggle').addEventListener('click', toggleMusic);

// Video & Music Control
videos.forEach(video => {
    video.addEventListener('play', () => {
        musicWasPlaying = !bgMusic.paused;
        if (musicWasPlaying) bgMusic.pause();
    });

    video.addEventListener('pause', () => {
        if (musicWasPlaying) bgMusic.play().catch(() => {});
    });

    video.addEventListener('ended', () => {
        if (musicWasPlaying) bgMusic.play().catch(() => {});
    });
});

// ===== Animated Entrance Effects =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll, .gallery-img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for gallery images
                if (entry.target.classList.contains('gallery-img')) {
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(el => observer.observe(el));
}

// Floating Hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['❤️','💕','💖','💗'][Math.floor(Math.random()*4)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 8 + 10) + 's';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 22000);
}

setInterval(createHeart, 700);

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Auto play music on first interaction
    document.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
        }
    }, { once: true });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
