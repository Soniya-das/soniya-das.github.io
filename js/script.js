// ============================================
// 1. INITIALIZE AOS
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
        cursorChar: '|'
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
// 4. SCROLL PROGRESS BAR
// ============================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ============================================
// 5. SIMPLE PROFESSIONAL SHAPE (Luxury Blob)
// ============================================
const blob = document.getElementById('blobWrapper');
if (blob) {
    blob.style.clipPath = 'circle(50% at 50% 50%)';
    blob.style.background = 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 100%)';
    blob.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    blob.addEventListener('mousemove', e => {
        const rect = blob.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        blob.style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`;
        blob.style.boxShadow = '0 20px 50px rgba(212,175,55,0.3)';
    });
    blob.addEventListener('mouseleave', () => {
        blob.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        blob.style.boxShadow = '';
    });
}

// ============================================
// 6. OPTIONAL: Subtle Hero Glow Animation
// ============================================
setInterval(() => {
    if(blob) {
        blob.style.filter = `drop-shadow(0 0 ${Math.random()*8 + 8}px rgba(212,175,55,0.4))`;
    }
}, 2000);
