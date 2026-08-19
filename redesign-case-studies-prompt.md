# Redesign případových studií a stránky Projekty

## Kontext

Pracuješ na `fuxastudio.cz`, portfoliu freelance webdesignéra. Cílová skupina jsou malé české firmy, tedy penziony, restaurace, řemeslníci a lokální podniky, plus zahraniční klienti z Upworku.

Proběhl audit stránky `/projekty` a detailu případové studie (Mlýn Janderov). Obsah je silný, problém je grafické zpracování a hierarchie. Tento dokument popisuje, co opravit a v jakém pořadí.

## Než začneš cokoliv měnit

1. Prozkoumej repo a zjisti stack, kde jsou definované design tokeny (CSS proměnné, Tailwind config, SCSS), jak se generují stránky případových studií a jestli existuje sdílená šablona.
2. Zjisti, jestli je modál na `/projekty` samostatná komponenta a odkud bere data.
3. Zkontroluj, jestli existují překlady (v navigaci je přepínač CS/EN) a jestli jsou případové studie přeložené.
4. **Napiš mi plán a počkej na schválení, než začneš psát kód.** V plánu uveď, které soubory budeš měnit a jestli někde narazíš na něco, co audit nepředpokládal.

## Obecná pravidla

- Postupuj po fázích. Po každé fázi commit se srozumitelnou zprávou a krátké shrnutí, co se změnilo.
- Neměň nic, co není v zadání. Pokud narazíš na něco rozbitého mimo scope, nahlas to a nech to být.
- Neměň obsahové texty případových studií, pokud to fáze výslovně neříká.
- Zachovej stávající PageSpeed skóre. Nepřidávej žádnou knihovnu, pokud to nejde bez ní.
- Nepoužívej modrofialové gradienty, glassmorphism ani generické stínované card gridy.
- Copy pravidla: žádné pomlčky uprostřed vět, žádné dvojtečky uprostřed vět, přirozená čeština.

---

## Fáze 1: Zrušit modál na stránce Projekty

**Proč:** modál duplikuje obsah stránky případové studie, vytváří tři kliky k jednomu textu, neindexuje se a na mobilu je stejně přes celou obrazovku.

**Co udělat:**

- Karta projektu vede přímo na URL případové studie. Celá karta je klikatelná, ne jen odkaz "Případová studie".
- Odstranit komponentu modálu a všechen mrtvý kód, který na ni váže (stavy, event listenery, CSS).
- Shrnující údaje, které byly v modálu, musí zůstat na kartě. Konkrétně jednořádkový výsledek typu `18 DNÍ OD POPTÁVKY KE SPUŠTĚNÍ`. Tento vzorec musí mít každá klientská karta.
- Zkontrolovat, že se nikde neztratil odkaz na živý web klienta. Ten patří na stránku případové studie, ne na kartu.

**Hotovo když:** z `/projekty` se dostanu na plný příběh jedním klikem, v kódu nezůstal žádný modál a všechny karty klientských projektů mají výsledkový řádek.

---

## Fáze 2: Barvy a kontrast

**Proč:** pozadí je skoro čistě černé, body text je střední šedá pod hranicí čitelnosti, a chybí prostřední úroveň, takže stránka skáče mezi křikem a šeptem.

**Co udělat:**

Zaveď (nebo oprav) tokeny zhruba v tomto duchu. Přesné hodnoty si ověř kontrastní kalkulačkou, nedělej to od oka.

- `--bg` na `#121212` až `#1A1A1A`, tedy ne čistá černá
- `--surface` o 4 až 6 procent světlejší než `--bg`, pro karty a bloky
- `--text-primary` lomená bílá, ne `#FFFFFF`
- `--text-secondary` kolem `#A9A9AB` pro body text
- `--text-tertiary` `#666` až `#777` pro meta řádky a patičku

Požadavky:

- Body text musí splnit poměr minimálně 4,5:1 proti pozadí, na kterém reálně leží. Velký text minimálně 3:1.
- Hloubku dělej rozdílem plochy, ne stínem. Stíny na tmavém pozadí nefungují.
- Vypiš mi na konci tabulku naměřených poměrů pro každou kombinaci text a pozadí, kterou používáš.

**Hotovo když:** žádná textová kombinace na `/projekty` a na detailu studie nepadá pod AA a v paletě jsou tři odlišitelné úrovně textu.

---

## Fáze 3: Typografie

**Proč:** monospace nese úplně všechno (H1, nadpisy sekcí, štítky, meta řádky, názvy karet, CTA). Když jeden hlas dělá všechno, nic nemá důraz. Navíc má mono vynucené stejné šířky znaků, což v češtině s diakritikou dělá viditelné díry.

**Co udělat:**

- Monospace **jen** na malé technické štítky. Konkrétně eyebrow (`— PŘÍPADOVÁ STUDIE`, `— KLIENTSKÉ WEBY`), meta řádek pod H1, popisky u čísel, značky dnů na časové ose a výsledkový řádek na kartě.
- H1, nadpisy sekcí, názvy karet a CTA nadpisy dostanou displejové písmo. Podmínka je pořádně udělaná česká diakritika, tedy háčky a čárky, které nekolidují s horním dotažníkem.
- **Rozhodnutí o konkrétním písmu je na mně.** Připrav to tak, aby šlo vyměnit změnou jednoho tokenu, a navrhni mi tři varianty s odůvodněním. Nevybírej sám.
- Velká čísla ve statistikách naopak převeď na mono s tabulárními číslicemi, aby se sloupce zarovnaly.
- Souvislý text nastav na 60 až 70 znaků na řádek.

**Hotovo když:** mono je jen na štítcích a číslech, displejové písmo jde vyměnit jedním tokenem a měřítko textu je definované škálou, ne jednorázovými hodnotami.

---

## Fáze 4: Mřížka a rytmus

**Proč:** všechno je ve stejné šířce, text i obrázky, a vertikální mezery mezi sekcemi se mění bez systému. Proto stránka působí plocho i přes dobrý obsah.

**Co udělat:**

- Definuj tři šířky obsahu. Úzkou pro souvislý text, střední pro dvousloupcové bloky, plnou pro obrázky a před a po.
- Definuj jednu škálu odsazení, například 24 / 48 / 96 / 160, a nepoužívej nic mimo ni.
- Projdi detail případové studie a přiřaď každé sekci šířku a odsazení ze škály. Žádné jednorázové hodnoty.

**Hotovo když:** v CSS není žádná magická hodnota mezery a existují právě tři šířky kontejneru.

---

## Fáze 5: Přeskládat stránku případové studie

**Proč:** nejsilnější materiál je v 70 procentech scrollu v malém šedém textu a v poslední třetině stránky jsou tři soupeřící CTA.

**Co udělat:**

Cílové pořadí sekcí:

1. Breadcrumb, eyebrow, H1, meta řádek, odkaz na živý web
2. Před a po (beze změny, funguje)
3. Výsledková čísla klienta, **bez** procesního čísla
4. Zadání a Řešení
5. **Jak se to stavělo** (posunout sem z původní pozice)
6. Vytažený citát, velký (viz níže)
7. Časová osa Jak to probíhalo, včetně procesního čísla "18 dní"
8. Ukázky webu
9. Reference klienta a Co bylo součástí
10. Další případová studie
11. Jedno CTA

Detaily:

- Oddělit procesní metriku od klientských výsledků. `18 dní od poptávky ke spuštění` je metrika o dodavateli a patří k časové ose, ne mezi obchodní výsledky klienta.
- Vytažený citát `Firma řeší jen to své. Mouku.` vysázet velký, jako samostatný předěl. Teď je menší než nadpis sekce. Pozor, v původním textu je dvojtečka uprostřed věty, oprav na tečku.
- Odstranit spodní tlačítko `Přejít na stránku`. Nahoře pod meta řádkem už jeden odkaz na živý web je.
- V poslední třetině nechat jen kartu další studie a jedno závěrečné CTA.
- Screenshot ceníku je v současné velikosti nečitelná zeď tabulek. Nahraď ho čitelným výřezem jedné sekce. **Nový výřez připravím já, ty jen připrav místo a označ mi rozměr.**

**Hotovo když:** sedí pořadí sekcí, v poslední třetině je jedno CTA a procesní číslo není mezi klientskými výsledky.

---

## Fáze 6: Stránka Projekty

**Proč:** hlavička zabírá celý viewport a nic neříká, neplacené koncepty vypadají dráž než placené zakázky, a náhledy jsou nekonzistentní.

**Co udělat:**

- Zkrátit hlavičku tak, aby byla na první obrazovce vidět aspoň jedna karta projektu.
- Sjednotit prezentaci náhledů. Jeden rámeček, jeden ořez, jedno ošetření pro všechny karty. Klientská práce nesmí mít horší zpracování než koncepty.
- Sekci konceptů zmenšit. Buď menší karty pod klientskou prací, nebo přesun na samostatnou stránku `/koncepty` s odkazem ze spodku Projektů. Navrhni obojí a nech mě vybrat.
- Přejmenovat nadpisy sekcí na neutrální. `Zakázky pro skutečné firmy` implicitně přiznává, že to pod tím skutečné není. Použij `Klientské projekty` a `Studie a koncepty`.
- Sjednotit dekoraci pozadí. Teď jsou tam dvě různé, vlnovky v hlavičce a kouřový gradient v CTA pásu. Nech jednu, nebo žádnou.

**Poznámka:** výměna mockupů je grafická práce, ne kód. Ty připrav konzistentní komponentu náhledu a napiš mi seznam obrázků, které mám dodat, včetně požadovaného poměru stran a rozlišení.

**Hotovo když:** koncepty nemají větší vizuální váhu než klientská práce, náhledy jedou přes jednu komponentu a na stránce je jen jedno dekorativní ošetření pozadí.

---

## Fáze 7: Značka a akcentní barva

**Proč:** celý web je odstíny šedi a jediné saturované místo je modrofialový gradient v logu. Ta jediná barva na webu je zároveň to nejgeneričtější.

**Co udělat:**

- Navrhni mi dvě varianty a nech mě vybrat. Buď značku odbarvit do monochromu, nebo zvolit jeden akcent a použít ho konzistentně na odkazy, aktivní stav v navigaci a primární tlačítko.
- Pokud padne akcent, musí projít kontrastem proti tmavému pozadí i jako barva textu odkazu. Odkazy nesmí být odlišené jen barvou.

---

## Fáze 8: Copy pass

Projdi texty na `/projekty` a na detailu studie a oprav:

- Pomlčky uprostřed vět nahraď tečkou nebo čárkou. Je jich tam hodně a je to nejrozpoznatelnější znak AI textu.
- Dvojtečky uprostřed vět nahraď tečkou.
- Referenci klienta zkrať na `Jsme spokojeni. Odpovídá to naší představě. Doporučujeme.`
- Zkontroluj alt texty u všech obrázků. Musí popisovat, co je na obrázku, ne obsahovat klíčová slova.

**Neměň nic jiného v obsahu.** Faktické údaje, čísla a příběh zůstávají.

---

## Co nedělat

- Neměň čísla ve statistikách. Zdroje si ověřím sám v Search Console.
- Nevymýšlej si nové texty pro sekce, kde chybí obsah. Napiš mi seznam míst, kde chybí, a já dodám.
- Nepřidávej animace nad rámec toho, co tam je.
- Nesahej na ostatní stránky webu, pokud změna tokenů nezpůsobí regresi. Pokud způsobí, nahlas mi to a navrhni řešení, neopravuj naslepo.
- Nepřidávej žádnou závislost.

## Kontrola na konci

1. PageSpeed mobil i desktop, porovnej s hodnotami před zásahem
2. Tabulka kontrastních poměrů pro všechny kombinace textu a pozadí
3. Manuální průchod na šířce 375 px, 768 px a 1440 px
4. Všechny odkazy vedou tam, kam mají, žádné 404
5. Případová studie má správný `title`, meta description a `og:image`
6. Seznam věcí, které jsem musel dodat já (obrázky, písmo, rozhodnutí)
