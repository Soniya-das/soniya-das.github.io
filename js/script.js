// ========== SIMPLEST WORKING BURGER MENU – FORCE OVERFLOW FIX ==========
(function() {
  'use strict';

  // Force hide overlay and fix overflow after 1 second (no matter what)
  setTimeout(function() {
    var overlay = document.getElementById('animationOverlay');
    if (overlay) {
      overlay.style.display = 'none';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';
    console.log('✅ Overlay hidden and overflow fixed');
  }, 1000);

  // Initialize burger menu when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    var navBar = document.querySelector('.luxury-nav');

    if (!toggle || !navLinks) {
      console.error('Menu elements missing');
      return;
    }

    // Direct click handler (no cloning, no complications)
    toggle.onclick = function(e) {
      e.preventDefault();
      navLinks.classList.toggle('active');
      var icon = toggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
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
        var icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
    var links = document.querySelectorAll('.nav-links a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        navLinks.classList.remove('active');
        var icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      });
    }

    console.log('✅ Burger menu ready');
  });

  // Keep your typing effect and scroll effect (optional, they will still work)
  var typedEl = document.querySelector('.typed-role');
  if (typedEl) {
    var phrases = ['Python Full Stack Developer ✨', 'Web Designer ✨', 'Code with Passion 💎'];
    var idx = 0, charIdx = 0, del = false;
    function type() {
      var cur = phrases[idx];
      if (del) typedEl.textContent = cur.substring(0, charIdx - 1), charIdx--;
      else typedEl.textContent = cur.substring(0, charIdx + 1), charIdx++;
      if (!del && charIdx === cur.length) { del = true; setTimeout(type, 2000); return; }
      if (del && charIdx === 0) { del = false; idx = (idx + 1) % phrases.length; }
      setTimeout(type, del ? 40 : 80);
    }
    type();
  }

  var nav = document.querySelector('.luxury-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
})();
