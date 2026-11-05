# LINGERAI — Design system (Fase 4)

> Autore: `art-director` · Data: 2026-11-05 · Stato: **proposta aggiornata con le decisioni dell'utente (2026-11-05)**; restano aperte solo le domande di §5.2
> Base vincolante: `docs/decisions.md` — direzione **A MONOLITE** + disegni tecnici come placeholder; arancio `#FF4F00` solo come fondo pieno con testo `#111111`; titoli tagliati solo da 768 px; due livelli di linea; grigio solo ≥14 px; logotipo solo testo; borsa = pannello + pagina; striscia demo ovunque.
> **Decisi in questa fase** (vedi §5.1): fondo contenitori immagine = Cemento con griglia; logotipo header 32 px; striscia demo arancio + tag "errore"/"aggiunto" arancio; paragrafi in Archivo; campi obbligatori con frase in cima + "(facoltativo)"; frecce galleria mobile; max 2 sticky; griglia visibile nei disegni e legende HTML bilingue (`docs/visual/visual-guidelines.md`).
> Rispetta le **14 regole** di `docs/design/a11y-early-check.md` §4 (riferimenti `[R1]…[R14]` nel testo).
> **[a11y]** Le note marcate `[a11y]` sono correzioni tecniche dell'`accessibility-auditor` (2026-11-05) che non cambiano l'aspetto; report e conflitti aperti in `docs/design/a11y-design-system-review.md`.
> Etichette in `MAIUSCOLO` = **provvisorie** (testi finali: `copywriter`, fase 5). Nel codice il sorgente resta in sentence case; il maiuscolo si fa con CSS `[R4]`.
> Trattamento grafico dei disegni tecnici: `docs/visual/` (agente `visual-content`). Qui solo il **contenitore** (§3.22).

**Principio guida:** *la cornice urla, l'acquisto parla piano.* Tutto ciò che si compra (nome, tipo, prezzo, colore, taglia, bottoni, borsa, form, errori, demo) è nel font di testo, dritto, nero su cemento. Il carattere grezzo vive solo in titoli display, tagli, griglia a vista e vuoto.

---

## 0. Convenzioni

- Token in CSS custom properties (`--color-…`, `--space-…`) da esporre anche come oggetto TS (`tokens.ts`) in fase 6.
- Unità: `rem` per testo e spaziature (1 rem = 16 px, mai fissato sull'`html`), `px` solo per linee e bordi.
- Nessun `border-radius`, nessuna ombra, nessun gradiente decorativo in tutto il sito.
- Stati `hover` solo con `@media (hover: hover)`; il focus usa sempre `:focus-visible` `[R3]`.

---

## 1. Design token

### 1.1 Colori — primitivi

| Token | HEX | Nome | Note |
|---|---|---|---|
| `--c-concrete` | `#E6E4DF` | Cemento | fondo base |
| `--c-ink` | `#111111` | Nero cantiere | testo, controlli, bottoni pieni |
| `--c-graphite` | `#5E5D59` | Grafite | testo secondario (≥14 px) |
| `--c-formwork` | `#C9C6BF` | Cassaforma | **non più usato per i contenitori immagine** (decisione utente); tenuto come primitivo di riserva, nessun uso previsto nel MVP |
| `--c-optic` | `#F7F7F5` | Bianco ottico | fondo alternativo sezioni / campi |
| `--c-signal` | `#FF4F00` | Segnale | **solo fondo pieno con testo `#111111`** |
| `--c-line-deco` | `#C6C4C0` | Planimetria | = `#111111` al 15 % su Cemento; solo decorativa |
| `--c-line-mid` | `#82817E` | Linea controllo minima | = `#111111` al 47 %; 3,07:1 su Cemento |
| `--c-graphite-on-ink` | `#7D7C78` | Grafite chiara | testo grigio su `#111111` (se servisse) |

### 1.2 Colori — token semantici (uso consentito) `[R1]`

| Token | Valore | Su quali fondi | Per cosa | Contrasto (fonte a11y §1) |
|---|---|---|---|---|
| `--bg-page` | `--c-concrete` | — | fondo di tutte le pagine | — |
| `--bg-alt` | `--c-optic` | — | sezioni alternate, campi form | — |
| `--bg-media` | `--c-concrete` + griglia `--line-deco` (passo 80 su viewBox 800, cioè 10 %) | — | contenitore immagini/disegni (**deciso**): il disegno "galleggia" nella planimetria | il contenitore non ha confine visibile col fondo pagina: nome e prezzo bastano a capire la card (a11y §1.2 #22) |
| `--bg-garment` | `--c-optic` | dentro il disegno | riempimento dei capi opachi (vedi `visual-guidelines.md` §1.2) | — |
| `--bg-inverse` | `--c-ink` | — | bottone primario, taglia selezionata, tag esaurito, `BORSA` invertita | — |
| `--bg-signal` | `--c-signal` | — | **deciso**: striscia demo, banner checkout, tag `ERRORE`, tag `AGGIUNTO`, badge HTML sopra la card (`ULTIMI PEZZI`, eventuale `NUOVO`). Sempre fondo pieno con testo `#111111` | 5,73:1 ✔ |
| `--bg-overlay` | `rgba(17,17,17,.40)` | sopra la pagina | velo dietro pannelli | decorativo |
| `--text` | `--c-ink` | Cemento / Bianco ottico / Segnale | tutto il testo | 14,86 · 17,60 · 5,73 :1 ✔ |
| `--text-inverse` | `--c-concrete` | `#111111` | testo su fondo nero | 14,86:1 ✔ |
| `--text-muted` | `--c-graphite` | **solo** Cemento / Bianco ottico, **solo ≥14 px** | tipo prodotto, note, hint, taglia esaurita | 5,19 · 6,15 :1 ✔ |
| `--text-muted-on-inverse` | `#7D7C78` | `#111111`, ≥14 px | nessun uso previsto ora | 4,52:1 ✔ |
| `--line-deco` | `#C6C4C0` 1 px | Cemento | griglia "planimetria", separatori di card | 1,37:1 — **mai unico confine di un controllo** `[R2]` |
| `--line-control` | `#111111` 1 px | tutti i fondi chiari | bordi di campi, caselle taglia, bottoni secondari, swatch, pannelli | 14,86:1 ✔ |
| `--line-control-muted` | `#82817E` 1 px | Cemento | bordo casella **taglia esaurita** | 3,07:1 ✔ (margine minimo: non schiarire) |
| `--line-strong` | `#111111` 2 px | fondi chiari | voce attiva, errore, hover, sottolineatura card | ✔ |
| `--focus` | `#111111` | fondi chiari e Segnale | outline focus | 14,86 / 5,73 :1 ✔ |
| `--focus-on-inverse` | `#E6E4DF` | `#111111` (se mai servisse un fondo scuro esteso) | outline focus | 14,86:1 ✔ |

**Vietato (non creare token):** testo/linee/indicatori arancio su fondi chiari (2,59:1), testo bianco o cemento su arancio, Grafite su arancio o su nero, focus arancio su Cemento.

**Colori prodotto (swatch)** — *provvisori, da confermare con `fashion-expert`/`visual-content` e da verificare con `accessibility-auditor`.* Tutti con bordo `--line-control` 1 px, quindi il contrasto dello swatch col fondo non è l'unico confine (a11y §1.2 #28).

| Token | HEX provvisorio | Contrasto col Cemento | [a11y] Esito con bordo `#111111` 1 px (verificato 2026-11-05) | [a11y] Colore della diagonale "esaurito" (§3.10) |
|---|---|---|---|---|
| `--swatch-black` | `#111111` | 14,86:1 ✔ | ✔ (lo swatch stesso fa 14,86:1) | Cemento `#E6E4DF` (14,86:1; nera = 1,00:1, invisibile) |
| `--swatch-graphite` | `#3D3C3A` | 8,67:1 ✔ | ✔ | Cemento (8,67:1; nera = 1,71:1 ✘) |
| `--swatch-skin-01` | `#E2C6AE` | 1,28:1 ✘ | ✔ solo grazie al bordo (14,86:1) | `#111111` (11,62:1) |
| `--swatch-skin-02` | `#B4835F` | 2,60:1 ✘ | ✔ solo grazie al bordo | `#111111` (5,71:1) |
| `--swatch-skin-03` | `#6B4631` | 6,49:1 ✔ | ✔ | Cemento (6,49:1; nera = 2,29:1 ✘) |
| `--swatch-optic-white` | `#F7F7F5` | 1,18:1 ✘ | ✔ solo grazie al bordo | `#111111` (17,60:1) |

[a11y] Il bordo `--line-control` 1 px su **tutti** gli swatch è obbligatorio, non decorativo: senza, Skin 01, Skin 02 e Optic White non arrivano a 3:1 (1.4.11). Se cambiano gli HEX, ricalcolare la tabella. Token: `--swatch-strike-light: #E6E4DF` (swatch scuri) e `--swatch-strike-dark: #111111` (swatch chiari), indicato nei dati colore del prodotto.

Nota nome: il colore prodotto "Grafite" (`--swatch-graphite`) è diverso dal token di testo `--c-graphite`. Nel codice tenere i due prefissi separati (`swatch-` vs `c-`).

**Texture cemento (domanda aperta, §5.2):** rumore statico in CSS/SVG su `--bg-page`, opacità ≤ 4 %. Contrasto del testo sopra: **da verificare** sul pixel più scuro (a11y M1). Mai animata, mai sotto il form di checkout.

### 1.3 Tipografia — famiglie

| Token | Font | Licenza | File da includere (self-hosted con `next/font/local`) |
|---|---|---|---|
| `--font-display` | **Archivo** variabile | SIL OFL 1.1 | 1 file variabile, assi `wght` 400–900 e `wdth` 62–100, sottoinsiemi `latin` + `latin-ext` (servono è, à, ò, €) |
| `--font-text` | **Archivo** (stesso file, `wdth` 100) | SIL OFL 1.1 | — (stesso file) |
| `--font-mono` | **JetBrains Mono** | SIL OFL 1.1 | statici 400, 500, 700 (oppure variabile `wght` 400–700), `latin` + `latin-ext` |

- Pesi usati: Archivo 400 (paragrafi), 600 (nomi in card), 800–900 (display); JetBrains Mono 400 (dati), 500 (etichette, bottoni), 700 (totale).
- Pesi 100–300 non inclusi (vietati sotto 48 px, e non servono) `[R4]`.
- Fallback: `--font-display: "Archivo", "Arial Narrow", system-ui, sans-serif` · `--font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace`. `font-display: swap` + `size-adjust` sul fallback (da tarare in fase 6 con `performance-seo`).
- Preload: solo Archivo variabile (serve al titolo LCP). JetBrains Mono senza preload.
- Larghezza stretta **solo** con `font-variation-settings`/`font-stretch` sull'asse `wdth` disegnato: mai `transform: scaleX` `[principio 4 visual-directions]`.
- Il file di licenza OFL va copiato accanto ai font in `src/` (obbligo OFL se si ridistribuiscono i file). Versione da ricontrollare su Google Fonts all'installazione.

### 1.4 Tipografia — scala

Regole: condensato (`wdth` < 100) **solo ≥ 2 rem (32 px) e peso ≥ 500** `[R4]`; prezzi, taglie, errori, demo sempre `--font-mono` o `--font-text`; minimo assoluto 0,75 rem; corpo ≥ 1 rem; grigio ≥ 0,875 rem.

| Token | Famiglia · `wdth` · peso | `font-size` | Interlinea | Tracking | Case | Uso |
|---|---|---|---|---|---|---|
| `--type-wall` | display · 62 · 900 | ≥768: `clamp(8rem, 17vw, 22rem)` · <768: `clamp(3.5rem, 17vw, 6rem)` | 0.82 | -0.01em | upper | titolo enorme (home, drop, About, 404, conferma) §3.23 |
| `--type-h1` | display · 70 · 800 | `clamp(2.5rem, 1.5rem + 5vw, 6rem)` | 0.9 | 0 | upper | titolo di pagina (categoria, servizio), nome prodotto desktop |
| `--type-h1-product` | display · 70 · 800 | `clamp(2.5rem, 1rem + 6vw, 6rem)`; <768 tetto 3.5rem | 0.9 | 0 | upper | nome in scheda prodotto (mobile 40–56 px) |
| `--type-h2` | display · 75 · 800 | `clamp(2rem, 1.5rem + 2vw, 3rem)` | 0.95 | 0 | upper | titoli di sezione, voci menu mobile, totale conferma |
| `--type-h3` | text · 100 · 700 | `1.25rem` | 1.2 | 0.01em | upper | sottosezioni (accordion, `01 CONTATTO`) |
| `--type-body-l` | text · 100 · 400 | `clamp(1.125rem, 1rem + .5vw, 1.375rem)` | 1.45 | 0 | sentence | manifesto, concept drop, claim |
| `--type-body` | text · 100 · 400 | `1rem` (desktop `1.0625rem`) | 1.55 | 0 | sentence | descrizioni, pagine di servizio (max 65 caratteri/riga) |
| `--type-name` | text · 100 · 600 | `1.125rem` | 1.2 | 0.02em | upper | nome prodotto in card, borsa, riepilogo |
| `--type-meta` | text · 100 · 400 | `0.875rem` | 1.4 | 0 | sentence | tipo prodotto, hint campi (può essere grigio) |
| `--type-data` | mono · 400 | `1rem` | 1.3 | 0 | as-is | prezzi, taglie, quantità, codici ordine |
| `--type-data-l` | mono · 700 | `clamp(1.25rem, 1rem + 1vw, 1.75rem)` | 1.2 | 0 | as-is | totale borsa/checkout |
| `--type-ui` | mono · 500 | `0.875rem` | 1.2 | 0.06em | upper | bottoni, nav, `BORSA [0]`, `IT / EN`, filtri |
| `--type-label` | mono · 500 | `0.75rem` | 1.3 | 0.08em | upper | label campi, etichette di cantiere, striscia demo. **Solo `--text` nero**, mai grigio `[C4]` |

- Maiuscolo: classe/utility `text-transform: uppercase` su `--type-wall/h1/h2/h3/name/ui/label`. **Mai** su `--type-body`, `--type-body-l`, `--type-meta`, errori lunghi, testi legali `[R4]`.
- Interlinee strette dei display: nessuna `height` fissa, nessun `overflow: hidden` verticale sui contenitori di testo (1.4.12) `[R4]`.
- Numeri: `font-variant-numeric: tabular-nums` su `--type-data` (JetBrains è già tabellare) per allineare i prezzi in colonna.
- Formato prezzi: IT `95,00 €` · EN `€95.00` via `Intl.NumberFormat` (`it-IT` / `en-GB`). In card e scheda si può omettere `,00` solo se il copy lo decide; in borsa/checkout sempre due decimali.

### 1.5 Spaziature (base 4 px)

| Token | Valore | | Token | Valore |
|---|---|---|---|---|
| `--space-1` | 0.25rem (4) | | `--space-8` | 3rem (48) |
| `--space-2` | 0.5rem (8) | | `--space-10` | 4rem (64) |
| `--space-3` | 0.75rem (12) | | `--space-12` | 6rem (96) |
| `--space-4` | 1rem (16) | | `--space-16` | 8rem (128) |
| `--space-5` | 1.5rem (24) | | `--space-20` | 10rem (160) |
| `--space-6` | 2rem (32) | | `--space-24` | 15rem (240) |

Semantici:

| Token | Valore | Uso |
|---|---|---|
| `--space-section` | `clamp(5rem, 2rem + 10vw, 15rem)` | vuoto verticale tra sezioni (80–240 px): il "silenzio" del monolite |
| `--space-block` | `clamp(2rem, 1rem + 3vw, 4rem)` | tra blocchi dentro una sezione |
| `--space-stack` | `--space-4` | tra elementi correlati (nome → tipo → prezzo: `--space-1`/`--space-2`) |
| `--target-min` | `2.75rem` (44 px) | area minima di tocco per tutto il cliccabile `[R6]` |
| `--target-min-dense` | `1.5rem` (24 px) | minimo assoluto WCAG 2.5.8, solo link inline nel testo e footer desktop |

### 1.6 Griglia

Griglia di layout a colonne fluide; margini stretti (il layout "tocca" i bordi), vuoti verticali enormi.

| Breakpoint | Colonne | Margine laterale | Gutter | Note |
|---|---|---|---|---|
| 375 (base, da 320) | 4 | 1rem (16) | 0.75rem (12) | card 2 col.; a 320 px stesso schema |
| 768 | 8 | 1.5rem (24) | 1rem (16) | card 3 col.; inizia il taglio dei titoli |
| 1024 | 12 | 1.5rem (24) | 1rem (16) | nav desktop; card 4 col.; scheda prodotto 7+5 |
| 1440 | 12 | 2rem (32) | 1.25rem (20) | contenuto a tutta larghezza; testi di lettura max 40rem |

- Nessun `max-width` del layout (full bleed); i **paragrafi** hanno `max-width: 65ch`.
- **Griglia a vista** (`.grid--ruled`): linee verticali/orizzontali `--line-deco` 1 px tra le celle, gutter 0 e padding interno `--space-3`/`--space-4`. Si usa nelle griglie prodotto, nell'ingresso categorie e (opzionale) in header/footer. Mai come bordo di un controllo.
- **Griglia rotta** (sfalsamenti, elementi fuori colonna): solo apertura home, About, editoriale. Si fa con `grid-column`/`margin` — **mai `order`** che cambia l'ordine di lettura (a11y M3). Griglie di catalogo sempre regolari (UX R5).

### 1.7 Breakpoint e media query

| Token | Query | Cosa cambia |
|---|---|---|
| `--bp-md` | `(min-width: 48rem)` 768 | titoli tagliati, card 3 col., guida taglie a pannello 480 px, borsa a pannello 440 px |
| `--bp-lg` | `(min-width: 64rem)` 1024 | nav desktop, `IT / EN` in header, scheda prodotto a 2 colonne con pannello sticky, checkout a 2 colonne |
| `--bp-xl` | `(min-width: 90rem)` 1440 | margini e gutter maggiori |
| `--mq-short` | `(max-height: 37.5rem)` 600 | **niente sticky** (header, pannello prodotto, barra Aggiungi, riepilogo checkout) `[R13]`. Sopra i 600 px: **max 2 sticky** contemporanei (deciso), es. header + barra Aggiungi, header + barra filtri |
| `--mq-hover` | `(hover: hover) and (pointer: fine)` | hover di card e link |
| `--mq-reduce` | `(prefers-reduced-motion: reduce)` | tutte le durate a 0 |

Breakpoint in `em/rem` così seguono lo zoom del testo.

### 1.8 Bordi e linee

| Token | Valore | Uso |
|---|---|---|
| `--border-deco` | `1px solid var(--c-line-deco)` | planimetria, separatori righe borsa (accanto a testo) |
| `--border-control` | `1px solid var(--c-ink)` | campi, caselle taglia, bottone secondario, swatch, bordo pannelli |
| `--border-control-muted` | `1px solid var(--c-line-mid)` | casella taglia esaurita |
| `--border-strong` | `2px solid var(--c-ink)` | hover controlli, errore, voce attiva, gruppo taglie in errore |
| `--rule` | `1px solid var(--c-ink)` | linee strutturali: sotto header, sopra footer, sopra totale |
| `--radius` | `0` | ovunque |
| `--focus-ring` | `outline: 2px solid var(--focus); outline-offset: 2px` | tutti i focusabili `[R3]` |
| `--focus-ring-inset` | [a11y] `outline: 2px solid var(--focus); outline-offset: -2px` | contenitori che tagliano il proprio bordo (`overflow` ≠ `visible`): traccia galleria, tabella taglie scorrevole, riga di chip scorrevole. Con l'offset esterno l'anello verrebbe tagliato |

[a11y] Note sul focus (nessun cambio di aspetto in modalità normale):
- Radio e checkbox nativi visivamente nascosti (taglie, swatch, `CM / INCH`, filtri): l'anello si disegna sulla casella visibile (`input:focus-visible + label` o `label:has(:focus-visible)`), non sull'input nascosto.
- `@media (forced-colors: active)` (contrasto elevato di Windows): i fondi spariscono, quindi taglia selezionata, segmento attivo, checkbox piena e tag `ESAURITO`/`ERRORE`/`AGGIUNTO` perderebbero lo stato. Aggiungere: selezionato = `outline: 3px solid Highlight` (o `border: 3px solid CanvasText`); tag e striscia demo con `border: 1px solid CanvasText`; mai `forced-color-adjust: none` sui controlli.
- Gli elementi che ricevono il focus da script (titolo pannello, riepilogo errori) hanno `tabindex="-1"` e mostrano comunque l'anello.

### 1.9 z-index

| Token | Valore | Elemento |
|---|---|---|
| `--z-base` | 0 | contenuto |
| `--z-raised` | 10 | titolo tagliato sopra immagini sfalsate |
| `--z-sticky` | 100 | pannello info scheda (desktop), barra filtri mobile, barra Aggiungi mobile, riepilogo checkout |
| `--z-header` | 200 | header sticky |
| `--z-overlay` | 300 | velo `--bg-overlay` |
| `--z-panel` | 400 | menu mobile, borsa, guida taglie, filtri mobile (dialog) |
| `--z-skip` | 500 | skip link "Vai al contenuto" |

Con `<dialog>` nativo e `showModal()` il pannello va nel *top layer* e gli z-index servono solo come ripiego.

### 1.10 Movimento `[R10]`

| Token | Valore | Uso |
|---|---|---|
| `--dur-cut` | `0ms` | scambio fronte/retro card, comparsa sezioni, cambio stato taglia |
| `--dur-fast` | `120ms` | sottolineatura link/nav da sinistra |
| `--dur-base` | `160ms` | hover bottoni, chevron accordion |
| `--dur-panel` | `200ms` | ingresso pannelli (traslazione 100 % → 0, nessuna dissolvenza "morbida") |
| `--dur-hold` | `600ms` | inversione `BORSA` dopo l'aggiunta (cambio colore, **una volta**) |
| `--ease` | `linear` | default |
| `--ease-panel` | `cubic-bezier(.2, 0, 0, 1)` | solo ingresso pannelli (arrivo secco) — alternativa `linear` |

Regole:
- Massimo 200 ms per qualunque transizione; niente parallax, niente scroll-jacking, niente rimbalzi, niente autoplay.
- Nessun lampo ripetuto; l'inversione `BORSA` avviene una sola volta per aggiunta.
- Qualunque cosa si muova da sola > 5 s (ticker, video futuri) ha un bottone `PAUSA` visibile.
- Regola globale:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important; /* [a11y] 0.01ms e non 0: con 0 alcuni browser non emettono transitionend/animationend e il JS che li aspetta si blocca */
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```
Con reduced-motion l'inversione `BORSA` si toglie del tutto (resta l'annuncio testuale e l'apertura della borsa).

### 1.11 Altezze fisse di interfaccia (non di testo)

| Token | Valore |
|---|---|
| `--h-demo-strip` | min `2rem` (32), cresce col testo |
| `--h-header` | `3rem` (48) < 1024 · `3.5rem` (56) ≥ 1024 — min-height, non height |
| `--h-control` | `2.75rem` (44) campi, caselle taglia, bottoni secondari |
| `--h-button` | `3rem` (48) mobile · `3.5rem` (56) bottone primario desktop |
| `--w-panel-bag` | `27.5rem` (440) |
| `--w-panel-guide` | `30rem` (480) |
| `scroll-padding-top` | `calc(var(--h-header) + var(--space-2))` sull'`html` `[R13]`. [a11y] Quando è sticky anche la barra filtri mobile (§3.18) il valore include la sua altezza (`calc(var(--h-header) + var(--h-filterbar) + var(--space-2))`); con `--mq-short` torna a `var(--space-2)` |
| `scroll-padding-bottom` | altezza barra Aggiungi sticky, solo in scheda prodotto mobile |

---

## 2. Regole trasversali (riassunto delle 14 regole a11y applicate)

| # a11y | Come è applicata qui |
|---|---|
| R1 colori con uso | §1.2 tabella semantica, lista vietati |
| R2 due livelli di linea | `--line-deco` vs `--line-control` (§1.2, §1.8) |
| R3 focus | `--focus-ring` unico, `:focus-visible`, mai rimosso |
| R4 tipografia | §1.4: condensato ≥32 px/≥500, grigio ≥14 px, label nere, maiuscolo solo CSS, niente altezze fisse |
| R5 titoli display | §3.23: `clamp` in rem, taglio solo ≥768, `overflow-x: clip`, testo completo nell'`h1` |
| R6 bersagli | `--target-min` 44 px per tutto il cliccabile, 24 px solo link inline |
| R7 stati mai solo colore | ogni stato ha forma (pieno/barrato/2 px) + testo/ARIA (tabelle stati §3) |
| R8 contatori | §3.3 |
| R9 pannelli = dialog | §3.13, §3.16, §3.19, §3.1 menu |
| R10 movimento | §1.10 |
| R11 placeholder | §3.22 |
| R12 banner demo | §3.4 |
| R13 sticky | `--mq-short`, `scroll-padding` |
| R14 lingua | §3.2 |

---

## 3. Componenti

Formato: **Anatomia** · **Varianti** · **Stati** · **A11y**. Stati non elencati = non applicabili.

### 3.1 Header + navigazione

**Anatomia (≥1024, 56 px, griglia 12 col.)**
```
│ LINGERAI │ REGGISENI SLIP BODY SOTTOVESTI ACCESSORI │ GRID / 01 │ IT / EN  BORSA [0] │
  col 1–2    col 3–8 (--type-ui)                       col 9–10    col 11–12 allineati a destra
──────────────────────────────────────────────────────────────────── --rule (1 px nero)
```
- Logotipo: testo `LINGERAI`, `--font-display` **`2rem` (32 px), `wdth` 62, peso 900**, interlinea 1 → entra nei 48/56 px e rispetta la regola "condensato ≥32 px" (**deciso**).
- Voci: `--type-ui`, `--text`, area cliccabile 44 px di altezza (padding verticale), spaziatura orizzontale `--space-5`.
- `GRID / 01` separato dalle categorie con `--space-8` di vuoto (non con un'icona).
- Fondo `--bg-page` pieno (non trasparente: il contenuto che scorre sotto non deve disturbare la lettura).

**Mobile (<1024, 48 px)**: `LINGERAI` · `MENU` · `BORSA [0]`. `IT / EN` nella prima riga del menu e nel footer (decisione UX).

**Menu mobile** = `<dialog>` a tutto schermo, fondo `--bg-page`:
- riga 1: `LINGERAI` + `CHIUDI` (`--type-ui`, 44 px); `BORSA [n]` resta raggiungibile (ripetuto in alto a destra accanto a `CHIUDI`).
- riga 2: `IT / EN`.
- `GRID / 01 →` poi le 5 categorie in `--type-h2` (condensato, intere, mai tagliate) con conteggio `[04]` in `--type-data` allineato a destra; separatori `--border-deco`.
- servizio in `--type-ui`.

| Stato | Voce nav | Logotipo |
|---|---|---|
| default | testo nero | testo nero |
| hover | sottolineatura 2 px che entra da sinistra in `--dur-fast` (`transform: scaleX` su pseudo-elemento) | nessuno |
| focus-visible | `--focus-ring` | `--focus-ring` |
| active (premuto) | sottolineatura piena immediata | — |
| corrente | sottolineatura 2 px fissa + `aria-current="page"` (non solo colore) | su home: `aria-current="page"` |

**Sticky**: `position: sticky; top: 0` sopra 600 px di altezza finestra; statico con `--mq-short`. La striscia demo sta **sopra** e scorre via (non sticky).

**A11y**: `<header>`; `<nav aria-label="Principale">`; skip link "Vai al contenuto" primo focusabile ([a11y] nel DOM **prima** della striscia demo, che può contenere il link "Cos'è →"), fascia `--bg-inverse` che appare al focus in alto a sinistra (`--z-skip`); logotipo = link alla home con nome "LINGERAI, home" (`aria-label` che **inizia** con il testo visibile); `MENU` = `<button aria-expanded aria-controls>` che apre il dialog; focus intrappolato, `Esc`/`CHIUDI` chiudono, focus torna su `MENU`, resto `inert`.

### 3.2 Selettore lingua `IT / EN`

**Anatomia**: `IT` · `/` · `EN` in `--type-ui`; ciascun codice è un link con area 44×44.

| Stato | Lingua attiva | Lingua inattiva |
|---|---|---|
| default | `--text`, sottolineatura 2 px | `--text-muted` (Grafite: ok perché `--type-ui` è 14 px) |
| hover | — | `--text` + sottolineatura 1 px |
| focus-visible | `--focus-ring` | `--focus-ring` |
| active | — | sottolineatura 2 px |

Lo stato attivo è dato dalla **sottolineatura + colore**, non solo dal colore `[R7]`.

**Varianti**: header desktop, prima riga menu mobile, footer, header ridotto checkout (stesso componente).

**A11y** `[R14]`: `<html lang="it">` / `lang="en-GB"`; link EN con `lang="en"` `hreflang="en"` e `aria-label="EN — English"`; link IT con `lang="it"` `hreflang="it"` e `aria-label="IT — Italiano"`; lingua attiva `aria-current="true"`; `/` in `span aria-hidden="true"`. Href = pagina equivalente con gli stessi query param.

### 3.3 Contatore `BORSA [n]`

**Anatomia**: `BORSA` + spazio + `[n]` in `--type-ui`; il numero in `--type-data` stessa misura. Area 44 px. Link a `/it/borsa`, intercettato da JS per aprire il pannello.

| Stato | Aspetto |
|---|---|
| caricamento | `BORSA [·]` finché il `localStorage` non è letto (niente `[0]`→`[3]`). [a11y] In questo stato `[·]` è `aria-hidden` e il nome accessibile è solo "Borsa" / "Bag" |
| default | testo nero su cemento |
| hover | sottolineatura 2 px |
| focus-visible | `--focus-ring` |
| dopo aggiunta | per `--dur-hold` (600 ms) l'intero bottone si inverte: fondo `--bg-inverse`, testo `--text-inverse` (14,86:1); una volta; tolto con reduced-motion |
| pannello aperto | `aria-expanded="true"` |

**A11y** `[R8]`: nome accessibile che inizia con il testo visibile: `aria-label="Borsa, 2 articoli"` / `"Bag, 2 items"` (singolare gestito); `[2]` in `span aria-hidden="true"`. Il contatore **non** è regione live. Una sola regione `role="status"` globale (fuori dai pannelli, sempre nel DOM) annuncia: "AXIS reggiseno a triangolo, nero, 75B, aggiunto alla borsa. Borsa: 1 articolo."
[a11y] Attenzione: con `showModal()`/`inert` tutto ciò che sta fuori dal dialog aperto esce dall'albero di accessibilità e una regione live lì fuori **non viene letta**. Regola: ogni `<dialog>` (borsa, guida taglie, filtri, menu) contiene una propria regione `role="status"` vuota; il servizio di annunci scrive in quella del dialog aperto, altrimenti in quella globale. Il testo si inserisce quando la regione è già nel DOM (mai regione e testo creati insieme).
Lo stesso schema vale per i conteggi categoria `REGGISENI [04]` → testo SR "Reggiseni, 4 prodotti".

### 3.4 Striscia demo e banner checkout

**Striscia (tutte le pagine)** — **deciso**: fondo `--bg-signal`, testo `--text` (5,73:1), `--type-label` (12 px nero: consentito), centrata a sinistra nel margine, min-height 32 px, 1 riga (va a capo se serve, mai troncata). Eventuale link "Cos'è →" ai Termini con area 24 px min. **Non sticky**: scorre via sopra l'header.

**Banner checkout / conferma**: fascia `--bg-signal` a tutta larghezza, testo `--text` in `--type-ui` ingrandito (`1rem`, peso 700), padding `--space-4` / `--space-5`, sopra il form, primo nodo di `<main>`. Non fisso con finestra < 600 px; se fisso sopra, `scroll-padding-top` include la sua altezza.

| Stato | |
|---|---|
| default | come sopra |
| focus-visible (link interno) | `--focus-ring` nero (5,73:1 su arancio) |

**A11y** `[R12]`: testo reale, sorgente in sentence case ("Demo — Nessun pagamento verrà effettuato. Non inserire dati reali."), maiuscolo via CSS; striscia = `<aside aria-label="Avviso demo">` o `<p>`; **mai** `role="alert"`; nel checkout il form ha `aria-describedby` = id del banner.

### 3.5 Bottoni

**Anatomia**: rettangolo senza raggio, etichetta `--type-ui`, eventuale dato (`— 95,00 €`) in `--type-data` sulla stessa riga; altezza `--h-button` (primario) / `--h-control` (altri); padding orizzontale `--space-5`.

| Variante | Default | Hover | Focus-visible | Active | Disabled / attesa |
|---|---|---|---|---|---|
| **Primario** (Aggiungi, Vai al checkout, Conferma ordine demo) | fondo `--bg-inverse`, testo `--text-inverse` | inversione secca (`--dur-cut`): fondo cemento, testo nero, `--border-control` | `--focus-ring` (l'offset mostra il cemento tra bottone e anello) | fondo `#000000` | **nessun disabled** per "taglia mancante" (vedi §3.11). Solo durante l'invio demo: `aria-disabled="true"`, etichetta "Elaborazione demo", click ignorati, stesso contrasto |
| **Secondario** (Compila con dati di esempio, Mostra 9 pezzi, Vedi il drop) | trasparente, `--border-control`, testo nero | `--border-strong` | `--focus-ring` | fondo `--bg-inverse`, testo `--text-inverse` | non previsto |
| **Testuale** (Rimuovi, Annulla, Azzera, Chiudi) | solo testo `--type-ui`, sottolineato 1 px | sottolineatura 2 px | `--focus-ring` | — | — |
| **Segnale** | *non previsto come bottone* — l'arancio resta riservato a demo e tag di segnale (deciso) | | | | |

- Larghezza: primario a tutta larghezza in scheda prodotto, borsa, checkout; altrove a contenuto.
- Etichetta con taglia e prezzo dopo la scelta: `AGGIUNGI — 75C — 135,00 €`.
- Mai icone sole; freccia `→` in `span aria-hidden`.

**A11y**: `<button>` per azioni, `<a>` per navigazione (anche se sembra un bottone); nome accessibile = testo visibile; area ≥44 px.

### 3.6 Link

| Variante | Default | Hover | Focus | Visitato |
|---|---|---|---|---|
| **Inline** (nei paragrafi) | testo nero, sottolineatura 1 px, `text-underline-offset: .2em` | spessore 2 px | `--focus-ring` | uguale (nessun colore viola) |
| **Utility / freccia** (`GUIDA TAGLIE →`, `TUTTI I 13 PEZZI →`) | `--type-ui`, nessuna sottolineatura a riposo, freccia | sottolineatura 2 px da sinistra in `--dur-fast`; la freccia scatta di 4 px a destra (0 ms) | `--focus-ring` | uguale |
| **Footer** | `--type-meta` 14 px, nero | sottolineatura 1 px | `--focus-ring` | uguale |

Link utility senza sottolineatura a riposo: riconoscibili per maiuscolo mono + freccia (non solo per colore, 1.4.1 ok perché non sono dentro un paragrafo).

### 3.7 Card prodotto (standard in tutto il sito)

**Anatomia**
```
┌───────────────┐  contenitore immagine 4:5 (§3.22), fondo Cemento + griglia
│  disegno      │  hover: vista retro (0 ms)
└───────────────┘
DISEGNO TECNICO — FOTO IN ARRIVO   ← didascalia HTML --type-label nero, sotto il contenitore, aria-hidden (solo con placeholder)
AXIS                         --type-name (nome intero, mai tagliato, mai condensato)
Reggiseno a triangolo        --type-meta, --text-muted
95,00 €                      --type-data
■■■■ 4 colori               swatch 12 px decorativi con bordo nero + --type-meta muted
ESAURITO                     tag (solo se vero)
```
Spaziatura: immagine → nome `--space-3`; nome → tipo `--space-1`; tipo → prezzo `--space-2`.

**Varianti**: standard (griglia) · grande (1 colonna, categorie con 1–2 pezzi) · compatta orizzontale (completa il set, borsa vuota: miniatura 4:5 larga 96 px + testo a destra).

| Stato | Aspetto |
|---|---|
| default | come anatomia |
| hover (solo `--mq-hover`) | immagine → retro (0 ms); nome sottolineato 2 px |
| focus-visible | `--focus-ring` sull'intera card (link) + nome sottolineato (stesso feedback dell'hover, a11y I9) |
| active | — |
| esaurito | resta in griglia, in coda; tag `ESAURITO` = `--type-label` su `--bg-inverse` testo `--text-inverse`; immagine invariata (no opacità come unico segnale) |
| ultimi pezzi | badge `ULTIMI PEZZI` su `--bg-signal`, testo nero (§3.22) |
| caricamento | contenitore vuoto `--bg-media` (Cemento + griglia) della stessa proporzione (nessun salto di layout) |

**A11y**: tutta la card è **un solo `<a>`** (un tab stop); dentro, nome come testo dell'heading (`h3` o `h2` secondo la pagina); immagine `alt=""`; etichetta di cantiere `aria-hidden`; swatch decorativi `aria-hidden` + testo "4 colori"; il tag esaurito è testo letto. Niente "aggiungi rapido".

### 3.8 Griglia prodotti

| Breakpoint | Colonne card | Note |
|---|---|---|
| <768 | 2 | 1 sola se la categoria ha 1–2 pezzi (variante grande) |
| 768–1023 | 3 | |
| ≥1024 | 4 | home: 4 per riga, 2 righe |

- Variante `.grid--ruled` (consigliata in drop e categorie): linee `--line-deco` tra le celle, padding cella `--space-3` (mobile) / `--space-4`; l'ultima riga incompleta mantiene le linee verticali (la planimetria continua nel vuoto).
- Ordine: editoriale, esauriti in coda. Nessuno sfalsamento.
- Regola R1 UX: in home, drop e categoria almeno la metà superiore della prima riga di card è visibile nel primo schermo a 360×640.

**A11y**: `<ul role="list">` di `<li>` (Safari toglie la semantica con `list-style: none`); conteggio sopra la griglia con testo SR.

### 3.9 Galleria scheda prodotto

**Desktop (≥1024)**: colonna sinistra 7 col., immagini 4:5 impilate con gap `--space-2`; prima immagine = fronte, poi retro, poi dettaglio quotato; nessun carosello.

**Mobile/tablet (<1024)**: carosello a scorrimento orizzontale (`scroll-snap-type: x mandatory`), una immagine per volta, altezza max ~60 % dello schermo (`max-height: 60svh` sull'immagine, proporzione mantenuta con `object-fit: contain` su `--bg-media`); sotto: `←` · `1 / 3` · `→` in `--type-ui` (frecce **decise**).

| Stato | |
|---|---|
| default | prima immagine |
| hover (desktop) | nessuno |
| focus-visible | `--focus-ring` su frecce; la traccia scorrevole è focusabile (`tabindex="0"`) con anello |
| primo/ultimo | freccia corrispondente `aria-disabled="true"`, testo `--text-muted` (14 px ok) |
| caricamento | `--bg-media` 4:5 |

**A11y**: le frecce sono **obbligatorie** (WCAG 2.2 2.5.7: lo swipe non può essere l'unico modo); [a11y] ogni freccia è un `<button>` con area ≥44×44 (`--target-min`) e glifo `←`/`→` `aria-hidden`; la traccia focusabile ha `role="region"` + `aria-label="Galleria immagini, AXIS"` e usa `--focus-ring-inset`; `aria-label` "Immagine precedente/successiva"; contatore `1 / 3` con testo SR "Immagine 1 di 3" in `aria-live="polite"` solo quando cambia via frecce; disegni tecnici con `role="img"` + nome ("Disegno tecnico di AXIS, vista frontale"), misure anche in testo `[R11]`.

### 3.10 Selettore colore (swatch)

**Anatomia**: riga etichetta `COLORE — NERO` (`--type-label` + nome colore in `--type-data`); sotto, swatch quadrati **16 px visibili** dentro un'area cliccabile 44×44 (padding trasparente), gap visivo `--space-2`.

| Stato | Aspetto |
|---|---|
| default | quadrato colore + `--border-control` 1 px |
| hover | secondo quadrato esterno 1 px nero a 3 px di distanza |
| selezionato | quadrato esterno **2 px nero** a 3 px + nome nell'etichetta (forma + testo) |
| focus-visible | `--focus-ring` sull'area 44 px |
| non disponibile (colore tutto esaurito) | diagonale 1 px sul quadrato + nome SR ", esaurito"; resta selezionabile per vedere la scheda. [a11y] Diagonale nera sugli swatch chiari, Cemento su quelli scuri (Nero, Grafite, Skin 03): una diagonale nera sullo swatch nero è invisibile (1,00:1). Vedi tabella swatch §1.2 |

**A11y**: `<fieldset>` + `<legend>` "Colore"; `input type="radio"` nativi visivamente nascosti, `label` con nome colore (SR) e quadrato `aria-hidden`; frecce tastiera native; cambio colore aggiorna l'URL (`replaceState`) e annuncia "Colore: grafite" nella regione status. Contrasti swatch: da verificare (§1.2).

### 3.11 Selettore taglia

**Anatomia comune**: riga `TAGLIA` (`--type-label`) + `GUIDA TAGLIE →` allineato a destra; griglia di caselle testuali `--type-data` 14–16 px; sotto, area messaggio.

Casella: min 44×44, padding orizzontale `--space-2`, `--border-control`, testo centrato.

**Variante A — lettere** (`XS S M L XL XXL 3XL`): una riga, va a capo se serve (a 360 px: 7 × 44 + 6 × 4 = 332 px, ci sta).
**Variante B — fascia + coppa**: tabella a righe; prima colonna = fascia (`65`, `70`…, `--type-data` muted, non cliccabile), poi caselle coppa `A`–`G`. A 360 px: 7 caselle × 44 px = 308 px + colonna fascia 32 px + gap ≈ 360 px: ci sta a filo; sotto 360 px la colonna fascia va sopra la riga (etichetta "Fascia 75") — da validare sul prototipo (§5.1 N7).
Ogni casella mostra solo la coppa, ma il nome accessibile è completo ("75C").
**Variante C — taglia unica / doppia**: casella unica `TAGLIA UNICA` preselezionata, oppure `S/M` `L/XL`.

| Stato | Aspetto | Codice |
|---|---|---|
| default | bordo nero 1 px, testo nero | `input type=radio` |
| hover | `--border-strong` | — |
| focus-visible | `--focus-ring` | — |
| selezionata | fondo `--bg-inverse`, testo `--text-inverse` (14,86:1) | `checked` |
| active | come selezionata | — |
| esaurita | `--border-control-muted` (3,07:1), testo `--text-muted` 14 px, diagonale 1 px Grafite dall'angolo in basso a sinistra a quello in alto a destra (barrata); testo SR ", esaurita" | `aria-disabled="true"`, **resta focusabile**; se scelta: messaggio "75C esaurita in nero. Disponibile in grafite." e nessuna selezione |
| errore (Aggiungi senza taglia) | contorno `--border-strong` attorno al **gruppo**; messaggio sotto (§3.18 stile errore); focus sulla prima taglia disponibile; mobile: scroll al gruppo | [a11y] `aria-invalid` non è supportato su `fieldset`: il messaggio ha un `id`, ogni radio del gruppo riceve `aria-describedby` = quell'id; il focus va sulla prima taglia disponibile (così il messaggio viene letto) e l'annuncio **non** si ripete nella regione status (si sentirebbe due volte) |
| taglia evidenziata da guida | nessuna differenza visiva extra: si seleziona davvero | — |

**A11y**: `<fieldset>` + `<legend>` "Taglia"; radio nativi (non `aria-pressed`) visivamente nascosti con il `label` come casella; [a11y] con i radio nativi le frecce della tastiera **selezionano** mentre si spostano: arrivando su una taglia esaurita il JS ripristina la selezione precedente e mostra il messaggio di esaurito (collegato con `aria-describedby`), senza spostare il focus; variante B: tutte le caselle sono radio dello **stesso** gruppo (stesso `name`), ogni riga di fascia è un `role="group"` con `aria-label="Fascia 75"`, il nome di ogni radio resta completo ("75C"); il nome include "esaurita"; il messaggio d'errore è collegato con `aria-describedby` e annunciato dalla regione status; bottone Aggiungi **mai** disabilitato per la taglia mancante.

### 3.12 Guida taglie (pannello + pagina)

**Anatomia (pannello)**: `<dialog>` da destra, larghezza `--w-panel-guide` (≥768) / tutto schermo (<768), fondo `--bg-page`, bordo sinistro `--border-control`.
1. Testata: `GUIDA TAGLIE` (`--type-h2`) + `CHIUDI` (bottone testuale), separatore `--rule`.
2. Schede `REGGISENI (FASCIA + COPPA)` / `LETTERE XS–3XL`: segmenti testuali 44 px; attiva = sottolineata 2 px + `aria-selected`.
3. Come misurarti: disegno a tratto (contenitore 1:1, §3.22) + 2–3 righe `--type-body`.
4. Interruttore `CM / INCH`: due radio stile segmento (attivo = fondo nero, testo cemento).
5. Tabella: intestazioni `--type-label`, celle `--type-data`, righe separate da `--border-deco`, bordo esterno `--border-control`; **prima colonna fissa** (`position: sticky; left: 0`, fondo cemento); scroll orizzontale solo nella tabella, con indicatore testuale `SCORRI →` visibile se c'è overflow.
6. Riga della taglia scelta: fondo `--bg-inverse`, testo `--text-inverse` + SR "taglia selezionata".
7. Nota "conversioni indicative" (`--type-meta` muted) + link `RESI →`.

| Stato | |
|---|---|
| apertura | traslazione da destra in `--dur-panel` (0 con reduced-motion), velo `--bg-overlay` |
| focus-visible | `--focus-ring` su schede, toggle, tabella scorrevole |
| tab attiva | sottolineata 2 px + `aria-selected="true"` |

**Pagina `/it/guida-taglie`**: stesso contenuto in layout di lettura a una colonna (max 40rem), titolo `--type-h1`.

**A11y** `[R9]`: dialog modale con `aria-labelledby` sul titolo; focus su titolo o `CHIUDI` all'apertura; `Esc`; ritorno del focus al link `GUIDA TAGLIE`; resto `inert`; schede = `role="tablist"` (frecce sinistra/destra) **oppure** due bottoni semplici `aria-pressed` (più robusto; scelta a `frontend-developer`); tabella vera `<table>` con `<caption>` e `scope`; contenitore scorrevole `tabindex="0"` `role="region"` `aria-label="Tabella taglie, scorrevole"`.

### 3.13 "Completa il set"

**Anatomia**: etichetta `COMPLETA IL SET` (`--type-label`) + `--rule` sopra; card **compatta orizzontale** (§3.7): miniatura 4:5 96 px · `AXIS` (`--type-name`) · `Slip` (`--type-meta`) · `48,00 €` · link `VEDI →` (porta `?color=` scelto). Una sola proposta.

**Varianti**: in scheda (dopo accordion, a tutta larghezza della colonna info su desktop) · in borsa (1 riga sopra il riepilogo, separata da `--border-deco`).

| Stato | default · hover (nome sottolineato) · focus-visible (anello sulla card-link) · nascosto se il coordinato è già in borsa o tutto esaurito |
|---|---|

**A11y**: una sola `<a>` per card; heading di sezione `h2` (scheda) / testo semplice (borsa).

### 3.14 Pannello borsa

**Anatomia**: `<dialog>` da destra `--w-panel-bag` (≥768) / tutto schermo (<768); fondo `--bg-page`, bordo sinistro `--border-control`, velo `--bg-overlay`.
```
BORSA [3]                    CHIUDI    ← --type-h2 / bottone testuale
──────────────────────────────────── --rule
righe (§3.15), separatori --border-deco
──────────────────────────────────── 
(completa il set, facoltativo)
──────────────────────────────────── --rule
SUBTOTALE                  191,00 €
SPEDIZIONE           [etichetta copy]
TOTALE                     191,00 €   ← --type-data-l
[ VAI AL CHECKOUT ]  primario a tutta larghezza
Continua lo shopping   link testuale
Demo · nessun pagamento   --type-meta muted
```
Mobile: riepilogo + bottone **fissi in basso** dentro il pannello (lista scorrevole sopra); con `--mq-short` non fissi. [a11y] La lista è un contenitore scorrevole separato (il riepilogo non le sta sopra in sovrapposizione), così l'elemento con il focus non finisce sotto il riepilogo (2.4.11); in alternativa `scroll-padding-bottom` = altezza del riepilogo.

| Stato | Aspetto |
|---|---|
| vuota | `BORSA [0]` + riga copy + `VEDI GRID / 01` (secondario) + 5 categorie in `--type-ui`; niente illustrazioni |
| caricamento | `BORSA [·]`, righe non mostrate |
| dopo aggiunta | si apre da sola; riga nuova evidenziata (§3.15) |
| errore (riga non disponibile) | riga barrata + "Non più disponibile" + `RIMUOVI`; `VAI AL CHECKOUT` sostituito da testo "Rimuovi i pezzi non disponibili per continuare" (non disabilitato muto) |
| dati corrotti | svuotata + messaggio "La borsa è stata svuotata." |

**A11y** `[R9]`: come §3.12 (dialog, focus, `Esc`, ritorno a chi l'ha aperto, `inert`); titolo con nome accessibile "Borsa, 3 articoli"; dopo aggiunta il focus va sul titolo del pannello; regione status annuncia aggiunte e rimozioni. Pagina `/it/borsa`: stesso componente in pagina, una colonna (≥1024: righe 8 col. + riepilogo 4 col.).

### 3.15 Riga borsa

**Anatomia (griglia 2 colonne: miniatura 64 px 4:5 | testo)**
```
▓ AXIS                    --type-name
▓ Reggiseno a triangolo   --type-meta muted
▓ Nero · 75B              --type-data
  [−] 1 [+]      95,00 €  stepper 44×44 · --type-data a destra
  RIMUOVI                 bottone testuale
```

| Stato | Aspetto |
|---|---|
| default | come sopra |
| nuova (appena aggiunta) | tag `AGGIUNTO` (`--type-label`, fondo `--bg-signal`, testo nero) sopra il nome + barra sinistra 4 px nera; scompare alla chiusura del pannello (deciso) |
| hover/focus stepper | `--border-strong` / `--focus-ring` |
| quantità = 1 | `−` con `aria-disabled="true"`, bordo `--border-control-muted`, testo muted (si usa `RIMUOVI`) |
| quantità = 5 (max demo) | `+` `aria-disabled` + testo "Massimo 5 per taglia nella demo." |
| rimossa | la riga diventa `AXIS rimosso.` + `ANNULLA`; focus sulla riga successiva o sul titolo. [a11y] `ANNULLA` resta finché il pannello non si chiude o non si fa un'altra azione nella borsa (non sparisce dopo ~5 s: un limite di tempo fisso non è regolabile, 2.2.1); "AXIS rimosso" viene annunciato nella regione status del pannello |
| non disponibile | nome e prezzo barrati (`text-decoration: line-through`), testo "Non più disponibile", non conteggiata |

**A11y**: stepper = `<button aria-label="Diminuisci quantità, AXIS reggiseno, 75B">` + valore in `<output aria-live="polite">`; il `−`/`+` visibili sono `aria-hidden`; `RIMUOVI` con nome completo ("Rimuovi AXIS reggiseno, 75B"); il barrato ha anche il testo "Non più disponibile".

### 3.16 Campi form, scelte e messaggi d'errore

**Campo testo / email / CAP / telefono**
```
EMAIL                      ← <label> --type-label nero, sempre visibile
┌──────────────────────┐   ← input: altezza 44–48, --border-control 4 lati, fondo --bg-alt,
│ nome@esempio.it      │     testo --type-body 16 px (evita lo zoom iOS); [a11y] min-height, mai height fissa (1.4.12)
└──────────────────────┘
Ti scriviamo solo nella demo.   ← hint --type-meta muted (14 px), aria-describedby
```
- Obbligatori: frase iniziale "Tutti i campi sono obbligatori, tranne quelli indicati." + `(facoltativo)` nella label dei facoltativi (**deciso**). `required` nel codice.
- Placeholder solo come esempio di formato, mai al posto della label; colore `--text-muted` (16 px ok).
- Larghezze: 1 colonna <768; 2 colonne (Nome/Cognome, CAP/Città) ≥768.

**Select** (paese, provincia): `<select>` nativo, stesso bordo, freccia `▾` disegnata in CSS a destra.
**Radio** (metodo spedizione, pagamento simulato): riga 44 px, quadrato 20 px `--border-control`; selezionato = quadrato interno pieno 10 px. **Checkbox** (termini, fatturazione uguale): quadrato 20 px; selezionato = fondo nero + segno ✓ cemento. Radio e checkbox restano distinguibili per forma interna e per ruolo nativo.

| Stato | Campo | Radio / checkbox |
|---|---|---|
| default | bordo 1 px nero, fondo Bianco ottico | quadrato 1 px |
| hover | `--border-strong` | `--border-strong` |
| focus-visible | `--focus-ring` (anche con mouse sui campi testo: usare `:focus` per gli input, che servono sempre) | `--focus-ring` sul quadrato |
| compilato | come default | pieno |
| disabled | non previsto (il pagamento simulato è un radio già selezionato, non disabilitato) | — |
| **errore** | `--border-strong` + `aria-invalid="true"`; sotto il campo: tag `ERRORE` (`--type-label` su `--bg-signal`, testo nero) + messaggio `--type-meta` **nero** ("Inserisci un'email valida, es. nome@esempio.it"). [a11y] Tag e messaggio nello stesso elemento con `id`, collegato da `aria-describedby` prima dell'hint (si sente "Errore: inserisci un'email valida…") | stesso schema sotto il gruppo (`aria-describedby` sui controlli del gruppo) |
| valido dopo errore | il messaggio sparisce appena il valore è valido (validazione all'uscita dal campo e all'invio, non mentre si scrive) | — |

**Riepilogo errori** (all'invio): blocco in cima al form, `--border-strong` 4 lati, titolo `--type-h3` "2 errori da correggere", lista di link ai campi; riceve il focus (`tabindex="-1"`). Mai testo arancio, mai solo bordo.

**A11y**: label `for`/`id`; `autocomplete` (`email`, `given-name`, `family-name`, `address-line1`, `postal-code`, `address-level2`, `address-level1`, `country`, `tel`); `type=email`, `inputmode=numeric` (CAP IT); `aria-describedby` = hint + errore; gruppi in `fieldset/legend` (`01 CONTATTO`…); checkbox "fatturazione uguale alla spedizione" (3.3.7).

### 3.17 Riepilogo ordine (checkout e conferma)

**Anatomia**: titolo `RIEPILOGO` (`--type-label`); righe compatte (nome + tipo, `Nero · 75B × 1`, prezzo a destra in `--type-data`); `--rule`; subtotale, spedizione, **totale** `--type-data-l`; nota demo.

**Varianti**
- Desktop ≥1024: colonna destra 4 col., sticky (statico con `--mq-short`), fondo `--bg-alt`, `--border-control`.
- Mobile: in cima al form, chiuso: bottone a tutta larghezza `RIEPILOGO — 191,00 € ▾` (`--type-ui`, `--border-control`).
- Conferma: stesso componente in pagina, aperto, con codice `DEMO-0001 · 05.11.2026` in `--type-data`.

| Stato | default · hover/focus sul bottone mobile (`--border-strong` / `--focus-ring`) · aperto (`▾` → `▴`, `aria-expanded="true"`) |
|---|---|

**A11y**: disclosure con `<button aria-expanded aria-controls>`; prezzi con valuta esplicita; tabella o `<dl>` per le righe.

### 3.18 Filtri e ordinamento (solo drop GRID / 01)

**Desktop (≥1024)** — barra testuale sotto l'intestazione, separata da `--rule` sopra e `--border-deco` sotto:
```
CATEGORIA ▾   TAGLIA ▾   COLORE ▾                    ORDINA: IN EVIDENZA ▾
[75B ×] [Nero ×]   AZZERA                                        9 pezzi
```
- Ogni filtro = bottone disclosure `--type-ui` 44 px che apre un riquadro sotto (fondo `--bg-page`, `--border-control`, `--z-sticky`) con checkbox (§3.16) e conteggi `75C [2]`. Taglia: due gruppi `FASCIA + COPPA` (griglia di checkbox-casella stile §3.11) e `LETTERE`.
- Filtro con valori attivi: etichetta + numero `TAGLIA (2)` + sottolineatura 2 px.
- Chip attivo: `--border-control`, `--type-ui`, `×` a destra; area 44 px; hover `--border-strong`.
- Ordina: `<select>` nativo stilizzato oppure radio in riquadro (`IN EVIDENZA`, `PREZZO ↑`, `PREZZO ↓`).
- Risultato aggiornato subito; conteggio `9 pezzi` in `--type-data`.

**Mobile (<1024)** — barra sticky sotto l'header (statica con `--mq-short`): `FILTRA (2)` · `ORDINA ▾`; chip sotto in una riga scorrevole. `FILTRA` apre `<dialog>` dal basso a tutto schermo con gruppi a fisarmonica, `AZZERA` e bottone primario fisso `MOSTRA 9 PEZZI` (numero aggiornato).

| Stato | |
|---|---|
| default | testo nero |
| hover | sottolineatura 1 px |
| focus-visible | `--focus-ring` |
| aperto | `▾` → `▴`, `aria-expanded="true"` |
| attivo | `(n)` + sottolineatura 2 px |
| opzione a zero | non mostrata (si mostrano solo combinazioni esistenti) |
| zero risultati | `[0]` + messaggio + `AZZERA FILTRI` (secondario) + suggerimento testuale |

**A11y**: disclosure + checkbox nativi (non `listbox` custom); chip `<button aria-label="Rimuovi filtro 75B">`; il conteggio risultati annunciato in una regione `role="status"` (debounce 500 ms); pannello mobile = dialog `[R9]`; stato nei parametri URL.

### 3.19 Footer

**Anatomia (≥1024)**: `--rule` sopra; 4 gruppi su 12 colonne (3 + 3 + 3 + 3): `SERVIZIO` · `BRAND` · `LEGALE` · `LINGUA`; titoli `--type-label`, link `--type-meta` neri (area ≥24 px desktop, 44 px mobile con padding verticale); poi riga `--border-deco` e riga finale: testo demo (`--type-meta`) + `© 2026 LINGERAI`.
**Elemento edgy (domanda aperta, §5.2)**: sotto tutto, logotipo `LINGERAI` in `--type-wall` tagliato dal bordo inferiore e destro (solo ≥768, `aria-hidden`, mai un link).
**Mobile**: 4 gruppi impilati, sempre aperti; niente logotipo gigante (o intero, non tagliato).

Stati link come §3.6 footer. **A11y**: `<footer>`; `<nav aria-label="Servizio e legale">`; selettore lingua come §3.2.

### 3.20 Pagina 404

**Anatomia**: `404` come titolo enorme (§3.23, tagliabile ≥768), `h1` accessibile "Pagina non trovata"; una riga copy `--type-body-l`; poi utilità: `VEDI GRID / 01` (primario), 5 categorie in `--type-h2` (intere, come nel menu mobile), `IT / EN`. Lingua presa dall'URL. Header e striscia demo presenti.

### 3.21 Accordion (scheda prodotto: Composizione, Costruzione, Vestibilità, Cura, Resi)

Riga 44+ px, `--border-deco` tra le voci e `--rule` sopra la prima; titolo `--type-h3` + `+`/`−` (`aria-hidden`) a destra; contenuto `--type-body`. Stati: hover sottolineatura · focus-visible anello · aperto (`−`, `aria-expanded="true"`). Tecnica: `<details>/<summary>` nativo o bottone disclosure. I **dati chiave** (trasparenza, ferretto, imbottitura) **non** stanno nell'accordion: lista `<dl>` sempre visibile, `TRASPARENZA` in `--type-label` + valore `--type-data`.

### 3.22 Contenitore immagine / disegno tecnico (placeholder)

Solo la cornice; il disegno lo definisce `visual-content` in `docs/visual/`.

| Variante | Proporzione | Dove |
|---|---|---|
| `media--product` | **4:5** | card, galleria scheda, miniature borsa (64/96 px) |
| `media--editorial` | **3:4** | apertura home, About |
| `media--wide` | **16:9** | blocco editoriale "guida ai modelli" (≥768; su mobile passa a 4:5) |
| `media--diagram` | **1:1** | "come misurarti" nella guida taglie |

viewBox degli SVG (da `visual-guidelines.md` §3): 4:5 `0 0 800 1000` · 3:4 `0 0 900 1200` · 16:9 `0 0 1600 900`. Il contenitore CSS ha sempre la stessa proporzione del file (e della foto futura).

- **Fondo (deciso): `--bg-media` = Cemento `#E6E4DF` con griglia visibile** `--line-deco` (`#111111` al 15 %, 1 px, passo 80 su viewBox 800 = 10 % della larghezza). La griglia è disegnata **nell'SVG** (così resta allineata al disegno); il contenitore CSS ha solo fondo Cemento, così prima del caricamento il riquadro è già "pagina". Nessun bordo: il disegno galleggia nella planimetria. I crocini di taglio agli angoli (nell'SVG) segnano l'area.
- Capo: riempimento `--bg-garment` (Bianco ottico) per gli opachi, tratteggi per le trasparenze; codici in `visual-guidelines.md` §1.2.
- Linee informative (contorni, cuciture, quote, richiami): `#111111` pieno, 14,86:1 su Cemento `[R11]`; griglia e texture trasparenze decorative.
- **Etichette di cantiere** (`NOME — NN/13 — 4:5`, `GRID / 01`, `LG-NN / NOME`, `V1/3`): dentro l'SVG, mono 14 px `#111111`, neutre rispetto alla lingua, decorative (`aria-hidden` se inline).
- **Didascalia HTML della card** (solo finché c'è il placeholder): `DISEGNO TECNICO — FOTO IN ARRIVO` / `TECHNICAL DRAWING — PHOTO TO COME` (etichetta provvisoria), `--type-label` nero, **sotto** il contenitore a sinistra (non sopra il disegno, per non coprire le etichette SVG), `aria-hidden` nelle card perché il link ha già nome e prezzo.
- **Legenda bilingue in HTML (deciso)**, solo in scheda prodotto, sotto ogni vista della galleria (desktop) o sotto il carosello (mobile, cambia con la vista):
  - richiami `1 — ferretto in acciaio` … in `<ol>`: numero `--type-data`, testo `--type-meta` nero;
  - quote `A`, `B`, `C` in `<table>` con le misure per taglia (`--type-data`), `<caption>` "Misure — taglia 75B" che segue la taglia selezionata (se nessuna, taglia di riferimento dichiarata);
  - separatore `--border-deco` sopra; testi nella lingua della pagina (dai dati prodotto, non dall'SVG).
- Badge HTML sopra la card (`ULTIMI PEZZI`, eventuale `NUOVO`): `--type-label` su `--bg-signal`, testo nero, angolo in alto a sinistra **fuori** dall'area di disegno (sopra il crocino). `ESAURITO` resta su `--bg-inverse`.
- Foto future nello stesso contenitore: `object-fit: cover` (card) / `contain` su `--bg-media` (galleria mobile); la griglia sparisce con la foto.
- A11y: card `alt=""` (o SVG inline `aria-hidden`); scheda: `alt` dai dati prodotto nella lingua della pagina, formula "{Nome}, {categoria}: disegno tecnico, vista {frontale | dal retro | dettaglio di …}"; misure e legende sempre anche in testo.

### 3.23 Titolo enorme tagliato ("muro")

Solo per: apertura home, drop GRID / 01, About, 404, conferma. **Mai** per nomi prodotto, categorie, prezzi (UX R2).

**Struttura (un solo `h1`)**
```html
<div class="wall">                         <!-- overflow-x: clip; overflow-y: visible -->
  <h1 class="wall__title">
    <span class="wall__type" aria-hidden="true">GRID / 01</span>
    <span class="wall__label">GRID / 01</span>   <!-- nome accessibile -->
  </h1>
</div>
```

| | <768 (mobile) | ≥768 |
|---|---|---|
| `wall__type` | `--type-wall` mobile `clamp(3.5rem, 17vw, 6rem)`, **va a capo intero** (`overflow-wrap: anywhere` vietato: si spezza solo agli spazi/slash), altezza del blocco ≤ ~30 % dello schermo | `--type-wall` `clamp(8rem, 17vw, 22rem)`, `white-space: nowrap`, più largo del contenitore: esce dal margine destro e viene tagliato dal bordo dello schermo |
| `wall__label` | visivamente nascosto (`.sr-only`) — il muro è già leggibile | **visibile**: `--type-label` nero sopra o accanto al muro (es. `DROP — GRID / 01`) |
| posizionamento | allineato al margine | allineato al margine sinistro; il taglio cade **dentro** l'ultima lettera/cifra (mai solo spazio vuoto), regolato con `margin-right` negativo in `vw` |

Regole: nessuno scroll orizzontale a 320 px (`overflow-x: clip` sul `.wall`, non su `body`); [a11y] su mobile `wall__type` ha `overflow-wrap: break-word` come ultima risorsa: spezza una parola **solo** se da sola è più larga dello schermo (es. zoom del testo al 200 %), altrimenti `clip` taglierebbe lettere senza alternativa visibile, perché sotto 768 `wall__label` è nascosto; nel caso normale l'aspetto non cambia; niente `height` fissa; zoom testo funziona grazie ai limiti in `rem`; il muro non copre controlli (se sovrapposto a un'immagine sfalsata: `--z-raised`, ma mai sopra link o bottoni).

---

## 4. Layout pagina — note per il design system

Struttura di dettaglio in `docs/ux/page-blueprints.md`; qui solo le scelte visive che li completano.

| Pagina | Griglia ≥1024 | Gesto "edgy" ammesso |
|---|---|---|
| Home | muro su 12 col. tagliato a destra; immagine 3:4 su col. 2–6 sfalsata in basso di `--space-12`; claim + CTA col. 8–11; card 4 col. `--ruled`; categorie in `--type-h2` su griglia a vista | muro, sfalsamento, planimetria |
| Drop | muro + concept col. 1–6 + `[13]`; filtri; griglia `--ruled` 4 col. | muro |
| Categoria | `h1` intero `--type-h1` + `[04]`; griglia `--ruled`; navigazione `← SLIP · BODY →` | solo scala tipografica |
| Scheda prodotto | galleria col. 1–7, info col. 8–12 sticky; set e altri pezzi a tutta larghezza | nome `--type-h1-product` intero |
| Borsa (pagina) | righe col. 1–8, riepilogo col. 9–12 | nessuno |
| Checkout | header ridotto; banner; form col. 1–7, riepilogo col. 9–12 sticky | nessuno (solo numerazione `01`–`04` in `--type-h3`) |
| Conferma | banner; muro "ordine ricevuto" (copy da definire); riepilogo col. 1–6 | muro |
| About | muro; manifesto `--type-body-l` col. 2–8; immagine 3:4 sfalsata col. 9–12 | muro, griglia rotta |
| Servizio / legale | titolo `--type-h1`; testo col. 3–8 (max 65ch); indice ancore col. 1–2 sticky ≥1024 | solo titolo |
| 404 | muro `404`; utilità | muro |

---

## 5. Note finali: conflitti e domande

### 5.1 Punti decisi (2026-11-05, registrati in `docs/decisions.md`)

| # | Decisione | Dove è applicata |
|---|---|---|
| — | Fondo contenitori immagine/disegni = **Cemento `#E6E4DF` con griglia** (non Cassaforma) | §1.2 `--bg-media`, §3.7, §3.9, §3.22 |
| N1 | Logotipo header **32 px**, condensato `wdth` 62 peso 900 (mai condensato sotto 32 px) | §3.1 |
| N2 | Arancio anche per i tag **`ERRORE`** e **`AGGIUNTO`** (e badge card), sempre fondo pieno + testo `#111111` | §1.2, §3.15, §3.16, §3.22 |
| N3 | **Striscia demo arancio** con testo `#111111` su tutte le pagine | §3.4 |
| N4 | Paragrafi in **Archivo** larghezza normale; JetBrains Mono solo dati ed etichette | §1.3, §1.4 |
| N5 | Campi: frase "tutti obbligatori tranne quelli indicati" + `(facoltativo)` + `required` | §3.16 |
| N6 | **Frecce** `← 1 / 3 →` sotto la galleria mobile (WCAG 2.5.7) | §3.9 |
| N8 | Massimo **2 elementi sticky** contemporanei; tutti statici con finestra ≤ 600 px di altezza | §1.7 `--mq-short` |
| visual | **Griglia visibile dentro i disegni** e **legende HTML bilingue** (richiami + tabella misure) | §3.22 |

**Ancora da validare (non è una scelta dell'utente):** N7 — selettore fascia+coppa a 320–360 px a filo con caselle da 44 px; sotto 360 px la fascia va sopra la riga di coppe. Da provare con `ux-reviewer` sul prototipo (fase 6).

### 5.2 Domande aperte

1. **Swatch prodotto**: i colori HEX provvisori di Skin 01/02/03, Grafite, Optic White vanno bene come base? (poi li verifica `accessibility-auditor`).
2. **Footer**: vuoi il logotipo gigante tagliato in fondo alla pagina (≥768, decorativo)?
3. **Texture cemento** leggerissima sul fondo: sì o fondo piatto? (consiglio: piatto per il MVP, texture da provare dopo; con la griglia nei disegni il fondo è già ricco).
4. **Hover del bottone primario**: inversione secca nero → cemento (consigliata, coerente con `BORSA`) o solo un nero più profondo?
5. **Griglia a vista fuori dai disegni**: linee "planimetria" solo nelle griglie prodotto e categorie (consigliato) o anche in header/footer?
