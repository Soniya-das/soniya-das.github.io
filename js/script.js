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
// 5. SINGLE ULTRA-LUXURY SHAPE - "ROYAL DIAMOND LOTUS"
// ============================================

// The ultimate professional luxury shape - Royal Diamond Lotus
// This shape combines diamond precision with lotus elegance
const professionalLuxuryShape = 'polygon(50% 0%, 62% 6%, 74% 4%, 84% 12%, 92% 22%, 97% 36%, 99% 50%, 97% 64%, 92% 78%, 84% 88%, 74% 96%, 62% 94%, 50% 100%, 38% 94%, 26% 96%, 16% 88%, 8% 78%, 3% 64%, 1% 50%, 3% 36%, 8% 22%, 16% 12%, 26% 4%, 38% 6%)';

// Premium gradient for luxury feel
const premiumGradient = 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 20%, #d4af37 45%, #b8941e 70%, #d4af37 100%)';

// Subtle rotation animation variables
let rotationAngle = 0;
let rotationDirection = 1;
let pulseScale = 1;
let pulseDirection = 1;

// Continuous subtle rotation with gentle pulse
function continuousRotation() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    rotationAngle += 0.1 * rotationDirection;
    if (rotationAngle > 3) rotationDirection = -1;
    if (rotationAngle < -3) rotationDirection = 1;
    
    // Gentle luxury pulse (very subtle)
    pulseScale += 0.0015 * pulseDirection;
    if (pulseScale > 1.008) pulseDirection = -1;
    if (pulseScale < 0.992) pulseDirection = 1;
    
    blobWrapper.style.transform = `perspective(1500px) rotateY(${rotationAngle}deg) rotateX(${rotationAngle * 0.2}deg) scale(${pulseScale})`;
    requestAnimationFrame(continuousRotation);
}

// Create professional luxury shape with decorations
function createProfessionalShape() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing decorations
    const existingContainer = blobWrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    const existingRings = blobWrapper.querySelectorAll('.star-ring, .golden-border-ring, .morph-ring, .diamond-ring, .luxury-border, .aurora-ring, .royal-ring');
    existingRings.forEach(ring => ring.remove());
    const existingParticles = blobWrapper.querySelectorAll('.floating-particle, .luxury-particle, .royal-particle');
    existingParticles.forEach(p => p.remove());
    
    // Set the professional shape
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        blobShape.style.clipPath = professionalLuxuryShape;
        blobShape.style.background = premiumGradient;
        blobShape.style.transition = 'all 0.5s ease';
    }
    
    const wrapperSize = blobWrapper.offsetWidth;
    const center = wrapperSize / 2;
    
    // Create elegant single gold ring (professional)
    const elegantRing = document.createElement('div');
    elegantRing.className = 'elegant-ring';
    elegantRing.style.cssText = `
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
        border-radius: 50%;
        border: 2px solid var(--primary);
        opacity: 0.45;
        animation: rotateRing 20s linear infinite;
        pointer-events: none;
        box-shadow: 0 0 15px rgba(212,175,55,0.3);
    `;
    blobWrapper.appendChild(elegantRing);
    
    // Second subtle ring
    const subtleRing = document.createElement('div');
    subtleRing.className = 'subtle-ring';
    subtleRing.style.cssText = `
        position: absolute;
        top: -22px;
        left: -22px;
        right: -22px;
        bottom: -22px;
        border-radius: 50%;
        border: 1px dashed var(--primary);
        opacity: 0.3;
        animation: rotateRingReverse 25s linear infinite;
        pointer-events: none;
    `;
    blobWrapper.appendChild(subtleRing);
    
    // Star container
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // Professional star placement - symmetrical and elegant
    const professionalAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    
    professionalAngles.forEach((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const radius = wrapperSize * 0.62;
        const x = center + Math.cos(rad) * radius;
        const y = center + Math.sin(rad) * radius;
        
        const star = document.createElement('div');
        star.className = 'glit-star professional-star';
        if (idx % 2 === 0) star.classList.add('sparkle');
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = '6px';
        star.style.height = '6px';
        star.style.animationDelay = (idx * 0.1) + 's';
        star.style.animationDuration = '1.8s';
        starContainer.appendChild(star);
    });
    
    // Inner stars (closer to image)
    const innerAngles = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];
    innerAngles.forEach((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const radius = wrapperSize * 0.48;
        const x = center + Math.cos(rad) * radius;
        const y = center + Math.sin(rad) * radius;
        
        const star = document.createElement('div');
        star.className = 'glit-star inner-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = '4px';
        star.style.height = '4px';
        star.style.animationDelay = (idx * 0.12) + 's';
        star.style.animationDuration = '1.5s';
        starContainer.appendChild(star);
    });
    
    blobWrapper.appendChild(starContainer);
    
    // Professional floating particles (subtle)
    for (let i = 0; i < 24; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle professional-particle';
        const angle = Math.random() * Math.PI * 2;
        const radius = wrapperSize * (0.38 + Math.random() * 0.35);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        particle.style.left = center + 'px';
        particle.style.top = center + 'px';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = `radial-gradient(circle, #ffec80, #d4af37)`;
        particle.style.animationDelay = (i * 0.15) + 's';
        particle.style.animationDuration = (3 + Math.random() * 2) + 's';
        blobWrapper.appendChild(particle);
    }
}

// Initialize professional shape
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createProfessionalShape();
        continuousRotation();
        console.log('✨ Professional Luxury Shape Loaded — Royal Diamond Lotus ✨');
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createProfessionalShape();
    }, 200);
});

// ============================================
// 6. PROFESSIONAL 3D TILT EFFECT
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
        
        tiltX = ((y - centerY) / centerY) * 8;
        tiltY = ((x - centerX) / centerX) * 8;
        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;
        
        blobWrapper.style.transform = `perspective(1500px) rotateY(${tiltY + rotationAngle}deg) rotateX(${tiltX + rotationAngle * 0.2}deg) scale(${pulseScale})`;
        if (blobImg) {
            blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.04)`;
            blobImg.style.filter = 'brightness(1.05) drop-shadow(0 15px 25px rgba(0,0,0,0.3))';
        }
        blobShape.style.boxShadow = '0 0 45px rgba(212, 175, 55, 0.6)';
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
// 7. PROFESSIONAL PARTICLE BACKGROUND
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
    
    class ProfessionalParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.15;
            this.speedY = (Math.random() - 0.5) * 0.15;
            this.opacity = Math.random() * 0.25 + 0.08;
            this.shape = Math.random() > 0.7 ? 'diamond' : 'circle';
        }
        update() {
            if (mouseX && mouseY) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 150;
                    this.x += Math.cos(angle) * force;
                    this.y += Math.sin(angle) * force;
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
        for (let i = 0; i < 100; i++) particles.push(new ProfessionalParticle());
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
// 8. ADD PROFESSIONAL CSS ANIMATIONS
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
    
    .blob-shape {
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        box-shadow: 0 0 40px rgba(212, 175, 55, 0.35);
    }
    
    .glit-star.professional-star {
        background: radial-gradient(circle, #ffec80, #d4af37);
        box-shadow: 0 0 8px #ffd700, 0 0 12px rgba(212, 175, 55, 0.5);
    }
    
    .glit-star.inner-star {
        background: radial-gradient(circle, #ffd700, #d4af37);
        box-shadow: 0 0 6px #ffd700;
    }
    
    .glit-star.sparkle::before {
        font-size: 14px;
        animation: sparkleFloat 1.8s ease-in-out infinite;
    }
    
    @keyframes sparkleFloat {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
        50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
    }
    
    .floating-particle.professional-particle {
        filter: blur(0.5px);
    }
    
    .blob-wrapper {
        transition: transform 0.05s linear;
    }
    
    /* Hover effect for professional feel */
    .blob-wrapper:hover .elegant-ring {
        opacity: 0.7;
        border-color: #ffd700;
        box-shadow: 0 0 20px rgba(212,175,55,0.5);
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ Professional Luxury Shape Loaded — Royal Diamond Lotus with Elegant Animations ✨');
