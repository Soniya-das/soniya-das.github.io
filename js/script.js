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



// ============================================
// 14. LUXURY ROUND IMAGE WITH GLITTERING STARS
// ============================================

function createGlitterStars() {
    const blobWrapper = document.getElementById('blobWrapper');
    if (!blobWrapper) return;
    
    // Remove existing star container if any
    const existingContainer = blobWrapper.querySelector('.star-container');
    if (existingContainer) existingContainer.remove();
    
    // Remove existing rings if any
    const existingRings = blobWrapper.querySelectorAll('.star-ring, .golden-border-ring');
    existingRings.forEach(ring => ring.remove());
    
    // Create star container
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
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
    
    // Create stars around the circle
    const starCount = 24;
    const radius = 210; // Radius for star positions
    
    for (let i = 0; i < starCount; i++) {
        const angle = (i / starCount) * Math.PI * 2;
        const x = 190 + Math.cos(angle) * radius;
        const y = 190 + Math.sin(angle) * radius;
        
        const star = document.createElement('div');
        star.className = 'glit-star';
        // Make every 3rd star a sparkle
        if (i % 3 === 0) {
            star.classList.add('sparkle');
        }
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animationDelay = (i * 0.15) + 's';
        starContainer.appendChild(star);
    }
    
    // Create inner stars (closer to image)
    const innerStarCount = 16;
    const innerRadius = 175;
    for (let i = 0; i < innerStarCount; i++) {
        const angle = (i / innerStarCount) * Math.PI * 2 + 0.5;
        const x = 190 + Math.cos(angle) * innerRadius;
        const y = 190 + Math.sin(angle) * innerRadius;
        
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
    createFloatingParticles(blobWrapper);
}

function createFloatingParticles(container) {
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        const angle = Math.random() * Math.PI * 2;
        const distance = 140 + Math.random() * 80;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        particle.style.left = '190px';
        particle.style.top = '190px';
        particle.style.animationDelay = (i * 0.3) + 's';
        particle.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(particle);
    }
}

// Initialize glitter stars when page loads
document.addEventListener('DOMContentLoaded', function() {
    createGlitterStars();
    
    // Recreate stars on window resize (adjust positions)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            createGlitterStars();
        }, 300);
    });
});

// Also run after a short delay to ensure everything is loaded
setTimeout(createGlitterStars, 500);


