// ============================================
// 1. INITIALIZE AOS - PROFESSIONAL SETUP
// ============================================
AOS.init({
    duration: 1000,
    once: false,
    offset: 120,
    easing: 'ease-out-cubic',
    mirror: true,
    anchorPlacement: 'top-bottom'
});

// ============================================
// 2. TYPED.JS FOR HERO ROLE
// ============================================
if (document.getElementById('typed-role')) {
    new Typed('#typed-role', {
        strings: ['Python Fullstack Developer ✨', 'Web Designer 🎨', 'Creative Coder 💻', 'Problem Solver 🧠'],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
        cursorChar: '⚡',
        smartBackspace: true,
        shuffle: true
    });
}

// ============================================
// 3. THEME TOGGLE WITH SMOOTH TRANSITION
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
    themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
    setTimeout(() => { themeToggle.style.transform = ''; }, 300);
    
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
    
    const glowIntensity = scrolled / 100;
    progressBarScroll.style.boxShadow = `0 0 ${10 + glowIntensity * 20}px rgba(212, 175, 55, ${0.5 + glowIntensity * 0.5})`;
});

// ============================================
// 5. CREATE PROFESSIONAL GLITTER STARS AROUND IMAGE
// ============================================
function createGlitterStars() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Clear existing elements for clean refresh
    const existingElements = blobWrapper.querySelectorAll('.star-container, .star-ring, .golden-border-ring, .pulse-ring, .glow-dot, .floating-sparkle');
    existingElements.forEach(el => el.remove());
    
    const wrapperSize = blobWrapper.offsetWidth;
    const center = wrapperSize / 2;
    const outerRadius = wrapperSize * 0.58;
    const innerRadius = wrapperSize * 0.42;
    
    // Create elegant rotating rings
    const rings = [
        { className: 'star-ring', width: 88, speed: 20 },
        { className: 'star-ring secondary', width: 94, speed: 25, reverse: true },
        { className: 'star-ring tertiary', width: 80, speed: 15 }
    ];
    
    rings.forEach(ring => {
        const ringEl = document.createElement('div');
        ringEl.className = ring.className;
        ringEl.style.width = ring.width + '%';
        ringEl.style.height = ring.width + '%';
        ringEl.style.animationDuration = ring.speed + 's';
        if (ring.reverse) {
            ringEl.style.animationDirection = 'reverse';
        }
        blobWrapper.appendChild(ringEl);
    });
    
    // Golden border ring
    const goldenRing = document.createElement('div');
    goldenRing.className = 'golden-border-ring';
    blobWrapper.appendChild(goldenRing);
    
    // Pulse ring effect
    const pulseRing = document.createElement('div');
    pulseRing.className = 'pulse-ring';
    blobWrapper.appendChild(pulseRing);
    
    // Star container
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // Outer stars (small glittering stars)
    const outerStarCount = 24;
    for (let i = 0; i < outerStarCount; i++) {
        const angle = (i / outerStarCount) * Math.PI * 2;
        const x = center + Math.cos(angle) * outerRadius;
        const y = center + Math.sin(angle) * outerRadius;
        
        const star = document.createElement('div');
        star.className = 'glit-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.15) + 's';
        starContainer.appendChild(star);
    }
    
    // Inner stars (smaller, more subtle)
    const innerStarCount = 16;
    for (let i = 0; i < innerStarCount; i++) {
        const angle = (i / innerStarCount) * Math.PI * 2 + 0.5;
        const x = center + Math.cos(angle) * innerRadius;
        const y = center + Math.sin(angle) * innerRadius;
        
        const star = document.createElement('div');
        star.className = 'glit-star inner-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.2) + 's';
        starContainer.appendChild(star);
    }
    
    blobWrapper.appendChild(starContainer);
    
    // Floating glow dots (very subtle)
    const glowDotCount = 12;
    for (let i = 0; i < glowDotCount; i++) {
        const glowDot = document.createElement('div');
        glowDot.className = 'glow-dot';
        const angle = Math.random() * Math.PI * 2;
        const radius = innerRadius + 5 + Math.random() * (outerRadius - innerRadius - 10);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        glowDot.style.setProperty('--x', x + 'px');
        glowDot.style.setProperty('--y', y + 'px');
        glowDot.style.left = center + 'px';
        glowDot.style.top = center + 'px';
        glowDot.style.animationDelay = (i * 0.3) + 's';
        blobWrapper.appendChild(glowDot);
    }
}

// Initialize stars after DOM loads
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createGlitterStars();
        const blobWrapper = document.getElementById('blobWrapper');
        if (blobWrapper) {
            blobWrapper.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
        }
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createGlitterStars, 200);
});

// ============================================
// 6. PROFESSIONAL 3D TILT EFFECT
// ============================================
const blobWrapper3D = document.getElementById('blobWrapper');
const blobImg3D = document.querySelector('#blobWrapper img');

if (blobWrapper3D && blobImg3D) {
    let tiltActive = false;
    
    blobWrapper3D.addEventListener('mousemove', (e) => {
        const rect = blobWrapper3D.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;
        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;
        
        blobWrapper3D.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        blobImg3D.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.02)`;
        blobWrapper3D.style.boxShadow = `0 20px 40px -12px rgba(212, 175, 55, 0.25)`;
    });
    
    blobWrapper3D.addEventListener('mouseleave', () => {
        blobWrapper3D.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        blobImg3D.style.transform = '';
        blobWrapper3D.style.boxShadow = '';
    });
    
    // Subtle click effect
    blobWrapper3D.addEventListener('click', (e) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'click-sparkle';
        sparkle.style.left = e.offsetX + 'px';
        sparkle.style.top = e.offsetY + 'px';
        blobWrapper3D.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 400);
    });
}

// ============================================
// 7. PROFESSIONAL PARTICLE BACKGROUND
// ============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = null;
    let mouseY = null;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        setTimeout(() => {
            mouseX = null;
            mouseY = null;
        }, 100);
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.15;
            this.speedY = (Math.random() - 0.5) * 0.15;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.originalX = this.x;
            this.originalY = this.y;
        }
        
        update() {
            if (mouseX && mouseY) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    const angle = Math.atan2(dy, dx);
                    const force = (120 - distance) / 120;
                    this.x -= Math.cos(angle) * force;
                    this.y -= Math.sin(angle) * force;
                } else {
                    this.x += (this.originalX - this.x) * 0.005;
                    this.y += (this.originalY - this.y) * 0.005;
                }
            }
            
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < -50) this.x = canvas.width + 50;
            if (this.x > canvas.width + 50) this.x = -50;
            if (this.y < -50) this.y = canvas.height + 50;
            if (this.y > canvas.height + 50) this.y = -50;
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
// 8. SMOOTH SCROLLING WITH OFFSET
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
            
            const offset = 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 9. SUBTLE MOUSE TRAIL (OPTIONAL - LESS INTRUSIVE)
// ============================================
const mouseTrail = [];
const trailCount = 5;

for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);
    mouseTrail.push(trail);
}

let trailIndex = 0;
let lastMoveTime = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMoveTime > 30) {
        lastMoveTime = now;
        const trail = mouseTrail[trailIndex];
        trail.style.left = e.clientX - 4 + 'px';
        trail.style.top = e.clientY - 4 + 'px';
        trail.style.opacity = '0.6';
        trail.style.transform = 'scale(1)';
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 150);
        
        trailIndex = (trailIndex + 1) % trailCount;
    }
});

console.log('✨ Professional Portfolio Loaded — All Animations Active! ✨');
