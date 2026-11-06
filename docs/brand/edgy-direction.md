# LINGERAI edgy — Direzione visiva (branch `edgy`)

> Autore: `art-director` · Data: 2026-11-06 · Stato: **proposta, decide l'utente**
> Base: `docs/decisions.md` (righe 80-82: versione edgy = look + testi; mix punk zine/fotocopia + anti-design brutalista; UI/UX sempre protette), `docs/design/design-system.md`, `src/styles/globals.css`.
> Restano validi: capi solo nero/bianco, foto prodotto a colori (4 in B/N) e editoriali B/N, IT+EN, striscia demo, max 2 sticky, target 44 px, flusso borsa/checkout invariato.
> Limite di lettura: del design system ho letto le sezioni 0-3.15 (token, componenti fino alla riga borsa); le sezioni successive (checkout, pagine) le ho dedotte dai CSS Modules.

**Principio guida (evoluzione di quello MONOLITE):** *la cornice strilla, l'acquisto parla chiaro.* Collage, fotocopie, tagli e rumore stanno nella cornice (header, titoli, foto editoriali, sfondi di sezione). Nome, prezzo, colore, taglia, bottoni, borsa, form e errori restano dritti, piatti, ad alto contrasto.

---

## 0. Cosa cambia nei token (comune a tutte le varianti)

Il sistema attuale e già tutto in custom properties (`globals.css`): per questo il cambio è realistico. Quasi tutto si fa ridefinendo `:root`, non riscrivendo i componenti.

| Token attuale | Cosa succede nell'edgy |
|---|---|
| `--c-concrete` / `--bg-page` | diventa carta (bianco sporco o bianco puro) |
| `--c-signal` arancio `#FF4F00` | **sostituito** da rosso `#C80000` (fondi con testo bianco) e giallo evidenziatore `#FFE600` (fondi con testo nero) |
| `--radius: 0` | resta 0 |
| nessuna ombra | **nuova ombra dura** `--shadow-hard: 4px 4px 0 var(--c-ink)` (nessuna sfumatura) |
| `--border-control` 1 px | sale a 2 px in tutte le varianti (più grezzo e più visibile) |
| focus 2 px singolo | **doppio anello** (vedi §4), funziona su qualsiasi fondo |
| `--dur-*` | invariati; si aggiunge solo `--dur-stamp: 150ms` (timbro, una volta) |

Nuovi token comuni: `--rot-deco` (rotazione decorativa, 0 su mobile in alcuni casi), `--tape` (colore nastro), `--grain` (tile rumore in data-URI SVG, ≤ 6 %), `--shadow-hard`, `--red`, `--highlighter`.

Decisioni precedenti che l'edgy sovrascrive (da annotare in `decisions.md` solo se l'utente sceglie): arancio come unico accento; "niente texture"; "nessuna ombra/gradiente decorativo"; "paragrafi Archivo"; striscia demo arancio; "link visitati uguali" (solo variante B/C).

---

## 1. Le tre varianti

### Variante A — FOTOCOPIA (70 % zine, 30 % brutalista)

**Idea.** Un fanzine incollato con la colla: carta, nastro adesivo, foto sgranate in bianco-nero-rosso, timbri e scritte a pennarello. La struttura però è ordinata e il testo di acquisto resta pulito.

**Palette (contrasti calcolati WCAG)**

| Ruolo | HEX | Uso | Contrasto |
|---|---|---|---|
| Carta | `#F2EFE6` | fondo pagina | — |
| Inchiostro | `#111111` | testo, bordi, bottone primario | su carta **16,4:1** |
| Rosso fotocopia | `#C80000` | fondi con testo bianco; testo rosso solo se ≥ 18 px grassetto | bianco su rosso **6,08:1**; rosso su carta **5,29:1** |
| Nastro | `#D9D2BE` (opacità piena) | nastro adesivo con testo nero sopra | nero su nastro **12,5:1** |
| Evidenziatore | `#FFE600` | striscia demo, tag "aggiunto", fondo parole evidenziate | nero su giallo **14,9:1** |
| Grafite | `#5E5D59` | testo secondario ≥ 14 px | su carta **5,74:1** |

Vietato: nero su rosso (3,1:1), rosso su nero (3,1:1) come testo.

**Font.** Archivo variabile (display 900, `wdth` 62, come oggi) + JetBrains Mono (dati, bottoni, etichette "da macchina da scrivere"). Paragrafi in Archivo 400. **Opzionale: scritta a mano** per 2-3 parole decorative (frecce, "nuovo!", "no pizzo") con **Permanent Marker** (licenza Apache 2.0, Google Fonts): **nuova libreria, serve ok**. Alternativa senza ok: scritte a mano come SVG inline (percorsi) con testo vero nascosto agli screen reader solo se duplicato.

**Foto (solo CSS, nessuna immagine nuova)**
- Editoriali e hero: `filter: grayscale(1) contrast(1.5) brightness(1.05)` + strato `::after` con tile rumore (`--grain`, `mix-blend-mode: multiply`, 25-35 % opacità) + mezzatinta a punti (`radial-gradient` 3 px, `multiply`, 12 %). Opzionale: duotone rosso con `::before` rosso `#C80000` e `mix-blend-mode: screen` sul B/N.
- Card in lista: **le foto prodotto a colori restano a colori**, con solo contrasto 1.1 e grana 15 %; le 4 già in B/N prendono la fotocopia piena. Hover desktop: la foto torna pulita in 0 ms.
- Scheda prodotto: foto **non trattate** (solo cornice e nastro): chi compra deve vedere il capo.
- Soglia vera (fotocopia nera pura) con filtro SVG `feColorMatrix` + `feComponentTransfer discrete`: solo su **hero e Chi siamo** (1-2 immagini; il filtro SVG è costoso in paint, non su griglie).

**Elementi grafici e resa**
- Nastro adesivo: `::before` 90x28 px, `--tape`, `rotate(-4deg)`, bordi seghettati con `clip-path: polygon(...)`, leggera trasparenza assente (serve contrasto fisso). Su 2 angoli della foto, `aria-hidden` implicito (pseudo-elemento senza testo).
- Timbri ("DEMO", "ESAURITO" decorativo, "GRID / 01"): bordo 3 px double rosso, mono uppercase, `rotate(-6deg)`, `mix-blend-mode: multiply`. Decorativi; il tag ESAURITO vero resta dritto e separato.
- Ritagli: `clip-path` irregolare su blocchi foto, mai su blocchi con testo.
- Scarabocchi (cerchi, frecce, sottolineature): SVG inline `aria-hidden`, `pointer-events: none`, `stroke: #C80000` 3 px.
- Titoli "ritaglio di giornale": parole (non lettere!) con fondi alternati carta/ink/rosso, `<span>` per parola. Mai uno `<span>` per lettera (gli screen reader sillabano).
- Ombre dure `4px 4px 0 #111`.

**Header e menu.** Header carta, bordo inferiore 3 px ink, `LINGERAI` 32 px inclinato -1,5deg, sotto un pezzetto di nastro. Voci in mono, `BORSA [0]` come adesivo rosso con testo bianco (6,08:1). Menu mobile: dialog a tutto schermo, voci in Archivo 900 enorme, una per riga, filetto ink 3 px tra le voci, `GRID / 01` evidenziata giallo.

**Card prodotto.** Foto con nastro sull'angolo e rotazione alternata ±1deg (solo ≥ 768 px, 0 su mobile); sotto, **dritti**: nome (Archivo 600), tipo, prezzo in mono dentro cartellino con bordo ink 2 px. Griglia regolare (decisione UX R5).

**Bottoni/CTA.** Primario: fondo ink, testo carta (16,4:1), ombra dura rossa 4px; hover: sposta -2/-2 e l'ombra cresce (0 ms); active: +2/+2 senza ombra. Secondario: bordo ink 2 px, fondo carta, ombra dura ink. Altezze invariate (48/56 px).

**Scheda prodotto.** Colonna foto con nastri e angoli incollati; colonna info **piatta su carta**, senza texture né rotazioni. Prezzo in mono 28 px. Selettore taglia invariato nel comportamento (caselle quadrate bordo ink 2 px, selezionata = fondo ink). Nome prodotto in Archivo 900, può avere uno "sticker" decorativo accanto (es. "nero o bianco").

**Borsa.** Pannello carta piatto, bordo sinistro 3 px, righe separate da linea tratteggiata ink 1 px con "forbici" decorative a inizio pannello (`aria-hidden`). Totale mono 700. CTA primario a tutta larghezza.

**Checkout.** Zero decorazioni nel form. Titolo pagina in stile fanzine. Banner demo: giallo `#FFE600` con bordo ink 3 px e timbro "DEMO" a lato (testo vero "Demo — nessun pagamento…"). Campi: bianco `#FFFFFF`, bordo ink 2 px. Conferma "Ricevuto.": timbro che appare una volta (150 ms), senza animazione con reduced-motion.

**Schizzo home**

```
[ DEMO - NIENTE E IN VENDITA ]  (giallo, bordo ink)
LINGERAI~(tilt)    REGGISENI SLIP BODY ...   IT/EN [BORSA 0](rosso)
=================================================== (3px)
   ______________________________
  |/// foto B/N sgranata      ///|  \  "COSTRUZIONE
  |///  [nastro]               ///|   A VISTA."  (900, enorme,
  |///______________[timbro]____///|   parole su fondi alterni)
   no pizzo  ->(scarabocchio rosso)   [ VEDI IL DROP ] (nero + ombra rossa)
---------------------------------------------------
 GRID / 01  (testo gigante, 1 riga, intero)
 [foto]  [foto]  [foto]  [foto]    <- nastri, +-1deg
 AXIS     PLANE    BEAM    STRUT   <- testo dritto
 95,00 EUR ...
---------------------------------------------------
 Nero o bianco. Niente colori.  (strappo di carta)
```

**Rischi.** Molti pseudo-elementi e blend mode: attenzione a performance (limitare i `mix-blend-mode` a ~10 elementi per schermata) e a forced-colors (decorazioni spariscono, strutture restano).

---

### Variante B — DEFAULT (30 % zine, 70 % brutalista)

**Idea.** Un sito "rotto di proposito": come se il CSS non fosse mai arrivato, ma con testo enorme e bordi crudi. Link blu sottolineati, tabelle, riquadri, nessun fronzolo. Il caos è nella composizione, non nel contrasto.

**Palette**

| Ruolo | HEX | Uso | Contrasto |
|---|---|---|---|
| Bianco | `#FFFFFF` | fondo pagina | — |
| Nero | `#000000` | testo, bordi | su bianco **21:1** |
| Link | `#0000EE` | link nel testo e footer | su bianco **9,40:1**; su grigio **5,15:1** |
| Link visitato | `#551A8B` | link visitati (tipico browser) | su bianco **11,0:1** |
| Grigio sistema | `#C0C0C0` | pannelli, bottoni secondari | nero su grigio **11,5:1** |
| Rosso | `#C80000` | errori, "ESAURITO", un timbro | bianco su rosso **6,08:1**; rosso su bianco **6,08:1** |
| Giallo | `#FFFF00` | striscia demo, evidenziatore | nero su giallo **19,6:1** |
| Grigio testo | `#555555` | testo secondario, **solo su bianco** | **7,46:1** (su grigio sistema 4,09:1, **vietato**) |

**Font.** Solo di sistema, nessuna libreria: display `Times, "Times New Roman", serif` 700-900 a dimensioni enormi (fino a 22rem con `clamp`), dati `"Courier New", ui-monospace, monospace`, UI/bottoni `Arial, Helvetica, sans-serif`. Archivo/JetBrains non servirebbero più (potrebbero restare per fallback/LCP: decisione tecnica). Nota: il rendering varia fra sistemi operativi; accettato, è parte dell'effetto.

**Foto.** Immagini quasi "grezze": `image-rendering: pixelated` solo su miniature decorative, bordo nero 2 px outset, `filter: grayscale(1) contrast(1.8)` (soglia SVG) su hero; thumbnails delle card a colori senza filtri. Alcune foto con grande cornice nera e didascalia in Courier (es. "fig. 1 — AXIS, nero"). Niente grana generalizzata.

**Elementi grafici.** Bordi `outset/inset` 3 px, `<hr>` spessi, `<marquee>`-like **solo statico** (niente scorrimento: 2.2.2), tabelle visibili per le specifiche prodotto, testo enorme sovrapposto: parola gigante dietro la foto come `<span aria-hidden>` con `z-index` basso e foto con striscia di titolo solida sopra. Rotazioni quasi assenti (1-2 elementi). Un solo timbro rosso per pagina.

**Header e menu.** Barra a una riga stile pagina anni '90: `LINGERAI` in Times 900 32 px, voci separate da `|` (carattere decorativo `aria-hidden`), link blu sottolineati. Sotto, `<hr>` nero 4 px. `BORSA [0]` in riquadro nero con testo bianco. Menu mobile: elenco di link blu sottolineati a 32 px su bianco, intero schermo.

**Card prodotto.** Riquadro con bordo nero 2 px; foto; nome come link blu sottolineato (Times 700, 20 px); prezzo in Courier grassetto; tag ESAURITO rosso con testo bianco. Rotazione 0. Griglia regolare.

**Bottoni/CTA.** Primario: fondo nero, testo bianco, bordo 3 px outset grigio-bianco (aspetto Win95), active = inset. Secondario: grigio `#C0C0C0` con bordo outset (leggibile ma distinto dal primario). Altezze invariate.

**Scheda prodotto.** Layout a due colonne con tabella delle specifiche (composizione, lavaggio) bordata; selettore taglia = stesse caselle quadrate con bordo nero 2 px; selezionata nero pieno. Prezzo enorme in Courier 700.

**Borsa.** Pannello bianco, bordo nero 3 px, righe come tabella con bordi visibili; totale in Courier grassetto; CTA primario.

**Checkout.** Form nativo-look (campi bianchi, bordo inset 2 px, label sopra); banner demo giallo `#FFFF00` con bordo nero 3 px e testo nero 16 px bold. Conferma "Ricevuto." in Times 900 enorme.

**Schizzo home**

```
 [DEMO: niente e in vendita. Non inserire dati reali.]  (giallo, bordo)
 LINGERAI | Reggiseni | Slip | Body | Sottovesti | Accessori | IT/EN [BORSA 0]
 #################################################################
 COSTRUZIONE
   A VISTA.        <- Times 900, 15rem, righe sovrapposte alla foto
        +--------------------------+   (foto in cornice nera 3px outset)
        |  foto B/N soglia dura    |   fig. 1 - AXIS, nero
        +--------------------------+
 _Vedi il drop GRID / 01_  (link blu sottolineato)   [ AGGIUNGI ... ]
 -----------------------------------------------------------------
 | AXIS     | PLANE    | BEAM     | STRUT    |  (tabella 4 colonne)
 | [foto]   | [foto]   | [foto]   | [foto]   |
 | 95,00 EUR| 120,00...|          |          |
```

**Rischi.** La più "stridente": rischio percezione di sito amatoriale/abbandonato e perdita di fiducia nell'acquisto (anche se demo). Le gerarchie classiche (CTA evidente) vanno protette con attenzione extra. Font di sistema = rendering imprevedibile.

---

### Variante C — CUT & PASTE (50/50, mix bilanciato)

**Idea.** La struttura è brutalista (testo enorme, bordi grezzi, link blu sottolineati nel testo, mono ovunque), le superfici editoriali sono zine (foto fotocopiate, nastro, timbri, scritte). Dove si compra, tutto è calmo.

**Palette**

| Ruolo | HEX | Uso | Contrasto |
|---|---|---|---|
| Carta | `#F4F1E8` | fondo pagina | — |
| Inchiostro | `#0A0A0A` | testo, bordi, primario | su carta **17,5:1** |
| Rosso | `#C80000` | fondi con testo bianco; testo rosso solo ≥ 18 px bold | bianco su rosso **6,08:1**; rosso su carta **5,38:1** |
| Bianco | `#FFFFFF` | card, campi form, pannello borsa | ink su bianco **19,4:1** |
| Evidenziatore | `#FFE600` | striscia demo, banner checkout, parole evidenziate | nero su giallo **15,6:1** |
| Link | `#0000EE` / `#551A8B` | **solo** link inline e footer | su carta **8,3:1** / **9,7:1** |
| Grafite | `#5E5D59` | testo secondario ≥ 14 px su carta o bianco | **5,84:1** (su bianco 6,15:1) |

**Font.** Display Archivo 900 `wdth` 62 enorme (già installato); dati/UI JetBrains Mono (già installato); **paragrafi lunghi in serif di sistema** (`"Times New Roman", Times, serif`, 1.125rem) per l'effetto "documento", nessuna libreria nuova. Facoltativo come in A: Permanent Marker (**nuova libreria, serve ok**) per 2-3 parole decorative.

**Foto.** Come A per le editoriali (grayscale + contrasto + grana + mezzatinta), con **striscia rossa** (`mix-blend-mode: multiply` sulla foto B/N) solo su hero e Chi siamo. Come B per i bordi: cornice ink 3 px sulle foto di lista (card), foto prodotto a colori senza filtri. Scheda prodotto: nessun filtro.

**Elementi grafici.** Nastro e timbri solo nelle sezioni editoriali (home, drop, Chi siamo, 404, conferma) e su 1 card ogni tanto; titoli enormi interi con parola fantasma `aria-hidden` dietro; tagli netti a 90 gradi (niente clip-path irregolari, quelli solo sul nastro); ombra dura 4 px sulle card (non sui form); parole evidenziate giallo nei paragrafi.

**Header e menu.** Header carta con bordo inferiore 3 px; logotipo `LINGERAI` 32 px dritto con sottile nastro rosso sotto; voci in mono con sottolineatura 3 px rossa per la voce corrente (non solo colore: anche `aria-current`); `BORSA [0]` in riquadro ink con testo carta. Menu mobile: voci giganti (Archivo 900) con numero `[04]` in mono a destra e filetti ink 3 px.

**Card prodotto.** Riquadro bianco, bordo ink 2 px, ombra dura 4 px; foto con eventuale nastro in alto (alternato), rotazione 0 (o ±0,8deg solo su 1 card editoriale); sotto nome (Archivo 600 maiuscolo), tipo grafite, prezzo mono grande. Hover desktop: la card si solleva di 2 px (ombra 6 px), 0 ms.

**Bottoni/CTA.** Primario: ink pieno, testo carta, ombra dura rossa 4px, hover -2/-2, active +2/+2. Secondario: bianco, bordo ink 2 px. Testuale: sottolineato 2 px. Tag errore/aggiunto: rosso/giallo con testo e icona (non solo colore).

**Scheda prodotto.** Colonna foto con eventuale nastro; colonna info bianca e piatta con bordo ink 2 px (nessuna rotazione, nessuna grana). Selettore taglia invariato. Barra Aggiungi mobile sticky = bottone primario pulito.

**Borsa.** Pannello bianco, bordo sinistro 3 px, righe separate da tratteggio; totale mono 700; messaggio vuoto in stile zine (solo testo, niente illustrazioni complesse).

**Checkout.** Pannello bianco piatto con tutti i campi puliti; banner demo giallo con bordo ink 3 px; titolo pagina e conferma "Ricevuto." in stile zine (timbro).

**Schizzo home**

```
[ DEMO / NIENTE E IN VENDITA ]  (giallo)
LINGERAI(rosso sotto)  Reggiseni Slip Body ...   IT / EN  [BORSA 0]
==================================================== 3px
COSTRUZIONE            (Archivo 900, 18vw, sotto al titolo "ghost"
A VISTA.               ripetuto in contorno, aria-hidden)
+--------------------------------------+
|/// foto B/N + striscia rossa ///      |  [nastro]
|///  nero o bianco. niente colori. ///  |  <- striscia solida ink + testo carta
+--------------------------------------+      ->scarabocchio
 Leggi il manifesto (blu sottolineato)     [ VEDI IL DROP ] (ink + ombra rossa)
----------------------------------------------------
 GRID / 01   [timbro]                       13 pezzi
+-------+ +-------+ +-------+ +-------+
|[foto] | |[foto] | |[foto] | |[foto] |   <- card bianche, bordo 2px, ombra dura
| AXIS  | | PLANE | | BEAM  | | STRUT |
| 95,00 | | ...   |
```

**Rischi.** Richiede disciplina: se la zine invade le zone di acquisto torna la confusione. Più lavoro di rifinitura (due linguaggi) ma è il mix effettivamente richiesto.

---

## 2. Paletti UX/a11y (comuni a tutte)

Obiettivo: WCAG 2.2 AA. Questa sezione è vincolante per sviluppo e revisione.

**Dove l'edgy NON si applica (zona calma)**
1. Bottoni di azione (Aggiungi, Vai al checkout, Conferma ordine demo): mai ruotati, mai storti, mai testo a mano, altezza minima 44 px (primario 48/56); etichetta in mono maiuscola; stati hover/active/focus chiari. L'ombra dura è l'unica decorazione ammessa.
2. Form e checkout: campi su fondo piatto bianco/carta, bordo 2 px, label sopra, errori con testo + bordo + fondo (mai solo colore), nessuna texture/grana/rotazione dentro o dietro i campi.
3. Prezzi, taglie, colori, quantità, totali: sempre in mono (o Courier in B), dritti, ≥ 16 px, contrasto ≥ 7:1.
4. Selettore taglia/colore: stessi radio nativi e stessa anatomia di oggi (caselle 44x44, selezionata = fondo pieno, esaurita = barrata + testo "esaurita"). Nessun effetto "rotto".
5. Borsa e riepilogo: pannello piatto, nessun collage; il contatore `BORSA [n]` mantiene `aria-label` e regione status.
6. Navigazione: ordine nel DOM = ordine visivo (mai `order` per la lettura); griglie di catalogo sempre regolari; menu mobile semplice e chiuso con `Esc`.

**Regole sugli effetti**
- **Rotazioni solo decorative** (nastri, timbri, foto incorniciate, scribble) e al massimo ±6deg per timbri, ±1,5deg per foto/logo. Nessuna rotazione su testo che l'utente deve leggere o su elementi cliccabili (il logo link ruotato -1,5deg è ammesso se l'area resta ≥ 44 px e il testo leggibile; nell'A/C lo fa solo il wordmark).
- Zero testo importante dentro immagini o dentro pseudo-elementi (`::before/::after content`): le scritte decorative sono elementi reali `aria-hidden="true"` e non portano informazione unica.
- **Testo sopra foto** solo su fondo solido (striscia ink/carta/giallo con `box-decoration-break: clone`) ≥ 4,5:1; mai testo direttamente su grana o mezzatinta.
- Grana: opacità ≤ 6 % su fondi sotto testo (testo grafite scende da 5,74 a ~5,0:1, ancora ok); mai nelle zone calme. Verificare il pixel peggiore con l'`accessibility-auditor`.
- Parole giganti sovrapposte: solo come copia `aria-hidden`; titolo vero `h1` completo, intero, mai tagliato (decisione 2026-11-06), nessun overflow orizzontale a 320 px; reflow 1.4.10.
- Spaziatura testo (1.4.12): niente altezze fisse né `overflow: hidden` su contenitori di testo.
- Titoli "ritaglio": un `<span>` per parola (mai per lettera), con contrasto testo/fondo verificato per ogni coppia.
- Link: nel testo sempre sottolineati (B/C aggiungono blu/viola; A resta ink sottolineato); non affidarsi al solo colore.
- **Focus visibile**: doppio anello `outline: 3px solid #111; outline-offset: 2px; box-shadow: 0 0 0 2px #fff` (nero con alone bianco: ≥ 3:1 su carta, bianco, rosso, giallo e foto). Non rimosso mai; non nascosto da ombre dure o nastri (`z-index`).
- **prefers-reduced-motion**: tutte le animazioni a 0,01 ms (regola già globale); timbro e "sobbalzo" disattivati; nessuna animazione continua, nessun marquee. Una sola micro-animazione ammessa al caricamento (timbro 150 ms, una volta).
- Hover solo con `(hover: hover) and (pointer: fine)`; nessuna informazione solo in hover (la foto "pulita" in hover è un bonus).
- Cursori personalizzati, effetti di scroll, parallax: vietati.
- `forced-colors`: le decorazioni scompaiono, ma bordi, tag e stati selezionati restano (bordo `CanvasText`, outline `Highlight` come già nel design system).
- Colori: nuovi accenti (rosso/giallo) solo con coppie calcolate sopra; errore e "aggiunto" sempre con testo, mai solo colore.
- Max 2 elementi sticky (invariato), nessuno sticky con altezza finestra ≤ 600 px.
- Performance: niente `feTurbulence` live su immagini (usare tile statico data-URI); filtri SVG di soglia solo su 1-2 immagini; `mix-blend-mode` contenuto; LCP sull'hero non peggiora (le foto restano `next/image` con priority dove oggi).
- Contenuto: striscia demo e banner checkout restano chiari e non ironici; il testo "demo / nessun pagamento / non inserire dati reali" non viene stilizzato fino a perdere leggibilità.

---

## 3. Raccomandazione

**Variante C — CUT & PASTE.**

Motivi:
1. È il mix richiesto alla lettera: struttura brutalista (testo enorme, bordi grezzi, mono, link sottolineati) + zine solo dove si "racconta" (home, drop, Chi siamo, foto, 404, conferma).
2. Protegge l'acquisto meglio di A (meno collage ovunque) e senza il rischio di "sito abbandonato" di B: card bianche, form puliti, CTA chiare.
3. Costo basso: nessuna libreria nuova (serif di sistema + Archivo + JetBrains Mono già presenti); le decorazioni sono poche classi CSS riutilizzabili.
4. Facile da calibrare dopo: aumentare o diminuire la quota zine/brutalista è un cambio di token e di 4-5 classi decorative.

Se si vuole più "punk puro", A è la seconda scelta; B solo se l'utente accetta il rischio percezione.

Domande per l'utente:
- Ok a **Permanent Marker** (nuova libreria, Apache 2.0) per 2-3 parole a mano, oppure scarabocchi solo SVG?
- Ok a sostituire l'arancio `#FF4F00` con rosso `#C80000` + giallo `#FFE600` (decisione del 2026-11-05 valida solo su `main`)?
- Vuoi che anche i link nel testo diventino blu/viola (C/B) o restino neri sottolineati (A)?

---

## 4. File da toccare (stima di impatto)

**Alto (stile o struttura cambiano molto)**
- `src/styles/globals.css`: palette, nuovi token (`--shadow-hard`, `--grain`, `--tape`), focus doppio anello, `.btn*`, `.tag*`, link; classi utility decorative (`.deco-tape`, `.deco-stamp`, `.deco-scribble`).
- `src/styles/fonts.ts`: solo se si aggiunge Permanent Marker (o se in B si tolgono Archivo/JetBrains).
- `layout/Header.module.css`, `MobileMenu.module.css`, `DemoStrip.module.css`, `Footer.module.css`, `LanguageSwitcher.module.css`
- `pages/HomePage.module.css`, `DropPage.module.css`, `AboutPage.module.css`, `NotFoundContent.module.css`
- `ui/WallTitle.module.css`, `ui/EditorialPhoto.module.css`, `product/Media.module.css`
- `messages/it.json`, `messages/en.json` (testi edgy)

**Medio**
- `product/ProductCard.module.css`, `ProductGrid.module.css`, `Gallery.module.css`
- `pages/CategoryPage.module.css`, `CategoryList.module.css`, `drop/DropCatalog.module.css`
- `pages/ProductPage.module.css`, `product/ProductDetail.module.css` (cornici e prezzo; selettore taglia quasi invariato)
- `bag/BagPanel.module.css`, `BagContents.module.css`, `BagPage.module.css`, `ui/Dialog.module.css`
- `checkout/Checkout.module.css` (banner demo, titoli, conferma; campi quasi invariati)

**Basso**
- `pages/InfoPage.module.css`, `SizeGuidePage.module.css`, `CreditsPage.module.css`, `sizeguide/SizeGuide.module.css`

**Possibili nuovi file:** un piccolo componente `<Tape />`, `<Stamp />`, `<Scribble />` oppure solo classi CSS globali; un file `grain.svg` (o data-URI nel CSS).

**Rischi di regressione**
- I test Playwright (`tests/e2e/`) probabilmente cercano testi: i nuovi testi li rompono (da aggiornare).
- Contrasti e focus da ricontrollare con `accessibility-auditor` e pagine 375/1440 px.
- Rimozione del "niente texture" e delle ombre del design system: da annotare in `decisions.md` solo dopo la scelta dell'utente.

**Stima effort (variante C):** circa 1-2 giornate di lavoro del `frontend-developer` per i token e i componenti principali, più 0,5-1 giornata di rifinitura (foto, decorazioni, testi) e una passata di revisione a11y.
