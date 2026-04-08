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
// 5. SINGLE PROFESSIONAL LUXURY SHAPE
// ============================================

// Only ONE shape - Royal Diamond Elite (24-point professional polygon)
const professionalShape = 'polygon(50% 0%, 62% 6%, 74% 4%, 84% 12%, 92% 22%, 97% 36%, 99% 50%, 97% 64%, 92% 78%, 84% 88%, 74% 96%, 62% 94%, 50% 100%, 38% 94%, 26% 96%, 16% 88%, 8% 78%, 3% 64%, 1% 50%, 3% 36%, 8% 22%, 16% 12%, 26% 4%, 38% 6%)';

// Premium gradient
const premiumGradient = 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 25%, #d4af37 50%, #b8941e 75%, #d4af37 100%)';

// Animation variables
let rotationAngle = 0;
let rotationDirection = 1;
let pulseScale = 1;
let pulseDirection = 1;
let glowIntensity = 0;
let glowDirection = 1;

// Apply the professional shape
function applyProfessionalShape() {
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        blobShape.style.clipPath = professionalShape;
        blobShape.style.background = premiumGradient;
        blobShape.style.transition = 'all 0.4s ease';
    }
}

// Subtle floating animation (continuous)
function continuousFloatAnimation() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Gentle rotation
    rotationAngle += 0.08 * rotationDirection;
    if (rotationAngle > 2.5) rotationDirection = -1;
    if (rotationAngle < -2.5) rotationDirection = 1;
    
    // Gentle pulse
    pulseScale += 0.0012 * pulseDirection;
    if (pulseScale > 1.006) pulseDirection = -1;
    if (pulseScale < 0.994) pulseDirection = 1;
    
    // Dynamic glow effect
    glowIntensity += 0.02 * glowDirection;
    if (glowIntensity > 0.6) glowDirection = -1;
    if (glowIntensity < 0.3) glowDirection = 1;
    
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        blobShape.style.boxShadow = `0 0 ${30 + glowIntensity * 20}px rgba(212, 175, 55, ${0.3 + glowIntensity * 0.3})`;
    }
    
    blobWrapper.style.transform = `perspective(1200px) rotateY(${rotationAngle}deg) rotateX(${rotationAngle * 0.15}deg) scale(${pulseScale})`;
    requestAnimationFrame(continuousFloatAnimation);
}

// Create elegant decorations
function createElegantDecorations() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing decorations
    const existingStars = blobWrapper.querySelectorAll('.star-element, .ring-element, .particle-element');
    existingStars.forEach(el => el.remove());
    
    const wrapperSize = blobWrapper.offsetWidth;
    const center = wrapperSize / 2;
    
    // === SINGLE ELEGANT RING ===
    const ring = document.createElement('div');
    ring.className = 'ring-element';
    ring.style.cssText = `
        position: absolute;
        top: -15px;
        left: -15px;
        right: -15px;
        bottom: -15px;
        border-radius: 50%;
        border: 2px solid rgba(212, 175, 55, 0.5);
        animation: ringRotate 20s linear infinite;
        pointer-events: none;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
    `;
    blobWrapper.appendChild(ring);
    
    // === SECOND SUBTLE RING ===
    const ring2 = document.createElement('div');
    ring2.className = 'ring-element';
    ring2.style.cssText = `
        position: absolute;
        top: -28px;
        left: -28px;
        right: -28px;
        bottom: -28px;
        border-radius: 50%;
        border: 1px dashed rgba(212, 175, 55, 0.35);
        animation: ringRotateReverse 25s linear infinite;
        pointer-events: none;
    `;
    blobWrapper.appendChild(ring2);
    
    // === STARS AROUND THE SHAPE ===
    const starContainer = document.createElement('div');
    starContainer.className = 'star-element';
    starContainer.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;`;
    
    // 16 elegant stars at key positions
    const starAngles = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5];
    
    starAngles.forEach((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const radius = wrapperSize * 0.58;
        const x = center + Math.cos(rad) * radius;
        const y = center + Math.sin(rad) * radius;
        
        const star = document.createElement('div');
        star.className = 'elegant-star';
        star.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 5px;
            height: 5px;
            background: radial-gradient(circle, #ffec80, #d4af37);
            border-radius: 50%;
            opacity: 0;
            box-shadow: 0 0 8px #ffd700;
            animation: starTwinkle 2s ease-in-out infinite;
            animation-delay: ${idx * 0.12}s;
        `;
        starContainer.appendChild(star);
    });
    
    // 8 larger accent stars
    const accentAngles = [0, 45, 90, 135, 180, 225, 270, 315];
    accentAngles.forEach((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const radius = wrapperSize * 0.67;
        const x = center + Math.cos(rad) * radius;
        const y = center + Math.sin(rad) * radius;
        
        const star = document.createElement('div');
        star.className = 'accent-star';
        star.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: transparent;
            color: #ffd700;
            font-size: 14px;
            text-align: center;
            line-height: 8px;
            opacity: 0;
            animation: starSparkle 2.5s ease-in-out infinite;
            animation-delay: ${idx * 0.2}s;
        `;
        star.innerHTML = '✦';
        starContainer.appendChild(star);
    });
    
    blobWrapper.appendChild(starContainer);
    
    // === FLOATING GOLD PARTICLES ===
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-element';
    particleContainer.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;`;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const angle = Math.random() * Math.PI * 2;
        const radius = wrapperSize * (0.4 + Math.random() * 0.35);
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 2px;
            height: 2px;
            background: #d4af37;
            border-radius: 50%;
            opacity: 0;
            animation: floatParticle ${3 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${i * 0.1}s;
            filter: blur(0.5px);
        `;
        particleContainer.appendChild(particle);
    }
    
    blobWrapper.appendChild(particleContainer);
}

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        applyProfessionalShape();
        createElegantDecorations();
        continuousFloatAnimation();
        console.log('✨ Professional Luxury Portfolio Loaded — Single Premium Shape ✨');
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createElegantDecorations();
    }, 200);
});

// ============================================
// 6. PROFESSIONAL 3D TILT ON HOVER
// ============================================
const blobWrapper = document.getElementById('blobWrapper');
const blobShape = document.querySelector('.blob-shape');
const blobImg = document.querySelector('.blob-shape img');

if (blobWrapper && blobShape && blobImg) {
    let currentTiltX = 0, currentTiltY = 0;
    
    blobWrapper.addEventListener('mousemove', (e) => {
        const rect = blobWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        currentTiltX = ((y - centerY) / centerY) * 10;
        currentTiltY = ((x - centerX) / centerX) * 10;
        const moveX = (x - centerX) / 30;
        const moveY = (y - centerY) / 30;
        
        blobWrapper.style.transform = `perspective(1200px) rotateY(${currentTiltY + rotationAngle}deg) rotateX(${currentTiltX + rotationAngle * 0.15}deg) scale(${pulseScale})`;
        
        if (blobImg) {
            blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.03)`;
            blobImg.style.transition = 'transform 0.05s linear';
        }
    });
    
    blobWrapper.addEventListener('mouseleave', () => {
        currentTiltX = 0;
        currentTiltY = 0;
        if (blobImg) {
            blobImg.style.transform = '';
        }
    });
}

// ============================================
// 7. PROFESSIONAL PARTICLE BACKGROUND
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
            this.speedX = (Math.random() - 0.5) * 0.12;
            this.speedY = (Math.random() - 0.5) * 0.12;
            this.opacity = Math.random() * 0.2 + 0.05;
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
// 8. ADD CSS ANIMATIONS
// ============================================
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes ringRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes ringRotateReverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
    }
    
    @keyframes starTwinkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes starSparkle {
        0%, 100% { opacity: 0; transform: scale(0.6); }
        50% { opacity: 1; transform: scale(1.3); text-shadow: 0 0 15px #ffd700; }
    }
    
    @keyframes floatParticle {
        0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.5); }
        20% { opacity: 0.6; transform: translate(var(--x, 0), var(--y, 0)) scale(1); }
        80% { opacity: 0.3; transform: translate(calc(var(--x, 0) * 0.8), calc(var(--y, 0) * 0.8)) scale(0.8); }
    }
    
    .blob-shape {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    }
    
    .blob-wrapper {
        transition: transform 0.05s linear;
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ Professional Single Shape Portfolio Loaded — Clean, Elegant & Luxurious ✨');
