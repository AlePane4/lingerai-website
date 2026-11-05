# LINGERAI — Direzioni visive (Fase 2, Direzione creativa)

> Autore: `art-director` · Data: 2026-11-05 · Stato: **proposta, da scegliere con l'utente**
> Nulla qui è deciso. Base fissa (da `docs/decisions.md`): posizionamento **Architectural Minimal**, carattere **edgy grezzo tipo Rick Owens**, linea donna, taglie fascia+coppa EU / XS–3XL.
> Dai riferimenti si prende l'attitudine, mai layout, testi, loghi o immagini.

---

## 0. Principi comuni alle tre direzioni

Valgono qualunque direzione si scelga:

1. **Il sito deve essere bello prima delle foto.** Il carattere viene da tipografia, griglia e vuoto, non dalle immagini (che per ora sono placeholder).
2. **L'edgy sta nella cornice, non nell'acquisto.** Prezzo, taglia, disponibilità, `BAG [n]`, bottone "Aggiungi" e il banner "Demo — nessun pagamento verrà effettuato" sono **sempre** nel font di testo, dritti, leggibili, ad alto contrasto. Il titolo può essere enorme e tagliato, il prezzo mai.
3. **Utility come parole**, non icone: `CERCA`, `IT / EN`, `BAG [0]`, `MENU`.
4. **Font veri, mai deformati.** Niente `scaleX`, niente stretch via CSS: se serve un testo stretto si usa un font o un asse di larghezza (`wdth`) disegnato apposta.
5. **Font self-hosted** (via `next/font`, file locali): niente chiamate a server Google dal browser — più veloce e meglio per la privacy UE.
6. **Movimento secco**: transizioni 0–200 ms, nessun easing "morbido", nessun parallax; con `prefers-reduced-motion` tutto diventa istantaneo.
7. **Testo minimo 16 px** per il corpo, **12 px** minimo per etichette maiuscole (con spaziatura +0,04–0,08 em). Contrasti AA (4,5:1 testo normale, 3:1 testo grande e bordi dei controlli). I rapporti qui sotto sono calcolati da me in modo approssimativo: **li verificherà l'`accessibility-auditor`**.

---

## 1. Moodboard a parole

### Materiali
- **Cemento a vista** (*béton brut*) con l'impronta delle tavole di cassaforma: superficie grezza ma geometrica.
- **Acciaio brunito / verniciato nero opaco**, come l'hardware dei capi: anelli, ganci, cursori.
- **Gomma** ed **elastico gommato**: nero profondo che assorbe la luce.
- **Mesh tecnica e tulle**: trasparenza che rivela la struttura, come un'impalcatura.
- **Carta da fotocopia e toner**: il nero che "sporca" il bianco, bordi non perfetti.
- **Nastro telato, etichette tessute, cartellini di cantiere**: segni funzionali che diventano grafica.

### Luce
- **Luce dura zenitale** che disegna ombre nette sotto le cuciture (pensa a un taglio di luce in una cappella di cemento).
- **Flash diretto** in ambiente buio: pelle che emerge, fondo che sparisce.
- **Neon freddo** e luce da parcheggio sotterraneo: bianco-verdastro, piatto, senza romanticismo.
- **Luce diffusa piatta da still-life**: nessuna ombra, il capo come oggetto da catalogo tecnico.

### Texture
- Grana di pellicola ad alta sensibilità, **retino a mezzatinta**, toner che si deposita male.
- **Linee sottili (1 px)** come in una planimetria; quote e frecce di misura.
- Pelle vera, non ritoccata, come unico elemento caldo in un mondo di superfici dure.

### Riferimenti culturali (attitudine, non da copiare)
- **Architettura**: Le Corbusier e il *béton brut*; Tadao Ando (cemento e luce); Lina Bo Bardi, SESC Pompéia (il grezzo come scelta civile); il Barbican di Londra; in Italia la Torre Velasca (BBPR) e l'Istituto Marchiondi di Vittoriano Viganò — brutalismo italiano.
- **Arte**: Lucio Fontana, i *Concetti spaziali* (il **taglio** come gesto: un'idea forte per i crop e le linee che "tagliano" il layout); Richard Serra (acciaio, peso, tensione); Donald Judd e Carl Andre (serialità, modulo); Rebecca Horn (estensioni e strutture sul corpo — vicino all'harness); Bernd & Hilla Becher (tipologie fotografiche in griglia → l'idea di catalogo).
- **Fotografia**: Daido Moriyama (bianco e nero sgranato, mosso, contrastato); Rineke Dijkstra (ritratti frontali, neutri, non ammiccanti — coerente con le linee guida di casting).
- **Musica**: Einstürzende Neubauten (metallo e cantiere), techno berlinese anni 2000 (club come scatola di cemento), Ryoji Ikeda (dati, bianco/nero, rigore assoluto), Pan Sonic (minimalismo rumoroso).
- **Editoria e grafica**: griglia svizzera (Müller-Brockmann), i poster a griglia di Wim Crouwel, le fanzine punk fotocopiate, le schede tecniche industriali, le riviste di moda indipendenti con impaginazioni tese e tanto bianco.

**Sintesi in una riga:** *la lingerie come cantiere: struttura a vista, luce dura, una sola cosa calda — il corpo.*

---

## 2. Le tre direzioni

Riassunto veloce:

| | **A. MONOLITE** | **B. BLACKOUT** | **C. SCHEDA TECNICA** |
|---|---|---|---|
| Idea | Brutalismo: cemento chiaro, tipografia gigante | Notte, flash, club: sito nero | Documento tecnico / fotocopia: tutto è dato |
| Base | Chiara (grigio cemento) | Scura (nero) | Bianca (carta) |
| Edgy da | Scala tipografica estrema, griglia visibile, tagli | Buio, contrasto, flash, serif tagliente | Monospace, numerazioni, quote, crudezza da fotocopia |
| Rischio principale | Titoli enormi che spingono giù il prodotto | Capi neri su fondo nero; lettura lunga su scuro | Sembrare "freddo" o da sviluppatore; densità |

---

### A. MONOLITE

**Concept.** Il sito come un edificio brutalista: superfici di cemento chiaro, struttura a vista, una tipografia condensata enorme che si comporta come un volume architettonico — tagliata dai bordi dello schermo, come un muro che continua oltre l'inquadratura. Tutto il resto è silenzio e griglia.

**Palette indicativa**

| Ruolo | Nome | HEX | Note contrasto (stima) |
|---|---|---|---|
| Fondo | Cemento | `#E6E4DF` | — |
| Testo / linee | Nero cantiere | `#111111` | ~15:1 su Cemento ✔ |
| Testo secondario | Grafite | `#5E5D59` | ~5,2:1 su Cemento ✔ (AA) |
| Superficie placeholder | Cassaforma | `#C9C6BF` | solo superficie, non per testo |
| Fondo alternativo (sezioni) | Bianco ottico | `#F7F7F5` | |
| Accento (opzionale) | Segnale | `#FF4F00` | **solo come fondo con testo nero** (~5,7:1 ✔). Come testo su Cemento **non passa** (~2,6:1 ✘) |

**Font candidati**
- Display: **Archivo** (variabile, assi peso 100–900 e larghezza 62–125) — *SIL Open Font License 1.1*, Google Fonts. Usato in **Extra Condensed / Black**, tutto maiuscolo, per titoli e nomi prodotto. La larghezza ridotta è disegnata, non deformata.
- Testo e dati: **JetBrains Mono** — *SIL OFL 1.1*. Per prezzi, taglie, codici, `BAG [0]`, etichette.
- Alternativa display: **Big Shoulders Display** — *SIL OFL 1.1*.
- In alternativa, corpo di testo lungo (descrizioni) in **Archivo** larghezza normale, Regular 400, per non avere paragrafi interi in monospace.

**Scala indicativa**: display 12–22 vw (titoli home), H1 64–96 px, H2 32–40 px, corpo 16–17 px, etichette 12–13 px mono maiuscolo.

**Griglia e layout**
- Griglia a 12 colonne con **linee della griglia visibili** (1 px `#111111` al 15–20%) in alcune sezioni, come una planimetria.
- Margini laterali molto stretti (16–24 px): il layout "tocca" i bordi, ma con **grandi vuoti verticali** (120–240 px tra sezioni).
- **Griglia rotta controllata**: un titolo esce dalla colonna e viene tagliato dal bordo destro; una foto occupa 7 colonne e la successiva 4, sfalsata in verticale.
- Card prodotto senza bordi arrotondati, mai ombre.

**Immagini / placeholder**
- Placeholder: blocchi **Cassaforma** 4:5 con, in mono piccolo, `AXIS — 01/13 — 4:5`, come un'etichetta di cantiere. Facoltativa una texture fine di cemento generata in CSS (rumore leggero, molto sottile).
- Foto future: still-life con luce dura zenitale su fondo cemento; su corpo con luce piatta, inquadrature frontali, **crop netti e inattesi** (taglio sotto lo sguardo, solo busto e linea della spalla) ma mai voyeuristici.

**Microinterazioni**
- Hover sulle card: scambio istantaneo fronte/retro (0 ms, nessuna dissolvenza) + nome prodotto sottolineato da una linea di 2 px.
- `BAG [0]` → `BAG [1]`: il numero si sostituisce con uno scatto, e per 600 ms la parola `BAG` si inverte (nero su cemento → cemento su nero).
- Link: sottolineatura che appare da sinistra in 120 ms, lineare.
- Focus da tastiera: contorno nero 2 px + offset 2 px, ben visibile.

**Homepage**

Si apre con il nome del drop enorme, tagliato dal bordo; sotto, una sola immagine verticale e due parole. Poi la griglia dei prodotti con linee visibili, poi un blocco editoriale "Guida ai modelli" con disegni a tratto.

```
┌──────────────────────────────────────────────────────────┐
│ LINGERAI        REGGISENI SLIP BODY …   CERCA  IT/EN BAG[0]│
├──────────────────────────────────────────────────────────┤
│                                                          │
│ GRID/0│1                     ← titolo a 20vw, tagliato    │
│       │                                                  │
│       │ ┌────────────┐                                   │
│       │ │            │   DROP 01                         │
│       │ │   foto 4:5 │   Struttura a vista.              │
│       │ │            │   [ VEDI IL DROP ]                │
│       │ └────────────┘                                   │
│                                                          │
├─────┬─────┬─────┬─────┬──── linee di griglia visibili ───┤
│ ▓▓▓ │     │ ▓▓▓ │ ▓▓▓ │     │ ▓▓▓                         │
│AXIS │     │PLANE│GRID │     │LINE                         │
│95 € │     │135 €│120 €│     │98 €                         │
├─────┴─────┴─────┴─────┴─────┴────────────────────────────┤
│  GUIDA AI MODELLI → schemi a tratto delle silhouette     │
├──────────────────────────────────────────────────────────┤
│ footer mono piccolo: servizio · legale · IT/EN · demo    │
└──────────────────────────────────────────────────────────┘
```

**Scheda prodotto**
- Sinistra (7 col.): immagini impilate in verticale, 4:5, senza carosello.
- Destra (5 col., **sticky**): nome in Archivo condensato enorme (es. `PLANE` a 96 px), sotto in mono: prezzo `135,00 €`, colore `NERO / GRAFITE` con swatch quadrati 16 px, selettore taglia a griglia di caselle testuali (`70B 75B 75C …`, esaurite barrate), link `GUIDA TAGLIE →` (pannello laterale), bottone pieno nero a tutta larghezza `AGGIUNGI — 135 €`. Sotto, accordion: composizione, costruzione, trasparenza, vestibilità, cura.

**Rischi usabilità/accessibilità**
- Titoli a 20 vw possono spingere il primo prodotto troppo in basso su mobile → limitare con `clamp()` e mostrare almeno un prodotto "above the fold" su desktop.
- Titoli tagliati dal bordo: il testo tagliato **non deve essere l'unica fonte** dell'informazione (il nome completo va ripetuto leggibile o reso accessibile con `aria-label`).
- Grigio secondario troppo chiaro sul cemento: sotto `#5E5D59` non si va.
- L'accento arancio non può essere usato come colore di testo sul fondo chiaro.
- Mono per i prezzi: scegliere bene il formato numerico (`135,00 €` IT / `€135.00` EN) per non creare ambiguità.

---

### B. BLACKOUT

**Concept.** Il sito come un club alle 4 di notte: nero assoluto, un flash che accende solo la pelle e la costruzione del capo. Una serif stretta e tagliente porta il dramma, una sans neutra porta l'informazione. È la direzione più vicina al "mondo" Rick Owens: rituale, scuro, materico.

**Palette indicativa**

| Ruolo | Nome | HEX | Note contrasto (stima) |
|---|---|---|---|
| Fondo | Blackout | `#0A0A0A` | — |
| Testo | Osso | `#EDEBE6` | ~16:1 su Blackout ✔ |
| Testo secondario | Cenere | `#8C8A85` | ~5,7:1 su Blackout ✔ |
| Superficie placeholder / card | Asfalto | `#1A1A1A` | |
| Linee | Fumo | `#3A3A3A` | decorative; i bordi dei controlli vanno in Cenere (≥3:1) |
| Accento (opzionale) | Flash rosso | `#FF2A1A` | ~5,3:1 su Blackout ✔ come testo; usarlo per un solo ruolo |

**Font candidati**
- Display: **Instrument Serif** — *SIL OFL 1.1*, Google Fonts. Serif stretta, contrastata, contemporanea (non romantica). Solo da 40 px in su.
- Testo e interfaccia: **Inter Tight** — *SIL OFL 1.1*. Neutra, molto leggibile anche su fondo scuro.
- Dati (opzionale): **Geist Mono** — *SIL OFL 1.1* — per taglie e codici.
- Alternativa display più "dura": **Anton** — *SIL OFL 1.1* (solo un peso).

**Scala indicativa**: display 80–160 px, H1 56–72 px, corpo 17 px (su scuro conviene 1 px in più e interlinea 1,6), etichette 12–13 px maiuscolo.

**Griglia e layout**
- Griglia a 6 colonne, molto ariosa; contenuti spesso **centrati su un asse verticale** e poi rotti da un elemento laterale fuori asse.
- Sezioni a **tutto schermo** che alternano: immagine in flash / testo serif enorme / griglia prodotti.
- Poche linee, molto nero vuoto: il vuoto qui è "buio", non "bianco".

**Immagini / placeholder**
- Placeholder: rettangoli Asfalto con bordo 1 px Fumo e, al centro, il nome in serif sottile. Grana leggera generata in CSS.
- Foto future: **flash diretto**, fondo che si perde nel nero, pelle come unica luce; per i capi neri serve una luce di contorno (rim light) per staccarli dal fondo. Bianco e nero sgranato per l'editoriale.

**Microinterazioni**
- Hover sulle card: l'immagine passa da desaturata a colore pieno in 150 ms (o da nera a "accesa", come un flash).
- Comparsa delle sezioni: nessuna dissolvenza; il contenuto appare **di colpo**, come una luce che si accende (taglio secco, 0 ms).
- `BAG [1]`: il numero lampeggia una sola volta in Flash rosso (o in Osso pieno, se niente accento).
- Cursore normale (niente cursori custom).

**Homepage**

```
┌──────────────────────────────────────────────────────────┐
│ ● LINGERAI                    CERCA   IT/EN   BAG [0]    │  (nero)
│                                                          │
│                                                          │
│              Struttura,                                  │
│                    al buio.        ← serif enorme        │
│                                                          │
│      ┌──────────────────────────────┐                    │
│      │  foto flash a tutto schermo  │                    │
│      │  (pelle + costruzione)       │                    │
│      └──────────────────────────────┘                    │
│                                     DROP 01 — GRID       │
│                                     [ ENTRA ]            │
│                                                          │
│   ▓▓▓▓        ▓▓▓▓        ▓▓▓▓        ← 3 prodotti       │
│   AXIS 95 €   PLANE 135 € VOID 210 €                     │
│                                                          │
│   footer · servizio · legale · IT/EN · demo              │
└──────────────────────────────────────────────────────────┘
```

**Scheda prodotto**
- Immagine grande a sinistra su fondo nero; a destra nome in serif (`VOID`, 72 px), sotto in Inter Tight: prezzo, colore, taglie in caselle con bordo Cenere, taglia selezionata = casella piena Osso con testo nero. Bottone `AGGIUNGI ALLA BAG — 210 €` pieno Osso su nero (massimo contrasto, inconfondibile).
- **Variante consigliata**: il pannello informazioni e il checkout passano su fondo chiaro (Osso) — "si accende la luce" quando si compra.

**Rischi usabilità/accessibilità**
- **Capi neri su fondo nero**: senza foto con luce di contorno i prodotti spariscono; con i placeholder il catalogo sembra vuoto.
- Lettura lunga su fondo scuro (guida taglie, composizioni, testi legali) è più faticosa, soprattutto per chi ha astigmatismo → aumentare corpo e interlinea, o passare al chiaro per le pagine di servizio.
- Serif contrastata sotto i 32 px perde leggibilità: va usata solo per titoli.
- Rischio percettivo: "dark" + lingerie può essere letto come notturno/sensuale più che architettonico — va bilanciato con foto molto neutre e non ammiccanti.
- Più difficile mostrare fedelmente i toni Skin 01/02/03 su fondo nero.

---

### C. SCHEDA TECNICA

**Concept.** Il sito come il documento di produzione di un capo: carta bianca, tutto in monospace, ogni elemento numerato, quotato, annotato. L'edgy viene dalla crudezza da fotocopia — retino, toner, testo che sembra battuto a macchina — e dal fatto che la lingerie viene trattata come un progetto d'ingegneria, non come un oggetto di seduzione.

**Palette indicativa**

| Ruolo | Nome | HEX | Note contrasto (stima) |
|---|---|---|---|
| Fondo | Carta | `#FFFFFF` | — |
| Testo / linee | Toner | `#000000` | 21:1 ✔ |
| Testo secondario | Copia | `#6E6E6E` | ~5:1 su Carta ✔ (AA, al limite: non schiarire) |
| Superficie placeholder | Retino | `#EDEDED` + pattern a punti | solo superficie |
| Accento (opzionale) | Rosso correzione | `#E10600` | ~5:1 su Carta ✔ come testo; la "penna rossa" delle correzioni |

**Font candidati**
- Testo, interfaccia, titoli: **IBM Plex Mono** — *SIL OFL 1.1*, Google Fonts. Pesi 100–700, ottimo supporto per italiano.
- Titoli molto grandi (contrasto): **IBM Plex Sans Condensed** Bold — *SIL OFL 1.1*. Stessa famiglia, quindi coerenza perfetta.
- Alternative: **Space Mono** + **Space Grotesk** (entrambe *SIL OFL 1.1*), più "strane" e con più carattere, ma Space Mono è meno leggibile nei testi lunghi.

**Scala indicativa**: titoli 48–120 px (condensed), H2 24–28 px, corpo 15–16 px mono (il mono "sembra" più grande: 16 px resta il minimo per paragrafi), etichette 12 px.

**Griglia e layout**
- Griglia a 12 colonne con **tabelle e righelli**: ogni sezione ha un numero (`01 — DROP`, `02 — PRODOTTI`, `03 — GUIDA`), come i capitoli di una scheda tecnica.
- Testo allineato a sinistra con **colonne strette** e annotazioni a margine (es. accanto alla foto: `← cucitura a vista, 4 mm`).
- Rottura della griglia con **segni di registro / crocini di taglio** agli angoli delle immagini e linee di quota che attraversano il layout.

**Immagini / placeholder**
- Placeholder: **disegni tecnici a linea (flat sketch)** dei capi in SVG, con quote e frecce — il miglior placeholder possibile, perché è già "prodotto" e non finge di essere una foto. Si collega all'idea "Guida ai modelli".
- Foto future: trattamento bianco e nero ad alto contrasto con **retino a mezzatinta** per l'editoriale (effetto fotocopia), foto prodotto invece fedeli e pulite (il colore deve essere vero per l'acquisto).

**Microinterazioni**
- Hover sulle card: il disegno tecnico viene sostituito dalla foto (o viceversa) con un taglio netto; compaiono le quote.
- Aggiunta al carrello: la riga del carrello si "stampa" carattere per carattere (max 300 ms, disattivato con reduced-motion).
- Selezione taglia: la casella si riempie di nero; le esaurite sono barrate con una linea in Rosso correzione (se si sceglie l'accento) + testo "esaurita" per chi non vede il colore.
- Cursore lampeggiante `_` dopo il campo di ricerca.

**Homepage**

```
┌──────────────────────────────────────────────────────────┐
│ LINGERAI_   01 REGGISENI 02 SLIP 03 BODY …  CERCA IT/EN BAG[0]│
├──────────────────────────────────────────────────────────┤
│ 00 — DROP 01 / GRID                      REV. 2026.11    │
│                                                          │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ┐    SPEC.                             │
│  │   flat sketch   │    materiale ... mesh 78/22         │
│  │   PLANE ↔ 32cm  │    ferretto .... acciaio            │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ┘    taglie ...... 65–95 / A–G        │
│  +                 +    [ APRI IL DROP → ]               │
│                                                          │
│ 01 — PRODOTTI ───────────────────────────────────────────│
│ N°   NOME      CATEGORIA      TAGLIE       PREZZO        │
│ 01   AXIS      reggiseno      XS–3XL       95,00 €       │
│ 02   PLANE     balconette     65A–95G      135,00 €      │
│ 03   GRID      bralette       XS–XXL       120,00 €      │
│      (la lista diventa griglia di card con un toggle)    │
│                                                          │
│ 02 — GUIDA AI MODELLI  →                                 │
└──────────────────────────────────────────────────────────┘
```

**Scheda prodotto**
- Una vera "scheda": a sinistra immagini e disegno tecnico con quote; a destra blocco `SPEC.` con nome, codice (`LG-02 / PLANE`), prezzo, colore, taglie in tabella cliccabile, `GUIDA TAGLIE →`, bottone pieno nero `AGGIUNGI — 135,00 €`.
- Composizione e costruzione non nascoste in accordion ma **in tabella visibile** (è il racconto del prodotto, giustifica il prezzo).

**Rischi usabilità/accessibilità**
- Monospace per tutto il testo: paragrafi lunghi più lenti da leggere; serve interlinea generosa (1,6) e righe corte (max 60–65 caratteri).
- Rischio di sembrare **un sito per sviluppatori** o freddo, e di perdere il lato desiderabile/fashion se le foto non sono forti.
- Densità: tabelle e annotazioni possono affollare il mobile → su schermo piccolo le annotazioni vanno nascoste o spostate sotto.
- Il grigio Copia è al limite: non va schiarito.
- Il rosso, se scelto, non deve mai essere l'unico segnale (esaurito, errori): sempre anche testo.
- La lista-tabella dei prodotti va costruita come vera tabella o lista accessibile, non come `div` allineati.

---

## 3. Applicazione alle pagine (indicazioni comuni)

Il dettaglio arriverà in fase 3 (UX) e fase 4 (design system); qui la logica valida per tutte le direzioni:

- **Categoria**: titolo grande, conteggio nudo (`REGGISENI [04]`), filtri in una riga testuale (`TAGLIA · COLORE · ORDINA`), griglia 2 col. mobile / 3–4 desktop.
- **Carrello**: pannello laterale a destra, tutto in testo di interfaccia, righe con nome · colore · taglia · quantità · prezzo; totale in grande; "Demo" visibile.
- **Checkout**: una pagina, chiaro anche nella direzione B; banner fisso `DEMO — NESSUN PAGAMENTO VERRÀ EFFETTUATO` trattato come elemento tipografico (fascia piena nero o accento), non come alert giallo.
- **About**: la pagina più "libera" — testo grande, una sola immagine, manifesto breve.
- **Servizio** (spedizioni, resi, guida taglie, contatti, legale): sempre in layout di lettura semplice, una colonna, corpo 16–17 px. Qui l'edgy si riduce al titolo.

## 4. Foto e motion (comuni)

- Foto: corpi diversi, pose neutre, sguardo diretto o fuori camera, nessuna inquadratura voyeuristica (vedi `product-positioning.md` §7). Formato base **4:5** per le card, 3:4 o 16:9 per l'editoriale.
- Nessuna foto da stock di persone in lingerie; placeholder grafici o flat sketch finché non arrivano le foto del brand.
- Motion: tagli secchi, niente rimbalzi, niente scroll-jacking, niente video in autoplay con audio. Tutto rispetta `prefers-reduced-motion`.

---

## 5. Raccomandazione

**Consiglio la direzione A — MONOLITE**, eventualmente prendendo in prestito da C l'uso del mono per i dati e i **disegni tecnici come placeholder**.

Perché:
1. **Si vede il prodotto.** Il catalogo è quasi tutto nero e grafite: su fondo chiaro i capi si leggono, su fondo nero (B) rischiano di sparire.
2. **Regge senza foto.** Tipografia enorme + griglia visibile funzionano anche con i placeholder; B dipende molto da foto in flash che oggi non abbiamo.
3. **È coerente con il drop GRID / 01** e con "Architectural Minimal": la griglia del sito racconta la griglia dei capi.
4. **Edgy grezzo senza sacrificare l'acquisto**: il carattere sta nei titoli e nei tagli; prezzi, taglie e carrello restano in un mono pulito e chiaro.
5. **Accessibilità più semplice** di B (lettura lunga su chiaro) e più calda di C (meno "da sviluppatore").

Quando potrebbe avere senso un'altra scelta:
- **B** se l'utente vuole il massimo impatto emotivo e il "mondo" più vicino a Rick Owens, accettando di investire molto sulla fotografia (e magari con checkout e pagine di servizio su fondo chiaro).
- **C** se l'utente vuole un'identità molto riconoscibile e concettuale, dove il prodotto è raccontato come progetto tecnico.

Possibile ibrido da valutare: **A come base + sezioni "BLACKOUT" solo per l'editoriale/drop** (una pagina o una sezione della home al buio). Lo propongo come opzione, non come decisione.

---

## 6. Domande aperte per l'utente

1. **Quale direzione?** A MONOLITE, B BLACKOUT, C SCHEDA TECNICA, o un ibrido (es. A + sezioni B)?
2. **Colore d'accento**: sì o no? Se sì, quale ruolo unico (stato attivo, banner Demo, contatore BAG) e quale tono (arancio segnale, rosso flash, rosso correzione)?
3. **Logotipo**: wordmark semplice composto con il font scelto (più veloce, coerente) o un logotipo disegnato apposta (es. lettere tagliate, spaziatura estrema)? E vuoi giocare sul finale "-AI" del nome o tenerlo neutro?
4. **Maiuscolo**: tutto il sito in maiuscolo grezzo (molto Rick Owens) o maiuscolo solo per titoli ed etichette, con il corpo in minuscolo (più leggibile)?
5. **Placeholder**: blocchi grigi con etichetta, disegni tecnici a linea dei capi, o foto still-life di tessuti con licenza libera?
6. **Intensità della griglia rotta**: titoli tagliati dal bordo e immagini sfalsate in tutte le pagine, o solo in home ed editoriale?
7. **Fondo**: per te il "grezzo" è più chiaro (cemento) o più scuro (notte)? È la scelta che più cambia il risultato.
8. **Spazio editoriale "Guida ai modelli"** con schemi a tratto delle silhouette: lo vuoi già in homepage?

---

## Licenze font — riepilogo

| Font | Licenza | Fonte |
|---|---|---|
| Archivo (variabile wght + wdth) | SIL Open Font License 1.1 | Google Fonts |
| Big Shoulders Display | SIL OFL 1.1 | Google Fonts |
| JetBrains Mono | SIL OFL 1.1 | Google Fonts / JetBrains |
| Instrument Serif | SIL OFL 1.1 | Google Fonts |
| Inter Tight | SIL OFL 1.1 | Google Fonts |
| Anton | SIL OFL 1.1 | Google Fonts |
| Geist Mono | SIL OFL 1.1 | Google Fonts / Vercel |
| IBM Plex Mono, IBM Plex Sans Condensed | SIL OFL 1.1 | Google Fonts / IBM |
| Space Mono, Space Grotesk | SIL OFL 1.1 | Google Fonts |

La OFL permette uso commerciale, web embedding e self-hosting; non permette di vendere il font da solo e richiede di mantenere il file di licenza se si ridistribuiscono i file. Da ricontrollare la versione esatta sul sito di Google Fonts al momento dell'installazione (fase 6).
