# Audit textů — všechny stránky kromě /o-mne (18. 8. 2026)

Prošlé soubory: index, kontakt, projekty, reference, tvorba-webovych-stranek, tvorba-webovych-stranek-pardubice, ochrana-osobnich-udaju, 404, všech 5 případových studií, js/translations.js (CZ i EN, 581 klíčů v obou jazycích, pokrytí 100 %).

Pozor při opravách: čeština se renderuje z HTML fallbacku, ale tytéž texty jsou i v `js/translations.js` — **každou opravu je nutné udělat na obou místech.**

---

## A. FAKTICKÉ ROZPORY (musí se opravit před nasazením)

### A1. Cena vícestránkového webu: 20 000 vs. 25 000 Kč
- Ceníková karta (index.html, tvorba-webovych-stranek.html, translations `cenik.multipage.amount`): **20 000 – 35 000 Kč**
- `tvorba-webovych-stranek-pardubice.html:102` (JSON-LD FAQ) a `:606` (viditelné FAQ): **„vícestránkový od 25 000 Kč"**
- translations.js CZ `page.cenik.meta` (ř. 36), `sluzbypage.faq.1.a` (ř. 147) + EN protějšky (ř. 673, 784, 815): **od 25 000 Kč**

→ Rozhodnout jedno číslo a sjednotit všude (HTML + translations, CZ + EN).

### A2. Termín vícestránkového webu: 2–3 vs. 3–4 týdny vs. 1–4 týdny
- Ceníková karta + FAQ na /tvorba-webovych-stranek: **2–3 týdny**
- Pardubice FAQ (`:110` JSON-LD, `:614` viditelné): **3–4 týdny**
- Pardubice meta description (`:10`): **„hotový za 1–4 týdny"**
- translations CZ `cenik.faq.2.a` (ř. 100), `page.sluzby.meta` (ř. 38) + EN: 3–4, resp. 1–4 týdny

→ Sjednotit (proces na /tvorba-webovych-stranek říká „Den 14 spuštění", tedy 2–3 týdny sedí nejlíp).

### A3. „Od zadání" vs. „od dodání podkladů"
- index meta + karta projektů: „hotovo do měsíce **od zadání**"
- /tvorba-webovych-stranek hero + FAQ: „od **dodání podkladů**"

Právně/očekávaně je to velký rozdíl. Doporučuji všude „od dodání podkladů" (chrání tebe) — nebo aspoň jednotně.

### A4. Správa webu: „Individuálně" vs. „400 Kč / měsíc"
- translations `cenik.care.price` (CZ ř. 71): „Individuálně" vs. `cenik.care.amount` (ř. 93): „400 Kč / měsíc". Na stránkách je vidět 400 Kč — zkontrolovat, kde se `care.price` používá, případně klíč smazat.

### A5. „Čtyři" vs. „pět" případových studií
- projekty.html: „5 klientských webů" ✓ (aktuální)
- translations `casestudy.subtitle` (CZ ř. 333 / EN ř. 970): „Čtyři skutečné spolupráce" — **zastaralé po přidání svatebního webu**. Zjistit, kde se zobrazuje, a opravit.

### A6. „Jsem z Pardubic" vs. Svídnice u Chrudimi
- Pardubická stránka: „web designer a developer z Pardubic", „od souseda z Pardubic", FAQ „Jsem z Pardubic"
- Footer téže stránky + schema + Firmy.cz: **Svídnice u Chrudimi**
- /tvorba-webovych-stranek: „Pavel Fuxa, Pardubice."

Pozorný zákazník to uvidí na jedné stránce (hero vs. patička). Doporučená formulace: „z Pardubicka" / „od Pardubic" — pravdivé a lokální dotaz to pokrývá stejně.

### A7. „258 lidí" — nejednoznačná metrika
- reference.html: „Za první dva měsíce ho přes Google **našlo 258 lidí**"
- /tvorba-webovych-stranek (fit sekce): „**258 kliků** z Googlu"
- case study Janderov: „258 lidí našlo mlýn přes Google"

Kliky ≠ lidé (jeden člověk může kliknout vícekrát). Sjednotit na „kliknutí z Googlu (Search Console)" — je to přesné a zdrojované.

### A8. EN verze si vymýšlí fakta, která v CZ nejsou
- `translations.js:861` (Aurora): „Built in **Framer**" — CZ nic takového neříká
- `:863` (Kavárna Karolína): „built with clean code (HTML, CSS, JavaScript) and deployed on **GitHub Pages**" — v CZ není
- `:994` (`casestudy.gas.pull`): EN pull quote říká úplně jinou myšlenku než CZ („Žádná póza…" vs. příběh o rozmluvení šablony)
- `:650` (`page.projects.meta`): CZ má konkrétní čísla a GSC, EN je prázdný boilerplate „Modern, fast, and functional websites and applications"

### A9. EN mění doslovné citace klientů
- `translations.js:1255` (reference GAS): do citace klientky přidané dvě pomlčky a trikolón, které v českém originálu nejsou. `:998` (svatba): „you really went to town" — příliš volný hovorový idiom v překladu citace. Citace klientů se nesmí „vylepšovat".

### A10. Drobné faktické/právní
- ochrana-osobnich-udaju.html:321: GA4 popsané jako „**Anonymní** statistika návštěvnosti" — GA4 anonymní není (client ID, IP), proto se přece sbírá souhlas. Přepsat na „Statistika návštěvnosti bez identifikace jednotlivců."
- tamtéž :326–329: u přenosu mimo EU jsou jen Google a Cloudflare — **chybí Web3Forms**, kterým prochází obsah zpráv (nejcitlivější data na webu).
- tamtéž :285: „nemůžu vám posílat newsletter, protože o žádný nežádáte" — logika obráceně (důvod je chybějící právní základ). Rozdělit na dvě věty.
- reference.html JSON-LD: 4× `ratingValue: 5`, ale na stránce nejsou vidět žádné hvězdičky → porušení pokynů Googlu (riziko manual action). Self-serving review markup stejně rich results nedostane. **Doporučuji reviewRating z markupu odstranit.**
- reference.html:10/23/34/127: „s Fuxa Studio" → **„s Fuxa Studiem"**, „s Pavel Fuxou" → **„s Pavlem Fuxou"**. Chyba ve skloňování vlastní značky.

---

## B. AI-PATTERNY (zadání č. 1)

Celkový verdikt: **české texty na hlavních stránkách a ve studiích jsou nadprůměrně lidské** — konkrétní čísla, přiznané chyby, mluvená čeština. AI dojem nedělají pomlčky uvnitř vět (těch je v CZ málo a správně), ale **opakující se šablonové vzorce**:

1. **Rétorická otázka + okamžitá odpověď v CTA — na všech 5 studiích stejný vzorec** („Potřebujete web na klíč?" / „Pořádáte akci nebo závod?" / „Otevíráte podnik?" / „Máte web, který nikdo nespravuje?" / „Chystáte svatbu nebo firemní akci?"). Jednotlivě fungují, vedle sebe je to viditelná šablona. Stačí 2–3 z nich přepsat na oznamovací větu.
2. **Trikolóny (výčty po třech)** — nejhustší na GAS studii (4× stejný rytmus „texty, fotky i logo") a u svatby (5× „jídla, přípitky, alergie"). Prořezat, nechat max. 1 na stránku.
3. **„Nejen X, ale Y"** — index about sekce („weby nejen naprogramuji, ale taky navrhnu") + „Co ode mě můžete čekat? Přehledná komunikace…" (otázka+odpověď). V EN se tento tik sešel 12×.
4. **EN verze je výrazně „AI-čtější" než CZ**: 102 em-dashes vs. 51 v CZ (krátké české věty slepené do souvětí), „tailored to your needs" (ř. 939), „tailored digital solutions" (ř. 652 — meta kontaktu!), „modern technologies", „works perfectly". Blok `process.1–4.desc` je agenturní šablona v obou jazycích (CZ ř. 302–308).
5. **kontakt.html meta description (ř. 10)**: „Moderní webové stránky, grafický design a digitální řešení na míru" — jediné místo v CZ, které zní jako generický AI web. Přepsat (např. „Poptávka webu — odpovím do 24 hodin. Formulář, e-mail nebo telefon.").
6. **reference.html meta (ř. 10)**: rétorická otázka + „spokojených zákazníků" + „svěřili svůj web do mých rukou" — nejhorší věta webu.
7. **Reference Global Accord** je psaná ve 3. osobě jako popis služby, ne jako výpověď klientky — a táž osoba u Mattiny mluví slovensky, tady česky. Buď obojí slovensky, nebo označit jako překlad.
8. **Uvozovky**: na 12+ místech pár `„…"` (dolní otevírací + ASCII zavírací) místo správného `„…“`. Správně je to jen na jednom místě (svatebni-web.html:275).
9. **Oddělovač v title**: mix „—" a „|" (404 má oba styly vs. ochrana-osobnich-udaju „|"). Sjednotit.

Shadery a CTA na koncích stránek (tvůj dotaz z briefu) AI dojem nedělají — dělá ho opakovaná struktura studií (3 klíčová rozhodnutí + 4 kroky timeline + otázka-CTA na všech pěti).

---

## C. KVALITA — věty, které nedávají smysl nebo drhnou

1. **mlyn-janderov.html:223**: „Tři iterace návrhu stačily, **protože klient nikdy nekomentoval popis.**" — useknutá, nesrozumitelná. EN verze (translations:1090) prozrazuje záměr: klient nekomentoval popis, ale živý náhled. Doplnit: „…protože klient nikdy nekomentoval popis — připomínkoval rovnou živý náhled webu."
2. **mlyn-janderov.html:224**: „Nejtěžší **část nebyla design**" — gramaticky špatně. → „Nejtěžší nebyl design…"
3. **svatebni-web.html:193**: „Program dne zůstal záměrně nedokončený a linka za posledním bodem se ztrácí." — bez vysvětlení zní jako přiznaná nedodělávka. Doplnit proč (večer pokračuje volně / open end).
4. **404.html:124**: „Zkuste to z hlavní stránky." — „to" nemá k čemu odkazovat. → „Začněte znovu z hlavní stránky." Také „hlavní stránka" vs. „Domů" v navigaci.
5. **svidnicky-extrem.html:176 + 180**: dva sousední odstavce říkají totéž (parta, závod, „e-mail a Facebook" 2×). Stejný problém mattina-cafe.html:177 + 181.
6. **svidnicky-extrem.html:277**: „…doporučil dál. A čísla z vyhledávání mu dala za pravdu." — non sequitur, čísla nesouvisí s doporučením.
7. **svidnicky-extrem.html:284**: „běžný web má jednotky procent" — tvrzení bez zdroje vedle jinak zdrojovaných čísel. Buď doložit, nebo změkčit („obvyklé weby mívají…").
8. **global-accord-strategies.html:192 vs. :301**: text odsuzuje „gradienty v textu" jako AI-znak — a CTA nadpis o kus níž je `gradient-text`. Platí na všech stránkách. Buď větu přeformulovat (např. na „samoúčelné efekty"), nebo se smířit s tím, že si toho někdo všimne.
9. **mattina-cafe.html:227–239**: timeline není chronologická (Den 0 → Do otevření → Průběžně → < 1 měsíc). Přeskládat.
10. **svatebni-web.html:144 + 153**: „30 formulářů" a „51 hostů" bez spojení — vypadá jako 59% návratnost. Doplnit „30 formulářů za 51 hostů (jeden formulář za rodinu)".
11. **ochrana-osobnich-udaju.html:385**: „Pokud byste **měl** pocit" → „měli" (generické maskulinum v jinak neutrálním textu).
12. EN gramatika: `an "something is coming" campaign` (translations:1128) → `a`; dvojité „and…and" (:1162); „in one person" (:754); „e-shop" (:718) → online store; „Check me out" (:927) → Verification; „Kosice" (:1192, 1196) → Košice; nejednotný formát měny („10,000 CZK" vs. „CZK 10,000" — sjednotit).

---

## D. KONVERZE (zadání č. 4)

Nejdřív reálný rámec: poptávky nejsou nulové kvůli textům — **živý web je o týden pozadu, ceník a studie na produkci vrací 404 a z 11 stránek je indexovaná 1**. Copy může zvednout konverzi jen z návštěvnosti, která zatím skoro není. Nasazení + Search Console je páka č. 1, texty č. 2.

Co v textech konverzi reálně brzdí (seřazeno podle dopadu):

1. **Opakovaná klientka = nejsilnější důkaz webu, a je schovaný.** „Druhá zakázka od stejné klientky" je 3× zmíněno jako poznámka pod čarou. Patří to jako viditelný proof blok (na reference, na GAS studii, klidně na homepage: „Jedna klientka, tři zakázky").
2. **reference.html nemá nad foldem žádné číslo** — podtitul „Přečtěte si, jak hodnotí spolupráci se mnou" je prázdný. Nahradit tvrdým souhrnem: „4 firmy, 5 webů, jedna klientka se vrátila dvakrát." A jediná CTA je až úplně dole — přidat měkkou CTA po druhé referenci.
3. **reference.html neodkazuje na Google recenze / Firmy.cz** — externí, ověřitelný zdroj je důvěryhodnější než vlastní stránka. Jedna věta s odkazem stačí.
4. **GAS a Mattina studie nemají žádná čísla** (Janderov a Svídnický je mají) — nekonzistentní důkazní úroveň. U Mattiny by šla použít GSC data (v briefu bod 7.3 jako „volitelně" — teď by se hodila).
5. **404 nemá záchrannou síť** — jen „domů". Přidat 3 odkazy (Projekty, Ceník, Kontakt) a CTA směrovat na `/kontakt#form` místo `/kontakt`.
6. **CTA studií neříká další krok** — „Napište mi, ozvu se do 24 hodin" je dobré, ale u segmentových CTA chybí pointa: u Svídnického „stihnu to před termínem vašeho závodu", u svatby „měsíc a půl před svatbou bylo hotovo".
7. **Svatební studie posílá B2C zákazníka na firemní ceník** („od 10 000 Kč" + odkaz na /tvorba-webovych-stranek#cenik). Zvážit vlastní větu bez odkazu na balíčky.
8. **EN CTA „Get a quote"** ztrácí „nezávaznost" českého CTA → „Request a quote — no obligation".
9. **Chybějící data-i18n na 404 a ochraně údajů** — po přepnutí na EN zůstane obsah česky (u GDPR reálný problém, ne kosmetika).
10. ochrana-osobnich-udaju končí bez dalšího kroku — přidat závěrečnou větu s odkazem na /kontakt#form.

---

## E. Co je naopak dobře (neměnit)

- Reference Schaffer („nebylo to s námi úplně jednoduché") a Mattina (slovensky, konkrétní detail) — autentické, nechat beze slova.
- Ceník s konkrétními rozpětími, „Nejsem plátce DPH, ceny jsou konečné", „Kde v rozpětí skončíte" — přesně ten naplněný obsah z briefu.
- Case studies Janderov a Svídnický: čísla se zdrojem (GSC), timeline v reálných dnech, přiznané zádrhely (heslo, WhatsApp videa) — tohle si AI nevymyslí.
- „Co bude dál" (3 kroky u formuláře), hint „Stačí vyplnit jedno", konsent bez checkboxu.
- Konzistentní: „do 24 hodin" (všude), „od 10 000 Kč" (všude), IČO, telefon, e-mail, © 2026.
