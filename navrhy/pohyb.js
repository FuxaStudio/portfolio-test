// =====================================================================
// VARIANTA E: POHYB PŘI SCROLLOVÁNÍ (29. 10. 2026)
// Stránka se scrolluje normálně, nic se nezasekává a nic se nepřebírá.
// Pohyb je jen přepočet toho, kde v okně zrovna jste:
//   [data-screen]    celý web klienta se v rámu posouvá s vaším scrollem
//   [data-rise]      telefon jede o kus rychleji než monitor za ním
//   [data-ba-scroll] porovnání před a po se scrollem přetočí ze starého
//                    webu na nový, dokud na jezdec člověk nesáhne
// Při omezeném pohybu se nespustí nic a stránka vypadá jako varianta D.
// =====================================================================

(function () {
  'use strict';

  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  if (mq && mq.matches) return;

  var screens = [].slice.call(document.querySelectorAll('[data-screen]'));
  var phones = [].slice.call(document.querySelectorAll('[data-rise]'));
  var sliders = [].slice.call(document.querySelectorAll('[data-ba-scroll]'));
  if (!screens.length && !phones.length && !sliders.length) return;

  // Průběh se měří na nehybném rodiči (rám s monitorem a telefonem), ne na
  // prvku, který se sám posouvá. Jinak by pohyb ovlivňoval vlastní výpočet.
  var refOf = function (el) {
    return el.closest('.chapter-media, .show-media') || el;
  };

  var vh = window.innerHeight;
  var starts = new Map();

  // Co je vidět hned po načtení, začíná v klidu a rozjede se s prvním
  // scrollem. Ostatní začíná, když vjede do okna zdola.
  var measure = function () {
    vh = window.innerHeight;
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    screens.concat(phones).forEach(function (el) {
      var ref = refOf(el);
      starts.set(ref, Math.min(vh, ref.getBoundingClientRect().top + y));
    });
  };

  // 0 v klidu, 1 když rám ze čtvrtiny odjede za horní hranu okna
  var progressOf = function (ref, rect) {
    var start = starts.get(ref);
    var end = -rect.height * 0.25;
    var p = (start - rect.top) / (start - end);
    return { p: p < 0 ? 0 : p > 1 ? 1 : p, travel: start - end };
  };

  var smooth = function (t) {
    return t * t * (3 - 2 * t);
  };

  var ticking = false;

  var update = function () {
    ticking = false;
    var writes = [];
    var rects = new Map();
    var rectOf = function (ref) {
      if (!rects.has(ref)) rects.set(ref, ref.getBoundingClientRect());
      return rects.get(ref);
    };

    // Nejdřív všechno změřit, potom všechno zapsat, ať prohlížeč
    // nepřepočítává rozvržení po každém prvku zvlášť.
    phones.forEach(function (el) {
      var ref = refOf(el);
      var pr = progressOf(ref, rectOf(ref));
      writes.push([el, '--rise', (pr.p * el.offsetHeight * 0.2).toFixed(1)]);
    });

    screens.forEach(function (el) {
      var img = el.querySelector('.screen-img');
      if (!img) return;
      var ref = refOf(el);
      var pr = progressOf(ref, rectOf(ref));
      var rate = parseFloat(el.getAttribute('data-rate')) || 0.7;
      var avail = Math.max(0, img.offsetHeight - el.clientHeight);
      var shift = Math.min(avail, rate * pr.travel) * pr.p;
      writes.push([el, '--shift', shift.toFixed(1)]);
    });

    sliders.forEach(function (ba) {
      if (ba.dataset.touched === '1' || typeof ba.__setPos !== 'function') return;
      var frame = ba.querySelector('.ba-frame') || ba;
      var top = frame.getBoundingClientRect().top;
      // Přetáčí se mezi 85 % a 25 % výšky okna, tedy když je celé vidět
      var t = (vh * 0.85 - top) / (vh * 0.6);
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      writes.push([ba, null, 100 - 94 * smooth(t)]);
    });

    writes.forEach(function (w) {
      if (w[1]) w[0].style.setProperty(w[1], w[2]);
      else w[0].__setPos(w[2]);
    });
  };

  var onScroll = function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  var remeasure = function () {
    measure();
    onScroll();
  };

  measure();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', remeasure, { passive: true });
  window.addEventListener('load', remeasure);

  // Kdo si omezený pohyb zapne až za běhu, dostane stránku v klidu
  var onMotionPref = function (e) {
    if (!e.matches) return;
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', remeasure);
    screens.forEach(function (el) { el.style.removeProperty('--shift'); });
    phones.forEach(function (el) { el.style.removeProperty('--rise'); });
  };
  if (mq && mq.addEventListener) mq.addEventListener('change', onMotionPref);
  else if (mq && mq.addListener) mq.addListener(onMotionPref);
})();
