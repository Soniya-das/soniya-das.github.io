// js/script.js - COMPLETE FULLY CORRECTED VERSION
// Ultra Luxury Portfolio - Mobile Menu Fixed + Animation Timeout

(function() {
  'use strict';

  // ========== ANIMATION SETUP ==========
  const ANIMATION_STYLE = 4;
  const hasAnimationPlayed = sessionStorage.getItem('animationPlayed');
  
  const overlay = document.getElementById('animationOverlay');
  const mainContent = document.getElementById('mainContent');
  const canvas = document.getElementById('networkCanvas');
  const messageEl = document.getElementById('animationMessage');
  const progressBar = document.getElementById('animationProgressBar');

  // ========== MOBILE MENU SETUP (TO BE CALLED AFTER ANIMATION) ==========
  function initMobileMenu() {
    const menuToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navBar = document.querySelector('.luxury-nav');
    
    if (!menuToggle || !navLinks) {
      console.warn('Mobile menu elements not found');
      return;
    }

    // Remove existing listeners to avoid duplicates
    const newToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newToggle, menuToggle);
    const finalToggle = document.querySelector('.nav-toggle');
    
    finalToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      navLinks.classList.toggle('active');
      
      const icon = finalToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // lock background scroll
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

    console.log('✅ Mobile menu initialized');
  }

  // ========== FORCE HIDE OVERLAY & INIT MENU (FALLBACK) ==========
  function forceFinishAnimation() {
    if (!overlay) return;
    console.warn('Safety timeout: forcing animation finish');
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
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

  // ========== ANIMATION HANDLING ==========
  if (hasAnimationPlayed) {
    // Animation already played before – just show content and init menu
    if (overlay) overlay.style.display = 'none';
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
    }
    document.body.style.overflow = 'auto';
    initMobileMenu();
  } 
  else if (canvas && overlay) {
    sessionStorage.setItem('animationPlayed', 'true');
    document.body.style.overflow = 'hidden'; // lock scroll during animation
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let centerX, centerY;
    let animationFrame;
    let startTime = null;
    let progress = 0;
    let frame = 0;
    let animationCompleted = false;
    const ANIMATION_DURATION = 5200;
    
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      centerX = width / 2;
      centerY = height / 2;
    }
    window.addEventListener('resize', resize);
    resize();
    
    // ========== SAFETY TIMEOUT (6 SECONDS) ==========
    setTimeout(() => {
      if (!animationCompleted) {
        forceFinishAnimation();
        animationCompleted = true;
        if (animationFrame) cancelAnimationFrame(animationFrame);
      }
    }, 6000);
    
    // ========== MANDALA ANIMATION (STYLE 4) ==========
    if (ANIMATION_STYLE === 4) {
      let mandalaLayers = [];
      let sacredSymbols = [];
      let energyOrbs = [];
      let currentLayerCount = 0;
      const TOTAL_LAYERS = 8;
      
      class MandalaLayer {
        constructor(index, radius, petalCount, delay) {
          this.index = index;
          this.radius = radius;
          this.petalCount = petalCount;
          this.delay = delay;
          this.currentRadius = 0;
          this.rotation = 0;
          this.isActive = false;
          this.activateTime = 0;
          this.opacity = 0;
        }
        activate(frameNum) {
          this.isActive = true;
          this.activateTime = frameNum;
        }
        update(frameProgress, frameNum) {
          if (!this.isActive) return;
          const adjustedProgress = Math.max(0, Math.min(1, (frameProgress - this.delay) / (1 - this.delay)));
          const easedProgress = 1 - Math.pow(1 - adjustedProgress, 1.5);
          this.currentRadius = this.radius * easedProgress;
          this.rotation = easedProgress * Math.PI * 2;
          this.opacity = easedProgress * 0.3;
        }
        draw(ctx) {
          if (!this.isActive || this.currentRadius <= 0) return;
          ctx.beginPath();
          ctx.arc(centerX, centerY, this.currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 175, 55, ${this.opacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          for (let i = 0; i < this.petalCount; i++) {
            const angle = (i * Math.PI * 2 / this.petalCount) + this.rotation;
            const x1 = centerX + Math.cos(angle - 0.3) * this.currentRadius * 0.7;
            const y1 = centerY + Math.sin(angle - 0.3) * this.currentRadius * 0.7;
            const x2 = centerX + Math.cos(angle) * this.currentRadius;
            const y2 = centerY + Math.sin(angle) * this.currentRadius;
            const x3 = centerX + Math.cos(angle + 0.3) * this.currentRadius * 0.7;
            const y3 = centerY + Math.sin(angle + 0.3) * this.currentRadius * 0.7;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.quadraticCurveTo(x2, y2, x3, y3);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity * 0.5})`;
            ctx.fill();
          }
          for (let i = 0; i < this.petalCount * 2; i++) {
            const angle = (i * Math.PI * 2 / (this.petalCount * 2)) + this.rotation;
            const x = centerX + Math.cos(angle) * this.currentRadius * 0.85;
            const y = centerY + Math.sin(angle) * this.currentRadius * 0.85;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 230, 176, ${this.opacity * 0.8})`;
            ctx.fill();
          }
        }
      }
      
      class SacredSymbol {
        constructor(angle, radius, type) {
          this.angle = angle;
          this.radius = radius;
          this.type = type;
          this.x = centerX;
          this.y = centerY;
          this.size = 0;
          this.targetSize = 4 + Math.random() * 3;
          this.isActive = false;
          this.activateTime = 0;
        }
        activate(frameNum) {
          this.isActive = true;
          this.activateTime = frameNum;
        }
        update(frameProgress, frameNum) {
          if (!this.isActive) return;
          const moveProgress = Math.min(1, (frameNum - this.activateTime) / 35);
          const easedMove = 1 - Math.pow(1 - moveProgress, 1.5);
          this.x = centerX + Math.cos(this.angle) * this.radius * easedMove;
          this.y = centerY + Math.sin(this.angle) * this.radius * easedMove;
          this.size = this.targetSize * easedMove;
        }
        draw(ctx) {
          if (!this.isActive || this.size <= 0) return;
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(Date.now() * 0.002);
          if (this.type === 'om') {
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, 0.6)`;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(-this.size * 0.5, -this.size);
            ctx.lineTo(0, -this.size * 1.2);
            ctx.lineTo(this.size * 0.5, -this.size);
            ctx.fill();
          } else if (this.type === 'star') {
            for (let i = 0; i < 5; i++) {
              const angle = (i * Math.PI * 2 / 5) - Math.PI / 2;
              const x1 = Math.cos(angle) * this.size;
              const y1 = Math.sin(angle) * this.size;
              const x2 = Math.cos(angle + Math.PI * 2 / 10) * this.size * 0.4;
              const y2 = Math.sin(angle + Math.PI * 2 / 10) * this.size * 0.4;
              if (i === 0) ctx.moveTo(x1, y1);
              else ctx.lineTo(x1, y1);
              ctx.lineTo(x2, y2);
            }
            ctx.closePath();
            ctx.fillStyle = `rgba(245, 230, 176, 0.7)`;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 245, 200, 0.9)`;
            ctx.fill();
          }
          ctx.restore();
        }
      }
      
      class EnergyOrb {
        constructor() {
          this.reset();
        }
        reset() {
          this.angle = Math.random() * Math.PI * 2;
          this.radius = 0;
          this.targetRadius = 50 + Math.random() * 250;
          this.size = 1 + Math.random() * 3;
          this.speed = 0.3 + Math.random() * 0.8;
          this.pulse = Math.random() * Math.PI * 2;
        }
        update(frameProgress) {
          this.radius = this.targetRadius * frameProgress;
          this.x = centerX + Math.cos(this.angle + frameProgress * Math.PI * this.speed) * this.radius;
          this.y = centerY + Math.sin(this.angle * 0.5 + frameProgress * Math.PI * this.speed) * this.radius * 0.8;
          this.pulse += 0.05;
        }
        draw(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
          gradient.addColorStop(0, `rgba(245, 230, 176, 0.6)`);
          gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
      
      function createMandala(frameProgress) {
        const targetLayers = Math.floor(TOTAL_LAYERS * frameProgress);
        for (let i = currentLayerCount; i < targetLayers && i < TOTAL_LAYERS; i++) {
          const radius = 40 + i * 28;
          const petalCount = 6 + i * 2;
          const delay = i * 0.07;
          const layer = new MandalaLayer(i, radius, petalCount, delay);
          mandalaLayers.push(layer);
          layer.activate(frame);
          currentLayerCount++;
        }
        if (frameProgress > 0.25 && sacredSymbols.length < 24) {
          const targetSymbols = Math.floor(20 * frameProgress);
          const symbols = ['om', 'star', 'dot'];
          while (sacredSymbols.length < targetSymbols) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 80 + Math.random() * 180;
            const type = symbols[Math.floor(Math.random() * symbols.length)];
            const symbol = new SacredSymbol(angle, radius, type);
            sacredSymbols.push(symbol);
            symbol.activate(frame);
          }
        }
        if (frameProgress > 0.4 && energyOrbs.length < 60) {
          const targetOrbs = Math.floor(50 * frameProgress);
          while (energyOrbs.length < targetOrbs) {
            energyOrbs.push(new EnergyOrb());
          }
        }
        energyOrbs.forEach(orb => orb.update(frameProgress));
        sacredSymbols.forEach(sym => sym.update(frameProgress, frame));
      }
      
      function drawCenterBindu() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
        gradient.addColorStop(0, `rgba(255, 245, 200, 1)`);
        gradient.addColorStop(0.5, `rgba(212, 175, 55, 0.6)`);
        gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#f5e6b0';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      function drawBackground() {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#0a0a1a');
        gradient.addColorStop(0.5, '#060810');
        gradient.addColorStop(1, '#030308');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        for (let i = 0; i < 360; i += 15) {
          const angle = i * Math.PI / 180;
          const x = centerX + Math.cos(angle) * 300;
          const y = centerY + Math.sin(angle) * 300;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(212, 175, 55, 0.02)`;
          ctx.stroke();
        }
      }
      
      const mandalaMessages = [
        { text: '🕉️ the sacred center awakens... 🕉️', start: 0 },
        { text: '🔷 mandala of wisdom unfolding... 🔷', start: 0.15 },
        { text: '💠 sacred geometry taking form... 💠', start: 0.3 },
        { text: '✨ divine patterns emerge... ✨', start: 0.45 },
        { text: '🔶 the circle of knowledge completes... 🔶', start: 0.6 },
        { text: '💎 harmony and balance achieved 💎', start: 0.75 },
        { text: '🚀 enter the sacred space 🚀', start: 0.88 }
      ];
      
      function updateMessage(frameProgress) {
        if (!messageEl) return;
        for (let i = mandalaMessages.length - 1; i >= 0; i--) {
          if (frameProgress >= mandalaMessages[i].start) {
            messageEl.textContent = mandalaMessages[i].text;
            break;
          }
        }
      }
      
      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        progress = Math.min(1, elapsed / ANIMATION_DURATION);
        const easedProgress = 1 - Math.pow(1 - progress, 1.7);
        
        drawBackground();
        drawCenterBindu();
        mandalaLayers.forEach(layer => layer.update(easedProgress, frame));
        mandalaLayers.forEach(layer => layer.draw(ctx));
        sacredSymbols.forEach(sym => sym.draw(ctx));
        energyOrbs.forEach(orb => orb.draw(ctx));
        createMandala(easedProgress);
        updateMessage(easedProgress);
        
        if (progressBar) progressBar.style.width = (easedProgress * 100) + '%';
        
        frame++;
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          // Animation completed successfully
          animationCompleted = true;
          cancelAnimationFrame(animationFrame);
          setTimeout(() => {
            overlay.style.transition = 'opacity 1.5s ease';
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            setTimeout(() => {
              overlay.style.display = 'none';
              if (mainContent) {
                mainContent.classList.remove('hidden');
                mainContent.classList.add('visible');
              }
              document.body.style.overflow = 'auto';
              initMobileMenu(); // ✅ Initialize menu after animation
            }, 1500);
          }, 500);
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    }
  }

  // ========== TYPING EFFECT ==========
  const typedElement = document.querySelector('.typed-role');
  if (typedElement) {
    const phrases = [
      'Python Full Stack Developer ✨',
      'Web Designer ✨',
      'Code with Passion 💎'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        typedElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2500);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      
      const speed = isDeleting ? 45 : 85;
      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }

  // ========== NAVBAR SCROLL EFFECT ==========
  const nav = document.querySelector('.luxury-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // ========== HERO IMAGE 3D TILT (DESKTOP ONLY) ==========
  const heroImageContainer = document.querySelector('.hero-image-container');
  // ✅ Declare isTouchDevice ONLY ONCE
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (heroImageContainer && !isTouchDevice && window.innerWidth > 850) {
    heroImageContainer.addEventListener('mousemove', (e) => {
      const rect = heroImageContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroImageContainer.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) scale(1.02)`;
    });
    heroImageContainer.addEventListener('mouseleave', () => {
      heroImageContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  // ========== SCROLL REVEAL ANIMATION ==========
  const revealElements = document.querySelectorAll(
    '.resume-block, .skill-item, .service-card, .project-card, .premium-card, .service-premium-card, .project-premium-card, .skill-premium-card'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 50);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ========== BUTTON HOVER EFFECTS ==========
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .premium-social-btn, .close-icon-right, .resume-box-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ========== TOUCH DEVICE OPTIMIZATIONS (REUSE isTouchDevice) ==========
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    buttons.forEach(btn => {
      btn.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-2px) scale(1.01)';
      });
      btn.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });
  }

  // ========== LAZY LOAD IMAGES ==========
  const images = document.querySelectorAll('img');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          imageObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  }

  // ========== PREVENT BROKEN LINKS ==========
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });

  // ========== RESPONSIVE WINDOW RESIZE ==========
  window.addEventListener('resize', function() {
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

  console.log('✅ ULTRA-LUXURY PORTFOLIO FULLY RESPONSIVE - BURGER MENU FIXED');
})();
