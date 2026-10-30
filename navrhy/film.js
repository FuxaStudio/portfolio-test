// =====================================================================
// VARIANTA F: FILMOVÁ (30. 10. 2026)
// Všechno z varianty E a k tomu pohyb, jaký mají weby studií:
//   úvod      nadpis vyjede po slovech z masky, náhled Mattiny se otevře
//   [data-zoom]  náhled Mattiny se scrollem roztáhne až ke krajům okna
//   .rv       nadpisy vyjedou z masky, když vjedou do okna
//   .rv-fade  text pod nimi se dorovná s malým zpožděním
//   .chapter .screen--site  rámy projektů se při příjezdu otevřou
//   [data-words]  věta v sekci O mně se rozsvěcí slovo po slově
// Scroll zůstává normální, nic se nepřipíná a pohyb nepřidává scrollování
// navíc. Co jde se scrollem, jen o kousek dojíždí, ať to nepůsobí trhaně.
// Bez JS, při pomalém načtení i při omezeném pohybu je stránka v klidu.
// =====================================================================

(function () {
  'use strict';

  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  if (mq && mq.matches) {
    root.classList.remove('f-anim');
    return;
  }
  window.__filmOK = true;
  var anim = root.classList.contains('f-anim');

  var all = function (s) { return [].slice.call(document.querySelectorAll(s)); };
  var clamp01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var smooth = function (t) { return t * t * (3 - 2 * t); };

  var screens = all('[data-screen]');
  var phones = all('[data-rise]');
  var sliders = all('[data-ba-scroll]');
  var zoom = anim ? document.querySelector('[data-zoom]') : null;
  var frames = anim ? all('.chapter .screen--site') : [];
  var statements = anim ? all('[data-words]') : [];

  // ---------- hodnoty, které dojíždějí za scrollem ----------
  var vals = [];
  var make = function (init, eps, apply) {
    var o = { cur: init, tgt: init, shown: null, eps: eps, apply: apply };
    vals.push(o);
    return o;
  };

  var screenVals = screens.map(function (el) {
    return make(0, 0.05, function (v) { el.style.setProperty('--shift', v.toFixed(1)); });
  });
  var phoneVals = phones.map(function (el) {
    return make(0, 0.05, function (v) { el.style.setProperty('--rise', v.toFixed(1)); });
  });
  var sliderVals = sliders.map(function (ba) {
    return make(100, 0.05, function (v) {
      if (ba.dataset.touched !== '1' && typeof ba.__setPos === 'function') ba.__setPos(v);
    });
  });
  var frameVals = frames.map(function (el) {
    return make(8, 0.01, function (v) { el.style.setProperty('--ci', v.toFixed(2)); });
  });
  var wordGroups = statements.map(function (st) {
    var words = [].slice.call(st.querySelectorAll('.sw'));
    return {
      st: st,
      n: words.length,
      v: make(0, 0.005, function (lit) {
        for (var i = 0; i < words.length; i++) {
          words[i].style.opacity = (0.3 + 0.7 * clamp01(lit - i)).toFixed(3);
        }
      })
    };
  });

  var s0 = 1;
  var zoomVal = zoom ? make(0, 0.0005, function (p) {
    var e = smooth(p);
    var z = s0 + (1 - s0) * e;
    zoom.style.setProperty('--z', z.toFixed(4));
    // poloměr se přepočítává zpátky přes měřítko, vizuálně jde ze 14 px na 0
    zoom.style.setProperty('--zr', (14 * (1 - e) / z).toFixed(2));
  }) : null;

  // ---------- měření ----------
  var vh = window.innerHeight;
  var starts = new Map();
  // Průběh se měří na nehybném rodiči, ne na prvku, který se sám hýbe
  var refOf = function (el) {
    return el.closest('.chapter-media, .show-media') || el;
  };

  var measure = function () {
    vh = window.innerHeight;
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    screens.concat(phones).forEach(function (el) {
      var ref = refOf(el);
      starts.set(ref, Math.min(vh, ref.getBoundingClientRect().top + y));
    });
    if (zoom) {
      var body = document.querySelector('.show-body');
      var media = zoom.parentElement;
      var w = media ? media.getBoundingClientRect().width : 0;
      s0 = body && w ? body.getBoundingClientRect().width / w : 1;
      if (!(s0 > 0.5 && s0 <= 1)) s0 = 1;
    }
  };

  var progressOf = function (ref) {
    var rect = ref.getBoundingClientRect();
    var start = starts.get(ref);
    var end = -rect.height * 0.25;
    return { p: clamp01((start - rect.top) / (start - end)), travel: start - end };
  };

  var targets = function () {
    screens.forEach(function (el, i) {
      var img = el.querySelector('.screen-img');
      if (!img) return;
      var pr = progressOf(refOf(el));
      var rate = parseFloat(el.getAttribute('data-rate')) || 0.7;
      var avail = Math.max(0, img.offsetHeight - el.clientHeight);
      screenVals[i].tgt = Math.min(avail, rate * pr.travel) * pr.p;
    });
    phones.forEach(function (el, i) {
      phoneVals[i].tgt = progressOf(refOf(el)).p * el.offsetHeight * 0.2;
    });
    sliders.forEach(function (ba, i) {
      var frame = ba.querySelector('.ba-frame') || ba;
      var t = clamp01((vh * 0.85 - frame.getBoundingClientRect().top) / (vh * 0.6));
      sliderVals[i].tgt = 100 - 94 * smooth(t);
    });
    frames.forEach(function (el, i) {
      var t = clamp01((vh - el.getBoundingClientRect().top) / (vh * 0.55));
      frameVals[i].tgt = 8 * (1 - smooth(t));
    });
    wordGroups.forEach(function (g) {
      var r = g.st.getBoundingClientRect();
      var p = clamp01((vh * 0.88 - r.top) / (r.height + vh * 0.3));
      g.v.tgt = p * g.n * 1.1;
    });
    if (zoomVal) {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      zoomVal.tgt = clamp01(y / (vh * 0.5));
    }
  };

  var apply = function (o) {
    if (o.shown === null || Math.abs(o.cur - o.shown) > o.eps) {
      o.apply(o.cur);
      o.shown = o.cur;
    }
  };

  // ---------- smyčka ----------
  var TAU = 110; // ms, jak rychle pohyb dojede za scrollem
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

  // První stav bez dojíždění, ať se nic nehýbe hned po načtení
  measure();
  targets();
  vals.forEach(function (o) {
    o.cur = o.tgt;
    apply(o);
  });

  window.addEventListener('scroll', kick, { passive: true });
  var remeasure = function () {
    measure();
    kick();
  };
  window.addEventListener('resize', remeasure, { passive: true });
  window.addEventListener('load', remeasure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);

  // ---------- úvod a objevování ----------
  if (anim) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add('f-in');
        setTimeout(function () { root.classList.add('f-done'); }, 1900);
      });
    });

    var revealAll = function () {
      all('.rv, .rv-fade').forEach(function (el) { el.classList.add('is-in'); });
    };

    if ('IntersectionObserver' in window) {
      // Horní okraj sahá daleko nad okno. Co člověk přeskočí skokem na
      // kotvu, se tak ukáže hned a při návratu nahoru nečeká schované.
      var io = new IntersectionObserver(function (entries) {
        var batch = [];
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          if (e.boundingClientRect.bottom <= 0) {
            e.target.classList.add('is-in');
          } else {
            batch.push(e.target);
          }
        });
        // co vjede do okna naráz, jde v pořadí dokumentu s malým odstupem
        batch.sort(function (a, b) {
          return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        });
        batch.forEach(function (el, i) {
          if (el.classList.contains('rv-fade')) {
            el.style.setProperty('--d', (Math.min(i, 5) * 0.07).toFixed(2) + 's');
          }
          el.classList.add('is-in');
        });
      }, { rootMargin: '100000px 0px -6% 0px', threshold: 0 });
      all('.rv, .rv-fade').forEach(function (el) { io.observe(el); });
    } else {
      revealAll();
    }
  }

  // Kdo si omezený pohyb zapne za běhu, dostane stránku v klidu
  var onMotionPref = function (e) {
    if (!e.matches) return;
    window.removeEventListener('scroll', kick);
    window.removeEventListener('resize', remeasure);
    root.classList.remove('f-anim');
    screens.forEach(function (el) { el.style.removeProperty('--shift'); });
    phones.forEach(function (el) { el.style.removeProperty('--rise'); });
  };
  if (mq && mq.addEventListener) mq.addEventListener('change', onMotionPref);
  else if (mq && mq.addListener) mq.addListener(onMotionPref);
})();
