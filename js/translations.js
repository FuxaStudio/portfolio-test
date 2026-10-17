// ================================
// RETEZCE VKLADANE JAVASCRIPTEM
// ================================
// Obsah stranek je staticky, cesky i anglicky. Kazda jazykova verze ma vlastni
// HTML soubor a vlastni URL (/... a /en/...), takze se za behu nic neprepisuje
// a data-i18n atributy uz nic nedelaji.
//
// Sem patri jen to, co v HTML neni a vklada se az v prohlizeci:
//   - cookie lista (js/site-prefs.js), vznika cela v JS
//   - stavy a validace kontaktniho formulare (js/main.js)
//   - popisek zavreni lightboxu u snimku ve studiich (js/main.js)
// Nic jineho sem nepridavat. Kdyz text stoji v HTML, patri jen do HTML.
//
// Jazyk se bere z atributu lang na <html>, ne z localStorage. Zadny pf_lang
// uz neexistuje.

window.translations = {
  cs: {
    // Kontaktni formular
    'form.submit': 'Odeslat poptávku',
    'form.submitting': 'Odesílá se…',
    'form.success': 'Odesláno, ozvu se do 24 hodin',
    'form.error': 'Chyba při odesílání',
    'form.contact.hint': 'Stačí vyplnit jedno, ozvu se tam, kam chcete.',
    'form.contact.error': 'Nechte mi na sebe e-mail nebo telefon.',

    // Lightbox u oramovanych snimku ve studiich
    'lightbox.close': 'Zavřít náhled',

    // Cookie lista
    'cookie.label': 'Cookies',
    'cookie.text': 'Používám Google Analytics, abych věděl, které stránky lidem dávají smysl. Nic víc. Reklamu neměřím a data nikam nedávám.',
    'cookie.accept': 'Souhlasím',
    'cookie.reject': 'Jen nezbytné',
    'cookie.more': 'Co se měří',
    'cookie.detail': 'Měřím anonymní statistiku návštěvnosti. Navštívené stránky, přibližnou lokalitu (město), typ zařízení a odkud jste přišli. Cookie _ga vyprší za 2 roky. Souhlas můžete kdykoli změnit odkazem v patičce.',
    'cookie.link': 'Ochrana osobních údajů',
    'cookie.linkHref': '/ochrana-osobnich-udaju',
  },

  en: {
    // Contact form
    'form.submit': 'Send enquiry',
    'form.submitting': 'Sending…',
    'form.success': 'Sent, I’ll reply within 24 hours',
    'form.error': 'Didn’t send, email or call me',
    'form.contact.hint': 'One is enough. I’ll reply wherever you want me to.',
    'form.contact.error': 'Fill in an email address or a phone number so I can reply.',

    // Lightbox on framed screenshots in the case studies
    'lightbox.close': 'Close preview',

    // Cookie banner
    'cookie.label': 'Cookies',
    'cookie.text': 'I only measure traffic if you allow it. Without consent nothing loads except what the site needs to run.',
    'cookie.accept': 'Agree',
    'cookie.reject': 'Necessary only',
    'cookie.more': 'What gets measured',
    'cookie.detail': 'I measure anonymous traffic statistics. Pages visited, approximate location at city level, device type and where you came from. The _ga cookie expires after 2 years. You can change your decision at any time with the link in the footer.',
    'cookie.link': 'Privacy policy',
    'cookie.linkHref': '/portfolio-test/en/privacy',
  }
};

// ================================
// I18N HELPER
// ================================
// Uz to neni engine. Nic neprepisuje, nic neuklada, jen podava retezec
// v jazyce stranky tem skriptum, ktere obsah generuji.

window.i18n = (function () {
  const DEFAULT_LANG = 'cs';

  function getLang() {
    const lang = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
    return window.translations[lang] ? lang : DEFAULT_LANG;
  }

  function t(key) {
    const dict = window.translations[getLang()];
    return (dict && dict[key] !== undefined) ? dict[key] : key;
  }

  return { getLang, t };
})();
