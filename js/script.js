(function() {
  'use strict';

  // ------------------------------
  // 1. ANIMATION OVERLAY (only on index.html)
  // ------------------------------
  const overlay = document.getElementById('animationOverlay');
  const mainContent = document.getElementById('mainContent');
  const canvas = document.getElementById('networkCanvas');
  const messageEl = document.getElementById('animationMessage');
  const progressBar = document.getElementById('animationProgressBar');
  const hasAnimationPlayed = sessionStorage.getItem('animationPlayed');
  const ANIMATION_STYLE = 4;

  let mobileMenuReady = false;

  // ---------- NEW: Mobile menu using #hamburger ----------
  function finaliseMobileMenu() {
    if (mobileMenuReady) return;
    mobileMenuReady = true;

    // Select the hamburger button and nav-links
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) {
      console.warn('⚠️ Hamburger or nav-links not found in this page');
      return;
    }

    // Remove any existing click listener by cloning (clean start)
    const newHamburger = hamburger.cloneNode(true);
    if (hamburger.parentNode) {
      hamburger.parentNode.replaceChild(newHamburger, hamburger);
    }
    const finalHamburger = document.getElementById('hamburger');
    const finalNavLinks = document.querySelector('.nav-links');
    if (!finalHamburger || !finalNavLinks) return;

    // Toggle menu on hamburger click
    finalHamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      finalNavLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (finalNavLinks.classList.contains('active') &&
          !finalNavLinks.contains(e.target) &&
          !finalHamburger.contains(e.target)) {
        finalNavLinks.classList.remove('active');
      }
    });

    // Close menu when any nav link is clicked (smooth navigation)
    finalNavLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        finalNavLinks.classList.remove('active');
      });
    });

    console.log('✅ Mobile menu ready (hamburger ☰)');
  }

  // If no overlay (other pages), set up menu immediately
  if (!overlay || !mainContent) {
    finaliseMobileMenu();
  } else {
    // --- ANIMATION EXISTS (index.html) ---
    try {
      if (hasAnimationPlayed) {
        if (overlay) overlay.style.display = 'none';
        if (mainContent) {
          mainContent.classList.remove('hidden');
          mainContent.classList.add('visible');
        }
        document.body.style.overflow = 'auto';
        finaliseMobileMenu();
      } else if (canvas && overlay) {
        sessionStorage.setItem('animationPlayed', 'true');
        const ctx = canvas.getContext('2d');
        let width, height, centerX, centerY;
        let animationFrame;
        let startTime = null;
        let progress = 0;
        let frame = 0;
        const ANIMATION_DURATION = 5200;

        function resizeCanvas() {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
          centerX = width / 2;
          centerY = height / 2;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Mandala animation (your existing code)
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
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                  const ang = (i * Math.PI * 2 / 5) - Math.PI / 2;
                  const x1 = Math.cos(ang) * this.size;
                  const y1 = Math.sin(ang) * this.size;
                  const x2 = Math.cos(ang + Math.PI * 2 / 10) * this.size * 0.4;
                  const y2 = Math.sin(ang + Math.PI * 2 / 10) * this.size * 0.4;
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
              cancelAnimationFrame(animationFrame);
              setTimeout(() => {
                overlay.style.transition = 'opacity 1.5s ease';
                overlay.style.opacity = '0';
                setTimeout(() => {
                  overlay.style.display = 'none';
                  if (mainContent) {
                    mainContent.classList.remove('hidden');
                    mainContent.classList.add('visible');
                  }
                  document.body.style.overflow = 'auto';
                  finaliseMobileMenu();   // ✅ menu ready after animation
                }, 1500);
              }, 500);
            }
          }
          animationFrame = requestAnimationFrame(animate);
        }
        document.body.style.overflow = 'hidden';
      }
    } catch(e) {
      console.warn('Animation error – skipping to content', e);
      if (overlay) overlay.style.display = 'none';
      if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');
      }
      document.body.style.overflow = 'auto';
      finaliseMobileMenu();
    }
  }

  // ------------------------------
  // 2. TYPING EFFECT (unchanged)
  // ------------------------------
  const typedElement = document.querySelector('.typed-role');
  if (typedElement) {
    const phrases = [
      'Python Full Stack Developer ✨',
      'Web Designer ✨',
      'Code with Passion 💎'
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
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

  // ------------------------------
  // 3. NAVBAR SCROLL EFFECT
  // ------------------------------
  const nav = document.querySelector('.luxury-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  // ------------------------------
  // 4. HERO IMAGE 3D TILT (desktop only)
  // ------------------------------
  const heroImageContainer = document.querySelector('.hero-image-container');
  if (heroImageContainer) {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice && window.innerWidth > 850) {
      heroImageContainer.addEventListener('mousemove', function(e) {
        const rect = heroImageContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        heroImageContainer.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) scale(1.02)`;
      });
      heroImageContainer.addEventListener('mouseleave', function() {
        heroImageContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
      });
    }
  }

  // ------------------------------
  // 5. SCROLL REVEAL (cards)
  // ------------------------------
  const revealElements = document.querySelectorAll(
    '.skill-premium-card, .service-premium-card, .project-premium-card, .premium-card'
  );
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function() {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ------------------------------
  // 6. SKILL LEVEL BARS
  // ------------------------------
  const levelBars = document.querySelectorAll('.level-bar');
  const skillPercentages = {
    0: '92%', 1: '88%', 2: '86%', 3: '85%',
    4: '90%', 5: '88%', 6: '85%', 7: '84%',
    8: '90%', 9: '85%', 10: '85%'
  };
  levelBars.forEach((bar, index) => {
    bar.style.width = skillPercentages[index] || '85%';
  });

  console.log('✨ PORTFOLIO FULLY LOADED | Mobile menu works on all pages ✨');
})();
