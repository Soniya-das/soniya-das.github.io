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
// 5. 12 UNIQUE LUXURY SHAPES - LOTUS, DIAMOND, CROWN, ETC
// ============================================

// Collection of 12 completely unique luxury shapes
const luxuryShapes = [
    // Shape 1: SACRED LOTUS (Professional Lotus Shape)
    {
        name: 'Sacred Lotus',
        shape: 'polygon(50% 0%, 65% 8%, 80% 5%, 85% 18%, 95% 22%, 92% 38%, 98% 48%, 90% 62%, 95% 78%, 82% 85%, 85% 95%, 68% 92%, 50% 98%, 32% 92%, 15% 95%, 18% 85%, 5% 78%, 10% 62%, 2% 48%, 8% 38%, 5% 22%, 15% 18%, 20% 5%, 35% 8%)'
    },
    // Shape 2: ROYAL DIAMOND (Perfect Diamond Shape)
    {
        name: 'Royal Diamond',
        shape: 'polygon(50% 0%, 65% 8%, 82% 12%, 95% 25%, 100% 45%, 98% 65%, 90% 80%, 75% 92%, 50% 100%, 25% 92%, 10% 80%, 2% 65%, 0% 45%, 5% 25%, 18% 12%, 35% 8%)'
    },
    // Shape 3: MAHARAJA CROWN (Royal Crown Shape)
    {
        name: 'Maharaja Crown',
        shape: 'polygon(30% 0%, 40% 5%, 45% 0%, 50% 8%, 55% 0%, 60% 5%, 70% 0%, 78% 10%, 85% 8%, 92% 18%, 96% 32%, 98% 50%, 94% 68%, 86% 82%, 75% 92%, 50% 96%, 25% 92%, 14% 82%, 6% 68%, 2% 50%, 4% 32%, 8% 18%, 15% 8%, 22% 10%)'
    },
    // Shape 4: ROYAL EMBLEM (Luxury Emblem)
    {
        name: 'Royal Emblem',
        shape: 'polygon(50% 2%, 62% 5%, 75% 3%, 85% 12%, 94% 22%, 98% 38%, 96% 55%, 92% 70%, 85% 82%, 72% 92%, 55% 97%, 50% 98%, 45% 97%, 28% 92%, 15% 82%, 8% 70%, 4% 55%, 2% 38%, 6% 22%, 15% 12%, 25% 3%, 38% 5%)'
    },
    // Shape 5: GOLDEN LEAF (Elegant Leaf Shape)
    {
        name: 'Golden Leaf',
        shape: 'polygon(50% 2%, 68% 6%, 82% 14%, 92% 26%, 97% 42%, 98% 58%, 94% 74%, 86% 86%, 74% 94%, 58% 98%, 50% 96%, 42% 98%, 26% 94%, 14% 86%, 6% 74%, 2% 58%, 3% 42%, 8% 26%, 18% 14%, 32% 6%)'
    },
    // Shape 6: FLOWING SILK (Elegant Organic)
    {
        name: 'Flowing Silk',
        shape: 'polygon(50% 4%, 65% 10%, 78% 18%, 88% 28%, 94% 42%, 96% 55%, 93% 68%, 86% 80%, 74% 89%, 60% 95%, 50% 97%, 40% 95%, 26% 89%, 14% 80%, 7% 68%, 4% 55%, 6% 42%, 12% 28%, 22% 18%, 35% 10%)'
    },
    // Shape 7: STAR OF HOPE (8-Point Star)
    {
        name: 'Star of Hope',
        shape: 'polygon(50% 0%, 57% 18%, 68% 15%, 70% 28%, 85% 25%, 82% 40%, 98% 45%, 88% 55%, 100% 65%, 85% 70%, 82% 85%, 70% 78%, 68% 92%, 57% 85%, 50% 100%, 43% 85%, 32% 92%, 30% 78%, 18% 85%, 15% 70%, 2% 65%, 12% 55%, 0% 45%, 18% 40%, 15% 25%, 30% 28%, 32% 15%, 43% 18%)'
    },
    // Shape 8: PEACOCK FEATHER (Elegant)
    {
        name: 'Peacock Feather',
        shape: 'polygon(50% 2%, 62% 8%, 74% 6%, 84% 15%, 92% 28%, 96% 44%, 97% 60%, 94% 74%, 86% 85%, 74% 93%, 60% 97%, 50% 96%, 40% 97%, 26% 93%, 14% 85%, 6% 74%, 3% 60%, 4% 44%, 8% 28%, 16% 15%, 26% 6%, 38% 8%)'
    },
    // Shape 9: ROYAL TIARA (Tiara Shape)
    {
        name: 'Royal Tiara',
        shape: 'polygon(35% 0%, 42% 5%, 48% 2%, 50% 8%, 52% 2%, 58% 5%, 65% 0%, 72% 8%, 80% 12%, 88% 22%, 94% 38%, 97% 52%, 95% 68%, 88% 82%, 78% 92%, 62% 97%, 50% 98%, 38% 97%, 22% 92%, 12% 82%, 5% 68%, 3% 52%, 6% 38%, 12% 22%, 20% 12%, 28% 8%)'
    },
    // Shape 10: LOTUS PETAL (Pure Lotus)
    {
        name: 'Lotus Petal',
        shape: 'polygon(50% 3%, 58% 7%, 66% 6%, 74% 12%, 82% 18%, 88% 28%, 92% 40%, 94% 54%, 92% 68%, 86% 80%, 78% 88%, 68% 94%, 58% 97%, 50% 98%, 42% 97%, 32% 94%, 22% 88%, 14% 80%, 8% 68%, 6% 54%, 8% 40%, 12% 28%, 18% 18%, 26% 12%, 34% 6%, 42% 7%)'
    },
    // Shape 11: DIAMOND CREST (Premium)
    {
        name: 'Diamond Crest',
        shape: 'polygon(50% 2%, 60% 8%, 72% 6%, 82% 14%, 90% 24%, 96% 38%, 98% 52%, 96% 66%, 90% 78%, 82% 88%, 72% 94%, 60% 96%, 50% 98%, 40% 96%, 28% 94%, 18% 88%, 10% 78%, 4% 66%, 2% 52%, 4% 38%, 10% 24%, 18% 14%, 28% 6%, 40% 8%)'
    },
    // Shape 12: GOLDEN ROSE (Romantic Luxury)
    {
        name: 'Golden Rose',
        shape: 'polygon(50% 1%, 55% 6%, 62% 4%, 68% 10%, 76% 8%, 82% 16%, 88% 22%, 93% 32%, 96% 44%, 97% 56%, 95% 68%, 90% 78%, 84% 86%, 76% 92%, 66% 96%, 56% 98%, 50% 97%, 44% 98%, 34% 96%, 24% 92%, 16% 86%, 10% 78%, 5% 68%, 3% 56%, 4% 44%, 7% 32%, 12% 22%, 18% 16%, 24% 8%, 32% 10%, 38% 4%, 45% 6%)'
    }
];

// 10 Luxury Gradients
const luxuryGradients = [
    'linear-gradient(135deg, #d4af37 0%, #f3e5ab 25%, #d4af37 50%, #b8941e 75%, #d4af37 100%)',
    'linear-gradient(45deg, #c9a52c 0%, #ffd700 30%, #f9e076 60%, #d4af37 100%)',
    'radial-gradient(circle at 30% 40%, #d4af37, #b8860b, #8b6914)',
    'conic-gradient(from 0deg, #d4af37, #f3e5ab, #d4af37, #b8941e, #d4af37)',
    'linear-gradient(120deg, #e8c547 0%, #d4af37 40%, #c9a32c 80%, #d4af37 100%)',
    'radial-gradient(ellipse at 50% 50%, #ffd700, #d4af37, #b8860b)',
    'linear-gradient(160deg, #d4af37, #f5e6a3, #d4af37, #c9a32c)',
    'conic-gradient(from 90deg, #ffd700, #d4af37, #b8860b, #d4af37, #ffd700)',
    'linear-gradient(135deg, #f3e5ab, #d4af37, #b8941e, #d4af37, #f3e5ab)',
    'radial-gradient(circle at 60% 40%, #ffd700, #d4af37, #c9a32c, #b8860b)'
];

let shapeIndex = 0;
let gradientIndex = 0;
let rotationAngle = 0;
let rotationDirection = 1;
let pulseScale = 1;
let pulseDirection = 1;
let currentShapeName = 'Sacred Lotus';

// Display current shape name (optional luxury touch)
function updateShapeName() {
    const shapeName = luxuryShapes[shapeIndex].name;
    currentShapeName = shapeName;
    // Optional: Add to console or create a small indicator
    console.log(`✨ Shape changed to: ${shapeName} ✨`);
}

function morphToNextShape() {
    const blobShape = document.querySelector('.blob-shape');
    if (!blobShape) return;
    shapeIndex = (shapeIndex + 1) % luxuryShapes.length;
    blobShape.style.clipPath = luxuryShapes[shapeIndex].shape;
    blobShape.style.transition = 'clip-path 2.8s cubic-bezier(0.34, 1.2, 0.64, 1), background 1.5s ease';
    updateShapeName();
    
    // Add subtle vibration effect on shape change
    blobShape.style.transform = 'scale(1.02)';
    setTimeout(() => {
        if (blobShape) blobShape.style.transform = '';
    }, 200);
}

function changeGradient() {
    const blobShape = document.querySelector('.blob-shape');
    if (!blobShape) return;
    gradientIndex = (gradientIndex + 1) % luxuryGradients.length;
    blobShape.style.background = luxuryGradients[gradientIndex];
}

// Continuous floating rotation with pulse
function continuousRotation() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    rotationAngle += 0.12 * rotationDirection;
    if (rotationAngle > 4) rotationDirection = -1;
    if (rotationAngle < -4) rotationDirection = 1;
    
    // Gentle pulse effect
    pulseScale += 0.002 * pulseDirection;
    if (pulseScale > 1.01) pulseDirection = -1;
    if (pulseScale < 0.99) pulseDirection = 1;
    
    blobWrapper.style.transform = `perspective(1500px) rotateY(${rotationAngle}deg) rotateX(${rotationAngle * 0.3}deg) scale(${pulseScale})`;
    requestAnimationFrame(continuousRotation);
}

// Create Royal Luxury Shape with all decorations
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
    
    // 6 Layered Royal Rings (more luxury)
    const ringColors = ['#d4af37', '#ffd700', '#f3e5ab', '#b8941e', '#e8c547', '#f9e076'];
    for (let i = 0; i < 6; i++) {
        const size = 1.08 + (i * 0.04);
        const ring = document.createElement('div');
        ring.className = `royal-ring-${i}`;
        ring.style.cssText = `
            position: absolute;
            top: ${-wrapperSize * (size - 1) / 2}px;
            left: ${-wrapperSize * (size - 1) / 2}px;
            width: ${wrapperSize * size}px;
            height: ${wrapperSize * size}px;
            border-radius: 50%;
            border: ${2 - i * 0.25}px solid ${ringColors[i % ringColors.length]};
            opacity: ${0.5 - i * 0.06};
            animation: rotateRing ${14 + i * 2.5}s linear infinite, morphRing ${3.5 + i * 0.5}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${8 + i * 2}px rgba(212,175,55,0.3);
        `;
        blobWrapper.appendChild(ring);
    }
    
    // Star container with spiral galaxy pattern
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // Create 4 spiral arms (galaxy style)
    const spiralArms = 4;
    const starsPerArm = 18;
    
    for (let arm = 0; arm < spiralArms; arm++) {
        for (let i = 0; i < starsPerArm; i++) {
            const t = i / starsPerArm;
            const radius = wrapperSize * (0.4 + t * 0.34);
            const angleOffset = (arm * Math.PI * 2 / spiralArms) + t * Math.PI * 3.8;
            const x = center + Math.cos(angleOffset) * radius;
            const y = center + Math.sin(angleOffset) * radius * 0.94;
            
            const star = document.createElement('div');
            star.className = 'glit-star royal-star';
            if (i % 2 === 0) star.classList.add('sparkle');
            if (i % 6 === 0) star.classList.add('diamond-star');
            star.style.left = x + 'px';
            star.style.top = y + 'px';
            star.style.width = (3 + Math.sin(t * Math.PI) * 4) + 'px';
            star.style.height = (3 + Math.sin(t * Math.PI) * 4) + 'px';
            star.style.animationDelay = (arm * 0.35 + i * 0.07) + 's';
            star.style.animationDuration = (0.8 + Math.random() * 1.3) + 's';
            starContainer.appendChild(star);
        }
    }
    
    // Add crown jewel stars (12 major points for more luxury)
    const crownAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    crownAngles.forEach((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * wrapperSize * 0.72;
        const y = center + Math.sin(rad) * wrapperSize * 0.72;
        const star = document.createElement('div');
        star.className = 'glit-star crown-jewel';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = '12px';
        star.style.height = '12px';
        star.style.animationDelay = (idx * 0.15) + 's';
        star.style.animationDuration = '1.3s';
        star.innerHTML = '✦';
        star.style.fontSize = '18px';
        star.style.background = 'transparent';
        star.style.color = '#ffd700';
        star.style.textShadow = '0 0 15px #d4af37';
        starContainer.appendChild(star);
    });
    
    blobWrapper.appendChild(starContainer);
    
    // Create floating royal particles
    for (let i = 0; i < 45; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle royal-particle';
        const angle = Math.random() * Math.PI * 2;
        const radius = wrapperSize * (0.32 + Math.random() * 0.42);
        const x = Math.cos(angle) * radius * (0.8 + Math.random() * 0.4);
        const y = Math.sin(angle) * radius * (0.7 + Math.random() * 0.5);
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        particle.style.left = center + 'px';
        particle.style.top = center + 'px';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = (2 + Math.random() * 4) + 'px';
        particle.style.background = `radial-gradient(circle, #ffec80, #d4af37, #b8860b)`;
        particle.style.animationDelay = (i * 0.12) + 's';
        particle.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
        blobWrapper.appendChild(particle);
    }
    
    // Add floating diamond dust
    for (let i = 0; i < 80; i++) {
        const dust = document.createElement('div');
        dust.className = 'diamond-dust-particle';
        const angle = Math.random() * Math.PI * 2;
        const radius = wrapperSize * (0.48 + Math.random() * 0.42);
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
            opacity: ${0.2 + Math.random() * 0.6};
            animation: dustTwinkle ${0.4 + Math.random() * 1}s ease-in-out infinite;
            pointer-events: none;
        `;
        blobWrapper.appendChild(dust);
    }
}

// Initialize all royal effects
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createRoyalShape();
        setInterval(morphToNextShape, 3200);
        setInterval(changeGradient, 5500);
        continuousRotation();
        console.log('✨ 12 LUXURY SHAPES LOADED: Lotus, Diamond, Crown, Emblem, Leaf, Silk, Star, Peacock, Tiara, Crest, Rose! ✨');
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
// 6. ROYAL 3D TILT EFFECT
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
        
        tiltX = ((y - centerY) / centerY) * 10;
        tiltY = ((x - centerX) / centerX) * 10;
        const moveX = (x - centerX) / 22;
        const moveY = (y - centerY) / 22;
        
        blobWrapper.style.transform = `perspective(1500px) rotateY(${tiltY + rotationAngle}deg) rotateX(${tiltX + rotationAngle * 0.3}deg) scale(${pulseScale})`;
        if (blobImg) {
            blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.05)`;
            blobImg.style.filter = 'brightness(1.08) drop-shadow(0 20px 30px rgba(0,0,0,0.35))';
        }
        blobShape.style.boxShadow = '0 0 55px rgba(212, 175, 55, 0.7)';
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
// 7. ROYAL PARTICLE BACKGROUND
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
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.shape = Math.random() > 0.65 ? 'diamond' : 'circle';
            this.originalX = this.x;
            this.originalY = this.y;
        }
        update() {
            if (mouseX && mouseY) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 100;
                    this.x += Math.cos(angle) * force * 1.8;
                    this.y += Math.sin(angle) * force * 1.8;
                } else {
                    this.x += (this.originalX - this.x) * 0.008;
                    this.y += (this.originalY - this.y) * 0.008;
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
        for (let i = 0; i < 150; i++) particles.push(new RoyalParticle());
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 70) {
                    ctx.beginPath();
                    const opacity = 0.05 * (1 - distance / 70);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                    ctx.lineWidth = 0.4;
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
    
    @keyframes rotateRing {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes auroraPulse {
        0%, 100% { opacity: 0.12; transform: scale(0.96); filter: blur(15px); }
        50% { opacity: 0.3; transform: scale(1.06); filter: blur(22px); }
    }
    
    @keyframes auroraRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes dustTwinkle {
        0%, 100% { opacity: 0.1; transform: scale(0.5); }
        50% { opacity: 0.9; transform: scale(1.6); }
    }
    
    .blob-shape {
        transition: clip-path 2.8s cubic-bezier(0.34, 1.2, 0.64, 1), background 1.5s ease, transform 0.2s ease !important;
        box-shadow: 0 0 45px rgba(212, 175, 55, 0.45);
    }
    
    .glit-star.royal-star {
        background: radial-gradient(circle, #ffec80, #d4af37, #b8860b);
        box-shadow: 0 0 10px #ffd700, 0 0 18px rgba(212, 175, 55, 0.6);
    }
    
    .glit-star.crown-jewel {
        background: transparent !important;
        animation: crownJewelPulse 1.6s ease-in-out infinite;
    }
    
    @keyframes crownJewelPulse {
        0%, 100% { transform: scale(1); text-shadow: 0 0 12px #d4af37; }
        50% { transform: scale(1.35); text-shadow: 0 0 28px #ffd700; }
    }
    
    .glit-star.sparkle::before {
        font-size: 15px;
        animation: sparkleFloat 1.4s ease-in-out infinite;
    }
    
    @keyframes sparkleFloat {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
    }
    
    .floating-particle.royal-particle {
        filter: blur(0.6px);
    }
    
    .blob-wrapper {
        transition: transform 0.05s linear;
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ ROYAL DIAMOND AURORA PORTFOLIO LOADED — 12 UNIQUE SHAPES INCLUDING LOTUS, DIAMOND, CROWN, EMBLEM, LEAF, SILK, STAR, PEACOCK, TIARA, CREST, ROSE! ✨');
