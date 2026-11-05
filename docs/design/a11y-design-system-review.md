# LINGERAI — Revisione accessibilità del design system (Fase 4)

> Autore: `accessibility-auditor` · Data: 2026-11-05 · Obiettivo: **WCAG 2.2 AA**
> Oggetto: `docs/design/design-system.md`, `docs/visual/visual-guidelines.md`, `public/placeholders/*.svg`
> Base: `docs/decisions.md` (vincolante) e le 14 regole di `docs/design/a11y-early-check.md` §4.
> Gravità: **bloccante** · **importante** · **miglioramento**.

## Esito

**Pronto per lo sviluppo: sì.** Nessun bloccante aperto. Ho trovato 6 problemi tecnici (2 importanti) e li ho già corretti nel design system con note `[a11y]` che non cambiano l'aspetto (19 note in totale). Restano **4 conflitti estetici** da far decidere all'utente (§5). Nessuno blocca l'avvio della fase 6, ma il **K1** va deciso prima di disegnare tutti gli SVG del catalogo.

---

## 1. Le 14 regole: verifica

| # | Regola | Dove nel design system | Esito |
|---|---|---|---|
| R1 | Token colore con uso consentito | §1.2 tabella semantica + elenco vietati; swatch completati con i contrasti `[a11y]` | ✔ ok (swatch erano "da verificare": completati) |
| R2 | Due livelli di linea | `--line-deco` / `--line-control` / `--line-control-muted` (§1.2, §1.8) | ✔ ok. Il bordo degli swatch ora è dichiarato obbligatorio |
| R3 | Focus 2+2 px, `:focus-visible`, stesso stile ovunque | `--focus-ring` §1.8, §0 | ⚠ corretto: aggiunti `--focus-ring-inset` per i contenitori scorrevoli, anello sulla casella visibile per gli input nascosti, `forced-colors` `[a11y]` |
| R4 | Tipografia (≥16 corpo, label 12 nere, grigio ≥14, condensato ≥32/≥500, maiuscolo via CSS, niente altezze fisse) | §1.3–1.4 | ✔ ok. Tutti i condensati partono da 2 rem; `--type-label` solo nero; input con min-height `[a11y]` |
| R5 | Titoli display: `clamp` in rem, mai unica fonte, niente scroll a 320 | §3.23 | ⚠ corretto: aggiunto `overflow-wrap: break-word` come ultima risorsa su mobile `[a11y]` |
| R6 | Bersagli ≥24 / ≥44 | `--target-min`, §3.10, §3.11, §3.15 | ⚠ corretto: frecce galleria senza misura → 44×44 `[a11y]`. N7 (fascia+coppa a 320 px) resta da validare sul prototipo |
| R7 | Stati mai solo col colore | tabelle stati §3 | ⚠ corretto: diagonale "esaurito" invisibile sugli swatch scuri `[a11y]`. Restano K2, K3 (§5) |
| R8 | Contatori `[n]` + `role="status"` | §3.3 | ⚠ corretto: regione status fuori dai dialog non viene letta (vedi P1) `[a11y]`; stato di caricamento `[·]` `[a11y]` |
| R9 | Pannelli = dialog modale | §3.1 menu, §3.12, §3.14, §3.18 | ✔ ok. Aggiunta nota per il riepilogo fisso nel pannello borsa mobile `[a11y]` |
| R10 | Movimento ≤200 ms, reduced-motion | §1.10 | ✔ ok. Durate a `0.01ms` invece di `0` `[a11y]` |
| R11 | Placeholder: `alt=""` nelle card, descrittivo in scheda, linee ≥3:1 | §3.7, §3.9, §3.22, `visual-guidelines` §5 | ✔ ok sul design system; problemi negli SVG (vedi §4 e K1) |
| R12 | Banner demo | §3.4 | ✔ ok. Skip link spostato prima della striscia nel DOM `[a11y]` |
| R13 | Sticky e focus coperto | §1.7 `--mq-short`, §1.11 | ⚠ corretto: `scroll-padding-top` include la barra filtri mobile `[a11y]` |
| R14 | Lingua | §3.2 | ✔ ok (vedi M5 su `hreflang`) |

---

## 2. Contrasti calcolati (script Node, formula WCAG 2.x, come in `a11y-early-check.md` Appendice)

### 2.1 Swatch prodotto su Cemento `#E6E4DF` (1.4.11 → 3:1)

| Swatch | HEX | vs Cemento | vs Bianco ottico | Con bordo `#111111` | Diagonale "esaurito" nera | Diagonale Cemento |
|---|---|---|---|---|---|---|
| Nero | `#111111` | 14,86 ✔ | 17,60 | ✔ | **1,00 ✘** | 14,86 ✔ |
| Grafite | `#3D3C3A` | 8,67 ✔ | 10,27 | ✔ | **1,71 ✘** | 8,67 ✔ |
| Skin 01 | `#E2C6AE` | **1,28 ✘** | 1,51 | ✔ (14,86) | 11,62 ✔ | 1,28 ✘ |
| Skin 02 | `#B4835F` | **2,60 ✘** | 3,08 | ✔ (14,86) | 5,71 ✔ | 2,60 ✘ |
| Skin 03 | `#6B4631` | 6,49 ✔ | 7,69 | ✔ | **2,29 ✘** | 6,49 ✔ |
| Optic White | `#F7F7F5` | **1,18 ✘** | 1,00 | ✔ (14,86) | 17,60 ✔ | 1,18 ✘ |

Conclusione: con il bordo nero 1 px tutti gli swatch passano (il bordo diventa obbligatorio). La diagonale dell'esaurito va **nera sugli swatch chiari e Cemento sugli scuri**: corretto in §1.2 e §3.10 `[a11y]`. Gli swatch "Grafite" e "Nero" si distinguono poco tra loro (1,71:1), ma non è un requisito: il nome del colore è scritto nell'etichetta.

### 2.2 Focus su ogni fondo

| Anello | Fondo | Rapporto | Esito |
|---|---|---|---|
| `#111111` | Cemento | 14,86 | ✔ |
| `#111111` | Bianco ottico (campi, riepilogo) | 17,60 | ✔ |
| `#111111` | Segnale (striscia, banner, tag) | 5,73 | ✔ |
| `#111111` su bottone nero / taglia selezionata | l'offset 2 px mostra il Cemento | 14,86 | ✔ |
| `#E6E4DF` (`--focus-on-inverse`) | `#111111` | 14,86 | ✔ (nessun uso previsto) |
| Anello sopra il velo `--bg-overlay` (= `#91908D` su Cemento) | — | il focus resta nel pannello (Cemento) | ✔ |

### 2.3 Arancio, linee, grigi, velo

| Coppia | Rapporto | Esito |
|---|---|---|
| `#111111` su `#FF4F00` (striscia, `ERRORE`, `AGGIUNTO`, `ULTIMI PEZZI`, 12 px) | 5,73 | ✔ |
| Bordo tag arancio vs Cemento | 2,59 | ✔ non serve (il tag è testo, non un controllo) |
| `--line-control-muted` `#82817E` su Cemento | 3,07 | ✔ al limite |
| `#82817E` su Bianco ottico | 3,63 | ✔ |
| Diagonale taglia esaurita Grafite su Cemento | 5,19 | ✔ |
| Grafite `#5E5D59` (hint, placeholder) su Bianco ottico | 6,15 | ✔ |
| Bordo pannello `#111111` vs velo `#91908D` | 5,91 | ✔ |
| Pannello Cemento vs velo | 2,51 | ok: il confine è dato dal bordo nero |
| Tratteggio trasparenze 30 % su Bianco ottico (`#B2B2B1`) | 1,98 | ✔ decorativo (trasparenza scritta anche nel testo) |
| Abilitato `#111111` vs disabilitato Grafite (frecce galleria, stepper) | 2,86 | vedi K3 |

### 2.4 Texture cemento (domanda aperta §5.2.3) — rumore `#111111` al pixel più scuro

| Opacità | Grafite su texture | `#82817E` su texture |
|---|---|---|
| 0 % (piatto) | 5,19 ✔ | 3,07 ✔ |
| 1 % | 5,09 ✔ | **3,01** ✔ al limite |
| 2 % | 5,00 ✔ | 2,95 ✘ |
| 4 % (proposta) | 4,80 ✔ | **2,84 ✘** |
| 6 % | 4,59 ✔ | 2,71 ✘ |

Con la texture al 4 % il testo passa ancora, ma il bordo della taglia esaurita non arriva a 3:1 → vedi K4.

Nessun nuovo grigio introdotto oltre a quelli già verificati.

---

## 3. Componenti critici

| Componente | Esito | Note |
|---|---|---|
| Pannello borsa | ⚠ corretto | **P1 (importante, 4.1.3)**: con `showModal()`/`inert` la regione `role="status"` globale fuori dal dialog esce dall'albero di accessibilità e le rimozioni/aggiunte fatte dentro la borsa non vengono lette. Corretto: una regione status in ogni dialog `[a11y]` §3.3. Riepilogo fisso su mobile: lista in contenitore separato `[a11y]` §3.14. `ANNULLA` non più a tempo (2.2.1) `[a11y]` §3.15 |
| Guida taglie | ✔ | dialog, `<table>` con `caption`/`scope`, regione scorrevole con nome; anello inset `[a11y]` |
| Menu mobile | ✔ | dialog a tutto schermo; categorie in condensato ≥32 px intere. Nota fase 6: aprire la borsa dal menu = dialog sopra dialog; alla chiusura il focus torna al `BORSA` del menu |
| Selettore taglia (fascia+coppa) | ⚠ corretto | `aria-invalid` su `fieldset` non funziona → `aria-describedby` sui radio `[a11y]`; frecce tastiera dei radio nativi su una taglia esaurita: va ripristinata la selezione precedente `[a11y]`; righe fascia come sottogruppi dello stesso gruppo radio `[a11y]`. Esaurita: bordo 3,07 + diagonale 5,19 + testo SR ✔. N7 a 320 px: da validare |
| Swatch | ⚠ corretto | diagonale invisibile su Nero/Grafite/Skin 03 (**P2, importante, 1.4.11**) `[a11y]`. Target 44 px ✔. Vedi K2 |
| Form checkout | ✔ | label sempre visibili, frase obbligatori + "(facoltativo)", `autocomplete`, errori in testo nero + tag, riepilogo errori con focus, 3.3.7 ✔. Aggiunti: tag `ERRORE` nel `aria-describedby`, min-height `[a11y]` |
| Contatore `BORSA [0]` | ✔ | nome "Borsa, 2 articoli", `[2]` nascosto; stato di caricamento senza "punto" `[a11y]`; inversione 600 ms una sola volta, tolta con reduced-motion |
| Striscia demo | ✔ | 5,73:1, testo reale, mai `role="alert"`, non sticky. Skip link prima nel DOM `[a11y]` |
| Titolo "muro" | ✔ | un solo `h1` con testo completo; `clamp` con min/max in rem; mobile intero; aggiunto `break-word` di emergenza `[a11y]`. Vedi M3 |
| Galleria | ⚠ corretto | frecce presenti (2.5.7 ✔); mancavano misura del bersaglio e nome della traccia `[a11y]`. Vedi K1, K3 |
| Sticky (2.4.11) | ✔ | max 2, statici con altezza ≤600 px (quindi anche con zoom 200–400 %); `scroll-padding` esteso alla barra filtri `[a11y]`. Da testare in fase 7: Safari rispetta `scroll-padding` solo in parte quando il focus si sposta con Tab |
| Target size (2.5.8) | ✔ | 44 px su tutto; 24 px solo link inline e footer desktop |
| Animazioni | ✔ | ≤200 ms, `linear`, niente parallax/autoplay, reduced-motion globale (`0.01ms` `[a11y]`) |
| Contrasto elevato Windows | ⚠ corretto | **P3 (miglioramento, 1.4.11 in pratica)**: stati dati dal fondo pieno (taglia selezionata, checkbox, tag) spariscono con `forced-colors` → regola `[a11y]` §1.8 |

---

## 4. SVG placeholder (`public/placeholders/`)

| Controllo | `plane-bra-front` | `axis-brief-front` | `monolith-body-front` |
|---|---|---|---|
| `<title>` + `<desc>` | ✔ | ✔ | ✔ |
| `role="img"` | ✔ | ✔ | ✔ |
| Testo nell'SVG | `#111111` su Cemento 14,86 ✔ | ✔ | ✔ |
| Linee informative piene `#111111` | ✔ | ✔ | ✔ |
| Griglia 15 % / tratteggio 30 % solo decorativi | ✔ | ✔ | ✔ |
| Testo SVG neutro rispetto alla lingua | ✔ | ✔ | ✔ |

Problemi (da passare a `visual-content` / `frontend-developer`, non li modifico):

- **S1 — importante (1.1.1 / 1.4.11, leggibilità)**: richiami `1–4` e quote `A–C` sono a **13 px su un viewBox di 800**. Nella galleria mobile (immagine ≈343 px) diventano **≈5,6 px**; a 1024 px (colonna ≈560 px) ≈9 px. La legenda HTML dice "1 — ferretto in acciaio", ma chi vede non riesce a trovare l'"1" nel disegno. Nelle card (≈165 px) il testo diventa ≈3 px, ma lì è decorativo (`alt=""`): va bene. → conflitto **K1**.
- **S2 — importante solo se SVG inline**: gli `id` sono generici (`t`, `d`, `g`, `h`, `x`, `a`, `b`, `cl`, `cr`). Con più SVG inline nella stessa pagina (galleria V1–V3) collidono: `aria-labelledby` e i pattern puntano all'SVG sbagliato. Correzione: `prefixIds` di SVGO alla build, oppure usare sempre `<img>` (consigliato in `visual-guidelines` §6).
- **S3 — miglioramento**: `aria-labelledby="t d"` mette tutta la `desc` nel nome (troppo lungo). Meglio `aria-labelledby="t" aria-describedby="d"`. Non conta in `<img>` (vince l'`alt`), conta inline.
- **S4 — ok, da ricordare**: `<title>`/`<desc>` sono in italiano. In `<img>` l'SVG interno viene ignorato e conta l'`alt` del componente (dai dati `alt.it`/`alt.en`): ✔. Se inline in una pagina EN, il componente deve sostituire il titolo o mettere `aria-hidden` sull'SVG e dare il nome dall'esterno. Le informazioni della `desc` (mesh, trasparenza) devono stare anche nell'HTML: già previsto (accordion + `<dl>`).
- Regola `alt`: vuoto nelle card, descrittivo nella scheda con la formula "{Nome}, {categoria}: disegno tecnico, vista …" ✔ (design system §3.22, `visual-guidelines` §5).

---

## 5. Conflitti da decidere con l'utente

**K1 — Numeri e lettere nei disegni illeggibili su mobile** (importante; S1)
- a) Ingrandire richiami e quote nell'SVG (cifre ≈24 su viewBox 800, cerchi Ø ≈44): su mobile diventano ≈10–11 px. Il disegno resta tecnico, ma i segni pesano un po' di più.
- b) Tenere il disegno com'è e aggiungere sotto la galleria mobile un bottone testuale `INGRANDISCI` che apre la vista a tutto schermo (dialog) con pinch-zoom; non bloccare mai lo zoom della pagina (`user-scalable` sempre consentito).
- c) Su mobile togliere i richiami dal disegno e lasciare solo la legenda in testo.
- **Raccomandazione: a + b insieme** (a moderato, b come rete di sicurezza). La c fa perdere il legame tra disegno e legenda.

**K2 — Colore esaurito: lo stato si vede solo dalla diagonale di 1 px su un quadrato di 16 px** (miglioramento; 1.4.1 rispettato per la forma, ma il segno è minuscolo)
- a) **(consigliata)** Mostrare l'esaurito anche nell'etichetta: `COLORE — NERO · ESAURITO` quando è selezionato un colore esaurito (testo da `copywriter`).
- b) Lasciare com'è (conforme).

**K3 — Frecce galleria al primo/ultimo e stepper `−` a 1: lo stato "disattivato" si vede solo dal grigio** (miglioramento; `#111111` vs Grafite = 2,86:1)
- a) **(consigliata)** Freccia nascosta alla prima/ultima immagine (il contatore `1 / 3` resta), stepper come ora ma con il bordo tratteggiato (`--border-control-muted` dashed).
- b) Lasciare com'è (i componenti disattivati sono esclusi da 1.4.3/1.4.11).

**K4 — Texture cemento (§5.2.3 del design system)** (importante solo se si sceglie la texture)
- a) **(consigliata, uguale alla raccomandazione dell'art-director)** Fondo piatto nel MVP.
- b) Texture ≤4 %, ma il bordo della taglia esaurita passa da `#82817E` a Grafite `#5E5D59` (4,80:1 sulla texture): le taglie esaurite diventano un po' più scure.
- c) Texture al massimo all'1 % (3,01:1, margine nullo): sconsigliata.

---

## 6. Miglioramenti minori (non serve una decisione)

- **M1** Il link del selettore lingua usa `hreflang="en"` mentre l'`html` è `en-GB`: usare `en-GB` ovunque per coerenza (da allineare con `performance-seo`).
- **M2** Nome della card prodotto: è un unico link, quindi lo screen reader legge tutto ("AXIS Reggiseno a triangolo 95,00 € 4 colori Esaurito"). Va bene; in fase 7 controllare che l'ordine resti nome → tipo → prezzo → stato.
- **M3** Muro ≥768: l'etichetta visibile d'esempio (`DROP — GRID / 01`) e il testo accessibile (`GRID / 01`) devono coincidere; il testo visibile di `wall__label` deve essere proprio il contenuto dell'`h1`.
- **M4** Il messaggio di errore del selettore taglia viene letto grazie al focus: non duplicarlo nella regione status (già scritto `[a11y]`).
- **M5** In fase 7, test di pronuncia per `AXIS`, `GRID`, `PLANE` in NVDA e VoiceOver (vedi I6 del controllo precedente).

## 7. Modifiche fatte in `docs/design/design-system.md` (tutte marcate `[a11y]`, nessun cambio di aspetto)

1. Intestazione: rimando a questo report.
2. §1.2 swatch: contrasti calcolati, bordo obbligatorio, token della diagonale.
3. §1.8: `--focus-ring-inset`, focus sugli input nascosti, `forced-colors`, `tabindex="-1"`.
4. §1.10: reduced-motion a `0.01ms`.
5. §1.11: `scroll-padding-top` con la barra filtri mobile.
6. §3.1: skip link prima della striscia demo.
7. §3.3: regione status dentro ogni dialog; nome nello stato di caricamento.
8. §3.9: frecce 44×44, traccia con `role="region"` e anello inset.
9. §3.10: colore della diagonale esaurito per swatch scuri/chiari.*
10. §3.11: errore con `aria-describedby` sui radio; frecce tastiera su esaurite; sottogruppi fascia.
11. §3.14: riepilogo fisso della borsa mobile che non copre il focus.
12. §3.15: `ANNULLA` senza limite di 5 s; annuncio della rimozione.
13. §3.16: errore nel `aria-describedby`; min-height dei campi.
14. §3.23: `overflow-wrap: break-word` di emergenza sul muro mobile.

\* Unica correzione che cambia un pixel: la diagonale di 1 px sugli swatch scuri diventa Cemento invece di nera. Come scritta prima era invisibile, quindi l'intenzione del design (diagonale = esaurito) resta uguale. Se l'art-director preferisce un'altra soluzione (es. diagonale che esce dal quadrato), va bene qualunque scelta che arrivi a 3:1.
