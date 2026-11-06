# LINGERAI — Sito web

E-commerce **simulato** per LINGERAI, brand di lingerie. Estetica **super minimal ed edgy**. Privato, in sviluppo.

## Regole di lavoro

1. **Step by step.** Una fase alla volta; a fine fase si mostra il risultato e si aspetta l'ok dell'utente.
2. **Nel dubbio, chiedi.** Decisioni importanti (palette, font, struttura, librerie, testi chiave): 2–3 opzioni con raccomandazione, sceglie l'utente.
3. **Lingua.** Con l'utente e tra agenti: italiano. Codice, file, variabili, commit: inglese.
4. **Ispirarsi, non copiare** layout, testi, loghi o immagini di altri brand.
5. **Niente azioni irreversibili senza ok esplicito**: niente push, repo pubbliche, servizi esterni, nuove librerie.

## Vincoli del progetto

- Next.js (App Router) + TypeScript. Prodotti in file locali, carrello nel browser. Nessun backend né database.
- Sito IT + EN con selettore lingua.
- Checkout finto, deve dire chiaramente che è una demo. Nessun pagamento né dato reale.
- Immagini: solo placeholder o licenza libera verificata (fonti in `docs/visual/`).
- Decisioni già prese: `docs/decisions.md`. Ogni nuova decisione approvata va annotata lì con data e motivo; gli agenti non le rimettono in discussione.

## Orchestrazione

La sessione principale (Opus) è l'orchestratore: divide il lavoro, lo assegna agli agenti in `.claude/agents/`, sintetizza i risultati per l'utente. Se due agenti sono in disaccordo, presenta il conflitto all'utente con una raccomandazione.

**Risparmio d'uso (decisione 2026-11-06):** gli specialisti girano su Sonnet, `qa-tester` su Haiku (campo `model:` nei file degli agenti). Quindi:
- dai a ogni agente un compito preciso: file esatti da leggere in `docs/`, cosa produrre, dove salvarlo;
- lancia solo gli agenti che servono davvero alla tappa; in parallelo se indipendenti;
- piccole modifiche (un testo, un colore, un fix di poche righe) falle direttamente, senza agente;
- i risultati importanti vanno salvati in `docs/`.

## Comandi (Node 24, npm 11)

| Comando | Cosa fa |
|---|---|
| `npm run dev` | locale su http://localhost:3000 (`/` → `/it` o `/en`) |
| `npm run build` | build statica; deve passare senza errori |
| `npm run lint` | ESLint; deve passare senza errori |
| `npm run test:e2e` | Playwright (`tests/e2e/`, Chromium, 1440 + 375). Fa build e avvia il server sulla porta 3107. Tracce dei falliti in `test-results/` |

**OneDrive:** `node_modules/` e `.next/` sono junction verso `C:\Users\aless\dev-cache\lingerai\` (per questo `next.config.ts` imposta la radice di build). Non cancellarle. Dopo ogni `npm install <pacchetto>` controlla che `node_modules` sia ancora una junction (`Get-Item node_modules | Select LinkType`); se non lo è, sposta la cartella in `dev-cache` e ricrea il collegamento con `mklink /J`.

**Git:** solo locale. Commit a fine di ogni tappa; nessun push senza richiesta esplicita.

## Fasi

0–6 ✅ (setup, ricerca, direzione creativa, UX, design system, testi, sviluppo) — documenti in `docs/`.
7. **Revisione** — UX, accessibilità, performance/SEO, legal; correzioni → `docs/review/` *(fase attuale)*
8. **GitHub** — repo privata, primo push (solo su richiesta esplicita)
