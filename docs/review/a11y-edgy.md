# Revisione accessibilita: variante edgy "Cut & Paste" (WCAG 2.2 AA)

Data: 2026-11-06. Branch `edgy`. Misure con Playwright su http://localhost:3111 (1440 px, 375 px, 320 px, reduced-motion).
Pagine: /it, /en, /it/drop/grid-01, /it/reggiseni, /it/reggiseni/axis-reggiseno, /it/chi-siamo, /it/borsa, /it/checkout (con articolo e a vuoto), /it/non-esiste.
Nessun codice modificato.

## Conteggio
Alta: 1. Media: 2. Bassa: 3.

## Problemi

### ALTA
**A1. Tag "Esaurito" illeggibile: testo ink su fondo ink (rapporto 1:1)**
- Pagina: /it/drop/grid-01 (e ogni lista con prodotti esauriti), 1440 e 375.
- Elemento: `<span class="t-label tag soldOut">` in `src/components/product/ProductCard.tsx:57`; stile `.soldOut` in `src/components/product/ProductCard.module.css:74-79`.
- Criterio: 1.4.3 Contrasto minimo (e 1.4.1: lo stato esaurito resta dato solo in modo non visibile).
- Misura: colore calcolato rgb(10,10,10) su sfondo rgb(10,10,10). Il `color: var(--text)` di `.t-label` (globals.css:337-345) vince su `color: var(--text-inverse)` del modulo (stessa specificita, ordine di caricamento).
- Correzione: in `ProductCard.module.css` usare `.card .soldOut { color: var(--c-concrete); }` (specificita maggiore), oppure aggiungere la classe `tag-inverse` al `<span>`. Rapporto atteso 17,5:1. Controllare anche altri usi di `.t-label` + colore del modulo.

### MEDIA
**M1. Scroll orizzontale a 320 px nel drop (reflow)**
- Pagina: /it/drop/grid-01 a 320 px: scrollWidth 347 > 320.
- Elemento: `label.sort` e `select.select` (modulo della barra filtri drop, classe `zsHvfG_sort` / `zsHvfG_select`) arrivano a x=347.
- Criterio: 1.4.10 Reflow.
- Correzione: sul contenitore `min-width: 0`, sulla select `max-width: 100%; width: 100%`, sulla label `flex-wrap: wrap`. Verificare che non sia gia presente su `main` (probabile problema preesistente, non dell'edgy).

**M2. Scroll orizzontale a 320 px nel checkout**
- Pagina: /it/checkout a 320 px: scrollWidth 338-339.
- Elemento: `div.utils` (header checkout) con `span.switcher`/`span.item` (selettore lingua IT / EN) fino a x=338. Si vede "EN" tagliato sul bordo destro.
- Criterio: 1.4.10 Reflow.
- Correzione: nel modulo dell'header checkout `flex-wrap: wrap; gap: var(--space-2)` sul contenitore, oppure ridurre `gap`/`padding` del logo + "← Borsa" sotto 360 px. Stesso schema anche nel footer, gia ok.

### BASSA
**B1. Link "→ Resi" alto 19 px nel pannello Guida taglie**
- Pagina: scheda prodotto, pannello guida (riga "Taglia sbagliata? ... Resi"), 55x19 px.
- Criterio: 2.5.8 Dimensione target. E in una frase quindi probabilmente esente come link in linea; segnalato per prudenza.
- Correzione: `display: inline-block; min-height: 24px; line-height: 24px` sul link, oppure lasciare cosi.

**B2. Giallo #FFE600 senza bordo non distinguibile dal fondo carta (1,12:1)**
- Dove: striscia demo e tag segnale. Ora hanno bordo/filetto ink (visto in screenshot: striscia con filetto 2-3 px, tag con bordo 2 px), quindi 1.4.11 e soddisfatto. Rischio solo se qualcuno toglie il bordo.
- Correzione: nessuna ora; non usare mai il giallo senza bordo ink 2 px per segnalare stati.

**B3. Radio taglia/colore: l'anello di focus e sul `label`, l'input e `sr-only`**
- Pagina: scheda prodotto. Con Tab l'anello doppio e visibile (verificato con screenshot sul selettore colore e sulle taglie). Lo script rileva "coperto" solo perche l'input e visivamente nascosto: falso positivo.
- Correzione: nessuna. Solo da mantenere in futuro `:focus-within` sul label.

## Verificato OK
- Contrasti calcolati: ink su giallo 15,62:1; rosso #C80000 su carta 5,38:1 (su bianco 6,08:1, ok per nota a mano >= 24 px bold e timbro); blu #0000EE su carta 8,32:1; viola visitato #551A8B 9,75:1; grafite su carta 5,84:1 (su bianco 6,59:1); carta su ink (bottone primario) 17,53:1; grafite-su-ink 4,74:1; linea controllo mid su carta 3,45:1 (>= 3:1 per 1.4.11); bordi ink 2 px ok. Nessun testo sotto 4,8:1 su nessuna pagina testata (script su tutto il testo visibile), tranne A1.
- Ombra rossa dei bottoni: decorativa, il bottone e distinto da bordo e fondo ink (17,5:1). Il focus ink 3px + alone bianco ha 3,26:1 sul rosso e 6,08:1 alone/rosso.
- Note a mano: tutte `aria-hidden="true"`, testo non essenziale ("fuori. davvero.", "tredici. basta.", "PS. è una demo", "tagliata male"). Nessuna nota esce dal viewport a 320 px.
- Titoli ghost: copia dentro `.stack[aria-hidden=true]`; l'h1 ha nome accessibile dal `<span class=label>` (visibile da 768 px, sr-only sotto). Nota: il testo dell'h1 letto da `textContent` mostra la scritta ripetuta, ma gli screen reader la ignorano per `aria-hidden`.
- Grana `.zine::before` opacita 5% con `pointer-events: none`, solo su hero/header editoriali; nessun form ne checkout.
- Rotazioni: solo su note/timbri e foto editoriali; bottoni e link non ruotati.
- Focus: Tab su tutte le pagine, nessun elemento senza outline (3px solid ink + box-shadow bianco 2px). Ordine DOM = ordine visivo; nessuna trappola. Skip-link presente come primo elemento.
- Reduced-motion: 0 animazioni attive con `prefers-reduced-motion: reduce` (anche il timbro).
- Lingua: `lang="it"` su /it e `lang="en-GB"` su /en.
- Target: nessun elemento interattivo sotto 24x24 px oltre a B1.
- Checkout con articolo: tutti i campi con label, `required`, `autocomplete` corretti; invio a vuoto sposta il focus sul titolo "8 errori da correggere" con link ai campi; errori con testo "Errore", bordo e `aria-describedby`, non solo colore; demo banner giallo chiaro e leggibile a 320 px. Annuncio aggiunta alla borsa in regione live: "Aggiunto alla borsa: AXIS reggiseno a triangolo, nero, XS. Borsa: 1 articolo."
- Taglia esaurita: XXL barrata con testo "XXL esaurita", invariata.

## Non verificato
- Contrasto effettivo del testo sulla grana a pixel (5% al massimo abbassa di circa 0,5:1: il piu debole, grafite 5,84:1, resta sopra 4,5:1).
- Zoom 200% a 1440 (equivale al test 720 px/320 px: reflow ok tranne M1/M2).
- Screen reader reale (NVDA/VoiceOver).

## Correzioni applicate (2026-11-06, orchestratore)
- **H1** risolto: `.card .soldOut` in ProductCard.module.css → testo carta su fondo ink.
- **M1** risolto: `.sort` va a capo, `.select` con `max-width: 100%` (DropCatalog.module.css). scrollWidth a 320 px = 320.
- **M2** risolto: sotto 360 px `.utils` dell'header va a capo (Header.module.css). scrollWidth checkout a 320 px = 320.
- Bassi B1–B3: non toccati (esenti o falsi positivi).
