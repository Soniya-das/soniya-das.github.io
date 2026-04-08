// ============================================
// 1. INITIALIZE AOS (Scroll Animations)
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
// 2. THEME TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentThemeAttr = document.documentElement.getAttribute('data-theme');
        if (currentThemeAttr === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Update particle opacity if exists
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            canvas.style.opacity = document.documentElement.getAttribute('data-theme') === 'light' ? '0.15' : '0.4';
        }
    });
}

// ============================================
// 3. SCROLL PROGRESS BAR
// ============================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// ============================================
// 4. MOUSE GLOW EFFECT
// ============================================
const mouseGlow = document.createElement('div');
mouseGlow.className = 'mouse-glow';
document.body.appendChild(mouseGlow);

let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', function() {
    mouseGlow.style.opacity = '0';
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    mouseGlow.style.left = glowX + 'px';
    mouseGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();

// ============================================
// 5. NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
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
// 6. TYPED TEXT EFFECT FOR ABOUT PAGE
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
// 7. FLOATING SHAPES FOR INDEX PAGE
// ============================================
function createFloatingShapes() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && !document.querySelector('.floating-shape')) {
        for (let i = 0; i < 12; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            const size = Math.random() * 80 + 20;
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

// Add float animation keyframes dynamically (only if not exists)
if (!document.querySelector('#float-keyframes')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'float-keyframes';
    styleSheet.textContent = `
        @keyframes floatShape {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.05; }
            25% { transform: translateY(-30px) translateX(20px) rotate(90deg); opacity: 0.1; }
            50% { transform: translateY(20px) translateX(-20px) rotate(180deg); opacity: 0.08; }
            75% { transform: translateY(-20px) translateX(30px) rotate(270deg); opacity: 0.12; }
        }
    `;
    document.head.appendChild(styleSheet);
}
createFloatingShapes();

// ============================================
// 8. SKILL BOXES SCROLL ANIMATION
// ============================================
const skillBoxes = document.querySelectorAll('.skill-box');

if (skillBoxes.length > 0) {
    // Set initial state
    skillBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = 'all 0.6s ease';
    });
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    skillBoxes.forEach(box => skillObserver.observe(box));
}

// ============================================
// 9. PROJECT CARD HOVER EFFECT
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
// 10. SKILL PROGRESS BARS (for skills with progress bars)
// ============================================
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        if (bar.classList.contains('animated')) return;
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            bar.classList.add('animated');
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                bar.style.width = targetWidth + '%';
            }
        }
    });
}

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

// ============================================
// 11. SMOOTH SCROLL FOR NAVIGATION
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
// 12. CONTACT FORM HANDLER
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert mt-3';
        
        if (name && email && message) {
            alertDiv.classList.add('alert-success');
            alertDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i> Thank you for your message! I will get back to you soon.';
            contactForm.reset();
        } else {
            alertDiv.classList.add('alert-danger');
            alertDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> Please fill in all fields.';
        }
        
        contactForm.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 5000);
    });
}

// ============================================
// 13. ACTIVE NAV LINK HIGHLIGHTING
// ============================================
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0) return;
    
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
// 14. CREATE GLITTER STARS AROUND BLOB (for index page)
// ============================================
function createGlitterStars() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing star container if any
    const existingContainer = blobWrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    
    const size = blobWrapper.offsetWidth;
    const center = size / 2;
    const outerRadius = size * 0.55;
    const innerRadius = size * 0.42;
    
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    starContainer.style.position = 'absolute';
    starContainer.style.top = '0';
    starContainer.style.left = '0';
    starContainer.style.width = '100%';
    starContainer.style.height = '100%';
    starContainer.style.pointerEvents = 'none';
    starContainer.style.zIndex = '3';
    
    // Outer stars
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
    
    // Inner stars
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
    
    blobWrapper.appendChild(starContainer);
}

// Initialize stars after DOM loads
if (document.getElementById('blobWrapper')) {
    setTimeout(createGlitterStars, 100);
    
    // Recreate stars on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createGlitterStars, 200);
    });
}

// ============================================
// 15. 3D TILT FOR BLOB SHAPE (index page)
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
// 16. PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
    
    console.log('✨ Luxury Portfolio Loaded Successfully! ✨');
    console.log('🌓 Current Theme: ' + (document.documentElement.getAttribute('data-theme') || 'dark'));
});

// ============================================
// 17. SYSTEM PREFERENCE DETECTION FOR DARK MODE
// ============================================
if (!localStorage.getItem('theme')) {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode && themeToggle) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else if (!prefersDarkMode && themeToggle) {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}
