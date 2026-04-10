// js/script.js - 3 More Ultra-Luxury Professional Entry Animations

(function() {
  'use strict';

  // ========== ANIMATION SELECTOR ==========
  // Choose your animation style (4, 5, or 6)
  // 4 = MANDALA OF WISDOM & SACRED GEOMETRY
  // 5 = AURORA BOREALIS & LIGHT WAVES  
  // 6 = INFINITY LOOP & ETERNAL CONNECTION
  const ANIMATION_STYLE = 4;  // Change to 4, 5, or 6
  
  // ========== CHECK IF ANIMATION ALREADY PLAYED ==========
  const hasAnimationPlayed = sessionStorage.getItem('animationPlayed');
  
  const overlay = document.getElementById('animationOverlay');
  const mainContent = document.getElementById('mainContent');
  const canvas = document.getElementById('networkCanvas');
  const messageEl = document.getElementById('animationMessage');
  const progressBar = document.getElementById('animationProgressBar');
  
  if (hasAnimationPlayed) {
    if (overlay) overlay.style.display = 'none';
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
    }
  } 
  else if (canvas && overlay) {
    sessionStorage.setItem('animationPlayed', 'true');
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let centerX, centerY;
    let mouseX = null, mouseY = null;
    let animationFrame;
    let startTime = null;
    let progress = 0;
    let frame = 0;
    const ANIMATION_DURATION = 5200;
    
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
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
    
    // ============================================================
    // ANIMATION 4: MANDALA OF WISDOM & SACRED GEOMETRY
    // Intricate mandala unfolding with spiritual elegance
    // ============================================================
    if (ANIMATION_STYLE === 4) {
      let mandalaLayers = [];
      let sacredSymbols = [];
      let energyOrbs = [];
      let lotusPetals = [];
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
          
          // Draw outer circle
          ctx.beginPath();
          ctx.arc(centerX, centerY, this.currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 175, 55, ${this.opacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          
          // Draw petals around the circle
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
          
          // Decorative dots
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
            // Om/Aum symbol representation
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
            // Star symbol
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
            // Dot
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
        
        // Add sacred symbols
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
        
        // Add energy orbs
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
        // Center point (Bindu - the source)
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
        
        // Subtle background mandala grid
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
            }, 1500);
          }, 500);
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    // ============================================================
    // ANIMATION 5: AURORA BOREALIS & LIGHT WAVES
    // Flowing northern lights with dancing light particles
    // ============================================================
    else if (ANIMATION_STYLE === 5) {
      let auroraWaves = [];
      let lightParticles = [];
      let glowingOrbs = [];
      let currentWaveCount = 0;
      const TOTAL_WAVES = 7;
      
      class AuroraWave {
        constructor(index, offset, color) {
          this.index = index;
          this.offset = offset;
          this.color = color;
          this.isActive = false;
          this.activateTime = 0;
          this.intensity = 0;
          this.wavePoints = [];
        }
        
        activate(frameNum) {
          this.isActive = true;
          this.activateTime = frameNum;
        }
        
        update(frameProgress, frameNum) {
          if (!this.isActive) return;
          const moveProgress = Math.min(1, (frameNum - this.activateTime) / 40);
          this.intensity = moveProgress * 0.6;
          
          // Generate wave points
          this.wavePoints = [];
          for (let x = 0; x <= width + 100; x += 15) {
            const y = centerY + 
              Math.sin(x * 0.008 + Date.now() * 0.0015 + this.offset) * 80 +
              Math.cos(x * 0.012 + Date.now() * 0.001 + this.offset * 2) * 40;
            this.wavePoints.push({ x, y });
          }
        }
        
        draw(ctx) {
          if (!this.isActive || this.wavePoints.length === 0) return;
          
          ctx.beginPath();
          ctx.moveTo(this.wavePoints[0].x, this.wavePoints[0].y);
          for (let i = 1; i < this.wavePoints.length; i++) {
            const xc = (this.wavePoints[i].x + this.wavePoints[i - 1].x) / 2;
            const yc = (this.wavePoints[i].y + this.wavePoints[i - 1].y) / 2;
            ctx.quadraticCurveTo(this.wavePoints[i - 1].x, this.wavePoints[i - 1].y, xc, yc);
          }
          
          const gradient = ctx.createLinearGradient(0, centerY - 150, 0, centerY + 150);
          gradient.addColorStop(0, `rgba(100, 200, 255, ${this.intensity * 0.3})`);
          gradient.addColorStop(0.5, `rgba(212, 175, 55, ${this.intensity * 0.2})`);
          gradient.addColorStop(1, `rgba(255, 100, 200, ${this.intensity * 0.3})`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
      
      class LightParticle {
        constructor() {
          this.reset();
        }
        
        reset() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.size = 1 + Math.random() * 3;
          this.vx = (Math.random() - 0.5) * 1.5;
          this.vy = (Math.random() - 0.5) * 1;
          this.life = 0.5 + Math.random() * 0.5;
          this.color = `hsl(${40 + Math.random() * 40}, 80%, 60%)`;
        }
        
        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.life -= 0.008;
          
          if (this.life <= 0 || this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
            this.reset();
          }
        }
        
        draw(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
      
      class GlowingOrb {
        constructor() {
          this.angle = Math.random() * Math.PI * 2;
          this.radius = 0;
          this.targetRadius = 100 + Math.random() * 200;
          this.size = 2 + Math.random() * 5;
          this.speed = 0.2 + Math.random() * 0.5;
        }
        
        update(frameProgress) {
          this.radius = this.targetRadius * frameProgress;
          this.x = centerX + Math.cos(this.angle + frameProgress * Math.PI * 2 * this.speed) * this.radius;
          this.y = centerY + Math.sin(this.angle * 0.7 + frameProgress * Math.PI * 2 * this.speed) * this.radius * 0.6;
        }
        
        draw(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
          gradient.addColorStop(0, `rgba(255, 200, 100, 0.7)`);
          gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
      
      function createAurora(frameProgress) {
        const targetWaves = Math.floor(TOTAL_WAVES * frameProgress);
        
        for (let i = currentWaveCount; i < targetWaves && i < TOTAL_WAVES; i++) {
          const offset = i * Math.PI * 2 / TOTAL_WAVES;
          const wave = new AuroraWave(i, offset);
          auroraWaves.push(wave);
          wave.activate(frame);
          currentWaveCount++;
        }
        
        // Add light particles
        if (frameProgress > 0.2 && lightParticles.length < 150) {
          const targetParticles = Math.floor(120 * frameProgress);
          while (lightParticles.length < targetParticles) {
            lightParticles.push(new LightParticle());
          }
        }
        
        // Add glowing orbs
        if (frameProgress > 0.4 && glowingOrbs.length < 40) {
          const targetOrbs = Math.floor(30 * frameProgress);
          while (glowingOrbs.length < targetOrbs) {
            glowingOrbs.push(new GlowingOrb());
          }
        }
        
        lightParticles.forEach(p => p.update());
        glowingOrbs.forEach(orb => orb.update(frameProgress));
        auroraWaves.forEach(wave => wave.update(frameProgress, frame));
      }
      
      function drawCenterLight() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
        gradient.addColorStop(0, `rgba(255, 255, 200, 0.9)`);
        gradient.addColorStop(0.3, `rgba(212, 175, 55, 0.5)`);
        gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Rays of light
        for (let i = 0; i < 12; i++) {
          const angle = (i * Math.PI * 2 / 12) + Date.now() * 0.002;
          const x = centerX + Math.cos(angle) * 25;
          const y = centerY + Math.sin(angle) * 25;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(212, 175, 55, 0.2)`;
          ctx.stroke();
        }
      }
      
      function drawBackground() {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#05051a');
        gradient.addColorStop(0.3, '#0a0a25');
        gradient.addColorStop(0.7, '#150a20');
        gradient.addColorStop(1, '#0a0515');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Stars
        for (let i = 0; i < 200; i++) {
          const x = (i * 173) % width;
          const y = (i * 257) % height;
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + (i % 5) * 0.03})`;
          ctx.fill();
        }
      }
      
      const auroraMessages = [
        { text: '🌌 the northern lights awaken... 🌌', start: 0 },
        { text: '💫 waves of color dance across the sky... 💫', start: 0.15 },
        { text: '✨ light particles begin to glow... ✨', start: 0.3 },
        { text: '🌈 aurora borealis in full bloom... 🌈', start: 0.45 },
        { text: '💎 each wave brings new inspiration... 💎', start: 0.6 },
        { text: '🌟 a symphony of light and color 🌟', start: 0.75 },
        { text: '🚀 step into the light 🚀', start: 0.88 }
      ];
      
      function updateMessage(frameProgress) {
        if (!messageEl) return;
        for (let i = auroraMessages.length - 1; i >= 0; i--) {
          if (frameProgress >= auroraMessages[i].start) {
            messageEl.textContent = auroraMessages[i].text;
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
        drawCenterLight();
        
        auroraWaves.forEach(wave => wave.draw(ctx));
        glowingOrbs.forEach(orb => orb.draw(ctx));
        lightParticles.forEach(p => p.draw(ctx));
        
        createAurora(easedProgress);
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
            }, 1500);
          }, 500);
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    // ============================================================
    // ANIMATION 6: INFINITY LOOP & ETERNAL CONNECTION
    // Flowing infinity symbol with endless energy
    // ============================================================
    else if (ANIMATION_STYLE === 6) {
      let infinityNodes = [];
      let energyFlow = [];
      let eternalParticles = [];
      let flowSegments = [];
      let currentSegmentCount = 0;
      const TOTAL_SEGMENTS = 36;
      
      class InfinityNode {
        constructor(index, t, delay) {
          this.index = index;
          this.t = t;
          this.delay = delay;
          this.x = centerX;
          this.y = centerY;
          this.size = 0;
          this.targetSize = 2 + Math.random() * 3;
          this.isActive = false;
          this.activateTime = 0;
          this.glow = 0;
        }
        
        activate(frameNum) {
          this.isActive = true;
          this.activateTime = frameNum;
        }
        
        update(frameProgress, frameNum) {
          if (!this.isActive) return;
          const adjustedProgress = Math.max(0, Math.min(1, (frameProgress - this.delay) / (1 - this.delay)));
          const easedProgress = 1 - Math.pow(1 - adjustedProgress, 1.5);
          
          // Infinity formula: figure-8 shape
          const scale = 180 * easedProgress;
          const xOffset = Math.sin(this.t * Math.PI * 2) * scale;
          const yOffset = Math.sin(this.t * Math.PI * 4) * scale * 0.6;
          
          this.x = centerX + xOffset;
          this.y = centerY + yOffset;
          this.size = this.targetSize * easedProgress;
          this.glow = easedProgress;
        }
        
        draw(ctx) {
          if (!this.isActive || this.size <= 0) return;
          
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
          gradient.addColorStop(0, `rgba(245, 230, 176, 0.8)`);
          gradient.addColorStop(1, `rgba(212, 175, 55, 0.3)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
      
      class EnergyFlow {
        constructor(fromNode, toNode) {
          this.from = fromNode;
          this.to = toNode;
          this.isActive = false;
          this.activateTime = 0;
          this.progress = 0;
        }
        
        activate(frameNum) {
          this.isActive = true;
          this.activateTime = frameNum;
        }
        
        update(frameNum) {
          if (!this.isActive) return;
          this.progress = Math.min(1, (frameNum - this.activateTime) / 25);
        }
        
        draw(ctx) {
          if (!this.isActive || this.progress <= 0) return;
          
          ctx.beginPath();
          ctx.moveTo(this.from.x, this.from.y);
          
          // Bezier curve for smooth flow
          const midX = (this.from.x + this.to.x) / 2;
          const midY = (this.from.y + this.to.y) / 2;
          const offsetX = (this.to.y - this.from.y) * 0.15;
          const offsetY = (this.from.x - this.to.x) * 0.15;
          ctx.quadraticCurveTo(midX + offsetX, midY + offsetY, this.to.x, this.to.y);
          
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 * this.progress})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          
          // Flowing energy ball
          const flowPos = (Date.now() * 0.002) % 1;
          const t = flowPos;
          const x = this.from.x + (this.to.x - this.from.x) * t;
          const y = this.from.y + (this.to.y - this.from.y) * t;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 230, 176, 0.8)`;
          ctx.fill();
        }
      }
      
      class EternalParticle {
        constructor() {
          this.reset();
        }
        
        reset() {
          this.t = Math.random();
          this.speed = 0.002 + Math.random() * 0.003;
          this.size = 1 + Math.random() * 2;
          this.phase = Math.random() * Math.PI * 2;
        }
        
        update(frameProgress) {
          this.t += this.speed;
          if (this.t > 1) this.t -= 1;
          
          const scale = 180 * frameProgress;
          this.x = centerX + Math.sin(this.t * Math.PI * 2) * scale;
          this.y = centerY + Math.sin(this.t * Math.PI * 4) * scale * 0.6;
        }
        
        draw(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, 0.5)`;
          ctx.fill();
        }
      }
      
      function createInfinityLoop(frameProgress) {
        const targetSegments = Math.floor(TOTAL_SEGMENTS * frameProgress);
        
        for (let i = currentSegmentCount; i < targetSegments && i < TOTAL_SEGMENTS; i++) {
          const t = i / TOTAL_SEGMENTS;
          const delay = i * 0.02;
          const node = new InfinityNode(i, t, delay);
          infinityNodes.push(node);
          node.activate(frame);
          currentSegmentCount++;
        }
        
        // Create connections between consecutive nodes
        for (let i = 0; i < infinityNodes.length - 1; i++) {
          const alreadyConnected = energyFlow.some(f => 
            f.from.index === infinityNodes[i].index && f.to.index === infinityNodes[i + 1].index
          );
          if (!alreadyConnected && infinityNodes[i + 1].isActive) {
            const flow = new EnergyFlow(infinityNodes[i], infinityNodes[i + 1]);
            energyFlow.push(flow);
            flow.activate(frame);
          }
        }
        
        // Add eternal particles
        if (frameProgress > 0.3 && eternalParticles.length < 80) {
          const targetParticles = Math.floor(60 * frameProgress);
          while (eternalParticles.length < targetParticles) {
            eternalParticles.push(new EternalParticle());
          }
        }
        
        eternalParticles.forEach(p => p.update(frameProgress));
        infinityNodes.forEach(node => node.update(frameProgress, frame));
        energyFlow.forEach(flow => flow.update(frame));
      }
      
      function drawCenterInfinity() {
        // Small infinity symbol at center
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(0.5, 0.5);
        
        ctx.beginPath();
        for (let t = 0; t <= 1; t += 0.05) {
          const x = Math.sin(t * Math.PI * 2) * 25;
          const y = Math.sin(t * Math.PI * 4) * 15;
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(212, 175, 55, 0.6)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
      }
      
      function drawBackground() {
        const gradient = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 350);
        gradient.addColorStop(0, '#0a0a18');
        gradient.addColorStop(0.6, '#060610');
        gradient.addColorStop(1, '#020208');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Subtle grid
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.02)';
        ctx.lineWidth = 0.5;
        for (let i = -200; i <= 200; i += 40) {
          ctx.beginPath();
          ctx.moveTo(centerX + i, 0);
          ctx.lineTo(centerX + i, height);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, centerY + i);
          ctx.lineTo(width, centerY + i);
          ctx.stroke();
        }
      }
      
      const infinityMessages = [
        { text: '∞ the eternal loop begins... ∞', start: 0 },
        { text: '💫 energy flows in endless cycles... 💫', start: 0.15 },
        { text: '✨ nodes connecting across dimensions... ✨', start: 0.3 },
        { text: '🔄 the infinity symbol takes shape... 🔄', start: 0.45 },
        { text: '💎 perpetual motion of creativity... 💎', start: 0.6 },
        { text: '🌟 infinite possibilities await 🌟', start: 0.75 },
        { text: '🚀 enter the infinite journey 🚀', start: 0.88 }
      ];
      
      function updateMessage(frameProgress) {
        if (!messageEl) return;
        for (let i = infinityMessages.length - 1; i >= 0; i--) {
          if (frameProgress >= infinityMessages[i].start) {
            messageEl.textContent = infinityMessages[i].text;
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
        drawCenterInfinity();
        
        energyFlow.forEach(flow => flow.draw(ctx));
        infinityNodes.forEach(node => node.draw(ctx));
        eternalParticles.forEach(p => p.draw(ctx));
        
        createInfinityLoop(easedProgress);
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
            }, 1500);
          }, 500);
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    // ========== PREVENT SCROLL DURING ANIMATION ==========
    document.body.style.overflow = 'hidden';
  }
  
  // ========== REST OF YOUR EXISTING JS CODE ==========
  // (Typing effect, navbar, mobile menu, tilt effect, scroll reveal, button hover effects)
  
  // TYPING EFFECT
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
  
  // NAVBAR SCROLL EFFECT
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
  
  // MOBILE MENU
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
      if (nav && !nav.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }
  
  // HERO IMAGE 3D TILT EFFECT
  const heroImageContainer = document.querySelector('.hero-image-container');
  if (heroImageContainer) {
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
  
  // SCROLL REVEAL
  const revealElements = document.querySelectorAll(
    '.resume-block, .skill-item, .service-card, .project-card, .premium-card'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => observer.observe(el));
  
  // BUTTON HOVER EFFECTS
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .premium-social-btn, .close-icon-right');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  console.log(`✨ ULTRA-LUXURY ANIMATION STYLE ${ANIMATION_STYLE} ACTIVATED ✨`);
})();
