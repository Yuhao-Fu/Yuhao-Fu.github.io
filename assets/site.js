/* ==========================================================================
   Yuhao Fu — personal page, progressive enhancement only.
   Everything here is an improvement: with JavaScript disabled the page is
   still fully readable, navigable and printable.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---- 1. Theme toggle ---------------------------------------------------
     The initial value is set by an inline script in <head> so that there is
     no flash of the wrong theme. This module only handles switching. */

  var toggle = document.querySelector('.theme-toggle');
  var toggleLabel = toggle && toggle.querySelector('.theme-toggle__label');

  function syncToggle() {
    if (!toggle) return;
    var isDark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label',
      isDark ? 'Switch to light theme' : 'Switch to dark theme');
    if (toggleLabel) toggleLabel.textContent = isDark ? 'Light' : 'Dark';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
      syncToggle();
    });
    syncToggle();
  }

  /* ---- 2. Scroll spy for the section index -------------------------------
     IntersectionObserver rather than a scroll handler: no layout reads on
     every frame, and it works correctly with anchor jumps. */

  var links = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));
  var sections = links
    .map(function (link) {
      return document.getElementById(link.getAttribute('data-spy'));
    })
    .filter(Boolean);

  function setCurrent(id) {
    links.forEach(function (link) {
      var match = link.getAttribute('data-spy') === id;
      if (match) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var visible = new Map();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
        else visible.delete(entry.target.id);
      });

      if (!visible.size) return;
      var topMost = null;
      var smallest = Infinity;
      visible.forEach(function (top, id) {
        var distance = Math.abs(top);
        if (distance < smallest) { smallest = distance; topMost = id; }
      });
      if (topMost) setCurrent(topMost);
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---- 3. Colophon year -------------------------------------------------- */

  var year = document.getElementById('colophon-rev');
  if (year) year.textContent = new Date().getFullYear();
})();
