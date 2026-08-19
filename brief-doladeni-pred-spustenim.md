# Brief: doladění fuxastudio.cz před spuštěním

> **Jak to použít:** otevři nový chat v této složce a napiš:
> *„Přečti si `brief-doladeni-pred-spustenim.md` a pojďme podle něj pracovat. Začneme bodem X."*
> Než začneš, vyplň sekci **6 — Co mě na webu štve**. Zbytek je hotový kontext.

---

## 1. Kdo jsem a co je cílem

Jsem Pavel Fuxa, web designer a developer na volné noze v Pardubicích (fuxastudio.cz, IČO 29618843).
Portfolio mi nepřivádí zákazníky. Chci ho **doladit do stavu, se kterým budu spokojený, a pak teprve nasadit.**

Cílový zákazník: **česká malá firma nebo OSVČ**, nejčastěji Pardubicko. Reálné segmenty podle mých dosavadních zakázek: sportovní akce, rodinná výroba, kavárny a podniky, poradenské firmy.

Nejde o nový redesign. Web je po pěti kolech přestavby v dobrém stavu. Jde o poslední doladění konkrétních věcí.

---

## 2. Kde to stojí (důležitý kontext, ne úkol)

**Živý fuxastudio.cz je zhruba o týden pozadu za repem.** Nasazená verze nemá ceník (`/cenik` → 404), stránku služeb, landing na Pardubice ani čtyři případové studie (všechny 404). Hero na živém webu nemá jedinou českou větu.

Zároveň na fuxastudio.cz **není žádná analytika** — ani GA4, ani Plausible. Nevím tedy, jestli je problém v návštěvnosti, nebo v konverzi.

Vědomě jsem se rozhodl **nejdřív doladit, pak nasadit**. Tenhle brief řeší to doladění. Až bude hotové, následuje samostatný krok: commit → `npx wrangler deploy` → Plausible → Search Console (odeslat sitemap + ruční indexace 8 nových URL) → Seznam Webmaster. **Nezapomeň mi to připomenout, až dojdeme na konec.**

Mimo web (dělám sám, není předmětem téhle práce, ale ovlivňuje to priority): Google Business Profile, 4 Google recenze od stávajících klientů, Firmy.cz, navolnenoze.cz, poprosit klienty o doporučení.

---

## 3. Technika

Statický web, žádný build. Nasazení Cloudflare Workers přes `wrangler` (`wrangler.jsonc`, adresář = kořen repa, `*.md` a `Case Studies/` jsou z nasazení vyloučené).

```
index.html                                  domovská
tvorba-webovych-stranek.html                obecná služba
tvorba-webovych-stranek-pardubice.html      lokální landing
cenik.html                                  3 balíčky + FAQ
projekty.html                               4 klientské + 4 koncepty
projekty/{svidnicky-extrem,mlyn-janderov,   plné případové studie
          mattina-cafe,global-accord-strategies}.html
reference.html  o-mne.html  kontakt.html  404.html
css/style.css                               tokeny + globální styly
css/case-study.css                          SDÍLENÉ styly všech 4 studií
js/translations.js  main.js  smoke-shader.js  wave-hero.js
assets/  assets/fonts/                      Bricolage Grotesque (self-host)
sitemap.xml  _redirects  robots.txt
```

### Pravidla údržby — tohle poruš a rozbiješ to

- **Čeština je výchozí jazyk a renderuje se z HTML fallbacku.** `translations.js` se aplikuje jen když `lang ≠ cs`. Když měníš českou hodnotu klíče, **musíš přepsat i natvrdo napsaný text v každém HTML souboru**, který ten klíč používá. Jinak se změna nikde neprojeví.
- **Styly případových studií se editují jen v `css/case-study.css`**, nikdy per-page. Ta duplicita byla schválně odstraněna.
- **Modály na `/projekty` jsou zrušené a nesmí se vracet.** Celá karta je odkaz přímo na `/projekty/<slug>`.
- Stránky v podsložce `projekty/` musí používat **absolutní cesty** k assetům (`/css/`, `/js/`, `/assets/`).
- Globální reset `* { margin: 0 }` rozbíjí auto-centrování `<dialog>`.
- **Obrázek s atributy `width`/`height` potřebuje v CSS i `height: auto`**, jinak se atributová výška použije jako pevná a poměr stran se ignoruje.
- **Lazy obrázek s nulovým boxem se v Chromiu nikdy nenačte** — proto mají všechny `width`/`height` atributy.
- Anglická mutace v `translations.js` **záměrně zaostává** za češtinou (asi 12 klíčů). EN se teď neřeší, plánuju ji později nahradit statickými stránkami s vlastními URL.

---

## 4. Design systém

Tokeny jsou v `css/style.css`, používej je, nezaváděj nové hodnoty natvrdo.

| role | hodnota |
|---|---|
| pozadí | `#141414` |
| povrch karty | `#1E1E1E` |
| hover | `#232323` |
| linka | `#303030` |
| text primární | `#EDEDED` |
| text sekundární | `#A9A9AB` |
| text terciární | `#85858A` (zvednuto z #666 kvůli AA na kartách) |
| radius | `0rem` |
| akcentní barva | **žádná** — systém je monochromní |

**Písma:** displejové `Bricolage Grotesque` (self-host, variabilní, wght 600–800, opsz napevno 40) na nadpisy. `Geist` na běžný text. `Geist Mono` **jen** na štítky, meta řádky a čísla (tabulární). Hero používá `Bebas Neue`.

**Šířky obsahu:** `container--prose` 36rem (60–70 znaků), `container--mid` 55rem, plná 1200px. Vertikální rytmus 24 / 48 / 96 / 160.

**Hero na homepage je hotový a schválený, nesahej na jeho typografickou mechaniku.** Konkrétně: `text-box: trim-both cap alphabetic` s fallbackem přes záporné em-marginy (metriky Bebas: ascent .95, descent .35, cap .703), stack má `align-items: stretch` + `justify-content: space-between`, `padding-bottom: calc(13vh + clamp(32px, 5.6vw, 104px))`, fotka `92vh`. Tohle nezjednodušuj a nevracej zpátky — je to odladěné napříč deseti rozlišeními.

---

## 5. Můj vkus — čti pozorně

Držím si dark monochromní typografickou identitu. **Můj největší strach je, že web bude vypadat jako stránka, kterou AI vygenerovala z jednoho promptu.**

**Odmítám:** ikonkové mřížky funkcí, šablonové palety (smaragdová, oranžová), generické SaaS hero layouty, stock mockup scény, vymyšlená čísla, fráze typu „dodáváme excelenci".

**Co jsem si ale ověřil:** šablonovitost nedělá přítomnost ceníku, procesu nebo referencí. Dělá ji obecný obsah. Hanza (šablona, která se mi líbí) má ceníkové balíčky s částkami, pětikrokový proces, reference se jmény a FAQ — a vypadá draze. Takže **konverzní prvky nejsou zakázané**, jen je chci mít naplněné skutečným obsahem a podané mým vizuálním jazykem: typografie dělá práci, mono štítky, reálná čísla a detaily.

**Moje reference:**
- [dennissnellenberg.com](https://dennissnellenberg.com/) — řemeslo, ne struktura. Jeho minimalismus stojí na oceněních z Awwwards, která nemám.
- [en.bazil.fr](https://en.bazil.fr/) — tohle je můj model. Hero = lidská věta v rodném jazyce („jmenuju se Bazil a jsem webdesigner, na volné noze, v Paříži"), město, a hned tři loga klientů.
- [hanza-template.framer.website](https://hanza-template.framer.website/) — jak vypadá tvrdý prodej v tmavém editorial hávu.

**Jak se mnou pracuj:**
- **Česky.**
- **Vizuální varianty ukazuj jako artefakt vedle sebe, ne jako soubory.** Podle porovnání se rozhoduju.
- Neptej se, jestli můžeš začít — navrhni konkrétní řešení a ukaž ho.
- Malé logické commity, ne jeden velký.
- Když si myslíš, že se pletu, řekni to rovnou.

---

## 6. Co mě na webu štve — VYPLNIT PŘED ZAČÁTKEM

> Sem si napiš vlastními slovy, co ti na webu vadí. Klidně neuspořádaně: „hero je moc prázdný", „sekce O mně je nudná", „projekty vypadají na mobilu blbě". Čím konkrétnější, tím líp. Až to bude vyplněné, tohle je hlavní zadání a sekce 7 je doplněk.

- Nepřínáší mi zákazníky, celkově i čísla na google search console jsou malá - od spuštění (7.4. 2026 - 9.8. 2026) 12Celkový počet kliknutí, 178 Celkový počet zobrazení, CTR 6,7%, Průměrná pozice 6.8.. Nevím zda to nemůže být i tím jak se indexují, protože teď mi to píše 1 Indexováno, 10 Neindexováné (3 důvody), Stránka s přesměrováním (2), Objeveno - momentálně neindexováno (4), Chyba přesměrování (4). Taky nevím zda to nemůže mít něco společného s tím co mám nastavené na cloudflare (přes co hostuji svoje portfolio)
- Celková prezentace stránky, nevím zda ten obsah co tam mám je dobrý, nebo zda mám něco přidat/odebrat/upravit.
- Potřebuju se vyhnout pocitu že to dělalo AI. Nevím zda tomu ubírá ten shader na hero v index.html a CTA buttonech na koncích stránek, připadně ten shader co mám na podstránkách (takové ty linky co se hýbou).
- Nechápu, proč tam mám dvě stránky: tvorba-webovych-stranek a tvorba-webovych-stranek-pardubice, přitom na to pardubice se ze samotné stránky nejde dostat. Jestli to má nějaký význam prosím napiš mi ho.
- Budu muset přidat anglickou verzi s vlastním URL (teď je to pouze JS switcher) - jaké má výhody vlastní url anglické verze?
- Z navbaru zmizelo tlačítko o mně - dostanu se na tu stránku pouze přes index - je to záměr? a proč
- Není lepší sjednotit, nějak ty věci? Jako třeba služby s ceníkem, možná i s tím o mně 
- Má význám mít 2 buttony na stejnou stránku? V navbaru je Kontakt + CTA na spolupráci, obě vedou na stejnou podstránku. Není lepší dát do CTA buttonu, něco jako nezávazná poptávka?
- Mám přidat do footeru linky na Upwork, Firmy.cz a Google business profile?
- Nejsem spokojen s celým feelem té stránky, myslím tím hodně layout věcí. Nejvíc pochybuji o: Celý layout stránky (zda není až moc od krajů), index.html Kolik to stojí (je to takový obdelník v prázdnu, není lepší tam udělat 3 karty s tím že highlightnu jednu, tu nejoblíbenější?), Celá stránka služby (poté co na ní kliknu z index.html tak se tam v podstatě duplikují ta sekce služeb(Možná tam dát rovnou ceník a přesunout celou stránku s ceníkem sem?)), Přidat samostatnou FAQ stránku?
- Nejsem si jistý tím co je v case studies (obsah + samotný layout)
- Chtěl bych přidat nějaké animace, nic crazy, ale něco aby to trochu žilo. Jak samotné sekce jak se načítají tak i to když člověk poprvé přijde na stránku, mění sekce, klikne na nějaký button. Líbí se mi animace na tomto potrfoliu: https://dennissnellenberg.com/. Je tam v podstatě všechno co popisuji, první návštěva, změna podstránek, kliknutí na hamburger menu apod. Ale tuhle část můžeme řešit až úplně poslední.
- Výsledek čeho chci dosáhnout. 1. přivést lidi na mojí stránku (základ je aby mě lidé snadno našli) 2. aby si o té stránce řekli wow to je fakt pěkné 3. aby mě kontaktovali, hlavně aby to bylo snadno a nemuseli nějak dlouho hledat.
- Přidání souhlas s formulářem s odkazem na podstránku, kde je vypsané co a proč od těch lidí chci a jak s tím nakládám, klasický prostě check button pod formulářem co je všude. Ale asi bych to chtěl udělat tak že to nebude na to že to musí zakliknout, ale něco ve smyslu: Pokud odešlete tento formulář, souhlásíte s našimi podmínkami nebo něco takového.
- Oheldně toho redesignu těch sekcí, chápu, že to třeba nezvládneš podle mé představy, ale mohl by jsi mi dát prosím tipy několika fakt kvalitních portfolií, kde jsou věci co řeším, abych se mohl podívat jak to udělat. A taky třeba nějaké library samotných komponentů, kde jsou ukázané jak to lidi navrhli. Připadně jak a co hledat pokud bych to chtěl najít.
-

---

## 7. Co doporučila diagnóza (doplněk k sekci 6)

Vzniklo z rozboru živého webu, repa, tří referencí a české konkurence. **Neber jako závazný seznam** — projdi to se mnou a rozhodneme, co dává smysl.

### 7.1 Hero na homepage — chybí člověk, místo a důkaz
Typografie *WEB DESIGNER DEVELOPER* zůstává, je to identita. Ale:
- **Tagline je moc malý.** Věta „Pomáhám malým firmám získávat zákazníky přes web" je drobná řádka pod obřím anglickým nápisem. Zaslouží víc váhy.
- **V heru není slovo „Pardubice".** Lokální dotaz je moje nejlepší klíčové slovo a v prvním viewportu chybí.
- **Chybí důkaz.** Bazil má v heru tři loga klientů, a je to důvod, proč ten hero funguje. Já mám čtyři loga v `assets/` (`mattina-logo.webp`, `mlyn-janderov-logo.svg`, `exrem-logo.webp`, `globalaccord-logo.webp`). Pruh s logy jsem už jednou odstranil, protože se mi vizuálně nelíbil — **chci vidět ještě jeden pokus**, tenký, monochromní, v nízké opacitě. Ukaž mi 2–3 varianty jako artefakt.

### 7.2 Nikde neříkám, pro koho dělám
Konkurent, který mě ve výsledcích přeskakuje, má větu „Moji zákazníci jsou nejčastěji OSVČ, firmy, restaurace, základní školy, ubytovací zařízení nebo obecní úřady z Pardubic a okolí." Je to nudné a funguje to, protože se v tom čtenář pozná. Moje segmenty existují, jen je nikde nepojmenovávám. Jedna věta na homepage a na stránce služeb.

### 7.3 Ověřit, co jsem sliboval dodat
Zkontroluj, jestli tyhle položky ještě platí, a když ano, připomeň mi je:
- `assets/cs-janderov-detail.webp` — měl to nahradit ořez ceníku 1600×1200
- `assets/project1–4.webp` — měly to nahradit náhledy konceptů 1440×900
- `assets/logo.png` — odbarvená monochromní verze (v commitu 6a8f8a0 je „světlejší logo", ověř stav)
- volitelně: pull quote pro Mattinu, data z GSC pro Mattinu a GAS

### 7.4 Poslední průchod před spuštěním
- proklikat všech 12 stránek v reálném prohlížeči na desktopu a aspoň dvě na telefonu
- ověřit, že formulář na `/kontakt` reálně doručuje e-mail
- Lighthouse na produkci po nasazení (localhost bez komprese podstřeluje mobilní skóre asi o 15 bodů)

---

## 8. Nikdy nezveřejňovat

Tvrdé pravidlo, platí i když se to hodí do textu:

- **Ceny konkrétních zakázek.** (Podklady v `Case Studies/` je obsahují. Věta „Podobné projekty dnes vychází od 10 000 Kč" je jediná správná formulace.)
- Hesla a přihlašovací údaje viditelné na screenshotech od klientů.
- Telefonní čísla a osobní e-maily třetích osob.
- Původ předchozího webu Global Accord Strategies.
- Cokoliv z adresáře `Case Studies/` — je vyloučený z gitu i z nasazení.

Klientka u Mattina Café i Global Accord Strategies je **Ivana Lenčéšová** (tatáž osoba — je to viditelný důkaz vracejícího se klienta). Pozor na diakritiku.

---

## 9. Hotovo znamená

- Body ze sekce 6 jsou vyřešené a schválené v prohlížeči, ne jen v kódu.
- Žádná nová vymyšlená čísla ani obecné fráze.
- Česká verze sedí v HTML fallbacku i v `translations.js`.
- Web je nasazený, měřený a odeslaný do Search Console.
