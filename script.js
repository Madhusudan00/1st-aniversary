const bgMusic = document.getElementById('bgMusic');
const videos = document.querySelectorAll('video');
let musicWasPlaying = true;   // Changed to true because we want it to start playing

// Try to play music automatically
function startMusic() {
    bgMusic.muted = false;
    bgMusic.play().catch(() => {
        // If autoplay is blocked, keep it muted until user interacts
        console.log("Autoplay prevented. Waiting for user interaction.");
    });
}

// Music Toggle Button
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

// Video & Music Control (Pause music when video plays)
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Try to start music immediately
    startMusic();

    // Backup: Start on first click/tap anywhere
    document.addEventListener('click', () => {
        if (bgMusic.paused || bgMusic.muted) {
            bgMusic.muted = false;
            bgMusic.play().catch(() => {});
        }
    }, { once: true });

    // Run scroll animations
    animateOnScroll();
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