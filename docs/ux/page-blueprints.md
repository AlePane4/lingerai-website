# LINGERAI — Blueprint delle pagine (Fase 3, Struttura e UX)

> Autore: `ux-reviewer` · Data: 2026-11-05 · Stato: **proposta, da approvare**
> Wireframe di **struttura**, non di design: proporzioni, font e spaziature definitive arrivano in fase 4 (`art-director`). Tutte le etichette sono **provvisorie** (in `MAIUSCOLO` = etichetta d'interfaccia; testi finali dal `copywriter`).
> Riferimento visivo: A MONOLITE (cemento, titoli condensati enormi, griglia a vista) + disegni tecnici come placeholder. Mobile di riferimento: **360 px**; desktop: **1440 px**.

---

## 0. Regole comuni a tutte le pagine

**Due zone, due regole** (traduce in UX il principio "l'edgy sta nella cornice, non nell'acquisto"):

| Zona "cornice" (può essere grezza) | Zona "acquisto" (sempre dritta e leggibile) |
|---|---|
| Titoli di home, drop, categoria, About, 404 | Nome prodotto in card e scheda, prezzo, colore, taglie |
| Tagli dal bordo, griglia rotta, sfalsamenti | Bottoni, `BORSA [n]`, righe della borsa, totale |
| Linee di griglia visibili | Form di checkout, errori, banner demo |

Regole fisse:
- **Titolo tagliato = decorativo.** Se un titolo esce dal bordo, la stessa informazione esiste leggibile (H1 vero, intero) oppure il titolo tagliato è `aria-hidden` con H1 accessibile accanto. Mai tagliare nomi prodotto o prezzi.
- **Nessuno scroll orizzontale**: i titoli fuori bordo vanno contenuti (`overflow-x: clip` sul contenitore), verificato a 320 px.
- **Su mobile i titoli enormi hanno un tetto**: nessuna pagina di catalogo deve spingere il primo prodotto sotto la metà del primo schermo (vedi §2, §3).
- **Header sticky** (48 px mobile, 56 px desktop) con skip link "Vai al contenuto".
- **Striscia demo** sottile (vedi D6 in `purchase-flow.md`).
- **Touch target ≥ 44×44 px** anche per utility testuali (`MENU`, `IT / EN`, `BORSA [0]`) e swatch colore (quadrato visivo 16 px, area cliccabile 44 px).

### Header

```
DESKTOP (≥ 1024 px)
┌────────────────────────────────────────────────────────────────────────────┐
│ [DEMO — sito dimostrativo · nessun pagamento reale]          (striscia, 24px)│
├────────────────────────────────────────────────────────────────────────────┤
│ LINGERAI │ REGGISENI  SLIP  BODY  SOTTOVESTI  ACCESSORI │ GRID / 01 │ IT / EN  BORSA [0] │
└────────────────────────────────────────────────────────────────────────────┘
  logo=home   5 categorie                                 drop (voce distinta)  lingua  borsa

MOBILE (< 1024 px)
┌────────────────────────────────────┐
│ LINGERAI          MENU   BORSA [0] │
└────────────────────────────────────┘
```

- Voce attiva: sottolineata 2 px (non solo colore).
- `IT / EN`: lingua attiva in nero pieno, l'altra in Grafite; è un **link** all'altra lingua (non un menu a tendina: con due lingue basta un tocco).
- `BORSA [n]`: è un link a `/it/borsa` che, con JavaScript attivo, apre il pannello.

### Menu mobile (pannello a tutto schermo)

```
┌────────────────────────────────────┐
│ LINGERAI                   CHIUDI  │
├────────────────────────────────────┤
│ IT / EN                            │  ← prima riga, sempre visibile
├────────────────────────────────────┤
│ GRID / 01                     →    │  ← drop in cima
│ ────────────────────────────────── │
│ REGGISENI                    [04]  │
│ SLIP                         [04]  │  ← categorie grandi (font titoli,
│ BODY                         [02]  │     ma intere, mai tagliate)
│ SOTTOVESTI                   [01]  │
│ ACCESSORI                    [02]  │
│ ────────────────────────────────── │
│ GUIDA TAGLIE · ABOUT               │
│ SPEDIZIONI · RESI · CONTATTI       │  ← mono piccolo
└────────────────────────────────────┘
```
- Apertura istantanea (≤ 200 ms, niente con reduced-motion), focus intrappolato nel pannello, `Esc` e `CHIUDI` chiudono, il focus torna su `MENU`.
- `BORSA [n]` non sta nel menu: resta nell'header, che rimane visibile sopra il pannello (oppure il pannello ripete `BORSA [n]` in alto a destra al posto di `MENU`).

### Footer

```
┌────────────────────────────────────────────────────────────────┐
│ SERVIZIO            BRAND            LEGALE          LINGUA    │
│ Spedizioni          GRID / 01        Termini         IT / EN   │
│ Resi                About            Privacy                   │
│ Guida taglie                                                   │
│ Contatti                                                       │
├────────────────────────────────────────────────────────────────┤
│ DEMO — sito dimostrativo. Nessun pagamento, nessun dato inviato.│
│ © 2026 LINGERAI                                                │
└────────────────────────────────────────────────────────────────┘
mobile: 4 gruppi impilati, sempre aperti (non accordion: sono 10 link)
```

---

## 1. Home (`/it`, `/en`)

**Obiettivo**: in 5 secondi capire *cosa* vende LINGERAI e *dove* cliccare; arrivare a un prodotto in 1 tap.

**Blocchi in ordine**
1. Apertura drop: titolo `GRID / 01` enorme (cornice, può tagliarsi), claim breve (registro C), CTA `VEDI IL DROP`.
2. Griglia prodotti del drop (6–8 pezzi, card standard), link `TUTTI I 13 PEZZI →`.
3. Ingresso per categoria: 5 voci testuali grandi con conteggio `[04]`.
4. Blocco editoriale: disegno tecnico + 2 righe "Guida ai modelli" (POI: link alla pagina; MVP: link alla guida taglie).
5. Riga rassicurazioni (spedizioni · resi · materiali · demo).
6. Footer.

```
DESKTOP                                              MOBILE
┌──────────────────────────────────────────┐        ┌──────────────────────┐
│ header                                   │        │ header               │
├──────────────────────────────────────────┤        ├──────────────────────┤
│ GRID / 0│1  ← 18–20vw, tagliato a destra │        │ GRID /               │ ← max ~30% altezza
│         │                                │        │ 01                   │   schermo
│ ┌───────┐  claim (registro C)            │        │ claim                │
│ │ disegno│ [ VEDI IL DROP ]              │        │ [ VEDI IL DROP ]     │ ← visibile senza
│ │ 4:5   │                                │        ├──────────┬───────────┤   scroll
│ └───────┘                                │        │ ▓▓ card  │ ▓▓ card   │ ← card visibili
├────┬────┬────┬────┬── griglia a vista ───┤        │ AXIS     │ PLANE     │   già nel primo
│ ▓▓ │ ▓▓ │ ▓▓ │ ▓▓ │                      │        │ reggiseno│ reggiseno │   schermo (parziali)
│AXIS│PLAN│GRID│LINE│  (card standard §3)  │        │ 95 €     │ 135 €     │
│95 €│135€│120€│98 €│                      │        ├──────────┴───────────┤
├────┴────┴────┴────┴──────────────────────┤        │ … 6 card, 2 colonne  │
│ TUTTI I 13 PEZZI →                       │        │ TUTTI I 13 PEZZI →   │
├──────────────────────────────────────────┤        ├──────────────────────┤
│ REGGISENI [04]   SLIP [04]   BODY [02]   │        │ REGGISENI      [04]  │
│ SOTTOVESTI [01]  ACCESSORI [02]          │        │ SLIP           [04]  │
├──────────────────────────────────────────┤        │ …                    │
│ disegno tecnico │ guida ai modelli →     │        ├──────────────────────┤
├──────────────────────────────────────────┤        │ editoriale           │
│ spedizioni · resi 30 gg · materiali · demo│       │ rassicurazioni (4 r.)│
│ footer                                   │        │ footer               │
└──────────────────────────────────────────┘        └──────────────────────┘
```

**Stati**
- *Caricamento*: pagina statica; le immagini mostrano il placeholder Cassaforma con disegno tecnico, mai un vuoto.
- *Nessun prodotto nel drop*: non previsto nel MVP (dati locali); in caso, il blocco 2 si nasconde e resta il blocco categorie.

---

## 2. Drop GRID / 01 = tutti i prodotti (`/it/drop/grid-01`)

**Obiettivo**: vedere tutto il catalogo, restringere per **taglia** e categoria, entrare in una scheda.

**Blocchi**
1. Intestazione: `GRID / 01` (cornice) + 2–3 righe di concept (registro C) + conteggio `[13]`.
2. Barra filtri testuale (vedi `purchase-flow.md` §3): `CATEGORIA · TAGLIA · COLORE · ORDINA`, con chip attivi rimovibili e `AZZERA`.
3. Griglia prodotti **regolare** (niente sfalsamenti: qui si confrontano prezzi).
4. (Facoltativo) blocco "Set" a fondo pagina: le 4 coppie coordinate.

```
DESKTOP                                              MOBILE
┌──────────────────────────────────────────┐        ┌──────────────────────┐
│ GRID / 01 ← titolo grande          [13]  │        │ GRID / 01       [13] │ ← titolo con tetto
│ concept 2–3 righe                        │        │ concept (2 righe max,│
├──────────────────────────────────────────┤        │ "Leggi →" se di più) │
│ CATEGORIA ▾ TAGLIA ▾ COLORE ▾   ORDINA ▾ │        ├──────────────────────┤
│ [75B ×] [Nero ×]   AZZERA        9 pezzi │        │ FILTRA (2)   ORDINA ▾│ ← barra sticky
├────┬────┬────┬────┬──────────────────────┤        │ [75B ×] [Nero ×]     │
│card│card│card│card│  4 colonne           │        ├──────────┬───────────┤
├────┼────┼────┼────┤                      │        │ card     │ card      │
│card│card│card│card│                      │        │ …        │           │
└────┴────┴────┴────┴──────────────────────┘        └──────────┴───────────┘
                                                     FILTRA → pannello dal basso
                                                     con [ MOSTRA 9 PEZZI ]
```

**Stati**
- *Filtri senza risultati*: `[0]` + "Nessun pezzo in 95G nero." + `AZZERA FILTRI` + suggerimento del filtro da togliere (es. "In 95G ci sono: PLANE grafite"). Mai una griglia vuota muta.
- *Prodotto esaurito*: resta in griglia, in coda, con etichetta testuale `ESAURITO` sotto il prezzo (non solo opacità).
- *Taglia filtrata esaurita su un prodotto*: il prodotto non compare (il filtro taglia mostra solo ciò che si può comprare).

---

## 3. Categoria (`/it/reggiseni` …)

**Obiettivo**: confrontare i pochi pezzi della categoria ed entrare in una scheda.

**Blocchi**
1. Breadcrumb minimo `LINGERAI / REGGISENI` (solo testo).
2. Titolo categoria + conteggio `REGGISENI [04]`; 1 riga di descrizione (es. sistemi di taglia usati: "65–95 A–G e XS–3XL").
3. **Nessun filtro** (≤ 4 prodotti: vedi `purchase-flow.md` §3). Solo, se serve, ordinamento.
4. Griglia card.
5. Navigazione laterale tra categorie: `← SLIP · BODY →` o lista delle altre 4 categorie (evita il vicolo cieco).

**Card prodotto (standard in tutto il sito)**
```
┌──────────────┐
│              │  immagine 4:5: disegno tecnico (placeholder) /
│   disegno    │  foto futura; hover desktop: retro (taglio secco)
│   tecnico    │
│              │
│ DISEGNO TECNICO — FOTO IN ARRIVO   ← etichetta mono piccola (solo con placeholder)
└──────────────┘
AXIS                    ← nome intero, mai tagliato
Reggiseno a triangolo   ← tipo (indispensabile: AXIS/PLANE/GRID sono anche slip)
95 €                    ← prezzo, mono
■ ■ ■ ■  4 colori       ← swatch decorativi + testo, non cliccabili in card
ESAURITO / ULTIMI PEZZI ← solo se vero, testo
```
- Tutta la card è un unico link (un solo tab stop).
- **Niente "aggiungi rapido"** in griglia (la taglia va scelta in scheda; vedi D1 per la discussione).

```
MOBILE: categoria con 1 prodotto (SOTTOVESTI)
┌──────────────────────┐
│ SOTTOVESTI      [01] │
├──────────────────────┤
│ card a tutta         │  ← con 1–2 pezzi la card passa a 1 colonna
│ larghezza            │    grande: evita la pagina "mezza vuota"
│ SHEER — sottoveste   │
│ 240 €                │
├──────────────────────┤
│ VEDI ANCHE           │
│ BODY [02] →          │
│ GRID / 01 [13] →     │
└──────────────────────┘
```

**Stati**
- *Categoria vuota* (non nel MVP): titolo + "Nessun pezzo in questa categoria nel drop attuale." + link al drop.
- *Esaurito*: come §2.

---

## 4. Scheda prodotto (`/it/reggiseni/axis-reggiseno`)

**Obiettivo**: decidere colore e taglia con sicurezza (fit, trasparenza, materiali) e aggiungere alla borsa.

**Blocchi in ordine (colonna informazioni)**
1. Breadcrumb `REGGISENI / AXIS`.
2. **Nome** (display grande ma intero) + tipo (`Reggiseno a triangolo`).
3. **Prezzo** (mono).
4. **Colore**: nome del colore selezionato in testo (`COLORE — NERO`) + swatch quadrati.
5. **Taglia**: griglia di caselle testuali; esaurite barrate + testo; link `GUIDA TAGLIE →` (pannello) accanto all'etichetta.
6. Nota di vestibilità in 1 riga (`Veste regolare. Tra due taglie: la più grande in fascia.`).
7. **Bottone** `AGGIUNGI ALLA BORSA — 95 €` (pieno nero, tutta larghezza). Sotto: messaggio di errore/conferma (area `aria-live`).
8. Riga rassicurazioni: `Spedizione demo 2–4 gg · Resi 30 gg · Slip: protezione igienica` → link alle pagine.
9. **Dati chiave sempre visibili** (non nascosti): `TRASPARENZA — trasparente` · `FERRETTO — no` · `IMBOTTITURA — no`. Con i disegni tecnici al posto delle foto, la trasparenza va detta a parole.
10. Descrizione (registro A, 2–4 righe).
11. Accordion: Composizione · Costruzione · Vestibilità · Cura · Resi.
12. **Set**: "Completa il set" con la card del pezzo coordinato (vedi `purchase-flow.md` §5).
13. Altri pezzi del drop (4 card).

**Colonna immagini**: disegno tecnico fronte, retro, dettaglio quotato; immagini impilate (desktop), carosello a scorrimento con indicatore `1 / 3` (mobile).

```
DESKTOP                                                    MOBILE
┌─────────────────────────────┬────────────────────────┐  ┌──────────────────────┐
│ ┌─────────────────────────┐ │ REGGISENI / AXIS       │  │ REGGISENI / AXIS     │
│ │                         │ │ AXIS  ← 72–96 px, intero│  │ ┌──────────────────┐ │
│ │  disegno tecnico fronte │ │ Reggiseno a triangolo  │  │ │ disegno 4:5      │ │
│ │  4:5                    │ │ 95 €                   │  │ │          1 / 3   │ │ ← swipe
│ └─────────────────────────┘ │                        │  │ └──────────────────┘ │
│ ┌─────────────────────────┐ │ COLORE — NERO          │  │ AXIS        ← 40–56px│
│ │ retro                   │ │ ■ □ □ □                │  │ Reggiseno a triangolo│
│ └─────────────────────────┘ │                        │  │ 95 €                 │
│ ┌─────────────────────────┐ │ TAGLIA     GUIDA TAGLIE→│  │ COLORE — NERO        │
│ │ dettaglio quotato       │ │ [XS][S][M][L]          │  │ ■ □ □ □              │
│ └─────────────────────────┘ │ [XL][X̶X̶L̶][3XL]         │  │ TAGLIA  GUIDA TAGLIE→│
│                             │ XXL esaurita           │  │ [XS][S][M][L][XL]    │
│  (colonna destra STICKY)    │                        │  │ [X̶X̶L̶][3XL]          │
│                             │ [AGGIUNGI ALLA BORSA — 95 €]│ │ [AGGIUNGI — 95 €]   │
│                             │ spedizione · resi       │  │ rassicurazioni       │
│                             │ TRASPARENZA trasparente│  │ dati chiave          │
│                             │ FERRETTO no · IMBOTT. no│ │ descrizione          │
│                             │ descrizione            │  │ accordion            │
│                             │ + Composizione         │  │ COMPLETA IL SET      │
│                             │ + Costruzione …        │  │ altri pezzi          │
├─────────────────────────────┴────────────────────────┤  ├──────────────────────┤
│ COMPLETA IL SET: AXIS slip 48 € →                    │  │▓ AXIS · M · 95 € [AGGIUNGI]│ ← barra sticky
│ ALTRI PEZZI DI GRID / 01                             │  └──────────────────────┘   quando il bottone
└──────────────────────────────────────────────────────┘     principale esce dallo schermo
```

**Regola mobile importante**: nome + prezzo + colore + taglie + bottone devono stare entro ~1,5 schermate dall'alto. Il nome display ha un tetto (indicativo `clamp(40px, 12vw, 56px)`), l'immagine non supera ~60% dell'altezza schermo.

**Stati**
- *Nessuna taglia scelta + "Aggiungi"*: il bottone **non è disabilitato**; al tocco compare l'errore sotto il gruppo taglie (`Taglia non selezionata. Scegline una per continuare.` dal tone of voice), il gruppo riceve bordo nero 2 px + prefisso testuale, il focus va sulla prima taglia disponibile. Su mobile la pagina scorre fino alle taglie.
- *Taglia esaurita*: casella barrata + `aria-disabled`, raggiungibile da tastiera; se scelta, messaggio "75C esaurita in nero. Disponibile in grafite." (se vero). **Nessun "Avvisami"** (raccoglierebbe email).
- *Colore senza la taglia scelta*: cambiando colore la taglia resta selezionata se disponibile; se non lo è, si deseleziona con messaggio "M non disponibile in Skin 02".
- *Taglia unica / doppie* (TENSION `S/M`, `L/XL`): stesse caselle; se taglia unica, preselezionata e scritta (`TAGLIA UNICA`).
- *Prodotto tutto esaurito*: bottone sostituito da riquadro testuale `ESAURITO` (non un bottone grigio), taglie barrate, link "Vedi pezzi simili" / set.
- *Aggiunta riuscita*: il pannello Borsa si apre con la riga appena aggiunta evidenziata; `BORSA [n]` aggiornato; annuncio screen reader "AXIS reggiseno, nero, M aggiunto alla borsa".
- *Aggiunta oltre il massimo* (es. 5 pezzi per variante, regola demo): messaggio "Massimo 5 per taglia nella demo."
- *Slug inesistente*: 404 localizzata con link al drop.
- *Caricamento immagini*: placeholder Cassaforma della stessa proporzione (niente salti di layout).

---

## 5. Pannello Guida taglie (+ pagina `/it/guida-taglie`)

**Obiettivo**: trovare la propria taglia senza lasciare la scheda prodotto.

**Blocchi**
1. Titolo `GUIDA TAGLIE` + `CHIUDI`.
2. Schede: `REGGISENI (FASCIA + COPPA)` / `LETTERE XS–3XL` — **si apre già sulla scheda giusta** per il prodotto da cui arriva.
3. Come misurarti: 2–3 misure con disegno a tratto.
4. Tabella (cm / inch toggle), con la **taglia selezionata evidenziata** se l'utente ne ha già scelta una.
5. (POI) Mini-calcolatore: sottoseno + seno → taglia suggerita (`calcolo locale, nessun dato salvato`).
6. Nota "conversioni indicative" + consiglio tra due taglie.
7. Link a `Resi` ("Taglia sbagliata? Cambio gratuito nella demo").

```
DESKTOP: pannello da destra, 480 px          MOBILE: pannello a tutto schermo
┌────────────────────────┐                   ┌──────────────────────┐
│ GUIDA TAGLIE    CHIUDI │                   │ GUIDA TAGLIE  CHIUDI │
│ [REGGISENI] LETTERE    │                   │ [REGGISENI] LETTERE  │
│ come misurarti (disegno)│                  │ come misurarti       │
│ CM / INCH              │                   │ CM / INCH            │
│ ┌────┬────┬──┬────┐    │                   │ tabella con 1ª col.  │
│ │sott│EU  │IT│UK  │    │                   │ fissa, scroll orizz. │
│ │73–77│75 │2 │34  │◄── evidenziata          │ SOLO nella tabella   │
│ └────┴────┴──┴────┘    │                   │ (con indicazione →)  │
│ tra due taglie: …      │                   └──────────────────────┘
└────────────────────────┘
```
La pagina `/it/guida-taglie` usa lo stesso contenuto in layout di lettura a una colonna (link da footer, menu, condivisibile).

**Stati**: *calcolatore con valori fuori scala* → "Fuori dalle taglie di questo modello (65–95). Vedi LINE in XS–3XL." (esempio di cross-suggerimento utile, non un vicolo cieco).

---

## 6. Borsa — pannello laterale (+ pagina `/it/borsa`)

**Obiettivo**: controllare cosa c'è, correggere quantità/taglia, andare al checkout.

**Blocchi**
1. `BORSA [3]` + `CHIUDI`.
2. Righe: miniatura · **NOME + tipo** · colore · taglia · quantità `− 1 +` · prezzo riga · `RIMUOVI`.
3. (Facoltativo) "Completa il set" se nella borsa c'è un pezzo con coordinato non presente (1 sola proposta).
4. Riepilogo: subtotale · spedizione (`demo — gratuita` o `calcolata al checkout`, da copy/legale) · **totale grande**.
5. `VAI AL CHECKOUT` (pieno nero) · `CONTINUA` (link).
6. Nota demo + resi in 1 riga.

```
DESKTOP: pannello da destra, 440 px, sopra il contenuto (overlay 40% nero)
┌──────────────────────────┐
│ BORSA [3]         CHIUDI │
├──────────────────────────┤
│ ▓ AXIS                   │
│ ▓ Reggiseno a triangolo  │
│ ▓ Nero · M               │
│   − 1 +        95,00 €   │
│   RIMUOVI                │
├──────────────────────────┤
│ ▓ AXIS — Slip  Nero · M  │
│   − 2 +        96,00 €   │
├──────────────────────────┤
│ SUBTOTALE      191,00 €  │
│ SPEDIZIONE  [etichetta]  │
│ TOTALE         191,00 €  │ ← grande, mono
│ [ VAI AL CHECKOUT ]      │
│ Continua lo shopping     │
│ Demo · nessun pagamento  │
└──────────────────────────┘
MOBILE: stesso contenuto a tutto schermo; riepilogo + bottone fissi in basso.
```

**Stati**
- *Vuota*: `BORSA [0]` + riga del tone of voice ("Niente dentro.") + `VEDI GRID / 01` + 5 categorie testuali. Niente illustrazioni tristi.
- *Caricamento* (lettura dal browser all'avvio): il contatore mostra `BORSA [·]` / niente numero finché non è letto, per non far lampeggiare `[0]` → `[3]`.
- *Rimozione*: la riga diventa `AXIS rimosso. ANNULLA` per ~5 s (poi sparisce). Focus sulla riga successiva o sul titolo.
- *Prodotto non più a catalogo* (dati cambiati tra due visite): riga barrata "Non più disponibile" + `RIMUOVI`; non conta nel totale; checkout bloccato finché c'è.
- *Borsa piena di dati corrotti*: si azzera senza errore tecnico visibile, con messaggio "La borsa è stata svuotata."
- *Quantità*: min 1 (sotto 1 → usare `RIMUOVI`), max 5 per variante (demo).

---

## 7. Checkout demo, una pagina (`/it/checkout`)

**Obiettivo**: simulare un acquisto completo in modo credibile e **inequivocabilmente demo**.

**Blocchi**
1. Header ridotto: `LINGERAI` + `← BORSA` (niente menu: meno uscite). `IT / EN` resta (vedi `purchase-flow.md` §7).
2. **Banner demo fisso** in fascia piena: `DEMO — NESSUN PAGAMENTO VERRÀ EFFETTUATO. NON INSERIRE DATI REALI.`
3. Bottone `COMPILA CON DATI DI ESEMPIO` (riempie tutto con dati fittizi).
4. **01 CONTATTO**: email.
5. **02 SPEDIZIONE**: nome, cognome, indirizzo, CAP, città, provincia (solo IT), paese (lista breve UE + UK), telefono facoltativo.
6. **03 METODO DI SPEDIZIONE**: Standard / Express (prezzi demo).
7. **04 PAGAMENTO**: nessun campo carta (vedi D4) — un'unica scelta `PAGAMENTO SIMULATO` già selezionata.
8. Riepilogo ordine (desktop colonna destra sticky; mobile in cima, chiuso: `RIEPILOGO — 191,00 € ▾`).
9. Checkbox termini demo (link `Termini`, `Privacy`).
10. `CONFERMA ORDINE DEMO — 191,00 €`.

```
DESKTOP                                                MOBILE
┌──────────────────────────────────────────────┐      ┌──────────────────────┐
│ LINGERAI   ← BORSA                    IT / EN│      │ LINGERAI  ← BORSA  IT/EN│
├──────────────────────────────────────────────┤      ├──────────────────────┤
│█ DEMO — NESSUN PAGAMENTO VERRÀ EFFETTUATO   █│      │█ DEMO — NESSUN       █│
├────────────────────────────┬─────────────────┤      │█ PAGAMENTO …         █│
│ [COMPILA CON DATI DI ESEMPIO]│ RIEPILOGO      │      ├──────────────────────┤
│ 01 CONTATTO                │ AXIS · Nero · M │      │ RIEPILOGO 191,00 € ▾ │
│ Email [____________]       │ 95,00 €         │      │[COMPILA CON DATI ES.]│
│ 02 SPEDIZIONE              │ AXIS slip ×2    │      │ 01 CONTATTO          │
│ Nome [____] Cognome [____] │ 96,00 €         │      │ Email [____________] │
│ Indirizzo [______________] │ ─────────────   │      │ 02 SPEDIZIONE        │
│ CAP [___] Città [________] │ Spedizione …    │      │ campi in 1 colonna   │
│ Paese [Italia ▾]           │ TOTALE 191,00 € │      │ 03 METODO            │
│ 03 METODO  ○ Standard ○ Express│ (sticky)    │      │ 04 PAGAMENTO SIMULATO│
│ 04 PAGAMENTO ● Simulato    │                 │      │ ☐ termini demo       │
│ ☐ Accetto i termini della demo│              │      │ [CONFERMA ORDINE DEMO│
│ [CONFERMA ORDINE DEMO — 191,00 €]│           │      │  — 191,00 €]         │
└────────────────────────────┴─────────────────┘      └──────────────────────┘
```

Campi: etichette sempre visibili sopra il campo (mai solo placeholder), `autocomplete` corretto, tastiera giusta su mobile (`type=email`, `inputmode=numeric` per CAP), una colonna su mobile.

**Stati**
- *Errori*: validazione all'uscita dal campo (non mentre si scrive) e all'invio. All'invio con errori: riepilogo errori in cima con link ai campi + focus sul primo; ogni campo con messaggio sotto, prefisso testuale ("Errore —") e bordo 2 px. **Mai l'arancio come colore del testo** dell'errore (decisione accento).
- *Invio*: bottone diventa `ELABORAZIONE DEMO…` per ~800 ms, non ricliccabile; poi conferma.
- *Borsa vuota* (arrivo diretto su `/checkout`): niente form; messaggio "La borsa è vuota" + `VEDI GRID / 01`.
- *Riga non più disponibile*: rimanda alla borsa con il messaggio.
- *Dati inseriti*: restano solo nella scheda del browser (sessione) per non perderli se si cambia lingua o si torna alla borsa; si cancellano alla conferma.

---

## 8. Conferma demo (`/it/checkout/conferma`)

**Obiettivo**: chiudere il flusso con chiarezza; ribadire che non è successo nulla di reale.

**Blocchi**: titolo (può essere "cornice", registro C) · `ORDINE DEMO-0001` · riepilogo righe e totale · indirizzo inserito · riga "Nessun pagamento effettuato. Nessun dato inviato o salvato." · `TORNA A GRID / 01`.

```
┌──────────────────────────────────┐
│█ DEMO                           █│
│ ORDINE RICEVUTO ← titolo grande  │
│ DEMO-0001 · 05.11.2026           │
│ AXIS · Nero · M        95,00 €   │
│ AXIS slip · Nero · M ×2 96,00 €  │
│ TOTALE                191,00 €   │
│ Nessun pagamento effettuato.     │
│ [ TORNA A GRID / 01 ]            │
└──────────────────────────────────┘
```
**Stati**: *accesso diretto senza ordine* → redirect al drop (o messaggio "Nessun ordine demo recente"); *ricarica pagina* → mostra lo stesso riepilogo (tenuto in sessione) senza duplicare l'ordine; la borsa è già vuota.

---

## 9. About (`/it/about`)

**Obiettivo**: dare un'identità al brand (registro C). È la pagina più libera.

**Blocchi**: titolo enorme tagliato (decorativo, con H1 accessibile) · manifesto breve (testo grande, una colonna, max 65 caratteri per riga) · un'immagine/disegno · 3 righe "come lavoriamo" (costruzione, materiali, corpi) · `VEDI GRID / 01`.
Qui griglia rotta e sfalsamenti sono ammessi. Unico vincolo: ordine di lettura del codice = ordine visivo.

---

## 10. Pagine di servizio e legali (Spedizioni, Resi, Contatti, Termini, Privacy)

**Obiettivo**: rispondere in fretta. Layout di lettura: una colonna, corpo 16–17 px, titolo con l'unico gesto "edgy".

```
┌──────────────────────────────┐
│ RESI ← titolo grande         │
│ ultimo aggiornamento · DEMO  │
│ indice ancore (se > 3 sez.)  │
│ ## 30 giorni                 │
│ testo…                       │
│ ## Slip e igiene             │
│ ## Come fare (simulato)      │
│ Domande? → Contatti          │
└──────────────────────────────┘
```
Contatti: nessun modulo; email fittizia `@example.com`, orari demo, link FAQ (POI).

---

## 11. 404

**Obiettivo**: non perdere la cliente. Titolo `404` enorme (registro C, unico punto di gioco), una riga ("Questa pagina non esiste."), poi **utilità**: `VEDI GRID / 01` + le 5 categorie + `IT / EN`. Lingua presa dall'URL.

---

## 12. Riepilogo stati per componente

| Componente | Vuoto | Caricamento | Errore | Esaurito |
|---|---|---|---|---|
| Contatore `BORSA [n]` | `[0]` | `[·]` fino alla lettura | — | — |
| Griglia drop/categoria | messaggio + azzera filtri | placeholder 4:5 | — | in coda + `ESAURITO` |
| Selettore taglia | errore "non selezionata" | — | bordo + testo | barrata + testo + `aria-disabled` |
| Bottone aggiungi | — | — | messaggio sotto | sostituito da `ESAURITO` |
| Pannello borsa | testo + CTA drop | `[·]` | riga "non più disponibile" | riga bloccante |
| Checkout | redirect borsa vuota | `ELABORAZIONE DEMO…` | riepilogo + per campo | rimanda alla borsa |
| Conferma | redirect / messaggio | — | — | — |
