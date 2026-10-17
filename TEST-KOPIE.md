# Testovací kopie webu fuxastudio.cz

Tohle repo je testovací kopie živého webu (repo fuxa99/web-portofilo, větev demo, stav 17. 10. 2026).
Běží na GitHub Pages: https://fuxastudio.github.io/portfolio-test/

Rozdíly proti živému webu (jen kvůli tomu, že web tady běží v podsložce /portfolio-test/):
- všechny odkazy začínající "/" mají předponu "/portfolio-test/"
- v js/translations.js je odkaz '/portfolio-test/en/privacy'
- každá stránka má <meta name="robots" content="noindex, nofollow"> a robots.txt zakazuje indexaci
- wrangler.jsonc zůstal původní, na živý web nemá vliv

Při přenosu změn zpět na živý web je potřeba:
1. předponu "/portfolio-test/" vrátit na "/"
2. odstranit řádek s noindex meta tagem
3. robots.txt ani wrangler.jsonc nepřenášet
