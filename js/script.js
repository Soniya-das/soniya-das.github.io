// ============================================
// 1. INITIALIZE AOS (Scroll Animations)
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
        cursorChar: '|',
        smartBackspace: true
    });
}

// ============================================
// 3. DARK/LIGHT MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.documentElement.removeAttribute('data-theme');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
        setTimeout(() => { if (themeToggle) themeToggle.style.transform = ''; }, 300);
        
        if (document.documentElement.hasAttribute('data-theme')) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            updateParticleOpacity();
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            updateParticleOpacity();
        }
        refreshThemeDependentElements();
    });
}

function updateParticleOpacity() {
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        if (document.documentElement.hasAttribute('data-theme')) {
            canvas.style.opacity = '0.15';
        } else {
            canvas.style.opacity = '0.4';
        }
    }
}

function refreshThemeDependentElements() {
    const glow = document.querySelector('.mouse-glow');
    if (glow) {
        if (document.documentElement.hasAttribute('data-theme')) {
            glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)';
        } else {
            glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)';
        }
    }
}

// ============================================
// 4. SKILL BARS ANIMATION
// ============================================
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        if (bar.classList.contains('animated')) return;
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            bar.classList.add('animated');
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                bar.style.width = targetWidth + '%';
                const percentSpan = bar.parentElement.parentElement.querySelector('.skill-percent');
                if (percentSpan) {
                    let current = 0;
                    const target = parseInt(targetWidth);
                    const duration = 1200;
                    const stepTime = 20;
                    const increment = target / (duration / stepTime);
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                        }
                        percentSpan.textContent = Math.floor(current);
                    }, stepTime);
                }
            }
        }
    });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);
setTimeout(animateSkills, 500);

// ============================================
// 5. MOUSE GLOW EFFECT
// ============================================
const glow = document.querySelector('.mouse-glow');
if (glow) {
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// ============================================
// 6. SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + '%';
});

// ============================================
// 7. SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ============================================
// 8. PARTICLE BACKGROUND
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
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.25;
            this.speedY = (Math.random() - 0.5) * 0.25;
            this.opacity = Math.random() * 0.35 + 0.1;
        }
        
        update() {
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
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 18));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
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
    updateParticleOpacity();
}

// ============================================
// 9. CREATE GLITTER STARS AROUND BLOB
// ============================================
function createGlitterStars() {
    const wrapper = document.getElementById('blobWrapper');
    if (!wrapper) return;
    
    const existingContainer = wrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    
    const size = wrapper.offsetWidth;
    const center = size / 2;
    const outerRadius = size * 0.55;
    const innerRadius = size * 0.42;
    
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const x = center + Math.cos(angle) * outerRadius;
        const y = center + Math.sin(angle) * outerRadius;
        const star = document.createElement('div');
        star.className = 'glit-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.15) + 's';
        starContainer.appendChild(star);
    }
    
    for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + 0.5;
        const x = center + Math.cos(angle) * innerRadius;
        const y = center + Math.sin(angle) * innerRadius;
        const star = document.createElement('div');
        star.className = 'glit-star inner-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.2) + 's';
        starContainer.appendChild(star);
    }
    
    wrapper.appendChild(starContainer);
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(createGlitterStars, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createGlitterStars, 200);
});

// ============================================
// 10. ACTIVE NAV LINK HIGHLIGHTING
// ============================================
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

setActiveNavLink();

// ============================================
// 11. CONTACT FORM HANDLER
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('✨ Thank you for your message! I will get back to you soon. ✨');
        contactForm.reset();
    });
}

// ============================================
// 12. NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ============================================
// 13. 3D TILT FOR BLOB
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
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.05)`;
        blobShape.style.transform = `rotateX(${(y - centerY) / 30}deg) rotateY(${(x - centerX) / 30}deg)`;
    });
    
    blobWrapper.addEventListener('mouseleave', () => {
        blobImg.style.transform = '';
        blobShape.style.transform = '';
    });
}

console.log('✨ Portfolio Loaded Successfully! ✨');
console.log('🌓 Theme: ' + (document.documentElement.hasAttribute('data-theme') ? 'Light' : 'Dark'));
