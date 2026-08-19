# Opravy po review case studies

Navazuje na `redesign-case-studies-prompt.md`. Ten redesign je hotový a funguje. Tohle je seznam věcí, které z něj vypadly, rozbily se cestou, nebo je potřeba doladit.

Fáze jsou seřazené podle dopadu. Dělej je po pořadí, každou jako samostatný commit.

---

## Pravidla platná pro celé zadání

1. **Nesahej na fakta, čísla ani citace klientů.** Citace jsou data, ne copy. Když ti nějaká přijde dlouhá, kostrbatá nebo nekonzistentní, nech ji být a napiš to do reportu. Nikdy je nezkracuj ani nepřeformulovávej.
2. **Nevymýšlej obsah.** Když ti k něčemu chybí podklad, vynech to a napiš do reportu, co potřebuješ ode mě.
3. **Všechno zrcadli do cs i en bloků** včetně HTML fallbacků.
4. **Copy pravidla platí dál.** Žádné pomlčky a dvojtečky uprostřed vět. `sport:base` je název, ten zůstává.
5. **V reportu rozlišuj, co jsi ověřil a co ne.** „Vizuálně zkontrolováno" znamená, že se to nerozsypalo v kódu, ne že to na monitoru vypadá dobře. Když něco ověřit nemůžeš, napiš to.

---

## Fáze 1: Regrese v referenci Janderov

V minulém copy passu se zkrátila reference u Mlýna Janderov. Původní znění bylo:

> „Děkujeme za spolupráci. Asi to s námi nebylo úplně jednoduché, ale vše se nakonec podařilo. Jsme spokojeni. Odpovídá to naší představě. Doporučujeme."
> Ing. Petr Schaffer, Mlýn Janderov

Vrať přesně tohle. Ta prostřední věta je nejcennější část celé reference.

Zkontroluj zároveň zbylé tři reference proti tomu, co je v repu v historii, jestli se nezkrátila i některá další.

---

## Fáze 2: Zarovnat levý okraj na studiích

**Problém.** Tři šířky mřížky (1200 px / 55rem / 36rem) jsou vycentrované, takže při scrollování skáče levá hrana obsahu. Nadpis, před a po, statistiky, časová osa a ukázky webu jedou u kraje containeru. Zadání a Řešení začínají o kus dovnitř. Jak se to stavělo ještě dál. Citace a Co bylo součástí zase jinde.

**Řešení.** Nech tři šířky, ale zarovnej je na **stejnou levou hranu**. Mění se jen pravá.

- Vnější container zůstává 1200 px a vycentrovaný.
- Uvnitř něj užší bloky dostávají `max-width`, ale **ne** `margin-inline: auto`. Zarovnávají se doleva.
- Platí to i pro nadpisy sekcí (Zadání, Řešení, Jak se to stavělo, Jak to probíhalo, Ukázky webu, Co bylo součástí) a pro velký předěl s vysazeným citátem.

Volný prostor pak vznikne vpravo, což na editoriální stránce vypadá záměrně. Levá hrana musí být od nadpisu studie až po patičkovou kartu na jediném x.

Zkontroluj to na všech čtyřech studiích, ne jen na Janderovi.

---

## Fáze 3: Statistiky jen tam, kde jsou to výsledky

**Problém.** Blok velkých čísel je druhá nejvýraznější věc na stránce. Na dvou studiích v něm nejsou výsledky, ale fakta o zadání převlečená za výsledky.

| Studie | Teď | Akce |
|---|---|---|
| Svídnický extrém | 2,7 / 39,5 % / 126 | nechat |
| Mlýn Janderov | 258 / 1 840 | nechat |
| Mattina | 2 jazykové verze / 0 podkladů | **odstranit celý blok** |
| Global Accord | 2. zakázka / 9 stránek | **odstranit celý blok** |

**Jak to udělat.** Udělej blok statistik podmíněný. Když studie nemá reálná výsledková čísla, sekce se nevykreslí vůbec. Prázdno je lepší než výplň.

Procesní metrika (18 dní, 8 dní, < 1 měsíc) zůstává tam, kde je, tedy u časové osy. Ta funguje.

**Co s vypadlými informacemi.**

- „2 jazykové verze" a „0 podkladů" u Mattiny už jsou obsažené v Zadání a v Co bylo součástí. Nikam je nepřidávej.
- „9 stránek" u Global Accordu je v Řešení. Nechat.
- „Druhá zakázka od stejné klientky" je silný důkaz a nemá zapadnout. Dej ji jako **drobný textový řádek pod meta řádek** studie, ne jako display číslo. Stejným stylem jako meta, jen o řádek níž. Text: `Druhá zakázka od stejné klientky.`

---

## Fáze 4: Koncepty na ploché screenshoty

**Problém.** Klientské karty mají ploché screenshoty v browser rámečku. Koncepty mají pořád stock mockupy (notebook na stole, iMac s rukou v záběru, notebook pod úhlem). Cvičení tak vypadají produkovaněji než reálné zakázky.

**Co udělat teď (bez assetů).**

1. Sjednoť markup a styl konceptových karet s klientskými. Stejný browser rámeček, stejný poměr stran, stejné zaoblení, jen menší velikost daná třísloupcovou mřížkou.
2. Odstraň štítek „Ukázková práce" ze všech čtyř karet. Duplikuje nadpis sekce („Studie a koncepty") i podnadpis („Vlastní cvičení a ukázky stylu. Nejsou to klientské zakázky.").
3. Oborový štítek (Restaurace, Kavárna, Cukrárna) nech.
4. Aurora zůstala sama na druhém řádku ve třísloupcové mřížce. Přepni sekci na **2×2**, ať mřížka drží.

**Assety dodám já.** Čtyři screenshoty 1440×900 WebP, pořízené na šířce 1440 px. Do té doby nech stávající obrázky, jen ať sedí do nového rámečku bez deformace.

---

## Fáze 5: Opravy specifické pro Mattinu

Mattina je ze čtyř studií nejméně dotažená.

1. **Hero je uříznuté uprostřed řádku.** Spodní hrana screenshotu sekne položku Chai Latte v půlce. Ořízni na hranici sekce, ne uprostřed obsahu.
2. **Časová osa jde na konci pozpátku.** Teď je pořadí DEN 0 → PRŮBĚŽNĚ → < 1 MĚSÍC (hotový web) → DO OTEVŘENÍ (dočasná stránka). Dočasná stránka běžela dřív než hotový web. Přehoď kroky do skutečné chronologie, nebo poslední krok přejmenuj tak, aby bylo jasné, že běžel paralelně.
3. **Chybí velký předěl.** Ostatní tři studie ho mají. Použij větu, která už je v próze: `U croissantů jsem nechal radši prázdné místo, než abych vymýšlel složení.` Stejný styl jako „Firma řeší jen to své. Mouku." u Janderova.

---

## Fáze 6: Drobnosti napříč

1. **Tracking u velkých čísel.** Display čísla mají letter-spacing, který rozjíždí „1 840", „2,7" a „39,5 %". Tabulární číslice nech, letter-spacing z display čísel sundej. Zůstane jen u mono popisků.
2. **Chybí odkaz na živý web v patě studie.** Nahoře je jen drobný textový „Přejít na stránku". Přidej ho i dolů, k patičkové kartě další studie, jako plnohodnotné tlačítko. Nejsilnější moment na proklik je ve chvíli, kdy člověk dočetl.
3. **Eyebrow duplikuje nadpis na /projekty.** „KLIENTSKÉ WEBY" nad „Klientské projekty" a „KONCEPTY" nad „Studie a koncepty". Buď eyebrow zahoď úplně, nebo do něj dej něco, co nadpis neříká (počet položek).
4. **Souhrnný řádek nad klientskou mřížkou.** Pod podnadpis „Weby, které dnes běží naostro a slouží svým majitelům." přidej drobný mono řádek se souhrnem. Čísla dopočítej ze studií, nevymýšlej je. Formát: `4 klientské weby · průměrně X dní od zadání ke spuštění`. Do reportu napiš, jakou hodnotu jsi dopočítal a z čeho.
5. **Logo.** CSS filtr ho na tmavém pozadí drží moc tmavé, skoro splývá. Zesvětli ho, než dodám finální PNG.

---

## Fáze 7: Výkon na mobilu

Lighthouse mobil spadl na 69. Předtím byl web na 89 až 92. Poznámka o artefaktu měření se týkala desktopu, mobilní číslo zůstalo nekomentované.

Tohle je u mě funkční metrika, ne kosmetika. Odkazy na studie posílám v cold outreachu a lidi je otevírají na telefonu.

**Postup.**

1. **Audit obrázků.** Vypiš tabulku všech obrázků v repu se skutečnými rozměry a velikostí souboru. Označ všechno nad 500 kB nebo nad 2000 px na šířku. Víš minimálně o `project3.webp` (5988×3992).
2. **Smaž `hero-b-desktop.png`** (1 MB, nepoužitý, leží v rootu a nasadil by se veřejně).
3. **Zkontroluj `loading="lazy"` a `width`/`height`** na všech obrázcích mimo první viewport.
4. **Responsivní varianty.** Kde se velký obrázek zobrazuje v malém slotu, přidej srcset.
5. **Přeměř** a v reportu uveď mobilní skóre před a po **pro každou stránku zvlášť**, ne jen souhrn.

Když po tomhle mobil pořád nebude nad 85, napiš, co konkrétně to drží dole, ať to řeším dál.

---

## Fáze 8: Kontrola

Neuzavírej to větou „vizuálně zkontrolováno". Projdi konkrétně tohle a u každého napiš výsledek:

- [ ] Levá hrana na všech čtyřech studiích drží na jediném x od nadpisu po patičku (změř v px, ne od oka)
- [ ] Reference Janderov obsahuje větu o tom, že to s nimi nebylo jednoduché
- [ ] Mattina a Global Accord nemají blok velkých čísel
- [ ] Koncepty jsou 2×2, bez štítku „Ukázková práce", ve stejném rámečku jako klientské karty
- [ ] Časová osa Mattiny jde chronologicky
- [ ] Každá studie má odkaz na živý web nahoře i dole
- [ ] Všechny čtyři studie mají velký předěl
- [ ] Blok před a po u Janderova na 375 px (dvousloupec se tam nevejde, potřebuje pod sebou a starý web musí zůstat čitelný)
- [ ] cs i en verze mají identickou strukturu
- [ ] Lighthouse mobil pro každou stránku zvlášť, před a po
- [ ] Žádný horizontální overflow na 375 / 768 / 1440

---

## Co dodám já

- 4 náhledy konceptů, 1440×900 WebP (El Corazón, Karolína, Cukrárna Skuteč, Aurora)
- Výřez ceníku pro Janderova, 1600×1200 WebP
- Odbarvené `logo.png`
- Vytažený citát pro Mattinu, až ho budu mít od klientky
- GSC čísla pro Mattinu a Global Accord, až budou
