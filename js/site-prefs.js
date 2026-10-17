// ================================
// SOUHLAS S MERENIM + GA4 LOADER
// ================================
// Google Consent Mode v2. Vychozi stav je "denied" (nastaveno inline v <head>),
// knihovna gtag.js se stahuje az po udeleni souhlasu - kdo odmitne, nestahuje
// nic a nezaplati ani jeden request navic.
//
// POZOR NA NAZVY. Soubor se jmenuje site-prefs.js a vsechny tridy a id uvnitr
// pouzivaji prefix "pf-prefs". Blokovaci seznamy (Brave se zapnutymi stity,
// uBlock a spol.) maji pravidla na nazvy typu consent.js, .cookie-bar nebo
// #cookieBar a listu bez varovani schovaji - navstevnik pak nema jak souhlas
// udelit a tlacitko v paticce vypada rozbite. Zpatky neprejmenovavat.
// Samotne gtag.js z googletagmanager.com si takovy prohlizec zablokuje tak jako
// tak, to je v poradku - lista se ma zobrazit i tam, mereni proste nebude.

(function () {
  'use strict';

  var GA_ID = 'G-Q5Y0DPY62G';
  var STORAGE_KEY = 'pf_consent';
  var VERSION = 1;              // zvednuti verze = znovu se zeptame vsech
  var MAX_AGE_MS = 365 * 864e5; // souhlas plati rok

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  // ---- Ulozene rozhodnuti ----

  function readChoice() {
    try {
      var d = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!d || d.v !== VERSION || typeof d.analytics !== 'boolean') return null;
      if (Date.now() - d.ts > MAX_AGE_MS) return null;
      return d;
    } catch (e) {
      return null;
    }
  }

  function saveChoice(analytics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        v: VERSION, analytics: analytics, ts: Date.now()
      }));
    } catch (e) { /* privatni rezim - souhlas proste neprezije relaci */ }
  }

  // ---- Google Analytics ----

  var gaStarted = false;

  function startGA() {
    if (gaStarted) return;
    gaStarted = true;
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function applyConsent(analytics) {
    gtag('consent', 'update', { analytics_storage: analytics ? 'granted' : 'denied' });
    if (analytics) startGA();
  }

  // ---- Preklady ----

  function t(key, fallback) {
    if (window.i18n && typeof window.i18n.t === 'function') {
      var val = window.i18n.t(key);
      if (val !== key) return val;
    }
    return fallback;
  }

  // ---- Listicka ----

  var bar = null;

  function buildBar() {
    if (bar) return bar;

    bar = document.createElement('section');
    bar.className = 'pf-prefs';
    bar.id = 'pfPrefs';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-labelledby', 'pfPrefsTitle');
    bar.setAttribute('aria-describedby', 'pfPrefsText');

    bar.innerHTML =
      '<div class="pf-prefs-inner">' +
        '<p class="pf-prefs-label" id="pfPrefsTitle" data-i18n="cookie.label"></p>' +
        '<p class="pf-prefs-text" id="pfPrefsText" data-i18n="cookie.text"></p>' +
        '<div class="pf-prefs-actions">' +
          '<button type="button" class="pf-prefs-btn pf-prefs-accept" data-i18n="cookie.accept"></button>' +
          '<button type="button" class="pf-prefs-btn pf-prefs-reject" data-i18n="cookie.reject"></button>' +
        '</div>' +
        '<button type="button" class="pf-prefs-more" aria-expanded="false" aria-controls="pfPrefsDetail" data-i18n="cookie.more"></button>' +
        '<p class="pf-prefs-detail" id="pfPrefsDetail" hidden data-i18n="cookie.detail"></p>' +
        '<a class="pf-prefs-link" href="/ochrana-osobnich-udaju"></a>' +
      '</div>';

    // Zaloha pro pripad, ze by se translations.js nenacetl. Jazykova verze
    // stranky je vzdy jen jedna, prepinani za behu uz neexistuje.
    var strings = {
      'cookie.label':  'Cookies',
      'cookie.text':   'Používám Google Analytics, abych věděl, které stránky lidem dávají smysl. Nic víc. Reklamu neměřím a data nikam nedávám.',
      'cookie.accept': 'Souhlasím',
      'cookie.reject': 'Jen nezbytné',
      'cookie.more':   'Co se měří',
      'cookie.detail': 'Měřím anonymní statistiku návštěvnosti. Navštívené stránky, přibližnou lokalitu (město), typ zařízení a odkud jste přišli. Cookie _ga vyprší za 2 roky. Souhlas můžete kdykoli změnit odkazem v patičce.',
      'cookie.link':   'Ochrana osobních údajů',
      'cookie.linkHref': '/ochrana-osobnich-udaju'
    };
    bar.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.textContent = t(key, strings[key]);
      el.removeAttribute('data-i18n');
    });

    // Odkaz na ochranu osobnich udaju vede na verzi ve stejnem jazyce
    var link = bar.querySelector('.pf-prefs-link');
    link.textContent = t('cookie.link', strings['cookie.link']);
    link.setAttribute('href', t('cookie.linkHref', strings['cookie.linkHref']));

    var more = bar.querySelector('.pf-prefs-more');
    var detail = bar.querySelector('.pf-prefs-detail');
    more.addEventListener('click', function () {
      var open = more.getAttribute('aria-expanded') === 'true';
      more.setAttribute('aria-expanded', String(!open));
      detail.hidden = open;
    });

    bar.querySelector('.pf-prefs-accept').addEventListener('click', function () { decide(true); });
    bar.querySelector('.pf-prefs-reject').addEventListener('click', function () { decide(false); });

    document.body.appendChild(bar);
    return bar;
  }

  function showBar() {
    buildBar();
    // dvojity rAF - prvni ramec vlozi prvek, druhy spusti prechod
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bar.classList.add('is-visible'); });
    });
  }

  function hideBar() {
    if (!bar) return;
    bar.classList.remove('is-visible');
    var node = bar;
    setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 400);
    bar = null;
  }

  function decide(analytics) {
    saveChoice(analytics);
    applyConsent(analytics);
    hideBar();
  }

  // ---- Start ----

  var stored = readChoice();
  if (stored) {
    applyConsent(stored.analytics);
  } else {
    showBar();
  }

  // Odkaz v paticce - zmena rozhodnuti kdykoli pozdeji
  document.querySelectorAll('[data-prefs-open]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (bar) { hideBar(); return; }
      showBar();
    });
  });

  // Verejne API pro pripadne dalsi pouziti
  window.pfPrefs = {
    open: showBar,
    granted: function () {
      var c = readChoice();
      return !!(c && c.analytics);
    }
  };
})();
