# LINGERAI — Controllo accessibilità preliminare (Fase 3)

> Autore: `accessibility-auditor` · Data: 2026-11-05 · Obiettivo: **WCAG 2.2 livello AA**
> Oggetto: direzione visiva **A MONOLITE** con disegni tecnici come placeholder, accento **#FF4F00**, tono SPEC/MANIFESTO (vedi `docs/decisions.md`, `docs/brand/visual-directions.md`, `docs/brand/tone-of-voice.md`).
> Il codice ancora non esiste: qui ci sono rischi e regole da mettere nel design system (fase 4), non difetti nel codice.
> Lo stile grezzo resta. Ogni proposta serve a renderlo accessibile, non a toglierlo.

Gravità: **bloccante** (se resta così, alcune persone non possono usare il sito o comprare) · **importante** (ostacolo serio / non conforme AA) · **miglioramento** (buona pratica).

---

## 1. Contrasti calcolati

Metodo: formula di luminanza relativa WCAG 2.x (sRGB linearizzato, `(L1+0.05)/(L2+0.05)`), calcolata con uno script Node (vedi Appendice). Le linee semitrasparenti sono state convertite nel colore risultante sul fondo.
Soglie: **4,5:1** testo normale · **3:1** testo grande (≥24 px, oppure ≥18,66 px in grassetto) · **3:1** componenti UI, bordi dei controlli, focus e grafiche informative (1.4.3 / 1.4.11).

### 1.1 Testo

| # | Coppia (testo su fondo) | Rapporto | Testo normale | Testo grande | UI 3:1 | Note / correzione |
|---|---|---|---|---|---|---|
| 1 | `#111111` su Cemento `#E6E4DF` | **14,86:1** | ✔ | ✔ | ✔ | Coppia base: ok |
| 2 | `#111111` su Bianco ottico `#F7F7F5` | **17,60:1** | ✔ | ✔ | ✔ | ok |
| 3 | `#111111` su Cassaforma `#C9C6BF` | **11,07:1** | ✔ | ✔ | ✔ | ok, per le etichette sui placeholder |
| 4 | Cemento `#E6E4DF` su `#111111` (stato invertito, bottone pieno, `BORSA` invertita) | **14,86:1** | ✔ | ✔ | ✔ | ok |
| 5 | Grafite `#5E5D59` su Cemento | **5,19:1** | ✔ | ✔ | ✔ | ok, ma con poco margine. **Limite più chiaro possibile: `#676662` (4,5:1)** |
| 6 | Grafite `#5E5D59` su Bianco ottico | **6,15:1** | ✔ | ✔ | ✔ | ok |
| 7 | Grafite `#5E5D59` su Cassaforma `#C9C6BF` | **3,86:1** | ✘ | ✔ | ✔ | **Non passa per il testo piccolo** (es. l'etichetta `AXIS — 01/13 — 4:5` sui placeholder). Correzione: testo `#111111` sui placeholder, oppure grigio **`#545350`** (4,5:1 su Cassaforma, 6,05:1 su Cemento) |
| 8 | Grafite `#5E5D59` su `#111111` (sezioni scure) | **2,86:1** | ✘ | ✘ | ✘ | Se ci saranno sezioni scure (footer, ibrido "blackout"), il grigio secondario va cambiato: **`#7D7C78`** (4,52:1) o più chiaro |
| 9 | Nero `#000000` su Segnale `#FF4F00` | **6,37:1** | ✔ | ✔ | ✔ | ok |
| 10 | `#111111` su Segnale `#FF4F00` | **5,73:1** | ✔ | ✔ | ✔ | **Coppia consigliata per l'accento** (banner demo, badge) |
| 11 | Bianco `#FFFFFF` su Segnale | **3,30:1** | ✘ | ✔ | ✔ | Solo testo grande (≥24 px o ≥18,66 px grassetto). Per testo piccolo: usare il nero |
| 12 | Cemento `#E6E4DF` su Segnale | **2,59:1** | ✘ | ✘ | ✘ | Vietato |
| 13 | Bianco ottico `#F7F7F5` su Segnale | **3,07:1** | ✘ | ✔ (al limite) | ✔ | Sconsigliato, margine nullo |
| 14 | Grafite `#5E5D59` su Segnale | **2,00:1** | ✘ | ✘ | ✘ | Vietato |
| 15 | Segnale `#FF4F00` su Cemento | **2,59:1** | ✘ | ✘ | ✘ | Conferma la decisione già presa (mai testo arancio su chiaro). **Non va bene nemmeno per indicatori di stato o bordi** (vedi conflitto C1). Versione testo AA più vicina: **`#B93900`** (4,53:1) |
| 16 | Segnale `#FF4F00` su Bianco ottico | **3,07:1** | ✘ | ✔ (al limite) | ✔ (al limite) | Solo testo grande/UI, margine nullo |
| 17 | Segnale `#FF4F00` su `#111111` | **5,73:1** | ✔ | ✔ | ✔ | ok: l'arancio funziona come testo/segno **solo su nero** |
| 18 | Segnale `#FF4F00` su Cassaforma | **1,93:1** | ✘ | ✘ | ✘ | Vietato |

### 1.2 Elementi non testuali (1.4.11)

| # | Elemento | Rapporto | Esito | Note / correzione |
|---|---|---|---|---|
| 19 | Linee di griglia `#111111` al **15%** su Cemento (= `#C6C4C0`) | **1,37:1** | ✔ se decorative, ✘ se informative | Le linee della "planimetria" sono decorazione: ok. **Non possono essere l'unico confine** di campi, caselle taglia, filtri, bottoni secondari |
| 20 | Linee di griglia al **20%** su Cemento (= `#BBBAB6`) | **1,53:1** | come sopra | |
| 21 | Soglia 3:1 per una linea informativa su Cemento | **alpha ≥ 47%** (= `#82817E`, 3,07:1) | — | Su Bianco ottico: alpha ≥ 46% (`#8D8D8C`, 3,10:1). Consiglio comunque `#111111` pieno per i controlli |
| 22 | Cassaforma `#C9C6BF` su Cemento (bordo del placeholder) | **1,34:1** | ✔ (decorativo) | Ok finché il placeholder non è l'unico modo di capire dov'è la card: il nome prodotto e il prezzo bastano |
| 23 | Focus: contorno `#111111` 2 px + offset 2 px su Cemento | **14,86:1** | ✔ | Ok. Sul bottone pieno nero l'offset mostra il cemento tra bottone e contorno: si distingue |
| 24 | Focus `#111111` su elementi arancio (banner, badge) | **5,73:1** | ✔ | ok |
| 25 | Focus nelle sezioni scure | serve contorno Cemento `#E6E4DF` (14,86:1) o arancio `#FF4F00` (5,73:1) | ✔ se si cambia | Un contorno nero su fondo nero è **invisibile**: serve un token di focus per ogni fondo |
| 26 | Focus arancio su Cemento | **2,59:1** | ✘ | Non usare l'arancio come colore di focus sul chiaro |
| 27 | Caselle taglia: selezionata = piena `#111111` con testo Cemento | 14,86:1 | ✔ | Lo stato deve risultare anche dal codice (`aria-checked`/`aria-pressed`), non solo dal colore |
| 28 | Swatch colore (es. toni Skin) su Cemento | da verificare con i colori veri | ⚠ | I toni chiari (Skin 01) saranno quasi uguali al cemento: **bordo 1 px `#111111`** su tutti gli swatch |

---

## 2. Rischi della direzione "grezza" — problemi previsti, in ordine di gravità

### Bloccanti

**B1 — Il contatore `BORSA [0]` e l'annuncio dell'aggiunta** (4.1.3 Messaggi di stato, 4.1.2 Nome, ruolo, valore, 2.5.3 Etichetta nel nome)
Gli screen reader leggono "Borsa parentesi quadra aperta zero parentesi quadra chiusa", oppure niente quando il numero cambia. Chi non vede non sa se l'aggiunta è andata a buon fine.
Correzione:
- Il bottone ha un nome che **comincia con il testo visibile**: `aria-label="Borsa, 0 articoli"` / `"Bag, 0 items"` (gestire il singolare: "1 articolo" / "1 item"). Le parentesi restano a schermo e si nascondono agli screen reader (`aria-hidden="true"` sullo `span` `[0]`).
- Una **sola** regione `role="status"` (`aria-live="polite"`), sempre presente nella pagina, che dopo l'aggiunta dice: "AXIS, taglia 75B, aggiunto alla borsa. Borsa: 1 articolo." Il contatore stesso non deve essere una regione live (si sentirebbe due volte).
- Lo stesso vale per `REGGISENI [04]`: testo visibile nascosto agli screen reader + testo solo per screen reader "Reggiseni, 4 prodotti".

**B2 — Carrello laterale, guida taglie, menu: trappole di tastiera e focus perso** (2.1.1, 2.1.2, 2.4.3, 2.4.11)
I pannelli laterali della direzione (borsa a destra, `GUIDA TAGLIE →` in pannello) sono il punto in cui di solito si rompe la tastiera.
Correzione: `dialog` modale (elemento `<dialog>` o `role="dialog"` + `aria-modal="true"` + titolo collegato con `aria-labelledby`); il focus entra nel pannello all'apertura, resta dentro finché è aperto, `Esc` chiude, il bottone di chiusura è testuale (`CHIUDI` / `CLOSE`), alla chiusura il focus torna al bottone che l'ha aperto. Il resto della pagina diventa `inert`.

**B3 — Titoli enormi tagliati dal bordo** (1.3.1, 1.4.4, 1.4.10, 2.4.6)
Un titolo a 20 vw tagliato con `overflow: hidden` può: (a) arrivare agli screen reader spezzato o duplicato; (b) diventare illeggibile su mobile e con lo zoom; (c) non ingrandirsi con lo zoom del testo, perché `vw` non segue le preferenze dell'utente.
Correzione:
- Il **vero titolo** (`h1`/`h2`) deve contenere il testo completo e leggibile. Se il "muro" di testo tagliato è un elemento grafico, lo si nasconde (`aria-hidden="true"`) e il titolo completo si mette accanto, visibile in piccolo (consigliato, aiuta anche chi vede male) o solo per screen reader.
- Il titolo tagliato non deve mai essere l'unico posto in cui compaiono nome del drop o del prodotto (già detto nella direzione: confermato).
- Dimensioni con `clamp(rem, vw, rem)`: la parte in `rem` fa funzionare lo zoom (1.4.4).
- A 320 px di larghezza (= 1280 px con zoom 400%) niente scroll orizzontale della pagina: il taglio si fa dentro un contenitore con `overflow: clip`, non allargando la pagina (1.4.10).
- Vedi conflitto **C2** per il mobile.

**B4 — Form del checkout** (1.3.1, 1.3.5, 3.3.1, 3.3.2, 3.3.3, 3.3.7)
Lo stile minimal spinge verso campi con solo il placeholder e la sola linea sotto. Rischi: label che spariscono, errori segnalati solo con il colore.
Correzione: label visibile sempre sopra il campo (in mono maiuscolo via CSS va benissimo); obbligatori indicati a parole ("obbligatorio" / "required"), non solo con `*`; `autocomplete` corretto (`given-name`, `postal-code`, `email`…); errori come testo vicino al campo, collegati con `aria-describedby`, `aria-invalid="true"`, riepilogo errori in cima con link ai campi e focus spostato lì all'invio; casella "indirizzo di fatturazione uguale alla spedizione" (3.3.7 Inserimento ridondante, nuovo in 2.2). Il bordo/la linea del campo ≥3:1 (`#111111` pieno: ok).

### Importanti

**I1 — Banner demo** (1.3.1, 1.4.10, 2.4.11, 4.1.3)
- Deve essere testo vero (non immagine), nel DOM **prima** del form e collegato al form con `aria-describedby` o come paragrafo introduttivo.
- **Non** `role="alert"` su ogni pagina (lo si sentirebbe di continuo): testo statico, al massimo una regione con etichetta ("Avviso demo").
- Se il banner è fisso in alto o in basso: con lo zoom al 400% una fascia fissa può coprire metà dello schermo e nascondere il campo che ha il focus (2.4.11 Focus non oscurato, nuovo in 2.2). Regola: in alto, **non fisso** sotto i 600 px di altezza della finestra, oppure `scroll-padding` uguale alla sua altezza.
- Colori: fascia piena `#111111` con testo Cemento (14,86:1) oppure fascia arancio con testo `#111111` (5,73:1). **Mai testo bianco piccolo su arancio** (3,30:1).
- Testo: maiuscolo via CSS, sorgente "Demo — Nessun pagamento verrà effettuato. Non inserire dati reali." Il trattino lungo va bene; "DEMO" non deve essere scritto maiuscolo nel sorgente (alcuni screen reader lo compitano).

**I2 — Header e pannello prodotto sticky che coprono il focus** (2.4.11)
Header fisso, pannello destro sticky della scheda prodotto e banner demo possono coprire l'elemento con il focus mentre si va avanti con Tab. Correzione: `scroll-padding-top` = altezza dell'header; il pannello sticky diventa statico quando la finestra è bassa o con lo zoom.

**I3 — Dimensione dei bersagli** (2.5.8 Dimensione minima del bersaglio, nuovo in 2.2)
- Gli swatch da **16 px** non passano (minimo 24×24 px, oppure spazio libero equivalente). Correzione senza cambiare l'aspetto: il quadrato visibile resta di 16 px, ma l'area cliccabile è di 24–44 px (padding trasparente).
- Utility testuali `CERCA`, `IT / EN`, `BORSA [0]`, `MENU` in mono 12 px: altezza dell'area cliccabile ≥24 px (consiglio 44 px su mobile) con il padding.
- Caselle taglia ≥44×44 px su mobile.

**I4 — Taglie esaurite barrate** (1.4.1 Uso del colore, 1.3.1, 4.1.2)
La barra da sola non arriva agli screen reader. Correzione: testo per screen reader "75C, esaurita"; casella `aria-disabled="true"` (deve restare raggiungibile per sapere che esiste) oppure saltata con la spiegazione nel gruppo. Il testo barrato resta ≥4,5:1 (`#5E5D59` va bene; non schiarire "perché è disabilitato").

**I5 — Selettore lingua `IT / EN`** (3.1.1, 3.1.2, 2.4.4)
- `<html lang="it">` sulle pagine italiane e `lang="en-GB"` su quelle inglesi (inglese britannico deciso).
- I link del selettore: testo visibile `IT` / `EN`, nome accessibile "Italiano" / "English" (il nome deve contenere il testo visibile: es. `aria-label="IT — Italiano"`), `lang="en"` sul link EN quando si è nella pagina italiana e viceversa, `hreflang`, `aria-current="true"` sulla lingua attiva. Lo slash va nascosto agli screen reader (`aria-hidden`).
- Nomi propri (LINGERAI, AXIS, PLANE, GRID / 01): non serve `lang` diverso; ma frasi intere in inglese dentro pagine italiane (claim, citazioni) sì.

**I6 — Maiuscolo e pronuncia** (1.3.1; buona pratica per 3.1)
- Confermo la regola del tono di voce: maiuscolo **solo via CSS**, sorgente in minuscolo. Nel sorgente restano maiuscoli solo i nomi propri.
- Rischio: alcuni screen reader compitano le parole brevi tutte maiuscole lette come sigle (`AXIS` → "A-X-I-S", `GRID`). Da testare in fase 7 con NVDA e VoiceOver; se succede, sorgente "Axis" + `text-transform` (stesso aspetto).
- "LINGERAI" nel logotipo: è un link alla home con nome "LINGERAI, home" o semplicemente testo nel `header`; non immagine senza testo.
- Lettura: il maiuscolo è più lento da leggere nei testi lunghi. **Paragrafi mai in maiuscolo** (descrizioni, guida taglie, legale).

**I7 — Font condensati e monospace a corpo piccolo** (1.4.4, 1.4.8 solo come buona pratica, 1.4.12)
- Archivo Extra Condensed solo **≥32 px** e pesi **≥500**: sotto, le lettere strette si confondono (n/u, 0/O, 1/l). Mai per prezzi, taglie, errori, banner demo (già previsto nella direzione: confermato).
- JetBrains Mono 12 px va bene per etichette brevi in `#111111`; per il **grigio secondario** consiglio **≥14 px** (un grigio a 5,19:1 in mono sottile a 12 px è al limite della leggibilità reale, anche se passa sulla carta).
- Unità in `rem`, mai `px` fissi per il testo.
- 1.4.12 Spaziatura del testo: titoli condensati con altezze fisse e `overflow: hidden` si tagliano se l'utente aumenta l'interlinea. Niente `height` fisse sui contenitori di testo.
- Pesi sottili (100–300) vietati sotto i 48 px.

**I8 — Disegni tecnici come placeholder** (1.1.1, 1.4.11)
- Nelle **card prodotto** il disegno sta dentro un link che contiene già nome e prezzo: `alt=""` (decorativo) per non far ripetere tutto; oppure alt breve se il link non ha altro testo.
- Nella **scheda prodotto** il disegno con quote e misure dà informazioni: SVG con `role="img"` + `<title>`/`aria-label` breve ("Disegno tecnico di AXIS, vista frontale") e le misure scritte anche come testo (tabella o elenco) accanto o sotto.
- Le linee del disegno che portano informazioni (contorni, frecce di quota) ≥3:1: `#111111` pieno su Cemento va bene; **non** in grigio chiaro o al 20%.
- L'etichetta `AXIS — 01/13 — 4:5` è decorativa: `aria-hidden="true"` (altrimenti si sente "AXIS trattino zero uno slash tredici…").
- Quando arriveranno le foto: alt che descrive il capo (modello, colore, vista), mai il corpo della modella.

**I9 — Hover fronte/retro e informazioni solo al passaggio del mouse** (1.4.13, 2.1.1)
Lo scambio d'immagine a 0 ms è ok (nessun movimento). Ma nessuna informazione deve comparire solo con l'hover (es. quote "che compaiono"): stessa cosa anche con il focus da tastiera e sul touch.

### Miglioramenti

**M1 — Movimento** (2.3.3 come buona pratica, 2.2.2)
- La direzione è già secca (0–200 ms, niente parallax): ottimo. Regola: `@media (prefers-reduced-motion: reduce)` porta tutte le transizioni a 0 ms (sottolineatura dei link compresa).
- L'inversione di `BORSA` per 600 ms è un cambio di colore, non un movimento: accettabile; lampeggia **una sola volta** (2.3.1 vieta più di 3 lampi al secondo). Con reduced-motion si può togliere.
- Se in futuro arrivano scritte che scorrono (ticker/marquee, molto "edgy"), testi in movimento o video: serve un bottone **Pausa** visibile (2.2.2) e il blocco di tutto con reduced-motion.
- La texture di cemento generata in CSS deve essere **statica** e non abbassare il contrasto del testo sopra: rifare il calcolo sul pixel più scuro della texture.

**M2 — Simboli tipografici letti ad alta voce**
"→" viene letto "freccia destra", "/" "barra", "—" a volte "trattino lungo". Nei link `GUIDA TAGLIE →` e simili: freccia in `span aria-hidden="true"`. In `GRID / 01` è accettabile (si sente "grid barra zero uno"); facoltativo `aria-label="Grid 01"` dove compare come titolo.

**M3 — Struttura e landmark** (1.3.1, 2.4.1, 2.4.2)
Un solo `h1` per pagina; `header`, `nav` (con nome, es. "Principale"), `main`, `footer`; link "Vai al contenuto" come primo elemento tabulabile (può essere grezzo: fascia nera che compare al focus); `title` della pagina diverso per ogni pagina e lingua. La griglia a vista non deve cambiare l'ordine di lettura: l'ordine nel codice = ordine visivo (la "griglia rotta" con immagini sfalsate si fa con CSS Grid senza `order` che rimescola).

**M4 — Prezzi in mono**
Formato con valuta sempre esplicita (`135,00 €` / `€135.00`). Sui prezzi barrati (saldi, se arriveranno): testo per screen reader "prezzo originale" / "prezzo attuale".

---

## 3. Conflitti da decidere con l'utente

Non cambio la direzione visiva: segnalo e propongo.

**C1 — Arancio usato come indicatore di stato su fondo chiaro** (1.4.11)
Decisione attuale: arancio "solo per dettagli, mai come testo su fondo chiaro". Ma molti "dettagli" (pallino del filtro attivo, sottolineatura della pagina corrente, bordo della taglia selezionata, contatore) sono **indicatori di stato**, che sul Cemento devono arrivare a 3:1. `#FF4F00` su Cemento = **2,59:1**.
Opzioni:
- **a) (consigliata)** L'arancio resta `#FF4F00`, ma sul fondo chiaro si usa **solo come fondo pieno con testo `#111111`** (5,73:1) o come decorazione accanto a un indicatore nero (lo stato è dato dal nero, l'arancio è un di più). Nessun cambio di colore.
- **b)** Aggiungere una variante per gli indicatori sottili su Cemento: **`#EB4900`** (3,01:1, quasi identica all'occhio). Margine minimo: valida solo su Cemento e Bianco ottico, non su Cassaforma.
- **c)** Variante scura per testo/link su chiaro: **`#B93900`** (4,53:1). Ma diventa un arancio bruciato, lontano dal "segnale": la sconsiglio per l'identità.

**C2 — Titoli tagliati dal bordo anche su mobile** (1.4.10, 1.4.4)
Su uno schermo da 320–390 px un titolo a 20 vw tagliato può mostrare solo 2–3 lettere: per chi vede è un segno grafico, non più un titolo.
Opzioni:
- **a) (consigliata)** Taglio solo da tablet in su (≥768 px); su mobile il titolo va a capo intero, sempre enorme e condensato.
- **b)** Taglio anche su mobile, ma come elemento decorativo `aria-hidden` + titolo completo visibile in piccolo subito sotto (mono maiuscolo). Mantiene l'effetto, aggiunge una riga.
- **c)** Taglio ovunque senza alternativa visibile (solo per screen reader): **sconsigliata**, chi ha poca vista o difficoltà cognitive perde il titolo.

**C3 — Linee di griglia al 15–20% vicino ai controlli**
Come decorazione vanno benissimo (1,37–1,53:1). Diventano un problema solo se il design system le usa come **unico bordo** di caselle taglia, campi, filtri o bottoni secondari.
Opzioni:
- **a) (consigliata)** Due livelli: "linea planimetria" al 15–20% solo decorativa + "linea controllo" `#111111` pieno 1 px per tutto ciò che si clicca o si compila.
- **b)** Un solo livello di linea al **≥47%** (`#82817E`, 3,07:1) ovunque: più uniforme, ma la planimetria diventa più pesante e meno "eterea".

**C4 — Etichette 12 px in grigio** (non obbligatorio per AA: miglioramento)
La direzione ammette etichette mono 12 px; passano anche in Grafite (5,19:1). Consiglio però che a 12 px si usi solo `#111111` e il grigio da 14 px in su.
Opzioni: **a) (consigliata)** regola "grigio ≥14 px"; **b)** grigio anche a 12 px (conforme, ma meno leggibile).

---

## 4. Regole minime per l'art-director (design system, fase 4)

1. **Token colore con uso consentito**, non solo HEX: ogni colore dichiara su quali fondi e per cosa si può usare (tabella §1 come fonte).
   - Testo: `#111111` su Cemento/Bianco ottico/Cassaforma; Cemento su `#111111`.
   - Testo secondario: Grafite `#5E5D59` solo su Cemento e Bianco ottico (mai più chiaro di `#676662`); su Cassaforma `#545350` o `#111111`; su nero `#7D7C78` o più chiaro.
   - Arancio `#FF4F00`: fondo pieno con testo `#111111`/`#000000`; segno/testo solo su `#111111`; vietato come testo o unico indicatore su chiaro (vedi C1).
   - Mai testo bianco piccolo su arancio.
2. **Due livelli di linea**: decorativa (libera) e di controllo (≥3:1, consiglio `#111111` 1 px) — vedi C3.
3. **Focus**: `outline` 2 px + offset 2 px, `#111111` sui fondi chiari, Cemento o arancio sui fondi scuri; mai rimosso; solo `:focus-visible` per non disturbare il mouse. Lo stesso stile su link, bottoni, caselle taglia, swatch, campi.
4. **Tipografia**: corpo ≥16 px (in `rem`); etichette ≥12 px mono in `#111111`; grigio ≥14 px; display condensato solo ≥32 px e peso ≥500; prezzi, taglie, errori, banner demo sempre nel font di testo; niente paragrafi in maiuscolo; niente altezze fisse sui contenitori di testo; maiuscolo solo via CSS.
5. **Titoli display**: `clamp()` con minimo e massimo in `rem`; il titolo tagliato non è mai l'unica fonte del testo; niente scroll orizzontale a 320 px (vedi C2).
6. **Bersagli**: area cliccabile ≥24×24 px ovunque, ≥44×44 px per caselle taglia, swatch e utility su mobile (il segno visibile può restare più piccolo).
7. **Stati mai solo col colore**: selezionato, esaurito, errore, filtro attivo hanno anche forma (pieno/barrato/sottolineato) e testo per gli screen reader.
8. **Contatori**: `[n]` visivo nascosto agli screen reader + nome accessibile a parole ("Borsa, 2 articoli"); una regione `role="status"` per gli annunci di aggiunta/rimozione.
9. **Pannelli laterali e menu** = dialog modale: focus dentro, `Esc`, ritorno del focus, resto della pagina `inert`.
10. **Movimento**: durate 0–200 ms, nessun lampo ripetuto, `prefers-reduced-motion` → 0 ms; qualunque cosa si muova da sola per più di 5 s ha un bottone Pausa.
11. **Placeholder/disegni**: decorativi (`alt=""`) nelle card; con nome e misure in testo nella scheda prodotto; linee informative ≥3:1; etichette di cantiere `aria-hidden`.
12. **Banner demo**: testo reale, alto contrasto (vedi §1), primo nel checkout, non fisso a finestra bassa, mai `role="alert"` su ogni pagina.
13. **Elementi sticky** (header, pannello prodotto, banner): non devono coprire il focus → `scroll-padding` e disattivazione con finestra bassa/zoom.
14. **Lingua**: `lang="it"` / `lang="en-GB"` sull'`html`, `lang` sui link del selettore, `hreflang`.

Verifiche da rifare in fase 7 (sul codice vero): contrasti sui colori finali e sui toni Skin degli swatch, contrasto sopra la texture di cemento, test con NVDA + Firefox, VoiceOver + Safari (macOS e iOS), sola tastiera, zoom 200% e 400%, reduced-motion attivo.

---

## Appendice — script di calcolo (Node)

```js
const h=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16));
const lin=c=>{c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)};
const L=x=>{const[r,g,b]=h(x).map(lin);return 0.2126*r+0.7152*g+0.0722*b};
const cr=(a,b)=>{const[l1,l2]=[L(a),L(b)].sort((p,q)=>q-p);return (l1+0.05)/(l2+0.05)};
// linee semitrasparenti: colore = fg*alpha + bg*(1-alpha), poi cr(colore, bg)
// correzioni: si scurisce/schiarisce il colore originale mantenendo la tinta
// fino al primo valore che raggiunge la soglia (4,5 o 3).
```
