// ================================
// PORTFOLIO LANDING PAGE — INTERACTIONS
// ================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Analytics ----
  // Odesle udalost do GA4. Bez souhlasu se gtag.js nenacte, udalost pouze
  // skonci v dataLayer a nikam neodejde - volani je tedy vzdy bezpecne.
  const track = (name, params) => {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  };

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ---- Mobile menu toggle ----
  // Kontroly na null nejsou kosmetika: vyjimka odsud by shodila zbytek
  // souboru vcetne observeru, ktery .reveal odkryva - a obsah by zustal
  // schovany. Proto nesmi nic nad nim spadnout.
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks && navbar) {
    const isMenuOpen = () => navLinks.classList.contains('active');

    const setMenu = (open) => {
      navToggle.classList.toggle('active', open);
      navLinks.classList.toggle('active', open);
      navbar.classList.toggle('menu-active', open);
      // Trida na body: pres ni CSS schova kontaktni listu, aby neplavala nad menu
      document.body.classList.toggle('menu-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      // Jedine misto, kde se zamek rolovani sahá - kazda cesta zavreni
      // (odkaz, Escape, klepnuti mimo, zvetseni okna) jde pres setMenu(false),
      // takze scroll nemuze zustat zamceny.
      document.body.style.overflow = open ? 'hidden' : '';
    };

    // restoreFocus: po zavreni z klavesnice musi fokus zpatky na prepinac,
    // jinak by skoncil na prvku, ktery uz neni videt.
    const closeMenu = (restoreFocus) => {
      if (!isMenuOpen()) return;
      setMenu(false);
      if (restoreFocus) navToggle.focus();
    };

    navToggle.addEventListener('click', () => {
      if (isMenuOpen()) closeMenu(true);
      else setMenu(true);
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu(false));
    });

    // Escape zavre menu odkudkoli
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen()) closeMenu(true);
    });

    // Klepnuti mimo obsah menu. Panel je na mobilu pres cele okno
    // (position: fixed, inset 0 v style.css), takze "mimo" znamena prazdne
    // pozadi panelu - tedy klik, jehoz cilem je primo #navLinks a ne odkaz
    // uvnitr. Druha podminka pokryva klik uplne mimo panel, kdyby se CSS
    // zmenilo na uzsi sirku. Prepinac ma vlastni handler, proto se vylucuje,
    // jinak by se menu otevrelo a hned zase zavrelo.
    document.addEventListener('click', (e) => {
      if (!isMenuOpen()) return;
      if (e.target.closest('#navToggle')) return;
      const onBackdrop = e.target === navLinks;
      const fullyOutside = !navLinks.contains(e.target);
      if (!onBackdrop && !fullyOutside) return;
      // Fokus vracime jen kdyz byl uvnitr menu, aby po klepnuti prstem
      // nenaskocil focus ring na hamburger.
      closeMenu(navLinks.contains(document.activeElement));
    });

    // Zvetseni okna nad mobilni breakpoint (max-width: 900px v style.css)
    // menu skryje pres CSS. Bez tohohle by po nem zustal zamceny scroll.
    const wide = window.matchMedia('(min-width: 901px)');
    const onWide = (e) => { if (e.matches) closeMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else wide.addListener(onWide);
  }

  // ---- Scroll reveal with Intersection Observer ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Contact form ----
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmitBtn');

  const _submitSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`;
  const _checkSVG  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Hlasky v jazyce stranky (bere se z <html lang>)
      const tFn = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;

      // "Staci jedno" — e-mail nebo telefon; oba prazdne = neodesilat
      const emailInput = contactForm.querySelector('input[name="email"]');
      const phoneInput = contactForm.querySelector('input[name="phone"]');
      const contactHint = document.getElementById('contactHint');
      const contactDuo = document.getElementById('contactDuo');
      if (emailInput && phoneInput && !emailInput.value.trim() && !phoneInput.value.trim()) {
        if (contactHint) {
          contactHint.textContent = tFn('form.contact.error');
          contactHint.classList.add('error');
        }
        if (contactDuo) contactDuo.classList.add('error');
        emailInput.setAttribute('aria-invalid', 'true');
        phoneInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
        return;
      }

      submitBtn.innerHTML = tFn('form.submitting');
      submitBtn.style.pointerEvents = 'none';

      try {
        const formData = new FormData(contactForm);
        // Prazdne kontaktni pole neposilat — Web3Forms by prazdny e-mail mohl odmitnout
        if (!formData.get('email')) formData.delete('email');
        if (!formData.get('phone')) formData.delete('phone');
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          submitBtn.innerHTML = `${_checkSVG} ${tFn('form.success')}`;
          track('generate_lead', { method: 'contact_form' });
          contactForm.reset();
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        submitBtn.innerHTML = tFn('form.error');
      }

      setTimeout(() => {
        submitBtn.innerHTML = `${tFn('form.submit')} ${_submitSVG}`;
        submitBtn.style.pointerEvents = '';
      }, 4000);
    });
  }

  // ---- Contact clicks — e-mail a telefon ----
  // Odchozi odkazy na klientske weby uz meri GA4 samo (Enhanced Measurement),
  // mailto: a tel: ale ne — ty jsou tady.
  document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
    const method = link.getAttribute('href').startsWith('tel:') ? 'phone' : 'email';
    // Lista ma vlastni location, aby slo v GA4 zmerit, kolik poptavek prinesla
    const location = link.closest('.contact-bar') ? 'sticky_bar'
      : link.closest('footer') ? 'footer' : 'page';
    link.addEventListener('click', () => {
      track('contact_click', { method, location });
    });
  });

  // "Napsat" v mobilni liste vede na formular, ne na mailto:, takze ho
  // smycka vys nechyti. Bez tohohle by lista v GA4 prestala nest poptavky.
  document.querySelectorAll('.contact-bar a[href*="#form"], .contact-bar a[href="#contact"]').forEach(link => {
    link.addEventListener('click', () => {
      track('contact_click', { method: 'form', location: 'sticky_bar' });
    });
  });

  // ---- Kontaktni lista (jen mobil) ----
  // Viditelna jen ve stredu stranky: hero ma vlastni tlacitka a zaver stranky
  // (CTA sekce + paticka) taky - tam by lista jen zdvojovala stejnou vyzvu.
  const contactBar = document.getElementById('contactBar');
  if (contactBar) {
    const DISMISS_KEY = 'contactBarDismissed';
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch (error) {
      // Soukromy rezim muze sessionStorage zakazat - lista pak jen nezustane zavrena
    }

    // Konec stranky = prvni z techto prvku, ktery na strance existuje
    const closingBlock = document.querySelector(
      '.about-cta, .projects-cta, .references-cta, .page-cta, .contact, .contact-hero'
    ) || document.querySelector('footer');
    const hero = document.querySelector('.hero, .page-hero, .csp-hero, main > section');

    // Skutecnou vysku listy predame do CSS - cookie lista se o ni nadzvedne,
    // aby se neprekryvaly. Drive tady byla podminka "dokud visi cookie lista,
    // kontaktni se neukaze" - jenze kdo cookie listu ignoruje a jen scrolluje,
    // tomu se kontaktni nezobrazila uz nikdy.
    const publishHeight = () => {
      const h = contactBar.getBoundingClientRect().height;
      if (h) document.documentElement.style.setProperty('--contact-bar-h', Math.round(h) + 'px');
    };

    const updateBar = () => {
      if (dismissed) return;

      const viewportHeight = window.innerHeight;
      const heroGone = hero
        ? hero.getBoundingClientRect().bottom < 40
        : window.scrollY > 600;
      const endReached = closingBlock
        ? closingBlock.getBoundingClientRect().top < viewportHeight - 60
        : false;

      const show = heroGone && !endReached;
      contactBar.classList.toggle('is-visible', show);
      document.body.classList.toggle('contact-bar-open', show);
      if (show) publishHeight();
    };

    const hideBar = () => {
      dismissed = true;
      contactBar.classList.remove('is-visible');
      document.body.classList.remove('contact-bar-open');
      try {
        sessionStorage.setItem(DISMISS_KEY, '1');
      } catch (error) {
        // viz vyse
      }
    };

    const closeBtn = contactBar.querySelector('.contact-bar-close');
    if (closeBtn) closeBtn.addEventListener('click', hideBar);

    window.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar, { passive: true });
    updateBar();
  }

  // Reset chyboveho stavu skupiny Kontakt, jakmile uzivatel zacne psat
  ['formEmail', 'formPhone'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        const hint = document.getElementById('contactHint');
        const duo = document.getElementById('contactDuo');
        if (hint && hint.classList.contains('error')) {
          hint.classList.remove('error');
          hint.textContent = window.i18n ? window.i18n.t('form.contact.hint') : hint.textContent;
        }
        if (duo) duo.classList.remove('error');
        const formEmail = document.getElementById('formEmail');
        const formPhone = document.getElementById('formPhone');
        if (formEmail) formEmail.removeAttribute('aria-invalid');
        if (formPhone) formPhone.removeAttribute('aria-invalid');
      });
    }
  });

  // ---- Phone input — restrict to numeric characters ----
  document.querySelectorAll('input[name="phone"]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9\s\+\-\(\)]/g, '');
    });
  });

  // ---- Active nav link highlight ----
  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(link => {
          if (!link.classList.contains('static-active')) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--color-text-primary)';
            }
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => navObserver.observe(section));

  // ---- Contact Page specific scripts ----
  // Prichod z jine stranky pres /kontakt#form: nativni skok prohlizece
  // ignoruje fixni navbar - doscrollovat s offsetem a zaostrit prvni pole
  if (window.location.hash === '#form') {
    setTimeout(() => {
      const target = document.getElementById('form');
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top });
      }
      const firstInput = document.getElementById('formName');
      if (firstInput) firstInput.focus({ preventScroll: true });
    }, 600);
  }

  // Klik na CTA vedouci na formular: scroll s offsetem resi obecny handler
  // anchor odkazu vyse, tady jen focus (preventScroll, at se scroll nepere)
  document.querySelectorAll('a[href="#form"]').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        const firstInput = document.getElementById('formName');
        if (firstInput) firstInput.focus({ preventScroll: true });
      }, 600);
    });
  });

  // ---- Lightbox pro oramovane snimky (.kn-figure) ----
  // Snimky tabulek a plakatu jsou v textovem sloupci zmensene tak, ze na mobilu
  // z nich nejde nic precist. Klik je otevre v prekryvu ve skutecne velikosti,
  // kde se daji posouvat. Pouziva nativni <dialog>: Esc, focus trap i vrstva
  // navrch jsou zadarmo.
  const zoomFigures = document.querySelectorAll('.kn-figure img');
  if (zoomFigures.length) {
    // Prekryv vznika az v JS, popisek se proto bere ze slovniku rovnou pri stavbe.
    const closeLabel = (window.i18n && window.i18n.t('lightbox.close')) || 'Zavřít náhled';

    const dialog = document.createElement('dialog');
    dialog.className = 'kn-lightbox';
    dialog.innerHTML =
      '<button type="button" class="kn-lightbox-close" aria-label="' + closeLabel + '">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button><div class="kn-lightbox-view"><img alt="" /></div>';
    document.body.appendChild(dialog);

    const view = dialog.querySelector('.kn-lightbox-view');
    const bigImg = dialog.querySelector('img');

    const open = (source) => {
      bigImg.src = source.currentSrc || source.src;
      bigImg.alt = source.alt || '';
      dialog.showModal();
      view.scrollTop = 0;
      view.scrollLeft = 0;
    };

    zoomFigures.forEach(img => {
      img.classList.add('kn-zoomable');
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.addEventListener('click', () => open(img));
      img.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
      });
    });

    dialog.querySelector('.kn-lightbox-close').addEventListener('click', () => dialog.close());
    // klik mimo snimek (na podklad) zavira; klik na snimek samotny ne
    dialog.addEventListener('click', e => {
      if (e.target === dialog || e.target === view) dialog.close();
    });
  }

});

// ================================
// TYPOGRAFIE — nezlomitelne mezery
// ================================
// Cesky sazecsky uzus: jednopismenna predlozka nebo spojka nesmi zustat na konci
// radku a posledni radek odstavce nema viset na jedinem slove. Nbsp se proto sazi
// az tady v prohlizeci - texty v HTML i v prekladech zustavaji citelne a pri
// kazde uprave se na nezlomitelne mezery nemusi myslet.
(function () {
  const NBSP = '\u00A0';
  // Neviditelny spojovnik slov: zakaze zlom v miste, kde na nej mezera nestaci.
  const WJ = '\u2060';
  const DASH = /^[\u2013\u2014]$/;

  // Sem se nesaha: kod, formulare, SVG a vse, co si autor hlida sam pres data-notypo.
  const SKIP = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'NOSCRIPT', 'SVG']);

  // Osamely posledni radek se resi jen u bezneho textu. Nadpisy maji v CSS
  // text-wrap: balance, ktery s velkym stupnem pisma nalozi lip nez nbsp.
  const BLOCKS = 'p, li, dd, dt, figcaption, blockquote';

  // Dlouhe posledni slovo uz na osamely radek nevypada a svazane by na mobilu
  // hrozilo pretecenim - kazda vazba se navic po nasazeni jeste zmeri.
  const MAX_LAST = 15;

  // Jednopismenne slovo: v cestine je to skoro vzdy predlozka nebo spojka, ktera
  // na konci radku zustat nesmi. Totez plati pro poradove "a)" nebo "pism. b)".
  const SHORT_WORD = /^[(\[„“"'‚‘]*\p{L}[).]?$/u;
  const SEPARATOR = /^[·•|\/]$/;

  const skipped = (node) => {
    for (let el = node.parentElement; el; el = el.parentElement) {
      if (SKIP.has(el.tagName.toUpperCase()) || el.hasAttribute('data-notypo')) return true;
    }
    return false;
  };

  const textNodes = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.nodeValue.trim() && !skipped(n))
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT
    });
    const out = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) out.push(n);
    return out;
  };

  // Text se deli na slova a mezery zvlast. Regex s /g by u retezcu typu
  // "i s domenou" spotreboval mezeru, ktera je pro druhou dvojici levym
  // okrajem, a druhe slovo by preskocil.
  const bindShortWords = (text) => {
    const parts = text.split(/(\s+)/);
    for (let i = 0; i + 1 < parts.length; i += 2) {
      const word = parts[i];
      const next = parts[i + 2];
      if (!word) continue;
      const number = /\d$/.test(word);
      // Oddelovac v podpisu ("Jmeno - Firma") nesmi zustat viset na konci radku.
      const separator = SEPARATOR.test(word);
      // Cislo drzi u toho, co pocita: "30 dni", "24 hodin", "400 Kc".
      const counted = number && next !== undefined && /^[\p{L}\d]/u.test(next);
      // Rozsah "10 000 - 16 000 Kc" drzi pohromade i pres pomlcku.
      const range = (number && next !== undefined && DASH.test(next))
        || (DASH.test(word) && next !== undefined && /^\d/.test(next));
      if (SHORT_WORD.test(word) || separator || counted || range) parts[i + 1] = NBSP;
    }
    // Za pomlckou umi prohlizec zlomit radek i bez mezery, nezlomitelna mezera
    // za ni tedy sama o sobe nestaci.
    return parts.join('').replace(/([\u2013\u2014])\u00A0/g, '$1' + WJ + NBSP);
  };

  const LAST_PAIR = /(\S+)(\s+)(\S+)(\s*)$/;

  const bindOrphan = (block) => {
    const nodes = textNodes(block);
    if (!nodes.length) return;
    const node = nodes[nodes.length - 1];
    const m = node.nodeValue.match(LAST_PAIR);
    if (!m) return;
    if (m[2].indexOf(NBSP) !== -1) return;          // konec uz drzi pohromade
    if (m[3].length > MAX_LAST) return;
    const original = node.nodeValue;
    node.nodeValue = original.replace(LAST_PAIR, '$1' + NBSP + '$3$4');
    // Svazana dvojice se uz nikde nezlomi. Kdyby se na radek nevesla, vytekla by
    // z bloku ven - v tom pripade je osamele slovo mensi zlo.
    if (block.scrollWidth > block.clientWidth + 1) node.nodeValue = original;
  };

  const apply = (root) => {
    const scope = root || document.body;
    if (!scope) return;
    textNodes(scope).forEach(n => {
      const val = bindShortWords(n.nodeValue);
      if (val !== n.nodeValue) n.nodeValue = val;
    });
    scope.querySelectorAll(BLOCKS).forEach(bindOrphan);
  };

  window.applyTypography = apply;
  document.addEventListener('DOMContentLoaded', () => apply());
})();
