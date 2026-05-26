(function() {
  'use strict';
  // Force hide overlay and show content immediately
  var ov = document.getElementById('animationOverlay');
  if (ov) ov.style.display = 'none';
  var main = document.getElementById('mainContent');
  if (main) {
    main.classList.remove('hidden');
    main.classList.add('visible');
  }
  document.body.style.overflow = 'auto';
  document.body.style.overflowX = 'hidden';

  // Burger menu setup
  function initMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;
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
    // Close on outside click
    document.addEventListener('click', function(e) {
      var nav = document.querySelector('.luxury-nav');
      if (nav && !nav.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        var icon = toggle.querySelector('i');
        if (icon) icon.classList.remove('fa-times'), icon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMenu);
  else initMenu();
})();
