// =====================================================================
// VARIANTA G: VRSTVY (1. 11. 2026)
// Pohyb, který jde se scrollem, a přepínač referencí. Úvod, menu, oponu
// a vyjíždění nadpisů obstarává film.js, stejně jako ve variantě F.
//   [data-strip]  pás náhledů webů pod nadpisem jede do strany
//   .g-card       karty projektů se na PC skládají na sebe, předchozí se
//                 zmenší a ztmavne, web v rámu se posouvá
//   [data-pay]    časová osa Kdy co platíte se vyplňuje krok po kroku
//   [data-name]   velký nápis za fotkou v sekci O mně jede do strany
//   [data-tabs]   reference, jedna citace naráz, přepíná se tlačítky
// Nic se nepřipíná déle, než je karta vysoká, a stránka není delší.
// Bez JS a při omezeném pohybu je všechno vidět a nic se nehýbe.
// =====================================================================

(function () {
  'use strict';

  var root = document.documentElement;
  var all = function (s, el) { return [].slice.call((el || document).querySelectorAll(s)); };
  var clamp01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };

  // ---------- Reference: jedna citace naráz ----------
  // Funguje i při omezeném pohybu, jen bez prolnutí.
  all('[data-tabs]').forEach(function (box) {
    var tabs = all('[role="tab"]', box);
    var panels = all('.g-quote', box);
    var list = box.querySelector('[role="tablist"]');
    if (!tabs.length || tabs.length !== panels.length || !list) return;
    list.hidden = false;
    box.classList.add('g-tabs-on');
    panels.forEach(function (p, i) {
      p.setAttribute('role', 'tabpanel');
      p.setAttribute('aria-labelledby', tabs[i].id);
      p.tabIndex = 0;
    });
    var select = function (i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[k].classList.toggle('is-active', on);
        panels[k].setAttribute('aria-hidden', String(!on));
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (e.key === 'Home') { e.preventDefault(); select(0, true); }
        if (e.key === 'End') { e.preventDefault(); select(tabs.length - 1, true); }
        if (k) { e.preventDefault(); select((i + k + tabs.length) % tabs.length, true); }
      });
    });
    select(0);
  });

  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  if (mq && mq.matches) {
    root.classList.remove('g-move');
    return;
  }
  window.__gOK = true;
  if (!root.classList.contains('g-move')) return;

  var strip = document.querySelector('[data-strip]');
  var stripBox = strip ? strip.parentElement : null;
  var cards = all('.g-card');
  var pay = document.querySelector('[data-pay]');
  var paySteps = pay ? all('li', pay) : [];
  var name = document.querySelector('[data-name]');
  var nameBox = name ? name.parentElement : null;
  var stackMq = window.matchMedia('(min-width: 1024px) and (min-height: 700px)');

  // ---------- hodnoty, které dojíždějí za scrollem ----------
  var vals = [];
  var make = function (init, eps, apply) {
    var o = { cur: init, tgt: init, shown: null, eps: eps, apply: apply };
    vals.push(o);
    return o;
  };

  var stripVal = strip ? make(0, 0.1, function (v) { strip.style.setProperty('--sx', v.toFixed(1)); }) : null;
  var nameVal = name ? make(0, 0.01, function (v) { name.style.setProperty('--nx', v.toFixed(2)); }) : null;
  var payVal = pay ? make(0, 0.002, function (v) {
    pay.style.setProperty('--pp', v.toFixed(3));
    var n = paySteps.length;
    paySteps.forEach(function (li, i) {
      li.classList.toggle('is-lit', v >= (n > 1 ? i / (n - 1) : 0) * 0.97);
    });
  }) : null;

  var cardVals = cards.map(function (card) {
    var inner = card.querySelector('.g-card-in');
    var img = card.querySelector('.g-screen-img');
    var frame = card.querySelector('.g-screen');
    return {
      card: card,
      frame: frame,
      img: img,
      s: make(0, 0.001, function (t) {
        inner.style.setProperty('--s', (1 - 0.07 * t).toFixed(4));
        inner.style.setProperty('--dim', (0.55 * t).toFixed(3));
      }),
      shift: img ? make(0, 0.1, function (v) { img.style.setProperty('--shift', v.toFixed(1)); }) : null
    };
  });

  var vh = window.innerHeight;
  var vw = window.innerWidth;

  var targets = function () {
    vh = window.innerHeight;
    vw = document.documentElement.clientWidth;

    if (stripVal) {
      // na začátku stránky stojí pás na místě, rozjede se se scrollem
      var r = stripBox.getBoundingClientRect();
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var p = clamp01(y / Math.max(1, r.top + y + r.height));
      var max = Math.max(0, strip.scrollWidth - vw);
      stripVal.tgt = -max * p;
    }

    if (nameVal) {
      var rn = nameBox.getBoundingClientRect();
      var pn = clamp01((vh - rn.top) / (vh + rn.height));
      nameVal.tgt = 6 - 34 * pn;
    }

    if (payVal) {
      var rp = pay.getBoundingClientRect();
      payVal.tgt = clamp01((vh * 0.8 - rp.top) / (vh * 0.45));
    }

    var stacking = stackMq.matches;
    cardVals.forEach(function (c, i) {
      var rc = c.card.getBoundingClientRect();
      var next = cardVals[i + 1];
      var t = 0;
      if (stacking && next) {
        var stick = parseFloat(getComputedStyle(next.card).top) || 0;
        var rnx = next.card.getBoundingClientRect();
        t = clamp01((vh - rnx.top) / Math.max(1, vh - stick));
      }
      c.s.tgt = t;
      if (c.shift && c.frame) {
        var avail = Math.max(0, c.img.offsetHeight - c.frame.clientHeight);
        // web v rámu jede, když karta přijíždí, a dál, když ji přejíždí další
        var arrive = clamp01((vh - rc.top) / (vh * 0.9));
        var p2 = stacking ? 0.55 * arrive + 0.45 * t : clamp01((vh - rc.top) / (vh + rc.height));
        c.shift.tgt = Math.min(avail, avail * 0.75) * p2;
      }
    });
  };

  var apply = function (o) {
    if (o.shown === null || Math.abs(o.cur - o.shown) > o.eps) {
      o.apply(o.cur);
      o.shown = o.cur;
    }
  };

  var TAU = 110;
  var dirty = true;
  var running = false;
  var last = 0;

  var tick = function (now) {
    if (dirty) {
      dirty = false;
      targets();
    }
    var dt = last ? Math.min(64, now - last) : 16;
    last = now;
    var k = 1 - Math.exp(-dt / TAU);
    var moving = false;
    for (var i = 0; i < vals.length; i++) {
      var o = vals[i];
      var d = o.tgt - o.cur;
      if (Math.abs(d) > o.eps) {
        o.cur += d * k;
        moving = true;
      } else {
        o.cur = o.tgt;
      }
      apply(o);
    }
    if (moving || dirty) {
      requestAnimationFrame(tick);
    } else {
      running = false;
      last = 0;
    }
  };

  var kick = function () {
    dirty = true;
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  };

  targets();
  vals.forEach(function (o) {
    o.cur = o.tgt;
    apply(o);
  });

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick, { passive: true });
  window.addEventListener('load', kick);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(kick);

  var onMotionPref = function (e) {
    if (!e.matches) return;
    window.removeEventListener('scroll', kick);
    window.removeEventListener('resize', kick);
    root.classList.remove('g-move');
  };
  if (mq && mq.addEventListener) mq.addEventListener('change', onMotionPref);
  else if (mq && mq.addListener) mq.addListener(onMotionPref);
})();
