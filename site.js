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

  /* Shelf: six app icons, one big screen. Tabs with arrow keys; auto-advances until the visitor touches it. */
  document.querySelectorAll('.shelf').forEach(function (shelf) {
    var tabs = [].slice.call(shelf.querySelectorAll('[role="tab"]'));
    var panels = [].slice.call(shelf.querySelectorAll('[role="tabpanel"]'));
    if (!tabs.length) return;
    shelf.classList.add('js');
    var DWELL = 5500, timer = 0, idx = 0, stopped = false, shown = false;
    var auto = !still && 'IntersectionObserver' in window;
    shelf.style.setProperty('--dwell', DWELL + 'ms');
    function show(i, focus) {
      idx = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, k) {
        var on = k === idx;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        panels[k].hidden = !on;
        panels[k].classList.toggle('enter', on && shown);
      });
      shown = true;
      if (focus) tabs[idx].focus();
      var row = tabs[idx].parentNode;
      if (row.scrollWidth > row.clientWidth) row.scrollTo({ left: tabs[idx].offsetLeft - 16, behavior: still ? 'auto' : 'smooth' });
      if (auto && !stopped) schedule();
    }
    function schedule() {
      clearTimeout(timer);
      shelf.setAttribute('data-auto', 'on');
      timer = setTimeout(function () { show(idx + 1); }, DWELL);
    }
    var resumeT = 0;
    function stop() { clearTimeout(timer); shelf.removeAttribute('data-auto'); clearTimeout(resumeT); if (auto) resumeT = setTimeout(function () { stopped = false; schedule(); }, 12000); stopped = true; }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { stop(); show(k); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (e.key === 'Home') { e.preventDefault(); stop(); show(0, true); }
        else if (e.key === 'End') { e.preventDefault(); stop(); show(tabs.length - 1, true); }
        else if (d) { e.preventDefault(); stop(); show(idx + d, true); }
      });
    });
    shelf.addEventListener('pointerenter', function () { if (auto && !stopped) { clearTimeout(timer); shelf.removeAttribute('data-auto'); } });
    shelf.addEventListener('pointerleave', function () { if (auto && !stopped) schedule(); });
    if (auto) {
      new IntersectionObserver(function (es) {
        if (stopped) return;
        if (es[0].isIntersecting) schedule(); else { clearTimeout(timer); shelf.removeAttribute('data-auto'); }
      }, { threshold: 0.35 }).observe(shelf);
    }
  });

  /* Hero: one phone, proof callouts that change per reader. Headline, sub, callouts, button and tone all change. */
  (function () {
    var hero = document.getElementById('top');
    if (!hero) return;
    var COPY = {
      founder: { h1: 'Your idea,|live in both stores.', sub: 'I am a senior mobile engineer. I take an app from brief to App Store and Google Play, then keep it running.',
        chips: ['Live on both stores', '50,000+ downloads on one app', '3 apps in 3\u20134 months', 'I plan, build and release it'], cta: 'Start a project', href: 'mailto:arfathrozewale8@gmail.com?subject=New%20project' },
      hiring: { h1: 'Senior mobile engineer.|Owns it end to end.', sub: 'I build iPhone and Android apps and web stores, from the first brief to the App Store and Google Play.',
        chips: ['7 products shipped', 'Sole mobile engineer at Zonesso', 'Led a team of two on JIFFL', 'Open to relocating anywhere'], cta: 'Email me', href: 'mailto:arfathrozewale8@gmail.com' },
      eng: { h1: 'Senior mobile engineer.|Clean state. One checkout.', sub: 'Server state kept apart from app state, five payment methods behind one checkout, releases as one command.',
        chips: ['39% less code after a rebuild', 'Server state kept apart', '5 payment methods, 1 checkout', 'Releases are one command'], cta: 'See the teardown', href: '#teardown' }
    };
    var ORDER = ['hiring', 'founder', 'eng'];
    var tabs = [].slice.call(hero.querySelectorAll('.who-tab'));
    var pill = hero.querySelector('.who-pill');
    var h1l = document.getElementById('h1-line'), line = document.getElementById('who-line'), chips = document.getElementById('chips');
    var cta = document.getElementById('cta-primary'), ctaLabel = document.getElementById('cta-label');
    var current = 'hiring', userPicked = false, timer = 0;

    function setWords(el, text) { var k = 0; el.innerHTML = text.split('|').map(function (part) { return part.split(' ').map(function (w) { return '<span class="kw" style="--k:' + (k++) + '">' + w + '</span>'; }).join(' '); }).join('<br>'); }
    function plain(text) { return text.replace('|', ' '); }
    function place(t) { pill.style.setProperty('--l', (t.offsetLeft - 4) + 'px'); pill.style.setProperty('--w', t.offsetWidth + 'px'); }
    function writeChips(c) { [].forEach.call(chips.children, function (li, i) { li.querySelector('span').textContent = c.chips[i]; }); chips.classList.remove('swap'); }
    function apply(k, animate) {
      var c = COPY[k];
      document.documentElement.setAttribute('data-who', k);
      tabs.forEach(function (x) { var on = x.getAttribute('data-who') === k; x.setAttribute('aria-selected', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1; if (on) place(x); });
      ctaLabel.textContent = c.cta; cta.setAttribute('href', c.href);
      if (animate && !still) {
        setWords(h1l, c.h1); line.classList.add('swap'); chips.classList.add('swap');
        setTimeout(function () { line.textContent = c.sub; line.classList.remove('swap'); writeChips(c); }, 260);
      } else { h1l.innerHTML = c.h1.split('|').join('<br>'); line.textContent = c.sub; writeChips(c); }
    }
    function schedule() {
      clearTimeout(timer);
      if (userPicked || still) return;
      timer = setTimeout(function () { set(ORDER[(ORDER.indexOf(current) + 1) % ORDER.length], true); schedule(); }, 9000);
    }
    function set(k, animate) { if (k === current && animate) return; current = k; apply(k, animate); try { if (userPicked) localStorage.setItem('who', k); } catch (e) {} }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { userPicked = true; clearTimeout(timer); set(t.getAttribute('data-who'), true); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return; e.preventDefault();
        var n = tabs[(i + d + tabs.length) % tabs.length]; userPicked = true; clearTimeout(timer); set(n.getAttribute('data-who'), true); n.focus();
      });
    });
    var saved = null; try { saved = localStorage.getItem('who'); } catch (e) {}
    if (saved && COPY[saved]) { userPicked = true; current = saved; apply(saved, false); }
    else { apply(current, false); schedule(); }
    hero.addEventListener('pointerenter', function () { clearTimeout(timer); });
    hero.addEventListener('pointerleave', schedule);
    function sync() { var on = tabs.filter(function (x) { return x.getAttribute('aria-selected') === 'true'; })[0]; if (on) place(on); }
    addEventListener('resize', sync);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
  })();

  /* Web tiles: spotlight follows the cursor. */
  document.querySelectorAll('a.wt').forEach(function (t) {
    var f = t.querySelector('.wt-frame');
    if (!f) return;
    t.addEventListener('pointermove', function (e) {
      var r = f.getBoundingClientRect();
      f.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      f.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* Nav: mark the section in view. */
  if ('IntersectionObserver' in window) {
    var links = {};
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var a = links[e.target.id];
        if (!a) return;
        if (e.isIntersecting) { Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); }); a.setAttribute('aria-current', 'true'); }
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) sio.observe(s); });
  }

  /* Hero: the dot grid follows the cursor. Shelf: the two screens drift against each other. */
  (function () {
    if (still || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    var hero = document.getElementById('top');
    if (hero) {
      var hraf = 0, hx = 0, hy = 0;
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect(); hx = e.clientX - r.left; hy = e.clientY - r.top;
        if (!hraf) hraf = requestAnimationFrame(function () { hraf = 0; hero.style.setProperty('--hx', hx + 'px'); hero.style.setProperty('--hy', hy + 'px'); });
      }, { passive: true });
    }
    var shelf = document.querySelector('.shelf-panels');
    if (shelf) {
      shelf.addEventListener('pointermove', function (e) {
        var r = shelf.getBoundingClientRect();
        shelf.style.setProperty('--sx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      }, { passive: true });
      shelf.addEventListener('pointerleave', function () { shelf.style.setProperty('--sx', 0); });
    }
  })();

  /* Hero phone: cycles through every app by itself, card shows the app and links to its case study. */
  (function () {
    var col = document.querySelector('.pf-col'), now = document.getElementById('pf-now');
    if (!col || !now) return;
    var imgs = [].slice.call(col.querySelectorAll('.pf-img')), dots = [].slice.call(col.querySelectorAll('.pn-dot'));
    var name = document.getElementById('pn-name'), line = document.getElementById('pn-line'), ico = document.getElementById('pn-ico'), link = document.getElementById('pn-link');
    var DWELL = 5000, i = 0, timer = 0, hovering = false;
    col.style.setProperty('--pn-dwell', DWELL + 'ms');
    function show(n) {
      i = (n + imgs.length) % imgs.length;
      var d = now.getAttribute('data-app' + i).split('|');
      imgs.forEach(function (im, k) { im.classList.toggle('on', k === i); });
      dots.forEach(function (b, k) { b.classList.toggle('on', k === i); });
      name.textContent = d[0]; line.textContent = d[1]; link.setAttribute('href', d[2]); ico.setAttribute('src', '/assets/shots/' + d[3] + '.webp');
      link.setAttribute('aria-label', d[0] + ' case study');
    }
    function tick() { clearTimeout(timer); if (still || hovering) return; col.classList.add('auto'); timer = setTimeout(function () { show(i + 1); tick(); }, DWELL); }
    dots.forEach(function (b) { b.addEventListener('click', function () { show(parseInt(b.getAttribute('data-i'), 10)); col.classList.remove('auto'); void col.offsetWidth; tick(); }); });
    col.addEventListener('pointerenter', function () { hovering = true; clearTimeout(timer); col.classList.remove('auto'); });
    col.addEventListener('pointerleave', function () { hovering = false; tick(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { if (es[0].isIntersecting) tick(); else { clearTimeout(timer); col.classList.remove('auto'); } }, { threshold: 0.3 }).observe(col);
    else tick();
  })();
})();
