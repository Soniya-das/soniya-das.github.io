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
// 5. PROFESSIONAL ROUND SHAPE WITH GLITTER STARS
// ============================================

// Make perfect round shape
function makeRoundShape() {
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        blobShape.style.borderRadius = '50%';
        blobShape.style.clipPath = 'none';
        blobShape.style.background = 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 20%, #d4af37 45%, #e8c547 70%, #d4af37 100%)';
        blobShape.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.4)';
        blobShape.style.transition = 'all 0.3s ease';
    }
}

// Gentle floating animation
let floatY = 0;
let floatDirection = 1;
let glowIntensity = 0;
let glowDirection = 1;

function gentleFloat() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    floatY += 0.06 * floatDirection;
    if (floatY > 4) floatDirection = -1;
    if (floatY < -4) floatDirection = 1;
    
    glowIntensity += 0.008 * glowDirection;
    if (glowIntensity > 0.35) glowDirection = -1;
    if (glowIntensity < 0.15) glowDirection = 1;
    
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        blobShape.style.boxShadow = `0 0 ${35 + glowIntensity * 20}px rgba(212, 175, 55, ${0.35 + glowIntensity * 0.15})`;
    }
    
    blobWrapper.style.transform = `translateY(${floatY * 0.15}px)`;
    requestAnimationFrame(gentleFloat);
}

// Create professional glitter stars
function createProfessionalStars() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing stars
    const existingStars = blobWrapper.querySelectorAll('.star, .ring-gold');
    existingStars.forEach(star => star.remove());
    
    const size = blobWrapper.offsetWidth;
    const center = size / 2;
    
    // === OUTER RING (Gold border) ===
    const outerRing = document.createElement('div');
    outerRing.className = 'ring-gold';
    outerRing.style.cssText = `
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
        border-radius: 50%;
        border: 2px solid rgba(212, 175, 55, 0.5);
        animation: rotateRing 20s linear infinite;
        pointer-events: none;
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
    `;
    blobWrapper.appendChild(outerRing);
    
    // === MIDDLE DASHED RING ===
    const middleRing = document.createElement('div');
    middleRing.className = 'ring-gold';
    middleRing.style.cssText = `
        position: absolute;
        top: -25px;
        left: -25px;
        right: -25px;
        bottom: -25px;
        border-radius: 50%;
        border: 1.5px dashed rgba(212, 175, 55, 0.35);
        animation: rotateRingReverse 25s linear infinite;
        pointer-events: none;
    `;
    blobWrapper.appendChild(middleRing);
    
    // === OUTER STARS (24 stars - main decoration) ===
    const outerRadius = size * 0.59;
    for (let i = 0; i < 24; i++) {
        const angle = (i * 15) * Math.PI / 180;
        const x = center + Math.cos(angle) * outerRadius;
        const y = center + Math.sin(angle) * outerRadius;
        
        const star = document.createElement('div');
        star.className = 'star';
        
        let starSize = 5;
        let isSparkle = false;
        
        if (i % 6 === 0) {
            starSize = 8;
            isSparkle = true;
        } else if (i % 3 === 0) {
            starSize = 6;
        } else {
            starSize = 4;
        }
        
        if (isSparkle) {
            star.innerHTML = '✦';
            star.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${starSize}px;
                height: ${starSize}px;
                color: #ffd700;
                font-size: ${starSize + 2}px;
                text-align: center;
                line-height: ${starSize}px;
                opacity: 0;
                text-shadow: 0 0 10px #d4af37;
                animation: starSparkle 2s ease-in-out infinite;
                animation-delay: ${i * 0.08}s;
                pointer-events: none;
            `;
        } else {
            star.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${starSize}px;
                height: ${starSize}px;
                background: radial-gradient(circle, #fff0a0, #d4af37);
                border-radius: 50%;
                opacity: 0;
                box-shadow: 0 0 ${starSize}px #ffd700;
                animation: starTwinkle ${1.8 + Math.random() * 0.5}s ease-in-out infinite;
                animation-delay: ${i * 0.08}s;
                pointer-events: none;
            `;
        }
        blobWrapper.appendChild(star);
    }
    
    // === INNER STARS (16 smaller stars) ===
    const innerRadius = size * 0.47;
    for (let i = 0; i < 16; i++) {
        const angle = (i * 22.5 + 11.25) * Math.PI / 180;
        const x = center + Math.cos(angle) * innerRadius;
        const y = center + Math.sin(angle) * innerRadius;
        
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 3px;
            height: 3px;
            background: #f5e6a3;
            border-radius: 50%;
            opacity: 0;
            box-shadow: 0 0 5px #ffd700;
            animation: starTwinkle ${1.5 + Math.random() * 0.5}s ease-in-out infinite;
            animation-delay: ${i * 0.12}s;
            pointer-events: none;
        `;
        blobWrapper.appendChild(star);
    }
    
    // === FLOATING GOLD DUST (20 tiny particles) ===
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = size * (0.52 + Math.random() * 0.15);
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        
        const dust = document.createElement('div');
        dust.className = 'gold-dust';
        dust.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 2px;
            height: 2px;
            background: #d4af37;
            border-radius: 50%;
            opacity: 0;
            animation: dustFloat ${2 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${i * 0.15}s;
            pointer-events: none;
        `;
        blobWrapper.appendChild(dust);
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        makeRoundShape();
        createProfessionalStars();
        gentleFloat();
        console.log('✨ Professional Round Shape with Glitter Stars — Loaded ✨');
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createProfessionalStars();
    }, 200);
});

// ============================================
// 6. PROFESSIONAL 3D TILT ON HOVER
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
        
        const tiltX = ((y - centerY) / centerY) * 6;
        const tiltY = ((x - centerX) / centerX) * 6;
        const moveX = (x - centerX) / 35;
        const moveY = (y - centerY) / 35;
        
        blobWrapper.style.transform = `translateY(${floatY * 0.15}px) perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.03)`;
        blobImg.style.transition = 'transform 0.05s linear';
        
        // Enhance glow on hover
        const blobShape = document.querySelector('.blob-shape');
        if (blobShape) {
            blobShape.style.boxShadow = '0 0 70px rgba(212, 175, 55, 0.7)';
        }
    });
    
    blobWrapper.addEventListener('mouseleave', () => {
        blobImg.style.transform = '';
        blobWrapper.style.transform = `translateY(${floatY * 0.15}px)`;
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
            this.size = Math.random() * 2 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.08;
            this.speedY = (Math.random() - 0.5) * 0.08;
            this.opacity = Math.random() * 0.12 + 0.04;
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
        for (let i = 0; i < 80; i++) particles.push(new Particle());
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
        70% { opacity: 0.7; transform: scale(1); }
    }
    
    @keyframes starSparkle {
        0%, 100% { opacity: 0; transform: scale(0.6); }
        50% { opacity: 1; transform: scale(1.3); text-shadow: 0 0 15px #ffd700; }
    }
    
    @keyframes dustFloat {
        0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.5); }
        30% { opacity: 0.6; transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) scale(1); }
        70% { opacity: 0.3; transform: translate(${Math.random() * 8 - 4}px, ${Math.random() * 8 - 4}px) scale(0.8); }
    }
    
    @keyframes rotateRing {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes rotateRingReverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
    }
    
    .blob-shape {
        transition: box-shadow 0.3s ease !important;
    }
    
    .blob-wrapper {
        transition: transform 0.05s linear;
    }
    
    .star, .gold-dust {
        will-change: opacity, transform;
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ Professional Round + Glitter Stars — Attractive & Elegant ✨');
