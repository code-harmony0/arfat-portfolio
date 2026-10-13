/* Count-ups, pointer depth (eased, only while visible), magnetic buttons, menu close, swipe-row access. Everything degrades to the static page. */
(function () {
  var root = document.documentElement;
  var still = root.classList.contains('static');

  /* Count-ups: play once when the number scrolls into view, always land on the real value. */
  if (!still && 'IntersectionObserver' in window && root.animate) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.__count.play();
        io.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.num b[style*="--n"]').forEach(function (b) {
      var end = parseInt(getComputedStyle(b).getPropertyValue('--n'), 10);
      if (!end) return;
      try {
        var a = b.animate([{ '--n': 0 }, { '--n': end }], { duration: 1500, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
        a.pause();
        b.__count = a;
        io.observe(b);
      } catch (err) { /* no registered-property animation: the final value stays */ }
    });
  }

  /* Inertial wheel scrolling: a mouse wheel scrolls in jumps (move, stop, move). Lenis eases every notch so each scene glides.
     Desktop pointers only, off for reduced motion; touch keeps native scrolling. */
  if (!still && window.Lenis && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    var lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    var loop = function (t) { lenis.raf(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#') return;
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -64, duration: 1.5 });
      history.replaceState(null, '', a.getAttribute('href'));
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* Menu sheet: closes on link choice, tells assistive tech it is open, and makes the page behind inert */
  var menu = document.getElementById('menu');
  var menuBtn = document.querySelector('.menu-btn');
  if (menu && menu.hidePopover) {
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) menu.hidePopover(); });
    menu.addEventListener('toggle', function (e) {
      var open = e.newState === 'open';
      if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
      [document.getElementById('main'), document.querySelector('.nav > .wrap'), document.querySelector('footer')].forEach(function (el) {
        if (el) { if (open) el.setAttribute('inert', ''); else el.removeAttribute('inert'); }
      });
      if (lenis) { if (open) lenis.stop(); else lenis.start(); }
    });
  }

  /* Swipe rows on phones: named and reachable from the keyboard. Desktop never scrolls them, so no tab stop there. */
  var rowSel = ['.zs-phone .screen', '.kor-deck', '.eco-fan', '.web-scene .b-view', '.route-list', '.proof .wrap'];
  var rowNames = { '.route-list': 'Process, five steps', '.proof .wrap': 'Apps live on the stores' };
  var phone = matchMedia('(max-width:700px)');
  var markRows = function () {
    rowSel.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (phone.matches) {
          el.setAttribute('tabindex', '0');
          if (rowNames[sel] && !el.hasAttribute('aria-label')) el.setAttribute('aria-label', rowNames[sel]);
          if (el.tagName !== 'OL' && !el.hasAttribute('role')) el.setAttribute('role', 'group');
        } else {
          el.removeAttribute('tabindex');
        }
      });
    });
  };
  markRows();
  if (phone.addEventListener) phone.addEventListener('change', markRows);

  if (still || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;

  /* Pointer depth: one eased value, applied only to phones currently on screen, loop stops when settled */
  var tilts = [].slice.call(document.querySelectorAll('[data-tilt]')).map(function (el) {
    return { el: el, amp: parseFloat(el.getAttribute('data-tilt')) || 6, on: false };
  });
  if (tilts.length && 'IntersectionObserver' in window) {
    var vis = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { tilts.forEach(function (t) { if (t.el === e.target) t.on = e.isIntersecting; }); });
    });
    tilts.forEach(function (t) { vis.observe(t.el); });
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    var tick = function () {
      cx += (tx - cx) * 0.09; cy += (ty - cy) * 0.09;
      tilts.forEach(function (t) {
        if (t.on) t.el.style.transform = 'rotateY(' + (cx * t.amp).toFixed(2) + 'deg) rotateX(' + (-cy * t.amp * 0.7).toFixed(2) + 'deg)';
      });
      raf = (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) ? requestAnimationFrame(tick) : 0;
    };
    addEventListener('pointermove', function (e) {
      tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
  }

  document.querySelectorAll('[data-magnet]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.22) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3) + 'px)';
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });

  /* Copy email: a mailto link does nothing for visitors with no mail app set up. */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var status = btn.parentNode.querySelector('[data-copy-status]');
    var label = btn.textContent;
    btn.addEventListener('click', function () {
      var done = function () {
        btn.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied';
        setTimeout(function () { btn.textContent = label; if (status) status.textContent = ''; }, 2000);
      };
      var text = btn.getAttribute('data-copy');
      var legacy = function () {
        var t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select();
        try { if (document.execCommand('copy')) done(); } catch (e) {}
        document.body.removeChild(t);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, legacy); else legacy();
    });
  });
})();
