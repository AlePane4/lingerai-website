# LINGERAI — Testi delle pagine (Fase 5, Testi)

> Autore: `copywriter` · Data: 2026-11-05 · Stato: **rivisto dopo le decisioni dell'utente e il report `docs/legal/compliance-review.md`**
> Base vincolante: `docs/decisions.md`. Registro **C "MANIFESTO"** solo in: drop GRID / 01, About ("Chi siamo"), 404. Home: claim in registro A, deciso dall'utente. Tutto il resto è **A "SPEC"**.
> Struttura delle pagine: `docs/ux/page-blueprints.md`. Microcopy comune: `docs/copy/ui-strings.md`. Prodotti: `docs/copy/products.md`.
> Convenzioni (chiavi, variabili, plurali, maiuscolo via CSS): `ui-strings.md` §0. `\n` = a capo voluto.
> Demo **locale o protetta da password** (decisione utente): privacy e termini minimi, nessun titolare indicato. Da rivedere se la demo viene pubblicata.

---

## 0. Metadati (titolo e descrizione per pagina)

Formato titolo: `{page} — LINGERAI`. Descrizioni ≤ 155 caratteri.

| Chiave | IT | EN |
|---|---|---|
| `meta.home.title` | LINGERAI — Costruzione a vista. | LINGERAI — Construction, exposed. |
| `meta.home.description` | Lingerie costruita: cuciture a vista, mesh, microfibra opaca. Drop GRID / 01, 13 pezzi. Sito demo, niente è in vendita. | Built lingerie: exposed seams, mesh, matt microfibre. Drop GRID / 01, 13 pieces. Demo site, nothing for sale. |
| `meta.drop.title` | GRID / 01 — LINGERAI | GRID / 01 — LINGERAI |
| `meta.drop.description` | GRID / 01: 13 pezzi su linee rette e cuciture a vista. Reggiseni, slip, body, sottovesti, accessori. Demo. | GRID / 01: 13 pieces built on straight lines and exposed seams. Bras, briefs, bodysuits, slips, accessories. Demo. |
| `meta.category.title` | {category} — LINGERAI | {category} — LINGERAI |
| `meta.category.description` | {category} LINGERAI dal drop GRID / 01. {intro} | LINGERAI {category} from drop GRID / 01. {intro} |
| `meta.product.title` | {name} {type} — LINGERAI | {name} {type} — LINGERAI |
| `meta.product.description` | {description} | {description} |
| `meta.bag.title` | Borsa — LINGERAI | Bag — LINGERAI |
| `meta.checkout.title` | Checkout demo — LINGERAI | Demo checkout — LINGERAI |
| `meta.confirmation.title` | Ordine demo ricevuto — LINGERAI | Demo order received — LINGERAI |
| `meta.sizeGuide.title` | Guida taglie — LINGERAI | Size guide — LINGERAI |
| `meta.sizeGuide.description` | Come misurarti e trovare la taglia: fascia e coppa EU 65–95 A–G, lettere XS–3XL, conversioni IT, UK, US. | How to measure and find your size: EU band and cup 65–95 A–G, letter sizes XS–3XL, IT, UK and US conversions. |
| `meta.about.title` | Chi siamo — LINGERAI | About — LINGERAI |
| `meta.about.description` | LINGERAI tratta la lingerie come costruzione. Progetto dimostrativo. | LINGERAI treats lingerie as construction. A demo project. |
| `meta.shipping.title` | Spedizioni (demo) — LINGERAI | Shipping (demo) — LINGERAI |
| `meta.returns.title` | Resi (demo) — LINGERAI | Returns (demo) — LINGERAI |
| `meta.terms.title` | Termini della demo — LINGERAI | Demo terms — LINGERAI |
| `meta.privacy.title` | Privacy — LINGERAI | Privacy — LINGERAI |
| `meta.contact.title` | Contatti (demo) — LINGERAI | Contact (demo) — LINGERAI |
| `meta.notFound.title` | Pagina non trovata — LINGERAI | Page not found — LINGERAI |

Checkout, conferma e borsa: `noindex` (da `performance-seo`).

---

## 1. Home

Claim **deciso**: "Costruzione a vista." / "Construction, exposed."

| Chiave | IT | EN | Note |
|---|---|---|---|
| `home.hero.label` | Drop — GRID / 01 | Drop — GRID / 01 | etichetta visibile ≥768 accanto al muro |
| `home.hero.wall` | GRID / 01 | GRID / 01 | muro `aria-hidden`; l'`h1` contiene lo stesso testo |
| `home.hero.claim` | Costruzione a vista. | Construction, exposed. | |
| `home.hero.sub` | 13 pezzi. Linee rette. Cuciture a vista. Niente fiocchi. | 13 pieces. Straight lines. Seams out. No bows. | la punta "manifesto" resta qui |
| `home.hero.cta` | Vedi il drop | View the drop | bottone secondario |
| `home.drop.title` | Dal drop | From the drop | sopra la griglia 6–8 card |
| `home.drop.all` | Tutti i {count} pezzi → | All {count} pieces → | `{count}` = 13 |
| `home.categories.title` | Categorie | Categories | |
| `home.editorial.label` | Guida ai modelli | Fit guide | |
| `home.editorial.body` | Ogni pezzo nasce come disegno tecnico. Quote, cuciture e materiali sono visibili prima di scegliere. | Every piece starts as a technical drawing. Measurements, seams and materials are on show before you choose. | |
| `home.editorial.link` | Guida taglie → | Size guide → | MVP; POI: "Guida ai modelli →" / "Fit guide →" |
| `home.reassure.shipping` | Spedizione demo 2–4 giorni | Demo delivery in 2–4 days | |
| `home.reassure.returns` | Resi 30 giorni (demo) | 30-day returns (demo) | |
| `home.reassure.materials` | Trasparenza dichiarata su ogni pezzo | Sheerness stated on every piece | (B5: non presentare un obbligo come pregio) |
| `home.reassure.demo` | Sito demo: niente è in vendita | Demo site: nothing for sale | |

---

## 2. Drop GRID / 01 (registro C nell'intro)

| Chiave | IT | EN | Note |
|---|---|---|---|
| `drop.label` | Drop — GRID / 01 | Drop — GRID / 01 | |
| `drop.wall` | GRID / 01 | GRID / 01 | `h1` |
| `drop.count` | [{count}] | [{count}] | `aria-hidden`; SR `drop.count.sr_*` |
| `drop.count.sr_one` | {count} pezzo | {count} piece | |
| `drop.count.sr_other` | {count} pezzi | {count} pieces | |
| `drop.intro` | Linee rette. Cuciture a vista. Mesh trasparente contro bande opache.\nIl corpo come spazio, non come decorazione.\nNiente fiocchi. Niente pizzo. Tredici pezzi. | Straight lines. Seams out. Sheer mesh against opaque bands.\nThe body as space, not decor.\nNo bows. No lace. Thirteen pieces. | 3 righe; su mobile le prime 2 + `drop.readMore` |
| `drop.readMore` | Leggi → | Read on → | disclosure |
| `drop.sets.title` | Set | Sets | blocco facoltativo in fondo |
| `drop.sets.body` | Quattro coppie coordinate. Ogni pezzo si compra da solo, nella sua taglia. | Four matching pairs. Each piece is sold on its own, in its own size. | |
| `drop.sets.pair` | → `set.*` in `products.md` §1.6 | → idem | AXIS · PLANE · RASTER · STRUT + BEAM |

---

## 3. Categorie (intro brevissime, registro A)

| Chiave | IT | EN |
|---|---|---|
| `category.bras.title` | Reggiseni | Bras |
| `category.bras.intro` | Triangolo, balconette, bralette, coppa morbida. Taglie 65–95 A–G e XS–3XL. | Triangle, balconette, bralette, soft cup. Sizes 65–95 A–G and XS–3XL. |
| `category.briefs.title` | Slip | Briefs |
| `category.briefs.intro` | Vita media, perizoma, vita alta, culotte. XS–3XL. Tassello in cotone su tutti. | Mid rise, thong, high waist, shorty. XS–3XL. Cotton gusset on every one. |
| `category.bodysuits.title` | Body | Bodysuits |
| `category.bodysuits.intro` | Microfibra opaca o mesh trasparente. XS–3XL. Si indossano anche come top. | Matt microfibre or sheer mesh. XS–3XL. Both work as tops. |
| `category.slips.title` | Sottovesti | Slips |
| `category.slips.intro` | Jersey di seta. Taglio dritto. XS–3XL. | Silk jersey. Straight cut. XS–3XL. |
| `category.accessories.title` | Accessori | Accessories |
| `category.accessories.intro` | Harness e reggicalze. Metallo opaco, elastico piatto. XS–3XL. | Harness and suspender belt. Matt metal, flat elastic. XS–3XL. |
| `category.seeAlso` | Vedi anche | See also |
| `category.prevNext` | ← {prev} · {next} → | ← {prev} · {next} → |
| `category.empty` | Nessun pezzo in questa categoria nel drop attuale. | No pieces in this category in the current drop. |
| `category.empty.cta` | Vedi GRID / 01 | View GRID / 01 |

---

## 4. Scheda prodotto

Testi in `ui-strings.md` §8 e `products.md`. Sotto il prezzo: `price.vatNote`.

## 5. Borsa (pagina `/it/borsa`)

Stesso contenuto del pannello (`ui-strings.md` §10). Titolo pagina = `bag.title` + contatore.

## 6. Checkout e conferma

Tutto in `ui-strings.md` §11–§12. Conferma: si tengono "Ricevuto." e il riepilogo con l'indirizzo, con le frasi `confirmation.isDemo` e `confirmation.dataNote` (deciso).

## 7. Guida taglie (pagina `/it/guida-taglie`)

Stesso contenuto del pannello (`ui-strings.md` §9), più:

| Chiave | IT | EN |
|---|---|---|
| `sizeGuidePage.intro` | Due sistemi. Fascia e coppa EU per il reggiseno con ferretto. Lettere XS–3XL per tutto il resto. | Two systems. EU band and cup for the underwired bra. Letter sizes XS–3XL for everything else. |
| `sizeGuidePage.toc.bras` | Reggiseni | Bras |
| `sizeGuidePage.toc.letters` | Lettere | Letter sizes |
| `sizeGuidePage.toc.howTo` | Come misurarti | How to measure |

---

## 8. 404 (registro C)

| Chiave | IT | EN | Note |
|---|---|---|---|
| `notFound.wall` | 404 | 404 | muro `aria-hidden` |
| `notFound.h1` | Pagina non trovata | Page not found | `h1` accessibile |
| `notFound.line` | Qui non c'è niente. Nemmeno una cucitura. | Nothing here. Not a single seam. | `--type-body-l` |
| `notFound.cta` | Vedi GRID / 01 | View GRID / 01 | primario |
| `notFound.categories` | Oppure per categoria | Or by category | sopra le 5 categorie |
| `notFound.otherLang` | Questa pagina in italiano → | This page in English → | solo per la 404 senza lingua nell'URL |

---

## 9. Chi siamo / About (registro C)

| Chiave | IT | EN | Note |
|---|---|---|---|
| `about.wall` | LINGERAI | LINGERAI | muro, `aria-hidden` |
| `about.h1` | Chi siamo | About | `h1` accessibile |
| `about.manifesto` | LINGERAI tratta la lingerie come costruzione.\nUna cucitura è una linea. Una fascia è una trave. Un anello regge una tensione.\nNiente pizzo romantico. Niente fiocchi. Niente imbottiture che cambiano la forma.\nQuello che c'è, si vede.\nChi la indossa decide. Sotto una giacca, da sola, per nessuno. | LINGERAI treats lingerie as construction.\nA seam is a line. A band is a beam. A ring holds tension.\nNo romantic lace. No bows. No padding that rewrites the shape.\nWhat's there, shows.\nWhoever wears it decides. Under a jacket, on its own, for no one. | tolta "Quello che si vede, è dichiarato" (B9: senza origine dichiarata la promessa è troppo ampia) |
| `about.how.title` | Come lavoriamo | How we work | |
| `about.how.construction.title` | Costruzione | Construction | |
| `about.how.construction.body` | Ogni pezzo parte da un disegno tecnico. Cuciture, chiusure e metallo restano a vista. | Every piece starts as a technical drawing. Seams, fastenings and metal stay visible. | |
| `about.how.materials.title` | Materiali | Materials | |
| `about.how.materials.body` | Mesh, tulle, microfibra opaca, jersey di seta. Composizione per ogni parte del capo. Trasparente si chiama trasparente. | Mesh, tulle, matt microfibre, silk jersey. Composition for every part of the garment. Sheer is called sheer. | nessun claim su origine o fibre riciclate |
| `about.how.bodies.title` | Corpi | Bodies | |
| `about.how.bodies.body` | Taglie 65–95 A–G e XS–3XL. Nessuna parola su come dovrebbe essere un corpo. | Sizes 65–95 A–G and XS–3XL. Not one word on how a body should look. | coerente con il catalogo (tutti i capi in lettere XS–3XL) |
| `about.demo` | LINGERAI è un progetto dimostrativo. Niente è in vendita. | LINGERAI is a demo project. Nothing here is for sale. | |
| `about.cta` | Vedi GRID / 01 | View GRID / 01 | |

---

## 10–15. Pagine informative demo (registro A, layout di lettura)

Elementi comuni a tutte; `info.disclaimer` va **in cima**, sotto il titolo.

| Chiave | IT | EN |
|---|---|---|
| `info.updated` | Ultimo aggiornamento: {date} · Demo | Last updated: {date} · Demo |
| `info.disclaimer` | Questa pagina descrive un servizio simulato. Non è un'offerta e non è vincolante. | This page describes a simulated service. It isn't an offer and isn't binding. |
| `info.toc` | In questa pagina | On this page |
| `info.questions` | Domande? → Contatti | Questions? → Contact |

### 10. Spedizioni (demo)

| Chiave | IT | EN |
|---|---|---|
| `shipping.title` | Spedizioni (demo) | Shipping (demo) |
| `shipping.where.title` | Dove | Where |
| `shipping.where.body` | Nella demo: Italia, Austria, Belgio, Francia, Germania, Irlanda, Paesi Bassi, Portogallo, Spagna, Regno Unito. | In this demo: Italy, Austria, Belgium, France, Germany, Ireland, the Netherlands, Portugal, Spain, United Kingdom. |
| `shipping.methods.title` | Tempi e costi simulati | Simulated times and costs |
| `shipping.methods.standard` | Standard — 2–4 giorni lavorativi — gratuita. | Standard — 2–4 working days — free. |
| `shipping.methods.express` | Express — 1–2 giorni lavorativi — 12,00 €, IVA inclusa. | Express — 1–2 working days — €12.00, VAT included. |
| `shipping.methods.note` | Tempi e prezzi sono simulati. | Times and prices are simulated. |
| `shipping.tracking.title` | Tracciamento | Tracking |
| `shipping.tracking.body` | Nella demo nessun pacco parte davvero, quindi non c'è niente da tracciare. | In this demo no parcel ever leaves, so there's nothing to track. |

(Blocco "Confezione" tolto: nessun dato, nessun claim.)

### 11. Resi (demo)

| Chiave | IT | EN |
|---|---|---|
| `returns.title` | Resi (demo) | Returns (demo) |
| `returns.window.title` | 30 giorni | 30 days |
| `returns.window.body` | Nella demo, reso o cambio entro 30 giorni dalla consegna simulata. Cambio taglia gratuito, sempre nella demo. | In this demo, return or exchange within 30 days of the simulated delivery. Size exchanges are free, in the demo too. |
| `returns.hygiene.title` | Slip, body e igiene | Briefs, bodysuits and hygiene |
| `returns.hygiene.body` | Slip, perizomi, culotte e body si restituiscono solo con la protezione igienica intatta. | Briefs, thongs, shorties and bodysuits can only be returned with the hygiene liner intact. |
| `returns.how.title` | Come fare | How it works |
| `returns.how.body` | Nella demo non c'è niente da restituire: nessun ordine è reale. | In this demo there's nothing to send back: no order is real. |
| `returns.refund.title` | Rimborsi | Refunds |
| `returns.refund.body` | Nessun pagamento, nessun rimborso. | No payment, no refund. |
| `returns.legal` | In un negozio reale questa pagina conterrebbe le informazioni sul diritto di recesso previste dalla legge. | In a real shop this page would set out the statutory right of withdrawal. |

### 12. Termini della demo (destinazione del link "Cos'è →")

| Chiave | IT | EN |
|---|---|---|
| `terms.title` | Termini della demo | Demo terms |
| `terms.what.title` | Cos'è questo sito | What this site is |
| `terms.what.body` | LINGERAI è un sito dimostrativo. Mostra come funzionerebbe un negozio online: catalogo, taglie, borsa, checkout. | LINGERAI is a showcase site. It shows how an online shop would work: catalogue, sizes, bag, checkout. |
| `terms.sale.title` | Nessuna vendita | Nothing is sold |
| `terms.sale.body` | Niente su questo sito è un'offerta al pubblico. Completare il checkout demo non conclude nessun contratto. Nessun ordine viene evaso, nessun pagamento viene richiesto o effettuato. | Nothing on this site is an offer to the public. Completing the demo checkout doesn't create a contract. No order is fulfilled, no payment is requested or taken. |
| `terms.content.title` | Prodotti, prezzi, immagini | Products, prices, images |
| `terms.content.body` | Prodotti, prezzi, composizioni e disponibilità sono inventati. Le immagini sono disegni tecnici provvisori. | Products, prices, compositions and stock are made up. Images are provisional technical drawings. |
| `terms.ip.title` | Contenuti | Content |
| `terms.ip.body` | Testi, nomi e disegni sono del progetto LINGERAI. Le immagini sono segnaposto. | Copy, names and drawings belong to the LINGERAI project. Images are placeholders. |
| `terms.data.title` | Dati | Data |
| `terms.data.body` | Non inserire dati reali. Quello che scrivi non viene inviato e resta nel tuo browser. → Privacy | Don't enter real details. What you type isn't sent anywhere and stays in your browser. → Privacy |

(Blocco "Chi gestisce la demo" tolto: demo locale, nessun titolare indicato per decisione dell'utente. Da reintrodurre se la demo viene pubblicata.)

### 13. Privacy

| Chiave | IT | EN |
|---|---|---|
| `privacy.title` | Privacy | Privacy |
| `privacy.sent.title` | Cosa viene inviato | What gets sent |
| `privacy.sent.body` | I dati che scrivi nel checkout non vengono inviati a nessun server. | What you type at checkout isn't sent to any server. |
| `privacy.browser.title` | Cosa resta nel tuo browser | What stays in your browser |
| `privacy.browser.intro` | Per far funzionare la demo, alcune informazioni restano nella memoria del tuo browser. Servono solo a questo. | To make the demo work, some information stays in your browser's storage. It's used for nothing else. |
| `privacy.browser.bag` | Borsa: prodotto, colore, taglia, quantità. Resta finché non la svuoti o non cancelli i dati del sito. | Bag: product, colour, size, quantity. Kept until you empty it or clear the site's data. |
| `privacy.browser.lang` | Lingua, se la scegli a mano: IT o EN. Resta finché non cancelli i dati del sito. | Language, if you choose it yourself: IT or EN. Kept until you clear the site's data. |
| `privacy.browser.session` | Dati del checkout e ultimo ordine demo: solo in questa scheda, per mostrarti la conferma. Spariscono quando chiudi la scheda. | Checkout details and last demo order: this tab only, to show you the confirmation. They disappear when you close the tab. |
| `privacy.analytics.title` | Statistiche | Analytics |
| `privacy.analytics.body` | [ANALYTICS — DA DEFINIRE IN FASE 6: servizio, dati raccolti, durata, eventuale consenso.] | [ANALYTICS — TO BE DEFINED IN PHASE 6: service, data collected, retention, any consent needed.] |
| `privacy.delete.title` | Come cancellare tutto | How to delete everything |
| `privacy.delete.body` | Usa il bottone qui sotto, oppure cancella i dati di questo sito dalle impostazioni del browser. | Use the button below, or clear this site's data in your browser settings. |
| `privacy.delete.button` | Cancella i dati della demo | Clear demo data |
| `privacy.delete.done` | Dati della demo cancellati. La borsa è vuota. | Demo data cleared. Your bag is empty. |

`privacy.delete.button` portato nell'MVP (consiglio `legal-compliance` §2): svuota `localStorage` e `sessionStorage`; `privacy.delete.done` va nella regione `role="status"`. `privacy.analytics.body` è un segnaposto voluto: il build deve segnalarlo finché non è sostituito.

### 14. Contatti (demo)

| Chiave | IT | EN |
|---|---|---|
| `contact.title` | Contatti (demo) | Contact (demo) |
| `contact.intro` | È una demo: nessun modulo, nessuna risposta. | This is a demo: no form, no replies. |
| `contact.email.label` | Email | Email |
| `contact.email.value` | studio@example.com | studio@example.com |
| `contact.email.note` | Indirizzo d'esempio, non attivo. | Example address, not in use. |

(Orari tolti: un servizio che non risponde non ha orari, B10.)

### 15. FAQ (POI)

| Chiave | IT | EN |
|---|---|---|
| `faq.title` | Domande | FAQ |
| `faq.real.q` | È un negozio vero? | Is this a real shop? |
| `faq.real.a` | No. È una demo: niente è in vendita, nessun ordine parte. | No. It's a demo: nothing is for sale, no order ships. |
| `faq.charge.q` | Mi verrà addebitato qualcosa? | Will I be charged? |
| `faq.charge.a` | No. Il checkout non chiede la carta e non effettua pagamenti. | No. The checkout doesn't ask for a card and takes no payment. |
| `faq.size.q` | Come trovo la taglia? | How do I find my size? |
| `faq.size.a` | Il reggiseno con ferretto in fascia e coppa EU, tutto il resto in lettere XS–3XL. → Guida taglie | The underwired bra in EU band and cup, everything else in letter sizes XS–3XL. → Size guide |
| `faq.sheer.q` | Come so se un pezzo è trasparente? | How do I know if a piece is sheer? |
| `faq.sheer.a` | È scritto in ogni scheda, sotto il prezzo: trasparente, semi-trasparente o opaco. | It's on every product page, under the price: sheer, semi-sheer or opaque. |
| `faq.care.q` | Come si lavano? | How do I wash them? |
| `faq.care.a` | Istruzioni nella scheda, alla voce Cura. In generale: a mano in acqua fredda, mai in asciugatrice. | Instructions on each product page, under Care. In short: hand wash cold, never tumble dry. |
| `faq.hygiene.q` | Posso restituire uno slip? | Can I return a brief? |
| `faq.hygiene.a` | Nella demo sì, con la protezione igienica intatta. → Resi | In the demo, yes, with the hygiene liner intact. → Returns |

---

## Decisioni per l'utente — tutte decise (2026-11-05)

| # | Tema | Decisione |
|---|---|---|
| D1 | Claim homepage | **"Costruzione a vista." / "Construction, exposed."** Il registro manifesto resta in drop, Chi siamo, 404 e nella riga sotto il claim. |
| D2 | Nomi prodotto | **RASTER** (ex GRID), **PLUMB** (ex SHEER), **BEAM** (ex FRAME), **STRUT** (ex LINE). Confermati AXIS, PLANE, VOID, TENSION, HOLD. **MONOLITH** tenuto solo per la demo, da cambiare prima di qualsiasi uso pubblico. |
| D3 | Toni pelle | **Pelle 01 / 02 / 03** (IT) · Skin 01 / 02 / 03 (EN). |
| D4 | Striscia demo | "Demo — sito dimostrativo. Niente è in vendita, nessun pagamento verrà effettuato." "Non inserire dati reali" nel banner del checkout e accanto ai campi. |
| D5 | Conferma ordine | **"Ricevuto."** + riepilogo con indirizzo, con le frasi su demo, nessuna spedizione e dati solo in questa scheda. |
| D6 | Prezzi | **Due decimali ovunque**, con "IVA inclusa". |
| D7 | Taglie | **XS–3XL** per tutti i capi in lettere; 65–95 A–G per PLANE. |
| D8 | Menu | **"Chi siamo"** (IT) / "About" (EN). |

**Ancora aperti** (non sono copy): servizio di analytics (fase 6, segnaposto in Privacy); titolare e contatto reale se la demo viene pubblicata; ricerca marchi prima di un uso reale; altezza e taglia della modella quando ci saranno le foto (`product.fit.model`); rinomina dei file SVG placeholder (`visual-content`).
