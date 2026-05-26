// js/script.js - SIMPLE & RELIABLE (Burger menu guaranteed to work)
(function() {
  'use strict';

  // ---------- Helper: Initialize Mobile Menu ----------
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    // Remove any existing click listener by cloning
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
    const finalToggle = document.querySelector('.nav-toggle');

    finalToggle.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.classList.toggle('active');
      const icon = finalToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const navBar = document.querySelector('.luxury-nav');
      if (navBar && !navBar.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = finalToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      }
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = finalToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      });
    });

    console.log('✅ Mobile menu initialized');
  }

  // ---------- Animation Handling ----------
  const overlay = document.getElementById('animationOverlay');
  const mainContent = document.getElementById('mainContent');
  const hasPlayed = sessionStorage.getItem('animationPlayed');

  if (hasPlayed) {
    // Already played: just show content and init menu
    if (overlay) overlay.style.display = 'none';
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
    }
    document.body.style.overflow = 'auto';
    initMobileMenu();
  } else if (overlay && document.getElementById('networkCanvas')) {
    // First visit: play animation then cleanup
    sessionStorage.setItem('animationPlayed', 'true');
    document.body.style.overflow = 'hidden';

    // Force finish after 5 seconds (safety)
    setTimeout(() => {
      if (overlay.style.display !== 'none') {
        console.warn('Forcing animation finish');
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
          if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
          }
          document.body.style.overflow = 'auto';
          initMobileMenu();
        }, 500);
      }
    }, 5000);

    // Actual canvas animation (quick version)
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let frame = 0;
    const duration = 4000; // 4 seconds
    let startTime = null;

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
      const eased = 1 - Math.pow(1 - progress, 1.5);

      drawBackground();

      // Draw simple mandala
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.3 * eased;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212, 175, 55, ${0.3 + eased * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2 / 8) + progress * Math.PI;
        const x = centerX + Math.cos(angle) * maxRadius * 0.8;
        const y = centerY + Math.sin(angle) * maxRadius * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, 4 * eased, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 230, 176, ${0.5 * eased})`;
        ctx.fill();
      }

      // Update progress bar
      const progressBar = document.getElementById('animationProgressBar');
      if (progressBar) progressBar.style.width = (eased * 100) + '%';

      // Update message
      const msgEl = document.getElementById('animationMessage');
      if (msgEl) {
        if (progress < 0.3) msgEl.textContent = '✦ curiosity awakens... ✦';
        else if (progress < 0.6) msgEl.textContent = '🌀 mandala unfolding... 🌀';
        else if (progress < 0.9) msgEl.textContent = '✨ wisdom taking form... ✨';
        else msgEl.textContent = '🚀 enter the space 🚀';
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation finished
        overlay.style.transition = 'opacity 1s';
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
          if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
          }
          document.body.style.overflow = 'auto';
          initMobileMenu();
        }, 1000);
      }
    }

    requestAnimationFrame(animate);
  } else {
    // No animation elements – just show content
    if (overlay) overlay.style.display = 'none';
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
    }
    document.body.style.overflow = 'auto';
    initMobileMenu();
  }

  // ---------- Typing effect (optional) ----------
  const typedEl = document.querySelector('.typed-role');
  if (typedEl) {
    const phrases = ['Python Full Stack Developer ✨', 'Web Designer ✨', 'Code with Passion 💎'];
    let idx = 0, charIdx = 0, deleting = false;
    function type() {
      const current = phrases[idx];
      if (deleting) {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }
      if (!deleting && charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
      if (deleting && charIdx === 0) {
        deleting = false;
        idx = (idx + 1) % phrases.length;
      }
      setTimeout(type, deleting ? 40 : 80);
    }
    type();
  }

  // ---------- Scroll effect for navbar ----------
  const nav = document.querySelector('.luxury-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---------- Close menu on window resize (desktop) ----------
  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
      const links = document.querySelector('.nav-links');
      if (links && links.classList.contains('active')) {
        links.classList.remove('active');
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) {
          const icon = toggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
        document.body.style.overflow = '';
      }
    }
  });

  console.log('✅ Simple reliable script loaded – burger menu ready');
})();
