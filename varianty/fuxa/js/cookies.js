// ================================
// LISTA SE SOUHLASEM + GA4
// ================================
// Logika prevzata z web-portofilo/js/site-prefs.js:
// - volba se uklada do localStorage "pf_consent" a plati rok,
// - bez souhlasu se skript GA vubec nestahne,
// - se souhlasem se GA4 nacte s vypnutym reklamnim ulozistem (Consent Mode v2).
// GA se smi nacist JEN na fuxastudio.cz a www.fuxastudio.cz. Lokalne a na github.io
// se lista ukaze a volba se ulozi, ale GA se nespusti ani po souhlasu.
// Tlacitko [data-cookie-settings] v paticce listu znovu otevre.

(function () {
  'use strict';

  var GA_ID = 'G-Q5Y0DPY62G';
  var STORAGE_KEY = 'pf_consent';
  var VERSION = 1;              // zvednuti verze = znovu se zeptame vsech
  var MAX_AGE_MS = 365 * 864e5; // volba plati rok
  var GA_HOSTS = ['fuxastudio.cz', 'www.fuxastudio.cz'];
  var gaAllowed = GA_HOSTS.indexOf(location.hostname) !== -1;

  var NB = ' ';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  // ---- Ulozena volba ----

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: VERSION, analytics: analytics, ts: Date.now() }));
    } catch (e) { /* privatni rezim: volba proste neprezije relaci */ }
  }

  // ---- Google Analytics ----

  var gaStarted = false;

  function startGA() {
    if (gaStarted || !gaAllowed) return;
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

  // ---- Lista ----

  var bar = null;
  var opener = null;

  // Vlastni tlacitko listy (.cbar__btn), bez trid .btn, aby se do nej nepromital hover tlacitek webu
  function btn(choice, label) {
    return '<button type="button" class="cbar__btn" data-choice="' + choice + '"><span>' + label + '</span></button>';
  }

  // Jazyk stranky: lista cesky nebo anglicky podle <html lang>. Volba (pf_consent) je pro oba jazyky stejna.
  var L = document.documentElement.lang === 'en' ? {
    title: 'Website analytics',
    text: 'I\'d like to know how many people visit the website and what interests them. For that I use Google Analytics, which only runs with your consent.',
    more: 'More about cookies', yes: 'Accept', no: 'Essential only'
  } : {
    title: 'Měření návštěvnosti',
    text: 'Rád bych věděl, kolik lidí web navštíví a' + NB + 'co je zajímá. K' + NB + 'tomu používám Google Analytics, které se spustí jen s' + NB + 'vaším souhlasem.',
    more: 'Víc o' + NB + 'cookies', yes: 'Souhlasím', no: 'Jen nezbytné'
  };

  function buildBar() {
    bar = document.createElement('section');
    bar.className = 'cbar';
    bar.id = 'cbar';
    bar.hidden = true;
    bar.setAttribute('aria-labelledby', 'cbarTitle');
    bar.innerHTML =
      '<h2 class="cbar__title" id="cbarTitle" tabindex="-1">' + L.title + '</h2>' +
      '<p class="cbar__text">' + L.text + ' ' +
        '<a class="cbar__link" href="cookies.html">' + L.more + '</a></p>' +
      '<div class="cbar__btns">' +
        btn('yes', L.yes) +
        btn('no', L.no) +
      '</div>';
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-choice]');
      if (btn) decide(btn.getAttribute('data-choice') === 'yes');
    });
    bar.addEventListener('keydown', function (e) {
      // Esc zavre listu jen tehdy, kdyz uz je volba ulozena (otevrena z paticky)
      if (e.key === 'Escape' && readChoice()) hideBar();
    });
    // Hned za odkaz "Preskocit na obsah", aby se k liste klavesnici doslo hned na zacatku
    var skip = document.querySelector('.skip');
    if (skip) skip.after(bar); else document.body.prepend(bar);
  }

  function showBar(focus) {
    if (!bar) buildBar();
    bar.hidden = false;
    if (focus) bar.querySelector('#cbarTitle').focus();
  }

  function hideBar() {
    if (!bar) return;
    var hadFocus = bar.contains(document.activeElement);
    bar.hidden = true;
    if (hadFocus && opener) opener.focus();
    opener = null;
  }

  function decide(analytics) {
    saveChoice(analytics);
    applyConsent(analytics);
    hideBar();
  }

  // ---- Start ----

  function init() {
    var stored = readChoice();
    if (stored) applyConsent(stored.analytics);
    else showBar(false);

    // "Nastaveni cookies" v paticce listu znovu otevre (nebo zavre, kdyz je otevrena)
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.setAttribute('aria-controls', 'cbar');
      el.addEventListener('click', function (e) {
        e.preventDefault();
        if (bar && !bar.hidden) { hideBar(); return; }
        opener = el;
        showBar(true);
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
