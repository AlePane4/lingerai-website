# Revisione performance e SEO — LINGERAI (fase 7)

Data: 2026-11-06. Misure su produzione locale (http://localhost:3200), solo lettura. Nessun Lighthouse: stime CWV non misurate, solo dati di trasferimento.

## 1. Sintesi
- Home: HTML 89 KB (18 KB gzip); JS iniziale 11 script, ~200 KB gzip (JS totale in `.next/static`: 707 KB raw, CSS 52 KB). Prodotto: HTML 86 KB.
- Immagine piu pesante: `public/images/editorial/drop-gallery-2.jpg`, 390 KB (sorgenti 1200-2000 px, 3,5 MB in `public/images`). Servita da `/_next/image` in AVIF: hero 40 KB a 640 px, 127 KB a 1920/3840 px.
- Font: 4 file woff2, 155 KB (Archivo variabile 90 KB, preload; JetBrains Mono 3 pesi, 65 KB, no preload). `font-display: swap` + fallback con metriche aggiustate: ok.
- SEO base solida: title/description/canonical/hreflang (it, en-GB, x-default) su ogni pagina, sitemap 56 URL con alternates, robots.txt `Disallow: /`.
- Problema principale: il `noindex` globale NON arriva nell'HTML (vedi SEO-1). Nessun JSON-LD e nessun `og:image`.

## 2. Coerenza demo / indicizzazione
- `src/lib/site.ts:9` `ALLOW_INDEXING = false`; `src/app/robots.ts:6` restituisce `Disallow: /` (verificato: `/robots.txt`). Coerente.
- Sitemap pubblicata comunque (56 URL, host `http://localhost:3000`): innocua ma incoerente con robots (SEO-3).
- Al momento della pubblicazione (promemoria, non da fare ora): `ALLOW_INDEXING`, `NEXT_PUBLIC_SITE_URL`, og:image, JSON-LD, rivedere privacy/termini.

## 3. Problemi verificati

| ID | Prio | Problema | Dove | Correzione |
|---|---|---|---|---|
| SEO-1 | alta | Il `<meta name="robots" content="noindex">` previsto dal layout manca su tutte le pagine tranne le noindex (checkout ecc.): verificato su /it, /en, /it/reggiseni, scheda prodotto. Il `robots: undefined` restituito da `routeMetadata` sovrascrive quello ereditato. Resta solo `Disallow: /` che non impedisce l'indicizzazione di URL linkati da fuori | `src/i18n/metadata.ts:53`, `src/app/[lang]/layout.tsx:26` | In `metadata.ts` usare `robots: noindex || !ALLOW_INDEXING ? { index: false, follow: noindex } : undefined` (importando `ALLOW_INDEXING`), oppure omettere la chiave `robots` quando non serve. Ricontrollare con `curl ... \| grep robots` |
| SEO-2 | media | Pagine noindex (checkout, borsa) con `noindex, follow`; in demo dovrebbe essere `noindex, nofollow` come il layout | `src/i18n/metadata.ts:53` | Stessa correzione di SEO-1: durante la demo `follow:false` ovunque |
| SEO-3 | bassa | `sitemap.xml` servito durante la demo con URL `http://localhost:3000`, mentre robots non lo cita | `src/app/sitemap.ts` | Opzionale: restituire `[]` se `!ALLOW_INDEXING`; alla pubblicazione impostare `NEXT_PUBLIC_SITE_URL` (altrimenti canonical/hreflang/sitemap restano su localhost) |
| SEO-4 | media (pre-pubblicazione) | Nessun dato strutturato `Product` sulle schede prodotto (nessun `application/ld+json` nel codice né nell'HTML) | `src/app/[lang]/[...path]/page.tsx`, componente scheda prodotto | Aggiungere `<script type="application/ld+json">` con `Product` (name, description, image assoluta, sku, `offers` price/priceCurrency EUR/availability). Essendo demo, valutare di renderlo solo con `ALLOW_INDEXING` e di non dichiarare disponibilita reale |
| SEO-5 | media (pre-pubblicazione) | Nessun `og:image` / `twitter:image`; `twitter:card` = summary. La condivisione non mostra immagine | `src/i18n/metadata.ts:54` | Aggiungere `openGraph.images` (foto editoriale 1200x630 o prodotto) e `twitter:card: summary_large_image`; `og:type` `website` anche su prodotti (`product` non supportato da Next tipizzato, ok) |
| SEO-6 | bassa | `og:url` e `og:site_name` assenti; `og:locale:alternate` non indicato | `src/i18n/metadata.ts:54` | Aggiungere `url`, `siteName: "LINGERAI"`, `alternateLocale` |
| PERF-1 | media | Immagini editoriali sorgente pesanti (fino a 390 KB, 1500x2000 px, 3,5 MB totali). Il rendering passa da `next/image` (AVIF, 40-127 KB) quindi l'impatto utente e contenuto, ma `Cache-Control` di `/_next/image` e `max-age=14400` (4 h) e quello di `/images/*` e `max-age=0` | `public/images/editorial/*`, `next.config.ts:15` | Aggiungere `images.minimumCacheTTL: 31536000` e un blocco `headers()` per `/images/:path*` e `/placeholders/:path*` con `public, max-age=31536000, immutable` (rinominando i file se cambiano). Ricomprimere le sorgenti a ~1600 px lato lungo, q80 |
| PERF-2 | media | Hero: `sizes="... 30vw"` sotto 48rem, ma il `src` di fallback e il `srcset` includono fino a 3840 px; il preload `imageSrcSet` elenca 10 larghezze. Su schermi stretti (miniatura) la scelta e corretta, ma `deviceSizes` default sono troppi per un sito con foto 1200-1500 px | `src/components/pages/HomePage.tsx:37`, `next.config.ts:15` | Limitare `images.deviceSizes: [640, 828, 1080, 1280, 1600]` e `imageSizes: [256, 384]`; evita varianti 2048/3840 inutili (il file originale e 1200 px: oltre non c'e dettaglio) |
| PERF-3 | media | Hero 1200x1600 e LCP della home su desktop; `preload` presente ed e `priority` corretto. Non verificato il tempo reale. Sulla mobile nascosta da CSS sotto certe altezze (`display:none`?) ma il preload parte comunque: un'immagine scaricata e non mostrata | `src/components/pages/HomePage.module.css:11`, `HomePage.tsx:34` | Verificare in browser (viewport 375x667) se l'hero e `display:none`: se si, rimuovere `preload` e usare `loading="lazy"` oppure renderizzarla solo dove visibile; altrimenti ok |
| PERF-4 | bassa | Preload anche di 2 SVG prodotto (`priorityCount={2}`) oltre a font e hero: tre preload in competizione con LCP | `src/components/pages/HomePage.tsx:56` | Portare `priorityCount` a 0 o 1 se l'hero e l'LCP; gli SVG pesano ~4 KB, impatto minimo |
| PERF-5 | bassa | JS client: 22 file con `"use client"`; home ~200 KB gzip (framework Next/React ~ 110 KB gzip stimati inclusi). Chunk piu grandi 229 KB, 169 KB, 113 KB raw: tipici del runtime, non attribuibili a codice proprio senza analyzer | `.next/static/chunks/` | Nessuna azione urgente. Verificare che `Footer`, `DemoStrip` e pagine informative restino Server Component; usare `next experimental-analyze` (non lanciato qui) se si vuole scendere |
| PERF-6 | bassa | JetBrains Mono: 3 pesi (65 KB) caricati, senza preload; se il peso 500 e usato poco, un file in meno | `src/styles/fonts.ts:23-27` | Valutare di eliminare un peso (400/700) |
| PERF-7 | bassa | `cache-control: s-maxage=31536000` sugli HTML statici senza `stale-while-revalidate`/`max-age`: ok per CDN, il browser rivalida a ogni visita | header HTML | Nessuna azione in locale; da impostare in base all'hosting |

## 4. Verificato e a posto
- Titoli e description distinti per pagina in IT e EN; canonical self-referencing; hreflang reciproci `it` / `en-GB` / `x-default` -> it (home, categoria, prodotto, checkout).
- `<html lang>` corretto per lingua; `generateStaticParams` + `dynamicParams=false`: tutte le pagine statiche, nessun 404 dinamico indesiderato.
- Immagini editoriali con `next/image`, `fill`, `sizes`, contenitore a rapporto fisso (CLS atteso ~0); SVG prodotto con `width/height` 800x1000 e `loading="lazy"` oltre la prima riga.
- Nessuna animazione critica trovata in `globals.css` oltre al blocco `prefers-reduced-motion`.
- Font: un solo preload (Archivo variabile, latin) e fallback con metriche regolate.

## 5. Priorita consigliata
1. SEO-1 (+ SEO-2): ripristinare il `noindex` reale nell'HTML (cambio di 1 riga).
2. PERF-1 / PERF-2: cache lunga per immagini statiche e ridurre `deviceSizes`.
3. Prima della pubblicazione (non ora): SEO-4, SEO-5, SEO-6, SEO-3.
