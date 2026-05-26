// js/script.js - COMPLETE FINAL VERSION (Guaranteed to fix burger menu)
(function() {
  'use strict';

  // --- Helper: Initialize Mobile Menu (ensures click works) ---
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) {
      console.warn('Menu elements missing');
      return;
    }

    // Remove existing listener by cloning
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
    const finalToggle = document.querySelector('.nav-toggle');

    finalToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navLinks.classList.toggle('active');
      const icon = finalToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        // Lock background scroll when menu open
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

    // Close menu on nav link click
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

    console.log('✅ Mobile menu ready');
  }

  // --- Force remove overflow and init menu (fallback) ---
  function forceFinish() {
    document.body.style.overflow = 'auto';
    const overlay = document.getElementById('animationOverlay');
    if (overlay && overlay.style.display !== 'none') {
      overlay.style.display = 'none';
    }
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
    }
    initMobileMenu();
    console.log('✅ Forced finish: menu activated');
  }

  // --- Animation & Initialization ---
  const overlay = document.getElementById('animationOverlay');
  const mainContent = document.getElementById('mainContent');
  const hasPlayed = sessionStorage.getItem('animationPlayed');

  if (hasPlayed) {
    // Already played: just ensure everything is visible and menu works
    if (overlay) overlay.style.display = 'none';
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
    }
    document.body.style.overflow = 'auto';
    initMobileMenu();
  } else if (overlay && document.getElementById('networkCanvas')) {
    // First visit: start animation, but ensure menu works after max 4 sec
    sessionStorage.setItem('animationPlayed', 'true');
    document.body.style.overflow = 'hidden'; // lock during animation

    // Safety timeout: force finish after 4 seconds (in case animation hangs)
    setTimeout(forceFinish, 4000);

    // Simplified canvas animation (mandala)
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let startTime = null;
    const duration = 3500; // 3.5 seconds

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

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.3 * eased;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212, 175, 55, ${0.3 + eased * 0.7})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw petals
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2 / 8) + progress * Math.PI;
        const x = centerX + Math.cos(angle) * maxRadius * 0.8;
        const y = centerY + Math.sin(angle) * maxRadius * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, 5 * eased, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 230, 176, ${0.5 * eased})`;
        ctx.fill();
      }

      // Update progress bar and text
      const progressBar = document.getElementById('animationProgressBar');
      if (progressBar) progressBar.style.width = (eased * 100) + '%';
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
        // Animation finished successfully
        if (overlay) {
          overlay.style.transition = 'opacity 0.8s';
          overlay.style.opacity = '0';
          setTimeout(() => {
            overlay.style.display = 'none';
            if (mainContent) {
              mainContent.classList.remove('hidden');
              mainContent.classList.add('visible');
            }
            document.body.style.overflow = 'auto';
            initMobileMenu();
          }, 800);
        } else {
          forceFinish();
        }
      }
    }

    requestAnimationFrame(animate);
  } else {
    // No animation elements: just show content
    if (overlay) overlay.style.display = 'none';
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
    }
    document.body.style.overflow = 'auto';
    initMobileMenu();
  }

  // --- Additional features (typing effect, scroll, etc.) ---
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

  const navBar = document.querySelector('.luxury-nav');
  if (navBar) {
    window.addEventListener('scroll', () => {
      navBar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
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

  console.log('✅ Ultimate script loaded – burger menu guaranteed');
})();
