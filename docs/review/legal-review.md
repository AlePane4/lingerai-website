# LINGERAI — Revisione legale e di compliance (Fase 7)

> Autore: `legal-compliance` · Data: 2026-11-05 · Stato: **parere**
> Cosa ho controllato: `src/messages/it.json` e `en.json`, `src/data/products.ts`, `src/data/editorialImages.ts`, i componenti di checkout, conferma, pagine informative e crediti, `next.config.ts`, `robots.ts` / `site.ts` e le 15 foto in `public/images/editorial/` (guardate una per una). Riferimenti: `docs/decisions.md`, `docs/legal/compliance-review.md`, `docs/visual/image-sources.md`.
> Ho letto i file sorgente invece di fare richieste su localhost: i testi sono quelli che il sito mostra. Non ho modificato nessun file del progetto.

**Avvertenza.** Non sono un avvocato e LINGERAI è una demo. Qui trovi buone pratiche e rischi, non una consulenza legale. Prima di qualsiasi pubblicazione serve una **verifica legale professionale**, soprattutto su diritti d'immagine, privacy e marchi.

Legenda: **[OBBLIGO]** obbligo di legge per un sito reale o per una demo pubblicata · **[BP]** buona pratica · **[SUGG]** suggerimento.

---

## 0. Sintesi

- **Le correzioni della fase 5 sono quasi tutte applicate** (vedi §1): la striscia demo dice "niente è in vendita", il checkout dice "Non inserire dati reali" e ha la checkbox non spuntata, la conferma è coerente con il `sessionStorage`, c'è "IVA inclusa", i resi e le spedizioni dicono "demo", non ci sono claim su riciclato, nichel-free od origine, i reggiseni hanno la composizione per coppe e dorso, FRAME e SHEER sono stati rinominati.
- **Nuovi problemi da sistemare nella demo (priorità alta/media):**
  1. La pagina Privacy mostra in chiaro il segnaposto `[ANALYTICS — DA DEFINIRE IN FASE 6 …]`.
  2. I Termini dicono ancora "Le immagini sono disegni tecnici provvisori / segnaposto": non è più vero, il sito usa foto di terzi.
- **Foto:** nessun contenuto esplicito e nessuna persona che sembri minorenne. Il tono "sexy grunge" resta entro i limiti decisi. Nella demo **locale o protetta** il rischio è accettabile. Se la demo **diventa pubblica**, il rischio sale: 7 foto mostrano volti riconoscibili senza liberatoria, in un contesto di lingerie e accanto ai nomi del brand (diritto all'immagine; licenza Pexels, che vieta di far credere che le persone ritratte approvino il prodotto).
- **Pagina crediti:** per la licenza Pexels va bene, perché l'attribuzione non è obbligatoria e il link alla licenza c'è. Consiglio di aggiungere una frase sull'endorsement.

---

## 1. Verifica delle correzioni del report precedente

| Rif. | Correzione richiesta | Stato | Dove l'ho verificata |
|---|---|---|---|
| M1 | Striscia demo con "niente è in vendita" | ✅ applicata | `demo.strip.text` IT "Demo — sito dimostrativo. Niente è in vendita, nessun pagamento verrà effettuato." / EN "…Nothing is for sale, no payment will be taken."; `DemoStrip` montata in `app/[lang]/layout.tsx`, quindi su tutte le pagine; anche nel footer (`demo.footer`) |
| M2 | "Non inserire dati reali" anche vicino ai campi | ✅ applicata | `demo.banner.checkout` in cima, più `checkout.dataWarning` "Usa i dati di esempio: non inserire i tuoi." accanto al bottone "Compila con dati di esempio" (`CheckoutForm.tsx` r. 217) |
| M3 | Checkbox non pre-spuntata | ✅ applicata | `useState(false)`; nemmeno "Compila con dati di esempio" la spunta (commento r. 116). Il testo è rimasto "Accetto i termini della demo" e "privacy" è solo un link informativo separato: era l'alternativa accettabile |
| A2 / A3 | Conferma coerente con `sessionStorage`; niente "Spedizione a" | ✅ applicata (secondo la decisione utente) | `demo.banner.confirmation` e `confirmation.dataNote` spiegano che i dati restano solo nella scheda; `deliveryTo` = "Indirizzo inserito (demo)"; `demoSession.ts` usa solo `sessionStorage`; nel codice non c'è nessun `fetch` o beacon. "Ricevuto." resta, come deciso dall'utente |
| §2 | La privacy descrive cosa resta nel browser | ✅ applicata | `privacy.browser.bag / lang / session`, con durata e bottone "Cancella i dati della demo". **Però** vedi N1 (segnaposto analytics) e N3 (manca la frase "nessun cookie") |
| M6 | "IVA inclusa" | ✅ applicata | `price.vatNote` nella scheda prodotto, `bag.summary.vatNote` nella borsa, `checkout.summary.demoNote` nel checkout, Express "12,00 €, IVA inclusa" |
| M4 | "Demo" su resi e spedizioni e nelle rassicurazioni | ✅ applicata | `product.reassure.returns` / `home.reassure.returns` "Resi 30 giorni (demo)", `demo.bagNote`, `sizeGuide.returnsLink`, `returns.window.body`, titoli "Spedizioni (demo)" / "Resi (demo)", `info.disclaimer` in cima a ogni pagina informativa |
| M5 | `returns.legal` neutro | ✅ applicata | "In un negozio reale questa pagina conterrebbe le informazioni sul diritto di recesso previste dalla legge." |
| M13 | Termini: niente offerta al pubblico, niente contratto | ✅ applicata | `terms.sale.body`. Il blocco "Contenuti" invece è da correggere: vedi N2 |
| A4 | Niente riciclato, nichel-free, origine, confezione | ✅ applicata | Cercando "riciclat / recycled / nichel / nickel / Made in / origine / confezione / DA CONFERMARE" non risulta nulla di visibile. `product.fit.model` contiene ancora `[DA CONFERMARE …]`, ma nessun componente lo usa: va bene, purché resti così (vedi B-3) |
| M7 / M8 | Reggiseni con composizione per coppe e dorso; righe intitolate alla parte del capo, non a "Microfibra" | ✅ applicata | AXIS "Coppe e dorso", PLANE "Coppe, esterno e interno" + "Dorso", RASTER "Coppe e dorso", STRUT "Coppe, esterno e interno, e dorso"; slip e body con "Corpo / Banda frontale / Fianchi / Tassello". "Microfibra" compare solo nelle descrizioni ✔. Nomi delle fibre conformi all'All. I del Reg. 1007/2011 ✔ |
| B3 | "Gommato" su TENSION | ✅ applicata | Nessuna occorrenza; la categoria dice "elastico piatto" |
| A5 / M10 | FRAME e SHEER rinominati | ✅ applicata | Ora BEAM e PLUMB; nessuna occorrenza di FRAME o SHEER come nome prodotto |
| M11 | MONOLITH | ⚠️ tenuto per scelta dell'utente | Va cambiato prima di qualsiasi uso pubblico (decisione del 2026-11-05) |
| M9 | Fasce di taglia coerenti | ✅ | Decisione "XS–3XL per tutti"; i testi dicono XS–3XL. Non ho ricontrollato le taglie una per una nel catalogo: lo verifica il `qa-tester` |
| B12 | Font self-hosted, nessun servizio terzo | ✅ | `@fontsource` locale, immagini da `/public` con `next/image` (senza `remotePatterns`), nessun analytics nel codice. **Quindi oggi non serve nessun banner cookie** |
| — | Indicizzazione | ✅ | `ALLOW_INDEXING = false`: `robots.txt` blocca tutto e c'è un `noindex` globale. Ottima tutela finché la demo non è pubblica |

---

## 2. Problemi trovati

### Priorità ALTA

| # | Dove | Perché è un rischio | Correzione proposta | Tipo |
|---|---|---|---|---|
| N1 | Pagina Privacy, sezione "Statistiche": `privacy.analytics.body` (IT/EN), resa da `InfoPage.tsx` r. 90 | Il sito mostra in chiaro `[ANALYTICS — DA DEFINIRE IN FASE 6: servizio, dati raccolti, durata, eventuale consenso.]`. La fase 6 è chiusa e nel codice non c'è nessun analytics. Un'informativa con un segnaposto non è trasparente (GDPR artt. 5(1)(a) e 12) e fa sembrare la demo non finita. | **Finché non c'è nessun servizio:** sostituire con una frase vera, es. "Nessuna statistica, nessun cookie, nessun servizio di terzi." / "No analytics, no cookies, no third-party services." (testo finale del `copywriter`). **Quando si sceglierà un servizio di analytics:** riscrivere la sezione (nome del servizio, dati raccolti, durata, sede o trasferimenti extra-UE) e, se usa cookie o identificatori non tecnici, aggiungere un banner di consenso (art. 5(3) Dir. 2002/58/CE; Garante, Linee guida cookie 10.06.2021). | [BP] nella demo; [OBBLIGO] se pubblica |

### Priorità MEDIA

| # | Dove | Perché è un rischio | Correzione proposta | Tipo |
|---|---|---|---|---|
| N2 | Termini: `terms.content.body` ("Le immagini sono disegni tecnici provvisori") e `terms.ip.body` ("Testi, nomi e disegni sono del progetto LINGERAI. Le immagini sono segnaposto.") | Non è più vero: home, drop, categorie e Chi siamo usano 15 foto di autori terzi. Letto così, il testo potrebbe far pensare che anche le foto siano del progetto. È un'affermazione inesatta sulla titolarità di contenuti altrui. | `terms.content.body`: "…Nelle schede prodotto ci sono disegni tecnici provvisori; le foto editoriali non mostrano capi LINGERAI." `terms.ip.body`: "Testi, nomi e disegni tecnici sono del progetto LINGERAI. Le foto editoriali sono di autori terzi, con licenza Pexels: → Crediti foto." | [BP] |
| N3 | Privacy: manca la frase sui cookie (§2 del report precedente) | Senza una sezione "Cookie", chi legge non sa se ce ne sono. Il Garante chiede di descrivere anche gli strumenti tecnici. | Può confluire nella frase di N1: "Nessun cookie, nessuna statistica, nessun servizio di terzi. Il sito usa solo la memoria del browser per borsa, lingua e checkout." | [BP] |
| N4 | Pagina crediti, `credits.intro` (testo scritto dallo sviluppatore, mai revisionato dal `copywriter`) | Il contenuto è corretto: licenza Pexels, attribuzione non obbligatoria, conversione in B/N dichiarata, "non mostrano capi LINGERAI", "le persone ritratte non sono legate al brand". Manca però la frase che la licenza Pexels chiede di non contraddire: le persone ritratte **non approvano** il prodotto (divieto di endorsement). Il testo non è passato dal `copywriter`: tono e coerenza IT/EN vanno verificati ("Licenza Pexels" / "Pexels Licence"). | Aggiungere, es.: "…le persone ritratte non sono legate al brand e non ne approvano né indossano i prodotti." Far rivedere tutte le chiavi `credits.*` e `meta.credits.*` al `copywriter`. | [BP] |
| N5 | Foto con volti riconoscibili: `home-hero-grunge-a`, `home-editorial-2-c`, `drop-gallery-1`, `drop-gallery-2`, `category-briefs-a`, `category-bodysuits-a`, `about-portrait-a` | Pexels **non garantisce le liberatorie**. In Italia il ritratto di una persona non si espone senza il suo consenso (L. 633/1941 artt. 96–97; art. 10 c.c.), e la foto di un volto riconoscibile è un dato personale (GDPR). Il contesto lingerie e la vicinanza al nome del brand e ai prodotti aumentano il rischio: la licenza Pexels vieta di far credere che le persone approvino il prodotto. L'hero ("GRID / 01 · Costruzione a vista." sopra una persona in reggiseno) e il ritratto 60+ in "Chi siamo" (può sembrare la fondatrice) sono i casi più delicati. **In una demo locale o protetta il rischio è basso.** | Demo privata: nessuna azione obbligatoria. Prima di pubblicare: sostituire queste 7 foto con foto del brand (con liberatoria firmata e maggiore età documentata), oppure ottenere la liberatoria tramite l'autore, oppure usare solo le foto senza volti riconoscibili (bras, slips, accessories, drop-hero, drop-gallery-3, atelier, home-editorial). | [OBBLIGO] se pubblica; — nella demo privata |

### Priorità BASSA

| # | Dove | Perché è un rischio | Correzione proposta | Tipo |
|---|---|---|---|---|
| B-1 | Tono "sexy grunge" (verifica visiva delle 15 foto) | **Nessun contenuto esplicito**: niente nudo, niente capezzoli o genitali visibili; la mesh dell'hero copre un reggiseno coprente; nessuna posa allusiva. **Nessuna persona che sembri minorenne.** I casi più vicini al limite: (a) `drop-gallery-2`: body sgambato, inquadratura che arriva alle cosce, posa sensuale ma non centrata sull'inguine; il titolo su Pexels dice "young" (giovane, non minorenne); (b) `category-bodysuits-a`: viso molto giovane, ma persona adulta; l'età non è documentata. Sono adatte a una demo; per un sito pubblico di lingerie la prassi è avere sempre la **maggiore età documentata** (release). | Nella demo nessuna azione. Nelle linee guida di `visual-content` aggiungere: per le foto con persone in intimo, solo modelle con età e liberatoria documentate. In caso di dubbio, preferire foto senza volto (come già fatto escludendo la candidata "e"). | [BP] |
| B-2 | Alt text e didascalie dei crediti | Corretti: descrivono la scena e il capo, non il corpo. "Pelliccia" in `home.editorial2.image.alt` non implica nessun claim del brand. | Nessuna. | — |
| B-3 | `product.fit.model` = "[DA CONFERMARE …]" in `it.json` / `en.json` | Oggi non viene mostrato. Se un giorno si aggiungono le foto dei prodotti e la chiave viene usata, il segnaposto finirebbe online. | Tenere il controllo di build "nessun DA CONFERMARE / TO BE CONFIRMED" previsto in `products.md` §7 ed estenderlo ai file `messages`, o rimuovere la chiave finché non serve. | [SUGG] |
| B-4 | Font Archivo e JetBrains Mono (licenza OFL) | Self-hosted, con la licenza salvata in `src/styles/fonts/`. L'OFL non richiede crediti visibili sul sito. | Facoltativo: aggiungere una riga "Font: Archivo, JetBrains Mono — SIL Open Font License" nella pagina crediti. | [SUGG] |
| B-5 | Pagina crediti senza data e senza disclaimer demo | Le altre pagine informative hanno "Ultimo aggiornamento · Demo" e il disclaimer in cima. Non è un obbligo. | Facoltativo: aggiungere `info.updated` per coerenza. | [SUGG] |

---

## 3. Checklist delle pagine e dei testi legali (stato attuale)

| Pagina / testo | Stato | Note |
|---|---|---|
| Striscia demo su tutte le pagine | presente | ✔ "Niente è in vendita" |
| Footer demo | presente | ✔ |
| Banner checkout + avviso vicino ai campi | presente | ✔ |
| Checkbox termini non pre-spuntata | presente | ✔ |
| Nessun campo carta / pagamento simulato | presente | ✔ |
| Conferma ordine (banner, nota dati, "Indirizzo inserito (demo)") | presente | ✔ coerente con `sessionStorage` |
| "IVA inclusa" | presente | ✔ scheda, borsa, checkout |
| Spedizioni (demo) | presente | ✔ |
| Resi (demo) | presente | ✔ |
| Contatti (demo) | presente | ✔ per la demo privata |
| Termini della demo | da correggere | N2 (immagini) |
| Privacy | da correggere | N1 (segnaposto analytics), N3 (cookie) |
| Crediti foto | presente, da rifinire | N4 (endorsement + revisione del copywriter) |
| Banner cookie | non necessario oggi | Diventa necessario se si aggiunge un analytics con cookie o servizi terzi |
| Composizione tessile (Reg. 1007/2011) | presente | ✔ per parti, nomi delle fibre conformi |
| Istruzioni di cura | presente | ✔ |
| Claim ambientali, di origine o nichel-free | assenti | ✔ |
| Nomi prodotto | presente | ✔ BEAM, PLUMB; ⚠️ MONOLITH da cambiare prima di un uso pubblico |
| Liberatorie per le foto con persone | mancanti | Accettabile solo per la demo privata (N5) |
| Titolare, contatto reale, log dell'hosting, diritti GDPR | mancanti | Non servono per la demo privata; **obbligatori** se pubblica (vedi §4) |
| Recesso, informazioni precontrattuali, dati del venditore, ODR/ADR | non applicabili | Obbligatori solo per un negozio reale |

---

## 4. Checklist "Prima di pubblicare"

Da completare **tutta** se la demo un giorno va online, anche solo come portfolio o su un link condiviso senza password.

**Privacy e dati**
- [ ] Indicare nella Privacy e nei Termini il **titolare** (nome) e un **contatto reale** (email dedicata), con i **diritti dell'interessato** e il **reclamo al Garante** (GDPR art. 13).
- [ ] Descrivere i **log tecnici dell'hosting**: quali dati (IP, user agent, orario), chi è il fornitore, dove sono i server ed eventuali trasferimenti extra-UE, per quanto tempo restano, base giuridica (legittimo interesse). Correggere "Il sito non invia… " in modo che resti esatto.
- [ ] **Analytics**: scegliere il servizio, preferibilmente senza cookie e con server UE; aggiornare la sezione Statistiche. Se usa cookie o identificatori non tecnici: **banner di consenso** con "Rifiuta" allo stesso livello di "Accetta" e nessuna casella pre-spuntata.
- [ ] Controllare che non arrivino servizi terzi nascosti: font da CDN, immagini da URL remoti, video incorporati, telemetria dell'hosting (es. "Speed Insights"). Se ci sono, vanno in privacy ed eventualmente nel banner.
- [ ] Valutare una **protezione con password** come alternativa più leggera: in quel caso la privacy può restare minima.

**Immagini e persone**
- [ ] Sostituire le **7 foto con volti riconoscibili** (N5) con foto del brand con **liberatoria firmata e maggiore età documentata**, oppure ottenere la liberatoria dai fotografi; altrimenti usare solo foto senza volti riconoscibili.
- [ ] Ricontrollare le altre 8 foto su Pexels: la pagina esiste ancora? La licenza è ancora quella? Salvare una copia della pagina della licenza con la data.
- [ ] Assicurarsi che nessuna foto sia presentata come prodotto LINGERAI o come testimonial (crediti con la frase sull'endorsement, N4). Il ritratto in "Chi siamo" non deve sembrare la fondatrice.
- [ ] Se si usano immagini generate con AI: dichiararlo (AI Act art. 50).

**Marchi e nomi**
- [ ] **Rinominare MONOLITH** (decisione già presa).
- [ ] Fare una ricerca di anteriorità su EUIPO / TMview / UIBM per LINGERAI, i nomi prodotto (AXIS, PLANE, RASTER, STRUT, BEAM, PLUMB, VOID, TENSION, HOLD) e GRID / 01, e chiedere un parere sulla registrabilità di LINGERAI.
- [ ] Controllare che il dominio non contenga marchi altrui.

**Testi**
- [ ] Correggere N1–N4. Cercare in tutto il sito i segnaposto `[DA CONFERMARE` / `[TO BE CONFIRMED` / `[ANALYTICS` e far fallire la build se ne trova.
- [ ] Mantenere ovunque "demo" e "niente è in vendita". Se il sito diventa un negozio vero, **tutto** va riscritto da un legale: condizioni di vendita, recesso di 14 giorni e modulo, esclusione igienica spiegata con precisione, dati del venditore (ragione sociale, P.IVA, sede, PEC), ODR/ADR, garanzia legale.
- [ ] Datare le pagine legali (`info.updated`) al giorno della pubblicazione.

**Tecnico**
- [ ] `ALLOW_INDEXING`: lasciarlo a `false` se si vuole solo un link condiviso; metterlo a `true` solo dopo questa checklist. Impostare `NEXT_PUBLIC_SITE_URL`.
- [ ] HTTPS attivo e, se la demo è protetta, password non banale.
- [ ] **Verifica legale professionale** di privacy, termini e immagini prima del go-live.

---

## 5. Domande aperte per l'utente

1. **Q1 — Analytics:** fino a quando non scegliamo un servizio, va bene che la Privacy dica "nessuna statistica, nessun cookie" (N1)? Così nella demo non serve nessun banner.
2. **Q2 — Foto con volti riconoscibili:** per la demo privata le teniamo (rischio basso), oppure preferisci già ora ridurle a quelle senza volto per l'hero e per "Chi siamo", che sono le più esposte?
3. **Q3 — Pubblicazione:** c'è già un'idea di data o di modalità (link con password, portfolio pubblico)? Da questo dipende quanta parte della checklist §4 diventa obbligatoria.
4. **Q4 — Crediti:** vuoi aggiungere anche i font (OFL) e una data di aggiornamento nella pagina crediti (B-4, B-5)?

---

## Fonti

- Pexels License, consultata il 2026-11-05: https://www.pexels.com/license/ (uso gratuito, attribuzione non obbligatoria; vietati: mostrare persone identificabili in modo offensivo, far credere che approvino il prodotto, rivendere copie non modificate, usare le foto come marchio).
- L. 22 aprile 1941 n. 633, artt. 96–97 (ritratto); Codice civile art. 10 (abuso dell'immagine altrui).
- Reg. (UE) 2016/679 (GDPR), artt. 4, 5, 6, 12, 13; Dir. 2002/58/CE art. 5(3); Garante privacy, Linee guida cookie 10.06.2021; EDPB Linee guida 2/2023.
- Reg. (UE) 1007/2011, Allegati I e IV: https://eur-lex.europa.eu/eli/reg/2011/1007/oj
- Reg. (UE) 2024/1689 (AI Act), art. 50.
- Dir. 2011/83/UE; D.Lgs. 206/2005 (Codice del Consumo); D.Lgs. 70/2003 art. 7.
