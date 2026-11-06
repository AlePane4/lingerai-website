# LINGERAI edgy — Tono ribelle (branch `edgy`)

> Autore: `copywriter` · Data: 2026-11-06 · Stato: **proposta, da scegliere**
> Base: `docs/decisions.md` (righe 80–82: versione edgy, look + testi, mix zine/fotocopia + anti-design brutalista), `docs/brand/tone-of-voice.md`, `docs/copy/pages.md`, chiavi in `src/messages/*.json`.
> Valgono ancora: italiano col **tu**, inglese **britannico**, sentence case nel sorgente (maiuscolo via CSS), nomi prodotto e `GRID / 01` invariati, contatori `Borsa [0]`.
> Nota: gli esempi sono proposte di copy, non modifiche ai JSON. Il claim di homepage "Costruzione a vista." è stato deciso il 2026-11-05 per `main`: qui si può cambiare solo se l'utente sceglie un'altra variante.

---

## 0. Cosa cambia rispetto al tono attuale (SPEC + MANIFESTO)

Oggi: asciutto, preciso, ironia zero. Nella versione edgy: **stessa precisione sui fatti, ma la voce prende posizione, scherza, provoca**. Il rigore resta nei dati (composizione, taglie, prezzi); il carattere va nelle frasi editoriali.

"Sboccata" nelle varianti sotto vuol dire **parlata, diretta, colloquiale**, non parolacce.

---

## 1. Tre varianti

### Variante A — "FOTOCOPIA" (zine sboccata)

**Idea.** LINGERAI parla come una fanzine fatta in casa: frasi ritagliate, commenti a margine, post-scriptum, autoironia. Va d'accordo con scritte a mano, collage, rosso e nero.

**Regole**
- Frasi corte e colloquiali, come dette ad alta voce. Una battuta secca per blocco, mai due.
- Commenti "a margine" tra parentesi o come PS ("PS. È una demo.").
- Ironia su di sé e sul fare lingerie, mai su chi legge né sul suo corpo.
- Gergo da zine ammesso (ritaglio, incollato, fotocopia, stampato). Nessuna parolaccia forte; al massimo colloquialismi lievi.

| Elemento | IT | EN |
|---|---|---|
| Claim homepage | Cuciture fuori. Zero scuse. | Seams out. No excuses. |
| Claim (alternativa) | Fatta a vista. Incollata male? No. | Made in plain sight. Stuck down crooked? No. |
| Intro drop GRID / 01 | GRID / 01. Tredici pezzi.\nNero o bianco. Il resto è finito nel cestino.\nSe cerchi i fiocchi, hai sbagliato indirizzo. | GRID / 01. Thirteen pieces.\nBlack or white. The rest went in the bin.\nLooking for bows? Wrong address. |
| Chi siamo | Siamo LINGERAI. Facciamo lingerie come si fa una fanzine: poche cose, tagliate dritte, incollate dove si vedono.\nNiente colori. Niente fiocchi. Niente scuse.\nChi la indossa decide: sotto una giacca, da sola, per nessuno.\nPS. È una demo. Niente è in vendita. | We're LINGERAI. We make lingerie the way you make a zine: a few things, cut straight, stuck down where you can see them.\nNo colours. No bows. No excuses.\nWhoever wears it decides: under a jacket, alone, for no one.\nPS. It's a demo. Nothing is for sale. |
| 404 (`notFound.line`) | Pagina persa. Probabilmente l'abbiamo tagliata male. | Page missing. We probably cut it wrong. |
| Scheda AXIS (descrizione) | Triangolo in mesh. Una cucitura al centro, bene in vista. Niente ferretto, niente imbottitura. Trasparente: lo scriviamo, non lo nascondiamo. | Mesh triangle. One seam up the middle, in plain sight. No wire, no padding. Sheer, and we say so. |
| Bottone "Aggiungi alla borsa" | **Invariato**: Aggiungi alla borsa. Riga di conferma (toast/annuncio): "Ok, è in borsa." | **Unchanged**: Add to bag. Confirmation line: "Done, it's in the bag." |
| Borsa vuota (`bag.empty.body`) | Niente dentro. Sistemiamo la cosa. | Nothing in it. Let's fix that. |
| Conferma ordine | Titolo "Ricevuto." e frasi demo **invariati**. Sopra, un'etichetta: "Finto, ma ben fatto." | "Ricevuto." equivalent and demo sentences **unchanged**. Above, a label: "Fake, but well made." |

**Rischio.** Se ogni blocco ha la sua battuta stanca in fretta. Dosare: una battuta per pagina.

---

### Variante B — "MURO" (slogan da muro)

**Idea.** Parla come un manifesto attaccato abusivamente: una o quattro parole, ordini o negazioni, ritmo di stencil. Si sposa con il testo enorme del brutalismo.

**Regole**
- Massimo 4 parole per riga. Punto fermo dopo ogni riga.
- Una sola idea per superficie. Niente spiegazioni: la spiegazione sta nei dati sotto.
- Imperativi solo su azioni, mai sul corpo ("Guardala" sì, "Mostrati" no).
- Il punto esclamativo resta vietato. Maiuscolo via CSS, non nel sorgente.

| Elemento | IT | EN |
|---|---|---|
| Claim homepage | Fuori le cuciture. | Seams out. |
| Claim (alternativa) | Costruita, non carina. | Built, not pretty. |
| Intro drop GRID / 01 | GRID / 01.\nTredici pezzi.\nNero. Bianco.\nNiente fiocchi. | GRID / 01.\nThirteen pieces.\nBlack. White.\nNo bows. |
| Chi siamo | LINGERAI.\nLingerie come costruzione.\nUna cucitura è una linea.\nNiente colori. Niente fiocchi. Niente scuse.\nLa decidi tu.\n(È una demo. Niente è in vendita.) | LINGERAI.\nLingerie as construction.\nA seam is a line.\nNo colours. No bows. No excuses.\nYou decide.\n(It's a demo. Nothing is for sale.) |
| 404 (`notFound.line`) | Muro sbagliato. Qui non c'è niente. | Wrong wall. Nothing here. |
| Scheda AXIS (descrizione) | Mesh. Una cucitura. Niente ferretto. Niente imbottitura. Trasparente. | Mesh. One seam. No wire. No padding. Sheer. |
| Bottone "Aggiungi alla borsa" | **Invariato**. Riga di conferma: "In borsa." | **Unchanged**. Confirmation line: "In the bag." |
| Borsa vuota | Vuota. Riempila. | Empty. Fill it. |
| Conferma ordine | "Ricevuto." e frasi demo **invariati**. Etichetta sopra: "Prova generale." | "Ricevuto." equivalent and demo sentences **unchanged**. Label above: "Dress rehearsal." |

**Rischio.** Il più facile da leggere e il più adatto ai titoli giganti, ma regge poco sul testo lungo (schede, Chi siamo). Troppi slogan di fila diventano rumore.

---

### Variante C — "ANTI-MARKETING" (la verità cruda)

**Idea.** LINGERAI dice quello che i negozi di solito coprono: smonta le formule del marketing ("ti sentirai", "sensuale", "ultimi pezzi!") e le sostituisce con fatti. È brutalista nel senso del testo: nudo, senza rivestimento. Funziona anche con la natura demo del sito, che diventa un punto di forza ("niente da vendere").

**Regole**
- Formula tipo: "Non diciamo X. Diciamo Y." oppure dichiarare in anticipo ciò che altrove si nasconde.
- Frasi complete, più lunghe di A e B. Ironia secca contro il linguaggio del marketing, mai contro chi legge e mai contro marchi nominati.
- Niente urgenza finta, niente promesse emotive. Ogni affermazione deve essere vera nel sito.
- Trasparenza, ferretto, imbottitura e composizione si dicono per primi.

| Elemento | IT | EN |
|---|---|---|
| Claim homepage | Lingerie senza storytelling. | Lingerie, no storytelling. |
| Claim (alternative) | Niente sogni. Niente da vendere. / Cuciture a vista. Ufficio marketing chiuso. | No dreams. Nothing to sell. / Seams out. Marketing department closed. |
| Intro drop GRID / 01 | GRID / 01 è una collezione. Tredici pezzi, nero o bianco.\nNon è una storia, un viaggio o un'emozione.\nSono reggiseni, slip, body e cinghie, con la composizione scritta sotto. | GRID / 01 is a collection. Thirteen pieces, black or white.\nNot a story, a journey or a feeling.\nIt's bras, briefs, bodysuits and straps, with the composition written underneath. |
| Chi siamo | Un progetto dimostrativo con un'opinione.\nLa lingerie è un capo, non una promessa.\nNiente "ti sentirai". Niente "sensuale". Niente "collezione emozionale".\nTrasparente si chiama trasparente. Nero si chiama nero.\nChi la indossa decide.\nE sì, è una demo: niente è in vendita. | A demo project with an opinion.\nLingerie is a garment, not a promise.\nNo "you'll feel". No "sensual". No "emotional collection".\nSheer is called sheer. Black is called black.\nWhoever wears it decides.\nAnd yes, it's a demo: nothing is for sale. |
| 404 (`notFound.line`) | Errore nostro. Nessun "Ops!" simpatico: la pagina non c'è. | Our fault. No cute "Oops!": the page isn't here. |
| Scheda AXIS (descrizione) | Triangolo in mesh. Una cucitura, a vista. Senza ferretto, senza imbottitura. Trasparente vuol dire che si vede attraverso: te lo diciamo prima. | Mesh triangle. One seam, exposed. No wire, no padding. Sheer means you can see through it. We're telling you up front. |
| Bottone "Aggiungi alla borsa" | **Invariato**. Riga di conferma: "In borsa. Senza timer." | **Unchanged**. Confirmation line: "In the bag. No timer." |
| Borsa vuota | Niente dentro. Non ti scriviamo per ricordartelo. | Nothing in it. We won't email you about it. |
| Conferma ordine | "Ricevuto." e frasi demo **invariati**. Etichetta sopra: "Te l'avevamo detto: è una demo." | "Ricevuto." equivalent and demo sentences **unchanged**. Label above: "We did say: it's a demo." |

**Rischio.** Cade nel tono saccente se si esagera. Le frasi "Non diciamo X" vanno usate al massimo una volta per pagina. Alcune righe ("Non ti scriviamo", "Senza timer") sono vere solo finché il sito è fatto così: da ricontrollare se si aggiungono email o scarsità.

---

## 2. Limiti

**Mai, in nessuna variante**
- Volgarità sessuale esplicita, doppi sensi sul corpo, "sexy", "seducente", sguardo esterno (resta valido il principio 2 del tono attuale).
- Giudizi sui corpi ("snellisce", "difetti", "curvy"): un corpo non si corregge, non si commenta.
- Insulti a gruppi o categorie di persone, a chi legge, o attacchi a marchi nominati.
- Testi, claim o formule copiati da altri brand (e da slogan noti: ogni frase finale va cercata prima dell'uso reale).
- Parolacce forti. Ammessi solo colloquialismi lievi ("cestino", "bloody" in EN solo se serve, mai in funzionale).
- Emoji, puntini di sospensione. Il punto esclamativo resta escluso, salvo diversa scelta dell'utente.
- Affermazioni non vere nel sito (urgenza finta, promesse sul prodotto, claim su origine o materiali non documentati).

**Dove il tono ribelle NON entra** (testo identico o quasi a oggi, chiaro e immediato)
- Bottoni e azioni: Aggiungi alla borsa, Vai al checkout, Conferma ordine demo, Rimuovi, Annulla, Chiudi, Filtra, Ordina.
- Taglie e guida taglie, composizione, cura, trasparenza, ferretto, imbottitura, prezzi, "IVA inclusa".
- Errori dei campi e del form (`checkout.error.*`, `product.size.error.*`), etichette, suggerimenti dei campi.
- Tutta la sezione checkout: etichette, banner demo, `checkout.payment.hint`, riepilogo.
- Avvisi demo: striscia (`demo.strip.text`), `demo.banner.*`, `demo.footer`, `confirmation.isDemo`, `confirmation.noEmail`, `confirmation.dataNote`, `about.demo`. Possono cambiare solo look e posizione, non il significato.
- Pagine informative: Spedizioni, Resi, Termini, Privacy, Contatti, FAQ. Titoli chiari; al massimo una battuta nell'introduzione, mai nelle frasi legali.
- Etichette accessibili (`a11y.*`, `*.sr_*`, `announce.*`): neutre, per chi usa lo screen reader.
- Meta title e description: chiari per ricerca e anteprime.

**Dove il tono entra (livello pieno)**: claim e hero, intro drop, Chi siamo, 404, descrizione prodotto, borsa vuota, kicker della conferma.
**Dove entra poco (una riga, dopo la frase chiara)**: stati vuoti, "Aggiunto", eventuali annotazioni a mano.

Se un testo ribelle e uno funzionale stanno nello stesso messaggio, **vince il funzionale**: prima la frase chiara, poi (se serve) la punta di carattere.

---

## 3. Raccomandazione

**B + C come voce, A solo per le annotazioni a mano.**

- **B "MURO" sui titoli giganti**: claim, GRID / 01, 404, "Ricevuto." Parole brevi reggono il testo enorme del brutalismo e si leggono subito.
- **C "ANTI-MARKETING" sul testo corrente**: intro drop, Chi siamo, schede prodotto, stati vuoti. È la più ribelle sul piano dei contenuti, non dipende da parolacce, e trasforma il disclaimer demo da obbligo a posizione ("niente da vendere", "te l'avevamo detto").
- **A "FOTOCOPIA" solo come glossa grafica**: massimo una nota a mano per pagina (3–6 parole, es. "PS. È una demo.", "Fatto a mano, più o meno."), in carattere scritto a mano e rosso. Segue il lato zine senza appesantire il testo. Le note con informazione utile vanno comunque in testo vero, non solo in immagine.

**Perché non una sola variante**
- Solo A: divertente ma si consuma in fretta e dà poca autorità al brand.
- Solo B: ottima visivamente, povera nelle schede e in Chi siamo.
- Solo C: rischia il tono saccente se tutto il sito è una predica sul marketing.

**Perché questa combinazione**: corrisponde alla scelta visiva (zine per le note, brutalismo per i titoli e per la crudezza del testo), mantiene i testi funzionali intatti e rende il disclaimer demo naturale invece che stonato.

**Se si deve scegliere un solo tono**: C.

---

## 4. Da decidere con l'utente

1. Quale variante (o combinazione) usare, e quale claim homepage tra: *Seams out. / Fuori le cuciture.* (B), *Lingerie, no storytelling. / Lingerie senza storytelling.* (C), *Cuciture fuori. Zero scuse. / Seams out. No excuses.* (A). Il claim attuale di `main` ("Costruzione a vista.") può restare.
2. Il punto esclamativo resta escluso in tutto il sito?
3. Le annotazioni "a mano" di A: si fanno? (servono nuove chiavi decorative, es. `zine.note.*`, e un carattere scritto a mano; decisione di look per `art-director`, nuova libreria/font solo con ok esplicito.)
4. Dopo la scelta: riscrittura completa di `it.json` ed `en.json` sul branch `edgy`, con controllo `legal-compliance` sui testi demo toccati.

---

## 5. Applicato (branch `edgy`, 2026-11-06)

Scelta dell'utente: mix B (titoli) + C (testo corrente) + A (una nota a mano per pagina). Claim homepage: **B "Fuori le cuciture." / "Seams out."**
9 chiavi modificate in `src/messages/it.json` e `en.json`, più il nuovo oggetto `handNotes`. Nessuna chiave rinominata o tolta. Apostrofi dritti `'` come nel resto dei file.

| Chiave | IT vecchio → nuovo | EN vecchio → nuovo |
|---|---|---|
| `home.hero.claim` | Costruzione a vista. → Fuori le cuciture. | Construction, exposed. → Seams out. |
| `home.hero.sub` | 13 pezzi. Nero o bianco. Cuciture a vista. → 13 pezzi. Nero o bianco. Niente storytelling. | 13 pieces. Black or white. Seams out. → 13 pieces. Black or white. No storytelling. |
| `home.editorial.body` | Ogni pezzo parte da una misura. Taglio, cuciture e materiali sono scritti in scheda prima di scegliere. → Ogni pezzo parte da una misura, non da un'emozione. Taglio, cuciture e materiali sono scritti in scheda prima che tu scelga. | Every piece starts from a measurement. Cut, seams… → Every piece starts from a measurement, not a feeling. Cut, seams and materials are written on the product page before you choose. |
| `drop.intro` | Nero o bianco. Pizzo, raso, rete, cinghie.\nIl corpo come spazio, non come decorazione.\nNiente colori. Tredici pezzi. → GRID / 01 è una collezione. Tredici pezzi, nero o bianco.\nNon è una storia, un viaggio o un'emozione.\nSono reggiseni, slip, body e cinghie, con la composizione scritta sotto. | Black or white. Lace, satin, mesh, straps.\nThe body as space, not decor.\nNo colours. Thirteen pieces. → GRID / 01 is a collection. Thirteen pieces, black or white.\nNot a story, a journey or a feeling.\nIt's bras, briefs, bodysuits and straps, with the composition written underneath. |
| `about.manifesto` | LINGERAI tratta la lingerie come costruzione.\n…Sotto una giacca, da sola, per nessuno. → Un progetto dimostrativo con un'opinione.\nLa lingerie è un capo, non una promessa.\nNiente “ti sentirai”. Niente “sensuale”. Niente “collezione emozionale”.\nTrasparente si chiama trasparente. Nero si chiama nero.\nChi la indossa decide. | LINGERAI treats lingerie as construction.\n… → A demo project with an opinion.\nLingerie is a garment, not a promise.\nNo “you'll feel”. No “sensual”. No “emotional collection”.\nSheer is called sheer. Black is called black.\nWhoever wears it decides. |
| `notFound.line` | Qui non c'è niente. Nemmeno una cucitura. → Muro sbagliato. Qui non c'è niente. | Nothing here. Not a single seam. → Wrong wall. Nothing here. |
| `confirmation.wallLabel` | Ordine demo → Prova generale — ordine demo | Demo order → Dress rehearsal — demo order |
| `bag.empty.body` | Niente dentro. → Niente dentro. Non ti scriviamo per ricordartelo. | Nothing in it. → Nothing in it. We won't email you about it. |
| `error.generic.title` | Qualcosa non ha funzionato. → Errore nostro. | Something went wrong. → Our fault. |

Nota: `about.manifesto` non contiene più la frase demo (resta in `about.demo`). `meta.home.title` e `meta.home.description` NON sono stati toccati: il title contiene ancora il vecchio claim ("Costruzione a vista." / "Construction, exposed."); da decidere se allinearlo. Le descrizioni prodotto stanno nei file dati del catalogo, non nei messaggi: non toccate.

### `handNotes` (nuovo, top-level, decorativo, `aria-hidden`)

| Chiave | IT | EN |
|---|---|---|
| `home` | fuori. davvero. | out. for real. |
| `drop` | tredici. basta. | thirteen. that's it. |
| `about` | PS. è una demo | PS. it's a demo |
| `notFound` | tagliata male | cut it wrong |
| `confirmation` | finto, ma bene | fake, done well |

Impatto sui test Playwright: cercare il vecchio claim, `drop.intro`, `about.manifesto`, `notFound.line`, `confirmation.wallLabel` ("Ordine demo" come testo esatto), `bag.empty.body` ("Niente dentro." come testo esatto), `error.generic.title`.

Verifica: JSON non eseguito con `node` (l'agente non ha accesso alla shell); modifiche fatte con sostituzioni puntuali, virgole e parentesi controllate a vista. Da lanciare: `node -e "JSON.parse(require('fs').readFileSync('src/messages/it.json','utf8'))"` (e en).
