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
// 5. SINGLE PROFESSIONAL SHAPE - NO LOTUS, NO DIAMOND
// ============================================

// ONLY ONE SHAPE - Clean, Balanced, Professional 24-point Soft Polygon
// This is a unique custom shape - elegant, symmetrical, modern
const uniqueProfessionalShape = 'polygon(50% 0%, 58% 5%, 66% 3%, 74% 8%, 82% 6%, 89% 14%, 94% 22%, 97% 32%, 99% 42%, 99% 52%, 97% 62%, 94% 72%, 89% 80%, 82% 88%, 74% 92%, 66% 97%, 58% 95%, 50% 100%, 42% 95%, 34% 97%, 26% 92%, 18% 88%, 11% 80%, 6% 72%, 3% 62%, 1% 52%, 1% 42%, 3% 32%, 6% 22%, 11% 14%, 18% 6%, 26% 8%, 34% 3%, 42% 5%)';

// Premium gold gradient
const premiumGradient = 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 20%, #d4af37 45%, #e8c547 70%, #d4af37 100%)';

// Animation variables
let floatY = 0;
let floatDirection = 1;
let glowIntensity = 0;
let glowDirection = 1;

// Apply the shape once
function applyShape() {
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        blobShape.style.clipPath = uniqueProfessionalShape;
        blobShape.style.background = premiumGradient;
    }
}

// Gentle floating animation
function gentleFloatAnimation() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Smooth vertical floating
    floatY += 0.15 * floatDirection;
    if (floatY > 8) floatDirection = -1;
    if (floatY < -8) floatDirection = 1;
    
    // Pulsing glow effect
    glowIntensity += 0.015 * glowDirection;
    if (glowIntensity > 0.5) glowDirection = -1;
    if (glowIntensity < 0.2) glowDirection = 1;
    
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        blobShape.style.boxShadow = `0 0 ${35 + glowIntensity * 20}px rgba(212, 175, 55, ${0.3 + glowIntensity * 0.2})`;
    }
    
    blobWrapper.style.transform = `translateY(${floatY * 0.3}px)`;
    requestAnimationFrame(gentleFloatAnimation);
}

// Create subtle elegant decorations
function createSubtleDecorations() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove any existing decorations
    const existingDeco = blobWrapper.querySelectorAll('.deco-ring, .deco-star, .deco-particle');
    existingDeco.forEach(el => el.remove());
    
    const size = blobWrapper.offsetWidth;
    const center = size / 2;
    
    // Single elegant rotating ring
    const ring = document.createElement('div');
    ring.className = 'deco-ring';
    ring.style.cssText = `
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
        border-radius: 50%;
        border: 1.5px solid rgba(212, 175, 55, 0.4);
        animation: rotateRing 18s linear infinite;
        pointer-events: none;
    `;
    blobWrapper.appendChild(ring);
    
    // Second subtle dashed ring
    const ring2 = document.createElement('div');
    ring2.className = 'deco-ring';
    ring2.style.cssText = `
        position: absolute;
        top: -24px;
        left: -24px;
        right: -24px;
        bottom: -24px;
        border-radius: 50%;
        border: 1px dashed rgba(212, 175, 55, 0.25);
        animation: rotateRingReverse 22s linear infinite;
        pointer-events: none;
    `;
    blobWrapper.appendChild(ring2);
    
    // Small elegant stars around (very subtle)
    const starContainer = document.createElement('div');
    starContainer.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;`;
    
    // 12 subtle star dots
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180;
        const radius = size * 0.6;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        
        const star = document.createElement('div');
        star.className = 'deco-star';
        star.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 3px;
            height: 3px;
            background: #d4af37;
            border-radius: 50%;
            opacity: 0.5;
            animation: starPulse 2.5s ease-in-out infinite;
            animation-delay: ${i * 0.15}s;
        `;
        starContainer.appendChild(star);
    }
    
    blobWrapper.appendChild(starContainer);
    
    // Floating particles (very subtle)
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;`;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const angle = Math.random() * Math.PI * 2;
        const radius = size * (0.45 + Math.random() * 0.3);
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        
        particle.className = 'deco-particle';
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 2px;
            height: 2px;
            background: rgba(212, 175, 55, 0.4);
            border-radius: 50%;
            animation: particleFloat ${3 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${i * 0.1}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    blobWrapper.appendChild(particleContainer);
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        applyShape();
        createSubtleDecorations();
        gentleFloatAnimation();
        console.log('✨ Professional Clean Shape Loaded — One Unique Shape ✨');
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createSubtleDecorations();
    }, 200);
});

// ============================================
// 6. SMOOTH 3D TILT ON HOVER
// ============================================
const blobWrapper = document.getElementById('blobWrapper');
const blobShape = document.querySelector('.blob-shape');
const blobImg = document.querySelector('.blob-shape img');

if (blobWrapper && blobShape && blobImg) {
    let hoverActive = false;
    
    blobWrapper.addEventListener('mousemove', (e) => {
        const rect = blobWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = ((y - centerY) / centerY) * 6;
        const tiltY = ((x - centerX) / centerX) * 6;
        const moveX = (x - centerX) / 35;
        const moveY = (y - centerY) / 35;
        
        blobWrapper.style.transform = `translateY(${floatY * 0.3}px) perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        
        if (blobImg) {
            blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.02)`;
            blobImg.style.transition = 'transform 0.05s linear';
        }
    });
    
    blobWrapper.addEventListener('mouseleave', () => {
        if (blobImg) {
            blobImg.style.transform = '';
        }
        blobWrapper.style.transform = `translateY(${floatY * 0.3}px)`;
    });
}

// ============================================
// 7. BACKGROUND PARTICLES
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
            this.opacity = Math.random() * 0.15 + 0.05;
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
        for (let i = 0; i < 70; i++) particles.push(new Particle());
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
    @keyframes rotateRing {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes rotateRingReverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
    }
    
    @keyframes starPulse {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 0.8; transform: scale(1.2); }
    }
    
    @keyframes particleFloat {
        0%, 100% { opacity: 0; transform: translate(0, 0); }
        20% { opacity: 0.5; transform: translate(var(--dx, 5px), var(--dy, 5px)); }
        80% { opacity: 0.3; transform: translate(var(--dx, -3px), var(--dy, -3px)); }
    }
    
    .blob-shape {
        transition: box-shadow 0.3s ease !important;
    }
    
    .blob-wrapper {
        transition: transform 0.05s linear;
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ Single Professional Shape — Clean, Unique & Elegant ✨');
