// ============================================
// 1. INITIALIZE AOS (Scroll Animations)
// ============================================
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ============================================
// 2. TYPED.JS FOR HERO ROLE (Home page)
// ============================================
if (document.getElementById('typed-role')) {
    new Typed('#typed-role', {
        strings: ['Python Fullstack Developer', 'Web Designer'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });
}

// ============================================
// 3. TYPING EFFECT FOR ABOUT PAGE LEAD TEXT
// ============================================
const leadElement = document.getElementById('typed-text');
if (leadElement) {
    const phrases = [
        "Crafting elegant web experiences with Python & Django",
        "Building clean, scalable applications",
        "Passionate about problem-solving"
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, currentText = '';
    function typeEffect() {
        const fullText = phrases[phraseIndex];
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        leadElement.textContent = currentText;
        if (!isDeleting && charIndex === fullText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
            return;
        }
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();
}

// ============================================
// 4. DARK/LIGHT MODE TOGGLE (Unified)
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
// 5. SKILL BARS ANIMATION (Skills page)
// ============================================
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.progress-bar');
        const percentSpan = item.querySelector('.skill-percent');
        if (!progressBar || !percentSpan) return;
        const targetWidth = progressBar.getAttribute('data-width');
        if (!targetWidth || progressBar.classList.contains('animated')) return;
        const rect = progressBar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            progressBar.classList.add('animated');
            progressBar.style.width = targetWidth + '%';
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
    });
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);
setTimeout(animateSkills, 500);

// ============================================
// 6. MOUSE-FOLLOW GLOW EFFECT (Luxury)
// ============================================
const glow = document.createElement('div');
glow.className = 'mouse-glow';
document.body.appendChild(glow);
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
});
function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();

// ============================================
// 7. SCROLL PROGRESS BAR (Luxury)
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
// 8. SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// 9. PARTICLE BACKGROUND (Canvas)
// ============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];
    function initParticles() {
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });
        requestAnimationFrame(drawParticles);
    }
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        initParticles();
    });
    initParticles();
    drawParticles();
}

// ============================================
// 10. CARD SCROLL EFFECT (About page)
// ============================================
const aboutCard = document.querySelector('.about-card');
if (aboutCard) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = 500;
        const scale = 1 - Math.min(scrolled / maxScroll, 0.03);
        const translateY = Math.min(scrolled / 15, 20);
        aboutCard.style.transform = `translateY(-${translateY}px) scale(${scale})`;
    });
}

// ============================================
// 11. CONTACT FORM ENHANCEMENTS (Validation Only)
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '';
            }
        });
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
        });
    });
}

// ============================================
// 12. 3D TILT EFFECT FOR BLOB SHAPE (Home page)
// ============================================
const blobWrapper = document.getElementById('blobWrapper');
if (blobWrapper) {
    blobWrapper.addEventListener('mousemove', (e) => {
        const rect = blobWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((x - centerX) / centerX) * 15;
        blobWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    blobWrapper.addEventListener('mouseleave', () => {
        blobWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// ============================================
// 13. IMAGE POP-OUT PARALLAX (3D depth on mousemove)
// ============================================
const blobShape = document.querySelector('.blob-shape');
const blobImg = document.querySelector('.blob-shape img');
if (blobShape && blobImg) {
    blobWrapper.addEventListener('mousemove', (e) => {
        const rect = blobWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Move image slightly opposite to cursor direction (3D depth)
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        blobImg.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.05) translateZ(20px)`;
        blobShape.style.transform = `rotateX(${(y - centerY) / 30}deg) rotateY(${(x - centerX) / 30}deg)`;
    });
    blobWrapper.addEventListener('mouseleave', () => {
        blobImg.style.transform = '';
        blobShape.style.transform = '';
    });
}




// ============================================
// SKILL PERCENTAGE COUNTER (Small Boxes)
// ============================================
function animateSkillPercentages() {
    const skillBoxes = document.querySelectorAll('.skill-box');
    skillBoxes.forEach(box => {
        const percentSpan = box.querySelector('.skill-percent');
        if (!percentSpan || percentSpan.classList.contains('counted')) return;
        const target = parseInt(box.getAttribute('data-skill'));
        if (isNaN(target)) return;
        const rect = box.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            percentSpan.classList.add('counted');
            let current = 0;
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
    });
}

window.addEventListener('scroll', animateSkillPercentages);
window.addEventListener('load', animateSkillPercentages);
setTimeout(animateSkillPercentages, 500);






// ========== INITIALIZE ALL FEATURES ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-quad'
    });
    
    // Typed.js Animation
    const typed = new Typed('#typed-role', {
        strings: [
            'Python Developer',
            'Fullstack Engineer',
            'Django Expert',
            'UI Enthusiast',
            'Problem Solver'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });
    
    // Particle Network Animation
    class ParticleNetwork {
        constructor() {
            this.canvas = document.getElementById('particles-canvas');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 80;
            this.maxDistance = 150;
            this.init();
        }
        
        init() {
            this.setSize();
            this.createParticles();
            this.animate();
            window.addEventListener('resize', () => this.setSize());
        }
        
        setSize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
        
        createParticles() {
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.5 + 0.2
                });
            }
        }
        
        draw() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                
                // Update position
                p.x += p.vx;
                p.y += p.vy;
                
                // Boundary check
                if (p.x < 0 || p.x > this.width) p.vx *= -1;
                if (p.y < 0 || p.y > this.height) p.vy *= -1;
                
                // Draw particle
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
                this.ctx.fill();
                
                // Draw connections
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p2 = this.particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.maxDistance) {
                        const opacity = (1 - distance / this.maxDistance) * 0.3;
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                }
            }
        }
        
        animate() {
            this.draw();
            requestAnimationFrame(() => this.animate());
        }
    }
    
    new ParticleNetwork();
    
    // ========== CUSTOM CURSOR (Luxury Feel) ==========
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    });
    
    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .social-links a');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorFollower.style.borderColor = '#fff';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--gold-primary)';
        });
    });
    
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========== THEME TOGGLE (Dark/Light Mode) ==========
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark.matches) {
        setTheme('dark');
    } else {
        setTheme('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        setTheme(isLight ? 'dark' : 'light');
    });
    
    // ========== PARALLAX EFFECT ON HERO ==========
    const heroSection = document.querySelector('.hero-section');
    const blobWrapper = document.querySelector('.blob-wrapper');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        if (blobWrapper) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            blobWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    // ========== SMOOTH SCROLL FOR NAV LINKS ==========
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // ========== REVEAL ANIMATION ON SCROLL ==========
    const revealElements = document.querySelectorAll('.hero-content, .hero-image');
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
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
    
    // ========== MAGNETIC BUTTON EFFECT ==========
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) * 0.2;
            const moveY = (y - centerY) * 0.2;
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // ========== GLOW EFFECT ON BLOB IMAGE ==========
    const blobShape = document.querySelector('.blob-shape');
    if (blobShape) {
        setInterval(() => {
            blobShape.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.6)';
            setTimeout(() => {
                blobShape.style.boxShadow = 'var(--shadow-luxury)';
            }, 500);
        }, 3000);
    }
    
    // ========== LOADING ANIMATION COMPLETE ==========
    console.log('✨ Luxury Portfolio Loaded — Soniya D');
});
