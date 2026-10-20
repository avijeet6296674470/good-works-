(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  /* ---- enquiry forms (hero, popup, contact page) ---- */
  document.querySelectorAll('form.lead').forEach(function (lf) {
    var msg = lf.querySelector('.lead-msg');
    var path = lf.querySelector('input[name=path]');
    if (path) path.value = location.pathname;
    lf.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (n) { var el = lf.querySelector('[name=' + n + ']'); return el ? el.value.trim() : ''; };
      var d = { name: g('name'), email: g('email'), phone: g('phone'), page: g('page'), path: g('path'), company: g('company') };
      msg.className = 'lead-msg';
      if (!d.name || !EMAIL.test(d.email) || d.phone.replace(/\D/g, '').length < 7) {
        msg.className = 'lead-msg err';
        msg.textContent = 'Please enter your name, a valid email and a phone number.';
        return;
      }
      var btn = lf.querySelector('button[type=submit]');
      btn.disabled = true;
      msg.textContent = 'Sending...';
      fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function () {
          lf.innerHTML = '<p class="lead-eyebrow">Received</p><h2 class="lead-title">Thank you</h2><p class="lead-done">I have your details and will reply by email.</p>';
        })
        .catch(function () {
          btn.disabled = false;
          msg.className = 'lead-msg err';
          msg.textContent = 'Could not send. Please email me directly.';
        });
    });
  });

  /* ---- Hire me popup ---- */
  var dlg = document.getElementById('leadDialog');
  if (dlg && typeof dlg.showModal === 'function') {
    document.querySelectorAll('[data-open-lead]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var m = document.querySelector('.m-menu');
        if (m) m.removeAttribute('open');
        if (!dlg.open) dlg.showModal();
        var first = dlg.querySelector('input[name=name]');
        if (first) first.focus();
      });
    });
    var x = dlg.querySelector('.dlg-close');
    if (x) x.addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  } else {
    document.querySelectorAll('[data-open-lead]').forEach(function (b) { b.setAttribute('href', '/contact/'); });
  }

  /* ---- header dropdowns ---- */
  var dds = document.querySelectorAll('.dd');
  var closeAll = function (except) {
    dds.forEach(function (d) {
      if (d !== except) { d.classList.remove('open'); d.querySelector('.dd-btn').setAttribute('aria-expanded', 'false'); }
    });
  };
  dds.forEach(function (d) {
    var btn = d.querySelector('.dd-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !d.classList.contains('open');
      closeAll(d);
      d.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () { closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  /* ---- mobile menu: close when a link is chosen ---- */
  document.querySelectorAll('.m-menu a').forEach(function (a) {
    a.addEventListener('click', function () { var m = document.querySelector('.m-menu'); if (m) m.removeAttribute('open'); });
  });

  /* ---- hero slideshow ---- */
  var s = document.querySelectorAll('.hero-slide');
  if (s.length > 1) {
    var cap = document.getElementById('heroCap'), dots = document.getElementById('heroDots'), i = 0;
    var ensure = function (n) {
      var e = s[n], u = e && e.getAttribute('data-src');
      if (u) {
        var ss = e.getAttribute('data-srcset');
        if (ss) { e.sizes = e.getAttribute('data-sizes') || '100vw'; e.srcset = ss; }
        e.src = u;
        e.removeAttribute('data-src');
      }
    };
    if (dots) for (var k = 0; k < s.length; k++) dots.appendChild(document.createElement('i'));
    var mark = function () {
      if (cap) cap.textContent = s[i].getAttribute('data-title');
      if (dots) for (var j = 0; j < dots.children.length; j++) dots.children[j].className = j === i ? 'on' : '';
    };
    var show = function (n) {
      s[i].classList.remove('on');
      i = (n + s.length) % s.length;
      ensure(i);
      s[i].classList.add('on');
      ensure((i + 1) % s.length);
      mark();
    };
    mark();
    setTimeout(function () { ensure(1); }, 1200);
    if (!reduce) setInterval(function () { show(i + 1); }, 4800);
  }

  /* ---- stat counters ---- */
  var els = document.querySelectorAll('[data-count]');
  var run = function (el) {
    var end = +el.getAttribute('data-count'), p = el.getAttribute('data-prefix') || '', x = el.getAttribute('data-suffix') || '', t0 = null;
    var f = function (ts) {
      if (!t0) t0 = ts;
      var k = Math.min((ts - t0) / 1200, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = p + Math.round(end * e) + x;
      if (k < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (q) {
        if (q.isIntersecting) { q.target.parentNode.classList.add('in'); if (!reduce) run(q.target); io.unobserve(q.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (e) { io.observe(e); });
  } else {
    els.forEach(function (e) { e.parentNode.classList.add('in'); });
  }

  /* ---- video walkthroughs ---- */
  var stage = document.getElementById('vidStage');
  if (!stage) return;
  var cur = stage.getAttribute('data-first'), loaded = false;
  var load = function (id, sound) {
    stage.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&mute=' + (sound ? 0 : 1) + '&playsinline=1&rel=0&modestbranding=1" title="Project walkthrough" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    loaded = true;
  };
  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting && !loaded) { load(cur, false); vo.disconnect(); }
    }, { threshold: 0.35 });
    vo.observe(stage);
  }
  stage.addEventListener('click', function (e) { if (!loaded && e.target.closest('.vid-poster')) load(cur, true); });
  var items = document.querySelectorAll('.vid-item'), det = document.querySelectorAll('.vid-detail');
  items.forEach(function (b) {
    b.addEventListener('click', function () {
      var n = +b.getAttribute('data-n');
      cur = b.getAttribute('data-vid');
      items.forEach(function (x) { x.classList.toggle('on', x === b); });
      det.forEach(function (d) { d.hidden = +d.getAttribute('data-n') !== n; });
      load(cur, true);
    });
  });
})();
