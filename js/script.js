// ============================================
// 1. INITIALIZE AOS (Scroll Animations)
// ============================================
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ============================================
// 2. TYPED.JS FOR HERO ROLE
// ============================================
if (document.getElementById('typed-role')) {
    new Typed('#typed-role', {
        strings: ['Python Fullstack Developer', 'Web Designer', 'Creative Coder', 'Problem Solver', 'UI/UX Enthusiast'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        cursorChar: '|',
        smartBackspace: true,
        backDelay: 1500
    });
}

// ============================================
// 3. DARK/LIGHT MODE TOGGLE
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
            updateParticleOpacity();
        } else {
            // Switch to Light Mode
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            updateParticleOpacity();
        }
        
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
                const percentSpan = bar.closest('.skill-item')?.querySelector('.skill-percent');
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
// 5. SKILL PERCENTAGE COUNTER (Small Boxes)
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
                percentSpan.textContent = Math.floor(current) + '%';
            }, stepTime);
        }
    });
}

window.addEventListener('scroll', animateSkillPercentages);
window.addEventListener('load', animateSkillPercentages);

// ============================================
// 6. MOUSE GLOW EFFECT
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
// 7. SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + '%';
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
// 9. PARTICLE BACKGROUND
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
// 10. CREATE GLITTER STARS AROUND BLOB
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
// 11. ACTIVE NAV LINK HIGHLIGHTING
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
// 12. CONTACT FORM HANDLER
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success mt-3';
            alertDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i> Thank you for your message! I will get back to you soon.';
            contactForm.appendChild(alertDiv);
            
            // Reset form
            contactForm.reset();
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        } else {
            // Show error message
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-danger mt-3';
            alertDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> Please fill in all fields.';
            contactForm.appendChild(alertDiv);
            
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        }
    });
}

// ============================================
// 13. NAVBAR SCROLL EFFECT
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
// 14. 3D TILT FOR BLOB SHAPE
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

// ============================================
// 15. SYSTEM PREFERENCE DETECTION FOR DARK MODE
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
// 16. LOADING COMPLETE MESSAGE
// ============================================
console.log('✨ Luxury Portfolio Loaded Successfully! ✨');
console.log('🌓 Current Theme: ' + (document.documentElement.hasAttribute('data-theme') ? 'Light' : 'Dark'));





// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// Create scroll progress bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

// ============================================
// MOUSE GLOW EFFECT
// ============================================
const mouseGlow = document.createElement('div');
mouseGlow.className = 'mouse-glow';
document.body.appendChild(mouseGlow);

document.addEventListener('mousemove', function(e) {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
    mouseGlow.style.opacity = '1';
    
    setTimeout(() => {
        if (mouseGlow.style.opacity === '1') {
            setTimeout(() => {
                mouseGlow.style.opacity = '0';
            }, 100);
        }
    }, 50);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// TYPED TEXT EFFECT FOR ABOUT PAGE
// ============================================
const typedTextElement = document.getElementById('typed-text');
if (typedTextElement) {
    const phrases = [
        'Python Full-Stack Developer',
        'Django Expert',
        'UI/UX Enthusiast',
        'Problem Solver'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
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
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    typeEffect();
}

// ============================================
// FLOATING SHAPES FOR INDEX PAGE
// ============================================
function createFloatingShapes() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            const size = Math.random() * 100 + 20;
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.animation = `floatShape ${Math.random() * 10 + 10}s ease-in-out infinite`;
            shape.style.animationDelay = Math.random() * 5 + 's';
            heroSection.appendChild(shape);
        }
    }
}

// Add float animation keyframes dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes floatShape {
        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.05; }
        25% { transform: translateY(-30px) translateX(20px) rotate(90deg); opacity: 0.1; }
        50% { transform: translateY(20px) translateX(-20px) rotate(180deg); opacity: 0.08; }
        75% { transform: translateY(-20px) translateX(30px) rotate(270deg); opacity: 0.12; }
    }
`;
document.head.appendChild(styleSheet);
createFloatingShapes();

// ============================================
// SKILL BOXES SCROLL ANIMATION
// ============================================
const skillBoxes = document.querySelectorAll('.skill-box');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'all 0.6s ease';
    skillObserver.observe(box);
});

// ============================================
// PROJECT CARD HOVER EFFECT
// ============================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '' && href !== 'javascript:void(0)') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// INITIALIZE AOS
// ============================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
    
    // Add loading class removal
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
