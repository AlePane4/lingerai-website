# LINGERAI — Revisione di compliance dei testi (Fase 5)

> Autore: `legal-compliance` · Data: 2026-11-05 · Stato: **parere, da approvare**
> Testi esaminati: `docs/copy/ui-strings.md`, `docs/copy/pages.md`, `docs/copy/products.md`. Contesto: `CLAUDE.md`, `docs/decisions.md`, `docs/ux/sitemap.md`, `docs/ux/purchase-flow.md`.
> I file di testo **non** sono stati modificati: le correzioni qui sotto sono proposte; i testi finali li scrive il `copywriter`.

**Avvertenza.** Non sono un avvocato e LINGERAI è una demo. Questo documento raccoglie buone pratiche e rischi. Le ricerche sui marchi sono **indicative** (motore di ricerca, non banche dati EUIPO / UIBM / WIPO). Prima di un lancio reale, o anche solo prima di pubblicare la demo su un dominio pubblico con un nome registrabile, serve una **verifica legale professionale** e una ricerca di anteriorità sui marchi.

Legenda tipo di indicazione:
- **[OBBLIGO]** = obbligo di legge per un sito reale (o per la demo, se pubblicata online)
- **[BP]** = buona pratica per una demo onesta
- **[SUGG]** = semplice suggerimento

---

## 0. Sintesi

I testi sono già molto attenti: la demo è dichiarata quasi ovunque, nessun campo carta, dati d'esempio su `example.com`, nessun claim ambientale pubblicato, composizioni per parte. I problemi principali sono:

1. **Titolare e contatto reali mancanti** se la demo va online: con un hosting pubblico l'indirizzo IP passa comunque dai log del fornitore, quindi "Cosa raccogliamo: niente" non è del tutto esatto e serve un titolare identificabile.
2. **Contraddizioni sui dati alla conferma** ("nessun dato salvato" ma l'ultimo ordine resta in `sessionStorage`; "Spedizione a" + indirizzo).
3. **Promesse di servizio senza "demo"** in alcuni punti brevi (rassicurazioni "Resi 30 giorni", nota borsa).
4. **Marchi**: FRAME (marchio moda registrato) e SHEER (boutique di lingerie omonima) da sostituire; MONOLITH usato da Calvin Klein come nome di linea underwear.
5. **Etichettatura tessile**: struttura dei reggiseni secondo l'Allegato IV del Reg. 1007/2011 (coppe e dorso), "Microfibra" usato come intestazione di componente, "[riciclata — DA CONFERMARE]" da omettere.

---

## 1. Problemi trovati

### Priorità ALTA

| # | Dove | Problema / rischio | Correzione proposta | Tipo |
|---|---|---|---|---|
| A1 | `pages.md` → `privacy.collect.body`, `privacy.hosting.body`, `terms.owner.body`; `contact.*` | Se la demo viene pubblicata su un hosting pubblico, il fornitore registra almeno IP, user agent e orario nei log: sono dati personali (GDPR art. 4). "Niente" è quindi impreciso, e chi pubblica il sito è titolare (o almeno deve indicare chi lo è). Nella pagina Contatti c'è solo `studio@example.com` "non attivo": nessuno può esercitare i diritti (artt. 12–22 GDPR). | (a) Riformulare `privacy.collect.body` in modo esatto, es. "Il sito non invia a nessun server i dati che inserisci. Il fornitore di hosting registra dati tecnici di connessione (es. indirizzo IP) per far funzionare il sito: vedi Hosting." (b) Compilare `terms.owner.body` e la privacy con **nome del titolare e un contatto reale** (anche solo un'email dedicata) prima della pubblicazione. (c) In alternativa: tenere la demo **non pubblica** (preview protetta da password, locale): allora la privacy può restare minima. Vedi domanda Q1. | [OBBLIGO] se pubblica |
| A2 | `ui-strings.md` → `demo.banner.confirmation`, `confirmation.noPayment`; `checkout.sessionNote`; `pages.md` → `privacy.browser.order` | Contraddizione: la conferma dice "Nessun dato è stato inviato **o salvato**" e la nota checkout dice "si cancellano alla conferma", ma la privacy dice che l'ultimo ordine resta nella scheda per mostrare la conferma, e la conferma mostra l'indirizzo inserito (`confirmation.deliveryTo`). Un avviso privacy inesatto è un rischio di trasparenza (GDPR art. 5(1)(a), 12) e mina la fiducia nel disclaimer. | Scegliere una soluzione tecnica e allineare i testi: **preferita**: alla conferma conservare solo articoli, totale, `DEMO-0001` e data, **senza** nome/indirizzo/email; togliere `confirmation.deliveryTo`. Se invece l'indirizzo resta: scrivere "Nessun dato è stato inviato. Quello che hai scritto resta solo in questa scheda e si cancella quando la chiudi." | [BP] / [OBBLIGO] se pubblica |
| A3 | `ui-strings.md` → `confirmation.deliveryTo` ("Spedizione a" / "Delivering to"), `confirmation.wall` ("Ricevuto." / "Received.") | Sono le due frasi che più fanno credere a un ordine vero: "Received" implica che qualcuno abbia ricevuto l'ordine, "Delivering to" promette una consegna. Il disclaimer demo è presente, ma il muro tipografico è l'elemento visivamente dominante. | Togliere "Spedizione a" (vedi A2) o sostituirlo con "Indirizzo inserito (demo)". Per il muro: preferire un testo che non implichi un destinatario, es. "Fatto." (D5-B) o "Fine demo."; tenere `h1` "Ordine demo …" con un verbo neutro ("completato" / "complete") invece di "ricevuto". | [BP] |
| A4 | `products.md` → `lineBra.composition.1`, `monolithBodysuit.composition.1` ("[riciclata — DA CONFERMARE]"); `tensionHarness.construction.2` ("[nichel-free — DA CONFERMARE]"); `pages.md` → `about.how.materials.origin`, `shipping.packaging.body` | Sono claim ambientali / di sicurezza / di origine. Dal **27.09.2026** si applica la Dir. (UE) 2024/825 (ECGT): vietati claim ambientali generici e non dimostrati. "Nichel-free" è un claim di prodotto che richiede test (e il rilascio di nichel è già limitato da REACH, All. XVII voce 27: presentare un obbligo di legge come pregio è pratica ingannevole). L'origine ("Made in …") se indicata deve essere vera. Nella demo nessuno di questi dati esiste. | **Nella demo: omettere del tutto**, non lasciare segnaposto né versioni attenuate. Concretamente: `composition.1` = "Microfibra …: 72% poliammide, 28% elastan" senza "riciclata"; `construction.2` = "Anelli e regolatori in metallo opaco."; nascondere i blocchi `about.how.materials.origin` e `shipping.packaging` (o testo neutro senza claim: "Confezione: nella demo non c'è nessuna confezione."). Il build deve fallire se trova `DA CONFERMARE` / `TO BE CONFIRMED` (già previsto, `products.md` §7). | [OBBLIGO] per un sito reale; [BP] nella demo |
| A5 | Nome prodotto **FRAME** (`products.md` §3.3, `pages.md` D2) | FRAME è un marchio di moda noto e registrato in classe 25 (FRAME LA Brands LLC, es. US Reg. 5270809 "FRAME", Reg. 5176618 "FRAME DENIM"), venduto in UE. Stessa classe, stesso pubblico: rischio di confusione evidente. | Confermo la proposta del copywriter: **rinominare** (BEAM è un'opzione senza omonimie evidenti trovate). | [OBBLIGO] per uso reale; [BP] nella demo |

### Priorità MEDIA

| # | Dove | Problema / rischio | Correzione proposta | Tipo |
|---|---|---|---|---|
| M1 | `ui-strings.md` → `demo.strip.text` | Parere su D4 (pages.md): la striscia dice "Nessun pagamento verrà effettuato", ma non dice che **nulla è in vendita**. "Nessun pagamento" da solo può far pensare a pagamento alla consegna o in seguito. | Opzione A del copywriter accettabile **con una modifica**: inserire "niente è in vendita" nella striscia, es. "Demo — sito dimostrativo. Niente è in vendita, nessun pagamento." / "Demo — showcase site. Nothing is for sale, no payment taken." "Non inserire dati reali" **non** serve nella striscia: è giusto metterlo dove si scrivono dati (banner checkout, già presente) e nei Termini. Aggiungere però un richiamo breve vicino ai campi: vedi M2. | [BP] |
| M2 | `ui-strings.md` → `checkout.field.*.hint`, `checkout.fillSample.hint` | Il banner "Non inserire dati reali" è in cima; su mobile, scorrendo il form, l'avviso esce dallo schermo. Solo email e telefono hanno un hint "solo per la demo". | Ripetere l'avviso subito sopra il primo campo o accanto a `checkout.fillSample` (es. "Usa i dati di esempio: non inserire i tuoi."). Facoltativo: precompilare i dati di esempio di default (con possibilità di cancellarli) invece che su richiesta. | [BP] |
| M3 | `ui-strings.md` → `checkout.terms.label`, `sample.terms` | Parere: la checkbox **deve restare non pre-spuntata** (il copywriter ha già fatto così, corretto). Per un sito reale le caselle pre-spuntate non valgono come consenso (CGUE C-673/17 *Planet49*; GDPR cons. 32) né per costi aggiuntivi (Dir. 2011/83/UE art. 22). Nella demo non si conclude nessun contratto, quindi "Accetto i termini" è un po' improprio, e accettare insieme termini e privacy confonde: la privacy si **legge**, non si accetta. | Mantenere non spuntata. Trasformarla in una conferma di comprensione, più utile come disclaimer: "Ho capito che è una demo: nessun ordine, nessun pagamento. <terms>Termini della demo</terms> · <privacy>Privacy</privacy>". Errore collegato: "Conferma di aver capito che è una demo per continuare." In alternativa tenerla com'è, ma con "privacy" solo come link informativo sotto il bottone. | [BP] |
| M4 | `ui-strings.md` → `demo.bagNote` ("resi 30 giorni"), `product.reassure.returns`; `pages.md` → `home.reassure.returns`, `returns.window.body` ("Cambio taglia gratuito"), `sizeGuide.returnsLink` | Frasi brevi che, isolate, sembrano promesse di servizio reali. `product.reassure.shipping` dice "demo", `reassure.returns` no. | Allineare tutte le rassicurazioni con la parola "demo", es. "Resi 30 giorni (demo)" / "30-day returns (demo)"; nella nota borsa: "Demo · nessun pagamento · nessun ordine reale". | [BP] |
| M5 | `pages.md` → `returns.legal` | Segnaposto da non pubblicare. Nota per un negozio reale: recesso di 14 giorni (Dir. 2011/83/UE art. 9; Codice del Consumo art. 52), modulo tipo, rimborso entro 14 giorni; l'esclusione per i beni sigillati per motivi igienici (art. 16(e) Dir. 2011/83; art. 59 lett. e) Cod. Cons.) vale solo se il sigillo è aperto dopo la consegna e va spiegata in modo preciso. Una finestra di 30 giorni è ammessa (migliorativa), ma non sostituisce le informazioni obbligatorie. | Nella demo **omettere** il blocco, oppure frase neutra: "In un negozio reale questa pagina conterrebbe le informazioni sul diritto di recesso previste dalla legge." Per un lancio reale: testi da far redigere a un legale. | [OBBLIGO] per sito reale |
| M6 | `ui-strings.md` (prezzi in card, scheda, borsa, checkout) | Non c'è alcuna indicazione "IVA inclusa". Per un sito B2C reale il prezzo deve essere comprensivo di IVA e chiaro (Dir. 98/6/CE; Cod. Cons. artt. 14–17; Dir. 2011/83 art. 6(1)(e)). | Aggiungere una chiave, es. `price.vatNote` = "Prezzi simulati, IVA inclusa." / "Simulated prices, VAT included." in scheda prodotto (sotto il prezzo o nelle rassicurazioni) e nel riepilogo checkout (accanto a `checkout.summary.demoNote`). Coerente con "Importo simulato". | [OBBLIGO] per sito reale; [BP] nella demo |
| M7 | `products.md` reggiseni (AXIS, PLANE, GRID bralette, LINE) → `composition.*` | Reg. (UE) 1007/2011, **Allegato IV punto 1** (prodotti di corsetteria): per i reggiseni la composizione va indicata per il prodotto intero oppure per le parti "tessuto esterno e interno delle coppe e dorso". Ora i reggiseni hanno solo "Mesh: …": non si capisce se il dorso/fascia è dello stesso tessuto. | Strutturare per parti dell'Allegato IV, es. AXIS: "Coppe e dorso: 78% poliammide, 22% elastan". PLANE (doppio strato): "Coppe, esterno e interno: …; Dorso: …". Se tutte le parti sono uguali, una riga unica "Coppe e dorso". Dati da far confermare al `fashion-expert`. | [OBBLIGO] per sito reale |
| M8 | `products.md` → intestazioni "Microfibra:" (LINE, FRAME, MONOLITH, HOLD) | Art. 16 Reg. 1007/2011: per descrivere la composizione si usano solo i nomi dell'Allegato I. "Microfibra" non è un nome di fibra; usato come intestazione della riga di composizione può essere letto come tale. "Mesh" e "Tulle" sono costruzioni di tessuto, rischio minore ma stessa logica. | Usare come intestazione la **parte del capo**, non il tessuto: "Banda frontale: 72% poliammide, 28% elastan", "Fianchi: …", "Corpo: …", "Tassello: 100% cotone". "Microfibra", "mesh", "tulle" restano liberi in descrizione e costruzione. | [BP] / [OBBLIGO] per sito reale |
| M9 | `pages.md` → `about.how.bodies.body`, `category.bras.intro` ("XS–3XL"); `products.md` range | Il testo promette XS–3XL, ma GRID bralette, PLANE perizoma, GRID culotte, VOID, HOLD arrivano a XXL, SHEER a XL. Per un sito reale è un'informazione ingannevole sulla disponibilità (Dir. 2005/29/CE art. 6; Cod. Cons. art. 21). | Allineare (D7). Qualsiasi scelta va bene purché testi e catalogo coincidano; se si tengono range diversi: "Taglie da XS, fino a 3XL secondo il modello". | [BP] |
| M10 | Nome prodotto **SHEER** (`products.md` §5.1) | Omonimia nel settore: "SHEER" è una boutique di lingerie multimarca (Hong Kong, sheerlingerie.com, attiva dal 2011). Inoltre il capo è opaco: il nome descrive una caratteristica che il prodotto non ha (rischio di informazione fuorviante sulla trasparenza). | Confermo il cambio di nome (PLUMB: nessuna omonimia evidente trovata). | [BP] |
| M11 | Nome prodotto **MONOLITH** (`products.md` §4.1) | Calvin Klein usa "Monolith" come nome di linea underwear (es. "Calvin Klein Monolith Bikini" venduto da Aritzia). Non è un brand a sé, ma è un nome di linea di un grande marchio nello stesso settore. | Rischio moderato: verificare su EUIPO / TMview se "MONOLITH" è registrato in classe 25; se sì, rinominare. Nella demo può restare, segnalandolo all'utente (Q4). | [BP] |
| M12 | Nome brand **LINGERAI** | Nessuna omonimia evidente trovata. Rischi diversi: (a) è molto vicino alla parola generica "lingerie": per la registrazione come marchio in classe 25 può essere contestato come descrittivo / privo di carattere distintivo (Reg. (UE) 2017/1001 art. 7(1)(b)(c)), e sarà difficile difenderlo; (b) la parte "AI" può far pensare a un prodotto basato su intelligenza artificiale o a immagini generate da AI: se in futuro si usano immagini AI, valutare la trasparenza (AI Act art. 50, obblighi per contenuti sintetici). | Nessuna azione nella demo. Prima di un uso reale: ricerca di anteriorità e parere sulla registrabilità (Q3). | [SUGG] |
| M13 | `pages.md` → `terms.*` | Le pagine Termini dicono bene "nessuna vendita", ma manca la frase giuridicamente più utile: nessun contratto si conclude e nessun contenuto è un'offerta al pubblico. Mancano anche note su proprietà intellettuale e limitazione d'uso. | Aggiungere: "Niente su questo sito è un'offerta al pubblico. Completare il checkout demo non conclude nessun contratto." e un blocco breve "Contenuti": "Testi, nomi e disegni sono del progetto LINGERAI. Le immagini sono segnaposto." (adattare se si usano immagini con licenza: citarle). | [BP] |

### Priorità BASSA

| # | Dove | Problema / rischio | Correzione proposta | Tipo |
|---|---|---|---|---|
| B1 | `products.md` → fibre IT/EN | **Conformi** all'Allegato I del Reg. 1007/2011: "poliammide" / "polyamide" (nome ufficiale "poliammide o nylon" / "polyamide or nylon": la sola "poliammide" è d'uso comune e accettata), "elastan" (IT) / "elastane" (EN) ✔, "seta" / "silk" ✔, "cotone" / "cotton" ✔. Ordine decrescente ✔. "100%" solo su componenti monofibra ✔ (art. 7). Somme = 100 ✔. | Nessuna correzione. Nota per lo sviluppo: non tradurre "elastan" con "elastane" nella pagina IT né usare "spandex"/"lycra" (marchio). | — |
| B2 | `products.md` → "Parti non tessili" | Corretto e non obbligatorio per il metallo. L'art. 12 impone una frase solo per parti non tessili **di origine animale** ("Contiene parti non tessili di origine animale"). | Nessuna, finché non ci sono pelle, osso, piume ecc. Se un drop futuro le usa, aggiungere la frase. | — |
| B3 | `products.md` → TENSION ("elastico gommato", composizione 60% PA / 40% EL) | "Gommato" fa pensare a gomma/rivestimento, ma la composizione non lo riflette. Se c'è gomma naturale come fibra il nome è "elastodiene"; se è un rivestimento, va bene ma il testo deve essere coerente. | Far chiarire al `fashion-expert`; altrimenti "elastico piatto opaco". | [BP] |
| B4 | `products.md` → `care.*` | Istruzioni chiare e coerenti con i materiali. Le istruzioni di cura non sono imposte dal Reg. 1007/2011 (in UE sono volontarie, simboli ISO 3758 / GINETEX marchio registrato). | Nessuna. Se in futuro si usano i **simboli**, rispettare ISO 3758 / licenza GINETEX. | [SUGG] |
| B5 | `pages.md` → `home.reassure.materials` ("Composizione dichiarata su ogni pezzo"), `about.how.materials.body` | Dichiarare la composizione è un obbligo di legge: presentarlo come un pregio distintivo, per un sito reale, sfiora la pratica ingannevole (Dir. 2005/29/CE, All. I punto 10, per analogia). Nella demo è innocuo. | Facoltativo: spostare l'accento su ciò che va oltre l'obbligo ("Composizione per ogni parte del capo" / "Trasparenza dichiarata su ogni pezzo"). | [SUGG] |
| B6 | Nomi **AXIS**, **HOLD**, **VOID**, **GRID** | Omonimie deboli: AXIS = linea activewear Gymreapers (body e bra sportivi) e una domanda UK "AXIS BRIDGE" in classe 25 per lingerie; HOLD = linea "Hold Me Tight" di Ann Summers (nome composto); VOID ≈ Voiment (lingerie, nome diverso); GRID = nomi prodotto generici ("Grid Graphic"). | Nessuna azione nella demo. Ricerca EUIPO prima di un uso reale (già segnalato dal copywriter). | [SUGG] |
| B7 | Nomi **PLANE, TENSION, LINE, RASTER, PLUMB, BEAM, STRUT**, drop **GRID / 01** | Nessuna omonimia evidente trovata nel settore moda/lingerie. LINE è generico (debole come segno distintivo, non rischioso). | Nessuna. Dal punto di vista legale il set alternativo RASTER / PLUMB / BEAM / STRUT è preferibile a GRID / SHEER / FRAME / LINE. | — |
| B8 | Claim home (`pages.md` §1.1, D1) | **A** "Niente pizzo. Niente scuse." / "No lace. No apologies.": nessun problema legale; frase non trovata come slogan altrui. Unica affinità: esiste un'etichetta moda UK "Make No Apologies" (marchio diverso, rischio basso). È un'affermazione di fatto: resta vera finché nessun drop usa pizzo. **B** "Costruzione a vista." e **C** "Ogni cucitura è una decisione.": nessun problema; C non trovata come slogan altrui. Nessuno dei tre parla di corpi, salute o sostenibilità. | Nessuna correzione. Se si sceglie A, annotare in `decisions.md` che va rivisto se un drop usa pizzo. | — |
| B9 | `pages.md` → `about.manifesto` ("Quello che si vede, è dichiarato.") | Frase di trasparenza totale: va bene finché la scheda dichiara davvero tutto ciò che è rilevante. Diventa debole se l'origine resta omessa (A4). | Nessuna nella demo. Per un sito reale, coerenza con le informazioni effettivamente pubblicate. | [SUGG] |
| B10 | `pages.md` → `contact.hours.value` | Orari di un servizio che non esiste: inutili e leggermente in contrasto con "nessuna risposta". | Toglierli, o lasciarli con "(esempio)" come già fatto. | [SUGG] |
| B11 | Rappresentazione (`media.alt.photoFront`, `about.*`, descrizioni) | Testi neutri, nessun giudizio sui corpi, nessun riferimento a minori, nessun contenuto esplicito; "Pelle 01/02/03" invece di "nude" ✔. Harness e reggicalze descritti in modo tecnico ✔. | Per le foto future: modelle maggiorenni con liberatoria (release) firmata, styling non esplicito, nessuna posa sessualizzata come regola nelle linee guida `visual-content`. | [BP] |
| B12 | Immagini, font, servizi terzi (fase 6) | Non sono testi, ma decidono se serve un banner cookie: Google Fonts caricati da CDN, immagini in hotlink (es. Unsplash), mappe, video, analytics o "Speed Insights" dell'hosting trasferiscono l'IP a terzi. | Font **self-hosted** (es. `next/font`, che li serve dal proprio dominio), immagini locali, nessun analytics. Se cambia, rivedere §2 e la privacy. | [OBBLIGO] se si aggiungono terzi |

---

## 2. Cookie, `localStorage` e consenso (parere sul punto 2)

- L'art. 5(3) della Dir. 2002/58/CE (ePrivacy; in Italia art. 122 Codice privacy) vale per **qualsiasi** memorizzazione nel dispositivo, quindi anche `localStorage` e `sessionStorage`, non solo i cookie (EDPB, Linee guida 2/2023 sul campo di applicazione tecnico dell'art. 5(3)).
- Esenzione dal consenso per ciò che è **strettamente necessario** a un servizio richiesto dall'utente. Rientrano: contenuto della borsa (cookie "user input", WP29 Parere 04/2012), dati del checkout nella scheda, lingua **scelta a mano** (personalizzazione dell'interfaccia richiesta dall'utente). Il Garante (Linee guida cookie, 10.06.2021) conferma: nessun consenso per gli strumenti tecnici, ma vanno **descritti nell'informativa**.
- **Conclusione: nessun banner cookie** finché restano solo questi tre usi tecnici e nessun servizio terzo (vedi B12). La pagina Privacy già elenca cosa resta nel browser: va bene, serve solo:
  - sostituire `privacy.cookies.body` con una frase definitiva, es. "Nessun cookie di profilazione, nessuna statistica, nessun servizio di terzi. Il sito usa solo la memoria del browser per borsa, lingua e checkout." (confermare in fase 6);
  - indicare la durata: borsa e lingua finché non le cancelli (`localStorage`); checkout e ultimo ordine fino alla chiusura della scheda (`sessionStorage`);
  - il bottone `privacy.delete.button` è una buona pratica: consiglio di portarlo nell'MVP (costo basso).
- Attenzione: la lingua **rilevata dal browser** al primo accesso non va salvata finché l'utente non sceglie a mano (`sitemap.md` §4 già lo prevede: "la lingua scelta a mano vince").

### Privacy policy demo: contenuto minimo

| Voce | Demo locale / protetta | Demo pubblica |
|---|---|---|
| Chi è il titolare e come contattarlo | facoltativo | **obbligatorio** (GDPR art. 13(1)(a)) |
| Cosa resta nel browser, perché, quanto dura, come cancellarlo | ✔ (già presente) | ✔ |
| Il sito non invia i dati inseriti a nessun server | ✔ | ✔ |
| Log tecnici dell'hosting: quali dati, chi è il fornitore, eventuale trasferimento extra-UE, durata | — | **obbligatorio** (base giuridica: legittimo interesse, art. 6(1)(f)) |
| Nessun cookie / analytics / terzi | ✔ | ✔ |
| Diritti dell'interessato e reclamo al Garante | facoltativo | **obbligatorio** (art. 13(2)) |
| Data dell'ultimo aggiornamento | ✔ (`info.updated`) | ✔ |

---

## 3. Pagine informative: abbastanza chiaramente demo? (parere sul punto 3)

| Pagina | Giudizio | Note |
|---|---|---|
| Spedizioni | Sì | "Nella demo", "simulati", "Nessun pacco parte davvero" ✔. Togliere il segnaposto confezione (A4). |
| Resi | Quasi | Ok il corpo; togliere `returns.legal` (M5); "Cambio taglia gratuito" + "demo" (M4). |
| Termini | Sì | Aggiungere "nessun contratto, nessuna offerta al pubblico" e contenuti/IP (M13); compilare il responsabile (A1). |
| Privacy | Quasi | Esatta solo se la demo resta locale; con hosting pubblico vedi A1 e §2. |
| Contatti | Sì | `example.com` ✔. Se pubblica, la privacy deve comunque avere un contatto reale (A1). |
| Tutte | Sì | `info.disclaimer` ✔: va mostrato **in cima** a ogni pagina informativa, non solo in fondo. |

---

## 4. Checklist pagine e testi legali

| Pagina / testo | Stato | Note |
|---|---|---|
| Striscia demo su tutte le pagine (`demo.strip.*`) | da correggere | aggiungere "niente è in vendita" (M1) |
| Banner checkout (`demo.banner.checkout`) | presente | ✔; ripetere l'avviso vicino ai campi (M2) |
| Banner conferma (`demo.banner.confirmation`) | da correggere | contraddizione "salvato" (A2) |
| Titolo conferma (`confirmation.wall`, `h1`, `deliveryTo`) | da correggere | A3 |
| Footer demo (`demo.footer`) | presente | ✔ |
| Nota borsa (`demo.bagNote`) e rassicurazioni | da correggere | M4 |
| Checkbox checkout (`checkout.terms.label`) | da correggere | non spuntata ✔; riformulare (M3) |
| Nessun campo carta | presente | ✔ (D4-A) |
| Dati di esempio `example.com` | presente | ✔ |
| Termini della demo | da correggere | M13 + titolare (A1) |
| Privacy | da correggere | A1, A2, §2 |
| Spedizioni | da correggere | segnaposto confezione (A4) |
| Resi | da correggere | M4, M5 |
| Contatti | presente | ✔ (per la demo) |
| Note legali / chi gestisce (`/note-legali`, POI) | mancante | serve solo se la demo è pubblica; può confluire nei Termini |
| Cookie banner | non necessario | finché vale §2 / B12 |
| Indicazione "IVA inclusa" | mancante | M6 |
| Composizione per parte (Reg. 1007/2011) | da correggere | M7, M8; nomi fibre ✔ (B1) |
| Istruzioni di cura | presente | ✔ |
| Claim riciclato / nichel-free / origine / confezione | da correggere | omettere (A4) |
| Nomi prodotto | da correggere | FRAME (A5), SHEER (M10); MONOLITH da verificare (M11) |
| Diritto di recesso, info precontrattuali, ODR/ADR, dati venditore (P.IVA, sede) | non applicabile alla demo | **obbligatori per un lancio reale** (Dir. 2011/83/UE, Cod. Cons. artt. 49 ss., D.Lgs. 70/2003 art. 7): da far redigere a un legale |

---

## 5. Domande aperte per l'utente

1. **Q1 — La demo andrà online in pubblico?** Se sì (anche solo per portfolio), serve indicare un titolare e un contatto reale nella privacy/termini (A1). Se resta locale o protetta da password, la privacy può restare minima. Quale nome e quale email vuoi usare?
2. **Q2 — Conferma ordine:** preferisci che la conferma **non** mostri l'indirizzo inserito (consigliato, A2/A3) o che lo mostri con una frase che spiega dove resta?
3. **Q3 — Nome LINGERAI:** è solo per la demo o pensi di registrarlo come marchio? Nel secondo caso conviene una ricerca di anteriorità e un parere sulla registrabilità (troppo vicino a "lingerie", M12).
4. **Q4 — MONOLITH:** lo teniamo nella demo nonostante l'uso di Calvin Klein come nome di linea, o preferisci un'alternativa già ora?
5. **Q5 — Checkbox del checkout:** la trasformiamo in "Ho capito che è una demo…" (consigliato, M3) o resta "Accetto i termini della demo"?
6. **Q6 — Hosting e font (per la fase 6):** confermi niente analytics, font self-hosted e immagini locali? È la condizione per non avere il banner cookie.

---

## Fonti

- Reg. (UE) 1007/2011, denominazioni delle fibre tessili ed etichettatura (Allegato I nomi; Allegato IV corsetteria; artt. 7, 11, 12, 16): https://eur-lex.europa.eu/eli/reg/2011/1007/oj — testo non scaricabile durante la revisione: citazioni fatte a memoria, **da verificare sul testo ufficiale**.
- Dir. 2002/58/CE (ePrivacy) art. 5(3); EDPB Linee guida 2/2023; WP29 Parere 04/2012 sull'esenzione dal consenso per i cookie; Garante privacy, Linee guida cookie 10.06.2021.
- Reg. (UE) 2016/679 (GDPR) artt. 4, 5, 6, 12, 13; CGUE C-673/17 *Planet49*.
- Dir. 2011/83/UE (diritti dei consumatori) artt. 6, 8, 9, 16, 22; D.Lgs. 206/2005 (Codice del Consumo) artt. 14–17, 21, 49 ss.
- Dir. 2005/29/CE (pratiche commerciali sleali); Dir. (UE) 2024/825 (ECGT), applicabile dal 27.09.2026.
- REACH, Reg. (CE) 1907/2006, All. XVII voce 27 (nichel).
- Ricerche marchi (indicative): [FRAME LA Brands — marchi](https://trademark.justia.com/owners/frame-la-brands-llc-2525342), [FRAME, US 87315566](https://markinton.com/trademark/frame-87315566), [Frame (company)](https://Www.Wikipedia.org/wiki/Frame_(company)); [SHEER Lingerie](https://www.sheerlingerie.com/products/signature-tomoe-harness-brief), [Sheer — boutique HK](https://www.timeout.com/hong-kong/shopping/time-out-recommends-5-fashionable-lingerie-shops-in-hong-kong); [Calvin Klein Monolith Bikini](https://www.aritzia.com/en/product/Calvin%20Klein%20Monolith%20Bikini/101156.html); [Gymreapers Axis](https://www.gymreapers.com/collections/womens-axis-collection), [UK TM Journal — AXIS BRIDGE](https://www.ipo.gov.uk/t-tmj/tm-journals/2026-031/UK00004417468.html); [Ann Summers Hold Me Tight](https://www.marksandspencer.com/hold-me-tight-luxe-lace-lingerie-body/p/clp23095978); [Voiment](https://www.econyl.com/brand/voiment/); [Make No Apologies](https://fashionunited.com/companies/make-no-apologies).
