# LINGERAI — Sito web

Sito e-commerce **simulato** per LINGERAI, brand di lingerie.
Direzione estetica: **super minimal ed edgy**.
Stato: privato, in sviluppo. In futuro andrà su una repo GitHub **privata**.

## Regole di lavoro (le più importanti)

1. **Step by step.** Si lavora una fase alla volta. Alla fine di ogni fase ci si ferma, si mostra il risultato all'utente e si aspetta la sua approvazione prima di passare alla successiva.
2. **Nel dubbio, chiedi.** Nessuna decisione importante (nome, palette, font, struttura, stack, librerie, testi chiave) va presa da soli. Si propongono 2–3 opzioni con una raccomandazione e si lascia scegliere l'utente.
3. **Lingua.** Con l'utente e tra agenti si parla in **italiano**. Codice, nomi di file, variabili e commit restano in **inglese**.
4. **Ispirarsi, non copiare.** Dai brand di riferimento si prendono principi e idee, mai layout identici, testi, loghi o immagini.
5. **Niente azioni irreversibili senza ok esplicito**: niente push, niente repo pubbliche, niente installazioni di servizi esterni.

## Il progetto

| Voce | Decisione |
|---|---|
| Brand | LINGERAI |
| Tipo | E-commerce completo ma **simulato**: catalogo, scheda prodotto, taglie, carrello, checkout finto. Nessun pagamento reale, nessun dato reale raccolto |
| Lingue del sito | Italiano + Inglese, con selettore lingua |
| Stack proposto | Next.js (App Router) + TypeScript. Prodotti in file locali (JSON/TS), carrello salvato nel browser. Nessun backend né database. **Confermato dall'utente (2026-11-05).** Nuove librerie solo con ok dell'utente |
| Immagini | Placeholder o immagini con licenza libera finché non arrivano quelle del brand. Mai immagini prese da siti di altri brand |
| Hosting | Da decidere più avanti, insieme all'utente |

Il checkout deve dire chiaramente che è una demo (es. "Demo — nessun pagamento verrà effettuato").

## Orchestrazione

La sessione principale di Claude è **l'orchestratore**: riceve le richieste dell'utente, divide il lavoro, lo assegna agli agenti specialisti in `.claude/agents/`, raccoglie i risultati, risolve i conflitti tra pareri e presenta all'utente una sintesi con le decisioni da prendere.

(Nota tecnica: in Claude Code un sub-agente non può lanciare altri sub-agenti, per questo l'orchestratore è la sessione principale e non un agente separato.)

### Il team

Ruoli e istruzioni sono nei file in `.claude/agents/`. Chi interviene, per fase:

- **Ricerca:** `brand-researcher`, `fashion-expert`
- **Creativo e contenuti:** `art-director`, `copywriter`, `visual-content`
- **Struttura e revisione:** `ux-reviewer`, `accessibility-auditor`, `performance-seo`, `legal-compliance`
- **Sviluppo e test:** `frontend-developer`, `qa-tester`

### Come orchestrare

- Lancia in parallelo gli agenti che non dipendono l'uno dall'altro (es. `brand-researcher` e `fashion-expert` nella fase di ricerca).
- Passa a ogni agente il contesto che gli serve: gli agenti partono da zero e non vedono la conversazione. Indica sempre i file da leggere in `docs/`.
- I risultati importanti si salvano in `docs/` così restano tra una sessione e l'altra.
- Quando due agenti sono in disaccordo (es. designer vs accessibilità), non scegliere da solo: presenta il conflitto all'utente con una raccomandazione.

## Comandi

Dalla root del progetto (Node 24, npm 11):

| Comando | Cosa fa |
|---|---|
| `npm install` | installa le dipendenze |
| `npm run dev` | sito in locale su http://localhost:3000 (`/` reindirizza a `/it` o `/en`) |
| `npm run build` | build di produzione (tutte le pagine statiche); deve passare senza errori |
| `npm run start` | avvia la build di produzione (dopo `npm run build`) |
| `npm run lint` | ESLint (config Next); deve passare senza errori |

Test end-to-end (Playwright): da aggiungere nella tappa successiva.

**OneDrive:** `node_modules/` e `.next/` sono collegamenti (junction) verso `C:\Users\aless\dev-cache\lingerai\`, così OneDrive non li sincronizza. Per questo `next.config.ts` imposta la radice di build sulla cartella utente. Non cancellare questi collegamenti: se servono dipendenze pulite, svuota la cartella in `dev-cache`, non il collegamento. Se un collegamento sparisce, ricrealo con `mklink /J` prima di `npm install`.

**Git:** repository solo locale. Commit a fine di ogni tappa; nessun push senza richiesta esplicita.

## Fasi del progetto

Ogni fase finisce con un **ok dell'utente**. Quando una fase viene approvata, aggiorna qui lo stato (✅ / *fase attuale*).

0. **Setup** — CLAUDE.md e agenti ✅
1. **Ricerca** — `brand-researcher` + `fashion-expert` → `docs/research/` ✅
2. **Direzione creativa** — moodboard a parole, 2–3 direzioni visive, tono di voce → `docs/brand/` ✅
3. **Struttura e UX** — mappa del sito, pagine, flusso d'acquisto → `docs/ux/` ✅
4. **Design system** — colori, font, griglia, componenti → `docs/design/` ✅
5. **Testi** — copy IT/EN delle pagine principali → `docs/copy/` ✅
6. **Sviluppo** — progetto Next.js, pagine, carrello e checkout simulati *(fase attuale)*
7. **Revisione** — UX, accessibilità, performance/SEO; correzioni
8. **GitHub** — repo privata, primo push (solo su richiesta esplicita)

## Struttura cartelle prevista

```
docs/
  research/   ricerca brand e mercato
  brand/      direzione creativa, tono di voce
  ux/         mappa del sito, flussi
  design/     design system
  copy/       testi IT/EN
  visual/     segnaposto, fonti immagini, linee guida foto
  legal/      revisione compliance
  qa/         report dei test
  decisions.md  registro delle decisioni prese con l'utente
src/          codice (dalla fase 6)
```

## Registro decisioni

Ogni decisione approvata dall'utente va annotata in `docs/decisions.md` con data e motivo, così nessun agente la rimette in discussione.
