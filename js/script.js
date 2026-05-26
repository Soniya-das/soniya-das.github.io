// ========== SIMPLE & RELIABLE BURGER MENU – NO CLONING ==========
(function() {
  'use strict';

  // Global function to initialize menu (called after animation)
  window.initMobileMenu = function() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navBar = document.querySelector('.luxury-nav');

    if (!toggle || !navLinks) {
      console.warn('Menu elements not found, retrying...');
      setTimeout(window.initMobileMenu, 200);
      return;
    }

    // Remove any existing click handler to avoid duplicates
    toggle.onclick = null;

    // Direct click handler
    toggle.onclick = function(e) {
      e.preventDefault();
      navLinks.classList.toggle('active');
      const icon = toggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // lock scroll
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    };

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navBar && !navBar.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      }
    });

    // Close menu when any nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      });
    });

    console.log('✅ Burger menu ready (simple version)');
  };

  // Function to finish animation and show content
  function finishAndShow() {
    const overlay = document.getElementById('animationOverlay');
    const mainContent = document.getElementById('mainContent');
    if (overlay && overlay.style.display !== 'none') {
      overlay.style.transition = 'opacity 0.5s';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        if (mainContent) {
          mainContent.classList.remove('hidden');
          mainContent.classList.add('visible');
        }
        document.body.style.overflow = 'auto';
        window.initMobileMenu();
      }, 500);
    } else {
      if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');
      }
      document.body.style.overflow = 'auto';
      window.initMobileMenu();
    }
  }

  // Check if animation already played
  const hasPlayed = sessionStorage.getItem('animationPlayed');
  const overlay = document.getElementById('animationOverlay');
  const canvas = document.getElementById('networkCanvas');

  if (hasPlayed) {
    finishAndShow();
  } else if (overlay && canvas) {
    sessionStorage.setItem('animationPlayed', 'true');
    document.body.style.overflow = 'hidden';

    // Safety timeout (5 seconds)
    setTimeout(() => {
      if (overlay.style.display !== 'none') finishAndShow();
    }, 5000);

    // Simple canvas animation (works even if complex one fails)
    const ctx = canvas.getContext('2d');
    let width, height;
    let startTime = null;
    const duration = 4200;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    function drawBackground() {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#0a0a1a');
      grad.addColorStop(1, '#030308');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 1.6);
      drawBackground();
      const cx = width / 2, cy = height / 2;
      const r = Math.min(width, height) * 0.25 * eased;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212,175,55,${0.3 + eased * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      const progBar = document.getElementById('animationProgressBar');
      if (progBar) progBar.style.width = (eased * 100) + '%';
      const msg = document.getElementById('animationMessage');
      if (msg) {
        if (progress < 0.33) msg.textContent = '✦ awakening... ✦';
        else if (progress < 0.66) msg.textContent = '🌀 unfolding... 🌀';
        else if (progress < 0.95) msg.textContent = '✨ almost there... ✨';
        else msg.textContent = '🚀 enter 🚀';
      }
      if (progress < 1) requestAnimationFrame(animate);
      else finishAndShow();
    }
    requestAnimationFrame(animate);
  } else {
    finishAndShow();
  }

  // Typing effect (optional)
  const typed = document.querySelector('.typed-role');
  if (typed) {
    const phrases = ['Python Full Stack Developer ✨', 'Web Designer ✨', 'Code with Passion 💎'];
    let idx = 0, charIdx = 0, del = false;
    function type() {
      const cur = phrases[idx];
      if (del) typed.textContent = cur.substring(0, charIdx - 1), charIdx--;
      else typed.textContent = cur.substring(0, charIdx + 1), charIdx++;
      if (!del && charIdx === cur.length) { del = true; setTimeout(type, 2000); return; }
      if (del && charIdx === 0) { del = false; idx = (idx + 1) % phrases.length; }
      setTimeout(type, del ? 40 : 80);
    }
    type();
  }

  // Navbar scroll effect
  const nav = document.querySelector('.luxury-nav');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

  // Close menu on window resize (desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
      const links = document.querySelector('.nav-links');
      if (links && links.classList.contains('active')) {
        links.classList.remove('active');
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) {
          const icon = toggle.querySelector('i');
          if (icon) icon.classList.remove('fa-times'), icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      }
    }
  });
})();
