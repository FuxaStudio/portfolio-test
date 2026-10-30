# CLAUDE.md — fuxastudio.cz

Jediný zdroj pravdy pro texty na webu. Když se text a tenhle soubor rozejdou, platí tenhle soubor. Když se má změnit fakt, změň ho nejdřív tady, pak na webu.

Web je psaný **hovorovou češtinou** (pracuju, líp, radši, nepotřebuju). Tvary jako „pracuji" nebo „lépe" na web nepatří.

---

## Cíl webu a jak na něm pracujeme

Tahle sekce je pro každý nový chat. Přečti ji dřív, než něco navrhneš.

### Cíl

Velmi reprezentativní portfolio, které lidé najdou ve vyhledávání a ze kterého chodí poptávky. Hlavní podmínka: web nesmí působit jako AI ani jako šablona. Nikdo si nemá říct „tohle udělala AI". Platí pro texty (pravidla níž) i pro vzhled a efekty.

### Postup: nejdřív čeština, angličtina potom

Od 12. 10. 2026 se pracuje **jen na české verzi**. Anglická větev (`/en/`) se needituje, dokud Pavel neřekne, že je s českou spokojený. Potom se angličtina dorovná podle seznamu „Čeká na přenos do EN" níž.

- Pravidla v sekci Anglická verze a v technických poznámkách, která říkají, že se změna musí udělat v obou jazycích (hero, eurové ceny, pás Doplněk k webu a podobně), se v téhle fázi neplní hned. Místo úpravy anglické stránky se změna zapíše do seznamu níž.
- Sdílené soubory (`css/style.css`, `css/case-study.css`, `js/*.js`) platí pro obě větve a změna v nich se do angličtiny propíše sama. To je v pořádku. Stačí ověřit, že se anglická stránka nerozbila. Obsah se dorovná až potom.
- Fakta (ceny, termíny, studie) se mění i tak nejdřív tady v CLAUDE.md. Když se fakt týká i angličtiny (třeba eurová cena), zapiš ho sem a do seznamu níž.

**Čeká na přenos do EN** (doplňuj průběžně, při dorovnání odškrtávej):

- *Hotovo už dřív: změny z 12. 10. 2026 jsou v angličtině udělané (sloučená sekce služeb s cenami na `/en/`, odstraněné efekty, štítky a vodoznak, přepínač jazyka, metrika na kartě Svídnického extrému, Mattina a Upwork, konkrétní výčet zakázek, otázka o designu a šablonách ve FAQ). Nový model plateb je na `/en/web-design-pricing` taky už přepsaný (FAQ, jeho JSON-LD a věta pod procesem).*
- [ ] `/en/`: pořadí sekcí hero, projekty, služby a ceny, reference, o mně, kontakt.
- [ ] `/en/`: karty projektů Mattina Café (zvýrazněná), Wedding website, Mlýn Janderov. Bez podnadpisu nad kartami.
- [ ] `/en/`: služby. Nadpis ve smyslu „Co u mě dostanete“, u redesignu bez slibu převzetí přístupů „i když nemáte hesla“, u správy „doménu a hosting máte v ceně“, řádky Správa a Logo vedou na kotvu pásu Doplněk k webu, ne na ceník.
- [ ] `/en/`: časová osa „Kdy co platíte“ pod ceníkem, čtyři kroky (návrh 0, po schválení návrhu 50 %, po schválení hotového webu 50 %, 30 dní po spuštění) a pod ní věta o posunu termínu, když se čeká na klienta. CSS je v `index.html`, ne ve `style.css`, musí se zkopírovat.
- [ ] `/en/projects/global-accord-strategies`: „days from brief to an approved site“ a „site approved“ v posledním kroku přepsat na spuštění, web byl za 8 dní venku. Zkontrolovat i kartu na `/en/projects` a `/en/about`.
- [ ] `/en/`: reference bez štítku a podnadpisu, pod nadpisem hodnocení z Googlu a Firmy.cz. Marquee na `/en/` i na `/en/web-design-pricing` nahradit třemi pevnými kartami `.ref-card` v `.references-grid` jako v češtině (logo, firma, jméno, citace, fakt a Studie, nádech barvy klienta). CSS je ve `style.css`, stačí přepsat HTML a smazat skript a CSS marquee. Potom smazat starou `.reference-card` i obrázky `assets/ref-bg-*.webp`.
- [ ] Mobilní lišta na všech EN stránkách: tlačítko Email vede na formulář, ne na `mailto:`. Homepage na `#contact`, ostatní na `/en/contact` k formuláři (česky `/kontakt#form`).
- [ ] `/en/`: perex hera o návrhu hlavní stránky zdarma místo „One person does all of it…“.
- [ ] `/en/`: hero CSS dorovnat s českým (od 15. 10. 2026). `padding-bottom` u `.hero-typo-wrap` je `max(calc(17.5vh + clamp(32px, 5.6vw, 104px)), calc(6vh + 172px))` a nad 768 px má `.hero-clarity` `bottom: 6vh`, `.hero-lead` `margin-top: -0.2rem` a `.hero-ctas` `margin-top: 0.7rem`. Zkopírovat blok z `index.html`.
- [ ] Kroky „Co bude dál“ na `/en/` a `/en/contact`: čtvrtý krok, návrh hlavní stránky zdarma.
- [ ] Provoz z EN pryč: sekce s 50 € ročně a 60 to 120 € u WordPressu na `/en/web-design-pricing`, zmínky v metadatech a FAQ. Místo nich věta, že doména a hosting se platí zvlášť a se správou jsou v ceně. Upravit i řádek o eurech v sekci Anglická verze tady.
- [ ] `/en/`: FAQ „Než napíšete“ se třemi otázkami mezi O mně a kontaktem, odkaz na FAQ na `/en/web-design-pricing`.
- [ ] Karty projektů na `/en/` a `/en/projects` bez štítků (Café, Wedding a podobně). CSS `.project-tags` ve `style.css` zůstává, dokud je EN používá, potom smazat.
- [ ] `/en/references` přestavět podle české `/reference` (od 16. 10. 2026): bez perexu, pod nadpisem hodnocení, pořadí Mlýn Janderov, blok „tři zakázky od jedné klientky“ se dvěma kartami, Wedding website (s Luciinou citací), Svídnický extrém. Řádky s náhledem webu jako jediným odkazem na web, citace bez uvozovek, jeden údaj o čase a odkaz na studii. Popis a metadata na pět referencí. CSS je v `<style>` české stránky, zkopírovat. Potom smazat ze `style.css` starý blok `.reference-row` a `.reference-rail-*`, česká stránka ho už nepoužívá.
- [ ] `/en/projects` přestavět podle české `/projekty` (od 16. 10. 2026): Mattina Café přes celou šířku a pod ní 2 × 2, hero jen s nadpisem, bez H2 „Client projects“, mono řádku a cenového řádku pod kartami, názvy karet `<h2>`, cena a návrh hlavní stránky zdarma v závěrečné výzvě (€400 to €1,150, slovem `to`) a odkaz na ceník. Pořadí ostatních karet a kruh EN studií si angličtina drží vlastní, rozhodnout při dorovnání. Popisy v JSON-LD `hasPart` srovnat s texty karet.
- [ ] Ikona v náhledu karty projektu je šipka → (`M5 12h14M12 5l7 7-7 7`), ne ↗, protože karta vede na vlastní studii. Česky změněno na homepage a /projekty 16. 10. 2026, EN karty na `/en/` a `/en/projects` mají pořád ↗.
- [ ] Karta Global Accord na `/en/projects`: zkontrolovat, jestli popis neopakuje slovo „pages“ stejně jako česká „stránek… právních stránek“ (česky opraveno na „právních náležitostí“).

### Rozhodnutí, která už padla

Tyhle věci jsou probrané a rozhodnuté. Znovu je nenavrhuj, pokud o to Pavel sám nepožádá.

- **Hero na homepage zůstává**, včetně velkého nápisu WEB DESIGNER DEVELOPER, výřezu fotky a kouřového shaderu.
- **Reference jsou statické, tři karty vedle sebe**, na homepage s hodnocením z Googlu a Firmy.cz pod nadpisem (rozhodnuto 14. 10. 2026). Od 15. 10. 2026 platí totéž i na Službách, marquee se odtud odstranilo. Citace mají tři až pět vět, v pohybu se špatně čtou a se čtyřmi referencemi by se karty v pásu opakovaly. Marquee nevracet, dokud nebude zhruba 10 a víc krátkých recenzí.
- **„Domů" v navigaci zůstává**, i když domů vede i logo.
- **Ceník na Službách zůstává ve třech kartách** se štítkem „Nejčastější volba".
- **Texty karet projektů zůstávají**, jak jsou. Nepřepisovat je na historky ze studií.
- **Karty projektů nemají štítky** (Kavárna, Svatba, Lokální podnik…). Rozhodnuto 14. 10. 2026, štítek opakoval první větu popisu nebo neříkal nic.
- **Stránka /reference má od 16. 10. 2026 tuhle podobu** a pořadí je Pavlovo rozhodnutí: Mlýn Janderov, blok „Tři zakázky od jedné klientky“ (Mattina Café a Global Accord Strategies vedle sebe), svatební web, Svídnický extrém. Hero bez perexu, jen nadpis „Co říkají klienti“ a hodnocení z Googlu a Firmy.cz. Citace bez uvozovek. Na živý web vede jen náhled webu s doménou, ne druhý odkaz vedle studie. U každé reference jeden údaj o čase a odkaz na studii, žádné další štítky ani věta o rozsahu (Pavel je bral jako vatu). Druhá Martinova citace na /reference nepatří. Svatební web nemá štítek „už neběží“, říká to věta pod citací.
- **Stránka /projekty má od 16. 10. 2026 tuhle podobu** a pořadí je Pavlovo rozhodnutí: Mattina Café přes celou šířku (`.project-featured`, stejná karta jako na homepage), pod ní mřížka 2 × 2 se Svatebním webem, Global Accord Strategies, Mlýnem Janderov a Svídnickým extrémem. Extrém stojí schválně poslední, je to Pavlův první web a nepovažuje ho za dobrý. Hero má stejnou výšku jako ostatní podstránky (Pavel nechce, aby každá podstránka měla jinak velké hero) a nese jen nadpis „Projekty“, bez perexu. Nadpis „Klientské projekty“, mono řádek „5 klientských webů · …“, velká čísla 01–05 a drobný cenový řádek pod kartami se odstranily. Názvy karet jsou na /projekty `<h2>`, protože jiný H2 nad nimi už není. Cena stojí v závěrečné výzvě (varianta B z návrhu): „Weby jako tyhle vycházejí na 10 000 – 28 000 Kč podle rozsahu. Návrh hlavní stránky dostanete zdarma.“, vedle tlačítka odkaz Ceník a pod ním „Napište mi, ozvu se do 24 hodin.“ Typ webu a cena na jednotlivých kartách zatím ne, Pavel si není jistý; s cenou ve výzvě by se četla dvakrát. Citace na /projekty nepatří, jsou na homepage a /reference. České studie se odkazem „Další případová studie“ propojují do kruhu ve stejném pořadí jako karty: Mattina Café → Svatební web → Global Accord Strategies → Mlýn Janderov → Svídnický extrém → Mattina Café. Když se pořadí karet změní, změní se i kruh.
- **Mobilní lišta „Napsat“ vede na formulář, ne na `mailto:`.** Homepage na `#contact`, pardubická stránka na vlastní `#form`, všechny ostatní české stránky na `/kontakt#form`. Kliknutí měří `main.js` jako `contact_click` s `method: form`.
- **Nové fotky nebudou.** Pavel se nerad fotí, používá se jen to, co existuje.
- **Žádné další efekty pod kurzorem** (magnetická tlačítka, náklon, kroužek u kurzoru a podobně). Animace jsou jen objevování sekcí při scrollu a plynulé rozbalení FAQ (marquee zbývá jen v anglické větvi, než se dorovná).
- **Čísla, která nejsou k dispozici, se nevymýšlejí ani neodhadují.** Počty registrací u Svídnického extrému ani počet uchazečů na Upworku neexistují.

### Otevřené úkoly

- Až budou venku rozpracované místní weby: přidat je do portfolia a vrátit větu „většina klientů je z Pardubicka" (Služby, FAQ na pardubické stránce).
- Potom stránka pro Chrudim, podobná pardubické. Nesmí to být kopie s vyměněným názvem města, Google takové stránky bere jako spam. Oba současné místní projekty jsou z okresu Chrudim.
- Recenze na Googlu: Pavel připomene klientům, kteří je ještě nenapsali. Není to úkol do kódu.
- **Do budoucna: reference s fotkou klienta.** Pavel chce zkusit velké karty, kde vlevo stojí fotka klienta nebo jeho provozovny a vpravo přes ni poloprůhledný panel se jménem, rolí a citací. Inspirace je dushestudio.cz. Je to konkurenční studio, takže se bere princip, ne jejich podoba jedna k jedné. Brání tomu dvě věci: chybí fotky klientů a referencí je málo (s pár velkými kartami by se pás opakoval). Postup: při připomínání recenzí poprosit klienty i o jednu fotku a souhlas s použitím. Kdo fotku nepošle, může mít na kartě ostrý náhled svého webu. „Nové fotky nebudou“ platí pro Pavla, ne pro klienty.
- **OG obrázky předělat napříč webem.** Dnes má devět českých stránek stejný `assets/og-image.jpg` (fotka Pavla), studie mají náhled svého webu `cs-*-hero.webp` v poměru 16 : 10. Pavel je chce upravit všude, ne jen na /projekty. Na /projekty se nabízí koláž náhledů klientských webů. U studií zvážit JPG nebo PNG v 1200 × 630, WebP některé sítě v náhledu odkazu nezobrazí. S obrázkem se mění i `og:image:alt` (bez `·` a pomlčky) a rozměry v `og:image:width` a `og:image:height`. Zapsáno 16. 10. 2026.
- Až bude čeština hotová: dorovnat angličtinu podle seznamu výš.
- **Návrhy nové hlavní stránky (19. 10. 2026).** Pavel chtěl vidět, jak by homepage mohla vypadat úplně jinak. Ve složce `/navrhy/` je šest variant jako podklad pro výběr, rozcestník je `/navrhy/`. A „Před a po“: v heru porovnání původního a nového webu Mlýna Janderov, posouvá se tažením. B „Barvy klientů“: každý projekt má kapitolu v barvách svého webu, nadpisy v Newsreaderu. C „Modrá“: hero jako plakát v modré `#2F4BFF` ze sítí, výřez fotky přes multiply, největší nadpis je o návrhu hlavní stránky zdarma. D „Černobílá“ (přidaná na Pavlovo přání, chtěl vidět i variantu v černobílé): barvy a písma současného webu (`#141414`, `#EDEDED`, Bebas, Bricolage, Geist) bez akcentové barvy, stavba podle B, výřez fotky v sekci O mně. Od 21. 10. 2026 je pod nadpisem Mattina Café přes celou šířku a porovnání před a po se přesunulo z hera do kapitoly Mlýna Janderov. Pavel si porovnáním nahoře nebyl jistý a starý web klienta nemá být to první, co návštěvník uvidí. D je doporučená varianta, protože jako jediná sedí s podstránkami, které jsou tmavé. Při přenosu do `index.html` zůstává navigace a patička ze současného webu (`style.css`), ne hlavička z návrhu. E „V pohybu“ (29. 10. 2026, Pavel chtěl něco „trochu cinematic“, ale bez otravného scrollovacího efektu): stejná jako D, jen se při scrollování v rámech posouvají celé weby klientů (výřezy `assets/navrhy/e-*-desktop.webp` a `e-*-phone.webp`), telefon jede o kus rychleji než monitor a u Mlýna Janderov se porovnání scrollem přetočí ze starého webu na nový, dokud na jezdec člověk nesáhne. Stránka se scrolluje normálně, nic se nepřipíná ani nepřebírá. Pohyb řídí `navrhy/pohyb.js`, při `prefers-reduced-motion` se nespustí a stránka vypadá jako D. F „Filmová“ (30. 10. 2026, Pavel chtěl pohyb spíš jako dushestudio.cz, jen ne tak otravný, vadí mu, když se k informaci musí dlouho scrollovat): všechno z E a k tomu pohyb, jaký mají weby studií. Nadpis po načtení vyjede po slovech z masky a rám Mattiny se otevře, náhled Mattiny se při scrollování roztáhne z šířky obsahu ke krajům okna (nejvýš 1760 px), nadpisy sekcí vyjíždějí z masky a text pod nimi se s malým zpožděním dorovná, rámy projektů se při příjezdu otevřou a první věta v sekci O mně se rozsvěcí slovo po slově. Nic se nepřipíná a pohyb nepřidává scrollování navíc. Pohyb řídí `navrhy/film.js` místo `pohyb.js`. Skryté výchozí stavy platí jen pod třídou `f-anim`, kterou nastaví skript v hlavičce. Bez JS, při `prefers-reduced-motion` a když se `film.js` nenačte do 2,5 s, je stránka vidět celá a vypadá jako D. Kdyby Pavel vybral E nebo F, přepíše se rozhodnutí o animacích výš (dnes jen objevování sekcí a rozbalení FAQ). Efekty pod kurzorem zůstávají zakázané. Fakta, ceny, citace, texty karet projektů, formulář, kroky „Co bude dál“ a FAQ jsou převzaté beze změny. Varianty mají vlastní CSS a JS (`navrhy/navrhy.css`, `navrhy/navrhy.js`), formulář, lištu a mezery obstarává `js/main.js`. Nové soubory leží v `assets/navrhy/` (písma Newsreader a plná Bricolage s osou šířky, výřezy telefonů, loga v barvě, náhledy). Na živý web se nic z toho nepřenáší, dokud Pavel nevybere. Vybraná varianta se pak přenese do `index.html` i s hlavičkou současné homepage (canonical, hreflang, Open Graph, JSON-LD, Google Analytics a cookie lišta v návrzích schválně chybí) a rozhodnutí v sekci výš se podle ní přepíšou, hlavně hero a pořadí sekcí.

---

## Pravidla textů

### Část 1: AI znaky

1. **Pomlčka uprostřed věty.** Povolená jen v číselných rozsazích (10 000 – 15 000 Kč).
2. **Dvojtečka nebo středník uprostřed věty.** Dvojtečka uvozující seznam je v pořádku.
3. **Tučný fragment uvnitř běžící věty.** Tučné smí být jen nadpisy, ceny v kartách a tabulkách a mono labely. Odkazy mají být stylované jako odkazy, ne tučně.
4. **Vzorec „X, ne Y".** Limit jedna na stránku. Schválené výskyty, které zůstávají:
   - „Vlastní design, ne šablona" (ceník)
   - „Řešit chce mouku, ne web" (studie Mlýn Janderov)
   - „klasický, ne emoji" (svatební studie)
5. **Ozdobné výčty a trojice benefitů.** Funkční výčty (co je v ceně, komu weby dělám) jsou v pořádku.
6. **Zdvojené konstrukce** typu „Žádné… žádné…" nebo „bez… a bez…".
7. **Marketingová vata:** „pomáhám firmám růst", „komplexní řešení", „moderní", „profesionální", „kvalitní", „na míru vašim potřebám" a podobné fráze bez konkrétního obsahu.
8. **Recyklace výrazných frází napříč stránkami.** Povolené refrény, které se opakovat smí:
   - „do 24 hodin se ozvu"
   - „Cenu dostanete písemně před začátkem práce. A platí."
   - tlačítko „Nezávazná poptávka"
   - sdílené karty projektů
   - patičkový tagline

### Část 2: prodejnost a fakta

9. **Každé tvrzení musí sedět s fakty níž.** Cokoli, co slibuje víc, jinak nebo přesněji, než fakta říkají, je kritická chyba.
10. **Citace klientů jsou nedotknutelné.** Doslovné znění, správné jméno, zkrácení jedině vyznačené výpustkou (`…`). Jakýkoli tichý zásah je kritická chyba. Doslovná znění viz sekce Citace klientů.
11. **Vágní přídavné jméno tam, kde existuje číslo.** „Rychlé dodání" je slabší než „18 dní".
12. **Sdílené komponenty mají mít jedno znění všude:** karty projektů (homepage, /projekty, Služby), kontaktní formulář včetně placeholderu („Např. otevírám kavárnu a do jara potřebuju web s menu."), kroky „Co bude dál", pás „Doplněk k webu".
13. **Věty bez informace.** Test: když větu smažu, ztratí stránka něco? Když ne, je to vata.
14. **Pět otázek.** Každá stránka má návštěvníkovi odpovědět na: co dostanu, za kolik, jak dlouho, proč zrovna Pavel, co mám udělat teď.
15. **Míchání spisovné a hovorové češtiny.** Viz úvod.

### Typografie

- **Značka se píše jedním slovem: FuxaStudio.** Tak zní doména, e-mail, Instagram i zápis na Firmy.cz, tak stojí v patičce webu. Tvar „Fuxa Studio" se nikam nevrací, ani do metadat. Skloňuje se jako jedno slovo (FuxaStudia, FuxaStudiem).
- **Titulek má jediný oddělovač `|` a značka stojí až na konci:** `{obsah stránky} | FuxaStudio`. Dva oddělovače v jednom titulku ani značka dvakrát za sebou (`… | Pavel Fuxa · FuxaStudio`) se nepoužívají. Platí pro `<title>`, `og:title`, `twitter:title` a `name` ve strukturovaných datech. Cíl je do 60 znaků, ať Google neusekne konec.
- **Znak `·` do SEO metadat nepatří.** Ani do `<title>`, `og:title`, `twitter:title`, `og:image:alt`, `description` a strukturovaných dat. Kde slepoval dvě tvrzení, píše se čárka nebo tečka podle smyslu věty. Ve viditelném textu (patička, `<cite>`, `<figcaption>`, řádek měst na pardubické stránce) `·` **zůstává**, tam funguje jako oddělovač seznamu a Google ho nečte.
- V JSON-LD `headline` u studií se píše **„případová studie"**, ne anglické „case study".
- Pomlčka nepatří ani do `alt` a `aria-label`.
- České uvozovky **„takhle"**, ne rovné palcové.
- Výpustka je znak `…`, ne tři tečky.
- Slovník v `js/translations.js` obsahuje jen řetězce vkládané JavaScriptem, obojí jazyky. Obsah stránek je statický, česky i anglicky.
- Popisky, které nejsou vidět, se překládají taky. `aria-label`, `alt` a `placeholder` musí být v jazyce stránky. Na české stránce nesmí zůstat anglický řetězec a naopak.

### Vědomé výjimky

- Tučné začátky odrážek v sekci „Co nedělám" na /o-mne (`<b>Focení.</b>` atd.) jsou schválené, fungují jako nadpisy odrážek. Neopravovat podle pravidla 3.

---

## Fakta, jediný zdroj pravdy

### Ceny a termíny

| Balíček | Cena | Dodání |
|---|---|---|
| Jednostránkový web | 10 000 – 15 000 Kč | 1–2 týdny |
| Vícestránkový web (obvykle 5–8 stránek) | 20 000 – 28 000 Kč | 2–3 týdny |
| Náročnější weby (e-shop, rezervace, přihlašování) | individuálně | podle rozsahu |
| Správa a rozvoj webu | od 400 Kč / měsíc | volitelná služba |
| Logo a tiskoviny (logo, vizitky, jídelní lístek, leták) | individuálně, cena v nabídce | doplňková služba |
| Redesign stávajícího webu | od 10 000 Kč, stejně jako nový web | podle balíčku |

- Není plátce DPH, **ceny jsou konečné**.
- Web hotový **do měsíce od dodání podkladů**, většinou dřív.
- **Dvě kola připomínek** v ceně.
- Po spuštění **30 dní podpory** (opravy a drobné úpravy). Dál podle domluvy nebo v rámci správy webu. Neomezené úpravy zdarma se **neslibují**.

### Provoz

- **Cena webu je konečná a provoz do ní nepatří.** Doménu a hosting klient platí zvlášť, přesná částka je v nabídce. Na webu se pevná částka za provoz neuvádí (od 15. 10. 2026), protože podle webu vychází zhruba na 500 – 2 000 Kč ročně. To rozpětí je interní, na web se nepíše.
- **Kdo má Správu a rozvoj (od 400 Kč / měsíc), má doménu a hosting v ceně.** Ve správě Pavel platí doménu a hosting a k tomu svůj čas. Takhle to Pavel klientům, kteří nechtějí nic řešit, i nabízí.
- **Doména patří klientovi.** Kdo ji chce mít na sebe, tomu se tak od začátku založí. Kdo to nechce řešit, nechá ji na Pavlovi v rámci správy. Kdykoli později se všechno převede na klienta nebo k někomu jinému.
- **Klient se Správou a rozvojem má při výpadku webu přednost před ostatní prací.** Na homepage to stojí jako „Když web nejede, jdete přede vším ostatním.“
- **Sekce Provoz na Službách (`#provoz`) se 15. 10. 2026 odstranila.** Na webu o provozu zbyla jen věta „Doménu a hosting platíte zvlášť…“ pod ceníkem na Službách a v poznámce pod službami na homepage, a odpověď „Komu patří doména a web?“ v FAQ na homepage.
- **Neplatí a nesmí se do textů vracet:** „Provoz webu 1 000 Kč / rok“, „u WordPressu 1 500 – 3 000 Kč ročně“, „jedna platba ročně, žádné měsíční paušály“ (změna 15. 10. 2026), a ze starších verzí „Doména ~300 Kč / rok“, „Hosting 0 Kč“ a „Žádné povinné měsíční poplatky“ (změna 26. 8. 2026).
- **Že weby v čistém kódu jedou na bezplatném tarifu Cloudflare, se na web nepíše.** Je to interní věc, ne tvrzení pro klienta.

### Nabídka a platba

- **Odpověď na poptávku do 24 hodin.**
- **Nabídka s cenou a termínem se posílá písemně do 24 hodin od konzultace, a to u všech typů webů včetně náročnějších.** Dřívější formulace „do 3 pracovních dnů po konzultaci" **neplatí** a nesmí se do textů vracet.
- Jsou to dva různé sliby ve stejném okně: reakce na poptávku a nabídka po konzultaci. Nezaměňovat.
- Nabídka je nezávazná, cena a termín platí.
- **Platba na fakturu ve dvou částech, od 12. 10. 2026 takhle:** nejdřív Pavel navrhne hlavní stránku a do té doby klient neplatí nic. Když se mu návrh líbí, pošle polovinu a Pavel staví celý web. Druhá polovina se platí po schválení hotového webu, ještě před spuštěním. Nikdy se neplatí všechno dopředu. Když se návrh klientovi nelíbí, neplatí nic; Pavel s rizikem návrhu zdarma počítá a bere ho jako argument pro klienta. Dřívější „polovina při objednávce“ **neplatí** a nesmí se do textů vracet.
- **Návrh hlavní stránky zdarma je hlavní argument a má být vidět.** Stojí v perexu hera na homepage, ve čtvrtém kroku „Co bude dál“ („Navrhnu vám hlavní stránku zdarma“) na homepage, /kontakt a pardubické stránce, a v časové ose „Kdy co platíte“.
- **Termín se posouvá, když se čeká na klienta.** Web je obvykle hotový za 1–3 týdny od dodání podkladů. Když návrh nebo hotový web čeká na schválení, termín se posune o stejnou dobu. Na homepage to stojí pod časovou osou „Kdy co platíte“.

### Případové studie

| Studie | Fakta |
|---|---|
| **Svídnický extrém** | 18 dní od první zprávy ke spuštění (ne od schůzky, ta byla až den 4). Pozice 2,7 na Googlu, míra prokliku 39,5 %, 126 kliknutí za 3 měsíce. Na kartě projektu stojí „126 kliknutí z Googlu za 3 měsíce“ (od 12. 10. 2026, majitel firmy míře prokliku nerozumí), míra prokliku a pozice zůstávají ve studii (pozice na vlastní název závodu je slabší důkaz). Počty registrací nejsou k dispozici. |
| **Mlýn Janderov** | **6 dní od zadání ke spuštění.** Poptávka přes formulář přišla 11. 5. a odpověď šla týž den, klient se pak týden neozval a konverzace reálně začala 19. 5., web živý 25. 5. Počítá se od 19. 5., protože týdenní ticho na straně klienta není doba práce. Dřívější „18 dní od poptávky ke spuštění“ **neplatí** a nesmí se do textů vracet. Změna 27. 8. 2026. V časové ose studie mají číslo dne jen první a poslední krok (Den 0, Den 6), prostřední dva nesou „Průběžně“ a „Po třech iteracích“, protože přesná data návrhu a schválení nejsou k dispozici. 258 kliknutí a 1 840 zobrazení za první 2 měsíce. Převzetí starého webu bez přístupů včetně domény a hostingu. |
| **Mattina Café** (Bratislava) | Dvojjazyčný web hotový měsíc před otevřením kavárny. Spolupráce čistě na dálku. Klientka si Pavla vybrala na Upworku. Počet ostatních uchazečů není známý, proto se nepíše nic jako „nejlepší ze všech kandidátů". |
| **Global Accord Strategies** | 8 dní od zadání ke spuštění, za 8 dní byl web celý venku (upřesněno 15. 10. 2026). Dřívější „8 dní od zadání ke schválení“ **neplatí** a nesmí se do textů vracet. 9 stránek na klíč. Druhá zakázka od stejné klientky, celkem má u Pavla 3 zakázky. Třetí byl úklid a nová sekce na hotovém webu na WordPressu; vlastní kartu ani studii nemá a na webu stojí jen jako půlvěta v bloku „Tři zakázky od jedné klientky“ na /reference. Čí ten web byl, není jisté (klientka pracuje pro firmu, která dělá promo menším firmám), proto se píše neutrálně „na hotovém webu na WordPressu“ a název se neuvádí. |
| **Svatební web** | 11 dní. 30 vyplněných formulářů za 51 hostů. Web měl žít jen do svatby, dnes neběží — existuje jen ukázková verze. |

- Čísla z vyhledávání pocházejí z **Google Search Console**.
- Tabulka hostů ze svatebního webu se **nikdy nepublikuje**.
- Skutečné ceny těchto zakázek se **nezveřejňují**.

### Klasifikace studií pro cenová pásma

Řídí větu „Podobné projekty dnes vycházejí od {částka}. Přesné balíčky najdete v ceníku."

| Studie | Typ | Pásmo |
|---|---|---|
| Mlýn Janderov | jednostránkový (navigace = kotvy `#o-nas`, `#kontakt`, `#cenik`) | od 10 000 Kč |
| Svídnický extrém | vícestránkový (samostatné URL `/treninky`, `/zavody`, `/akce`, `/galerie`, `/kontakt`) | od 20 000 Kč |
| Mattina Café | vícestránkový | od 20 000 Kč |
| Global Accord Strategies | vícestránkový (9 stránek) | od 20 000 Kč |
| Svatební web | mimo klasifikaci, vlastní věta | beze změny |

### Citace klientů

Doslovná znění. Zkracovat jedině výpustkou, nikdy nepřepisovat.

**Ing. Petr Schaffer, Mlýn Janderov** — kanonické znění:
> Jsme maximálně spokojení. Pomáhal nám s tvorbou webových stránek a i když to s námi nebylo úplně jednoduché, vše se nakonec podařilo. Výsledek přesně odpovídá naší představě. Budeme i nadále v kontaktu. Doporučujeme.

Vyskytuje se na osmi místech (mřížka referencí na homepage, mřížka referencí na Službách, blockquote na pardubické stránce, /reference ve vlastním řádku, studie Janderov, /o-mne zkráceně, a klíče `reference.janderov.text` + `casestudy.janderov.quote` ve slovníku). Při změně projít všechna. Ve strukturovaných datech citace nejsou, bloky `Review` se z webu odstranily.

**Martin Stebel, Svídnický extrém** — z reference:
> Během spolupráce jsme měli spoustu připomínek a Pavel je vždycky zpracoval bez problémů. Ocenili jsme, že se nebál říct svůj názor, když měl lepší nápad, ale zároveň respektoval, co jsme chtěli. Výsledek předčil naše očekávání.

Ze studie (jiná výpověď, ne zkrácení té první):
> Rozvržení stránky super, jsem nadšený. Úplně super, přehledné a nepřeplácané.

**Ivana Lenčéšová, Global Accord Strategies** (slovensky, nepřekládat):
> Postaral sa o celý web od začiatku do konca. Vyriešil texty, fotky aj technickú stránku, takže sme sa do toho nemuseli vôbec zapájať. Spoľahlivá a bezproblémová spolupráca.

**Ivana Lenčéšová, Mattina Café** (slovensky, nepřekládat):
> So spoluprácou som veľmi spokojná, všetko bolo urobené podľa našich predstáv, dokonca aj texty prvých blogov. Ďakujeme.

**Lucia, za snoubence** (svatební web, slovensky, nepřekládat):
> Pozreli sme si to. Musím povedať, že je to úžasné, dali ste si záležať aj na detailoch, ku ktorým sme vám nedali žiadne informácie.

Stojí ve svatební studii a od 16. 10. 2026 i na /reference.

### Anglická verze

> Dokud běží česká fáze (viz „Postup: nejdřív čeština, angličtina potom"), anglické stránky se neupravují. Změny pro angličtinu se zapisují do seznamu „Čeká na přenos do EN".

- **Dvanáct stránek pod `/en/`:** `/en/`, `/en/web-design-pricing`, `/en/projects`, `/en/references`, `/en/about`, `/en/contact`, `/en/privacy` a pět studií `/en/projects/mattina-cafe`, `/en/projects/global-accord-strategies`, `/en/projects/svidnicky-extrem`, `/en/projects/mlyn-janderov`, `/en/projects/wedding-website`. Každá má vlastní `<title>`, description, canonical a `lang="en"`.
- **Přeložených je všech pět studií.** Anglická URL svatebního webu je `/en/projects/wedding-website`, ne doslovný překlad české cesty. Studie se propojují do kruhu v pořadí Mattina → Global Accord → Svídnický extrém → Mlýn Janderov → Wedding website → Mattina, tedy podle pořadí karet na `/en/projects`. Česká větev má vlastní pořadí i vlastní kruh, nezrcadlí se.
- **Nepřekládá se pardubická landing page.** To je jediná obsahová stránka, která EN protějšek nemá.
- **Ceny v eurech**, zaokrouhlené nahoru jako rezerva na kurz. Jednostránkový web **€400 to €600**, vícestránkový **€800 to €1,150**, **správa a rozvoj od €20 měsíčně**. Provoz webu 50 € ročně, u WordPressu 60 – 120 € ročně. Pod ceníkem stojí, že jde o orientační rozpětí a závazná je cena v nabídce.
  - **Zdroj pravdy je český ceník v tabulce výš**, eura se z něj počítají kurzem 25 Kč za euro se zaokrouhlením nahoru. 15 000 Kč dává €600, 28 000 Kč dává 1 120 a nahoru €1,150. Když se hne český ceník, přepočítají se i eura, nikdy naopak. Spodní hranice €400 a €800 odpovídají 10 000 a 20 000 Kč.
  - **Hodnoty €650 a €1,400 neplatí** a nesmí se do textů vracet. Byly na webu 27. 8. 2026 půl dne, protože vzešly ze zastaralého zadání se stropy 16 000 a 35 000 Kč. Ty částky v žádném ceníku nestojí a nikde na webu nikdy nebyly.
  - **Rozsah se v angličtině píše slovem `to`, nikdy pomlčkou.** Platí pro `<title>`, `description`, `og:` a `twitter:` metadata, JSON‑LD, cenové karty i řádek s provozem WordPressu, kde se sází `€400&nbsp;to&nbsp;€600`, aby se rozsah nezlomil. V EN větvi není ani jeden `&ndash;`. Česká větev pomlčku v číselném rozsahu nechává. Kotvy `from €400` a `from €800` ve studiích, na `/en/`, `/en/about`, `/en/contact` a `/en/references` se stropem nemění.
- **DPH v angličtině:** „I don't charge VAT. The amount in your quote is exactly what you pay me. If you're a VAT-registered business in the EU, the reverse charge applies and you account for VAT on your side." Česká věta „ceny jsou konečné" se do angličtiny nepřebírá doslova.
- **Angličtina má vlastní pravidla**, česká se nepřenášejí. Britský pravopis, stažené tvary (I'm, don't, you're), žádné em/en dash uprostřed věty, žádné „It's not just X, it's Y". Citace klientů se překládají a označují „(translated from Czech / Slovak)".
- **Reciproční hreflang** má dvanáct párů. Bez protějšku zůstává jen pardubická landing page a obě 404, ty hreflang nemají. Přepínač na pardubické stránce vede na `/en/`, na české 404 na `/en/`, na anglické na `/`.
- **404 existuje v obou jazycích:** `/404.html` česky, `/en/404.html` anglicky. Obě jsou `noindex, follow`, bez canonicalu, bez hreflang a nejsou v sitemapě. Cloudflare je nerozlišuje podle jazyka, ale podle adresáře: `not_found_handling: "404-page"` servíruje nejbližší `404.html` směrem nahoru, takže `/en/cokoliv` i `/en/projects/cokoliv` dostane anglickou, zbytek webu českou. Kdyby `en/404.html` zmizel, anglická větev tiše spadne zpátky na českou stránku. Každá 404 má dole jeden odstavec v druhém jazyce s odkazem na druhou větev.
- **Svatební web má v EN stejné cenové pásmo jako v češtině, tedy €400.** V klasifikaci studií je mimo pásma a má vlastní větu. Kdyby EN řekla €800, byl by to rozpor mezi jazykovými verzemi o ceně téhož projektu.
- **EN větev nepíše „across Europe".** Patička zní `Czech Republic · working remotely worldwide`, kontaktní blok `Based in the Czech Republic, working remotely worldwide`, ověřovací karta na /en/about `Working remotely worldwide`, v běžícím textu a v `description` strukturovaných dat stojí „for clients abroad". Důvod je věcný: Global Accord Strategies byla zakázka pro klienta v New Yorku, takže Evropa je nepravdivé zúžení. Česká patička „pracuju po celé ČR i v zahraničí" je předloha, EN se od ní odchýlila omylem. Opraveno 26. 8. 2026 na 21 místech ve 13 souborech.
  - **New York se nikde nepublikuje**, ani v EN, ani v české studii. Je to interní důvod pro znění, ne tvrzení na web.
  - **Dvě věci zůstávají evropské, a to schválně.** Časové pásmo („from Lisbon to Helsinki" na /en/about, „the whole of Europe" ve FAQ na /en/web-design-pricing) je tvrzení o překryvu pracovní doby, ne o tom, kde bydlí klienti; s New Yorkem se CET překrývá jen odpoledne, takže „worldwide" by tam byla lež opačným směrem. `areaServed` v JSON-LD (`Czech Republic`, `Slovakia`, `Continent: Europe`) je cílicí signál pro vyhledávače, ne výčet minulých zakázek, a přepis na „Worldwide" by jen rozmělnil CZ/SK relevanci.
- **Český kontext se v EN vysvětluje, nepřekládá doslova.** Překážkový závod je pojmenovaný přes žánr, který zná svět, sport:base má půl věty vysvětlení, tištěné svatební oznámení dostalo větu o tom, že je to tady standard. Reálie, které nesou příběh (mlýn z roku 1540, web bez přístupů), zůstávají.

### Pavel a rozsah práce

- Pavel Fuxa, Svídnice u Chrudimi, IČO 29618843.
- Pracuje po celé ČR, pro Slovensko i zahraničí.
- Vystudoval počítačovou grafiku na SPŠE a VOŠ v Pardubicích, kód se doučil.
- Staví v čistém kódu, na WordPressu nebo ve Frameru, podle projektu.
- **Design dělá vlastní, od prázdné plochy.** Na šabloně staví jen tehdy, když si ji klient sám vybere a chce ji, tak vznikl web Global Accord Strategies. Na webu to říká otázka „Děláte vlastní design, nebo šablony?" ve FAQ na Službách (a anglicky na `/en/web-design-pricing`). Šablona se jako levnější nebo rychlejší varianta nenabízí.
- **Výčet dosavadních zakázek se píše konkrétně, ne kategoriemi.** Penziony ani řemeslníky Pavel zatím nedělal, takže do vět o tom, komu weby stavěl, nepatří. V ceníkových kartách („Pro firmy, restaurace a penziony") zůstávají, tam popisují, pro koho je balíček. Věta „Většina klientů je z Pardubicka" se vrátí, až budou venku rozpracované místní weby, do té doby platí „část z Pardubicka, část ze Slovenska a ze zahraničí".
- **Nedělá:** focení, správu sociálních sítí a placenou reklamu, měsíční SEO paušály, weby „do konce týdne".
- **Propojení s majiteli referenčních webů** se nenabízí samo od sebe, domlouvá se na vyžádání.

---

## Technické poznámky k textům

- **Obsah je statický v HTML, v obou jazycích.** Runtime přepínání se zrušilo. Každá jazyková verze má vlastní soubor a vlastní URL, za běhu se nepřepisuje nic. Jazyk se bere z atributu `lang` na `<html>`, žádný `pf_lang` už neexistuje.
- **`js/translations.js` není engine, je to jen slovník a funkce `t()`.** Žádný `applyTranslations`, žádné zpracování `data-i18n`. Zbylo v něm **15 klíčů pro každý jazyk** a jen ty, jejichž text v HTML vůbec nestojí a vzniká až v prohlížeči:
  - cookie lišta, 8 klíčů `cookie.*` (staví ji celou `js/site-prefs.js`)
  - stavy a validace kontaktního formuláře, 6 klíčů `form.*` (`js/main.js`)
  - popisek zavření lightboxu ve studiích, `lightbox.close` (`js/main.js`)

  Nic dalšího tam nepatří. Když text stojí v HTML, patří jen do HTML. `window.i18n` umí `getLang()` a `t(key)`, nic víc.
- **Cenové věty studií jsou staticky v HTML**, v každé studii vlastní, česky i anglicky. Dřívější mechanismus s klíčem `cspage.price.html` a tokenem `{amount}` **už neexistuje** a atributy `data-i18n-html` / `data-i18n-amount` z cenových vět zmizely. Když přibude studie, napiš jí cenovou větu rovnou do HTML a řiď se tabulkou Klasifikace studií pro cenová pásma.
- **Mrtvé `data-i18n*` atributy jsou z HTML pryč.** Úklid proběhl 25. 8. 2026: odstraněno 957 atributů ze 14 českých souborů (914 `data-i18n`, 24 `data-i18n-html`, 13 `data-i18n-aria`, 12 `data-i18n-placeholder`), tedy všechny, které mířily na klíč mimo slovník. Anglické stránky žádné neměly.

  V HTML zůstalo **6 atributů**, `data-i18n="form.submit"` a `data-i18n="form.contact.hint"` na třech stránkách s formulářem. Míří na existující klíče, ale i ty jsou jen značka pro čtenáře kódu: ten text nastavuje `main.js` přímým voláním `t()`, ne přes atribut. Nové `data-i18n*` se nepřidávají.

  **Atributy v HTML nikdo nečte a číst nesmí.** Jediné místo v JS, které `data-i18n` hledá, je `site-prefs.js` (`bar.querySelectorAll('[data-i18n]')`), a je omezené na element cookie lišty, který si skript sám právě postavil přes `innerHTML`, ne na dokument. Atributy si po vyplnění odstraní. Kdyby ten selektor někdo rozšířil na `document`, přepsal by obsah stránky klíči místo textu.
- **Homepage nemá plný ceník, má seznam „Služby a ceny" hned pod projekty.** Od 12. 10. 2026 jsou původní tři služby a ceník sloučené do jedné sekce `#sluzby`: čtyři řádky (Nový web na míru, Redesign, Správa a rozvoj, Logo a tiskoviny), každý s cenou a mono popiskem, a pod nimi odstavec s náročnějšími weby, DPH a odkazem na ceník a pardubickou stránku. Karty s checklisty a pás „Doplněk k webu" zůstaly jen na Službách. Anglická homepage má stejnou sekci se stejným CSS, jen s eurovými cenami. Pořadí homepage je od 12. 10. 2026 hero, projekty, služby a ceny, reference, o mně, FAQ „Než napíšete“ (od 15. 10. 2026), kontakt: H1 už cenu říká, takže hned pod ním jde důkaz, ne druhý ceník. Na homepage jsou tři karty projektů v pořadí Mattina Café (zvýrazněná), Svatební web, Mlýn Janderov. Karta Mattiny se všude jmenuje „Mattina Café“, ne „Mattina“. Sekce Reference a Projekty nemají podnadpis, Reference ani štítek nad nadpisem. Reference na homepage jsou tři pevné karty (Mlýn Janderov, Svídnický extrém, Global Accord Strategies) a pod nadpisem hodnocení z Googlu a Firmy.cz s odkazem na profil. **Počet hodnocení musí sedět s tím, co ukazuje profil** (12. 10. 2026: Google 5,0 ze 3 recenzí, Firmy.cz 5,0 z 1 hodnocení). Když přibude recenze, přepsat číslo i `aria-label`, na homepage i na /reference (stejná komponenta pod nadpisem hera). Hvězdy jsou jen u souhrnu, ne na kartách, citace na kartách nejsou recenze z profilu. **Podoba karty od 15. 10. 2026** (`.ref-card` v `.references-grid`, CSS ve `style.css`, stejná karta i mřížka je na homepage i na Službách): nahoře kulaté logo klienta, vedle něj název firmy písmem nadpisů a pod ním jméno, potom citace bez uvozovek na plné ploše, dole za linkou jeden fakt ze studie (Spuštěno za 6 dní, Spuštěno za 18 dní, Druhá zakázka; u Global Accord schválně kratší než „Druhá zakázka od stejné klientky“ na /projekty, kvůli pravidlu 8 a protože delší znění se na 320 px a kolem 1024 px nevejde vedle tlačítka Studie) a tlačítko Studie, které je vidět i bez najetí myší. Horní část karty má slabý nádech barvy z loga klienta (`--tint` na kartě: Janderov `#8B4A12`, Svídnický extrém `#B3262B`, Global Accord `#2A8C82`). Nádech musí zůstat takhle slabý a bez záře kolem karty, jinak z něj je dekorace. Logo Janderova je jejich favicon. Rozostřený náhled webu v pozadí se odstranil, citace na něm byla špatně čitelná. Služby mají tři karty v pořadí Mattina Café (`#7A5536`, „Měsíc před otevřením“), Svídnický extrém, Mlýn Janderov. Mattina je tam místo Global Accord, protože na homepage je hlavní kartou projektů a na Službách tak nic neopakuje. Pořadí drží dva hnědé nádechy (Mattina a Janderov) od sebe. Fakt se smí zalomit do dvou řádků (Mattina na 320 px), tlačítko Studie zůstává vpravo, `.ref-card-foot` se schválně nezalamuje. Stará `.reference-card` s rozostřeným náhledem zůstává ve `style.css` jen kvůli marquee v anglické větvi, po dorovnání EN ji smazat i s obrázky `assets/ref-bg-*.webp`. Pod ceníkem je časová osa „Kdy co platíte“ se čtyřmi kroky. **FAQ „Než napíšete“ před kontaktem** (`#faq`, CSS v `index.html`, karty stejné jako FAQ na Službách) má jen tři otázky, které brání poslat poptávku: Co když se mi návrh nelíbí, Kolik práce to dá mně (podklady), Komu patří doména a web. Víc otázek nepřidávat, plné FAQ je na Službách a odkazuje se na něj. Odpověď o doméně je převzatá ze sekce Provoz na Službách; když se Provoz změní nebo zmizí, musí se zkontrolovat i tahle odpověď.
- **Pás „Doplněk k webu"** má dvě položky (Správa a rozvoj, Logo a tiskoviny) a žije na Službách a na `/en/web-design-pricing`, každá stránka s vlastní kopií CSS. Položka bez checklistu používá `.care-band--duo`; třetí stopa mřížky má dno `minmax(250px, 0.8fr)` v px, protože root font je fluidní a v `rem` by se dno pod 1280 px scvrklo.
- **Ceník má pod 400 px vlastní stupeň, jinak se rozsype.** Cena v pásu má `white-space: nowrap`, a protože jednosloupcová mřížka roste podle min-contentu, roztáhla „od 400 Kč / měsíc" sloupec na 250 px a cena i checklist lezly přes okraj karty. Proto `.care-band-cta .price-amount` klesá pod 400 px na 0,85 a pod 350 px na 0,72 násobku `--fs-2xl`. Ve stejném bloku má tlačítko v kartách a v pásu vodorovnou výplň jen `var(--space-md)` a šipka ve zvýhodněné kartě je schovaná, aby se „Nezávazná poptávka" vešla na jeden řádek: 198 px šířky minus 32 px výplně stačí na 156 px textu, se šipkou a mezerou by zbylo 144 px a popisek by se zalomil. Ověřeno na 320 až 430 px na stránkách s ceníkem (dnes Služby a `/en/web-design-pricing`).
- **Sloupce patičky drží `.footer > .container`, obě řady se do nich zavěšují přes `grid-template-columns: subgrid`.** Horní mřížka (Kontakt, Navigace, Najdete mě) i spodní řada (copyright, Ochrana osobních údajů, Nastavení cookies) tak stojí na stejných třech stopách. Kdyby měla každá řada vlastní mřížku, prostřední položka spodní řady by seděla o kus jinde než sloupec Navigace nad ní: třetí stopa je široká podle obsahu, tedy podle řady pěti ikon nahoře a podle jednoho tlačítka dole, takže by se sloupce `1fr` spočítaly jinak. Rozdíl byl asi 45 px a četl se jako nedovřené zarovnání. Mezera sloupců patří kontejneru, ne řadám, `column-gap` u subgridu se ignoruje. Pod 768 px se kontejner vrací na `display: block`, mřížka na jeden sloupec a spodní řada na flex zarovnaný vlevo. Mezi zhruba 769 a 1010 px se copyright láme do dvou řádků, protože první sloupec je užší než jeho text; je to záměr, ne chyba, dva řádky drobného textu sedí pod dvouřádkovou adresou ve stejném sloupci.
- **EN verze stojí od 24. 8. 2026.** Dvanáct statických stránek pod `/en/`, postavených z `podklady/reports/en-copy.md`. Není to překlad českého webu, je to menší web pro jiné publikum ze stejných faktů. Jediná stránka bez anglického protějšku je pardubická landing page. Přepínač jazyka jsou odkazy `<a href>`, ne JS. Páry a hreflang viz sekce Anglická verze.
- **Hero na homepage je pětivrstvý sendvič a jeho maska je vázaná na současnou fotku.** Pořadí zdola: ztmavení, plný bílý nápis, fotka, obtahová kopie nápisu, maskovaná kopie fotky. Ta poslední vrstva (`.hero-photo--front`) je dekorativní duplikát se `alt=""` a `aria-hidden="true"`, existuje jen proto, aby obtah nekřížil obličej. Maskuje se přes `linear-gradient(180deg, #000 0 36%, transparent 44%)` a pracuje v souřadnicích fotky, ne okna, takže platí na každém poměru stran. **Hodnoty 36 % a 44 % jsou vyladěné na `assets/hero-sekce.webp`.** Až se fotka vymění, maska se musí přeladit na novou pozici hlavy a celé hero projít znovu, jinak buď obtah vyleze do tváře, nebo maska zhasne kus saka. Pod 768 px je obtahová vrstva vypnutá a maskovaná kopie s ní.
- **Hero má dva přechody a každý má jinou logiku.** Mobilní je `.hero-typo-wrap::after`, kryje spodních 62 % a leží na vrstvě 2, tedy **pod typografií**: má oddělit text od saka, proto smí být silný. Desktopový je `.hero-scrim`, kryje spodních 28 % a leží na vrstvě 5, tedy **nad fotkou**: má rozpustit spodní hranu fotky, která bez něj končí rovným řezem, protože `.hero-fade` leží pod fotkou a dosáhne jen na kouřové pozadí. Nesmí se prohodit ani sjednotit. Mobilních 62 % by na desktopu srazilo jas nápisu o 64 %, desktopových 28 % by na mobilu neoddělilo text. `.hero-scrim` musí zůstat potomkem `.hero`, ne wrapperu, jinak by kvůli odsazení kontejneru 3vw nedosáhl ke krajům. **Při výměně fotky se ladí oba přechody spolu s maskou hlavy**, protože všechny tři pracují s tím, kde na fotce co leží.
- **Hero pod 768 px je stejný sendvič, jen jinak rozvržený.** Od 25. 8. 2026 už fotka není poslední položkou sloupce. Je pozadím celé sekce, 90 % výšky okna, kotvená ke spodní hraně, po stranách oříznutá. Přes ni jde přechod do `var(--color-bg-primary)` v dolních 62 %, typografie začíná ve 45 % výšky okna, tedy pod bradou, a věta s tlačítky sedí dole. Obtahová vrstva i maskovaná kopie fotky zůstávají na mobilu vypnuté. Tlačítka zůstávají pod sebou, vedle sebe se do 320 px nevejdou (potřebují 365 px, k dispozici je 288).
- **Míra 45vh je odvozená z výšky fotky, ne odhadnutá.** Brada leží v `100 − 0,646 × výška fotky`, u 90vh tedy ve 41,9vh. Když se změní výška fotky, musí se přepočítat i odsazení typografie, jinak nápis vleze do obličeje. Platí tu totéž co u masky na desktopu: čísla jsou vázaná na `assets/hero-sekce.webp`.
- **Odsazení typografie je `max(45vh, calc(100vh - 30rem))`, druhá větev řeší vysoká úzká okna.** Nápis visí na bradě, věta s tlačítky na spodní hraně, takže čím vyšší okno, tím větší díra mezi nimi. Na tabletu na výšku (768 × 1024) měřila 184 px, po opravě 101 px. Konstanta 30rem je odladěná tak, aby se obě větve protnuly až na 873 px výšky okna: běžné telefony zůstávají na 45vh a vykreslí se do posledního pixelu stejně jako předtím, ověřeno porovnáním snímků. **Opačný postup, tedy zvednout větu a tlačítka nahoru, nefunguje:** na 768 × 1024 dosednou na slovo DEVELOPER, díra se jen přesune pod tlačítka a naroste ze 184 na 259 px, a text se posune z místa, kde má mobilní přechod krytí 0,82, do místa s krytím 0,50.
- **Mobilní typografie má strop 30vw a dvojí ošetření čitelnosti.** WEB je 30 % šířky okna, dvojice pod ním 13,8 %. Nad 30vw se nápis začne ořezávat, protože se řádek nezalamuje: na 375 px měří 336 px a nechává 19 px na kraji, na 320 px měří 289 px a nechává 16 px. Písmo leží na saku, ale prochází přes kravatu a límec, kde je fotka světlá, proto má měkký stín (odsazení od plochy) i jemný obtah 2 px v 50% kryvosti (tvrdá hrana proti světlému detailu). Obtah se kreslí přes `paint-order: stroke fill`, tedy pod výplň a vně písmene. Bez toho by seděl na střed obrysu, ubral by z bílé a Bebas by zhubla. Metriku písma nemění, na rozložení tedy nesahá.
- **Tři výjimky z mobilního hera.** Pod 340 px je fotka 96vh a typografie od 41vh, protože anglický nadpis se tam láme do tří řádků místo dvou a jinak by na něj nápis dosedl. Pod 768 px a zároveň pod 560 px výšky (telefon na šířku) má typografie strop ve vh, jinak by 25vw byla třetina obrazovky. Perex `.hero-lead` je schovaný při výšce okna pod 740 px, protože potřebuje zhruba 75 px navíc; do okna vysokého 701 px se vejde, do 640 už ne. Na velkých telefonech tedy zůstává.
- **Věta s tlačítky v heru sedí na desktopu 6vh ode dna** (od 15. 10. 2026, dřív 3.5vh a tlačítka byla skoro na hraně okna). Nápis je o stejných 2.5vh výš (`17.5vh` v `padding-bottom`), mezera mezi DEVELOPER a H1 se tím nezměnila. H1 a perex jsou těsně u sebe, tlačítka jsou samostatné patro. Na mobilu se nic nezměnilo.
- **Hero na `/` a `/en/` má jedno CSS, řádek po řádku shodné.** Liší se jen texty, cíle odkazů a to, že anglická větev píše cesty k assetům absolutně. Perex `.hero-lead` je v obou. Česky od 14. 10. 2026 „Návrh hlavní stránky je zdarma. Platíte, až když se vám líbí.“ (dřív „Dělám ho celý sám, od návrhu po spuštění, včetně textů.“), anglicky zatím pořád „One person does all of it, from the first sketch to launch. Copy included." Změna v jednom hero se musí udělat v obou.
- **Značka je od 26. 8. 2026 vektor, ne obrázek s filtrem.** V navigaci stojí `assets/brand/fs-logo-nav.svg` s barvou `#EDEDED` zapečenou v souboru, tedy `--color-text-primary`. Dřívější `assets/logo-nav.webp` s `filter: grayscale(1) brightness(2.5)` **se nesmí vrátit**, byl to jen náhradník, než přijde odbarvené logo. Čistou bílou logu nedávat, plná plocha působí opticky jasněji než písmo vedle a nejsvětlejší prvek lišty má být aktivní položka navigace, ne značka. `currentColor` tu nic nekoupí, web nemá light mode, tiskové styly ani světlé sekce. Soubor má vlastní `width` a `height`, bez nich si některé enginy vnitřní rozměr SVG v `<img>` dopočítají na výchozích 300 px.
- **V rootu leží jen `favicon.ico` a `apple-touch-icon.png`, zbytek značky je v `assets/brand/`.** Ty dva soubory tam musí zůstat, protože si na ně prohlížeče, crawleři a iOS sahají naslepo i bez odkazu. `icon.svg`, `icon-192.png`, `icon-512.png`, `site.webmanifest` a `fs-logo-nav.svg` jsou v `assets/brand/`, odkazuje na ně všech 27 stránek absolutními cestami. `favicon.ico` nese 16, 32 i 48 px v jednom souboru, proto u něj `sizes="32x32"` sedí. **V `_redirects` nesmí být pravidlo na `/favicon.ico`**, do 27. 8. 2026 tam jedno bylo a přesměrovávalo na starou modrou `assets/favicon.png`, takže by novou ikonu tiše přebilo. **Dlaždice u webu je bílá `#FAFAFA` se značkou `#141414`, na sítích zůstává modrá `#2F4BFF`.** Rozhoduje sousedství: favicon visí nad stránkou bez jediné barvy, profilovka sedí ve feedu mezi cizími barevnými logy, kde monochrom zmizí. Tmavá dlaždice není řešení ani pro jedno, rozplyne se v tmavém motivu Chromu i na Instagramu. PWA ikony mají `"purpose": "any maskable"` a značku zmenšenou na 97 %, jinak by jí Android při kulaté masce ukousl kraje F a S. **Zdroje značky v repozitáři nejsou.** Vektorový master, profilovky na sítě a logo pro tisk si Pavel drží ve vlastní složce mimo projekt, včetně README, které říká, co je k čemu. V repozitáři leží jen hotové výstupy vyjmenované výš. Pravidlo `loga` v `.assetsignore` zůstává jako pojistka pro případ, že by se ta složka někdy do projektu zase objevila.
- **Šířka obsahu je od 12. 10. 2026 větší.** `--container-max` je 1480 px a `--container-padding` je `clamp(1.5rem, 5vw, 4rem)`. Dřív to bylo 1200 px a 3rem a obsah působil na noteboocích i velkých monitorech stažený doprostřed, navbar byl pod 1220 px namačkaný doprava. Úzké kontejnery (`--container-mid`, `--container-prose`) se nezměnily, odstavce tedy nejsou delší. Portrét v sekci O mně má strop `max-width: 32rem`, jinak by v širokém sloupci narostl přes celou obrazovku. Atributy `sizes` u obrázků jsou přepočítané na novou šířku (studie 1352 px, karty projektů 650 a 740 px).
- **Web nemá dekorativní efekty pod kurzorem.** Magnetická tlačítka a 3D náklon karet projektů se 12. 10. 2026 z `main.js` odstranily, karta při najetí už ani neposkakuje nahoru. Jsou to přesně ty efekty, před kterými studie Global Accord Strategies varuje jako před „AI dojmem", a vlastní web jim nesmí odporovat. Nevracet. Zůstává jen kouřový shader v heru a objevování sekcí při scrollu. Marquee referencí zbývá jen na `/en/` a `/en/web-design-pricing` (pauza při najetí myší, dotyku i fokusu z klávesnice, při `prefers-reduced-motion` stojí), dokud se angličtina nedorovná. Česká homepage ho nemá od 12. 10. 2026, Služby od 15. 10. 2026, reference tam stojí ve třech kartách vedle sebe.
- **Štítky nad nadpisy nemají čárku a štítek „Připraveni?" / „Ready?" nad závěrečnou výzvou neexistuje.** Obojí se odstranilo jako typický znak generovaných landing pages. Nadpis výzvy stojí sám.
- **Patička nemá velký nápis FUXASTUDIO přes spodní hranu.** Vodoznak `.footer-watermark` se odstranil z HTML i CSS. Byl širší než kontejner, nezalamoval se a přetékal jen doprava, takže nikdy neseděl na střed. Malé logo nahoře v patičce zůstává.
- **Přepínač jazyka ukazuje jen jazyk, na který klik přepne** (na české stránce „EN", na anglické „CS"). Aktuální jazyk je vidět z obsahu, druhý štítek byl ozdoba a ubíral místo v navigaci.
- **FAQ na Službách a `/en/web-design-pricing` se rozbaluje plynule** přes `::details-content` a `interpolate-size` ve `style.css`. Prohlížeče, které to neumí, otevřou odpověď skokem. Česká FAQ má deset otázek, sudý počet kvůli dvousloupcové mřížce. Při přidání otázky přidat i druhou, nebo jednu ubrat.
- **Studie na telefonu (pod 600 px) ukazují náhled webu hned pod perexem**, souhrn Klient / Obor / Rozsah / Živý web jde až za něj (`order` v `case-study.css`). Jinak by první obrazovka studie neměla jediný obrázek.
