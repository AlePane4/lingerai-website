# LINGERAI — Mappa del sito (Fase 3, Struttura e UX)

> Autore: `ux-reviewer` · Data: 2026-11-05 · Stato: **proposta, da approvare**
> Basata su: `docs/decisions.md` (tutte le voci approvate), `docs/research/*`, `docs/brand/visual-directions.md` (A MONOLITE + disegni tecnici), `docs/brand/tone-of-voice.md` (A SPEC + C).
> Le etichette sono **provvisorie**: i testi finali spettano al `copywriter` (fase 5). Gli slug IT sono proposte, da confermare (vedi `purchase-flow.md` §11, domanda D5).

---

## 1. Principi

1. **Due alberi gemelli**: ogni pagina esiste in `/it/…` e in `/en/…`, con lo stesso contenuto e una corrispondenza 1:1 (serve al selettore lingua e agli `hreflang`).
2. **Poca profondità**: massimo 3 livelli (lingua → categoria → prodotto). Da qualsiasi pagina al checkout bastano 3 tap.
3. **Il catalogo è piccolo (13 pezzi)**: la pagina del drop **GRID / 01** fa anche da "tutti i prodotti". Niente pagine vuote o finte.
4. **Nessun dato reale**: nessuna pagina deve chiedere dati che vengono salvati o inviati (niente account, niente newsletter, niente modulo contatti che invia).
5. **Parametri neutri rispetto alla lingua**: filtri e varianti in query string con chiavi e valori in inglese, uguali in IT ed EN (`?size=75B&color=black`). Così cambiando lingua l'URL resta valido.

---

## 2. Albero del sito

Legenda: **MVP** = indispensabile per il primo rilascio · **POI** = facoltativo / rilascio successivo.

```
/                              → reindirizza a /it o /en (vedi §4)
├── /it  · /en                 HOME                                   MVP
│
├── CATALOGO
│   ├── /it/drop/grid-01        · /en/drop/grid-01       DROP GRID / 01 (= tutti i prodotti)   MVP
│   ├── /it/reggiseni           · /en/bras               Categoria (4 prodotti)                MVP
│   ├── /it/slip                · /en/briefs             Categoria (4 prodotti)                MVP
│   ├── /it/body                · /en/bodysuits          Categoria (2 prodotti)                MVP
│   ├── /it/sottovesti          · /en/slips              Categoria (1 prodotto)                MVP
│   ├── /it/accessori           · /en/accessories        Categoria (2 prodotti)                MVP
│   └── /it/{categoria}/{prodotto} · /en/{category}/{product}   SCHEDA PRODOTTO              MVP
│         es. /it/reggiseni/axis-reggiseno · /en/bras/axis-bra
│             /it/slip/axis-slip          · /en/briefs/axis-brief
│         varianti: ?color=black  (colore preselezionato, condivisibile)
│
├── ACQUISTO
│   ├── (pannello) BORSA — si apre da qualsiasi pagina                                        MVP
│   ├── /it/borsa               · /en/bag                Pagina Borsa (stesso contenuto del pannello) MVP
│   ├── /it/checkout            · /en/checkout           Checkout demo, una pagina             MVP
│   └── /it/checkout/conferma   · /en/checkout/confirmation   Conferma ordine demo            MVP
│
├── FIT
│   ├── (pannello) GUIDA TAGLIE — si apre dalla scheda prodotto                               MVP
│   ├── /it/guida-taglie        · /en/size-guide         Guida taglie completa (stessi dati)   MVP
│   └── /it/guida-ai-modelli    · /en/fit-guide          Guida ai modelli (silhouette a tratto) POI
│
├── BRAND
│   └── /it/about               · /en/about              About / manifesto                     MVP
│       (slug IT alternativo: /it/chi-siamo — vedi D5)
│
├── SERVIZIO (versione demo, layout di lettura)
│   ├── /it/spedizioni          · /en/shipping           Spedizioni (simulate)                 MVP
│   ├── /it/resi                · /en/returns            Resi e cambi (simulati)               MVP
│   ├── /it/contatti            · /en/contact            Contatti (nessun modulo, vedi §5)     MVP
│   ├── /it/faq                 · /en/faq                Domande frequenti                     POI
│   └── /it/cura-dei-capi       · /en/care               Cura dei capi                         POI
│
├── LEGALE (testi da `legal-compliance`)
│   ├── /it/termini             · /en/terms              Termini della demo                    MVP
│   ├── /it/privacy             · /en/privacy            Privacy (cosa resta nel browser)      MVP
│   └── /it/note-legali         · /en/legal-notice       Note legali / chi gestisce la demo   POI
│
├── SISTEMA
│   ├── 404 localizzata (/it/… → 404 IT, /en/… → 404 EN, altro → 404 EN con link IT)         MVP
│   ├── 500 / errore generico localizzato                                                      POI
│   └── /sitemap.xml, /robots.txt (con hreflang)  → `performance-seo`                          MVP
│
└── ESCLUSI dal progetto (motivo)
    ├── Account / login / wishlist salvata   → raccoglierebbe dati, nessun backend
    ├── Newsletter                           → raccoglierebbe email reali
    ├── Ricerca (CERCA)                      → 13 prodotti: il menu basta (vedi D3)
    ├── Pagine "Saldi", "Best seller", badge → contro il posizionamento minimal
    └── Archivio drop passati                → non esistono ancora (POI dal Drop 02)
```

**Conteggio MVP**: 1 home + 1 drop + 5 categorie + 13 schede + borsa + checkout + conferma + guida taglie + about + 3 servizio + 2 legali + 404 = **30 pagine per lingua**, 60 in totale (generate da template: in pratica ~12 template).

---

## 3. Navigazione: dove sta ogni pagina

| Pagina | Header | Menu mobile | Footer | Altro accesso |
|---|---|---|---|---|
| 5 categorie | ✔ | ✔ | — | breadcrumb scheda |
| GRID / 01 | ✔ (voce distinta, vedi D2) | ✔ (in cima) | ✔ | CTA home, borsa vuota, 404 |
| Borsa | ✔ `BORSA [n]` | ✔ (sempre in header) | — | dopo "Aggiungi" |
| Guida taglie | — | ✔ | ✔ | link in scheda prodotto (pannello) |
| About | — | ✔ | ✔ | home (blocco finale) |
| Spedizioni / Resi | — | ✔ (piccolo) | ✔ | riga rassicurazioni in scheda, borsa, checkout |
| Contatti | — | ✔ (piccolo) | ✔ | — |
| Termini / Privacy | — | — | ✔ | checkout (sotto il bottone) |
| Selettore IT / EN | ✔ desktop | ✔ (prima riga del menu) | ✔ | — |

---

## 4. Regole URL e lingua

- **Ingresso `/`**: reindirizza **una volta** alla lingua del browser (`it*` → `/it`, tutto il resto → `/en`), senza pop-up. Se l'hosting finale sarà statico senza logica server, ripiego: `/` → `/it` con link visibile `EN` (decisione tecnica da confermare in fase 6 con `frontend-developer` e `performance-seo`).
- **La lingua scelta a mano vince** sulla lingua del browser: si ricorda nel browser (preferenza tecnica, non un dato personale; da confermare con `legal-compliance`).
- **Categorie con slug tradotti**, prodotti con slug "nome + tipo" tradotto (vedi D5). Il catalogo locale contiene per ogni pagina la coppia di slug IT/EN, così il selettore lingua porta alla pagina equivalente e non alla home.
- **Coincidenze di nome**: AXIS, PLANE e GRID esistono come reggiseno **e** come slip. Lo slug non può essere solo il nome: serve il tipo (`axis-reggiseno` / `axis-slip`). Anche nelle card e nella borsa il nome va sempre accompagnato dal tipo (`AXIS — reggiseno a triangolo`).
- **Query string** (filtri, colore): chiavi e valori in inglese in entrambe le lingue → `?size=M&color=graphite&sort=price-asc`. Si conservano al cambio lingua.
- **Niente trailing slash misti**, tutto minuscolo, trattini (dettaglio per `performance-seo`).

---

## 5. Pagine "demo": vincoli

| Pagina | Vincolo UX |
|---|---|
| Tutte | Una **striscia demo sottile** in cima al sito (o nel footer, vedi D6) dice che è un sito dimostrativo. |
| Checkout | Banner `DEMO — nessun pagamento verrà effettuato` sempre visibile; **nessun campo carta** (vedi D4); bottone "Compila con dati di esempio". |
| Contatti | Nessun modulo che invia. Solo indirizzi fittizi con dominio di esempio (es. `@example.com`), mai un'email reale di terzi. |
| Spedizioni / Resi | Testi chiaramente simulati ("Nella demo…"). Nessuna promessa che sembri un servizio vero. |
| Privacy | Spiega cosa resta nel browser (contenuto della borsa, lingua) e come cancellarlo. |
| Conferma | Numero ordine finto visibilmente demo (es. `DEMO-0001`), "nessun addebito, nessun dato salvato". |

---

## 6. Priorità di rilascio

1. **MVP** (fase 6): tutto ciò che è marcato MVP sopra. Senza queste pagine il flusso "trova → scegli → borsa → checkout → conferma" non è completo o la demo non è onesta.
2. **POI, valore alto**: Guida ai modelli (contenuto di brand che regge senza foto, coerente con i disegni tecnici), FAQ.
3. **POI, valore basso**: Cura dei capi come pagina (nel MVP sta negli accordion della scheda), note legali estese, 500 dedicata, archivio drop.
