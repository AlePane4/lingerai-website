# LINGERAI — Flusso d'acquisto (Fase 3, Struttura e UX)

> Autore: `ux-reviewer` · Data: 2026-11-05 · Stato: **proposta, da approvare**
> Collegati: `docs/ux/sitemap.md`, `docs/ux/page-blueprints.md`. Etichette **provvisorie** (testi finali: `copywriter`).

---

## 1. Compiti di riferimento (scenari reali)

Tutta la struttura è verificata su questi 4 compiti, da telefono:

| # | Cliente e compito | Passi target |
|---|---|---|
| T1 | "Porto 75C. Trovo un reggiseno con ferretto nero e arrivo al checkout." | Menu → Reggiseni → PLANE → Nero · 75C → Aggiungi → Checkout = **6 tap** |
| T2 | "Voglio il set AXIS completo in Skin 02, taglia M." | Scheda AXIS → Skin 02 · M → Aggiungi → *Completa il set* → AXIS slip (Skin 02 già scelto) → M → Aggiungi = **7 tap** |
| T3 | "Non so la mia taglia di fascia." | Scheda → Guida taglie (pannello, scheda reggiseni già aperta) → tabella → chiudi → taglia = senza uscire dalla scheda |
| T4 | "Sono inglese, il link era in italiano." | `IT / EN` in header → stessa pagina in EN, borsa intatta |

---

## 2. Il flusso

```
 HOME ──────────────┐
 MENU / HEADER ─────┼──► CATEGORIA  ─────┐
 DROP GRID / 01 ────┘    (o DROP + filtri)│
                                          ▼
                                  SCHEDA PRODOTTO
                            colore ─► taglia ─► [AGGIUNGI]
                               │        │           │
                               │   GUIDA TAGLIE     │ taglia mancante → errore in linea,
                               │   (pannello)       │ focus sulle taglie, niente perdita
                               │                    ▼
                               │            PANNELLO BORSA (si apre da solo)
                               │            riga nuova evidenziata
                               │            "Completa il set" (facoltativo)
                               │              │                    │
                               └── CONTINUA ◄─┘                    ▼
                                                        CHECKOUT DEMO (1 pagina)
                                                        banner demo · dati di esempio
                                                        errori in linea
                                                                   ▼
                                                        CONFERMA DEMO
                                                        borsa svuotata
```

Principi:
- **Mai più di un passo "nascosto"**: guida taglie e borsa sono pannelli, non cambi di pagina; la cliente non perde la scheda.
- **Il bottone principale è uno per schermata** (Aggiungi / Vai al checkout / Conferma ordine demo), pieno nero, nel font di testo.
- **Ogni messaggio di stato è testo** (mai solo colore, mai solo animazione).

---

## 3. Categoria: filtri e ordinamento

**Numeri reali del catalogo**: Reggiseni 4 · Slip 4 · Body 2 · Sottovesti 1 · Accessori 2 · Drop 13.
Con 1–4 prodotti un filtro **fa più danni che utilità** (si arriva subito a zero risultati, e la barra filtri pesa più della griglia).

**Proposta**

| Pagina | Filtri | Ordinamento |
|---|---|---|
| Categoria (1–4 pezzi) | **Nessuno** | Nessuno (ordine editoriale) |
| Drop GRID / 01 (13 pezzi) | `CATEGORIA` · `TAGLIA` · `COLORE` | `IN EVIDENZA` (default) · `PREZZO ↑` · `PREZZO ↓` |

Dettagli:
- **Taglia è il filtro più utile** (la lingerie si compra per taglia). Il pannello taglie ha **due gruppi** perché i sistemi sono due: `FASCIA + COPPA` (griglia 65–95 × A–G) e `LETTERE` (XS–3XL). Mostra solo combinazioni esistenti nel catalogo; ogni opzione con conteggio `75C [2]`.
- Filtro taglia = "**disponibile** in quella taglia" (esclude le varianti esaurite).
- **Colore**: elenco testuale con swatch (Nero, Grafite, Skin 01/02/03, Optic White) e conteggi.
- Filtri **multipli** dentro lo stesso gruppo (OR), tra gruppi in AND. Risultato aggiornato subito su desktop; su mobile nel pannello con bottone `MOSTRA 9 PEZZI` (il numero aggiorna in tempo reale).
- Stato nei parametri URL (`?category=bras&size=75C&color=black&sort=price-asc`): condivisibile, sopravvive al "indietro" e al cambio lingua.
- **Filtro "Set"**: non serve come filtro; i set si raccontano in scheda e in fondo al drop (blocco "Set", facoltativo).
- **POI**: "ricorda la mia taglia" (salvata nel browser) per pre-applicare il filtro taglia. Utile ma non indispensabile.

---

## 4. Scelta di colore e taglia

**Ordine**: colore prima, taglia dopo (la disponibilità di taglia dipende dal colore).

- **Colore preselezionato**: il primo disponibile, oppure quello nell'URL (`?color=skin-02`) o quello arrivato dal set. Cambiare colore aggiorna l'URL senza nuova voce di cronologia.
- **Taglia mai preselezionata** (tranne taglia unica): una taglia preselezionata a caso genera resi.
- **Reggiseni fascia + coppa**: griglia testuale ordinata per fascia, con le coppe in riga:
  ```
  65  [A][B][C][D]
  70  [A][B][C][D][E]
  75  [A][B][C̶][D][E][F]      ← C esaurita: barrata + "75C esaurita"
  …
  ```
  Su mobile: righe per fascia, 6–7 caselle per riga a 44 px; se non entrano, prima si sceglie la **fascia** (riga di caselle) e poi la **coppa** (seconda riga). Raccomandazione: griglia unica se a 360 px ci sta (A–G = 7 caselle × 44 px = 308 px: **ci sta**).
- **Lettere**: una riga `XS S M L XL XXL 3XL`.
- **Comportamento se manca la taglia** (bloccante se sbagliato):
  1. Il bottone `AGGIUNGI` resta attivo (un bottone disabilitato non spiega perché, ed è poco accessibile).
  2. Al tocco: messaggio sotto le taglie, annunciato agli screen reader, focus sul gruppo taglie, scroll fino a lì su mobile.
  3. L'errore sparisce appena si sceglie una taglia.
  4. In alternativa al punto 2 (variante più "fluida", da valutare in test): il tocco su `AGGIUNGI` senza taglia apre direttamente il selettore taglie a pannello dal basso, con `AGGIUNGI` dentro. Più comodo su mobile, più codice. Lo tengo come **POI**.
- **Taglia esaurita**: visibile, barrata, con testo; non aggiungibile; se esiste in un altro colore lo si dice. Niente "avvisami" (raccoglierebbe email).
- **Etichetta del bottone**: include il prezzo; dopo la scelta può includere la taglia (`AGGIUNGI — 75C — 135 €`) come conferma visiva (esempio già nel tone of voice).

---

## 5. Set coordinati

Set previsti: AXIS reggiseno + slip · PLANE + perizoma · GRID bralette + culotte · LINE + FRAME.

| Opzione | Come funziona | Pro | Contro |
|---|---|---|---|
| **A. Link "Completa il set"** ★ | In scheda, blocco con la card del pezzo coordinato; il link porta il colore scelto (`?color=black`). Nella borsa, 1 suggerimento se manca il coordinato. | Semplice, chiaro, ogni pezzo ha la sua taglia | Due schede da visitare |
| B. Aggiunta doppia in scheda | Nella scheda del reggiseno, un secondo selettore taglie per lo slip, e "Aggiungi entrambi" | Meno passi | Scheda più densa, due errori possibili, taglie di sistemi diversi (75C + M) nello stesso blocco |
| C. Prodotto "set" a prezzo unico | Una scheda per il set | Vetrina forte | Raddoppia il catalogo, prezzo/sconto da inventare, contro il minimal |

**Raccomandazione: A** nel MVP; B come miglioramento se i test lo chiedono. Nelle righe della borsa i due pezzi restano separati (taglie diverse, resi diversi).

---

## 6. Borsa: pannello laterale o pagina?

| Opzione | Pro | Contro |
|---|---|---|
| **A. Pannello laterale + pagina di riserva** ★ | Si resta nel contesto; feedback immediato dopo "Aggiungi"; la pagina `/borsa` serve per link diretti, ricarica, senza JavaScript, e come pagina "intera" su mobile | Due viste da tenere allineate (stesso componente, costo basso) |
| B. Solo pagina `/borsa` | Più semplice; URL sempre chiaro | Dopo "Aggiungi" si esce dalla scheda o si mostra solo un toast: feedback più debole, più passi per continuare |
| C. Solo toast "Aggiunto" + pagina | Interruzione minima | Il toast è facile da perdere (e da rendere inaccessibile); niente controllo della riga aggiunta |

**Raccomandazione: A.** Il pannello si apre **automaticamente dopo ogni aggiunta** (feedback che non si può perdere), con la riga nuova evidenziata. `BORSA [n]` nell'header è un link alla pagina, intercettato per aprire il pannello. Su mobile il pannello è a tutto schermo (in pratica una pagina).

Comportamento:
- Contenuto salvato nel browser (`localStorage`) come **ID prodotto + colore + taglia + quantità**, **senza testi né prezzi**: nomi e prezzi si leggono dal catalogo nella lingua corrente. Così il cambio lingua traduce la borsa e un prezzo cambiato nel catalogo non resta "vecchio".
- Sincronizzazione tra schede aperte (evento `storage`): `BORSA [n]` aggiornato ovunque.
- Modifica taglia/colore dalla borsa: **no** nel MVP (si rimuove e si riaggiunge); POI.
- Il pannello: focus intrappolato, `Esc` chiude, focus restituito all'elemento che l'ha aperto, sfondo non scorrevole.

---

## 7. Selettore lingua

**Dove**: header desktop (`IT / EN`), prima riga del menu mobile, footer, header ridotto del checkout.

**Cosa succede al tocco**

| Elemento | Comportamento |
|---|---|
| Pagina | Si va alla **pagina equivalente** nell'altra lingua (stesso prodotto, stessa categoria), mai alla home. |
| Parametri | Filtri, colore, ordinamento (`?size=…&color=…`) restano identici. |
| Posizione | Si torna in cima alla pagina (più prevedibile); eccezione: pannelli aperti (guida taglie) si chiudono. |
| Borsa | **Intatta** (stessa memoria per entrambe le lingue); i nomi si aggiornano nella nuova lingua. |
| Checkout | I dati già scritti **restano** (salvati nella sessione della scheda), gli errori si ritraducono. |
| Prezzi | Stessa valuta (EUR), formato locale: `95,00 €` (IT) / `€95.00` (EN). |
| Preferenza | Ricordata nel browser: la prossima visita a `/` va alla lingua scelta. |
| Accessibilità | `lang` corretto su `<html>`; il link ha `hreflang` e testo leggibile (`English` / `Italiano` per screen reader, visivamente `EN` / `IT`). |

Regola: **nessun testo misto**. Se un contenuto non è tradotto, il build deve fallire (controllo per `frontend-developer` / `qa-tester`), non mostrare l'italiano nella pagina inglese.

---

## 8. Checkout demo in una pagina

Ordine: **Contatto → Spedizione → Metodo di spedizione → Pagamento simulato → Termini → Conferma**, con riepilogo sempre visibile (desktop) o richiudibile in cima (mobile). Dettaglio dei blocchi e stati in `page-blueprints.md` §7.

Regole chiave:
- Il banner demo è il **primo elemento** del contenuto ed è letto per primo dagli screen reader.
- **Nessun campo carta di credito** (raccomandazione forte, vedi D4): evita che qualcuno digiti il numero vero.
- `COMPILA CON DATI DI ESEMPIO` permette di finire la demo in 2 tap.
- Header ridotto (niente menu categorie), ma con `← BORSA` e `IT / EN`.
- Nessun dato lascia il browser; alla conferma i dati del form si cancellano.

---

## 9. Navigazione mobile, header e footer

Struttura completa con wireframe in `page-blueprints.md` §0. In sintesi:
- **Header mobile a 3 elementi**: `LINGERAI` · `MENU` · `BORSA [n]`, sticky, 48 px. `IT / EN` nel menu (prima riga) e nel footer, per non affollare l'header a 320–360 px (D-alternativa: metterlo anche in header, ci sta tecnicamente ma con poco respiro).
- **Menu a tutto schermo**: drop in cima, 5 categorie grandi con conteggio, servizio in piccolo.
- **Nessuna tab bar in basso** (non serve con 5 categorie; disturba la barra "Aggiungi" sticky in scheda).
- **Indietro del browser** deve funzionare sempre: i pannelli (menu, borsa, guida) si chiudono con "indietro" su mobile senza uscire dalla pagina (da valutare in fase 6; minimo indispensabile: non rompere la cronologia).
- **Footer**: Servizio · Brand · Legale · Lingua + riga demo.

---

## 10. Dove l'estetica grezza rischia di danneggiare l'usabilità

| # | Rischio | Gravità | Soluzione che salva lo stile |
|---|---|---|---|
| R1 | **Titoli enormi su mobile** spingono prodotto e bottone `AGGIUNGI` sotto più schermate | **Bloccante** | Tetto con `clamp()`; regola "primo prodotto visibile nel primo schermo" in home/drop/categoria; in scheda nome ≤ 56 px su mobile + barra `AGGIUNGI` sticky. Il titolo resta enorme su desktop. |
| R2 | **Titolo tagliato dal bordo** come unica fonte dell'informazione (es. nome categoria o prodotto illeggibile) | **Bloccante** | Si tagliano solo titoli decorativi (drop, About, 404), sempre con H1 intero accessibile. Nomi prodotto, prezzi e categorie in menu mai tagliati. |
| R3 | Testo fuori bordo che crea **scroll orizzontale** su mobile | **Bloccante** | `overflow-x: clip` sul contenitore del titolo, test a 320 px. |
| R4 | **Disegni tecnici al posto delle foto**: non si capiscono trasparenza, colore reale e vestibilità | **Importante** | Etichetta `DISEGNO TECNICO — FOTO IN ARRIVO`; trasparenza / ferretto / imbottitura scritti sempre in chiaro in scheda; swatch colore con nome. |
| R5 | **Griglia rotta e immagini sfalsate** nelle griglie prodotto: si perde l'ordine e il confronto dei prezzi | **Importante** | Sfalsamenti solo in home (blocco apertura) ed editoriale; griglie di catalogo regolari. La griglia "a vista" resta come linee. |
| R6 | **Linee di griglia visibili** scambiate per bordi di controlli (o viceversa) | **Importante** | Linee di griglia al 15–20%, controlli con bordo pieno e area cliccabile chiara; card = un unico link. |
| R7 | **Hover fronte/retro a 0 ms** come unico modo di vedere il retro | **Importante** | Su mobile non c'è hover: il retro è nella scheda (carosello). Nessuna informazione solo in hover. |
| R8 | Feedback "aggiunto" affidato solo all'**inversione di `BORSA` per 600 ms** | **Importante** | Apertura automatica del pannello borsa + annuncio `aria-live`. L'inversione resta come dettaglio di stile. |
| R9 | **Utility come parole** piccole (`MENU`, `IT / EN`, `BORSA [0]`) con area di tocco ridotta | **Importante** | Area 44×44 px anche se il testo è 12–13 px. |
| R10 | **Maiuscolo e monospace** estesi a descrizioni, testi legali, errori | **Importante** | Maiuscolo solo per etichette/titoli (via CSS); paragrafi in sentence case, font di testo non mono, 16–17 px. |
| R11 | **Accento arancio** usato per errori o esauriti come testo (non passa il contrasto) | **Importante** | Errori ed esauriti in nero con prefisso testuale e bordo; arancio solo come fondo con testo nero o dettaglio. |
| R12 | **Contatori nudi** (`[04]`, `[0]`) senza contesto per screen reader | **Miglioramento** | Testo accessibile: "Borsa, 0 articoli", "Reggiseni, 4 prodotti". |
| R13 | **Nomi doppi** (AXIS/PLANE/GRID sia reggiseno sia slip) confusi in card e borsa, con il nome display enorme che "mangia" il tipo | **Importante** | Tipo sempre sotto il nome (`AXIS — reggiseno a triangolo`), anche in borsa e conferma. |
| R14 | **Movimento secco** (tagli a 0 ms) che fa "sparire" pannelli senza percepire da dove arrivano | **Miglioramento** | Va bene: 0–200 ms lineare; basta che il pannello abbia un bordo netto e l'overlay. Reduced-motion: istantaneo. |

Le voci R1–R3 vanno fissate nel design system (fase 4) come **regole**, non lasciate al singolo layout.

---

## 11. Decisioni per l'utente

**D1 — Borsa: pannello laterale o pagina?**
- A. Pannello laterale che si apre dopo ogni aggiunta + pagina `/borsa` di riserva ★
- B. Solo pagina `/borsa`
- C. Solo avviso "Aggiunto" + pagina
- *Raccomandazione: A* — feedback immediato, si resta sul prodotto; la pagina costa poco ed evita vicoli ciechi.

**D2 — Come entra il drop GRID / 01 nel menu?**
- A. 5 categorie + `GRID / 01` come voce distinta nell'header (e in cima al menu mobile) ★
- B. Solo 5 categorie; il drop si raggiunge dalla home
- C. Drop come voce principale e categorie dentro il drop (più editoriale, meno usabile)
- *Raccomandazione: A* — con 13 pezzi la pagina del drop è anche "tutti i prodotti" e l'unico posto con i filtri: deve essere a un tap.

**D3 — Ricerca (`CERCA`) nel primo rilascio?**
- A. No: menu + filtri bastano per 13 prodotti ★
- B. Sì, ricerca semplice per nome nel pannello menu
- C. Solo dal Drop 02 in poi, quando il catalogo cresce
- *Raccomandazione: A (con C come piano)* — una ricerca su 13 pezzi dà spesso "zero risultati" e aggiunge un'utility all'header mobile già pieno.

**D4 — Pagamento nel checkout demo**
- A. Nessun campo carta: solo `PAGAMENTO SIMULATO` già selezionato ★
- B. Campi carta finti precompilati con un numero di prova, non modificabili
- C. Campi carta liberi (più realistico)
- *Raccomandazione: A* — coerente con "nessun dato reale raccolto": nessuno può digitare per errore la carta vera. B è un compromesso se vuoi più realismo; C lo sconsiglio (da far valutare anche a `legal-compliance`).

**D5 — URL in italiano**
- A. Slug tradotti: `/it/reggiseni/axis-reggiseno` · `/en/bras/axis-bra` ★
- B. Slug inglesi in entrambe le lingue: `/it/bras/axis-bra`
- C. Categorie tradotte, prodotti con codice neutro: `/it/reggiseni/axis-01`
- *Raccomandazione: A* — URL leggibili nella lingua della pagina (meglio per fiducia e SEO); il costo è una tabella di corrispondenza nel catalogo, già necessaria per il selettore lingua.

**D6 — Avviso "demo" fuori dal checkout**
- A. Striscia sottile in cima a tutte le pagine + banner grande nel checkout ★
- B. Solo nel footer + banner grande nel checkout
- C. Solo nel checkout (come da minimo in CLAUDE.md)
- *Raccomandazione: A* — un sito così curato può sembrare un negozio vero già dalla home: la striscia, trattata come elemento tipografico mono, è onesta e coerente con l'estetica "cartellino di cantiere".
