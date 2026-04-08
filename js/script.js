// ============================================
// 🚀 ULTIMATE LUXURY PORTFOLIO - MOST ATTRACTIVE JS
// ============================================

// ============================================
// 1. PREMIUM AOS WITH CUSTOM EASING
// ============================================
AOS.init({
    duration: 1200,
    once: false,
    offset: 100,
    easing: 'ease-out-quad',
    mirror: true,
    anchorPlacement: 'top-bottom',
    disable: false
});

// ============================================
// 2. DYNAMIC TYPED.JS WITH EMOJIS
// ============================================
if (document.getElementById('typed-role')) {
    new Typed('#typed-role', {
        strings: [
            'Python Fullstack Developer 🐍',
            'UI/UX Designer 🎨',
            'Creative Coder 💻',
            'Problem Solver 🧠',
            'Tech Artist ✨'
        ],
        typeSpeed: 70,
        backSpeed: 45,
        loop: true,
        cursorChar: '✨',
        smartBackspace: true,
        backDelay: 1500,
        startDelay: 500
    });
}

// ============================================
// 3. THEME TOGGLE WITH DRAMATIC EFFECT
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Theme toggle with explosion effect
themeToggle.addEventListener('click', (e) => {
    // Create explosion effect
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'theme-particle';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
    
    themeToggle.style.transform = 'scale(1.3) rotate(360deg)';
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
// 4. 3D SCROLL PROGRESS WITH RAINBOW EFFECT
// ============================================
const progressBarScroll = document.createElement('div');
progressBarScroll.className = 'scroll-progress';
document.body.appendChild(progressBarScroll);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBarScroll.style.width = scrolled + '%';
    
    // Dynamic color based on scroll position
    const hue = (scrolled * 3.6);
    progressBarScroll.style.background = `linear-gradient(90deg, 
        hsl(${hue}, 100%, 50%), 
        hsl(${hue + 60}, 100%, 60%),
        hsl(${hue + 120}, 100%, 50%))`;
});

// ============================================
// 5. SPECTACULAR ROUND IMAGE WITH GALAXY EFFECTS
// ============================================

function createGalaxyEffect() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Clear existing effects
    const existingEffects = blobWrapper.querySelectorAll('.galaxy-ring, .shooting-star, .nebula, .star-field, .orbit-ring');
    existingEffects.forEach(effect => effect.remove());
    
    const size = blobWrapper.offsetWidth;
    const center = size / 2;
    
    // Create nebula background
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    blobWrapper.appendChild(nebula);
    
    // Create multiple orbit rings
    const orbits = [0.45, 0.55, 0.65, 0.75];
    orbits.forEach((radius, idx) => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit-ring';
        orbit.style.width = (radius * 2 * 100) + '%';
        orbit.style.height = (radius * 2 * 100) + '%';
        orbit.style.animationDuration = (20 - idx * 3) + 's';
        orbit.style.animationDirection = idx % 2 === 0 ? 'normal' : 'reverse';
        blobWrapper.appendChild(orbit);
    });
    
    // Create star field
    const starField = document.createElement('div');
    starField.className = 'star-field';
    
    // Add 100 stars in galaxy pattern
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'galaxy-star';
        const angle = Math.random() * Math.PI * 2;
        const rad = center * (0.2 + Math.random() * 0.7);
        const x = center + Math.cos(angle) * rad;
        const y = center + Math.sin(angle) * rad;
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (Math.random() * 5) + 's';
        star.style.animationDuration = (1 + Math.random() * 2) + 's';
        star.style.opacity = 0.3 + Math.random() * 0.7;
        starField.appendChild(star);
    }
    blobWrapper.appendChild(starField);
    
    // Create shooting stars
    for (let i = 0; i < 8; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        const angle = Math.random() * Math.PI * 2;
        const startRad = center * 0.8;
        const x = center + Math.cos(angle) * startRad;
        const y = center + Math.sin(angle) * startRad;
        shootingStar.style.left = x + 'px';
        shootingStar.style.top = y + 'px';
        shootingStar.style.setProperty('--angle', angle + 'rad');
        shootingStar.style.animationDelay = (i * 3) + 's';
        blobWrapper.appendChild(shootingStar);
    }
    
    // Create floating diamonds (luxury touch)
    for (let i = 0; i < 12; i++) {
        const diamond = document.createElement('div');
        diamond.className = 'floating-diamond';
        const angle = Math.random() * Math.PI * 2;
        const rad = center * (0.5 + Math.random() * 0.4);
        const x = center + Math.cos(angle) * rad;
        const y = center + Math.sin(angle) * rad;
        diamond.style.left = x + 'px';
        diamond.style.top = y + 'px';
        diamond.style.animationDelay = (i * 0.4) + 's';
        diamond.style.animationDuration = (3 + Math.random() * 2) + 's';
        blobWrapper.appendChild(diamond);
    }
}

// Initialize galaxy effect
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createGalaxyEffect();
        createGlowOrb();
    }, 100);
});

let galaxyResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(galaxyResizeTimeout);
    galaxyResizeTimeout = setTimeout(createGalaxyEffect, 200);
});

// ============================================
// 6. MAGNETIC 3D TILT WITH HOLOGRAPHIC EFFECT
// ============================================
const magneticWrapper = document.getElementById('blobWrapper');
const magneticImg = document.querySelector('#blobWrapper img');

if (magneticWrapper && magneticImg) {
    let rafId = null;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    
    magneticWrapper.addEventListener('mousemove', (e) => {
        const rect = magneticWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        targetRotateX = ((y - centerY) / centerY) * 25;
        targetRotateY = ((x - centerX) / centerX) * 25;
        
        const moveX = (x - centerX) / 15;
        const moveY = (y - centerY) / 15;
        
        magneticImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.08)`;
        
        // Holographic shimmer effect
        const shimmer = document.createElement('div');
        shimmer.className = 'holographic-shimmer';
        shimmer.style.left = x + 'px';
        shimmer.style.top = y + 'px';
        magneticWrapper.appendChild(shimmer);
        setTimeout(() => shimmer.remove(), 300);
        
        if (!rafId) {
            rafId = requestAnimationFrame(updateRotation);
        }
    });
    
    function updateRotation() {
        currentRotateX += (targetRotateX - currentRotateX) * 0.15;
        currentRotateY += (targetRotateY - currentRotateY) * 0.15;
        
        magneticWrapper.style.transform = `perspective(2000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
        
        if (Math.abs(currentRotateX - targetRotateX) > 0.01 || Math.abs(currentRotateY - targetRotateY) > 0.01) {
            rafId = requestAnimationFrame(updateRotation);
        } else {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }
    
    magneticWrapper.addEventListener('mouseleave', () => {
        targetRotateX = 0;
        targetRotateY = 0;
        magneticImg.style.transform = '';
        if (!rafId) {
            rafId = requestAnimationFrame(updateRotation);
        }
    });
}

// ============================================
// 7. COSMIC PARTICLE BACKGROUND WITH CONNECTIONS
// ============================================
const cosmicCanvas = document.getElementById('particles-canvas');
if (cosmicCanvas) {
    const ctx = cosmicCanvas.getContext('2d');
    let particles = [];
    let connections = [];
    let mouseX = null, mouseY = null;
    let mouseRadius = 150;
    
    function resizeCanvas() {
        cosmicCanvas.width = window.innerWidth;
        cosmicCanvas.height = window.innerHeight;
    }
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    class CosmicParticle {
        constructor() {
            this.x = Math.random() * cosmicCanvas.width;
            this.y = Math.random() * cosmicCanvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.baseHue = 45 + Math.random() * 30;
            this.hue = this.baseHue;
            this.angle = Math.random() * Math.PI * 2;
            this.radius = Math.random() * 100 + 50;
            this.centerX = this.x;
            this.centerY = this.y;
            this.orbitSpeed = 0.01 + Math.random() * 0.02;
        }
        
        update() {
            // Orbit around original position
            this.angle += this.orbitSpeed;
            this.x = this.centerX + Math.cos(this.angle) * this.radius * 0.1;
            this.y = this.centerY + Math.sin(this.angle) * this.radius * 0.1;
            
            // Mouse interaction
            if (mouseX && mouseY) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouseRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouseRadius - distance) / mouseRadius;
                    this.x -= Math.cos(angle) * force * 3;
                    this.y -= Math.sin(angle) * force * 3;
                    this.hue = (this.baseHue + force * 50) % 360;
                } else {
                    this.hue = this.baseHue;
                }
            }
            
            // Wrap around
            if (this.x < -50) this.x = cosmicCanvas.width + 50;
            if (this.x > cosmicCanvas.width + 50) this.x = -50;
            if (this.y < -50) this.y = cosmicCanvas.height + 50;
            if (this.y > cosmicCanvas.height + 50) this.y = -50;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Gradient fill
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
            gradient.addColorStop(0, `hsl(${this.hue}, 100%, 65%)`);
            gradient.addColorStop(1, `hsl(${this.hue}, 80%, 45%)`);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
        }
    }
    
    function initCosmicParticles() {
        particles = [];
        for (let i = 0; i < 200; i++) {
            particles.push(new CosmicParticle());
        }
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = 0.15 * (1 - distance / 120);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateCosmic() {
        ctx.clearRect(0, 0, cosmicCanvas.width, cosmicCanvas.height);
        ctx.shadowBlur = 0;
        
        drawConnections();
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animateCosmic);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initCosmicParticles();
    });
    
    resizeCanvas();
    initCosmicParticles();
    animateCosmic();
}

// ============================================
// 8. CURSOR MAGIC WITH TRAIL AND GLOW
// ============================================
const cursorTrail = [];
const trailLength = 15;

// Create cursor trail elements
for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    cursorTrail.push(trail);
}

let trailPositions = [];
let lastX = 0, lastY = 0;

document.addEventListener('mousemove', (e) => {
    trailPositions.unshift({ x: e.clientX, y: e.clientY, time: Date.now() });
    if (trailPositions.length > trailLength) trailPositions.pop();
    
    cursorTrail.forEach((trail, index) => {
        if (trailPositions[index]) {
            trail.style.left = trailPositions[index].x - 5 + 'px';
            trail.style.top = trailPositions[index].y - 5 + 'px';
            trail.style.opacity = 1 - (index / trailLength);
            trail.style.transform = `scale(${1 - (index / trailLength)})`;
        }
    });
});

// Custom cursor
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
document.body.appendChild(customCursor);

const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX - 8 + 'px';
    customCursor.style.top = e.clientY - 8 + 'px';
    
    setTimeout(() => {
        cursorRing.style.left = e.clientX - 20 + 'px';
        cursorRing.style.top = e.clientY - 20 + 'px';
    }, 80);
});

// Hover effect on clickable elements
document.querySelectorAll('a, button, .project-card, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
        customCursor.style.transform = 'scale(1.5)';
        cursorRing.style.transform = 'scale(1.3)';
        cursorRing.style.borderColor = '#ffd700';
    });
    el.addEventListener('mouseleave', () => {
        customCursor.style.transform = 'scale(1)';
        cursorRing.style.transform = 'scale(1)';
        cursorRing.style.borderColor = '#d4af37';
    });
});

// ============================================
// 9. SCROLL REVEAL WITH PARALLAX
// ============================================
const revealElements = document.querySelectorAll('.section, .project-card, .skill-category, .contact-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(el);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroSection.style.opacity = 1 - (scrolled * 0.002);
    }
});

// ============================================
// 10. SMOOTH SCROLL WITH EASING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            // Ripple effect on click
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
            
            const offset = 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            // Smooth scroll with custom easing
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeOutCubic(progress);
                window.scrollTo(0, startPosition + distance * ease);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeOutCubic(x) {
                return 1 - Math.pow(1 - x, 3);
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// ============================================
// 11. GLOW ORB EFFECT (NEW)
// ============================================
function createGlowOrb() {
    const orb = document.createElement('div');
    orb.className = 'glow-orb';
    document.body.appendChild(orb);
    
    document.addEventListener('mousemove', (e) => {
        orb.style.left = e.clientX - 150 + 'px';
        orb.style.top = e.clientY - 150 + 'px';
    });
}

// ============================================
// 12. NUMBER COUNTER FOR STATS
// ============================================
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number');
    
    numberElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                el.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateNumber();
                observer.disconnect();
            }
        });
        observer.observe(el);
    });
}

// Initialize number counter when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateNumbers, 500);
});

// ============================================
// 13. BACKGROUND MUSIC VISUALIZER (OPTIONAL)
// ============================================
function createAudioVisualizer() {
    const bars = [];
    for (let i = 0; i < 50; i++) {
        const bar = document.createElement('div');
        bar.className = 'audio-bar';
        bar.style.height = Math.random() * 100 + '%';
        bar.style.animationDelay = i * 0.05 + 's';
        document.querySelector('.hero')?.appendChild(bar);
        bars.push(bar);
    }
    
    setInterval(() => {
        bars.forEach(bar => {
            bar.style.height = Math.random() * 100 + '%';
        });
    }, 200);
}

// Uncomment if you want visualizer
// createAudioVisualizer();

// ============================================
// 14. WELCOME MESSAGE WITH CONFETTI
// ============================================
function showWelcomeConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    
    const colors = ['#d4af37', '#ffd700', '#ffed4a', '#f5e7a3'];
    
    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Show confetti on first visit
if (!localStorage.getItem('visited')) {
    setTimeout(showWelcomeConfetti, 500);
    localStorage.setItem('visited', 'true');
}

console.log('✨✨✨ ULTIMATE LUXURY PORTFOLIO ACTIVATED! ✨✨✨');
console.log('🎨 Features: Galaxy Effect | Magnetic Tilt | Cosmic Particles | Custom Cursor | Parallax | Confetti 🎨');
