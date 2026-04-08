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
// 2. TYPED.JS
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
});

// ============================================
// 5. CREATE GLITTER STARS
// ============================================
function createStars() {
    const wrapper = document.getElementById('blobWrapper');
    if (!wrapper) return;
    
    // Remove existing
    const existing = wrapper.querySelectorAll('.star-container, .star-ring');
    existing.forEach(el => el.remove());
    
    const size = wrapper.offsetWidth;
    const center = size / 2;
    const outerRadius = size * 0.55;
    const innerRadius = size * 0.4;
    
    // Rings
    const ring1 = document.createElement('div');
    ring1.className = 'star-ring';
    const ring2 = document.createElement('div');
    ring2.className = 'star-ring secondary';
    wrapper.appendChild(ring1);
    wrapper.appendChild(ring2);
    
    // Stars container
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    // Outer stars
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
    
    // Inner stars
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
    setTimeout(createStars, 100);
});

let starResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(starResizeTimeout);
    starResizeTimeout = setTimeout(createStars, 200);
});

// ============================================
// 6. 3D TILT EFFECT
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
        
        tiltWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    tiltWrapper.addEventListener('mouseleave', () => {
        tiltWrapper.style.transform = '';
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
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.3 + 0.1;
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
        for (let i = 0; i < 80; i++) particles.push(new Particle());
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
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

console.log('✨ Professional Portfolio Loaded! ✨');
