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
// 5. PROFESSIONAL ROUND IMAGE WITH LUXURY EFFECTS
// ============================================

function createGlitterStars() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing decorations for clean refresh
    const existingContainer = blobWrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    const existingRings = blobWrapper.querySelectorAll('.star-ring, .golden-border-ring');
    existingRings.forEach(ring => ring.remove());
    const existingParticles = blobWrapper.querySelectorAll('.floating-particle');
    existingParticles.forEach(p => p.remove());
    
    // Get current size for responsive positioning
    const wrapperSize = blobWrapper.offsetWidth;
    const center = wrapperSize / 2;
    const outerRadius = wrapperSize * 0.58;
    const innerRadius = wrapperSize * 0.42;
    
    // Create rotating golden rings
    const ring1 = document.createElement('div');
    ring1.className = 'star-ring';
    const ring2 = document.createElement('div');
    ring2.className = 'star-ring secondary';
    const goldenRing = document.createElement('div');
    goldenRing.className = 'golden-border-ring';
    
    blobWrapper.appendChild(ring1);
    blobWrapper.appendChild(ring2);
    blobWrapper.appendChild(goldenRing);
    
    // Create star container for glittering stars
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // Outer stars (24 stars for full rotation)
    const outerStarCount = 24;
    for (let i = 0; i < outerStarCount; i++) {
        const angle = (i / outerStarCount) * Math.PI * 2;
        const x = center + Math.cos(angle) * outerRadius;
        const y = center + Math.sin(angle) * outerRadius;
        
        const star = document.createElement('div');
        star.className = 'glit-star';
        if (i % 3 === 0) star.classList.add('sparkle');
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.15) + 's';
        starContainer.appendChild(star);
    }
    
    // Inner stars for depth
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
        star.style.animationDuration = '1.5s';
        starContainer.appendChild(star);
    }
    
    blobWrapper.appendChild(starContainer);
    
    // Floating particles for magical effect
    const particleCount = 16;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        const angle = Math.random() * Math.PI * 2;
        const distance = innerRadius + Math.random() * 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        particle.style.left = center + 'px';
        particle.style.top = center + 'px';
        particle.style.animationDelay = (i * 0.25) + 's';
        particle.style.animationDuration = (2 + Math.random() * 2) + 's';
        blobWrapper.appendChild(particle);
    }
}

// Initialize stars with proper timing
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createGlitterStars();
        // Add hover glow effect to blob wrapper
        const blobWrapper = document.getElementById('blobWrapper');
        if (blobWrapper) {
            blobWrapper.style.transition = 'box-shadow 0.3s ease';
        }
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createGlitterStars, 200);
});

// ============================================
// 6. 3D TILT EFFECT FOR PROFESSIONAL LOOK
// ============================================
const blobWrapper3D = document.getElementById('blobWrapper');
const blobImg3D = document.querySelector('#blobWrapper img');

if (blobWrapper3D && blobImg3D) {
    blobWrapper3D.addEventListener('mousemove', (e) => {
        const rect = blobWrapper3D.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (max 12 degrees)
        const rotateX = ((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;
        const moveX = (x - centerX) / 30;
        const moveY = (y - centerY) / 30;
        
        // Apply smooth 3D transform
        blobWrapper3D.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        blobImg3D.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.02)`;
        
        // Add glow effect on hover
        blobWrapper3D.style.boxShadow = '0 25px 50px -12px rgba(212, 175, 55, 0.3)';
    });
    
    blobWrapper3D.addEventListener('mouseleave', () => {
        blobWrapper3D.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        blobImg3D.style.transform = '';
        blobWrapper3D.style.boxShadow = '';
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
    
    // Mouse movement tracking for interactive particles
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
            this.size = Math.random() * 2.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.originalX = this.x;
            this.originalY = this.y;
        }
        update() {
            // React to mouse position
            if (mouseX && mouseY) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    const angle = Math.atan2(dy, dx);
                    const force = (150 - distance) / 150;
                    this.x -= Math.cos(angle) * force * 1.5;
                    this.y -= Math.sin(angle) * force * 1.5;
                } else {
                    // Return to original position
                    this.x += (this.originalX - this.x) * 0.02;
                    this.y += (this.originalY - this.y) * 0.02;
                }
            }
            
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
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
            
            // Add glow effect
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        }
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 120; i++) particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.shadowBlur = 0; // Reset shadow
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
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

console.log('✨ Luxury Portfolio Loaded — Professional Animations Active!');
