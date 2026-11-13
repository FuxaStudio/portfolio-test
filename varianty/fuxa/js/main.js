// ================================
// HANZA, STUDIJNI KOPIE V CISTEM HTML: INTERAKCE
// ================================
// Vsechno je vylepseni navic: bez JS zustane obsah viditelny a FAQ funguje.

(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Plynuly scroll (Lenis), zapne se nize, pokud uzivatel nechce omezeny pohyb
  let lenis = null;
  const inView = (el, cb, margin) => {
    if (!('IntersectionObserver' in window)) { cb(el); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { cb(en.target); io.unobserve(en.target); }
      });
    }, { rootMargin: margin || '0px 0px -10% 0px' });
    io.observe(el);
  };

  // ---- Menu ----
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  if (menuBtn && menu) {
    // Otevreni a zavreni s animaci (css/fuxa.css, .menu.is-open): pri otevreni se nejdriv zrusi
    // hidden a trida se prida az v dalsim snimku, aby prechod mel z ceho jet. Pri zavreni se trida
    // odebere a hidden se vrati po dobehnuti prechodu panelu (0,6 s jako v sablone), pri omezenem pohybu hned.
    // Panel stoji pod tlacitkem MENU se stejnym odstupem jako v sablone (--menu-gap v css/fuxa.css),
    // spodek tlacitka se meri pri kazdem otevreni, protoze odrolovana hlavicka je nizsi.
    let closeTimer = 0;
    const narrowMenu = window.matchMedia('(max-width: 809.98px)');
    const setMenu = (open) => {
      clearTimeout(closeTimer);
      if (open) {
        // Pod 810 px panel navazuje primo na spodni hranu hlavicky (odstup 0 v css/fuxa.css), jinak na spodek tlacitka
        const headEl = menuBtn.closest('.head');
        const anchor = narrowMenu.matches && headEl ? headEl : menuBtn;
        menu.style.setProperty('--menu-top', anchor.getBoundingClientRect().bottom.toFixed(2) + 'px');
        menu.hidden = false;
        void menu.offsetWidth;
        menu.classList.add('is-open');
      } else {
        menu.classList.remove('is-open');
        if (reduced) menu.hidden = true;
        else closeTimer = setTimeout(() => { menu.hidden = true; }, 600);
      }
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      // Hlavicka je pevna, menu se otevre na miste; stranka pod nim jen prestane rolovat
      if (lenis) { if (open) lenis.stop(); else lenis.start(); }
    };
    menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    menu.addEventListener('click', (e) => {
      if (e.target === menu || e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
    });
  }

  // ---- Hlavicka: nahore pruhledna, po odrolovani tmavy pruh (.is-stuck) ----
  // Stranky s pruhlednou hlavickou nad herem (landing, mesta, studie): pruh naskoci hned, jak se stranka
  // odroluje o vic nez 8 px, aby se velky napis a obsah hera neprolinaly s prepinacem a tlacitkem.
  // Svetla hlavicka podstranek (.head--light) zustava beze zmeny: pruh po odrolovani asi o 10 px,
  // nebo (kdyz je na strance .hero) az kdyz hero odjede pod hlavicku.
  // Pri nacteni uprostred stranky (refresh, odkaz na kotvu) naskoci pruh bez prechodu (.head--instant).
  const head = document.querySelector('.head');
  if (head) {
    const hero = document.querySelector('main .hero');
    const light = head.classList.contains('head--light');
    // Studie (.csh) pod 810 px: hlavicka je tmava od nacteni, i nahore (tmavou ji pri parsovani nastavi maly skript v HTML, aby nebliklo).
    // Od 810 px je nahore pruhledna nad fotkou a ztmavne po 8 px. Prechod pres 810 px (zmena sirky okna) se prepne bez prechodu.
    const studie = !!document.querySelector('main .csh');
    const narrow = window.matchMedia('(max-width: 809.98px)');
    const t0 = performance.now();
    let headQueued = false;
    const stick = () => {
      headQueued = false;
      const h = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head-h')) || 0;
      const on = light ? (hero ? hero.getBoundingClientRect().bottom <= h : window.scrollY > 10) : ((studie && narrow.matches) || window.scrollY > 8);
      if (on === head.classList.contains('is-stuck') && !head.classList.contains('head--instant')) return;
      // Prvni chvile po nacteni (obnoveni pozice, kotva) a zmena sirky pres 810 px: bez prechodu, ať je hlavicka rovnou ve spravnem stavu
      const instant = (on && performance.now() - t0 < 1500) || head.classList.contains('head--instant');
      if (instant) { head.classList.add('head--instant'); head.offsetWidth; }
      head.classList.toggle('is-stuck', on);
      if (instant) requestAnimationFrame(() => requestAnimationFrame(() => head.classList.remove('head--instant')));
    };
    const onHead = () => { if (!headQueued) { headQueued = true; requestAnimationFrame(stick); } };
    window.addEventListener('scroll', onHead, { passive: true });
    window.addEventListener('resize', onHead, { passive: true });
    // Zmena sirky pres 810 px: udalost jde pred prepoctem stylu, takze se hlavicka prepne bez prechodu
    narrow.addEventListener('change', () => { head.classList.add('head--instant'); head.offsetWidth; stick(); });
    window.addEventListener('load', stick);
    window.addEventListener('pageshow', stick);
    stick();
  }

  // ---- Formular: odeslani pres Web3Forms (access key je v HTML, stejny jako na zivem webu) ----
  // Kontrola az po kliknuti na tlacitko (form ma novalidate). Hlaska je pod polem, pole dostane
  // aria-invalid a hlaska zmizi, jakmile je pole v poradku. Staci vyplnit e-mail, nebo telefon.
  const form = document.getElementById('form');
  const submit = document.getElementById('submit');
  const submitText = document.getElementById('submitText');
  if (form && submit && submitText) {
    const NB = ' ';            // pevna mezera
    const EM = 'e-⁠mail';      // e-mail, ktery se nezlomi za pomlckou
    // Jazyk stranky: texty formulare podle <html lang>, cesky je vychozi
    const EN = document.documentElement.lang === 'en';
    const MSG = EN ? {
      name: 'Please enter your name.',
      contact: 'Please enter an email or phone number.',
      email: 'Please check your email, something\'s missing.',
      phone: 'Please check your phone number, it\'s missing digits.',
      message: 'Write a few sentences about what you need.'
    } : {
      name: 'Vyplňte jméno.',
      contact: 'Vyplňte ' + EM + ' nebo telefon.',
      email: 'Zkontrolujte ' + EM + ', něco v' + NB + 'něm chybí.',
      phone: 'Zkontrolujte telefon, chybí v' + NB + 'něm číslice.',
      message: 'Napište pár vět o' + NB + 'tom, co potřebujete.'
    };
    const T = EN ? {
      send: 'Send inquiry', incomplete: 'Form not filled in', sending: 'Sending…', sent: 'Inquiry sent',
      subject: 'Nová poptávka z webu (EN), ',
      ok: 'Thanks, I got your inquiry. I\'ll get back to you soon.',
      err: 'Your inquiry couldn\'t be sent. Please try again or email me at <a href="mailto:fuxa@fuxastudio.cz">fuxa@fuxastudio.cz</a>.'
    } : {
      send: 'Odeslat poptávku', incomplete: 'Formulář není vyplněný', sending: 'Odesílám…', sent: 'Poptávka odeslaná',
      subject: 'Nová poptávka z webu, ',
      ok: 'Díky, poptávka mi přišla. Ozvu se vám co nejdřív.',
      err: 'Poptávku se nepodařilo odeslat. Zkuste to znovu, nebo mi napište na <a href="mailto:fuxa@fuxastudio.cz">fuxa@fuxastudio.cz</a>.'
    };
    const f = { name: form.elements.name, email: form.elements.email, phone: form.elements.phone, message: form.elements.message };

    // Telefon: jen cislice, mezery a +
    if (f.phone) f.phone.addEventListener('input', () => { f.phone.value = f.phone.value.replace(/[^0-9\s+]/g, ''); });

    // Misto pro hlasku pod kazdym polem. Jmeno a zprava: hned za <label>, e-mail a telefon: v mrizce .form__duo.
    const errs = {};
    Object.keys(f).forEach((k) => {
      const input = f[k];
      if (!input) return;
      const p = document.createElement('p');
      p.className = 'form__err form__err--' + k;
      p.id = 'formErr-' + k;
      p.hidden = true;
      input.closest('label').after(p);
      errs[k] = p;
      input.dataset.desc = input.getAttribute('aria-describedby') || '';
    });

    // Zprava o odeslani pod tlacitkem
    const status = document.createElement('p');
    status.className = 'form__status';
    status.setAttribute('aria-live', 'polite');
    submit.after(status);

    const val = (k) => (f[k] ? f[k].value.trim() : '');
    const emailOk = (v) => /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/.test(v);
    const phoneOk = (v) => /^[+\d\s]+$/.test(v) && v.replace(/\D/g, '').length >= 9;

    // Vrati chyby jako { pole: hlaska }
    const check = () => {
      const e = {};
      if (f.name && !val('name')) e.name = MSG.name;
      if (f.email && f.phone) {
        const em = val('email'), ph = val('phone');
        if (!em && !ph) { e.email = MSG.contact; e.phone = MSG.contact; }
        else {
          if (em && !emailOk(em)) e.email = MSG.email;
          if (ph && !phoneOk(ph)) e.phone = MSG.phone;
        }
      }
      if (f.message && !val('message')) e.message = MSG.message;
      return e;
    };

    const setErr = (k, text) => {
      const input = f[k], p = errs[k];
      if (!input || !p) return;
      p.textContent = text || '';
      p.hidden = !text;
      if (text) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', (p.id + ' ' + input.dataset.desc).trim());
      } else {
        input.removeAttribute('aria-invalid');
        if (input.dataset.desc) input.setAttribute('aria-describedby', input.dataset.desc); else input.removeAttribute('aria-describedby');
      }
    };

    let sending = false;
    let sent = false;
    const sync = () => {
      if (sending) return;
      const ready = Object.keys(check()).length === 0;
      submit.dataset.state = ready ? 'ready' : 'incomplete';
      submitText.textContent = ready ? T.send : T.incomplete;
    };

    form.addEventListener('input', () => {
      // Hlasky se jen mazou: jakmile je pole v poradku, jeho hlaska zmizi
      const e = check();
      Object.keys(errs).forEach((k) => { if (!errs[k].hidden && errs[k].textContent !== e[k]) setErr(k, e[k]); });
      if (sent) { sent = false; status.textContent = ''; status.className = 'form__status'; }
      sync();
    });

    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      if (sending) return;
      const e = check();
      Object.keys(errs).forEach((k) => setErr(k, e[k]));
      const first = ['name', 'email', 'phone', 'message'].find((k) => e[k]);
      if (first) { f[first].focus(); return; }

      sending = true;
      submit.disabled = true;
      submit.dataset.state = 'ready';
      submitText.textContent = T.sending;
      status.textContent = '';
      status.className = 'form__status';

      const name = val('name');
      const data = new FormData();
      data.append('access_key', form.elements.access_key.value);
      data.append('subject', T.subject + name);
      data.append('from_name', 'FuxaStudio web');
      data.append('botcheck', form.elements.botcheck && form.elements.botcheck.checked ? 'true' : '');
      data.append('Name', name);
      data.append('Email', val('email') || '(nevyplněno)');
      data.append('Phone', val('phone') || '(nevyplněno)');
      data.append('Message', val('message'));
      data.append('Page', location.href);
      if (val('email')) data.append('replyto', val('email'));

      let ok = false;
      try {
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: data });
        const json = await res.json().catch(() => ({}));
        ok = res.ok && json.success !== false;
      } catch (err) { ok = false; }

      sending = false;
      submit.disabled = false;
      if (ok) {
        form.reset();
        sent = true;
        submit.dataset.state = 'ready';
        submitText.textContent = T.sent;
        status.className = 'form__status form__status--ok';
        status.textContent = T.ok;
      } else {
        submit.dataset.state = 'ready';
        submitText.textContent = T.send;
        status.className = 'form__status form__status--err';
        status.innerHTML = T.err;
      }
    });
  }

  // ---- Filtr projektu: stejne jako v sablone se kategorie drzi v adrese ----
  const chips = [...document.querySelectorAll('.chip[data-filter]')];
  if (chips.length) {
    const cards = [...document.querySelectorAll('.proj[data-cat]')];
    const apply = (cat) => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === cat)));
      cards.forEach((p) => { p.hidden = !!cat && !p.dataset.cat.split(' ').includes(cat); });
    };
    chips.forEach((c) => c.addEventListener('click', () => {
      const url = new URL(location.href);
      if (c.dataset.filter) url.searchParams.set('work-category', c.dataset.filter); else url.searchParams.delete('work-category');
      history.replaceState(null, '', url);
      apply(c.dataset.filter);
    }));
    const start = new URLSearchParams(location.search).get('work-category') || '';
    if (chips.some((c) => c.dataset.filter === start)) apply(start);
  }

  // ---- Postery videi se nacitaji az u sekce, at nebrzdi uvodni obrazovku ----
  // Bez JS je nahradi <noscript> s obycejnym linym obrazkem.
  document.querySelectorAll('img[data-src]').forEach((img) => {
    inView(img, (el) => {
      const source = el.previousElementSibling;
      if (source && source.dataset.srcset) source.srcset = source.dataset.srcset;
      el.src = el.dataset.src;
      el.removeAttribute('data-src');
    }, '600px 0px');
  });

  if (reduced) return;
  document.documentElement.classList.add('js');

  // ---- Plynuly scroll jako ve Frameru ----
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1 });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    // Odkazy na sekce jedou stejne plynule
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      const target = a && a.getAttribute('href').length > 1 && document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      goTo(target, false);
      history.pushState(null, '', a.getAttribute('href'));
    });
  }

  // Dojezd ke kotve. Lenis scroll-margin-top nezna, odstup pod hlavickou se mu preda jako offset.
  // Behem rolovani se meni vyska stranky (schody ceniku zkracuji sekci), cil se proto po dojeti
  // jeste dorovna, nejvys dvakrat.
  function goTo(target, immediate, tries) {
    const off = -(parseFloat(getComputedStyle(target).scrollMarginTop) || 0);
    lenis.scrollTo(target, {
      offset: off,
      immediate,
      force: true,
      onComplete: () => {
        if ((tries || 0) >= 2) return;
        // Dva snimky: v prvnim se po posunu prepocitaji schody (update), ve druhem uz je rozlozeni konecne
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (Math.abs(target.getBoundingClientRect().top + off) > 2) goTo(target, immediate, (tries || 0) + 1);
        }));
      }
    });
  }

  // ---- Videa projektu hraji, jen kdyz jsou videt ----
  // Bez JS a pri omezenem pohybu zustava poster. Skryta videa (desktopove na mobilu
  // a naopak) nikdy neprotnou okno, takze se ani nestahuji.
  const vids = [...document.querySelectorAll('video[data-autoplay]')];
  const visible = new Set();
  const sync = (v) => {
    if (visible.has(v) && !document.hidden) v.play().catch(() => {});
    else if (!v.paused) v.pause();
  };
  if (vids.length && 'IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target);
        sync(en.target);
      });
    }, { threshold: 0.25 });
    vids.forEach((v) => vio.observe(v));
    document.addEventListener('visibilitychange', () => vids.forEach(sync));
  }

  // ---- Nadpisy po znacich ----
  // Citelny text zustava v aria-label, znaky jsou pro ctecky skryte.
  document.querySelectorAll('.split').forEach((el) => {
    // Pevna mezera (U+00A0) neni misto zlomu: slovo se na ni nedeli a zustava v textu (\s by ji zahrnulo)
    el.setAttribute('aria-label', el.textContent.replace(/[ \t\n\r\f]+/g, ' ').trim());
    let i = 0;
    const wrap = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.nodeValue.split(/([ \t\n\r\f]+)/).forEach((part) => {
            if (!part) return;
            if (/^[ \t\n\r\f]+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            w.setAttribute('aria-hidden', 'true');
            [...part].forEach((ch) => {
              const c = document.createElement('span');
              c.className = 'c';
              c.style.setProperty('--i', i++);
              c.textContent = ch;
              w.appendChild(c);
            });
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          wrap(n);
        }
      });
    };
    wrap(el);
    inView(el, (t) => t.classList.add('in'));
  });

  // ---- Odstavec O mne se rozsveci po slovech podle rolovani ----
  const mission = document.getElementById('mission');
  let words = [];
  // Citace klienta ve studiich (.cs__q) ma stejne slova, jen jiny rozsah rolovani (viz update)
  const quote = !!(mission && mission.matches('.cs__q'));
  if (mission) {
    const parts = mission.textContent.split(/(\s+)/);
    mission.textContent = '';
    parts.forEach((p) => {
      if (/^\s+$/.test(p) || !p) { mission.appendChild(document.createTextNode(p)); return; }
      const s = document.createElement('span');
      s.className = 'wd';
      s.textContent = p;
      mission.appendChild(s);
      words.push(s);
    });
  }

  // ---- Pocitadla ----
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dec = Number(el.dataset.decimals || 0);
    inView(el, () => {
      const start = performance.now();
      const dur = 1000;
      const step = (t) => {
        const k = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = (end * eased).toFixed(dec) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });

  // ---- Paralaxa obrazku projektu a rozsveceni odstavce ----
  // Pocita se jen pro prvky v okne a jen pres transform, rolovani nebrzdi.
  const layers = [...document.querySelectorAll('[data-parallax]')].map((el) => ({ el, items: [...el.children] }));

  // Sloupce karet se pri rolovani k sobe stahuji jako v sablone. Rozsah a posuny
  // jsou zmerene z originalu na sirce 1440 px: zacina se, kdyz horni hrana sekce
  // vjede do okna, a koncovy stav plati po `range` pixelech rolovani.
  const desk = window.matchMedia('(min-width: 1280px)');
  const drift = [
    ['.proc', 1600, [['.proc__col:not(.proc__col--2):not(.proc__col--3)', 100], ['.proc__col--2', 225], ['.proc__col--3', 350]]],
    ['.refs', 1364, [['.refs__col:not(.refs__col--off)', 100], ['.refs__col--off', 225]]],
    ['.price', 1667, [['.plan--1', 250], ['.plan--main', 150], ['.plan--3', 50], ['.clarity', 150], ['.price__more', 150]]]
  ].map(([sel, range, cols]) => ({
    sec: document.querySelector(sel),
    range,
    cols: cols.map(([s, d]) => ({ el: document.querySelector(sel + ' ' + s), d })).filter((c) => c.el)
  })).filter((g) => g.sec);

  // Cenove karty maji ruzne vysoke obsahy, takze pevne posuny by je nechaly
  // skoncit kazdou jinde. Posun prvni a prostredni karty se proto dopocita tak,
  // aby v koncovem stavu mely spodni hranu na stejne lince jako treti karta.
  const price = drift.find((g) => g.sec.matches('.price'));
  const alignPlans = () => {
    if (!price) return;
    const pick = (s) => price.cols.find((c) => c.el.matches(s));
    const last = pick('.plan--3');
    if (!last) return;
    // Presne (desetinne) souradnice bez aktualniho posunu; offsetTop/offsetHeight
    // se zaokrouhluji na cele pixely a karta pak koncila o pixel vedle.
    const bottom = (el) => {
      const ty = parseFloat((el.style.translate || '').split(' ')[1]) || 0;
      return el.getBoundingClientRect().bottom + window.scrollY - ty;
    };
    // Cenik D4 (.price--more): na desktopu je kazda karta aspon o 32 px vyssi nez
    // karta vlevo, aby vrsky po srovnani spodnich hran stoupaly zleva doprava.
    // Vysky se berou z obsahu (nejdriv se zrusi predchozi dopocet), volne misto
    // jde v CSS nad tlacitko.
    const more = pick('.price__more');
    if (more) {
      const plans = ['.plan--1', '.plan--main', '.plan--3'].map(pick).filter(Boolean);
      plans.forEach((c) => { c.el.style.minHeight = ''; });
      if (desk.matches) {
        let prev = 0;
        plans.map((c) => c.el.getBoundingClientRect().height).forEach((h, i) => {
          const need = i ? Math.max(h, prev + 32) : h;
          if (need > h) plans[i].el.style.minHeight = need.toFixed(2) + 'px';
          prev = need;
        });
      }
    }
    const target = bottom(last.el) - last.d;
    ['.plan--1', '.plan--main'].forEach((s) => {
      const c = pick(s);
      if (c) c.d = Math.max(0, bottom(c.el) - target);
    });
    // Dalsi sluzby skonci 64 px pod srovnanymi kartami jako v D4; sekce
    // o stejny kus zkrati spodni okraj.
    if (more) {
      const ty = parseFloat((more.el.style.translate || '').split(' ')[1]) || 0;
      const top = more.el.getBoundingClientRect().top + window.scrollY - ty;
      const end = Math.max(...price.cols.filter((c) => c.el.matches('.plan')).map((c) => bottom(c.el) - c.d));
      more.d = Math.max(0, top - (end + 64));
      // Rozsah rolovani ceniku: karty dojedou, kdyz je nejvyssi karta v okne
      // na stred (stejne volneho mista nad i pod ni). Je-li okno nizsi nez
      // karty, dojedou se spodnimi hranami 40 px nad spodnim okrajem okna.
      const vh = window.innerHeight;
      const plans = price.cols.filter((c) => c.el.matches('.plan'));
      const high = Math.min(...plans.map((c) => bottom(c.el) - c.d - c.el.getBoundingClientRect().height));
      const gap = end - high <= vh ? (vh - (end - high)) / 2 : 40;
      const secTop = price.sec.getBoundingClientRect().top + window.scrollY;
      price.range = Math.max(1, end - secTop + gap);
    }
  };
  alignPlans();

  // Reference (landing i stranky mest): stejna logika jako cenik. Schody bezi uz od
  // 810 px (dva sloupce). Pravy sloupec si nechava pevny posun, posun leveho se dopocita
  // tak, aby v koncovem stavu mely posledni karty spodni hranu na stejne lince; vrsky
  // zustanou schodovite. Zaporny spodni okraj o velikost posunu nenecha pod kartami
  // prazdne misto a schody dojedou presne, kdyz spodek sekce vjede do okna.
  const refs = drift.find((g) => g.sec.matches('.refs'));
  if (refs) refs.mq = window.matchMedia('(min-width: 810px)');
  const fitRefs = () => {
    if (!refs) return;
    const [left, right] = [':not(.refs__col--off)', '.refs__col--off'].map((s) => refs.cols.find((c) => c.el.matches('.refs__col' + s)));
    refs.cols.forEach((c) => { c.el.style.marginBottom = ''; c.el.style.marginTop = ''; });
    if (!refs.mq.matches || !left || !right) return;
    // Spodek posledni karty sloupce bez aktualniho posunu (stejne jako bottom() u ceniku).
    // Sloupec sam se v mrizce natahuje na vysku radku, proto se meri karta.
    const bottom = (col) => {
      const ty = parseFloat((col.style.translate || '').split(' ')[1]) || 0;
      return col.lastElementChild.getBoundingClientRect().bottom + window.scrollY - ty;
    };
    const mt = (el) => parseFloat(getComputedStyle(el).marginTop) || 0;
    // Tablet (810 az 1279 px): pevne posuny jako v sablone, levy 100 px, pravy 225 px.
    // Nad sloupci je hlavicka sekce, levy sloupec proto zacina o svuj posun niz a dojede
    // presne na misto z rozlozeni (64 px pod hlavickou), takze ji nikdy neprekryje.
    // Pravy sloupec se v rozlozeni posune tak, aby spodky na konci dojely na stejnou linku.
    if (!desk.matches) {
      left.d = 100;
      right.d = 225;
      left.el.style.marginTop = mt(left.el) + left.d + 'px';
      const diff = (bottom(left.el) - left.d) - (bottom(right.el) - right.d);
      right.el.style.marginTop = mt(right.el) + diff + 'px';
      refs.cols.forEach((c) => { c.el.style.marginBottom = -c.d + 'px'; });
      refs.range = Math.max(1, refs.sec.offsetHeight);
      return;
    }
    right.d = 225;
    const target = bottom(right.el) - right.d;
    left.d = bottom(left.el) - target;
    // Kdyby levy sloupec koncil vys nez cil, nejede vubec a pravy dojede k nemu
    if (left.d < 0) { right.d -= left.d; left.d = 0; }
    // Je-li pravy sloupec i bez posunu kratsi nez levy (uzky tablet), sedne o rozdil niz
    // uz v rozlozeni, at spodky lici
    if (right.d < 0) {
      right.el.style.marginTop = parseFloat(getComputedStyle(right.el).marginTop) - right.d + 'px';
      right.d = 0;
    }
    refs.cols.forEach((c) => { c.el.style.marginBottom = -c.d + 'px'; });
    refs.range = Math.max(1, refs.sec.offsetHeight);
  };
  fitRefs();

  // Postup: karty po dojeti schodu konci nad spodkem sekce.
  // Zaporny spodni okraj mrizky se dopocita tak, aby pod nejnizsi kartou v koncovem
  // stavu zbyl jen spodni padding sekce (polovina mezery k Referencim), a schody
  // dojedou, kdyz spodek sekce vjede do okna, takze karty nikdy neprekryji Reference.
  const proc = drift.find((g) => g.sec.matches('.proc'));
  const fitProc = () => {
    if (!proc) return;
    const grid = proc.sec.querySelector('.proc__grid');
    if (!grid) return;
    grid.style.marginBottom = '';
    if (!desk.matches) return;
    const ty = (el) => parseFloat((el.style.translate || '').split(' ')[1]) || 0;
    const fin = Math.max(...proc.cols.map((c) => c.el.lastElementChild.getBoundingClientRect().bottom - ty(c.el) - c.d));
    grid.style.marginBottom = (fin - grid.getBoundingClientRect().bottom).toFixed(2) + 'px';
    proc.range = Math.max(1, proc.sec.offsetHeight);
  };
  fitProc();

  let queued = false;
  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    layers.forEach(({ el, items }) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = (r.top + r.height) / (vh + r.height);
      items.forEach((it) => { it.style.transform = 'translateY(' + (-p * 23).toFixed(2) + '%)'; });
    });
    drift.forEach(({ sec, range, cols, mq }) => {
      const r = sec.getBoundingClientRect();
      const p = (mq || desk).matches ? Math.min(Math.max((vh - r.top) / range, 0), 1) : 0;
      cols.forEach(({ el, d }) => { el.style.translate = p ? '0 ' + (-d * p).toFixed(1) + 'px' : ''; });
      const more = sec === (price && price.sec) && price.cols.find((c) => c.el.matches('.price__more'));
      if (more) sec.style.marginBottom = p ? (-more.d * p).toFixed(1) + 'px' : '';
    });
    if (words.length && quote) {
      // Citace ve studiich: rozsvecuje se po slovech od chvile, kdy horni hrana citace
      // vjede do 85 % vysky okna, do chvile, kdy je stred citace v polovine okna.
      const r = mission.getBoundingClientRect();
      const from = vh * 0.85;
      const to = vh * 0.5 - r.height / 2;
      const k = Math.min(Math.max((from - r.top) / (from - to), 0), 1);
      const n = k * words.length;
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    } else if (words.length) {
      // Jako v sablone: slovo se rozsviti, kdyz projde sikmou caru zhruba
      // v 60 % vysky okna, a pri rolovani zpet zase zhasne.
      const vw = window.innerWidth;
      words.forEach((w) => {
        const b = w.getBoundingClientRect();
        w.classList.toggle('on', b.top + (b.left / vw) * 60 < vh * 0.6);
      });
    }
  };
  const onScroll = () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { alignPlans(); fitRefs(); fitProc(); onScroll(); }, { passive: true });
  // Po nacteni pisma se vysky karet zmeni, posuny se prepocitaji
  window.addEventListener('load', () => {
    alignPlans(); fitRefs(); fitProc(); onScroll();
    // Prichod z jine stranky na kotvu (index.html#kontakt): prohlizec skoci drive, nez se dopocitaji
    // schody a pisma, sekce pak ujede. Po nacteni se k ni dojede znovu.
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && document.getElementById(id);
    // Prohlizec ke kotve jede plynule (scroll-behavior: smooth), dorovnava se az po jeho dojeti.
    if (target && lenis) {
      let last = -1, still = 0, frames = 0;
      const settle = () => {
        still = Math.abs(window.scrollY - last) < 1 ? still + 1 : 0;
        last = window.scrollY;
        if (still < 5 && ++frames < 300) { requestAnimationFrame(settle); return; }
        alignPlans(); fitRefs(); fitProc(); update();
        goTo(target, true);
      };
      requestAnimationFrame(settle);
    }
  });
  if (document.fonts) document.fonts.ready.then(() => { alignPlans(); fitRefs(); fitProc(); onScroll(); });
  update();
  // Rok v patičce: v HTML stojí 2026, tady se přepíše na aktuální
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
