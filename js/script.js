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
// 5. ROYAL DIAMOND AURORA - ENHANCED UNIQUE SHAPE
// ============================================

// 12 Unique Royal Shapes (more variety)
const royalShapes = [
    'polygon(50% 0%, 85% 12%, 98% 35%, 92% 65%, 78% 88%, 50% 98%, 22% 88%, 8% 65%, 2% 35%, 15% 12%)',
    'polygon(50% 0%, 68% 18%, 88% 15%, 85% 35%, 100% 50%, 85% 65%, 88% 85%, 68% 82%, 50% 100%, 32% 82%, 12% 85%, 15% 65%, 0% 50%, 15% 35%, 12% 18%, 32% 18%)',
    'polygon(35% 0%, 50% 8%, 65% 0%, 82% 15%, 95% 35%, 88% 60%, 95% 82%, 75% 95%, 50% 88%, 25% 95%, 5% 82%, 12% 60%, 5% 35%, 18% 15%)',
    'polygon(50% 2%, 75% 15%, 92% 38%, 96% 62%, 88% 82%, 70% 95%, 50% 98%, 30% 95%, 12% 82%, 4% 62%, 8% 38%, 25% 15%)',
    'polygon(50% 3%, 70% 10%, 88% 25%, 97% 48%, 93% 72%, 80% 88%, 58% 97%, 42% 97%, 20% 88%, 7% 72%, 3% 48%, 12% 25%, 30% 10%)',
    'polygon(50% 5%, 68% 12%, 82% 28%, 94% 45%, 90% 65%, 78% 82%, 60% 93%, 40% 93%, 22% 82%, 10% 65%, 6% 45%, 18% 28%, 32% 12%)',
    'polygon(45% 2%, 55% 2%, 72% 10%, 85% 22%, 98% 42%, 94% 62%, 85% 80%, 68% 92%, 50% 98%, 32% 92%, 15% 80%, 6% 62%, 2% 42%, 15% 22%, 28% 10%)',
    'polygon(50% 4%, 72% 14%, 88% 32%, 96% 54%, 90% 75%, 74% 90%, 50% 96%, 26% 90%, 10% 75%, 4% 54%, 12% 32%, 28% 14%)',
    'polygon(50% 0%, 80% 8%, 95% 28%, 98% 55%, 85% 78%, 62% 92%, 38% 92%, 15% 78%, 2% 55%, 5% 28%, 20% 8%)',
    'polygon(42% 0%, 58% 0%, 78% 12%, 92% 32%, 95% 55%, 88% 78%, 70% 92%, 50% 98%, 30% 92%, 12% 78%, 5% 55%, 8% 32%, 22% 12%)',
    'polygon(50% 2%, 72% 8%, 88% 22%, 97% 45%, 94% 68%, 80% 86%, 58% 96%, 42% 96%, 20% 86%, 6% 68%, 3% 45%, 12% 22%, 28% 8%)',
    'polygon(48% 0%, 52% 0%, 75% 10%, 90% 28%, 98% 50%, 90% 72%, 75% 90%, 52% 100%, 48% 100%, 25% 90%, 10% 72%, 2% 50%, 10% 28%, 25% 10%)'
];

// 8 Luxury Gradients
const royalGradients = [
    'linear-gradient(135deg, #d4af37 0%, #f3e5ab 25%, #d4af37 50%, #b8941e 75%, #d4af37 100%)',
    'linear-gradient(45deg, #c9a52c 0%, #ffd700 30%, #f9e076 60%, #d4af37 100%)',
    'radial-gradient(circle at 30% 40%, #d4af37, #b8860b, #8b6914)',
    'conic-gradient(from 0deg, #d4af37, #f3e5ab, #d4af37, #b8941e, #d4af37)',
    'linear-gradient(120deg, #e8c547 0%, #d4af37 40%, #c9a32c 80%, #d4af37 100%)',
    'radial-gradient(ellipse at 50% 50%, #ffd700, #d4af37, #b8860b)',
    'linear-gradient(160deg, #d4af37, #f5e6a3, #d4af37, #c9a32c)',
    'conic-gradient(from 90deg, #ffd700, #d4af37, #b8860b, #d4af37, #ffd700)'
];

let shapeIndex = 0;
let gradientIndex = 0;
let rotationAngle = 0;
let rotationDirection = 1;
let pulseScale = 1;
let pulseDirection = 1;

function morphToNextShape() {
    const blobShape = document.querySelector('.blob-shape');
    if (!blobShape) return;
    shapeIndex = (shapeIndex + 1) % royalShapes.length;
    blobShape.style.clipPath = royalShapes[shapeIndex];
    blobShape.style.transition = 'clip-path 2.5s cubic-bezier(0.34, 1.2, 0.64, 1), background 1.5s ease';
    
    // Add subtle vibration effect on shape change
    blobShape.style.transform = 'scale(1.02)';
    setTimeout(() => {
        if (blobShape) blobShape.style.transform = '';
    }, 200);
}

function changeGradient() {
    const blobShape = document.querySelector('.blob-shape');
    if (!blobShape) return;
    gradientIndex = (gradientIndex + 1) % royalGradients.length;
    blobShape.style.background = royalGradients[gradientIndex];
}

// Continuous floating rotation with pulse
function continuousRotation() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    rotationAngle += 0.15 * rotationDirection;
    if (rotationAngle > 5) rotationDirection = -1;
    if (rotationAngle < -5) rotationDirection = 1;
    
    // Pulse effect
    pulseScale += 0.003 * pulseDirection;
    if (pulseScale > 1.02) pulseDirection = -1;
    if (pulseScale < 0.98) pulseDirection = 1;
    
    blobWrapper.style.transform = `perspective(1500px) rotateY(${rotationAngle}deg) rotateX(${rotationAngle * 0.3}deg) scale(${pulseScale})`;
    requestAnimationFrame(continuousRotation);
}

// Create Royal Aurora Shape with all decorations
function createRoyalShape() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing decorations
    const existingContainer = blobWrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    const existingRings = blobWrapper.querySelectorAll('.star-ring, .golden-border-ring, .morph-ring, .diamond-ring, .luxury-border, .aurora-ring');
    existingRings.forEach(ring => ring.remove());
    const existingParticles = blobWrapper.querySelectorAll('.floating-particle, .luxury-particle, .royal-particle');
    existingParticles.forEach(p => p.remove());
    
    const wrapperSize = blobWrapper.offsetWidth;
    const center = wrapperSize / 2;
    
    // Create Aurora Borealis effect ring
    const auroraRing = document.createElement('div');
    auroraRing.className = 'aurora-ring';
    auroraRing.style.cssText = `
        position: absolute;
        top: -40px;
        left: -40px;
        right: -40px;
        bottom: -40px;
        background: radial-gradient(ellipse at 30% 40%, rgba(212,175,55,0.2), transparent 70%);
        border-radius: 50%;
        animation: auroraPulse 4s ease-in-out infinite, auroraRotate 12s linear infinite;
        pointer-events: none;
        filter: blur(15px);
    `;
    blobWrapper.appendChild(auroraRing);
    
    // 5 Layered Royal Rings
    const ringColors = ['#d4af37', '#ffd700', '#f3e5ab', '#b8941e', '#e8c547'];
    for (let i = 0; i < 5; i++) {
        const size = 1.1 + (i * 0.05);
        const ring = document.createElement('div');
        ring.className = `royal-ring-${i}`;
        ring.style.cssText = `
            position: absolute;
            top: ${-wrapperSize * (size - 1) / 2}px;
            left: ${-wrapperSize * (size - 1) / 2}px;
            width: ${wrapperSize * size}px;
            height: ${wrapperSize * size}px;
            border-radius: 50%;
            border: ${2 - i * 0.3}px solid ${ringColors[i % ringColors.length]};
            opacity: ${0.5 - i * 0.07};
            animation: rotateRing ${15 + i * 3}s linear infinite, morphRing ${4 + i}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${10 + i * 2}px rgba(212,175,55,0.3);
        `;
        blobWrapper.appendChild(ring);
    }
    
    // Star container with spiral galaxy pattern
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // Create 4 spiral arms (more majestic)
    const spiralArms = 4;
    const starsPerArm = 16;
    
    for (let arm = 0; arm < spiralArms; arm++) {
        for (let i = 0; i < starsPerArm; i++) {
            const t = i / starsPerArm;
            const radius = wrapperSize * (0.42 + t * 0.32);
            const angleOffset = (arm * Math.PI * 2 / spiralArms) + t * Math.PI * 3.5;
            const x = center + Math.cos(angleOffset) * radius;
            const y = center + Math.sin(angleOffset) * radius * 0.92;
            
            const star = document.createElement('div');
            star.className = 'glit-star royal-star';
            if (i % 2 === 0) star.classList.add('sparkle');
            if (i % 5 === 0) star.classList.add('diamond-star');
            star.style.left = x + 'px';
            star.style.top = y + 'px';
            star.style.width = (3 + Math.sin(t * Math.PI) * 4) + 'px';
            star.style.height = (3 + Math.sin(t * Math.PI) * 4) + 'px';
            star.style.animationDelay = (arm * 0.4 + i * 0.08) + 's';
            star.style.animationDuration = (0.8 + Math.random() * 1.2) + 's';
            starContainer.appendChild(star);
        }
    }
    
    // Add crown jewel stars (8 major points)
    const crownAngles = [0, 45, 90, 135, 180, 225, 270, 315];
    crownAngles.forEach((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * wrapperSize * 0.68;
        const y = center + Math.sin(rad) * wrapperSize * 0.68;
        const star = document.createElement('div');
        star.className = 'glit-star crown-jewel';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = '10px';
        star.style.height = '10px';
        star.style.animationDelay = (idx * 0.2) + 's';
        star.style.animationDuration = '1.2s';
        star.innerHTML = '✦';
        star.style.fontSize = '16px';
        star.style.background = 'transparent';
        star.style.color = '#ffd700';
        star.style.textShadow = '0 0 10px #d4af37';
        starContainer.appendChild(star);
    });
    
    blobWrapper.appendChild(starContainer);
    
    // Create floating royal particles (more particles, more luxury)
    for (let i = 0; i < 36; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle royal-particle';
        const angle = Math.random() * Math.PI * 2;
        const radius = wrapperSize * (0.35 + Math.random() * 0.4);
        const x = Math.cos(angle) * radius * (0.8 + Math.random() * 0.4);
        const y = Math.sin(angle) * radius * (0.7 + Math.random() * 0.5);
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        particle.style.left = center + 'px';
        particle.style.top = center + 'px';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = (2 + Math.random() * 4) + 'px';
        particle.style.background = `radial-gradient(circle, #ffec80, #d4af37, #b8860b)`;
        particle.style.animationDelay = (i * 0.15) + 's';
        particle.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
        blobWrapper.appendChild(particle);
    }
    
    // Add floating diamond dust (tiny sparkles)
    for (let i = 0; i < 60; i++) {
        const dust = document.createElement('div');
        dust.className = 'diamond-dust-particle';
        const angle = Math.random() * Math.PI * 2;
        const radius = wrapperSize * (0.5 + Math.random() * 0.4);
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        dust.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 2px;
            height: 2px;
            background: #ffd700;
            border-radius: 50%;
            opacity: ${0.3 + Math.random() * 0.5};
            animation: dustTwinkle ${0.5 + Math.random() * 1}s ease-in-out infinite;
            pointer-events: none;
        `;
        blobWrapper.appendChild(dust);
    }
}

// Initialize all royal effects
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createRoyalShape();
        setInterval(morphToNextShape, 3000);
        setInterval(changeGradient, 6000);
        continuousRotation();
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createRoyalShape();
    }, 200);
});

// ============================================
// 6. ROYAL 3D TILT EFFECT WITH SHADOW
// ============================================
const blobWrapper = document.getElementById('blobWrapper');
const blobShape = document.querySelector('.blob-shape');
const blobImg = document.querySelector('.blob-shape img');

if (blobWrapper && blobShape && blobImg) {
    let tiltX = 0, tiltY = 0;
    
    blobWrapper.addEventListener('mousemove', (e) => {
        const rect = blobWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        tiltX = ((y - centerY) / centerY) * 12;
        tiltY = ((x - centerX) / centerX) * 12;
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        
        blobWrapper.style.transform = `perspective(1500px) rotateY(${tiltY + rotationAngle}deg) rotateX(${tiltX + rotationAngle * 0.3}deg) scale(${pulseScale})`;
        if (blobImg) {
            blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.06)`;
            blobImg.style.filter = 'brightness(1.1) drop-shadow(0 25px 35px rgba(0,0,0,0.4))';
        }
        blobShape.style.boxShadow = '0 0 60px rgba(212, 175, 55, 0.8)';
    });
    
    blobWrapper.addEventListener('mouseleave', () => {
        tiltX = 0;
        tiltY = 0;
        if (blobImg) {
            blobImg.style.transform = '';
            blobImg.style.filter = '';
        }
        blobShape.style.boxShadow = '';
    });
}

// ============================================
// 7. ROYAL PARTICLE BACKGROUND WITH CONNECTIONS
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
    
    class RoyalParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.25;
            this.speedY = (Math.random() - 0.5) * 0.25;
            this.opacity = Math.random() * 0.35 + 0.1;
            this.shape = Math.random() > 0.6 ? 'diamond' : 'circle';
            this.originalX = this.x;
            this.originalY = this.y;
        }
        update() {
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
                    this.x += (this.originalX - this.x) * 0.01;
                    this.y += (this.originalY - this.y) * 0.01;
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
            ctx.save();
            if (this.shape === 'diamond') {
                ctx.translate(this.x, this.y);
                ctx.rotate(45 * Math.PI / 180);
                ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
                ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
                ctx.restore();
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
                ctx.fill();
            }
        }
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 130; i++) particles.push(new RoyalParticle());
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 80) {
                    ctx.beginPath();
                    const opacity = 0.06 * (1 - distance / 80);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
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
        drawConnections();
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
// 8. ADD ROYAL CSS ANIMATIONS
// ============================================
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes morphRing {
        0%, 100% { border-radius: 45% 55% 40% 60% / 50% 45% 55% 50%; }
        25% { border-radius: 55% 45% 55% 45% / 55% 50% 50% 45%; }
        50% { border-radius: 40% 60% 45% 55% / 45% 55% 50% 55%; }
        75% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
    }
    
    @keyframes auroraPulse {
        0%, 100% { opacity: 0.15; transform: scale(0.95); filter: blur(15px); }
        50% { opacity: 0.35; transform: scale(1.08); filter: blur(20px); }
    }
    
    @keyframes auroraRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes dustTwinkle {
        0%, 100% { opacity: 0.1; transform: scale(0.5); }
        50% { opacity: 0.8; transform: scale(1.5); }
    }
    
    .blob-shape {
        transition: clip-path 2.5s cubic-bezier(0.34, 1.2, 0.64, 1), background 1.5s ease, transform 0.2s ease !important;
        box-shadow: 0 0 50px rgba(212, 175, 55, 0.5);
    }
    
    .glit-star.royal-star {
        background: radial-gradient(circle, #ffec80, #d4af37, #b8860b);
        box-shadow: 0 0 12px #ffd700, 0 0 20px rgba(212, 175, 55, 0.7);
    }
    
    .glit-star.crown-jewel {
        background: transparent !important;
        animation: crownJewelPulse 1.5s ease-in-out infinite;
    }
    
    @keyframes crownJewelPulse {
        0%, 100% { transform: scale(1); text-shadow: 0 0 10px #d4af37; }
        50% { transform: scale(1.3); text-shadow: 0 0 25px #ffd700; }
    }
    
    .glit-star.sparkle::before {
        font-size: 16px;
        animation: sparkleFloat 1.5s ease-in-out infinite;
    }
    
    @keyframes sparkleFloat {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        50% { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
    }
    
    .floating-particle.royal-particle {
        filter: blur(0.8px);
    }
    
    .blob-wrapper {
        transition: transform 0.05s linear;
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ ROYAL DIAMOND AURORA PORTFOLIO LOADED — 12 Unique Shapes, 5 Layered Rings, Aurora Effect, Crown Jewels, Spiral Galaxy Stars! ✨');
