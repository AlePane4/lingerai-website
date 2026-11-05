# LINGERAI — Microcopy dell'interfaccia (Fase 5, Testi)

> Autore: `copywriter` · Data: 2026-11-05 · Stato: **rivisto dopo le decisioni dell'utente e il report `docs/legal/compliance-review.md`**
> Base vincolante: `docs/decisions.md`. Tono **A "SPEC"** (qui ovunque: è tutto registro funzionale), "tu", inglese britannico, niente punti esclamativi, niente emoji, niente puntini di sospensione.
> Collegati: `docs/copy/pages.md` (testi delle pagine + decisioni per l'utente), `docs/copy/products.md` (catalogo).

---

## 0. Convenzioni per lo sviluppo

| Regola | Dettaglio |
|---|---|
| Chiavi | Inglese, a punti, camelCase per le parole composte: `bag.empty.title`. Un file JSON per lingua (`it.json`, `en.json`) con la stessa struttura. |
| Maiuscolo | Il testo sorgente è in **sentence case**. Il maiuscolo di etichette, bottoni, nav lo fa il CSS. Restano sempre maiuscoli nel sorgente solo: **LINGERAI**, nomi prodotto (**AXIS**), nomi drop (**GRID / 01**), taglie (**XS**, **75B**), codici (**DEMO-0001**). |
| Variabili | Tra graffe: `{count}`, `{name}`, `{price}`. I prezzi arrivano **già formattati** (`Intl.NumberFormat`: `it-IT` → `95,00 €`, `en-GB` → `€95.00`). |
| Plurali | Chiavi separate con suffisso `_one` / `_other` (convenzione i18next / `Intl.PluralRules`). In IT e EN lo zero usa `_other` ("0 articoli", "0 items"). |
| Testo ricco | Link dentro una frase con tag: `<terms>…</terms>`, `<privacy>…</privacy>` (da rendere come `<a>`). |
| Frecce | `→` e `←` vanno in `<span aria-hidden="true">`: lo screen reader legge solo la parola. |
| Contatori | `[{count}]` visibile sempre `aria-hidden`; il nome accessibile usa la chiave `…sr`. Nei contatori di categoria il numero ha 2 cifre (`[04]`): formattazione nel codice, non nel testo. |
| "Pezzi" vs "articoli" | Catalogo, filtri, categorie = **pezzi / pieces**. Borsa e ordine = **articoli / items** (conta le quantità). |
| Date | Formato `DD.MM.YYYY` in entrambe le lingue (`05.11.2026`). |
| `SR` nella colonna Note | Testo solo per screen reader (non visibile). |

---

## 1. Comuni

| Chiave | IT | EN | Note |
|---|---|---|---|
| `common.brand` | LINGERAI | LINGERAI | |
| `common.close` | Chiudi | Close | bottone testuale di pannelli e dialog |
| `common.back` | Indietro | Back | |
| `common.optional` | (facoltativo) | (optional) | in coda alla label dei campi facoltativi |
| `common.yes` | Sì | Yes | |
| `common.no` | No | No | |
| `common.loading` | Caricamento | Loading | SR |
| `common.view` | Vedi | View | prefisso link, es. "Vedi GRID / 01" |
| `common.or` | Oppure | Or | |

## 2. Accessibilità di base

| Chiave | IT | EN | Note |
|---|---|---|---|
| `a11y.skipToContent` | Vai al contenuto | Skip to content | primo elemento focusabile, prima della striscia demo |
| `a11y.nav.main` | Principale | Main | `aria-label` del `<nav>` header |
| `a11y.nav.footer` | Servizio e legale | Service and legal | `aria-label` del `<nav>` footer |
| `a11y.nav.breadcrumb` | Percorso | Breadcrumb | |
| `a11y.demoNotice` | Avviso demo | Demo notice | `aria-label` dell'`<aside>` striscia |
| `a11y.logo` | LINGERAI, home | LINGERAI, home | nome del link logotipo (inizia col testo visibile) |
| `a11y.menuDialog` | Menu | Menu | `aria-label` del dialog menu mobile |

## 3. Demo: striscia, banner, note

| Chiave | IT | EN | Note |
|---|---|---|---|
| `demo.strip.text` | Demo — sito dimostrativo. Niente è in vendita, nessun pagamento verrà effettuato. | Demo — showcase site. Nothing is for sale, no payment will be taken. | tutte le pagine (deciso, con parere legal-compliance M1) |
| `demo.strip.link` | Cos'è → | What's this → | link ai Termini della demo |
| `demo.banner.checkout` | Demo — nessun pagamento verrà effettuato. Non inserire dati reali. | Demo — no payment will be taken. Don't enter real details. | primo nodo di `<main>` nel checkout; `aria-describedby` del form |
| `demo.banner.confirmation` | Demo — nessun pagamento è stato effettuato e nulla verrà spedito. I dati che hai inserito non sono stati inviati: restano solo in questa scheda del browser e spariscono quando la chiudi. | Demo — no payment was taken and nothing will be shipped. The details you entered weren't sent anywhere: they stay in this browser tab only and disappear when you close it. | conferma |
| `demo.bagNote` | Demo · nessun pagamento · nessun ordine reale | Demo · no payment · no real order | fondo pannello borsa |
| `demo.footer` | Demo — sito dimostrativo. Niente è in vendita, nessun pagamento, nessun dato inviato. | Demo — showcase site. Nothing for sale, no payments, no data sent. | riga finale del footer |
| `demo.notForSale` | I prodotti non sono in vendita. | Nothing here is for sale. | uso libero (About, Termini) |

## 4. Header e navigazione

| Chiave | IT | EN | Note |
|---|---|---|---|
| `nav.bras` | Reggiseni | Bras | |
| `nav.briefs` | Slip | Briefs | EN "slip" = sottoveste: non usarlo per le mutande |
| `nav.bodysuits` | Body | Bodysuits | |
| `nav.slips` | Sottovesti | Slips | |
| `nav.accessories` | Accessori | Accessories | |
| `nav.drop` | GRID / 01 | GRID / 01 | voce distinta |
| `nav.dropArrow` | GRID / 01 → | GRID / 01 → | in cima al menu mobile |
| `nav.menu.open` | Menu | Menu | `<button aria-expanded>` |
| `nav.menu.close` | Chiudi | Close | |
| `nav.sizeGuide` | Guida taglie | Size guide | |
| `nav.about` | Chi siamo | About | deciso |
| `nav.shipping` | Spedizioni | Shipping | |
| `nav.returns` | Resi | Returns | |
| `nav.contact` | Contatti | Contact | |
| `nav.terms` | Termini | Terms | |
| `nav.privacy` | Privacy | Privacy | |
| `nav.faq` | Domande | FAQ | POI |
| `nav.count.visible` | [{count}] | [{count}] | `aria-hidden`; `{count}` a 2 cifre |
| `nav.count.sr_one` | {category}, {count} pezzo | {category}, {count} piece | SR |
| `nav.count.sr_other` | {category}, {count} pezzi | {category}, {count} pieces | SR |
| `breadcrumb.home` | LINGERAI | LINGERAI | primo elemento del breadcrumb |
| `breadcrumb.separator` | / | / | `aria-hidden` |

## 5. Selettore lingua

| Chiave | IT | EN | Note |
|---|---|---|---|
| `lang.groupLabel` | Lingua | Language | titolo gruppo footer / etichetta SR |
| `lang.it.short` | IT | IT | visibile |
| `lang.it.label` | IT — Italiano | IT — Italiano | `aria-label`, `lang="it"`; uguale nelle due lingue (il nome è nella sua lingua) |
| `lang.en.short` | EN | EN | visibile |
| `lang.en.label` | EN — English | EN — English | `aria-label`, `lang="en-GB"` |
| `lang.separator` | / | / | `aria-hidden` |

## 6. Contatore borsa

| Chiave | IT | EN | Note |
|---|---|---|---|
| `bag.counter.label` | Borsa | Bag | visibile |
| `bag.counter.count` | [{count}] | [{count}] | visibile, `aria-hidden`; `{count}` = somma delle quantità |
| `bag.counter.loading` | [·] | [·] | finché la borsa non è letta; `aria-hidden`, nome SR = solo `bag.counter.label` |
| `bag.counter.sr_one` | Borsa, {count} articolo | Bag, {count} item | nome accessibile |
| `bag.counter.sr_other` | Borsa, {count} articoli | Bag, {count} items | nome accessibile (anche con 0) |

## 7. Card prodotto

| Chiave | IT | EN | Note |
|---|---|---|---|
| `card.placeholderCaption` | Disegno tecnico — foto in arrivo | Technical drawing — photo to come | sotto il contenitore, `aria-hidden`, solo con placeholder |
| `card.colours_one` | {count} colore | {count} colour | accanto agli swatch decorativi |
| `card.colours_other` | {count} colori | {count} colours | |
| `card.soldOut` | Esaurito | Sold out | tag su fondo nero |
| `card.lowStock` | Ultimi pezzi | Last few | badge arancio, solo se vero |
| `card.new` | Nuovo | New | non usato nel MVP |

Ordine di lettura della card (unico link): nome → tipo → prezzo → colori → stato. Es. SR: "AXIS Reggiseno a triangolo 95,00 € 4 colori".

## 8. Scheda prodotto

### 8.1 Colore

| Chiave | IT | EN | Note |
|---|---|---|---|
| `product.colour.legend` | Colore | Colour | `<legend>` |
| `product.colour.selected` | Colore — {colour} | Colour — {colour} | etichetta visibile sopra gli swatch |
| `product.colour.selectedSoldOut` | Colore — {colour} · esaurito | Colour — {colour} · sold out | decisione K2: esaurito anche nell'etichetta |
| `product.colour.optionSoldOut` | {colour}, esaurito | {colour}, sold out | nome SR dello swatch |

### 8.2 Taglia

| Chiave | IT | EN | Note |
|---|---|---|---|
| `product.size.legend` | Taglia | Size | `<legend>` |
| `product.size.guideLink` | Guida taglie → | Size guide → | apre il pannello |
| `product.size.bandGroup` | Fascia {band} | Band {band} | `aria-label` della riga (`role="group"`) |
| `product.size.bandHeader` | Fascia | Band | intestazione della colonna fasce |
| `product.size.oneSize` | Taglia unica | One size | casella preselezionata |
| `product.size.optionSoldOut` | {size}, esaurita | {size}, sold out | nome SR della casella |
| `product.size.soldOutNote` | {size} esaurita | {size} sold out | riga visibile sotto la griglia, es. "XXL esaurita" |
| `product.size.soldOutNote_many` | Esaurite: {sizes} | Sold out: {sizes} | se più di una, es. "Esaurite: 75C, 80D" |
| `product.size.error.none` | Taglia non selezionata. Scegline una per continuare. | No size selected. Choose one to continue. | sotto il gruppo, collegato con `aria-describedby` |
| `product.size.error.soldOut` | {size} esaurita in {colour}. | {size} is sold out in {colour}. | scelta di una casella esaurita |
| `product.size.error.soldOutAlt` | {size} esaurita in {colour}. Disponibile in {altColour}. | {size} is sold out in {colour}. Available in {altColour}. | solo se vero |
| `product.size.deselected` | {size} non disponibile in {colour}. Scegli un'altra taglia. | {size} isn't available in {colour}. Choose another size. | cambio colore che toglie la taglia |

### 8.3 Bottone e stati di aggiunta

| Chiave | IT | EN | Note |
|---|---|---|---|
| `product.add.label` | Aggiungi alla borsa | Add to bag | senza dati (fallback) |
| `product.add.withPrice` | Aggiungi alla borsa — {price} | Add to bag — {price} | prima della scelta taglia |
| `product.add.withSizePrice` | Aggiungi alla borsa — {size} — {price} | Add to bag — {size} — {price} | dopo la scelta taglia |
| `product.add.sticky.summary` | {name} · {size} · {price} | {name} · {size} · {price} | barra sticky mobile; senza taglia: `{name} · {price}` |
| `product.add.sticky.button` | Aggiungi | Add | barra sticky mobile |
| `product.add.maxReached` | Massimo {max} per taglia nella demo. | Maximum {max} per size in this demo. | `{max}` = 5 |
| `price.vatNote` | Prezzi simulati, IVA inclusa. | Simulated prices, VAT included. | sotto il prezzo in scheda, in borsa e nel riepilogo checkout |
| `product.soldOut.title` | Esaurito | Sold out | riquadro testuale al posto del bottone |
| `product.soldOut.body` | Esaurito in tutte le taglie e in tutti i colori. | Sold out in every size and colour. | |
| `product.soldOut.similar` | Vedi pezzi simili → | See similar pieces → | |

### 8.4 Rassicurazioni sotto il bottone

| Chiave | IT | EN | Note |
|---|---|---|---|
| `product.reassure.shipping` | Spedizione demo 2–4 giorni | Demo delivery in 2–4 days | link a Spedizioni |
| `product.reassure.returns` | Resi 30 giorni (demo) | 30-day returns (demo) | link a Resi |
| `product.reassure.hygiene` | Protezione igienica | Hygiene liner | solo slip e body; link a Resi |

### 8.5 Dati chiave (sempre visibili, `<dl>`)

| Chiave | IT | EN | Note |
|---|---|---|---|
| `product.key.sheerness` | Trasparenza | Sheerness | |
| `product.key.sheerness.sheer` | Trasparente | Sheer | |
| `product.key.sheerness.semiSheer` | Semi-trasparente | Semi-sheer | |
| `product.key.sheerness.opaque` | Opaco | Opaque | |
| `product.key.sheerness.mixed` | {opaque}, {sheer} | {opaque}, {sheer} | es. "Opaco davanti, trasparente sui fianchi": testo per prodotto in `products.md` |
| `product.key.underwire` | Ferretto | Underwire | valori `common.yes` / `common.no` |
| `product.key.padding` | Imbottitura | Padding | valori `common.yes` / `common.no` |
| `product.key.support` | Sostegno | Support | solo reggiseni |
| `product.key.support.light` | Leggero | Light | |
| `product.key.support.medium` | Medio | Medium | |
| `product.key.support.firm` | Alto | Firm | |
| `product.key.gusset` | Tassello | Gusset | slip e body; valore da `products.md` |

### 8.6 Descrizione, accordion, set, correlati

| Chiave | IT | EN | Note |
|---|---|---|---|
| `product.description.title` | Descrizione | Description | SR o etichetta piccola |
| `product.accordion.composition` | Composizione | Composition | |
| `product.accordion.construction` | Costruzione | Construction | |
| `product.accordion.fit` | Vestibilità | Fit | |
| `product.accordion.care` | Cura | Care | |
| `product.accordion.returns` | Resi | Returns | |
| `product.returns.body` | Reso o cambio entro 30 giorni, nella demo. → Resi | Return or exchange within 30 days, in this demo. → Returns | tutti i prodotti |
| `product.returns.hygiene` | Per motivi igienici, slip e body si possono restituire solo con la protezione igienica intatta. | For hygiene reasons, briefs and bodysuits can only be returned with the liner intact. | solo slip e body |
| `product.fit.model` | [DA CONFERMARE: altezza e taglia della modella, quando ci saranno le foto] | [TO BE CONFIRMED: model's height and size, once photos exist] | non mostrare finché ci sono i disegni |
| `product.set.title` | Completa il set | Complete the set | |
| `product.set.link` | Vedi → | View → | porta `?color=` |
| `product.related.title` | Altri pezzi di GRID / 01 | More from GRID / 01 | |

### 8.7 Galleria, "Ingrandisci", legenda

| Chiave | IT | EN | Note |
|---|---|---|---|
| `gallery.region` | Galleria immagini, {name} | Image gallery, {name} | `aria-label` della traccia |
| `gallery.prev` | Immagine precedente | Previous image | `aria-label`, glifo `←` nascosto |
| `gallery.next` | Immagine successiva | Next image | `aria-label`, glifo `→` nascosto |
| `gallery.counter` | {current} / {total} | {current} / {total} | visibile, `aria-hidden` |
| `gallery.counter.sr` | Immagine {current} di {total} | Image {current} of {total} | `aria-live` solo al cambio con le frecce |
| `gallery.view.front` | Fronte | Front | nome breve vista |
| `gallery.view.back` | Retro | Back | |
| `gallery.view.detail` | Dettaglio | Detail | |
| `gallery.zoom.open` | Ingrandisci | Enlarge | bottone testuale sotto la galleria (decisione K1) |
| `gallery.zoom.openSr` | Ingrandisci il disegno: {view} | Enlarge drawing: {view} | nome accessibile (inizia col testo visibile) |
| `gallery.zoom.title` | {name} — {view} | {name} — {view} | titolo del dialog a schermo intero |
| `gallery.zoom.hint` | Allarga con due dita o usa lo zoom del browser. | Pinch to zoom, or use your browser's zoom. | |
| `gallery.zoom.close` | Chiudi | Close | |
| `legend.title` | Legenda | Key | titolo SR o etichetta sopra i richiami |
| `legend.callout` | {number} — {text} | {number} — {text} | voce dell'elenco richiami |
| `legend.measures.caption` | Misure — taglia {size} | Measurements — size {size} | `<caption>`, segue la taglia scelta |
| `legend.measures.captionDefault` | Misure — taglia di riferimento {size} | Measurements — reference size {size} | nessuna taglia scelta |
| `legend.measures.colRef` | Quota | Ref. | intestazione colonna lettera |
| `legend.measures.colWhat` | Cosa | What | |
| `legend.measures.colValue` | Misura ({unit}) | Measurement ({unit}) | |

### 8.8 Testi alternativi (formula)

Gli `alt` vivono nei dati prodotto (`alt.it` / `alt.en`, vedi `products.md`); queste sono le formule di riferimento.

| Chiave | IT | EN | Note |
|---|---|---|---|
| `media.alt.card` | *(vuoto)* | *(vuoto)* | nelle card `alt=""`: il link ha già nome e prezzo |
| `media.alt.front` | {name}, {type}: disegno tecnico, vista frontale | {name}, {type}: technical drawing, front view | `{type}` in minuscolo, es. "reggiseno a triangolo" |
| `media.alt.back` | {name}, {type}: disegno tecnico, vista dal retro | {name}, {type}: technical drawing, back view | |
| `media.alt.detail` | {name}, {type}: disegno tecnico, {detail} | {name}, {type}: technical drawing, {detail} | `{detail}` per prodotto, es. "dettaglio della cucitura centrale" |
| `media.alt.photoFront` | {name}, {type}, {colour}: foto, vista frontale | {name}, {type}, {colour}: photo, front view | POI, per le foto future (descrizione neutra, mai del corpo) |
| `media.alt.measureBra` | Come misurare sottoseno e seno: disegno a tratto | How to measure underbust and bust: line drawing | guida taglie |
| `media.alt.measureHips` | Come misurare i fianchi: disegno a tratto | How to measure hips: line drawing | guida taglie |

## 9. Guida taglie (pannello e pagina)

| Chiave | IT | EN | Note |
|---|---|---|---|
| `sizeGuide.title` | Guida taglie | Size guide | |
| `sizeGuide.tab.bras` | Reggiseni (fascia + coppa) | Bras (band + cup) | |
| `sizeGuide.tab.letters` | Lettere XS–3XL | Letter sizes XS–3XL | |
| `sizeGuide.howTo.title` | Come misurarti | How to measure | |
| `sizeGuide.howTo.underbust` | Sottoseno — metro aderente, subito sotto il seno, parallelo al pavimento. | Underbust — tape snug, just under the bust, level all the way round. | |
| `sizeGuide.howTo.bust` | Seno — metro morbido, sul punto più pieno, senza stringere. | Bust — tape relaxed, across the fullest point, not pulled tight. | |
| `sizeGuide.howTo.hips` | Fianchi — sul punto più largo, piedi uniti. | Hips — around the widest point, feet together. | tab lettere |
| `sizeGuide.howTo.cup` | Coppa = seno meno sottoseno. Cerca la differenza nella seconda tabella. | Cup = bust minus underbust. Find the difference in the second table. | |
| `sizeGuide.howTo.tip` | Misurati senza reggiseno o con uno senza imbottitura. | Measure without a bra, or in an unlined one. | |
| `sizeGuide.unit.legend` | Unità | Units | `<legend>` del toggle |
| `sizeGuide.unit.cm` | cm | cm | |
| `sizeGuide.unit.inch` | pollici | inches | |
| `sizeGuide.unit.cmShort` | cm | cm | nelle intestazioni |
| `sizeGuide.unit.inchShort` | pollici | in | nelle intestazioni |
| `sizeGuide.table.band.caption` | Fascia — misura sottoseno | Band — underbust measurement | |
| `sizeGuide.table.band.colUnderbust` | Sottoseno ({unit}) | Underbust ({unit}) | |
| `sizeGuide.table.cup.caption` | Coppa — differenza tra seno e sottoseno | Cup — difference between bust and underbust | |
| `sizeGuide.table.cup.colDiff` | Differenza ({unit}) | Difference ({unit}) | |
| `sizeGuide.table.letters.caption` | Taglie lettera — slip, body, bralette, sottovesti, accessori | Letter sizes — briefs, bodysuits, bralettes, slips, accessories | |
| `sizeGuide.table.letters.colSize` | Taglia | Size | |
| `sizeGuide.table.letters.colHips` | Fianchi ({unit}) | Hips ({unit}) | |
| `sizeGuide.table.letters.colUnderbust` | Sottoseno ({unit}) | Underbust ({unit}) | |
| `sizeGuide.table.colEU` | EU | EU | |
| `sizeGuide.table.colIT` | IT | IT | |
| `sizeGuide.table.colUK` | UK | UK | |
| `sizeGuide.table.colUS` | US | US | |
| `sizeGuide.table.colUKUS` | UK / US | UK / US | |
| `sizeGuide.table.colEUIT` | EU / IT | EU / IT | |
| `sizeGuide.table.selectedRow` | taglia selezionata | selected size | SR, in coda alla riga evidenziata |
| `sizeGuide.scrollHint` | Scorri → | Scroll → | visibile solo con overflow |
| `sizeGuide.scrollRegion` | Tabella taglie, scorrevole | Size table, scrollable | `aria-label` |
| `sizeGuide.note.indicative` | Conversioni indicative: cambiano un po' da un produttore all'altro. | Conversions are a guide: they vary slightly between makers. | |
| `sizeGuide.note.betweenBand` | Tra due taglie: scegli la fascia più grande. | Between sizes: go up a band. | tab reggiseni |
| `sizeGuide.note.betweenLetters` | Tra due taglie: scegli la più grande. | Between sizes: size up. | tab lettere |
| `sizeGuide.returnsLink` | Taglia sbagliata? Nella demo il cambio è gratuito. → Resi | Wrong size? Exchanges are free in this demo. → Returns | |

**Calcolatore (POI)**

| Chiave | IT | EN | Note |
|---|---|---|---|
| `sizeGuide.calc.title` | Calcola la taglia | Find your size | |
| `sizeGuide.calc.underbust` | Sottoseno ({unit}) | Underbust ({unit}) | label |
| `sizeGuide.calc.bust` | Seno ({unit}) | Bust ({unit}) | label |
| `sizeGuide.calc.submit` | Calcola | Calculate | |
| `sizeGuide.calc.result` | Taglia suggerita: {size} | Suggested size: {size} | annunciato in `role="status"` |
| `sizeGuide.calc.outOfRange` | Fuori dalle taglie di questo modello ({range}). Vedi {altName} in {altRange}. | Outside this style's size range ({range}). See {altName} in {altRange}. | es. "Vedi STRUT in XS–3XL." |
| `sizeGuide.calc.error` | Inserisci due misure in {unit}. | Enter both measurements in {unit}. | |
| `sizeGuide.calc.privacy` | Calcolo nel browser. Nessun dato salvato. | Worked out in your browser. Nothing is saved. | |

## 10. Borsa (pannello e pagina `/it/borsa`)

| Chiave | IT | EN | Note |
|---|---|---|---|
| `bag.title` | Borsa | Bag | + `bag.counter.count`; nome SR = `bag.counter.sr_*` |
| `bag.close` | Chiudi | Close | |
| `bag.empty.body` | Niente dentro. | Nothing in it. | sotto "Borsa [0]" |
| `bag.empty.cta` | Vedi GRID / 01 | View GRID / 01 | bottone secondario |
| `bag.empty.categories` | Oppure per categoria | Or by category | sopra le 5 categorie |
| `bag.line.variant` | {colour} · {size} | {colour} · {size} | |
| `bag.line.qty.legend` | Quantità | Quantity | SR |
| `bag.line.qty.decrease` | Diminuisci quantità, {name} {type}, {size} | Decrease quantity, {name} {type}, {size} | `aria-label` di `−` |
| `bag.line.qty.increase` | Aumenta quantità, {name} {type}, {size} | Increase quantity, {name} {type}, {size} | `aria-label` di `+` |
| `bag.line.qty.max` | Massimo {max} per taglia nella demo. | Maximum {max} per size in this demo. | quando `+` è al limite |
| `bag.line.remove` | Rimuovi | Remove | visibile |
| `bag.line.removeSr` | Rimuovi {name} {type}, {size} | Remove {name} {type}, {size} | `aria-label` (inizia col visibile) |
| `bag.line.removed` | Rimosso: {name}. | Removed: {name}. | la riga diventa questo testo |
| `bag.line.undo` | Annulla | Undo | resta finché il pannello è aperto o fino all'azione successiva |
| `bag.line.undoSr` | Annulla la rimozione di {name} | Undo removing {name} | |
| `bag.line.added` | Aggiunto | Added | tag arancio sulla riga nuova |
| `bag.line.unavailable` | Non più disponibile | No longer available | riga barrata, non conteggiata |
| `bag.summary.subtotal` | Subtotale | Subtotal | |
| `bag.summary.shipping` | Spedizione | Delivery | |
| `bag.summary.shippingValue` | Calcolata al checkout | Calculated at checkout | |
| `bag.summary.total` | Totale | Total | |
| `bag.summary.vatNote` | → `price.vatNote` | → `price.vatNote` | sotto il totale |
| `bag.checkout` | Vai al checkout | Go to checkout | primario |
| `bag.continue` | Continua a scegliere | Keep browsing | link testuale, chiude il pannello |
| `bag.blocked` | Rimuovi i pezzi non disponibili per continuare. | Remove unavailable pieces to continue. | al posto del bottone checkout |
| `bag.reset` | La borsa è stata svuotata: i dati salvati non erano leggibili. | Your bag was emptied: the saved data couldn't be read. | dati corrotti |
| `bag.storageBlocked` | Il browser non permette di salvare la borsa: si svuoterà quando chiudi la pagina. | Your browser won't let us save the bag: it will empty when you close the page. | `localStorage` non disponibile |

## 11. Checkout demo

### 11.1 Struttura

| Chiave | IT | EN | Note |
|---|---|---|---|
| `checkout.title` | Checkout demo | Demo checkout | `h1` |
| `checkout.back` | ← Borsa | ← Bag | header ridotto; freccia `aria-hidden` |
| `checkout.fillSample` | Compila con dati di esempio | Fill in sample details | bottone secondario |
| `checkout.fillSample.hint` | Inserisce dati inventati in tutti i campi. Puoi modificarli. | Fills every field with made-up details. You can edit them. | sotto il bottone |
| `checkout.requiredNote` | Tutti i campi sono obbligatori, tranne quelli indicati. | All fields are required unless marked optional. | in cima al form |
| `checkout.sessionNote` | I dati non vengono inviati: restano solo in questa scheda del browser e spariscono quando la chiudi. | Your details aren't sent anywhere: they stay in this browser tab only and disappear when you close it. | sotto `requiredNote` |
| `checkout.dataWarning` | Usa i dati di esempio: non inserire i tuoi. | Use the sample details: don't enter your own. | subito sopra il primo campo, accanto a `fillSample` (M2) |
| `checkout.section.contact` | 01 Contatto | 01 Contact | `<legend>` |
| `checkout.section.delivery` | 02 Spedizione | 02 Delivery | |
| `checkout.section.method` | 03 Metodo di spedizione | 03 Delivery method | |
| `checkout.section.payment` | 04 Pagamento | 04 Payment | |

### 11.2 Campi

| Chiave | IT | EN | Note |
|---|---|---|---|
| `checkout.field.email.label` | Email | Email | `type=email`, `autocomplete=email` |
| `checkout.field.email.hint` | Solo per la demo: non riceverai nessun messaggio. | Demo only: we won't send you anything. | |
| `checkout.field.email.placeholder` | nome@example.com | name@example.com | solo esempio di formato |
| `checkout.field.firstName.label` | Nome | First name | `given-name` |
| `checkout.field.lastName.label` | Cognome | Last name | `family-name` |
| `checkout.field.address1.label` | Indirizzo | Address | `address-line1` |
| `checkout.field.address1.hint` | Via e numero civico | House number and street | |
| `checkout.field.address2.label` | Scala, interno, presso (facoltativo) | Flat, floor, c/o (optional) | `address-line2`; "(facoltativo)" = `common.optional` |
| `checkout.field.postalCode.label` | CAP | Postcode | `postal-code`; `inputmode=numeric` solo se paese = Italia |
| `checkout.field.city.label` | Città | Town or city | `address-level2` |
| `checkout.field.province.label` | Provincia | Province | solo se paese = Italia; `address-level1` |
| `checkout.field.province.placeholder` | Scegli | Choose | prima opzione vuota del `<select>` |
| `checkout.field.country.label` | Paese | Country | `country` |
| `checkout.field.phone.label` | Telefono (facoltativo) | Phone (optional) | `tel` |
| `checkout.field.phone.hint` | Solo per la demo. Puoi lasciarlo vuoto. | Demo only. You can leave it blank. | |
| `checkout.field.billingSame` | Indirizzo di fatturazione uguale a quello di spedizione | Billing address same as delivery | checkbox, già spuntata; se tolta riusa gli stessi campi con prefisso `checkout.billing.*` |
| `checkout.billing.title` | Fatturazione | Billing | solo se `billingSame` è tolta |

**Paesi** (lista breve, ordine alfabetico nella lingua della pagina; valori in codice ISO)

| Chiave | IT | EN |
|---|---|---|
| `country.AT` | Austria | Austria |
| `country.BE` | Belgio | Belgium |
| `country.DE` | Germania | Germany |
| `country.ES` | Spagna | Spain |
| `country.FR` | Francia | France |
| `country.GB` | Regno Unito | United Kingdom |
| `country.IE` | Irlanda | Ireland |
| `country.IT` | Italia | Italy |
| `country.NL` | Paesi Bassi | Netherlands |
| `country.PT` | Portogallo | Portugal |

Default: IT → Italia, EN → Regno Unito. Province: elenco con nome + sigla (`Milano (MI)`), dati, non copy.

### 11.3 Metodo di spedizione e pagamento

| Chiave | IT | EN | Note |
|---|---|---|---|
| `checkout.method.standard.name` | Standard | Standard | preselezionato |
| `checkout.method.standard.time` | 2–4 giorni lavorativi | 2–4 working days | |
| `checkout.method.standard.price` | Gratuita | Free | |
| `checkout.method.express.name` | Express | Express | |
| `checkout.method.express.time` | 1–2 giorni lavorativi | 1–2 working days | |
| `checkout.method.express.price` | {price} | {price} | 12,00 € nei dati demo |
| `checkout.method.note` | Tempi e prezzi simulati. | Times and prices are simulated. | |
| `checkout.payment.option` | Pagamento simulato | Simulated payment | unico radio, già selezionato |
| `checkout.payment.hint` | Nessuna carta, nessun addebito. In questa demo il pagamento non esiste. | No card, no charge. Payment doesn't exist in this demo. | |
| `checkout.terms.label` | Accetto i <terms>termini della demo</terms>. | I accept the <terms>demo terms</terms>. | checkbox, **mai pre-spuntata** (deciso) |
| `checkout.privacyLink` | Come trattiamo i dati: <privacy>privacy</privacy> | How we handle data: <privacy>privacy notice</privacy> | link informativo sotto la checkbox (la privacy si legge, non si accetta) |
| `checkout.submit` | Conferma ordine demo — {total} | Place demo order — {total} | primario |
| `checkout.submitting` | Elaborazione demo | Processing demo | ~800 ms, `aria-disabled`; nessun puntino |

### 11.4 Riepilogo

| Chiave | IT | EN | Note |
|---|---|---|---|
| `checkout.summary.title` | Riepilogo | Summary | |
| `checkout.summary.toggle` | Riepilogo — {total} | Summary — {total} | bottone mobile; `▾`/`▴` `aria-hidden`, stato con `aria-expanded` |
| `checkout.summary.line` | {colour} · {size} × {qty} | {colour} · {size} × {qty} | sotto nome + tipo |
| `checkout.summary.subtotal` | Subtotale | Subtotal | |
| `checkout.summary.shipping` | Spedizione | Delivery | |
| `checkout.summary.shippingFree` | Gratuita | Free | |
| `checkout.summary.total` | Totale | Total | |
| `checkout.summary.items_one` | {count} articolo | {count} item | |
| `checkout.summary.items_other` | {count} articoli | {count} items | |
| `checkout.summary.demoNote` | Importo simulato, IVA inclusa. Nessun addebito. | Simulated amount, VAT included. Nothing is charged. | |

### 11.5 Errori

| Chiave | IT | EN | Note |
|---|---|---|---|
| `checkout.error.tag` | Errore | Error | tag arancio, letto prima del messaggio |
| `checkout.error.summary_one` | {count} errore da correggere | {count} error to fix | titolo riepilogo, riceve il focus |
| `checkout.error.summary_other` | {count} errori da correggere | {count} errors to fix | |
| `checkout.error.email.required` | Inserisci un'email. | Enter an email address. | |
| `checkout.error.email.invalid` | Inserisci un'email valida, es. nome@example.com. | Enter a valid email address, e.g. name@example.com. | |
| `checkout.error.firstName.required` | Inserisci il nome. | Enter your first name. | |
| `checkout.error.lastName.required` | Inserisci il cognome. | Enter your last name. | |
| `checkout.error.address1.required` | Inserisci l'indirizzo. | Enter your address. | |
| `checkout.error.postalCode.required` | Inserisci il CAP. | Enter your postcode. | |
| `checkout.error.postalCode.invalidIT` | Il CAP ha 5 cifre, es. 20121. | Italian postcodes have 5 digits, e.g. 20121. | paese = Italia |
| `checkout.error.postalCode.invalidGB` | Inserisci un postcode valido, es. AB1 2CD. | Enter a valid postcode, e.g. AB1 2CD. | paese = Regno Unito |
| `checkout.error.postalCode.invalid` | Controlla il codice postale. | Check the postcode. | altri paesi |
| `checkout.error.city.required` | Inserisci la città. | Enter your town or city. | |
| `checkout.error.province.required` | Scegli la provincia. | Choose a province. | |
| `checkout.error.country.required` | Scegli il paese. | Choose a country. | |
| `checkout.error.phone.invalid` | Usa solo cifre, spazi e +, es. +39 02 0000 0000. | Use digits, spaces and + only, e.g. +44 20 0000 0000. | solo se compilato |
| `checkout.error.method.required` | Scegli un metodo di spedizione. | Choose a delivery method. | |
| `checkout.error.terms.required` | Accetta i termini della demo per continuare. | Accept the demo terms to continue. | |
| `checkout.empty.body` | La borsa è vuota. Niente da confermare. | Your bag is empty. Nothing to confirm. | arrivo diretto su `/checkout` |
| `checkout.empty.cta` | Vedi GRID / 01 | View GRID / 01 | |
| `checkout.unavailable` | Un pezzo nella borsa non è più disponibile. Controlla la borsa per continuare. | A piece in your bag is no longer available. Check your bag to continue. | rimando alla borsa |

### 11.6 Dati di esempio ("Compila con dati di esempio")

Valori inventati. Dominio `example.com` (riservato agli esempi). Città reali con via inventata, per passare la validazione.

| Campo | IT | EN |
|---|---|---|
| `sample.email` | alba.esempio@example.com | alex.example@example.com |
| `sample.firstName` | Alba | Alex |
| `sample.lastName` | Esempio | Example |
| `sample.address1` | Via dell'Esempio 1 | 1 Example Street |
| `sample.address2` | *(vuoto)* | *(empty)* |
| `sample.postalCode` | 20121 | AB1 2CD |
| `sample.city` | Milano | London |
| `sample.province` | MI | — |
| `sample.country` | IT | GB |
| `sample.phone` | *(vuoto)* | *(empty)* |
| `sample.terms` | non spuntata | not ticked |

Nota: la checkbox dei termini **non** si spunta mai da sola, nemmeno con "Compila con dati di esempio" (deciso, confermato da `legal-compliance` M3).

## 12. Conferma ordine demo

| Chiave | IT | EN | Note |
|---|---|---|---|
| `confirmation.wall` | Ricevuto. | Received. | titolo "muro", `aria-hidden` (deciso) |
| `confirmation.wallLabel` | Ordine demo | Demo order | etichetta visibile ≥768 |
| `confirmation.h1` | Ordine demo ricevuto | Demo order received | `h1` accessibile |
| `confirmation.order` | Ordine {orderId} · {date} | Order {orderId} · {date} | `{orderId}` = `DEMO-0001` |
| `confirmation.isDemo` | È una demo: nessun pagamento effettuato, nulla verrà spedito. | This is a demo: no payment taken, nothing will be shipped. | sotto il codice ordine |
| `confirmation.noEmail` | Non riceverai nessuna email. | You won't get an email. | |
| `confirmation.dataNote` | I dati qui sotto non sono stati inviati. Restano solo in questa scheda del browser e spariscono quando la chiudi. | The details below weren't sent anywhere. They stay in this browser tab only and disappear when you close it. | subito sopra l'indirizzo |
| `confirmation.bagEmptied` | La borsa è stata svuotata. | Your bag has been emptied. | |
| `confirmation.deliveryTo` | Indirizzo inserito (demo) | Address entered (demo) | sopra l'indirizzo: non promette una consegna |
| `confirmation.method` | Metodo | Method | |
| `confirmation.cta` | Torna a GRID / 01 | Back to GRID / 01 | primario |
| `confirmation.none` | Nessun ordine demo recente. | No recent demo order. | accesso diretto |
| `confirmation.none.cta` | Vedi GRID / 01 | View GRID / 01 | |

## 13. Filtri e ordinamento (solo drop GRID / 01)

| Chiave | IT | EN | Note |
|---|---|---|---|
| `filters.title` | Filtri | Filters | titolo dialog mobile |
| `filters.open` | Filtra | Filter | mobile |
| `filters.openActive` | Filtra ({count}) | Filter ({count}) | `{count}` = filtri attivi |
| `filters.category` | Categoria | Category | |
| `filters.size` | Taglia | Size | |
| `filters.colour` | Colore | Colour | |
| `filters.active` | {label} ({count}) | {label} ({count}) | es. "Taglia (2)" |
| `filters.size.groupBandCup` | Fascia + coppa | Band + cup | |
| `filters.size.groupLetters` | Lettere | Letter sizes | |
| `filters.option` | {value} [{count}] | {value} [{count}] | `[{count}]` `aria-hidden` |
| `filters.option.sr_one` | {value}, {count} pezzo | {value}, {count} piece | SR |
| `filters.option.sr_other` | {value}, {count} pezzi | {value}, {count} pieces | SR |
| `filters.chip.remove` | Rimuovi filtro {value} | Remove filter {value} | `aria-label`; `×` `aria-hidden` |
| `filters.reset` | Azzera | Clear all | barra filtri |
| `filters.resetFull` | Azzera filtri | Clear filters | stato zero risultati |
| `filters.results_one` | {count} pezzo | {count} piece | visibile; annunciato in `role="status"` |
| `filters.results_other` | {count} pezzi | {count} pieces | |
| `filters.apply_one` | Mostra {count} pezzo | Show {count} piece | primario nel dialog mobile |
| `filters.apply_other` | Mostra {count} pezzi | Show {count} pieces | |
| `filters.empty.title` | [0] | [0] | |
| `filters.empty.body` | Nessun pezzo in {filters}. | No pieces in {filters}. | `{filters}` = valori uniti da spazio, es. "95G nero" |
| `filters.empty.suggestion` | In {value} ci sono: {list}. | In {value}: {list}. | es. "In 95G ci sono: PLANE grafite." |
| `sort.label` | Ordina | Sort | |
| `sort.current` | Ordina: {option} | Sort: {option} | |
| `sort.featured` | In evidenza | Featured | default |
| `sort.priceAsc` | Prezzo ↑ | Price ↑ | |
| `sort.priceAsc.sr` | Prezzo crescente | Price, low to high | nome accessibile |
| `sort.priceDesc` | Prezzo ↓ | Price ↓ | |
| `sort.priceDesc.sr` | Prezzo decrescente | Price, high to low | nome accessibile |

## 14. Footer

| Chiave | IT | EN | Note |
|---|---|---|---|
| `footer.group.service` | Servizio | Service | |
| `footer.group.brand` | Brand | Brand | |
| `footer.group.legal` | Legale | Legal | |
| `footer.group.language` | Lingua | Language | |
| `footer.copyright` | © {year} LINGERAI | © {year} LINGERAI | |
| `footer.demo` | → `demo.footer` | → `demo.footer` | |

Voci dei gruppi = chiavi `nav.*` (Spedizioni, Resi, Guida taglie, Contatti · GRID / 01, About · Termini, Privacy).

## 15. Annunci `aria-live` (regione `role="status"`)

Scritti nella regione del dialog aperto, altrimenti in quella globale. Mai `role="alert"`.

| Chiave | IT | EN | Quando |
|---|---|---|---|
| `announce.added_one` | Aggiunto alla borsa: {name} {type}, {colour}, {size}. Borsa: {count} articolo. | Added to bag: {name} {type}, {colour}, {size}. Bag: {count} item. | dopo "Aggiungi" |
| `announce.added_other` | Aggiunto alla borsa: {name} {type}, {colour}, {size}. Borsa: {count} articoli. | Added to bag: {name} {type}, {colour}, {size}. Bag: {count} items. | |
| `announce.removed` | Rimosso dalla borsa: {name} {type}, {size}. | Removed from bag: {name} {type}, {size}. | |
| `announce.restored` | Rimesso nella borsa: {name} {type}, {size}. | Back in your bag: {name} {type}, {size}. | dopo "Annulla" |
| `announce.qty` | Quantità {qty}: {name} {type}, {size}. | Quantity {qty}: {name} {type}, {size}. | stepper |
| `announce.qtyMax` | Massimo {max} per taglia nella demo. | Maximum {max} per size in this demo. | |
| `announce.colour` | Colore: {colour}. | Colour: {colour}. | cambio swatch |
| `announce.colourSoldOut` | Colore: {colour}, esaurito. | Colour: {colour}, sold out. | |
| `announce.sizeDeselected` | → `product.size.deselected` | → `product.size.deselected` | cambio colore che toglie la taglia |
| `announce.results_one` | {count} pezzo | {count} piece | filtri, debounce 500 ms |
| `announce.results_other` | {count} pezzi | {count} pieces | |
| `announce.gallery` | → `gallery.counter.sr` | → `gallery.counter.sr` | frecce galleria |
| `announce.sampleFilled` | Campi compilati con dati di esempio. | Fields filled with sample details. | checkout |
| `announce.submitting` | Elaborazione dell'ordine demo. | Processing your demo order. | invio checkout |
| `announce.bagReset` | → `bag.reset` | → `bag.reset` | |
| `announce.calcResult` | → `sizeGuide.calc.result` | → `sizeGuide.calc.result` | POI |

Non annunciare: errore "taglia non selezionata" (letto tramite focus + `aria-describedby`), errori del form (riepilogo con focus).

## 16. Errori di sistema

| Chiave | IT | EN | Note |
|---|---|---|---|
| `error.generic.title` | Qualcosa non ha funzionato. | Something went wrong. | 500, POI |
| `error.generic.body` | Ricarica la pagina. La borsa resta dov'è. | Reload the page. Your bag stays put. | |
| `error.generic.reload` | Ricarica | Reload | |
| `error.noscript` | Senza JavaScript la borsa si apre come pagina. Il checkout demo richiede JavaScript. | Without JavaScript the bag opens as a page. The demo checkout needs JavaScript. | `<noscript>`, da verificare con `frontend-developer` |

(404: testi in `pages.md` §8.)
