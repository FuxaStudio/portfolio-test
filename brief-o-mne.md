# Brief: Přestavba stránky O mně — fuxastudio.cz

## Kontext a cíl

Současná stránka O mně má dobré texty, ale nic nedokazuje: není na ní jediné číslo, reference, náhled projektu ani jméno klienta. Hero zabírá celý první viewport obřím nápisem „O Mně" bez sdělení. Sekce Technologie mluví na vývojáře, ne na majitele restaurací a penzionů.

**Cíl přestavby:** proměnit stránku z vizitky na konverzní stránku. Návštěvník, který sem přijde, zvažuje poptávku — stránka mu má dát důkazy (čísla, citace, ukázky) a dovést ho k CTA.

**Poměr obsahu:** ~70 % o tom, co klient dostane, ~30 % osobní příběh.

## Co zachovat beze změny

- Dark design systém, typografie (Geist / Geist Mono), navigace, patička.
- Hlavní CTA „Nezávazná poptávka" a slib odpovědi do 24 hodin.
- Jádro stávajících odstavců příběhu — jsou dobré, jen se přeskládají (viz sekce 3).
- Sekce procesu „Od nápadu k hotovému webu" (jen drobné úpravy, viz sekce 5).

## Globální opravy

1. **Typografie názvu:** všude „O mně", nikdy „O Mně". Velké M v H1 je anglicismus. Zkontrolovat H1, `<title>`, breadcrumbs i interní odkazy.
2. **Kontrast textu:** body copy musí splňovat WCAG AA (4,5:1) proti pozadí. Cílovka je často 45–60 let a čte na levném notebooku.
3. **Mono all-caps mikropopisky** (eyebrow labely) ponechat, ale nezvětšovat jejich počet — jsou dekorace, ne nosič informace.

---

## Pořadí sekcí (nová struktura)

1. Hero — poziční headline + fotka + CTA
2. Pás čísel (důkazy)
3. Příběh — „Kdo vám bude web dělat"
4. Čím se liším — 3 karty
5. Jak pracuji — proces (stávající, upravené)
6. Co ode mě dostanete (nahrazuje sekci Technologie)
7. Reference — 2 citace + odkazy na externí recenze
8. Ukázky práce — 2–3 projekty s prolinkem
9. Mimo práci — osobní tečka
10. Závěrečné CTA

---

## Sekce 1: Hero

**Layout:** dva sloupce — vlevo text, vpravo fotka (na mobilu fotka pod textem). Žádný celoobrazovkový nápis „O Mně" — název stránky se zmenší na eyebrow. Návštěvník musí bez scrollu vidět headline, fotku i tlačítko.

**Obsah:**

```text
Eyebrow: — O mně

H1: Navrhuju a kóduju weby, které malým firmám přivádějí zákazníky.

Podnadpis: Jsem Pavel Fuxa. Vystudovaný grafik, který umí programovat —
web navrhnu i postavím, od první skici po spuštění.

CTA primární: Nezávazná poptávka
CTA sekundární: Prohlédnout projekty  → odkaz na Projekty
```

Alternativní H1 (pokud by primární kolidoval s headlinem homepage): `Jeden člověk na celý web — od návrhu po spuštění.`

**Fotka — dočasné řešení:** současná fotka (oblek, červená kravata, živý plot) působí jako z promoce a jde proti neformálnímu tónu textů. Než vznikne nová, převést současnou do ČB (grayscale, zvednout kontrast, ořez těsněji na hlavu a ramena) — ztlumí se kravata i zelené pozadí a fotka zapadne do monochrome brandu.

**Fotka — cílový stav** [DOPLNIT: nová fotka]: denní světlo, u pracovního stolu nebo v civilu, košile bez kravaty, přirozený výraz. Fotka má říkat „s tímhle člověkem si budu rozumět".

---

## Sekce 2: Pás čísel

Hned pod hero, 4 položky vedle sebe (na mobilu 2×2). Pravidlo: **malá pravdivá čísla > nafouknutá.** „7 spuštěných webů" zní důvěryhodněji než vymyšlené „50+".

```text
[DOPLNIT: reálný počet] spuštěných webů
5,0 ★ hodnocení na Googlu          [OVĚŘIT: aktuální průměr + počet recenzí]
90+ PageSpeed skóre klientských webů  [OVĚŘIT: reálné průměrné skóre, případně upravit]
< 24 h maximální doba odezvy
```

Pokud některé číslo neobstojí (např. PageSpeed pod 90), nahradit jiným pravdivým: roky praxe s grafikou, počet měst/regionů, počet klientů, kteří se vrátili s další zakázkou.

---

## Sekce 3: Příběh — „Kdo vám bude web dělat"

**Layout:** stávající uspořádání (text + menší fotka) může zůstat. H2 rámovat na klienta, ne na sebe.

**Obsah (finální texty):**

```text
Eyebrow: — Můj příběh
H2: Kdo vám bude web dělat

P1: K webům jsem se dostal přes grafiku. Vystudoval jsem grafický design
a postupně mě začalo lákat návrhy nejen kreslit, ale rovnou je i stavět —
a dělat to po svém. Nejsem grafik, co předá návrh a dál ho neřeší,
ani kodér, kterému je vzhled jedno.

P2: Pro vás to znamená jednu praktickou věc: celý web řešíte s jedním
člověkem. Žádné předávání mezi grafikem, programátorem a projektovým
manažerem, žádná tichá pošta. Co si na začátku domluvíme, to taky
sám postavím.

P3: Nejčastěji pracuju pro malé firmy z Pardubicka a Chrudimska —
penziony, restaurace, řemeslníky a místní služby. Vím, že web pro vás
není hračka, ale investice, která se musí vrátit. Proto se víc než
na efekty soustředím na to, aby vás lidi našli a ozvali se vám.

P4: A po předání nezmizím. Web je pro mě začátek spolupráce, ne konec —
pohlídám, aby fungoval, a když potřebujete něco změnit, píšete přímo mně.
```

Pozn.: P1 a P4 vycházejí ze stávajících textů, které fungují — zachovat jejich vyznění. Vypustit větu „web postavený na míru místo přetažené šablony" (koliduje s case studies postavenými na WordPressu — nevracet anti-šablonovou rétoriku nikde na stránce).

---

## Sekce 4: Čím se liším — 3 karty

**Layout:** 3 karty vedle sebe (na mobilu pod sebou), ikona + titulek + 1–2 věty. Skenovatelné — tohle jsou argumenty vytažené z odstavců ven.

```text
Karta 1
Titulek: Design i kód od jednoho člověka
Text: Vystudoval jsem grafiku a naučil se programovat. Web ode mě
dostanete navržený i postavený — a celou dobu mluvíte s tím,
kdo ho opravdu dělá.

Karta 2
Titulek: Rychlost jako standard
Text: Weby stavím technicky čistě, bez zbytečné zátěže. Načítají se
pod sekundu, fungují na každém telefonu a dobře se umisťují
ve vyhledávání.

Karta 3
Titulek: Po spuštění nezmizím
Text: Předáním web nekončí. Hlídám, aby běžel, řeším aktualizace
a úpravy — a vždycky se dovoláte přímo mně, ne anonymní podpoře.
```

---

## Sekce 5: Jak pracuji — proces

Stávající sekce „Od nápadu k hotovému webu" (Analýza → Design → Vývoj → Optimalizace) **zůstává**, texty kroků jsou v pořádku. Dvě úpravy:

1. Pod poslední krok přidat řádek: `Podrobnosti a ceny najdete na stránce Služby a ceník →` (interní odkaz).
2. Zkontrolovat, že popisky kroků drží kontrast dle WCAG AA.

---

## Sekce 6: Co ode mě dostanete (nahrazuje „Nástroje, které používám")

Sekci s tagy HTML5 / React / Next.js / Git **odstranit z české verze** — cílovka neví, co to je, a spíš ji to znejistí. Nahradit přínosy v řeči klienta. Na anglické verzi stránky (pro Upwork klientelu) může tech stack zůstat.

**Layout:** 4 karty nebo 2×2 grid, ikona + titulek + věta.

```text
Eyebrow: — Co z toho máte
H2: Co ode mě dostanete

1. Web, který lidi najdou
Základy SEO jsou v ceně — struktura, rychlost, popisky. Web předávám
připravený pro vyhledávače, ne jako prázdnou skořápku.

2. Perfektní na mobilu
Většina vašich zákazníků přijde z telefonu. Stavím na to od začátku,
ne jako dodatek na konci.

3. Úpravy bez čekání
Menší změny řeším obratem. A u webů na WordPressu si texty a fotky
upravíte sami, bez volání programátorovi.

4. Napojení, která váš provoz potřebuje
Rezervace, poptávkové formuláře, mapy, měření návštěvnosti —
zapojím to, co vám reálně přivede zákazníky.
```

Volitelně úplně dole malý mono řádek: `Stavím na: HTML/CSS/JS · WordPress · Framer` — nenápadně, pro zvědavé.

---

## Sekce 7: Reference

**Zdroj citací:** převzít ze stávající stránky Reference — texty nevymýšlet. Vybrat **2 citace od 2 různých lidí**:

1. Ing. Petr Schaffer — Mlýn Janderov
2. Martin Stebel — Svídnický Extrém, NEBO Ivana Lenčéšová — u ní přidat popisek: `Klientka se po prvním webu vrátila s druhou zakázkou.` (silnější důkaz než samotná citace)

**Formát citace:** text + celé jméno + firma + (pokud existuje) malé logo nebo fotka projektu. Žádné anonymní iniciály.

**Pod citacemi řádek s externími odkazy** (otevírat v novém tabu):

```text
Recenze na Googlu →   (fuxastudio.cz/google)
Firmy.cz →            (fuxastudio.cz/seznam)
Všechny reference →   (interní odkaz na stránku Reference)
```

**Důležité:** NEpřidávat na vlastní web Review/AggregateRating schema — recenze na sebe sama na vlastní doméně Google ignoruje a je to proti guidelines.

---

## Sekce 8: Ukázky práce

Krátký pás 2–3 projektů — člověk čtoucí O mně má cestou **vidět** práci, ne o ní jen číst. Použít existující thumbnaily ze stránky Projekty, žádná nová grafika.

```text
Eyebrow: — Ukázky
H2: Weby, které už slouží

Karta: Mlýn Janderov — web pro penzion a mlýn  → case study
Karta: Svídnický Extrém — web pro sportovní akci  → case study
Karta: [DOPLNIT: třetí projekt dle uvážení, např. Mattina]

CTA pod kartami: Všechny projekty →
```

Ke každé kartě jeden řádek výsledku v řeči klienta (např. „126 lidí z Googlu za tři měsíce" u Svídnického Extrému — [OVĚŘIT aktuální číslo v GA4/GSC]). Žádná designérská čísla typu CTR.

---

## Sekce 9: Mimo práci

Krátká lidská tečka — 2–3 věty + jedna neformální fotka (pracovní kout, trénink, vesnice). Návrh textu, [UPRAVIT podle toho, co chceš sdílet]:

```text
Eyebrow: — Mimo práci
Text: Žiju ve Svídnici u Chrudimi — na vesnici, odkud pocházím a odkud
se mi nikam nechce. Když nesedím u kódu, posiluju (většinou o půlnoci)
a ladím vlastní projekty, na kterých zkouším věci, které pak stejně
skončí v práci pro klienty.
```

Nezmiňovat trading/krypto — pro konzervativní SMB klientelu to není signál důvěry.

---

## Sekce 10: Závěrečné CTA

Stávající sekce „Máte nápad na web?" zůstává, rozšířit o přímé kontakty (řemeslníci radši volají, než vyplňují formuláře):

```text
Eyebrow: — Připraveni?
H2: Máte nápad na web?
Text: Napište mi pár vět o tom, co potřebujete. Do 24 hodin se ozvu —
bez závazků a bez obchodních kliček.

CTA: Nezávazná poptávka →

Řádek pod tlačítkem: Nebo rovnou: +420 736 131 410 · fuxa@fuxastudio.cz
(telefon jako tel: odkaz, e-mail jako mailto:)
```

---

## SEO a technické pokyny

```text
<title>O mně | Pavel Fuxa — tvorba webů Pardubice a Chrudim</title>

<meta name="description" content="Jsem Pavel Fuxa, grafik a vývojář
ze Svídnice u Chrudimi. Navrhuju a kóduju weby pro malé firmy
z Pardubicka — od návrhu po spuštění, s odpovědí do 24 hodin.">
```

- **H1 pouze jedno** (hero headline). Eyebrow „— O mně" není heading, jen span/p.
- **JSON-LD:** `Person` schema — name, jobTitle („Web designer & developer"), url, address (addressLocality: Svídnice, addressRegion: Pardubický kraj), sameAs (LinkedIn, Google Business Profile, Firmy.cz, Upwork, Instagram, Facebook — dle patičky). **Bez** review/aggregateRating polí.
- **Alt texty:** hero fotka `Pavel Fuxa, webový designér a vývojář ze Svídnice u Chrudimi`; projektové thumbnaily s názvem projektu; neformální fotka popisná.
- **Interní odkazy ze stránky:** Projekty (hero + sekce 8), Reference (sekce 7), Služby a ceník (sekce 5), Tvorba webů Pardubice (pokud stránka existuje — z P3 příběhu odkazovat frázi „firmy z Pardubicka").
- **Lazy-loading** všech obrázků kromě hero fotky.
- Zachovat konzistenci s EN verzí: EN /about může mít tech stack a jiný poměr obsahu (Upwork klientela) — tento brief řeší pouze CS verzi.

## Co NEdělat

- Nevymýšlet čísla ani citace — všechna místa označená [DOPLNIT]/[OVĚŘIT] musí vyplnit Pavel.
- Nevracet anti-šablonovou rétoriku („místo přetažené šablony") — koliduje s case studies.
- Žádný tech žargon v české verzi (React, Next.js, Git…).
- Žádné Review schema na vlastní doméně.
- Neměnit design systém, barvy ani typografii — jen obsah a strukturu stránky.

## Checklist před nasazením

- [ ] Doplněn reálný počet spuštěných webů (pás čísel)
- [ ] Ověřeno hodnocení na Googlu (průměr + počet recenzí)
- [ ] Ověřeno/upraveno PageSpeed číslo
- [ ] Vybrány 2 citace ze stránky Reference (2 různí lidé)
- [ ] Ověřeno číslo návštěvnosti u Svídnického Extrému (GA4/GSC)
- [ ] Upraven text Mimo práci podle toho, co chce Pavel sdílet
- [ ] Současná fotka převedena do ČB (dočasné řešení) / nová fotka nafocena
- [ ] „O Mně" → „O mně" opraveno všude (H1, title, navigace, odkazy)
- [ ] Kontrast body textu ≥ 4,5:1
- [ ] Interní odkazy fungují (Projekty, Reference, Služby a ceník)
