// ============================================
// 1. INITIALIZE AOS
// ============================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
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
// 3. DARK MODE / LIGHT MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme on page load
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    // Add animation to button
    themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
    setTimeout(() => { themeToggle.style.transform = ''; }, 300);
    
    // Check current theme and switch
    if (document.documentElement.hasAttribute('data-theme')) {
        // Switch to Dark Mode
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        console.log('🌙 Dark Mode Activated');
    } else {
        // Switch to Light Mode
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        console.log('☀️ Light Mode Activated');
    }
});

// ============================================
// 4. SCROLL PROGRESS BAR
// ============================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
    
    // Change progress bar color based on theme
    if (document.documentElement.hasAttribute('data-theme')) {
        progressBar.style.background = '#d4af37';
    } else {
        progressBar.style.background = '#d4af37';
    }
});

// ============================================
// 5. CREATE GLITTER STARS AROUND PROFILE IMAGE
// ============================================
function createGlitterStars() {
    const wrapper = document.getElementById('blobWrapper');
    if (!wrapper) return;
    
    // Remove existing elements
    const existingElements = wrapper.querySelectorAll('.star-container, .star-ring, .glow-dot');
    existingElements.forEach(el => el.remove());
    
    const size = wrapper.offsetWidth;
    const center = size / 2;
    const outerRadius = size * 0.55;
    const innerRadius = size * 0.42;
    
    // Create rotating rings
    const ring1 = document.createElement('div');
    ring1.className = 'star-ring';
    const ring2 = document.createElement('div');
    ring2.className = 'star-ring secondary';
    wrapper.appendChild(ring1);
    wrapper.appendChild(ring2);
    
    // Create stars container
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // Outer stars (24 stars)
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
    
    // Inner stars (16 smaller stars)
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
// 6. 3D TILT EFFECT FOR PROFILE IMAGE
// ============================================
const tiltWrapper = document.getElementById('blobWrapper');
const tiltImage = document.querySelector('#blobWrapper img');

if (tiltWrapper && tiltImage) {
    tiltWrapper.addEventListener('mousemove', (e) => {
        const rect = tiltWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        const moveX = (x - centerX) / 30;
        const moveY = (y - centerY) / 30;
        
        tiltWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        if (tiltImage) {
            tiltImage.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.02)`;
        }
    });
    
    tiltWrapper.addEventListener('mouseleave', () => {
        tiltWrapper.style.transform = '';
        if (tiltImage) {
            tiltImage.style.transform = '';
        }
    });
}

// ============================================
// 7. PARTICLE BACKGROUND ANIMATION
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
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.3 + 0.1;
        }
        
        update() {
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
        }
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
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
}

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
            const offset = 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 9. SKILLS PROGRESS BAR ANIMATION
// ============================================
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            bar.style.width = width;
        }
    });
}

// Trigger progress bars when skills section is visible
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
}

// ============================================
// 10. ADD ACTIVE CLASS TO CURRENT NAV LINK
// ============================================
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();

// ============================================
// 11. DARK MODE DETECTION FOR SYSTEM PREFERENCE
// ============================================
// Check if user prefers dark mode
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!localStorage.getItem('theme') && prefersDarkMode) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
});

console.log('✨ Professional Portfolio Loaded Successfully! ✨');
console.log('🌓 Dark Mode: ' + (document.documentElement.hasAttribute('data-theme') ? 'Light' : 'Dark'));
