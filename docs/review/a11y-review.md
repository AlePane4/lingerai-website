# LINGERAI — Revisione accessibilità (Fase 7, WCAG 2.2 AA)

> Autore: `accessibility-auditor` · Data: 2026-11-06 · Metodo: lettura del codice in `src/` e `public/placeholders/`, HTML generato letto con curl da `localhost:3200` (`/it`, `/en`, categoria, scheda, drop, borsa, checkout, guida taglie). Nessun browser né screen reader usato: i comportamenti dinamici sono dedotti dal codice.
> Priorità: **alta** = barriera in un flusso centrale · **media** = difficoltà significativa · **bassa** = miglioramento o caso limite.

## 1. Sintesi

- **Nessun problema di priorità alta.** Il sito è costruito bene: dialog nativi con focus trap ed Esc, regioni `status` dentro ogni dialog, `lang` corretto (`it` / `en-GB`), skip link per primo nel DOM, alt corretti, movimento ridotto gestito.
- **Contrasti tutti conformi** (tabella al §4). Il valore più basso è `#7d7c78` su nero, 4,52:1, ma quel token non è usato nel codice.
- **4 problemi di priorità media**, tutti sulla tastiera o sugli annunci: errore "taglia mancante" letto in modo non garantito, focus perso sulle frecce della galleria, errori del checkout non annunciati alla perdita del focus, barre fisse che coprono il focus.
- **9 problemi di priorità bassa** (struttura dei titoli, alt dei segnaposto, caso limite nei filtri, testi a 12 px).
- Nessun conflitto con `docs/decisions.md`: le correzioni qui sotto conservano lo stile edgy (nessuna cambia colori, font o layout).

## 2. Stato delle raccomandazioni precedenti

| Raccomandazione (`a11y-design-system-review.md`) | Stato | Dove |
|---|---|---|
| Skip link prima della striscia demo | Applicata | `[lang]/layout.tsx:48` |
| Regione `status` dentro ogni dialog (P1) | Applicata | `Announcer.tsx:54-62`, `Dialog.tsx:85` |
| Focus 2+2, anello inset sui contenitori scorrevoli, anello sulla casella visibile | Applicata | `globals.css:259`, `Gallery.module.css:17`, `SizeGuide.module.css:114`, `:has(:focus-visible)` nei moduli |
| `forced-colors` sugli stati a fondo pieno (P3) | Applicata | `globals.css:561`, outline `Highlight` sui moduli |
| Reduced motion a `0.01ms` | Applicata | `globals.css:270`; animazioni dialog solo con `no-preference` (`Dialog.module.css:31`); inversione contatore saltata (`BagCounter.tsx:22`) |
| Bordo obbligatorio sugli swatch; diagonale chiara sugli scuri (P2) | Applicata | `ProductDetail.module.css:67,106` |
| K1: numeri dei disegni ingranditi + bottone "Ingrandisci" | Applicata | SVG a 28 px su viewBox 800 (era 13); `Gallery.tsx:124-156` |
| K2: "esaurito" scritto nell'etichetta del colore | Applicata | `ProductDetail.tsx:198` |
| K3: frecce nascoste a inizio/fine | Applicata, ma crea A11Y-2. Lo stepper `−` disattivato resta a bordo pieno grigio, non tratteggiato (`BagContents.module.css:130`): accettabile, i controlli disattivati sono esenti da 1.4.11 |
| K4: niente texture | Applicata | `globals.css:175` (fondo piatto) |
| Errore taglia con `aria-describedby` sui radio; frecce su taglia esaurita ripristinano la selezione; sottogruppi per fascia | Applicata, con riserva su A11Y-1 | `ProductDetail.tsx:89-98,136-153,242` |
| `ANNULLA` senza limite di tempo | Applicata | `BagContents.tsx:127-131` |
| Frecce galleria 44×44; nome della traccia | Applicata | `Gallery.module.css:43-57`, `Gallery.tsx:81` |
| `overflow-wrap` di emergenza sui titoli | Applicata | `globals.css:224` |
| `scroll-padding-top` esteso alla barra filtri mobile (R13) | **Non applicata** | `globals.css:164` (vedi A11Y-4) |
| M1 `hreflang` coerente con `en-GB` | Applicata | `LanguageSwitcher.tsx:42` |
| SVG: id con prefisso, `aria-labelledby` solo sul titolo (S2, S3) | Applicata | `public/placeholders/*.svg` |

## 3. Problemi

| ID | Prio | WCAG | Problema | File:riga | Correzione |
|---|---|---|---|---|---|
| A11Y-1 | media | 3.3.1, 4.1.3 | "Aggiungi" senza taglia: `first.focus()` parte prima del render, quindi il radio non ha ancora `aria-describedby` e il messaggio è ancora `hidden`. Che lo screen reader legga l'errore dipende dalla sua temporizzazione; il commento "il messaggio viene letto col focus" non è garantito. Stesso limite per il messaggio informativo di taglia esaurita (righe 89-98), che non viene annunciato | `ProductDetail.tsx:105-112`, `:89-98` | Annunciare comunque il testo: `announce(t("product.size.error.none"))` (e il testo "esaurita") nella regione `status` oltre al focus. In alternativa mettere il focus in un `useEffect` dopo il render. Aggiornare la nota M4 del report precedente (era basata sul presupposto che il focus bastasse) |
| A11Y-2 | media | 2.4.3, 3.2.x | Premendo la freccia che porta alla prima/ultima vista, il pulsante viene smontato mentre ha il focus (`index > 0` / `index < total - 1`): il focus cade sul `body` | `Gallery.tsx:103-107,113-117` | In `go()`, se `next` è un estremo, spostare il focus sull'altra freccia (o sul pulsante `Ingrandisci`) con `requestAnimationFrame`. Mantiene la decisione K3 (frecce nascoste) |
| A11Y-3 | media | 4.1.3 | Gli errori che compaiono all'uscita da un campo (`blur`) sono nel DOM ma non annunciati: chi usa uno screen reader li scopre solo tornando sul campo o all'invio (l'invio ha il riepilogo, ottimo) | `CheckoutForm.tsx:94-100` | Nel `blur`, se la chiave d'errore è nuova: `announce(t(key))`. Alternativa: `role="alert"` solo sul `<p>` dell'errore che appare a `blur` (non sul riepilogo) |
| A11Y-4 | media | 2.4.11 | Barra "Aggiungi" fissa in basso (mobile) e barra filtri sticky in alto non sono considerate nello scroll: con Tab un link da 44 px (`reassureLink`, `summary`, scheda "Completa il set", filtri) può finire interamente sotto la barra. Manca `scroll-padding-bottom`; il `scroll-padding-top` non include la barra filtri (R13 non applicata) | `globals.css:164-171`, `ProductDetail.module.css:333-350`, `DropCatalog.module.css:9-15` | Quando `showSticky` è vero, `document.documentElement.dataset.stickyBar=""` e `html[data-sticky-bar]{scroll-padding-bottom:calc(var(--h-control) + var(--space-4))}`. Per il drop mobile: `scroll-padding-top: calc(var(--h-header) + var(--h-control) + var(--space-2))` (solo `max-width:63.9375rem` e `min-height:37.5625rem`) |
| A11Y-5 | bassa | 1.3.1, 2.4.6 | Nella scheda prodotto i titoli `h2` "Legenda" (e quello del dialog di zoom) precedono l'`h1` nel DOM, perché la galleria viene prima | `Gallery.tsx:21,143`; `ProductDetail.tsx:177-182` | Legenda come `<p className="t-label">` dentro `figcaption`, oppure portare l'`h1` prima della galleria nel DOM e posizionarlo con la griglia CSS |
| A11Y-6 | bassa | 1.3.1 | Drop: dall'`h1` si passa direttamente a `h3` (schede senza `h2`) | `DropCatalog.tsx:227` (`ProductGrid` con default `h3`), `DropPage.tsx:52` | Passare `heading="h2"` a `ProductGrid` nel drop, come già fa la categoria (`CategoryPage.tsx:48`) |
| A11Y-7 | bassa | 1.1.1 | Le viste `retro` e `dettaglio` non hanno disegno: mostrano il segnaposto generico (griglia, nome), ma l'alt dice "disegno tecnico, vista dal retro / dettaglio della cucitura…" | `Media.tsx:24,39`; `products.ts:187-195` (e prodotti analoghi) | Finché mancano i disegni, alt con prefisso "Segnaposto: …" (IT/EN) per le viste senza SVG; ripristinare la descrizione quando i disegni arrivano |
| A11Y-8 | bassa | 2.4.3 | Con filtri che danno 0 risultati, togliere il filtro mentre ha il focus fa sparire la casella (`count === 0 && !checked` restituisce `null`): il focus si perde | `DropCatalog.tsx:83` | Tenere nel DOM l'opzione appena disattivata finché il focus è su di essa, oppure spostare il focus sul pulsante del gruppo |
| A11Y-9 | bassa | 1.4.10 (da verificare in browser) | Aprire la borsa dal menu mobile chiude il menu (`closest("a")` in `MobileMenu.tsx:29`): l'evento `close` del menu, asincrono, esegue `delete dataset.scrollLock` mentre il pannello borsa è aperto. La pagina dietro può tornare a scorrere | `Dialog.tsx:51-52`, `MobileMenu.tsx:29` | Contare i dialog aperti (`document.querySelectorAll("dialog[open]").length`) e togliere il blocco solo a zero |
| A11Y-10 | bassa | 2.4.3 | La traccia della galleria resta `tabIndex=0` + `role="region"` anche da 1024 px, dove non scorre (`overflow: visible`): sosta inutile da tastiera | `Gallery.tsx:76-81`; `Gallery.module.css:125-130` | Rendere `tabIndex` e `role` condizionali con `matchMedia("(max-width: 63.9375rem)")`, oppure accettare (impatto minimo) |
| A11Y-11 | bassa | 4.1.2 | "Guida taglie" è un `<a href>` che apre un dialog: lo screen reader annuncia "link" ma il comportamento è quello di un pulsante | `ProductDetail.tsx:226-233` | `aria-haspopup="dialog"` sul link (l'href resta come riserva senza JS) |
| A11Y-12 | bassa | 1.3.1 | Titoli `h2` dentro `<summary>`: il ruolo di pulsante del `summary` rende i figli presentazionali, i titoli non risultano nella navigazione per titoli | `ProductDetail.tsx:318-352` | Facoltativo: togliere gli `h2` e usare `<span className="t-h3">` nel `summary` |
| A11Y-13 | bassa | 1.4.4 (leggibilità, non violazione) | Testi informativi a 12 px maiuscolo con spaziatura larga: la frase della striscia demo (che contiene l'avviso "niente è in vendita") e le etichette dei campi del checkout | `DemoStrip.module.css:14`; `CheckoutForm.tsx:178,279,312` | Portare a `var(--fs-ui)` (14 px) la frase della striscia e le label dei campi; lo stile mono maiuscolo resta |

**Da verificare in browser (non contato):** colonna info della scheda desktop sticky (`ProductDetail.module.css:393`). Con la griglia taglie (7 righe da 44 px) la colonna può superare l'altezza del viewport su portatili 768-900 px: in quel caso fondo colonna (pulsante, accordion) irraggiungibile finché non finisce la galleria (1.4.10, 2.4.11). Se confermato: togliere lo `sticky` sotto, ad esempio, `min-height: 56rem`.

## 4. Verifiche superate

**Contrasti** (formula WCAG, dai valori di `globals.css:3-32`):

| Coppia | Rapporto | Criterio | Esito |
|---|---|---|---|
| `#111111` su Cemento `#e6e4df` (testo, anello focus) | 14,86 | 1.4.3 / 1.4.11 | ok |
| `#111111` su Bianco ottico `#f7f7f5` (campi, riepilogo) | 17,60 | 1.4.3 | ok |
| `#5e5d59` su Cemento / su Bianco ottico (testo grigio, ≥14 px) | 5,19 / 6,15 | 1.4.3 | ok |
| `#111111` su Segnale `#ff4f00` (striscia, banner, tag) | 5,73 | 1.4.3 | ok |
| Cemento su `#111111` (bottone primario, skip link) | 14,86 | 1.4.3 | ok |
| `#82817e` su Cemento (bordo taglia esaurita) | 3,07 | 1.4.11 | ok, al limite |
| `#7d7c78` su `#111111` (`--text-muted-on-inverse`) | 4,52 | 1.4.3 | ok, non usato |
| `#c6c4c0` su Cemento (linee decorative) | 1,37 | — | decorativo, non conta |

**Altro:**
- **Tastiera / dialog:** menu, borsa, guida taglie, zoom e filtri usano `<dialog>` + `showModal()` (`Dialog.tsx:36`): focus trap e Esc nativi; il focus torna all'elemento che ha aperto (`:54`) o al contatore (`BagPanel.tsx:36`). La borsa porta il focus sul titolo e annuncia "Aggiunto alla borsa…" nella regione del dialog (`BagPanel.tsx:21-26`).
- **Nomi accessibili:** logo, lingua, contatore borsa, frecce, rimuovi/annulla, stepper, chip dei filtri hanno nomi che contengono il testo visibile (2.5.3).
- **Form checkout:** `label`/`htmlFor` su tutti i campi, `required` + frase "tutti obbligatori", "(facoltativo)" nelle label, `autocomplete` shipping, `aria-invalid` + `aria-describedby` (errore prima dell'hint), riepilogo errori con focus e link ai campi, errore con tag testuale "ERRORE" (non solo colore), checkbox termini mai pre-spuntata.
- **Lingua:** `<html lang="it">` / `lang="en-GB"`, `lang` sui link del selettore.
- **Alt:** foto editoriali con alt descrittivi in IT/EN; card con `alt=""` (il link ha nome e prezzo); viste frontali con `alt` descrittivo.
- **Movimento:** nessun autoplay né parallax; `scrollTo` e `scrollIntoView` senza animazione; transizioni ≤200 ms.
- **Target 2.5.8:** 44 px su tutti i controlli; 24 px (limite) solo per link inline della striscia e footer desktop (`Footer.module.css:100`). Checkbox e radio da 20 px hanno etichetta cliccabile e spaziatura.
- **Viewport:** nessun `maximum-scale`; zoom del browser consentito. **Titoli:** un solo `h1` per pagina (muro con testo reale e solo l'ornamento `aria-hidden`).
