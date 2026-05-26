// js/script.js - ULTIMATE WORKING VERSION (Burger menu 100% fixed)
(function() {
  'use strict';

  // ========== MOBILE MENU SETUP ==========
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navBar = document.querySelector('.luxury-nav');
    
    if (!toggle || !navLinks) {
      console.warn('Menu elements not found – retrying in 0.5s');
      setTimeout(initMobileMenu, 500);
      return;
    }

    // Remove any existing listener by cloning
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
    const finalToggle = document.querySelector('.nav-toggle');

    // Burger click handler
    finalToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      navLinks.classList.toggle('active');
      
      const icon = finalToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // lock scroll when menu open
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
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

    console.log('✅ Mobile menu initialized – burger icon ready');
  }

  // ========== RESET OVERFLOW AND FINISH ANIMATION ==========
  function finishAnimationAndShowContent() {
    const overlay = document.getElementById('animationOverlay');
    const mainContent = document.getElementById('mainContent');
    
    if (overlay && overlay.style.display !== 'none') {
      overlay.style.transition = 'opacity 0.8s ease';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        if (mainContent) {
          mainContent.classList.remove('hidden');
          mainContent.classList.add('visible');
        }
        document.body.style.overflow = 'auto';  // ✅ FIX: remove hidden overflow
        initMobileMenu();                       // ✅ FIX: attach menu events
      }, 800);
    } else {
      if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');
      }
      document.body.style.overflow = 'auto';
      initMobileMenu();
    }
  }

  // ========== ANIMATION HANDLING ==========
  const overlay = document.getElementById('animationOverlay');
  const mainContent = document.getElementById('mainContent');
  const hasAnimationPlayed = sessionStorage.getItem('animationPlayed');

  // If animation already played, just show content
  if (hasAnimationPlayed) {
    finishAnimationAndShowContent();
  } 
  else if (overlay && document.getElementById('networkCanvas')) {
    // First visit – play animation
    sessionStorage.setItem('animationPlayed', 'true');
    document.body.style.overflow = 'hidden'; // lock during animation

    // Safety timeout: force finish after 5 seconds
    setTimeout(() => {
      if (overlay.style.display !== 'none') {
        console.warn('Animation safety timeout – forcing finish');
        finishAnimationAndShowContent();
      }
    }, 5000);

    // Canvas animation (simple mandala – guaranteed to finish)
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let startTime = null;
    const DURATION = 4200; // 4.2 seconds

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
      const progress = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - progress, 1.6);

      drawBackground();

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.28 * eased;

      // Outer ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212, 175, 55, ${0.3 + eased * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner petals
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2 / 12) + progress * Math.PI;
        const x = centerX + Math.cos(angle) * maxRadius * 0.65;
        const y = centerY + Math.sin(angle) * maxRadius * 0.65;
        ctx.beginPath();
        ctx.arc(x, y, 6 * eased, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 230, 176, ${0.4 * eased})`;
        ctx.fill();
      }

      // Center glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8 * eased, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${0.8 * eased})`;
      ctx.fill();

      // Update progress bar
      const progressBar = document.getElementById('animationProgressBar');
      if (progressBar) progressBar.style.width = (eased * 100) + '%';

      // Update message
      const msgEl = document.getElementById('animationMessage');
      if (msgEl) {
        if (progress < 0.33) msgEl.textContent = '✦ awakening curiosity... ✦';
        else if (progress < 0.66) msgEl.textContent = '🌀 sacred geometry unfolds... 🌀';
        else if (progress < 0.95) msgEl.textContent = '✨ wisdom taking form... ✨';
        else msgEl.textContent = '🚀 enter the space 🚀';
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation finished naturally
        finishAnimationAndShowContent();
      }
    }

    requestAnimationFrame(animate);
  } 
  else {
    // No animation elements – just show content
    finishAnimationAndShowContent();
  }

  // ========== TYPING EFFECT ==========
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

  // ========== NAVBAR SCROLL EFFECT ==========
  const nav = document.querySelector('.luxury-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ========== CLOSE MENU ON RESIZE (DESKTOP) ==========
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

  console.log('✅ COMPLETE WORKING SCRIPT LOADED – burger menu guaranteed');
})();
