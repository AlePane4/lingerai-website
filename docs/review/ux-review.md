# Revisione UX — LINGERAI (fase 7)

Data: 2026-11-06. Revisore: `ux-reviewer`. Confronto codice vs `docs/ux/*` e `docs/decisions.md`.
Verifiche fatte su http://localhost:3200 con Chromium a 375x740 (sola lettura) e lettura del codice.

## 1. Sintesi

- L'implementazione è fedele ai blueprint: header ridotto nel checkout, pannello borsa con riga evidenziata e tag AGGIUNTO, errori inline + riepilogo, stati vuoti, selettore lingua che mantiene pagina e query (verificato in `routes.ts` e `LanguageSwitcher.tsx`), 404 localizzato, nessun overflow orizzontale sulle altre pagine a 375 px.
- Un problema vero sul telefono: la griglia taglie dei reggiseni sfora a 375 px (pagina larga 384 px).
- Un vicolo cieco nel flusso d'acquisto: colore interamente esaurito con pulsante "Aggiungi" ancora attivo.
- Su mobile taglia e pulsante sono a ~1,6 e ~2 schermate dall'inizio; nel checkout due blocchi arancioni consecutivi (striscia + banner) occupano ~190 px.
- Il resto sono rifiniture a bassa priorità. Nessun problema bloccante.

## 2. Problemi

| ID | Priorità | Pagina | Problema | File:riga | Correzione proposta |
|---|---|---|---|---|---|
| UX-1 | alta | Scheda prodotto (reggiseni, 375 px) | La riga di una fascia (etichetta 2rem + 7 caselle da 44 px + gap) misura ~368 px contro 343 disponibili: `scrollWidth` = 384 px, la pagina scorre in orizzontale e la coppa G tocca il bordo. Il wrap dell'etichetta scatta solo sotto 359 px, ma il caso reale è 375-390 px. Verificato su `/it/reggiseni/plane-reggiseno`. | `src/components/product/ProductDetail.module.css:136-158` (`.bandRow`, `.band`, media query `22.4375rem`) | Alzare il breakpoint a `max-width: 24.5rem` (392 px): etichetta della fascia sopra le 7 caselle (7x44 + 6x4 = 332 px, ci sta in 343). Oppure `.bandRow .size { flex: 1 1 0; min-width: 0 }` accettando 39 px di larghezza. Meglio la prima: mantiene il target 44 px. |
| UX-2 | media | Scheda prodotto (colore tutto esaurito) | Se il colore scelto è esaurito in ogni taglia (dati: `plumbSlip` skin-02, `holdSuspenderBelt` black), il pulsante "Aggiungi alla borsa — prezzo" resta attivo e al clic dice "Taglia non selezionata. Scegline una", ma tutte le taglie sono disabilitate. L'elenco "Esaurite: ..." è soppresso proprio in questo caso. Vicolo cieco. Vale anche per la barra sticky. | `ProductDetail.tsx:133` (`soldOutSizes`), `:272-284` (solo `soldOutAll` sostituisce il bottone), `:395-406` (sticky) | Se `colourSoldOut`: al posto del bottone mostrare il box "Esaurito in {colore}" con link/azione verso il primo colore disponibile (`firstAvailableColour`) e nascondere la barra sticky. Il testo "esaurito" nella legenda (K2) resta. |
| UX-3 | media | Scheda prodotto (mobile) | Con la galleria a tutta larghezza, a 375x740 la legenda taglia è a y~1200 px e il pulsante a y~1450 px (verificato su AXIS slip). La barra sticky compare solo dopo aver superato il pulsante (`top < 0`), quindi per le prime ~2 schermate non c'è alcuna azione d'acquisto in vista. | `ProductDetail.tsx:66` (condizione `entry.boundingClientRect.top < 0`); altezza galleria in `Gallery.module.css` | Mostrare la barra sticky anche quando il pulsante è sotto lo schermo (basta `setShowSticky(!entry.isIntersecting)`); il clic senza taglia già porta alla griglia taglie (`add()` righe 107-112). In alternativa limitare la galleria a ~60svh sotto 768 px. Rispetta il limite di 2 elementi sticky (header + barra). |
| UX-4 | media | Checkout (mobile) | Striscia demo arancio + banner arancio "DEMO — nessun pagamento..." impilati: ~190 px su 740 prima del titolo, stesso messaggio due volte, fondo pieno arancio ripetuto. **Conflitto con decisione D6** ("striscia Demo su tutte le pagine") e con il banner del blueprint §7. | `CheckoutPage.tsx:50-52`, `DemoStrip.tsx:8-18`, `Checkout.module.css` (`.banner`) | Da decidere con l'utente. Proposta: sul checkout la striscia resta ma il banner diventa una riga sola ("Non inserire dati reali.") senza fondo pieno, oppure striscia nascosta solo su `/checkout` e `/checkout/conferma`, dove il banner già dice la stessa cosa. |
| UX-5 | bassa | Borsa (pannello e pagina) | Con una riga in borsa: "Spedizione: Calcolata al checkout" e "Totale" = subtotale. Il totale sembra definitivo ma la spedizione è ignota, mentre la standard è gratuita (l'unico costo possibile è Express). | `BagContents.tsx:170-177`; testo `it.json` `bag.summary.shippingValue` | Cambiare il valore in "Gratuita (standard) · Express 12,00 €" (prezzo da `EXPRESS_PRICE`), o etichettare "Totale parziale". Testo da far passare al copywriter. |
| UX-6 | bassa | Checkout / cambio lingua | La spunta dei termini vive solo nello stato React (non nel draft in sessionStorage), quindi cambiando lingua dal checkout i dati restano ma la spunta sparisce senza avviso. Anche l'hash (#) non viene conservato dal selettore. | `CheckoutForm.tsx:54` (`terms`), `:72` (`saveDraft`); `LanguageSwitcher.tsx:20-23` | Non salvare la spunta è giusto (decisione: mai pre-spuntata); basta che l'errore "termini" non compaia al ritorno se non è stato inviato. Nessun intervento obbligatorio; tenere nota nel QA. Se si vuole, passare anche `window.location.hash`. |
| UX-7 | bassa | Pagina `/borsa` prima dell'idratazione | L'HTML server contiene solo il titolo con "[·]" e nessun testo di caricamento (`bag.ready &&` non rende nulla altrimenti). Con JS lento o disattivato la pagina sembra vuota; il blueprint cita la pagina come fallback "senza JavaScript". | `BagContents.tsx:121`; `curl /it/borsa` | Mostrare `t("common.loading")` quando `!bag.ready` e un `<noscript>` che spiega che la borsa richiede JavaScript. |
| UX-8 | bassa | Griglie prodotto (home, drop, categorie) | Ogni scheda ripete la didascalia "Disegno tecnico — foto in arrivo": 4-12 volte per schermata, rumore sopra a nome/prezzo. | `ProductCard.tsx:164-166` | Mostrarla una volta per griglia (nota sotto il titolo di sezione) o solo sulla prima scheda; mantenere il resto invariato. Si può togliere del tutto quando arrivano le foto. |

## 3. Cosa funziona (verificato, nessuna azione)

- Header: logo 32 px, menu mobile a schermo intero (< 1024 px) con GRID / 01 per primo, conteggi per categoria, selettore lingua e BORSA nel menu; BORSA [n] sempre visibile a 375 px.
- Flusso: categoria → scheda → taglia (errore inline con tag ERRORE e focus sulla prima taglia) → pannello borsa con riga AGGIUNTO → checkout → conferma. Annullamento della rimozione, limite quantità, righe non disponibili che bloccano il checkout.
- Selettore lingua: stesso percorso tradotto, query (`?color=`, filtri) conservata, scelta salvata; 404 e pagine ignote tornano alla home della lingua scelta (accettabile).
- Checkout: validazione al blur solo se c'è testo, riepilogo errori con link ai campi, "Compila con dati di esempio", metodo di spedizione, nessun campo carta, doppio invio impedito (800 ms simulati).
- Pannello borsa su mobile: lista scorrevole e riepilogo fisso in fondo con CTA sempre visibile (screenshot verificato).

## 4. Conteggio

Alta: 1 (UX-1). Media: 3 (UX-2, UX-3, UX-4). Bassa: 4 (UX-5, UX-6, UX-7, UX-8). Totale 8. Bloccanti: 0.

Decisione da portare all'utente: UX-4 (conflitto con D6).
