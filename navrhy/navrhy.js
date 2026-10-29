// =====================================================================
// NÁVRHY HLAVNÍ STRÁNKY (19. 10. 2026)
// Mobilní menu a porovnání před a po. Formulář, kontaktní lištu,
// plynulý skok na kotvy a nezlomitelné mezery obstarává js/main.js.
// =====================================================================

(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Mobilní menu ----------
  var btn = document.querySelector('[data-menu-btn]');
  if (btn) {
    var menu = document.getElementById(btn.getAttribute('aria-controls'));
    var setMenu = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    };

    btn.addEventListener('click', function () {
      setMenu(btn.getAttribute('aria-expanded') !== 'true');
    });

    if (menu) {
      menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) setMenu(false);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        btn.focus();
      }
    });

    // Klepnutí mimo hlavičku menu zavře
    document.addEventListener('click', function (e) {
      if (btn.getAttribute('aria-expanded') !== 'true') return;
      if (!e.target.closest('.site-head')) setMenu(false);
    });

    var wide = window.matchMedia('(min-width: 1024px)');
    var onWide = function (e) { if (e.matches) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  // ---------- Porovnání před a po ----------
  // Rám má touch-action: pan-y, takže svislý tah prstem dál roluje
  // stránkou a jezdcem hýbe jen vodorovný tah. Myš táhne hned.
  document.querySelectorAll('[data-ba]').forEach(function (ba) {
    var frame = ba.querySelector('.ba-frame');
    var range = ba.querySelector('.ba-range');
    if (!frame || !range) return;

    var touched = false;

    // Na kraji jezdce by štítek ležel přes druhý web, proto se tam schová
    var setPos = function (p) {
      p = Math.max(0, Math.min(100, p));
      ba.style.setProperty('--pos', p + '%');
      range.value = String(Math.round(p));
      ba.classList.toggle('ba--new', p < 22);
      ba.classList.toggle('ba--old', p > 78);
    };

    // Varianta E posouvá jezdec scrollováním (navrhy/pohyb.js). Jakmile
    // na něj člověk sáhne, scroll ho už nepřebírá.
    var markTouched = function () {
      touched = true;
      ba.dataset.touched = '1';
    };
    ba.__setPos = setPos;

    var posFrom = function (e) {
      var r = frame.getBoundingClientRect();
      return ((e.clientX - r.left) / r.width) * 100;
    };

    var down = false;
    var decided = false;
    var horizontal = false;
    var sx = 0;
    var sy = 0;

    frame.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      down = true;
      markTouched();
      sx = e.clientX;
      sy = e.clientY;
      decided = e.pointerType === 'mouse';
      horizontal = decided;
      if (horizontal) {
        try { frame.setPointerCapture(e.pointerId); } catch (err) { /* nic */ }
        setPos(posFrom(e));
      }
    });

    frame.addEventListener('pointermove', function (e) {
      if (!down) return;
      if (!decided) {
        var dx = Math.abs(e.clientX - sx);
        var dy = Math.abs(e.clientY - sy);
        if (dx < 6 && dy < 6) return;
        decided = true;
        horizontal = dx > dy;
        if (horizontal) {
          try { frame.setPointerCapture(e.pointerId); } catch (err) { /* nic */ }
        }
      }
      if (horizontal) setPos(posFrom(e));
    });

    frame.addEventListener('pointerup', function (e) {
      // Klepnutí bez tahu přesune jezdec na místo klepnutí
      if (down && !decided) setPos(posFrom(e));
      down = false;
    });

    frame.addEventListener('pointercancel', function () {
      down = false;
    });

    range.addEventListener('input', function () {
      markTouched();
      setPos(Number(range.value));
    });

    // Jednou, když se porovnání poprvé ukáže, jezdec lehce cukne,
    // aby bylo vidět, že se s ním dá hýbat. Jen jednou a ne při
    // omezeném pohybu nebo když už na něj někdo sáhl.
    if (!reduceMotion && 'IntersectionObserver' in window && !ba.hasAttribute('data-ba-scroll')) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.disconnect();
          setTimeout(function () {
            if (touched) return;
            var start = null;
            var from = Number(range.value) || 50;
            var step = function (t) {
              if (touched) return;
              if (start === null) start = t;
              var k = Math.min(1, (t - start) / 1400);
              // tam a zpátky, měkce
              var s = Math.sin(k * Math.PI);
              setPos(from + 14 * s);
              if (k < 1) requestAnimationFrame(step);
              else setPos(from);
            };
            requestAnimationFrame(step);
          }, 450);
        });
      }, { threshold: 0.6 });
      io.observe(frame);
    }
  });
})();
