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
// 5. ULTRA-UNIQUE LUXURY SHAPE - "DIAMOND LOTUS"
// ============================================

// Array of unique luxury shapes - each is completely unique
const luxuryShapes = [
    // Shape 1: Diamond Lotus (Signature Shape)
    'polygon(50% 0%, 85% 12%, 98% 35%, 92% 65%, 78% 88%, 50% 98%, 22% 88%, 8% 65%, 2% 35%, 15% 12%)',
    
    // Shape 2: Royal Crown
    'polygon(35% 0%, 50% 8%, 65% 0%, 82% 15%, 95% 35%, 88% 60%, 95% 82%, 75% 95%, 50% 88%, 25% 95%, 5% 82%, 12% 60%, 5% 35%, 18% 15%)',
    
    // Shape 3: Elegant Petal
    'polygon(50% 2%, 75% 15%, 92% 38%, 96% 62%, 88% 82%, 70% 95%, 50% 98%, 30% 95%, 12% 82%, 4% 62%, 8% 38%, 25% 15%)',
    
    // Shape 4: Royal Emblem
    'polygon(50% 3%, 70% 10%, 88% 25%, 97% 48%, 93% 72%, 80% 88%, 58% 97%, 42% 97%, 20% 88%, 7% 72%, 3% 48%, 12% 25%, 30% 10%)',
    
    // Shape 5: Luxury Star Diamond
    'polygon(50% 0%, 68% 18%, 88% 15%, 85% 35%, 100% 50%, 85% 65%, 88% 85%, 68% 82%, 50% 100%, 32% 82%, 12% 85%, 15% 65%, 0% 50%, 15% 35%, 12% 18%, 32% 18%)',
    
    // Shape 6: Flowing Silk
    'polygon(50% 5%, 68% 12%, 82% 28%, 94% 45%, 90% 65%, 78% 82%, 60% 93%, 40% 93%, 22% 82%, 10% 65%, 6% 45%, 18% 28%, 32% 12%)',
    
    // Shape 7: Royal Crest
    'polygon(45% 2%, 55% 2%, 72% 10%, 85% 22%, 98% 42%, 94% 62%, 85% 80%, 68% 92%, 50% 98%, 32% 92%, 15% 80%, 6% 62%, 2% 42%, 15% 22%, 28% 10%)',
    
    // Shape 8: Golden Leaf
    'polygon(50% 4%, 72% 14%, 88% 32%, 96% 54%, 90% 75%, 74% 90%, 50% 96%, 26% 90%, 10% 75%, 4% 54%, 12% 32%, 28% 14%)'
];

// Luxury gradient combinations
const luxuryGradients = [
    'linear-gradient(135deg, #d4af37 0%, #f3e5ab 25%, #d4af37 50%, #b8941e 75%, #d4af37 100%)',
    'linear-gradient(45deg, #c9a52c 0%, #ffd700 30%, #f9e076 60%, #d4af37 100%)',
    'radial-gradient(circle at 30% 40%, #d4af37, #b8860b, #8b6914)',
    'conic-gradient(from 0deg, #d4af37, #f3e5ab, #d4af37, #b8941e, #d4af37)',
    'linear-gradient(120deg, #e8c547 0%, #d4af37 40%, #c9a32c 80%, #d4af37 100%)'
];

let shapeIndex = 0;
let gradientIndex = 0;
let rotationAngle = 0;
let rotationDirection = 1;

function morphToNextShape() {
    const blobShape = document.querySelector('.blob-shape');
    if (!blobShape) return;
    
    shapeIndex = (shapeIndex + 1) % luxuryShapes.length;
    blobShape.style.clipPath = luxuryShapes[shapeIndex];
    blobShape.style.transition = 'clip-path 2.8s cubic-bezier(0.34, 1.2, 0.64, 1), background 1.5s ease';
}

function changeGradient() {
    const blobShape = document.querySelector('.blob-shape');
    if (!blobShape) return;
    
    gradientIndex = (gradientIndex + 1) % luxuryGradients.length;
    blobShape.style.background = luxuryGradients[gradientIndex];
}

// Continuous subtle rotation
function continuousRotation() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    rotationAngle += 0.2 * rotationDirection;
    if (rotationAngle > 6) rotationDirection = -1;
    if (rotationAngle < -6) rotationDirection = 1;
    
    blobWrapper.style.transform = `perspective(1500px) rotateY(${rotationAngle}deg) rotateX(${rotationAngle * 0.3}deg)`;
    requestAnimationFrame(continuousRotation);
}

// Create the ultra-luxury shape with all decorations
function createLuxuryShape() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing decorations
    const existingContainer = blobWrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    const existingRings = blobWrapper.querySelectorAll('.star-ring, .golden-border-ring, .morph-ring, .diamond-ring, .luxury-border');
    existingRings.forEach(ring => ring.remove());
    const existingParticles = blobWrapper.querySelectorAll('.floating-particle, .luxury-particle');
    existingParticles.forEach(p => p.remove());
    
    const wrapperSize = blobWrapper.offsetWidth;
    const center = wrapperSize / 2;
    
    // Create 3 layered luxury rings
    const ringLayers = [
        { class: 'luxury-ring-1', size: 1.15, dash: '8 6', speed: 12, width: 2 },
        { class: 'luxury-ring-2', size: 1.25, dash: '4 8', speed: -15, width: 1.5 },
        { class: 'luxury-ring-3', size: 1.35, dash: '2 10', speed: 20, width: 1 }
    ];
    
    ringLayers.forEach((layer, idx) => {
        const ring = document.createElement('div');
        ring.className = layer.class;
        ring.style.cssText = `
            position: absolute;
            top: ${-wrapperSize * (layer.size - 1) / 2}px;
            left: ${-wrapperSize * (layer.size - 1) / 2}px;
            width: ${wrapperSize * layer.size}px;
            height: ${wrapperSize * layer.size}px;
            border-radius: 45% 55% 40% 60% / 50% 45% 55% 50%;
            border: ${layer.width}px solid var(--primary);
            opacity: 0.4;
            animation: rotateRing ${layer.speed}s linear infinite, morphRing 4s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 12px var(--primary-glow);
        `;
        blobWrapper.appendChild(ring);
    });
    
    // Create diamond dust ring (small floating diamonds)
    const diamondDust = document.createElement('div');
    diamondDust.className = 'diamond-dust';
    diamondDust.style.cssText = `
        position: absolute;
        top: -30px;
        left: -30px;
        right: -30px;
        bottom: -30px;
        background: radial-gradient(circle, transparent 60%, rgba(212,175,55,0.15) 100%);
        border-radius: 50%;
        animation: pulseGlowLarge 4s ease-in-out infinite;
        pointer-events: none;
    `;
    blobWrapper.appendChild(diamondDust);
    
    // Star container with organic arrangement
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // Create stars in a spiral galaxy pattern
    const spiralArms = 3;
    const starsPerArm = 14;
    
    for (let arm = 0; arm < spiralArms; arm++) {
        for (let i = 0; i < starsPerArm; i++) {
            const t = i / starsPerArm;
            const radius = wrapperSize * (0.45 + t * 0.3);
            const angleOffset = (arm * Math.PI * 2 / spiralArms) + t * Math.PI * 3;
            const x = center + Math.cos(angleOffset) * radius;
            const y = center + Math.sin(angleOffset) * radius * 0.9;
            
            const star = document.createElement('div');
            star.className = 'glit-star luxury-star';
            if (i % 2 === 0) star.classList.add('sparkle');
            star.style.left = x + 'px';
            star.style.top = y + 'px';
            star.style.width = (4 + Math.sin(t * Math.PI) * 3) + 'px';
            star.style.height = (4 + Math.sin(t * Math.PI) * 3) + 'px';
            star.style.animationDelay = (arm * 0.5 + i * 0.1) + 's';
            star.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            starContainer.appendChild(star);
        }
    }
    
    // Add corner accent stars
    const cornerStars = [
        { angle: -45, dist: 0.62 }, { angle: 45, dist: 0.62 },
        { angle: 135, dist: 0.62 }, { angle: 225, dist: 0.62 },
        { angle: 0, dist: 0.58 }, { angle: 90, dist: 0.58 },
        { angle: 180, dist: 0.58 }, { angle: 270, dist: 0.58 }
    ];
    
    cornerStars.forEach((pos, idx) => {
        const rad = (pos.angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * wrapperSize * pos.dist;
        const y = center + Math.sin(rad) * wrapperSize * pos.dist;
        const star = document.createElement('div');
        star.className = 'glit-star corner-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = '7px';
        star.style.height = '7px';
        star.style.animationDelay = (idx * 0.15) + 's';
        starContainer.appendChild(star);
    });
    
    blobWrapper.appendChild(starContainer);
    
    // Create floating diamond particles
    for (let i = 0; i < 24; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle luxury-particle';
        const angle = Math.random() * Math.PI * 2;
        const radius = wrapperSize * (0.4 + Math.random() * 0.35);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * (0.7 + Math.random() * 0.3);
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        particle.style.left = center + 'px';
        particle.style.top = center + 'px';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = (2 + Math.random() * 3) + 'px';
        particle.style.background = `radial-gradient(circle, #ffec80, #d4af37)`;
        particle.style.animationDelay = (i * 0.2) + 's';
        particle.style.animationDuration = (3 + Math.random() * 2) + 's';
        blobWrapper.appendChild(particle);
    }
}

// Initialize all luxury effects
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createLuxuryShape();
        
        // Start shape morphing cycle
        setInterval(morphToNextShape, 3500);
        setInterval(changeGradient, 7000);
        
        // Start continuous rotation
        continuousRotation();
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createLuxuryShape();
    }, 200);
});

// ============================================
// 6. LUXURY 3D TILT EFFECT
// ============================================
const blobWrapper = document.getElementById('blobWrapper');
const blobShape = document.querySelector('.blob-shape');
const blobImg = document.querySelector('.blob-shape img');

if (blobWrapper && blobShape && blobImg) {
    blobWrapper.addEventListener('mousemove', (e) => {
        const rect = blobWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;
        
        blobWrapper.style.transform = `perspective(1500px) rotateY(${rotateY + rotationAngle}deg) rotateX(${rotateX + rotationAngle * 0.3}deg)`;
        if (blobImg) {
            blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.05)`;
        }
        blobShape.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.7)';
    });
    
    blobWrapper.addEventListener('mouseleave', () => {
        blobImg.style.transform = '';
        blobShape.style.boxShadow = '';
    });
}

// ============================================
// 7. LUXURY PARTICLE BACKGROUND
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
    
    class LuxuryParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.shape = Math.random() > 0.7 ? 'diamond' : 'circle';
        }
        update() {
            if (mouseX && mouseY) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 100;
                    this.x += Math.cos(angle) * force * 1.5;
                    this.y += Math.sin(angle) * force * 1.5;
                }
            }
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
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
        for (let i = 0; i < 100; i++) particles.push(new LuxuryParticle());
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
// 8. ADD LUXURY CSS ANIMATIONS
// ============================================
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes morphRing {
        0%, 100% { border-radius: 45% 55% 40% 60% / 50% 45% 55% 50%; }
        25% { border-radius: 55% 45% 55% 45% / 55% 50% 50% 45%; }
        50% { border-radius: 40% 60% 45% 55% / 45% 55% 50% 55%; }
        75% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
    }
    
    @keyframes pulseGlowLarge {
        0%, 100% { opacity: 0.1; transform: scale(0.95); }
        50% { opacity: 0.25; transform: scale(1.08); }
    }
    
    .blob-shape {
        transition: clip-path 2.8s cubic-bezier(0.34, 1.2, 0.64, 1), background 1.5s ease !important;
        box-shadow: 0 0 40px rgba(212, 175, 55, 0.4);
    }
    
    .glit-star.luxury-star {
        background: radial-gradient(circle, #ffec80, #d4af37, #b8860b);
        box-shadow: 0 0 8px #ffd700, 0 0 15px rgba(212, 175, 55, 0.6);
    }
    
    .glit-star.corner-star {
        background: radial-gradient(circle, #ffd700, #d4af37);
        box-shadow: 0 0 12px #ffd700;
    }
    
    .glit-star.sparkle::before {
        font-size: 18px;
        animation: sparkleFloat 2s ease-in-out infinite;
    }
    
    @keyframes sparkleFloat {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
    }
    
    .floating-particle.luxury-particle {
        filter: blur(0.5px);
    }
    
    .blob-wrapper {
        transition: transform 0.1s linear;
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ ULTRA-LUXURY UNIQUE SHAPE PORTFOLIO LOADED — Diamond Lotus Shape with Morphing, Rotation & Glitter Galaxy!');
