# Registro decisioni — LINGERAI

| Data | Decisione | Motivo / note |
|---|---|---|
| 2026-11-05 | Nome brand: **LINGERAI** | Scelto dall'utente |
| 2026-11-05 | Direzione estetica: **super minimal ed edgy** | Richiesta dell'utente |
| 2026-11-05 | E-commerce completo ma **simulato** (nessun pagamento reale) | Scelto dall'utente |
| 2026-11-05 | Sito in **italiano + inglese** con selettore lingua | Scelto dall'utente |
| 2026-11-05 | Stack proposto: **Next.js + TypeScript**, dati locali, carrello nel browser | L'utente ha lasciato decidere; da confermare prima della fase 6 |
| 2026-11-05 | Riferimenti: moda minimal/edgy, siti premiati per il design, lingerie contemporanea | Scelti dall'utente (esclusa lingerie di lusso classica) |
| 2026-11-05 | Team e istruzioni in italiano, codice in inglese | Scelto dall'utente |
| 2026-11-05 | Repo GitHub **privata**, solo a fine progetto e su richiesta esplicita | Richiesta dell'utente |
| 2026-11-05 | Posizionamento **B "Architectural Minimal"**: reggiseni 95–150 €, costruzione a vista, palette neri/grigi, niente pizzo romantico | Raccomandazione fashion-expert, scelta dall'utente (vedi `docs/research/product-positioning.md`) |
| 2026-11-05 | Carattere edgy del sito: **grezzo, tipo Rick Owens** (grafica cruda, contrasti forti) | Scelta dall'utente, preferita alla via "silenziosa" tipo The Row |
| 2026-11-05 | Taglie: **fascia + coppa EU** (65–95, A–G) per reggiseni strutturati; **XS–3XL** per bralette, slip, body, accessori | Raccomandazione fashion-expert, scelta dall'utente |
| 2026-11-05 | Target: **linea donna** | Scelta dall'utente |
| 2026-11-05 | **Fase 1 (Ricerca) approvata** | Ok dell'utente |
| 2026-11-05 | Nuovi agenti: **qa-tester**, **legal-compliance**, **visual-content** | Scelti dall'utente per coprire test, compliance UE e immagini |
| 2026-11-05 | CLAUDE.md: team come elenco per fase, sezione Comandi (da compilare in fase 6), stack da confermare prima della fase 6 | Ottimizzazioni scelte dall'utente |
| 2026-11-05 | Direzione visiva: **A MONOLITE** (fondo cemento #E6E4DF, testo #111111, titoli condensati enormi, griglia a vista) + **disegni tecnici dei capi** (da C) come placeholder | Raccomandazione art-director, scelta dall'utente (vedi `docs/brand/visual-directions.md`) |
| 2026-11-05 | Tono di voce: **A "SPEC"** come base, **C "MANIFESTO"** solo in pochi punti editoriali (home, drop, About, 404) | Raccomandazione copywriter, scelta dall'utente (vedi `docs/brand/tone-of-voice.md`) |
| 2026-11-05 | Colore d'accento: **arancio segnale #FF4F00**, solo per dettagli, mai come colore del testo su fondo chiaro; contrasti da verificare con accessibility-auditor | Scelta dall'utente |
| 2026-11-05 | Carrello chiamato **Borsa / Bag** (es. `BORSA [0]` / `BAG [0]`) | Raccomandazione copywriter, scelta dall'utente |
| 2026-11-05 | Logotipo: **solo testo** "LINGERAI" nel font dei titoli, maiuscolo (sostituibile in futuro) | Scelta dall'utente |
| 2026-11-05 | Primo drop: **GRID / 01**, collezioni a drop numerati | Raccomandazione fashion-expert, scelta dall'utente |
| 2026-11-05 | Italiano: **tu**; inglese **britannico** | Scelta dall'utente |
| 2026-11-05 | **Fase 2 (Direzione creativa) approvata** | Ok dell'utente |
| 2026-11-05 | UX D1–D6 come proposte: borsa = pannello laterale + pagina `/borsa` di riserva; GRID / 01 voce a sé nel menu; niente ricerca nel primo rilascio; nessun campo carta nel checkout; URL tradotti in italiano; striscia "Demo" su tutte le pagine | Raccomandazioni ux-reviewer, accettate dall'utente (vedi `docs/ux/purchase-flow.md`) |
| 2026-11-05 | Arancio #FF4F00 **solo come fondo pieno con testo #111111** (5,73:1); mai come testo o indicatore su fondo cemento | Conflitto C1 a11y vs direzione visiva, scelta dall'utente (vedi `docs/design/a11y-early-check.md`) |
| 2026-11-05 | Titoli tagliati dal bordo **solo da 768 px in su**; su mobile titolo intero con altezza massima | Conflitto C2, scelta dall'utente |
| 2026-11-05 | Due livelli di linea (decorativa chiara per la griglia, scura per i bordi dei controlli) e testo grigio solo da 14 px in su | Conflitti C3–C4, scelti dall'utente |
| 2026-11-05 | **Fase 3 (Struttura e UX) approvata** | Ok dell'utente |
| 2026-11-05 | Fondo riquadri immagine/disegni tecnici: **Cemento #E6E4DF con griglia** (non Cassaforma) | Incoerenza tra art-director e visual-content, scelta dall'utente |
| 2026-11-05 | Logotipo in header a **32 px** (font condensato mai sotto 32 px) | Conflitto N1, scelta dall'utente |
| 2026-11-05 | Striscia demo **arancio #FF4F00 con testo #111111**; arancio anche per i tag "errore" e "aggiunto" (sempre fondo pieno) | Conflitti N2–N3, scelta dall'utente |
| 2026-11-05 | Accettate: paragrafi Archivo + dati JetBrains Mono; campi obbligatori con frase in cima + "(facoltativo)"; frecce galleria su mobile; max 2 elementi sticky; griglia visibile nei disegni; legende disegni bilingue in HTML; foto future delle trasparenze con styling + still-life | Raccomandazioni art-director / visual-content / a11y, accettate dall'utente |
| 2026-11-05 | K1: numeri/lettere dei disegni tecnici **ingranditi negli SVG** + bottone **"Ingrandisci"** (disegno a schermo intero) | Conflitto a11y, scelta dall'utente (vedi `docs/design/a11y-design-system-review.md`) |
| 2026-11-05 | K2–K4: "esaurito" scritto anche nell'etichetta del colore; frecce galleria nascoste a inizio/fine invece che grigie; **niente texture cemento**, fondo piatto | Raccomandazioni accessibility-auditor, accettate dall'utente |
| 2026-11-05 | **Fase 4 (Design system) approvata** | Ok dell'utente |
| 2026-11-05 | Claim homepage: **"Costruzione a vista." / "Construction, exposed."** | Scelta dall'utente (preferito a "Niente pizzo. Niente scuse.", raccomandato dal copywriter) |
| 2026-11-05 | Nomi prodotto: GRID→**RASTER**, SHEER→**PLUMB**, FRAME→**BEAM**, LINE→**STRUT**; confermati AXIS, PLANE, MONOLITH, VOID, TENSION, HOLD | Raccomandazione copywriter, accettata dall'utente; salvo segnalazioni del legal-compliance |
| 2026-11-05 | Taglie lettera **XS–3XL per tutti i capi** non a fascia+coppa (il catalogo va allineato) | Scelta dall'utente |
| 2026-11-05 | Menu IT "Chi siamo" / EN "About"; toni nude "Pelle 01/02/03"; "Non inserire dati reali" nel checkout; conferma "Ricevuto."; prezzi con due decimali | Raccomandazioni copywriter, accettate dall'utente; striscia demo soggetta al parere legal-compliance |
| 2026-11-05 | La demo resta **locale o protetta da password**: privacy e termini minimi, nessun titolare indicato | Scelta dall'utente (vedi `docs/legal/compliance-review.md` Q1); da rivedere se si decide di pubblicarla |
| 2026-11-05 | **MONOLITH tenuto per la demo** (omonimo di una linea Calvin Klein): da cambiare prima di qualsiasi uso pubblico | Scelta dall'utente, rischio segnalato da legal-compliance |
| 2026-11-05 | Conferma ordine: si tengono **"Ricevuto."** e il riepilogo con l'indirizzo; il testo deve però spiegare che è una demo e che i dati restano solo in questa scheda del browser. Checkbox dei termini mai pre-spuntata | Scelta dall'utente; correzione minima per evitare la contraddizione segnalata da legal-compliance |
| 2026-11-05 | **Analytics sì**: servizio da scegliere in fase 6 con l'utente (preferibile soluzione senza cookie; altrimenti serve banner cookie con consenso) | Scelta dall'utente |
| 2026-11-05 | Correzioni legal-compliance applicate senza scelta: striscia demo dice anche "niente è in vendita"; "IVA inclusa"; "demo" nelle pagine resi/spedizioni; omessi riciclato, nichel-free, origine, confezione; composizione reggiseni per coppe e dorso | Obblighi o buone pratiche segnalati da legal-compliance |
| 2026-11-05 | URL About IT: **/it/chi-siamo** | Scelta dall'utente |
| 2026-11-05 | **Fase 5 (Testi) approvata** | Ok dell'utente |
| 2026-11-05 | Stack **confermato**: Next.js (App Router) + TypeScript, dati locali, borsa nel browser, nessun backend | Conferma dell'utente prima della fase 6 |
| 2026-11-05 | Librerie: **minimo indispensabile** — next, react, react-dom, @fontsource-variable/archivo, @fontsource/jetbrains-mono; CSS Modules + custom properties; i18n con JSON nostri (messages/it.json, en.json); borsa con React context + localStorage | Scelta dall'utente |
| 2026-11-05 | Test end-to-end con **Playwright** (solo devDependency) | Scelta dall'utente |
| 2026-11-05 | **Fase 6 tappa A approvata** (fondamenta, catalogo, pagine di navigazione); avvio tappa B | Ok dell'utente |
