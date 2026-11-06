# Edgy: implementazione variante C (branch `edgy`, 2026-11-06)

## Esito
- `npm run lint`: ok. `npm run build`: ok. `npm run test:e2e`: 22/22 (desktop + mobile). `build:pages` non lanciato.
- `node_modules` ancora Junction dopo i comandi.
- Nessun test da aggiornare: nessuno cerca i testi cambiati. Nessun test indebolito.
- Verifica visiva a schermo e audit contrasti NON fatti (solo valori dal documento direzione): serve passata di `accessibility-auditor`.

## File toccati
- Token/base: `src/styles/globals.css` (palette carta/ink/rosso/giallo, `--shadow-*`, `--grain`, bordi 2px, focus doppio anello, bottoni, link-inline blu/viola, classi `.zine`, `.hl`, `.hand-note`, `.hand-stamp`), `src/styles/fonts.ts` (Permanent Marker), `src/styles/fonts/PermanentMarker-Apache-2.0.txt`, `src/app/[lang]/layout.tsx` (variabile font, themeColor).
- Nuovo: `src/components/ui/HandNote.tsx`.
- Modificati: `ui/WallTitle.tsx|.css` (copia "ghost" in contorno rosso, aria-hidden), `ui/EditorialPhoto.tsx|.css` (fotocopia via CSS, nastro e striscia rossa opzionali), `pages/HomePage`, `DropPage`, `AboutPage`, `NotFoundContent` (tsx+css), `checkout/ConfirmationPage.tsx`, `Checkout.module.css`, `layout/Header|MobileMenu|Footer|DemoStrip .module.css`, `product/ProductGrid|ProductCard .module.css`.
- `src/messages/it.json` e `en.json`: `handNotes` appiattito in chiavi `handNotes.home|drop|about|notFound|confirmation` (i messaggi sono un dizionario piatto, l'oggetto annidato rompeva il typecheck). Testi invariati.
- `package.json`, `package-lock.json`: `@fontsource/permanent-marker`.

## Scelte dove il documento lasciava margine
- `--c-signal` ora è giallo #FFE600 (testo ink): ripristina striscia demo, banner checkout, badge e tag senza toccare ogni modulo. Il rosso #C80000 è usato solo per decorazioni (nastro logo, voce corrente, ombra bottone primario, note a mano, ghost).
- Paragrafi `.t-body-l` in serif di sistema; altri testi restano Archivo.
- Una nota a mano per pagina; drop e conferma in versione "timbro" (bordo doppio rosso); timbro di conferma animato 150 ms una volta, disattivato con reduced-motion. Nessun timbro con testo scritto a mano nei componenti: i timbri usano le note `handNotes`.
- Grana 5% (`.zine::before`) solo su hero home, header drop, Chi siamo, 404, conferma; sulle foto editoriali 30% (non sotto testo).
- Nastro: home (hero a sinistra, editoriale a destra), drop hero, Chi siamo. Striscia rossa multiply solo su hero home e ritratto Chi siamo. Rotazioni ±1deg solo da 768px, su hero/editorial2 home e galleria drop.
- Card prodotto: bianche, bordo 2px, ombra dura; hover desktop solleva di 2px (0 ms). Griglia regolare, nessuna rotazione.
- Bottoni: primario ink + ombra rossa, secondario bianco + ombra ink, hover/active a spostamento.

## Scostamenti dalla variante C
- Nessun nastro/timbro sulle card in lista né sulla pagina categoria (solo cornice 2px e ombra): meno rischio nella zona di acquisto.
- Le foto di `CategoryPage` usano lo stesso componente: prendono bordo e fotocopia B/N, senza nastro.
- Menu mobile: filetti 3px e Archivo 900; il numero `[nn]` a destra non è stato aggiunto (richiederebbe testi/markup nuovi).
- Niente parole evidenziate nei paragrafi (richiederebbero markup nei testi): evidenziatore solo sul claim della home.
- Barra filtri drop, scheda prodotto, form: ereditano solo i token (bordo 2px, focus, carta/bianco); nessun ritocco ai singoli moduli.
- Sticky invariati (header + barre esistenti, max 2).

## Correzioni dopo screenshot
- Foto editoriali: filtro piu leggero (contrast 1.05, brightness 1.5), grana sulla foto al 12%, striscia rossa senza grana (prima il multiply scuriva tutto).
- 404: nota a mano con margini verticali, spostata sopra il bottone senza sovrapposizione; il bottone non e piu a tutta larghezza (selettore `first-of-type` ristretto al `div` del titolo).
- Chi siamo: nota a mano in blocco separato sotto il manifesto, rientrata e ruotata.
- Logo header: barra rossa spostata sul bordo inferiore, non copre piu le lettere.
- Controllate a 375 px: 404, Chi siamo (note libere, nessuna sovrapposizione).
