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
        strings: ['Python Fullstack Developer', 'Web Designer', 'Creative Coder', 'Problem Solver'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        cursorChar: '|',
        smartBackspace: true
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
        "Passionate about problem-solving",
        "Creating digital excellence"
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
// 4. DARK/LIGHT MODE TOGGLE (Unified with System Preference)
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme on page load
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.documentElement.removeAttribute('data-theme');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Add smooth animation to button
        themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
        setTimeout(() => { if (themeToggle) themeToggle.style.transform = ''; }, 300);
        
        if (document.documentElement.hasAttribute('data-theme')) {
            // Switch to Dark Mode
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            console.log('🌙 Dark Mode Activated');
            
            // Update particle opacity for dark mode
            updateParticleOpacity();
        } else {
            // Switch to Light Mode
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            console.log('☀️ Light Mode Activated');
            
            // Update particle opacity for light mode
            updateParticleOpacity();
        }
        
        // Refresh any theme-dependent elements
        refreshThemeDependentElements();
    });
}

// Function to update particle opacity based on theme
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

// Function to refresh theme-dependent elements
function refreshThemeDependentElements() {
    // Update scroll progress bar color
    const progressBarScroll = document.querySelector('.scroll-progress');
    if (progressBarScroll) {
        progressBarScroll.style.background = 'linear-gradient(90deg, #d4af37, #e4c96e)';
    }
    
    // Update mouse glow color
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
// 6. MOUSE-FOLLOW GLOW EFFECT (Luxury with Theme Support)
// ============================================
const glow = document.createElement('div');
glow.className = 'mouse-glow';
document.body.appendChild(glow);

// Set initial glow color based on theme
if (document.documentElement.hasAttribute('data-theme')) {
    glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)';
} else {
    glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)';
}

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
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
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
// 9. PARTICLE BACKGROUND (Canvas with Theme Support)
// ============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    
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
        animationId = requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    resizeCanvas();
    initParticles();
    animateParticles();
    
    // Set initial opacity based on theme
    updateParticleOpacity();
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
// 11. CONTACT FORM ENHANCEMENTS (Validation with Theme)
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
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
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
if (blobShape && blobImg && blobWrapper) {
    blobWrapper.addEventListener('mousemove', (e) => {
        const rect = blobWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Move image slightly opposite to cursor direction (3D depth)
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

// ============================================
// 14. SKILL PERCENTAGE COUNTER (Small Boxes)
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

// ============================================
// 15. CREATE GLITTER STARS AROUND PROFILE IMAGE
// ============================================
function createGlitterStars() {
    const wrapper = document.getElementById('blobWrapper');
    if (!wrapper) return;
    
    // Remove existing star container if any
    const existingContainer = wrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    
    const size = wrapper.offsetWidth;
    const center = size / 2;
    const outerRadius = size * 0.55;
    const innerRadius = size * 0.42;
    
    // Create stars container
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    starContainer.style.position = 'absolute';
    starContainer.style.top = '0';
    starContainer.style.left = '0';
    starContainer.style.width = '100%';
    starContainer.style.height = '100%';
    starContainer.style.pointerEvents = 'none';
    starContainer.style.zIndex = '3';
    
    // Outer stars (24 stars)
    for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const x = center + Math.cos(angle) * outerRadius;
        const y = center + Math.sin(angle) * outerRadius;
        
        const star = document.createElement('div');
        star.className = 'glit-star';
        star.style.position = 'absolute';
        star.style.width = '3px';
        star.style.height = '3px';
        star.style.background = 'radial-gradient(circle, #ffd700, #ffed8a)';
        star.style.borderRadius = '50%';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.15) + 's';
        starContainer.appendChild(star);
    }
    
    // Inner stars (16 smaller stars)
    for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + 0.5;
        const x = center + Math.cos(angle) * innerRadius;
        const y = center + Math.sin(angle) * innerRadius;
        
        const star = document.createElement('div');
        star.className = 'glit-star inner-star';
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = '#fff5cc';
        star.style.borderRadius = '50%';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.2) + 's';
        starContainer.appendChild(star);
    }
    
    wrapper.appendChild(starContainer);
}

// Initialize stars after DOM loads
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(createGlitterStars, 100);
});

// Recreate stars on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createGlitterStars, 200);
});

// ============================================
// 16. ACTIVE NAV LINK HIGHLIGHTING
// ============================================
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();

// ============================================
// 17. SYSTEM PREFERENCE DETECTION FOR DARK MODE
// ============================================
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!localStorage.getItem('theme') && prefersDarkMode) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    updateParticleOpacity();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.documentElement.removeAttribute('data-theme');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        updateParticleOpacity();
        refreshThemeDependentElements();
    }
});

// ============================================
// 18. NAVBAR SCROLL EFFECT
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
// 19. LOADING COMPLETE MESSAGE
// ============================================
console.log('✨ Professional Portfolio Loaded Successfully! ✨');
console.log('🌓 Current Theme: ' + (document.documentElement.hasAttribute('data-theme') ? 'Light' : 'Dark'));
