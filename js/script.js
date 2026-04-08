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
// 5. LUXURY ROUND IMAGE WITH GLITTERING STARS
// ============================================

function createGlitterStars() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing decorations
    const existingContainer = blobWrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    const existingRings = blobWrapper.querySelectorAll('.star-ring, .golden-border-ring');
    existingRings.forEach(ring => ring.remove());
    const existingParticles = blobWrapper.querySelectorAll('.floating-particle');
    existingParticles.forEach(p => p.remove());
    
    // Get current size for responsive positioning
    const wrapperSize = blobWrapper.offsetWidth;
    const center = wrapperSize / 2;
    const outerRadius = wrapperSize * 0.55;
    const innerRadius = wrapperSize * 0.45;
    
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
    
    // Create outer stars
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
        star.style.width = '4px';
        star.style.height = '4px';
        star.style.animationDelay = (i * 0.2) + 's';
        star.style.animationDuration = '1.5s';
        starContainer.appendChild(star);
    }
    
    blobWrapper.appendChild(starContainer);
    
    // Create floating particles
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        const angle = Math.random() * Math.PI * 2;
        const distance = innerRadius + Math.random() * 30;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        particle.style.left = center + 'px';
        particle.style.top = center + 'px';
        particle.style.animationDelay = (i * 0.3) + 's';
        particle.style.animationDuration = (2 + Math.random() * 2) + 's';
        blobWrapper.appendChild(particle);
    }
}

// Initialize stars on load and resize
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(createGlitterStars, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createGlitterStars, 200);
});

// ============================================
// 6. 3D TILT EFFECT FOR IMAGE
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
        
        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((x - centerX) / centerX) * 15;
        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;
        
        blobWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        if (blobImg) {
            blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.03)`;
        }
    });
    
    blobWrapper.addEventListener('mouseleave', () => {
        blobWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        if (blobImg) blobImg.style.transform = '';
    });
}

// ============================================
// 7. PARTICLE BACKGROUND
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
            this.size = Math.random() * 2.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.15;
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
        for (let i = 0; i < 100; i++) particles.push(new Particle());
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
// 8. SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

console.log('✨ Luxury Portfolio Loaded — Fully Responsive with Glitter Stars!'); 
