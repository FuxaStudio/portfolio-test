// Pripadove studie: rolovaci nahledy webu (monitor a telefon) a prekryv pres celou obrazovku.
// Vychazi ze skriptu predlohy case-study-a.html. Nacita se na konci <body>.

// Rolovaci ramecky vzdy zacinaji nahore na webu (prohlizec jinak po obnoveni vraci posledni pozici)
(function () {
  var top = function () { document.querySelectorAll('.csa-scroll').forEach(function (el) { el.scrollTop = 0; }); };
  top();
  window.addEventListener('load', top);
  window.addEventListener('pageshow', top);
})();

// Rolovaci ramecky. Na PC: v klidu kolecko nechytaji a stranka se scrolluje dal. Kliknuti (nebo fokus
// z klavesnice) ramecek aktivuje a kolecko i sipky roluji web uvnitr. Deaktivuje ho odjeti mysi,
// kliknuti vedle, Esc nebo odchod fokusu. Pod 768 px se neroluji vubec, klepnuti otevre web pres
// celou obrazovku (predloha: lightbox studii ve web-portofilo/js/main.js, nativni <dialog>).
(function () {
  var frames = [].slice.call(document.querySelectorAll('.csa-scroll'));
  var dlg = document.querySelector('.csa-lb');
  var mobile = window.matchMedia('(max-width: 767.98px)');
  var hasDialog = dlg && typeof dlg.showModal === 'function';

  var setActive = function (el, on) {
    el.classList.toggle('is-active', on);
    el.parentElement.classList.toggle('is-active', on);
    // Lenis (plynuly scroll stranky) nechava kolecko nad aktivnim rameckem byt
    if (on) el.setAttribute('data-lenis-prevent', ''); else el.removeAttribute('data-lenis-prevent');
  };
  var deactivateAll = function (except) {
    frames.forEach(function (f) { if (f !== except) setActive(f, false); });
  };

  var openFull = function (which) {
    if (!hasDialog) return;
    // snimek muze byt slozeny z vic dilu pod sebou (WebP unese nejvys 16383 px na vysku), prenesou se vsechny
    var view = dlg.querySelector('.csa-lb__view');
    view.textContent = '';
    document.querySelectorAll('.csa-scroll[data-full="' + which + '"] img').forEach(function (src) {
      var img = document.createElement('img');
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      view.appendChild(img);
    });
    dlg.showModal();
    dlg.querySelector('.csa-lb__view').scrollTop = 0;
  };

  frames.forEach(function (el) {
    el.addEventListener('click', function () {
      if (mobile.matches) { openFull(el.dataset.full); return; }
      deactivateAll(el);
      setActive(el, true);
      el.focus({ preventScroll: true });
    });
    el.addEventListener('focus', function () {
      if (!mobile.matches) { deactivateAll(el); setActive(el, true); }
    });
    el.addEventListener('blur', function () { setActive(el, false); });
    el.parentElement.addEventListener('mouseleave', function () {
      if (el.classList.contains('is-active')) { setActive(el, false); el.blur(); }
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setActive(el, false);
      } else if (el.classList.contains('is-active') && !mobile.matches) {
        // sipky, PageUp/PageDown, Home/End a mezernik roluji web v ramecku (prohlizec to sam spolehlive nedela)
        var step = { ArrowDown: 48, ArrowUp: -48, PageDown: el.clientHeight * 0.9, PageUp: -el.clientHeight * 0.9, ' ': el.clientHeight * 0.9 }[e.key];
        if (e.key === 'Home') step = -el.scrollTop;
        if (e.key === 'End') step = el.scrollHeight;
        if (step !== undefined) { e.preventDefault(); el.scrollTop += step; }
      } else if ((e.key === 'Enter' || e.key === ' ') && !el.classList.contains('is-active')) {
        e.preventDefault();
        if (mobile.matches) openFull(el.dataset.full); else setActive(el, true);
      }
    });
  });
  // kliknuti vedle ramecky deaktivuje
  document.addEventListener('pointerdown', function (e) {
    if (!e.target.closest('.csa-scroll')) deactivateAll(null);
  });
  document.querySelectorAll('.csa-zoom').forEach(function (b) {
    b.addEventListener('click', function () { openFull(b.dataset.full); });
  });
  mobile.addEventListener('change', function () { deactivateAll(null); });

  if (hasDialog) dlg.querySelector('.csa-lb__close').addEventListener('click', function () { dlg.close(); });
})();

// Lightbox obrazku: kazdy <img data-lightbox="skupina"> se obali tlacitkem a otevre se pres celou obrazovku
// cely, bez orezu. Sipky prepinaji v ramci skupiny (stejna hodnota data-lightbox). Popisek bere z data-caption,
// jinak z <figcaption> nejblizsiho <figure>, jinak z alt. Volitelne data-full = vetsi soubor (jinak src).
// Obrazek vyssi nez 2x okno (a vic nez 2x vyssi nez siroky) se nezmensuje na vysku: ma sirku, jaka se vejde (nejvys prirozenou), a roluje se.
// Na PC (mys) kliknuti na obrazek priblizi 2x a pohybem mysi se posouva. Na dotyku klepnuti priblizi 2,5x od mista
// klepnuti a plocha se roluje prstem (overflow: auto); dalsi klepnuti oddali. Zoom stranky dvema prsty se neblokuje.
// Zavira tlacitko, Esc a kliknuti mimo obrazek; fokus se vrati na obrazek, ze ktereho se otevrel.
(function () {
  var imgs = [].slice.call(document.querySelectorAll('img[data-lightbox]'));
  if (!imgs.length) return;
  var mouse = window.matchMedia('(hover: hover) and (pointer: fine)');

  var caption = function (img) {
    if (img.dataset.caption) return img.dataset.caption;
    var fig = img.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    return cap ? cap.textContent.replace(/\s+/g, ' ').trim() : img.alt;
  };

  var caret = function (d) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
  };
  var dlg = document.createElement('dialog');
  dlg.className = 'csa-gl';
  dlg.setAttribute('role', 'dialog');
  dlg.setAttribute('aria-modal', 'true');
  // Jazyk stranky: texty lightboxu podle <html lang>
  var EN = document.documentElement.lang === 'en';
  var L = EN ? { dlg: 'Enlarged image', close: 'Close', prev: 'Previous image', next: 'Next image', tip: 'Tap to zoom', toast: 'Swipe to browse', zoom: 'Enlarge: ' }
             : { dlg: 'Zvětšený obrázek', close: 'Zavřít', prev: 'Předchozí obrázek', next: 'Další obrázek', tip: 'Klepnutím přiblížíte', toast: 'Posunujte prstem', zoom: 'Zvětšit: ' };
  dlg.setAttribute('aria-label', L.dlg);
  dlg.setAttribute('data-lenis-prevent', '');
  dlg.innerHTML =
    '<p class="mono csa-gl__count" aria-live="polite"></p>' +
    '<button type="button" class="csa-gl__close">' + L.close + '</button>' +
    '<div class="csa-gl__stage"><img class="csa-gl__img" alt="" /></div>' +
    '<p class="mono csa-gl__toast" aria-hidden="true">' + L.toast + '</p>' +
    '<div class="csa-gl__bar">' +
      '<button type="button" class="csa-gl__nav csa-gl__prev" aria-label="' + L.prev + '">' + caret('M15 5l-7 7 7 7') + '</button>' +
      '<p class="mono csa-gl__tip" hidden>' + L.tip + '</p>' +
      '<p class="mono csa-gl__cap"></p>' +
      '<button type="button" class="csa-gl__nav csa-gl__next" aria-label="' + L.next + '">' + caret('M9 5l7 7-7 7') + '</button>' +
    '</div>';
  document.body.appendChild(dlg);
  if (typeof dlg.showModal !== 'function') { dlg.remove(); return; }

  var big = dlg.querySelector('.csa-gl__img');
  var stage = dlg.querySelector('.csa-gl__stage');
  var count = dlg.querySelector('.csa-gl__count');
  var cap = dlg.querySelector('.csa-gl__cap');
  var btnClose = dlg.querySelector('.csa-gl__close');
  var btnPrev = dlg.querySelector('.csa-gl__prev');
  var btnNext = dlg.querySelector('.csa-gl__next');
  var tip = dlg.querySelector('.csa-gl__tip');
  var toast = dlg.querySelector('.csa-gl__toast');
  var group = [], idx = 0, opener = null, base = null, toastTimer = 0;
  var touchOpen = false, tipOn = false, TZ = 2.5, TIP_KEY = 'csa-gl-tip-seen';
  var store = function (k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (err) { return null; } };

  var unzoom = function () {
    dlg.classList.remove('is-zoomed', 'is-tzoom');
    big.style.transformOrigin = big.style.width = big.style.height = '';
    stage.scrollLeft = 0;
    if (!dlg.classList.contains('is-tall')) stage.scrollTop = 0;
    base = null;
    toast.classList.remove('is-on');
    clearTimeout(toastTimer);
  };
  var updTip = function () { tip.hidden = !(tipOn && !dlg.classList.contains('is-tall')); };
  // Dotykove priblizeni od mista klepnuti: bod pod prstem zustane pod prstem
  var tzoom = function (x, y) {
    var r = big.getBoundingClientRect(), s = stage.getBoundingClientRect();
    var fx = (x - r.left) / r.width, fy = (y - r.top) / r.height;
    var w = r.width * TZ, h = r.height * TZ;
    big.style.width = w + 'px';
    big.style.height = h + 'px';
    dlg.classList.add('is-tzoom');
    // mensi osa je diky margin auto na stredu, posun se pak jen orizne na rozsah rolovani
    stage.scrollLeft = fx * w - (x - s.left) - Math.max(0, (stage.clientWidth - w) / 2);
    stage.scrollTop = fy * h - (y - s.top) - Math.max(0, (stage.clientHeight - h) / 2);
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 2000);
    if (tipOn) { tipOn = false; updTip(); }
  };
  // Vysoky obrazek: rolovani uvnitr lightboxu misto zmenseni, bez zoomu
  var fresh = false;
  var tall = function () {
    // vysoky = vic nez 2x vyssi nez okno a zaroven vic nez 2x vyssi nez siroky (velke snimky na sirku sem nepatri)
    var on = big.naturalHeight > 2 * window.innerHeight && big.naturalHeight > 2 * big.naturalWidth;
    dlg.classList.toggle('is-tall', on);
    updTip();
    // novy obrazek zacina nahore
    if (fresh) { stage.scrollTop = 0; fresh = false; }
  };
  big.addEventListener('load', tall);
  var show = function (i) {
    unzoom();
    dlg.classList.remove('is-tall');
    fresh = true;
    idx = (i + group.length) % group.length;
    var it = group[idx];
    big.src = it.dataset.full || it.currentSrc || it.src;
    big.alt = it.alt;
    cap.textContent = caption(it);
    count.textContent = (idx + 1) + ' / ' + group.length;
    btnPrev.hidden = btnNext.hidden = group.length < 2;
    count.hidden = group.length < 2;
  };
  var open = function (img, trigger, byTouch) {
    group = imgs.filter(function (x) { return x.dataset.lightbox === img.dataset.lightbox; });
    opener = trigger;
    touchOpen = byTouch;
    // napoveda Klepnutim priblizite jen pri prvni navsteve lightboxu na dotyku
    tipOn = byTouch && !store(TIP_KEY);
    show(group.indexOf(img));
    dlg.classList.toggle('is-zoomable', mouse.matches);
    document.body.style.overflow = 'hidden';
    dlg.showModal();
    btnClose.focus();
  };
  var close = function () { if (dlg.open) dlg.close(); };

  // Esc zavre dialog nativne, uklid probehne tady
  dlg.addEventListener('close', function () {
    unzoom();
    if (tipOn || touchOpen) store(TIP_KEY, '1');
    tipOn = false;
    tip.hidden = true;
    document.body.style.overflow = '';
    big.removeAttribute('src');
    if (opener) opener.focus({ preventScroll: true });
  });

  imgs.forEach(function (img) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'csa-lbtn';
    btn.setAttribute('aria-label', L.zoom + caption(img));
    btn.setAttribute('aria-haspopup', 'dialog');
    img.parentNode.insertBefore(btn, img);
    btn.appendChild(img);
    btn.addEventListener('click', function (e) {
      var byTouch = e.pointerType ? (e.pointerType === 'touch' || e.pointerType === 'pen') : !mouse.matches && e.detail > 0;
      open(img, btn, byTouch);
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(idx - 1); });
  btnNext.addEventListener('click', function () { show(idx + 1); });

  // Klik mimo obrazek a ovladaci prvky zavira; klik na obrazek s mysi prepina zoom 2x
  dlg.addEventListener('click', function (e) {
    if (e.target === big) {
      // mys: 2x pres transform; dotyk: 2,5x s rolovanim; starsi prohlizece bez pointerType podle media query
      var byMouse = e.pointerType ? e.pointerType === 'mouse' : mouse.matches;
      if (dlg.classList.contains('is-tall')) return;
      if (dlg.classList.contains('is-tzoom') || dlg.classList.contains('is-zoomed')) { unzoom(); return; }
      if (!byMouse) { tzoom(e.clientX, e.clientY); return; }
      base = big.getBoundingClientRect();
      pan(e);
      dlg.classList.add('is-zoomed');
      return;
    }
    if (e.target.closest('button')) return;
    // pri dotykovem priblizeni klepnuti vedle obrazku jen oddali
    if (dlg.classList.contains('is-tzoom')) { unzoom(); return; }
    close();
  });
  // Bod pod kurzorem zustava pod kurzorem: transform-origin podle polohy mysi v nepriblizenem obrazku
  var pan = function (e) {
    if (!base) return;
    var x = Math.min(1, Math.max(0, (e.clientX - base.left) / base.width));
    var y = Math.min(1, Math.max(0, (e.clientY - base.top) / base.height));
    big.style.transformOrigin = (x * 100) + '% ' + (y * 100) + '%';
  };
  stage.addEventListener('mousemove', function (e) { if (dlg.classList.contains('is-zoomed')) pan(e); });
  // jen pri zmene sirky (na telefonu meni vysku i schovani adresniho radku, to priblizeni rusit nema)
  var lastW = window.innerWidth;
  window.addEventListener('resize', function () {
    if (dlg.open && window.innerWidth !== lastW) { unzoom(); tall(); }
    lastW = window.innerWidth;
  });

  // na dokumentu, ne na dialogu: po kliknuti do prazdna fokus spadne na body a klavesy musi fungovat dal
  document.addEventListener('keydown', function (e) {
    if (!dlg.open) return;
    if (e.key === 'ArrowLeft' && group.length > 1) { e.preventDefault(); show(idx - 1); }
    else if (e.key === 'ArrowRight' && group.length > 1) { e.preventDefault(); show(idx + 1); }
    else if (dlg.classList.contains('is-tall') && /^(ArrowDown|ArrowUp|PageDown|PageUp|Home|End| )$/.test(e.key) && !(e.key === ' ' && e.target.tagName === 'BUTTON')) {
      // vysoky obrazek se roluje i klavesnici, at je fokus kdekoli v lightboxu
      e.preventDefault();
      var page = stage.clientHeight * 0.9;
      var step = { ArrowDown: 48, ArrowUp: -48, PageDown: page, PageUp: -page, ' ': page }[e.key];
      if (e.key === 'Home') stage.scrollTop = 0; else if (e.key === 'End') stage.scrollTop = stage.scrollHeight; else stage.scrollTop += step;
    }
    else if (e.key === 'Tab') {
      // fokus koluje jen mezi tlacitky lightboxu
      var f = [btnClose, btnPrev, btnNext].filter(function (b) { return !b.hidden; });
      var i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
})();
