# LINGERAI — Linee guida visive: placeholder a disegno tecnico + foto future (Fase 4)

> Autore: `visual-content` · Data: 2026-11-05 · Stato: **proposta, da approvare**
> Base vincolante (`docs/decisions.md`): direzione **A MONOLITE** + **disegni tecnici dei capi** (da C) come placeholder; arancio `#FF4F00` solo come fondo pieno con testo `#111111`; due livelli di linea; grigio solo da 14 px in su.
> Prototipi: `public/placeholders/plane-bra-front.svg`, `axis-brief-front.svg`, `monolith-body-front.svg`.

---

## 1. Il disegno tecnico (flat sketch)

**Principio.** Il capo è disegnato **in piano, da solo**, come in una scheda di produzione: niente corpo, niente manichino, niente volumi anatomici o ombre che suggeriscano forme. Simmetrico, frontale, centrato. Non finge di essere una foto.

### 1.1 Tratti (su viewBox 800 × 1000)

| Elemento | Tratto | Colore | Livello (a11y C3) |
|---|---|---|---|
| Contorno del capo, spalline, hardware | 2 px pieno, giunti `round` | `#111111` | informativo (14,86:1) |
| Cuciture strutturali (pannelli, centro) | 1 px pieno | `#111111` | informativo |
| Impunture, bordini, canale ferretto, elastici | 1 px tratteggio `4 3` | `#111111` | informativo |
| Linee di quota e di richiamo | 1,5 px pieno, frecce aperte (K1) | `#111111` | informativo |
| Griglia di sfondo (planimetria, passo 80 px) | 1 px | `#111111` al 15% | decorativo |
| Texture trasparenze | 1 px | `#111111` al 30% | decorativo (il contorno resta pieno) |

Mai linee informative in grigio chiaro o semitrasparenti. Niente sfumature, ombre, gradienti.

### 1.2 Riempimenti = codice della trasparenza

| Materiale | Riempimento | Esempio |
|---|---|---|
| Opaco (microfibra, banda, tassello in cotone) | pieno Bianco ottico `#F7F7F5` | MONOLITH, banda di AXIS brief |
| Semitrasparente (mesh singolo, tulle) | `#F7F7F5` + tratteggio diagonale 45°, passo 8 px | AXIS brief |
| Mesh doppio strato | `#F7F7F5` + tratteggio incrociato, passo 8 px | coppe PLANE |
| Trasparente pieno (es. VOID) | **nessun fondo** (si vede la griglia) + tratteggio diagonale rado, passo 12 px | — |
| Hardware metallico | pieno `#111111` o contorno 2 px | anelli, ganci |

La trasparenza va **sempre** scritta anche nel testo della scheda (accordion "Trasparenza"): il tratteggio non è l'unica fonte.

### 1.3 Quote, numeri, etichette

- **Quote a lettera** (`A`, `B`, `C`…), non numeri in cm: le misure cambiano per taglia e stanno in una tabella HTML sotto l'immagine (bilingue, leggibile dagli screen reader). Max 3 quote per vista.
- **Dimensioni minime (decisione K1, 2026-11-05).** Regola: il testo più piccolo deve restare ≥ 11 px quando il disegno è largo **343 px** (mobile 375 con margini). Fattore 343/800 = **0,429** → su viewBox 800 servono almeno 26 unità.
  | Elemento | Su viewBox 800 | A 343 px | A 560 px |
  |---|---|---|---|
  | Numeri dei richiami, lettere delle quote | mono **28**, peso 500 | 12,0 px | 19,6 px |
  | Etichette di cantiere (alto/basso) | mono **26**, spaziatura 0,06 em | 11,1 px | 18,2 px |
  | Cerchio dei richiami | **r 24** (Ø 48), tratto 1,5 | Ø 20,6 px | Ø 33,6 px |
  | Fondo dietro le lettere delle quote | quadrato **36 × 36** color Cemento | — | — |
  | Linee di quota e di richiamo | **1,5** pieno, frecce aperte `markerWidth 8` | 0,64 px | 1,05 px |
  | Punto d'arrivo del richiamo | r 4 | — | — |
- **Richiami numerati**: max 4 per vista (con i cerchi più grandi, 3 se il capo è piccolo). Cerchi sempre **fuori dal capo**, linea che arriva con il punto sul dettaglio; le linee non si incrociano tra loro. La legenda (`1 — ferretto in acciaio`…) sta nell'HTML, non nell'SVG.
- **Testo dentro l'SVG solo neutro rispetto alla lingua**: nomi prodotto, codici, numeri. Così un solo file serve IT e EN.
- **Etichetta di cantiere** in alto: `NOME — NN/13 — 4:5` a sinistra, `GRID / 01` a destra. In basso: `LG-NN / NOME` e `V1/3` (vista 1 di 3). Mono 26 (vedi tabella), `#111111`, maiuscolo, spaziatura 0,06 em; baseline a y 70 e y 950. Inline vanno in un `<g aria-hidden="true">` (già presente nei file).
- **Crocini di taglio** ai 4 angoli dell'area di disegno (inset 40 px).
- Font: `'JetBrains Mono', ui-monospace, monospace`. Nota: in `<img>` l'SVG non carica i web font e usa il mono di sistema; con SVG inline usa JetBrains Mono del sito.

### 1.4 Legende dei tre prototipi (da riportare nell'HTML)

| File | Richiami | Quote |
|---|---|---|
| `plane-bra-front.svg` | 1 ferretto in acciaio · 2 mesh doppio strato · 3 cucitura verticale a vista · 4 chiusura posteriore a gancetti (il regolatore della spallina resta disegnato, senza numero) | A larghezza fascia · B altezza coppa |
| `axis-brief-front.svg` | 1 mesh · 2 tassello in cotone · 3 cucitura centrale a vista | A larghezza in vita · B altezza davanti · C altezza fianco |
| `monolith-body-front.svg` | 1 microfibra opaca · 2 sgambatura alta · 3 tassello | A larghezza scollo · B lunghezza davanti · C altezza sgambatura |

---

## 2. Colori ammessi

| Ruolo | Colore | Note |
|---|---|---|
| Fondo placeholder | Cemento `#E6E4DF` (prototipi) **oppure** Cassaforma `#C9C6BF` | vedi domanda D1 |
| Fondo del capo | Bianco ottico `#F7F7F5` | |
| Tratti, testo, quote | `#111111` | 14,86:1 su Cemento, 11,07:1 su Cassaforma |
| Grigio Grafite `#5E5D59` | **non usato nei disegni** | su Cassaforma non passa (3,86:1); testo nel disegno sempre `#111111` |
| Arancio `#FF4F00` | solo come **fondo pieno** di un badge HTML sopra la card (es. `NUOVO`, `ULTIMI PEZZI`) con testo `#111111` | mai tratto, mai testo, mai riempimento del capo |

Colore del capo (Nero, Grafite, Skin 01/02/03): il disegno resta neutro (bianco). Il colore lo dicono swatch e testo. Opzione futura: variante "Nero" con capo `#111111` e tratti interni Cemento, da valutare con a11y.

---

## 3. Formati

| Uso | Rapporto | viewBox | Note |
|---|---|---|---|
| **Prodotto** (card, scheda, borsa) | **4:5** | `0 0 800 1000` | area di disegno 720 × 800, margine 40 |
| Editoriale verticale (home drop, About) | **3:4** | `0 0 900 1200` | più capi in tavola (es. set AXIS bra + brief) |
| Editoriale orizzontale (banner GRID / 01, Guida ai modelli) | **16:9** | `0 0 1600 900` | sequenza in fila di 4–6 capi, come le tipologie dei Becher |

Il placeholder ha sempre la stessa proporzione dell'immagine definitiva (niente salti di layout).

## 4. Viste per prodotto

| Vista | File | Contenuto |
|---|---|---|
| V1 Fronte | `{slug}-front.svg` | capo intero, quote principali, richiami |
| V2 Retro | `{slug}-back.svg` | chiusure, schiena (es. T di MONOLITH, gancetti di PLANE) |
| V3 Dettaglio | `{slug}-detail.svg` | ingrandimento 2:1 di un punto costruttivo (ferretto, cucitura, hardware) dentro un cerchio/riquadro di dettaglio |

Nelle card: solo V1 (hover/focus → V2, scambio a 0 ms come da direzione). In scheda: V1, V2, V3 impilate.

## 5. Testi alternativi (dalle note a11y, `a11y-early-check.md` I8)

- **Card prodotto**: immagine dentro il link con nome e prezzo → `alt=""` (o SVG inline `aria-hidden="true"`).
- **Scheda prodotto**: `<img alt="…">` oppure SVG inline con `role="img"` + `<title>`. Formula: **"{Nome}, {categoria}: disegno tecnico, vista {frontale | dal retro | dettaglio di …}"**. Esempio: "PLANE, reggiseno balconette: disegno tecnico, vista frontale". EN: "PLANE, balconette bra: technical drawing, front view".
- Le **misure e le legende** stanno in testo HTML (tabella/elenco) accanto o sotto, non solo nel disegno.
- Etichette di cantiere: decorative; inline vanno in un gruppo `aria-hidden="true"`.
- Il `<title>` dentro i file è in italiano (per test e anteprima): **in pagina conta l'`alt` passato dal componente**, nella lingua della pagina. Gli `alt` vivono nei dati prodotto (`alt.it`, `alt.en`), non nei file.
- Foto future: si descrive il capo (modello, colore, vista, eventuale styling), **mai il corpo** della modella. Es. "AXIS nero, vista frontale, indossato con blazer aperto".

## 6. Specifiche tecniche (da confermare con `performance-seo`)

- **Nomi file**: inglese, kebab-case, `{product-slug}-{view}.svg` → `plane-bra-front.svg`, `axis-brief-back.svg`, `monolith-body-detail.svg`. Slug = nome catalogo + categoria quando il nome è condiviso (AXIS bra / AXIS brief).
- **Cartella**: `public/placeholders/`. Foto future: `public/images/products/{slug}-{view}-{color}.{avif|webp}`.
- **Peso**: SVG **≤ 15 KB** (prototipi: 3,6–4,7 KB), niente immagini raster incorporate, niente font incorporati, niente script. Passare in SVGO prima del commit (mantenendo `viewBox`, `title`, `desc`).
- **Id unici (regola, da 2026-11-05)**: ogni `id` nel file è prefissato con il nome del file senza estensione: `{slug}-{view}-{ruolo}` → `plane-bra-front-title`, `-desc`, `-grid`, `-mesh`, `-hatch`, `-arrow`, `-cup-l`… Mai id generici (`t`, `g`, `a`). Riferimenti: `aria-labelledby="{file}-title"` + `aria-describedby="{file}-desc"` (non entrambi nel nome). In SVGO disattivare `cleanupIds` o usare `prefixIds` con lo stesso schema.
- **Vista "Ingrandisci" (K1)**: si usa **lo stesso file**, nessuna versione dedicata. Nel dialog a schermo intero il disegno occupa la larghezza disponibile (max 1000 px di altezza), fondo Cemento piatto, rapporto 4:5 mantenuto, pinch-zoom consentito; la legenda HTML resta sotto o accanto. Le dimensioni della tabella sopra bastano: a 800 px i numeri sono 28 px.
- **Uso consigliato**: come file con `<img>` (cache, nessun peso nell'HTML) nelle card; inline solo dove servono stati o interazioni.
- **Foto future**: AVIF + WebP di riserva, larghezze 480 / 800 / 1200 / 1600 px, prodotto 4:5 ≤ 150 KB a 1200 px, editoriale ≤ 250 KB; sRGB; dimensioni dichiarate (`next/image`); EXIF/GPS rimossi.

## 7. Foto future (sintesi)

Le regole di casting e tono sono già in `docs/research/product-positioning.md` §7 e `docs/brand/visual-directions.md` (A MONOLITE, §4): valgono integralmente. Qui solo le aggiunte operative:

- **Luce**: dura zenitale per lo still-life su cemento; piatta e diffusa per il corpo, così il colore è vero.
- **Inquadrature**: frontale e laterale a camera all'altezza del busto, crop netti (sotto lo sguardo, linea della spalla) ma **mai** close-up su zone intime, mai dall'alto/dal basso in modo allusivo.
- **Ordine in scheda**: still-life fronte → su corpo fronte → retro → dettaglio (lo stesso schema V1–V3 dei placeholder).
- **Casting**: almeno 2 corporature per prodotto; Skin 01/02/03 sulla pelle corrispondente; età anche 40+. **Solo maggiorenni**, con documento verificato e liberatoria archiviata.
- **Post-produzione**: solo colore, esposizione, polvere. **Niente ritocco della pelle** né del corpo (forma, peli, smagliature, cicatrici restano).
- **Trasparenze**: vedi domanda D3.
- Licenze libere (eventuali still-life di tessuti): registrare URL, autore, licenza e data in `docs/visual/image-sources.md` prima di scaricare. Nessuna immagine scaricata in questa fase.

---

## 8. Domande per l'utente

- **D1 — Fondo del placeholder.** a) Cemento `#E6E4DF` come la pagina, con la griglia che continua (★ consigliata: il disegno "galleggia" nella planimetria, più radicale); b) Cassaforma `#C9C6BF`, blocco più visibile (come nei blueprint UX); c) Bianco ottico, effetto carta tecnica.
- **D2 — Griglia dentro il disegno.** a) visibile al 15% (★); b) assente, solo crocini.
- **D3 — Policy trasparenze nelle foto future.** a) capi trasparenti sempre con styling (blazer, top sotto) su corpo + still-life per mostrare il capo (★); b) trasparenze su corpo senza styling, solo in editoriale; c) solo still-life per i capi trasparenti.
- **D4 — Legende.** Lettere e numeri nell'SVG + legenda HTML bilingue (★) oppure disegno senza richiami, solo quote.
