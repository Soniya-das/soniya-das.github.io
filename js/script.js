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
// 5. UNIQUE MORPHING SHAPE WITH ROTATION & GLITTER STARS
// ============================================

// Dynamic shape morphing animation
function startShapeMorphing() {
    const blobShape = document.querySelector('.blob-shape');
    if (!blobShape) return;
    
    // Different shape keyframes - completely unique organic shapes
    const shapes = [
        'polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)',
        'polygon(30% 0%, 70% 5%, 95% 30%, 100% 70%, 75% 95%, 40% 100%, 5% 80%, 0% 40%)',
        'polygon(40% 0%, 80% 10%, 98% 40%, 92% 78%, 65% 98%, 28% 95%, 5% 72%, 2% 35%)',
        'polygon(45% 0%, 75% 8%, 95% 35%, 88% 72%, 60% 95%, 25% 88%, 8% 65%, 12% 28%)',
        'polygon(35% 2%, 72% 5%, 92% 28%, 96% 62%, 78% 92%, 42% 97%, 12% 82%, 4% 48%)',
        'polygon(50% 0%, 90% 20%, 100% 55%, 82% 88%, 48% 100%, 15% 85%, 0% 55%, 18% 22%)',
        'polygon(38% 0%, 78% 12%, 94% 38%, 86% 75%, 55% 94%, 22% 88%, 6% 62%, 10% 28%)',
        'polygon(42% 3%, 68% 8%, 88% 32%, 94% 68%, 72% 90%, 38% 96%, 10% 78%, 6% 42%)'
    ];
    
    let shapeIndex = 0;
    
    setInterval(() => {
        shapeIndex = (shapeIndex + 1) % shapes.length;
        blobShape.style.clipPath = shapes[shapeIndex];
        blobShape.style.transition = 'clip-path 2.5s cubic-bezier(0.45, 0.05, 0.2, 0.99)';
    }, 3000);
}

// Continuous rotation animation
function startContinuousRotation() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    let rotation = 0;
    let direction = 1;
    
    setInterval(() => {
        rotation += 0.3 * direction;
        if (Math.abs(rotation) > 8) direction *= -1;
        blobWrapper.style.transform = `perspective(1200px) rotateY(${rotation}deg) rotateX(${rotation * 0.5}deg)`;
    }, 50);
}

// Create unique shape with glitter stars
function createGlitterStars() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing decorations
    const existingContainer = blobWrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    const existingRings = blobWrapper.querySelectorAll('.star-ring, .golden-border-ring, .morph-ring');
    existingRings.forEach(ring => ring.remove());
    const existingParticles = blobWrapper.querySelectorAll('.floating-particle');
    existingParticles.forEach(p => p.remove());
    
    // Get current size for responsive positioning
    const wrapperSize = blobWrapper.offsetWidth;
    const center = wrapperSize / 2;
    const outerRadius = wrapperSize * 0.62;
    const innerRadius = wrapperSize * 0.48;
    const midRadius = wrapperSize * 0.55;
    
    // Create morphing ring (dynamic shape-following ring)
    const morphRing = document.createElement('div');
    morphRing.className = 'morph-ring';
    morphRing.style.cssText = `
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary), transparent, var(--primary-dark), transparent);
        opacity: 0.5;
        animation: morphRingPulse 3s ease-in-out infinite, rotateRing 8s linear infinite;
        pointer-events: none;
        filter: blur(3px);
    `;
    blobWrapper.appendChild(morphRing);
    
    // Create rotating geometric ring
    const geoRing = document.createElement('div');
    geoRing.className = 'geo-ring';
    geoRing.style.cssText = `
        position: absolute;
        top: -25px;
        left: -25px;
        right: -25px;
        bottom: -25px;
        border-radius: 40% 60% 35% 65% / 55% 45% 55% 45%;
        border: 2px solid var(--primary);
        opacity: 0.4;
        animation: morphBorder 6s ease-in-out infinite, rotateRingReverse 10s linear infinite;
        pointer-events: none;
        box-shadow: 0 0 15px var(--primary-glow);
    `;
    blobWrapper.appendChild(geoRing);
    
    // Create rotating rings
    const ring1 = document.createElement('div');
    ring1.className = 'star-ring';
    const ring2 = document.createElement('div');
    ring2.className = 'star-ring secondary';
    const goldenRing = document.createElement('div');
    goldenRing.className = 'golden-border-ring';
    
    blobWrapper.appendChild(ring1);
    blobWrapper.appendChild(ring2);
    blobWrapper.appendChild(goldenRing);
    
    // Create star container
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // Create outer stars - diamond shaped arrangement
    const outerStarCount = 32;
    for (let i = 0; i < outerStarCount; i++) {
        // Create non-circular star arrangement (elliptical / organic)
        const angle = (i / outerStarCount) * Math.PI * 2;
        const xOffset = Math.cos(angle) * outerRadius * (1 + Math.sin(angle * 3) * 0.15);
        const yOffset = Math.sin(angle) * outerRadius * (1 + Math.cos(angle * 2) * 0.12);
        const x = center + xOffset;
        const y = center + yOffset;
        
        const star = document.createElement('div');
        star.className = 'glit-star';
        if (i % 3 === 0) star.classList.add('sparkle');
        if (i % 5 === 0) star.style.background = '#ffdd88';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.12) + 's';
        star.style.animationDuration = (1.5 + Math.random() * 1) + 's';
        starContainer.appendChild(star);
    }
    
    // Create mid stars - swirling pattern
    const midStarCount = 20;
    for (let i = 0; i < midStarCount; i++) {
        const angle = (i / midStarCount) * Math.PI * 2;
        const swirl = Math.sin(angle * 4) * 12;
        const x = center + Math.cos(angle) * (midRadius + swirl);
        const y = center + Math.sin(angle) * (midRadius + swirl * 0.7);
        
        const star = document.createElement('div');
        star.className = 'glit-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = '5px';
        star.style.height = '5px';
        star.style.animationDelay = (i * 0.18) + 's';
        star.style.animationDuration = '1.8s';
        starContainer.appendChild(star);
    }
    
    // Create inner stars
    const innerStarCount = 16;
    for (let i = 0; i < innerStarCount; i++) {
        const angle = (i / innerStarCount) * Math.PI * 2 + 0.5;
        const x = center + Math.cos(angle) * innerRadius;
        const y = center + Math.sin(angle) * innerRadius;
        
        const star = document.createElement('div');
        star.className = 'glit-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = '3px';
        star.style.height = '3px';
        star.style.animationDelay = (i * 0.25) + 's';
        star.style.animationDuration = '1.3s';
        starContainer.appendChild(star);
    }
    
    blobWrapper.appendChild(starContainer);
    
    // Create floating energy particles
    const particleCount = 18;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        const angle = Math.random() * Math.PI * 2;
        const distance = innerRadius + Math.random() * 45;
        const x = Math.cos(angle) * distance * (0.8 + Math.random() * 0.5);
        const y = Math.sin(angle) * distance * (0.7 + Math.random() * 0.6);
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        particle.style.left = center + 'px';
        particle.style.top = center + 'px';
        particle.style.animationDelay = (i * 0.25) + 's';
        particle.style.animationDuration = (2.5 + Math.random() * 2) + 's';
        blobWrapper.appendChild(particle);
    }
}

// Initialize stars and shape animations
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createGlitterStars();
        startShapeMorphing();
        startContinuousRotation();
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
// 6. DYNAMIC 3D TILT & SHADOW EFFECT FOR IMAGE
// ============================================
const blobWrapper = document.getElementById('blobWrapper');
const blobShape = document.querySelector('.blob-shape');
const blobImg = document.querySelector('.blob-shape img');

if (blobWrapper && blobShape && blobImg) {
    let tiltActive = false;
    
    blobWrapper.addEventListener('mousemove', (e) => {
        tiltActive = true;
        const rect = blobWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        
        blobWrapper.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        if (blobImg) {
            blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.04)`;
            blobImg.style.filter = 'brightness(1.08) drop-shadow(0 20px 30px rgba(0,0,0,0.3))';
        }
        blobShape.style.boxShadow = `0 0 40px rgba(212, 175, 55, 0.6)`;
    });
    
    blobWrapper.addEventListener('mouseleave', () => {
        tiltActive = false;
        blobWrapper.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        if (blobImg) {
            blobImg.style.transform = '';
            blobImg.style.filter = '';
        }
        blobShape.style.boxShadow = '';
    });
}

// Add pulsing glow effect to shape
setInterval(() => {
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape && !blobShape.matches(':hover')) {
        blobShape.style.transition = 'box-shadow 0.5s ease';
        blobShape.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.3)';
        setTimeout(() => {
            if (blobShape && !blobShape.matches(':hover')) {
                blobShape.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.5)';
            }
        }, 2000);
    }
}, 4000);

// ============================================
// 7. PARTICLE BACKGROUND (Enhanced)
// ============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = null, mouseY = null;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.35 + 0.1;
            this.originalX = this.x;
            this.originalY = this.y;
        }
        update() {
            // Mouse interaction - particles move away from cursor
            if (mouseX && mouseY) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    const angle = Math.atan2(dy, dx);
                    const force = (120 - distance) / 120;
                    this.x += Math.cos(angle) * force * 2;
                    this.y += Math.sin(angle) * force * 2;
                } else {
                    // Return to original position slowly
                    this.x += (this.originalX - this.x) * 0.02;
                    this.y += (this.originalY - this.y) * 0.02;
                }
            }
            
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0) { this.x = canvas.width; this.originalX = this.x; }
            if (this.x > canvas.width) { this.x = 0; this.originalX = this.x; }
            if (this.y < 0) { this.y = canvas.height; this.originalY = this.y; }
            if (this.y > canvas.height) { this.y = 0; this.originalY = this.y; }
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
        for (let i = 0; i < 120; i++) particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.08 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
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
// 8. SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ============================================
// 9. ADD CSS ANIMATIONS DYNAMICALLY
// ============================================
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes morphRingPulse {
        0%, 100% { opacity: 0.3; transform: scale(0.98); filter: blur(3px); }
        50% { opacity: 0.6; transform: scale(1.05); filter: blur(6px); }
    }
    
    @keyframes morphBorder {
        0% { border-radius: 40% 60% 35% 65% / 55% 45% 55% 45%; }
        25% { border-radius: 55% 45% 60% 40% / 45% 55% 45% 55%; }
        50% { border-radius: 35% 65% 45% 55% / 65% 35% 65% 35%; }
        75% { border-radius: 60% 40% 55% 45% / 40% 60% 40% 60%; }
        100% { border-radius: 40% 60% 35% 65% / 55% 45% 55% 45%; }
    }
    
    .blob-shape {
        transition: clip-path 2.5s cubic-bezier(0.45, 0.05, 0.2, 0.99), transform 0.5s ease, box-shadow 0.3s ease !important;
        animation: none !important;
    }
    
    .glit-star {
        background: radial-gradient(circle, #ffec80, #d4af37);
    }
    
    .glit-star.sparkle::before {
        font-size: 16px;
        animation: sparkleRotate 2s linear infinite;
    }
    
    @keyframes sparkleRotate {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ Unique Morphing Shape Portfolio Loaded — Polygon Morphing + Continuous Rotation + Glitter Stars!');
