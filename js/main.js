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
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ---- Mobile menu toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('active');
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navbar.classList.toggle('menu-active');
    // Trida na body: pres ni CSS schova kontaktni listu, aby neplavala nad menu
    document.body.classList.toggle('menu-open', !isOpen);
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navbar.classList.remove('menu-active');
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

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

      // Use current language for all status messages
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

  // ---- Magnetic button effect ----
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ---- 3D tilt on project cards ----
  const tiltCards = document.querySelectorAll('.project-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = y * -6;
      const tiltY = x * 6;

      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---- Project Filters ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active state from all buttons
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = '';
          b.style.background = '';
          b.style.color = '';
          b.setAttribute('aria-pressed', 'false');
        });

        // Activate clicked button
        btn.classList.add('active');
        btn.style.borderColor = 'rgba(255,255,255,0.35)';
        btn.style.background = 'rgba(255,255,255,0.07)';
        btn.style.color = 'var(--color-text-primary)';
        btn.setAttribute('aria-pressed', 'true');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = '';
            card.classList.add('visible');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

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
    // prekryv vznika az v JS, takze ho init prekladu nezastihl - popisek se
    // dotahne rovnou; pri prepnuti jazyka uz ho chyti data-i18n-aria
    const closeLabel = (window.i18n && window.i18n.t('lightbox.close')) || 'Zavřít náhled';

    const dialog = document.createElement('dialog');
    dialog.className = 'kn-lightbox';
    dialog.innerHTML =
      '<button type="button" class="kn-lightbox-close" aria-label="' + closeLabel + '" data-i18n-aria="lightbox.close">' +
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
