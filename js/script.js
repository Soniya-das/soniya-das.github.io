// ============================================
// 1. INITIALIZE AOS
// ============================================
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ============================================
// 2. TYPED.JS FOR HERO ROLE
// ============================================
if (document.getElementById('typed-role')) {
    new Typed('#typed-role', {
        strings: ['Python Fullstack Developer', 'Web Designer', 'Creative Coder', 'Problem Solver'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        cursorChar: '|'
    });
}

// ============================================
// 3. THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    if (document.documentElement.hasAttribute('data-theme')) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// ============================================
// 4. SCROLL PROGRESS BAR
// ============================================
const progressBarScroll = document.createElement('div');
progressBarScroll.className = 'scroll-progress';
document.body.appendChild(progressBarScroll);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBarScroll.style.width = scrolled + '%';
});

// ============================================
// 5. SIMPLE ROUND SHAPE WITH GLITTER STARS
// ============================================

// Make sure shape is perfectly round
function makeRoundShape() {
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        blobShape.style.borderRadius = '50%';
        blobShape.style.clipPath = 'none';
        blobShape.style.background = 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 25%, #d4af37 50%, #b8941e 75%, #d4af37 100%)';
        blobShape.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.4)';
    }
}

// Gentle floating animation (very subtle)
let floatY = 0;
let floatDirection = 1;
let glowIntensity = 0;
let glowDirection = 1;

function gentleFloat() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Very gentle floating
    floatY += 0.08 * floatDirection;
    if (floatY > 5) floatDirection = -1;
    if (floatY < -5) floatDirection = 1;
    
    // Gentle glow pulse
    glowIntensity += 0.01 * glowDirection;
    if (glowIntensity > 0.4) glowDirection = -1;
    if (glowIntensity < 0.2) glowDirection = 1;
    
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        blobShape.style.boxShadow = `0 0 ${30 + glowIntensity * 15}px rgba(212, 175, 55, ${0.3 + glowIntensity * 0.2})`;
    }
    
    blobWrapper.style.transform = `translateY(${floatY * 0.2}px)`;
    requestAnimationFrame(gentleFloat);
}

// Create elegant glitter stars around the circle
function createGlitterStars() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing stars
    const existingStars = blobWrapper.querySelectorAll('.glitter-star');
    existingStars.forEach(star => star.remove());
    
    const size = blobWrapper.offsetWidth;
    const center = size / 2;
    const radius = size * 0.58; // Stars positioned around the circle
    
    // Create 24 elegant glitter stars
    for (let i = 0; i < 24; i++) {
        const angle = (i * 15) * Math.PI / 180;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        
        const star = document.createElement('div');
        star.className = 'glitter-star';
        
        // Different star sizes for elegance
        let starSize = 4;
        let starType = '';
        
        if (i % 4 === 0) {
            starSize = 6;
            starType = 'sparkle';
        } else if (i % 3 === 0) {
            starSize = 5;
        } else {
            starSize = 3;
        }
        
        star.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${starSize}px;
            height: ${starSize}px;
            background: radial-gradient(circle, #ffec80, #d4af37);
            border-radius: 50%;
            opacity: 0;
            box-shadow: 0 0 ${starSize * 1.5}px #ffd700;
            animation: starTwinkle ${1.5 + Math.random() * 1}s ease-in-out infinite;
            animation-delay: ${i * 0.08}s;
            pointer-events: none;
        `;
        
        if (starType === 'sparkle') {
            star.style.background = 'transparent';
            star.style.width = '8px';
            star.style.height = '8px';
            star.style.fontSize = '12px';
            star.style.color = '#ffd700';
            star.style.textShadow = '0 0 8px #d4af37';
            star.innerHTML = '✦';
            star.style.textAlign = 'center';
            star.style.lineHeight = '8px';
        }
        
        blobWrapper.appendChild(star);
    }
    
    // Add inner ring of smaller stars
    const innerRadius = size * 0.45;
    for (let i = 0; i < 16; i++) {
        const angle = (i * 22.5 + 11.25) * Math.PI / 180;
        const x = center + Math.cos(angle) * innerRadius;
        const y = center + Math.sin(angle) * innerRadius;
        
        const star = document.createElement('div');
        star.className = 'glitter-star';
        star.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 2px;
            height: 2px;
            background: #d4af37;
            border-radius: 50%;
            opacity: 0;
            box-shadow: 0 0 4px #ffd700;
            animation: starTwinkle ${1.2 + Math.random() * 0.8}s ease-in-out infinite;
            animation-delay: ${i * 0.1}s;
            pointer-events: none;
        `;
        blobWrapper.appendChild(star);
    }
}

// Add elegant rotating ring
function addElegantRing() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    const existingRing = blobWrapper.querySelector('.elegant-ring');
    if (existingRing) existingRing.remove();
    
    const ring = document.createElement('div');
    ring.className = 'elegant-ring';
    ring.style.cssText = `
        position: absolute;
        top: -18px;
        left: -18px;
        right: -18px;
        bottom: -18px;
        border-radius: 50%;
        border: 1.5px solid rgba(212, 175, 55, 0.4);
        animation: ringRotate 20s linear infinite;
        pointer-events: none;
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
    `;
    blobWrapper.appendChild(ring);
    
    // Second subtle dashed ring
    const ring2 = document.createElement('div');
    ring2.className = 'elegant-ring';
    ring2.style.cssText = `
        position: absolute;
        top: -30px;
        left: -30px;
        right: -30px;
        bottom: -30px;
        border-radius: 50%;
        border: 1px dashed rgba(212, 175, 55, 0.25);
        animation: ringRotateReverse 25s linear infinite;
        pointer-events: none;
    `;
    blobWrapper.appendChild(ring2);
}

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        makeRoundShape();
        addElegantRing();
        createGlitterStars();
        gentleFloat();
        console.log('✨ Elegant Round Shape with Glitter Stars Loaded ✨');
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createGlitterStars();
    }, 200);
});

// ============================================
// 6. 3D TILT ON HOVER (Subtle)
// ============================================
const blobWrapper = document.getElementById('blobWrapper');
const blobImg = document.querySelector('.blob-shape img');

if (blobWrapper && blobImg) {
    blobWrapper.addEventListener('mousemove', (e) => {
        const rect = blobWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = ((y - centerY) / centerY) * 5;
        const tiltY = ((x - centerX) / centerX) * 5;
        const moveX = (x - centerX) / 40;
        const moveY = (y - centerY) / 40;
        
        blobWrapper.style.transform = `translateY(${floatY * 0.2}px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.02)`;
        blobImg.style.transition = 'transform 0.05s linear';
    });
    
    blobWrapper.addEventListener('mouseleave', () => {
        blobImg.style.transform = '';
        blobWrapper.style.transform = `translateY(${floatY * 0.2}px)`;
    });
}

// ============================================
// 7. BACKGROUND PARTICLES (Subtle)
// ============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.1;
            this.speedY = (Math.random() - 0.5) * 0.1;
            this.opacity = Math.random() * 0.12 + 0.03;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 60; i++) particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    resizeCanvas();
    initParticles();
    animateParticles();
}

// ============================================
// 8. CSS ANIMATIONS
// ============================================
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes starTwinkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        40% { opacity: 1; transform: scale(1.2); }
        60% { opacity: 0.8; transform: scale(1); }
    }
    
    @keyframes ringRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes ringRotateReverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
    }
    
    .blob-shape {
        transition: box-shadow 0.3s ease !important;
    }
    
    .blob-wrapper {
        transition: transform 0.05s linear;
    }
    
    .glitter-star {
        will-change: opacity, transform;
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ Simple Round Shape + Elegant Glitter Stars — Luxury Portfolio Ready ✨');
