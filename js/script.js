// ============================================
// 1. INITIALIZE AOS WITH ENHANCED SETTINGS
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
// 2. TYPED.JS FOR HERO ROLE - FASTER & DYNAMIC
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
// 3. THEME TOGGLE WITH ANIMATION
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
    // Add ripple effect
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
// 4. SCROLL PROGRESS BAR WITH GLOW EFFECT
// ============================================
const progressBarScroll = document.createElement('div');
progressBarScroll.className = 'scroll-progress';
document.body.appendChild(progressBarScroll);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBarScroll.style.width = scrolled + '%';
    
    // Add glow intensity based on scroll
    const glowIntensity = scrolled / 100;
    progressBarScroll.style.boxShadow = `0 0 ${10 + glowIntensity * 20}px rgba(212, 175, 55, ${0.5 + glowIntensity * 0.5})`;
});

// ============================================
// 5. ULTRA ATTRACTIVE ROUND IMAGE WITH PREMIUM EFFECTS
// ============================================

function createGlitterStars() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing decorations for clean refresh
    const existingContainer = blobWrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    const existingRings = blobWrapper.querySelectorAll('.star-ring, .golden-border-ring, .pulse-ring');
    existingRings.forEach(ring => ring.remove());
    const existingParticles = blobWrapper.querySelectorAll('.floating-particle, .glow-dot');
    existingParticles.forEach(p => p.remove());
    
    // Get current size for responsive positioning
    const wrapperSize = blobWrapper.offsetWidth;
    const center = wrapperSize / 2;
    const outerRadius = wrapperSize * 0.6;
    const innerRadius = wrapperSize * 0.44;
    const midRadius = wrapperSize * 0.52;
    
    // Create PULSE RING (new - very attractive)
    const pulseRing = document.createElement('div');
    pulseRing.className = 'pulse-ring';
    blobWrapper.appendChild(pulseRing);
    
    // Create rotating golden rings with different speeds
    const ring1 = document.createElement('div');
    ring1.className = 'star-ring';
    const ring2 = document.createElement('div');
    ring2.className = 'star-ring secondary';
    const ring3 = document.createElement('div');
    ring3.className = 'star-ring tertiary';
    const goldenRing = document.createElement('div');
    goldenRing.className = 'golden-border-ring';
    
    blobWrapper.appendChild(ring1);
    blobWrapper.appendChild(ring2);
    blobWrapper.appendChild(ring3);
    blobWrapper.appendChild(goldenRing);
    
    // Create star container for glittering stars
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // OUTER STARS - More stars for more glitter
    const outerStarCount = 32;
    for (let i = 0; i < outerStarCount; i++) {
        const angle = (i / outerStarCount) * Math.PI * 2;
        const x = center + Math.cos(angle) * outerRadius;
        const y = center + Math.sin(angle) * outerRadius;
        
        const star = document.createElement('div');
        star.className = 'glit-star';
        if (i % 2 === 0) star.classList.add('sparkle');
        if (i % 4 === 0) star.classList.add('super-sparkle');
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.1) + 's';
        star.style.animationDuration = (1 + Math.random() * 1.5) + 's';
        starContainer.appendChild(star);
    }
    
    // MIDDLE STARS - Twinkling stars
    const midStarCount = 20;
    for (let i = 0; i < midStarCount; i++) {
        const angle = (i / midStarCount) * Math.PI * 2 + 0.3;
        const x = center + Math.cos(angle) * midRadius;
        const y = center + Math.sin(angle) * midRadius;
        
        const star = document.createElement('div');
        star.className = 'glit-star mid-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.15) + 's';
        star.style.animationDuration = '1.2s';
        starContainer.appendChild(star);
    }
    
    // INNER STARS - Small but bright
    const innerStarCount = 24;
    for (let i = 0; i < innerStarCount; i++) {
        const angle = (i / innerStarCount) * Math.PI * 2 + 0.8;
        const x = center + Math.cos(angle) * innerRadius;
        const y = center + Math.sin(angle) * innerRadius;
        
        const star = document.createElement('div');
        star.className = 'glit-star inner-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.2) + 's';
        star.style.animationDuration = '1s';
        starContainer.appendChild(star);
    }
    
    blobWrapper.appendChild(starContainer);
    
    // GLOW DOTS - Floating magical particles
    const glowDotCount = 24;
    for (let i = 0; i < glowDotCount; i++) {
        const glowDot = document.createElement('div');
        glowDot.className = 'glow-dot';
        const angle = Math.random() * Math.PI * 2;
        const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        glowDot.style.setProperty('--x', x + 'px');
        glowDot.style.setProperty('--y', y + 'px');
        glowDot.style.left = center + 'px';
        glowDot.style.top = center + 'px';
        glowDot.style.animationDelay = (i * 0.2) + 's';
        glowDot.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        blobWrapper.appendChild(glowDot);
    }
    
    // FLOATING SPARKLES
    const sparkleCount = 12;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'floating-sparkle';
        const angle = Math.random() * Math.PI * 2;
        const distance = outerRadius + 5 + Math.random() * 15;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        sparkle.style.setProperty('--x', x + 'px');
        sparkle.style.setProperty('--y', y + 'px');
        sparkle.style.left = center + 'px';
        sparkle.style.top = center + 'px';
        sparkle.style.animationDelay = (i * 0.3) + 's';
        sparkle.style.animationDuration = (2 + Math.random() * 2.5) + 's';
        blobWrapper.appendChild(sparkle);
    }
}

// Initialize stars with proper timing
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createGlitterStars();
        
        // Add continuous rotation animation to blob wrapper
        const blobWrapper = document.getElementById('blobWrapper');
        if (blobWrapper) {
            blobWrapper.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
            
            // Add subtle floating animation
            setInterval(() => {
                if (!blobWrapper.matches(':hover')) {
                    blobWrapper.style.animation = 'subtleFloat 3s ease-in-out infinite';
                }
            }, 100);
        }
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createGlitterStars, 200);
});

// ============================================
// 6. ENHANCED 3D TILT EFFECT WITH MORE DRAMA
// ============================================
const blobWrapper3D = document.getElementById('blobWrapper');
const blobImg3D = document.querySelector('#blobWrapper img');

if (blobWrapper3D && blobImg3D) {
    let tiltTimeout;
    
    blobWrapper3D.addEventListener('mousemove', (e) => {
        const rect = blobWrapper3D.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Enhanced rotation (max 20 degrees for more drama)
        const rotateX = ((y - centerY) / centerY) * 18;
        const rotateY = ((x - centerX) / centerX) * 18;
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        const scale = 1 + (Math.abs(rotateX) + Math.abs(rotateY)) / 200;
        
        // Apply dynamic 3D transform with scale
        blobWrapper3D.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        blobImg3D.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.05)`;
        
        // Dynamic glow effect based on tilt intensity
        const intensity = (Math.abs(rotateX) + Math.abs(rotateY)) / 36;
        blobWrapper3D.style.boxShadow = `0 30px 60px -12px rgba(212, 175, 55, ${0.2 + intensity * 0.3})`;
        blobWrapper3D.style.filter = `drop-shadow(0 0 ${5 + intensity * 10}px rgba(212, 175, 55, ${0.3 + intensity * 0.4}))`;
    });
    
    blobWrapper3D.addEventListener('mouseleave', () => {
        blobWrapper3D.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale(1)';
        blobImg3D.style.transform = '';
        blobWrapper3D.style.boxShadow = '';
        blobWrapper3D.style.filter = '';
    });
    
    // Add click sparkle effect
    blobWrapper3D.addEventListener('click', (e) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'click-sparkle';
        sparkle.style.left = e.offsetX + 'px';
        sparkle.style.top = e.offsetY + 'px';
        blobWrapper3D.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
    });
}

// ============================================
// 7. PREMIUM PARTICLE BACKGROUND WITH COLORS
// ============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = null;
    let mouseY = null;
    let time = 0;
    
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
        }, 150);
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.originalX = this.x;
            this.originalY = this.y;
            this.color = `hsl(${45 + Math.random() * 20}, 70%, ${55 + Math.random() * 20}%)`;
            this.pulseSpeed = 0.02 + Math.random() * 0.03;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }
        
        update() {
            // React to mouse position with attraction/repulsion
            if (mouseX && mouseY) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 200) {
                    const angle = Math.atan2(dy, dx);
                    const force = (200 - distance) / 200;
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                } else if (distance < 400) {
                    const angle = Math.atan2(dy, dx);
                    const force = (400 - distance) / 400 * 0.5;
                    this.x += Math.cos(angle) * force;
                    this.y += Math.sin(angle) * force;
                } else {
                    // Return to original position
                    this.x += (this.originalX - this.x) * 0.01;
                    this.y += (this.originalY - this.y) * 0.01;
                }
            }
            
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges with smooth transition
            if (this.x < -50) this.x = canvas.width + 50;
            if (this.x > canvas.width + 50) this.x = -50;
            if (this.y < -50) this.y = canvas.height + 50;
            if (this.y > canvas.height + 50) this.y = -50;
            
            this.pulsePhase += this.pulseSpeed;
        }
        
        draw() {
            const pulseOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.15;
            const pulseSize = this.size + Math.sin(this.pulsePhase) * 0.5;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
            
            // Gradient fill for particles
            const gradient = ctx.createLinearGradient(this.x - pulseSize, this.y - pulseSize, this.x + pulseSize, this.y + pulseSize);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, `rgba(212, 175, 55, ${pulseOpacity})`);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Enhanced glow effect
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(212, 175, 55, ${pulseOpacity})`;
        }
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 150; i++) particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.shadowBlur = 0;
        
        // Draw connecting lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        time += 0.01;
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
// 8. SMOOTH SCROLLING WITH OFFSET AND ANIMATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            // Add click ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 9. ADD INTERSECTION OBSERVER FOR SCROLL REVEAL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// 10. ADD MOUSE TRAIL EFFECT (LUXURY TOUCH)
// ============================================
const mouseTrail = [];
const trailCount = 8;

for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);
    mouseTrail.push(trail);
}

let trailIndex = 0;
document.addEventListener('mousemove', (e) => {
    const trail = mouseTrail[trailIndex];
    trail.style.left = e.clientX - 5 + 'px';
    trail.style.top = e.clientY - 5 + 'px';
    trail.style.opacity = '1';
    trail.style.transform = 'scale(1)';
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 200);
    
    trailIndex = (trailIndex + 1) % trailCount;
});

console.log('✨ ULTRA LUXURY PORTFOLIO LOADED — Premium Animations Active! ✨');
