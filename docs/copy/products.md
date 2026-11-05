# LINGERAI — Testi del catalogo demo GRID / 01 (Fase 5, Testi)

> Autore: `copywriter` · Data: 2026-11-05 · Stato: **rivisto dopo le decisioni dell'utente e il report `docs/legal/compliance-review.md`**
> Base: `docs/research/product-positioning.md` §6 (catalogo), `docs/visual/visual-guidelines.md` (legende e alt), `docs/decisions.md`.
> Tono **A "SPEC"**: una informazione per frase, forma impersonale, nessun giudizio sui corpi, trasparenza sempre dichiarata.
> Convenzioni chiavi, variabili e plurali: `docs/copy/ui-strings.md` §0.

**Note**
- Nomi **decisi**: AXIS, PLANE, RASTER (ex GRID), STRUT (ex LINE), BEAM (ex FRAME), MONOLITH, VOID, PLUMB (ex SHEER), TENSION, HOLD.
- **MONOLITH** resta solo per la demo: è il nome di una linea underwear Calvin Klein, va cambiato prima di qualsiasi uso pubblico (decisione utente).
- Nessun nome è stato verificato nei registri dei marchi (EUIPO / UIBM): serve una ricerca prima di un uso reale.
- Taglie: **XS–3XL** per tutti i capi in lettere; **65–95, coppe A–G** per PLANE (decisione utente).
- Composizioni = dati **demo**. I reggiseni sono indicati per **coppe e dorso** (Reg. UE 1007/2011, All. IV); le intestazioni delle righe di composizione sono **parti del capo**, mai tessuti ("microfibra", "mesh", "tulle" restano liberi in descrizione e costruzione). Dati da far ricontrollare al `fashion-expert`.
- Omessi del tutto, per decisione: claim su fibre riciclate, nichel-free, origine, confezione.

---

## 1. Dati condivisi

### 1.1 Tipi di prodotto (accompagnano sempre il nome)

| Chiave | IT | EN | Note |
|---|---|---|---|
| `type.triangleBra` | Reggiseno a triangolo | Triangle bra | |
| `type.balconetteBra` | Reggiseno balconette | Balconette bra | |
| `type.longlineBralette` | Bralette longline | Longline bralette | |
| `type.softCupBra` | Reggiseno senza ferretto | Soft-cup bra | |
| `type.brief` | Slip | Brief | |
| `type.thong` | Perizoma | Thong | |
| `type.highWaistBrief` | Slip a vita alta | High-waist brief | |
| `type.shorty` | Culotte | Shorty | |
| `type.bodysuit` | Body | Bodysuit | |
| `type.longSleeveBodysuit` | Body a manica lunga | Long-sleeve bodysuit | |
| `type.slip` | Sottoveste | Slip | EN "slip" = sottoveste |
| `type.harness` | Harness | Harness | |
| `type.suspenderBelt` | Reggicalze | Suspender belt | britannico (non "garter belt") |

Nelle frasi (alt, annunci) il tipo va in minuscolo: "AXIS, reggiseno a triangolo".

### 1.2 Colori

| Chiave | IT | EN | Valore URL | Note |
|---|---|---|---|---|
| `colour.black` | Nero | Black | `black` | |
| `colour.graphite` | Grafite | Graphite | `graphite` | |
| `colour.skin01` | Pelle 01 | Skin 01 | `skin-01` | deciso |
| `colour.skin02` | Pelle 02 | Skin 02 | `skin-02` | |
| `colour.skin03` | Pelle 03 | Skin 03 | `skin-03` | |
| `colour.opticWhite` | Bianco ottico | Optic white | `optic-white` | |
| `colour.skin01.note` | tono chiaro | light tone | — | testo SR, mai "nude" |
| `colour.skin02.note` | tono medio | medium tone | — | |
| `colour.skin03.note` | tono scuro | deep tone | — | |

### 1.3 Testi di cura (riusati)

| Chiave | IT | EN |
|---|---|---|
| `care.standard` | Lavaggio a mano in acqua fredda, oppure in lavatrice a 30 °C in un sacchetto per delicati. Non candeggiare. Non usare l'asciugatrice. Non stirare. Asciugare in piano. | Hand wash cold, or machine wash at 30°C in a mesh laundry bag. Do not bleach. Do not tumble dry. Do not iron. Dry flat. |
| `care.hooks` | Chiudere i gancetti prima del lavaggio. | Fasten the hooks before washing. |
| `care.underwire` | Lavaggio a mano consigliato: protegge il ferretto. | Hand washing recommended: it protects the underwire. |
| `care.silk` | Solo lavaggio a mano in acqua fredda con detergente per seta, oppure lavaggio a secco. Non strizzare. Non candeggiare. Non usare l'asciugatrice. Stirare al rovescio a bassa temperatura. Asciugare in piano, lontano dal sole. | Hand wash cold with a silk detergent only, or dry clean. Do not wring. Do not bleach. Do not tumble dry. Iron inside out on a low heat. Dry flat, away from direct sun. |
| `care.hardware` | Solo lavaggio a mano in acqua fredda. Asciugare subito le parti in metallo. Non candeggiare. Non usare l'asciugatrice. Non stirare. | Hand wash cold only. Dry metal parts straight away. Do not bleach. Do not tumble dry. Do not iron. |

### 1.4 Vestibilità (riusate)

| Chiave | IT | EN |
|---|---|---|
| `fit.regular` | Veste regolare. | True to size. |
| `fit.close` | Veste aderente. | Close fit. |
| `fit.relaxed` | Veste morbida. | Relaxed fit. |
| `fit.betweenBand` | Tra due taglie: la più grande in fascia. | Between sizes: go up a band. |
| `fit.betweenLetters` | Tra due taglie: la più grande. | Between sizes: size up. |
| `fit.adjustable` | Regolabile. | Adjustable. |

### 1.5 Taglie (etichette di gruppo)

| Chiave | IT | EN |
|---|---|---|
| `sizes.bandCup` | 65–95, coppe A–G | 65–95, cups A–G |
| `sizes.letters` | XS–3XL | XS–3XL |

### 1.6 Set coordinati

| Chiave | IT | EN |
|---|---|---|
| `set.axis` | AXIS reggiseno a triangolo + AXIS slip | AXIS triangle bra + AXIS brief |
| `set.plane` | PLANE reggiseno balconette + PLANE perizoma | PLANE balconette bra + PLANE thong |
| `set.raster` | RASTER bralette longline + RASTER culotte | RASTER longline bralette + RASTER shorty |
| `set.strutBeam` | STRUT reggiseno senza ferretto + BEAM slip a vita alta | STRUT soft-cup bra + BEAM high-waist brief |

---

## 2. Reggiseni

### 2.1 AXIS — reggiseno a triangolo · 95,00 € · `axisBra`

Slug: IT `axis-reggiseno` · EN `axis-bra` · Taglie: XS–3XL · Colori: Nero, Pelle 01, Pelle 02, Pelle 03 · Set: AXIS slip

| Chiave | IT | EN |
|---|---|---|
| `product.axisBra.name` | AXIS | AXIS |
| `product.axisBra.type` | → `type.triangleBra` | → `type.triangleBra` |
| `product.axisBra.description` | Triangolo in mesh. Una cucitura verticale a vista divide ogni coppa. Senza ferretto, senza imbottitura. Trasparente. | Mesh triangle. An exposed vertical seam splits each cup. No underwire, unlined. Sheer. |
| `product.axisBra.key.sheerness` | Trasparente | Sheer |
| `product.axisBra.key.underwire` | No | No |
| `product.axisBra.key.padding` | No | No |
| `product.axisBra.key.support` | Leggero | Light |
| `product.axisBra.construction.1` | Coppa in mesh monostrato, divisa da una cucitura verticale. | Single-layer mesh cup, split by a vertical seam. |
| `product.axisBra.construction.2` | Elastico sottoseno piatto. | Flat underband elastic. |
| `product.axisBra.construction.3` | Spalline regolabili, regolatori in metallo nero opaco. | Adjustable straps, matt black metal adjusters. |
| `product.axisBra.construction.4` | Chiusura posteriore a gancetti, tre posizioni. | Hook-and-eye back fastening, three positions. |
| `product.axisBra.composition.1` | Coppe e dorso: 78% poliammide, 22% elastan | Cups and back: 78% polyamide, 22% elastane |
| `product.axisBra.composition.2` | Parti non tessili: regolatori e gancetti in metallo | Non-textile parts: metal adjusters and hooks |
| `product.axisBra.care` | → `care.standard` + `care.hooks` | → idem |
| `product.axisBra.fit` | Veste regolare. Sostegno leggero. Tra due taglie: la più grande. | True to size. Light support. Between sizes: size up. |
| `product.axisBra.callout.1` | mesh trasparente | sheer mesh |
| `product.axisBra.callout.2` | cucitura verticale a vista | exposed vertical seam |
| `product.axisBra.callout.3` | elastico sottoseno piatto | flat underband elastic |
| `product.axisBra.callout.4` | regolatore spallina | strap adjuster |
| `product.axisBra.measure.A` | larghezza sottoseno | underband width |
| `product.axisBra.measure.B` | altezza coppa | cup height |
| `product.axisBra.alt.front` | AXIS, reggiseno a triangolo: disegno tecnico, vista frontale | AXIS, triangle bra: technical drawing, front view |
| `product.axisBra.alt.back` | AXIS, reggiseno a triangolo: disegno tecnico, vista dal retro | AXIS, triangle bra: technical drawing, back view |
| `product.axisBra.alt.detail` | AXIS, reggiseno a triangolo: disegno tecnico, dettaglio della cucitura verticale sulla coppa | AXIS, triangle bra: technical drawing, close-up of the vertical seam on the cup |

### 2.2 PLANE — reggiseno balconette · 135,00 € · `planeBra`

Slug: IT `plane-reggiseno` · EN `plane-bra` · Taglie: 65–95, coppe A–G · Colori: Nero, Grafite · Set: PLANE perizoma

| Chiave | IT | EN |
|---|---|---|
| `product.planeBra.name` | PLANE | PLANE |
| `product.planeBra.type` | → `type.balconetteBra` | → `type.balconetteBra` |
| `product.planeBra.description` | Balconette con ferretto. Pannelli in mesh doppio strato, scollo dritto. Una cucitura verticale a vista per coppa. Semi-trasparente. | Underwired balconette. Double-layer mesh panels, straight neckline. One exposed vertical seam per cup. Semi-sheer. |
| `product.planeBra.key.sheerness` | Semi-trasparente | Semi-sheer |
| `product.planeBra.key.underwire` | Sì | Yes |
| `product.planeBra.key.padding` | No | No |
| `product.planeBra.key.support` | Alto | Firm |
| `product.planeBra.construction.1` | Coppa in mesh doppio strato, senza imbottitura. | Double-layer mesh cup, unlined. |
| `product.planeBra.construction.2` | Ferretto in acciaio rivestito, dentro un canale cucito. | Coated steel underwire in a stitched channel. |
| `product.planeBra.construction.3` | Scollo dritto, orizzontale. | Straight, horizontal neckline. |
| `product.planeBra.construction.4` | Spalline regolabili, regolatori in metallo nero opaco. | Adjustable straps, matt black metal adjusters. |
| `product.planeBra.construction.5` | Chiusura posteriore a gancetti, tre posizioni. | Hook-and-eye back fastening, three positions. |
| `product.planeBra.composition.1` | Coppe, esterno e interno: 80% poliammide, 20% elastan | Cups, outer and inner: 80% polyamide, 20% elastane |
| `product.planeBra.composition.2` | Dorso: 80% poliammide, 20% elastan | Back: 80% polyamide, 20% elastane |
| `product.planeBra.composition.3` | Parti non tessili: ferretto in acciaio, regolatori e gancetti in metallo | Non-textile parts: steel underwire, metal adjusters and hooks |
| `product.planeBra.care` | → `care.standard` + `care.underwire` + `care.hooks` | → idem |
| `product.planeBra.fit` | Veste regolare. Fascia aderente. Tra due taglie: la più grande in fascia. | True to size. Firm band. Between sizes: go up a band. |
| `product.planeBra.callout.1` | ferretto in acciaio | steel underwire |
| `product.planeBra.callout.2` | mesh doppio strato | double-layer mesh |
| `product.planeBra.callout.3` | cucitura verticale a vista | exposed vertical seam |
| `product.planeBra.callout.4` | regolatore spallina | strap adjuster |
| `product.planeBra.measure.A` | larghezza fascia | band width |
| `product.planeBra.measure.B` | altezza coppa | cup height |
| `product.planeBra.alt.front` | PLANE, reggiseno balconette: disegno tecnico, vista frontale | PLANE, balconette bra: technical drawing, front view |
| `product.planeBra.alt.back` | PLANE, reggiseno balconette: disegno tecnico, vista dal retro | PLANE, balconette bra: technical drawing, back view |
| `product.planeBra.alt.detail` | PLANE, reggiseno balconette: disegno tecnico, dettaglio del ferretto e del mesh doppio strato | PLANE, balconette bra: technical drawing, close-up of the underwire and double-layer mesh |

### 2.3 RASTER — bralette longline · 120,00 € · `rasterBralette`

Slug: IT `raster-bralette` · EN `raster-bralette` · Taglie: XS–3XL · Colori: Nero, Bianco ottico · Set: RASTER culotte

| Chiave | IT | EN |
|---|---|---|
| `product.rasterBralette.name` | RASTER | RASTER |
| `product.rasterBralette.type` | → `type.longlineBralette` | → `type.longlineBralette` |
| `product.rasterBralette.description` | Bralette longline in tulle. Nastri piatti cuciti in griglia, in verticale e in orizzontale. Senza ferretto, senza imbottitura. Trasparente. | Longline tulle bralette. Flat tapes stitched on in a grid, vertical and horizontal. No underwire, unlined. Sheer. |
| `product.rasterBralette.key.sheerness` | Trasparente | Sheer |
| `product.rasterBralette.key.underwire` | No | No |
| `product.rasterBralette.key.padding` | No | No |
| `product.rasterBralette.key.support` | Leggero | Light |
| `product.rasterBralette.construction.1` | Tulle monostrato con nastri piatti cuciti a griglia. | Single-layer tulle with flat tapes stitched in a grid. |
| `product.rasterBralette.construction.2` | Fascia sottoseno alta. | Deep underband. |
| `product.rasterBralette.construction.3` | Senza chiusura: si infila dalla testa. | No fastening: pulls on over the head. |
| `product.rasterBralette.construction.4` | Spalline fisse in nastro. | Fixed tape straps. |
| `product.rasterBralette.composition.1` | Coppe e dorso: 85% poliammide, 15% elastan | Cups and back: 85% polyamide, 15% elastane |
| `product.rasterBralette.composition.2` | Nastri: 100% poliammide | Tapes: 100% polyamide |
| `product.rasterBralette.care` | → `care.standard` | → `care.standard` |
| `product.rasterBralette.fit` | Veste aderente. Senza chiusura: tra due taglie, la più grande. | Close fit. No fastening: between sizes, size up. |
| `product.rasterBralette.callout.1` | tulle trasparente | sheer tulle |
| `product.rasterBralette.callout.2` | nastro piatto | flat tape |
| `product.rasterBralette.callout.3` | fascia sottoseno alta | deep underband |
| `product.rasterBralette.measure.A` | larghezza fascia | band width |
| `product.rasterBralette.measure.B` | lunghezza davanti | front length |
| `product.rasterBralette.alt.front` | RASTER, bralette longline: disegno tecnico, vista frontale | RASTER, longline bralette: technical drawing, front view |
| `product.rasterBralette.alt.back` | RASTER, bralette longline: disegno tecnico, vista dal retro | RASTER, longline bralette: technical drawing, back view |
| `product.rasterBralette.alt.detail` | RASTER, bralette longline: disegno tecnico, dettaglio dell'incrocio dei nastri sul tulle | RASTER, longline bralette: technical drawing, close-up of the tapes crossing on the tulle |

### 2.4 STRUT — reggiseno senza ferretto · 98,00 € · `strutBra`

Slug: IT `strut-reggiseno` · EN `strut-bra` · Taglie: XS–3XL · Colori: Nero, Pelle 01, Pelle 02, Pelle 03 · Set: BEAM

| Chiave | IT | EN |
|---|---|---|
| `product.strutBra.name` | STRUT | STRUT |
| `product.strutBra.type` | → `type.softCupBra` | → `type.softCupBra` |
| `product.strutBra.description` | Coppa morbida in microfibra opaca. Spalline sottili incrociate sulla schiena, come puntoni. Senza ferretto, senza imbottitura. Opaco. | Soft cup in matt microfibre. Thin straps cross at the back like struts. No underwire, unlined. Opaque. |
| `product.strutBra.key.sheerness` | Opaco | Opaque |
| `product.strutBra.key.underwire` | No | No |
| `product.strutBra.key.padding` | No | No |
| `product.strutBra.key.support` | Medio | Medium |
| `product.strutBra.construction.1` | Coppa morbida in microfibra doppio strato, senza imbottitura. | Soft cup in double-layer microfibre, unlined. |
| `product.strutBra.construction.2` | Spalline sottili incrociate sulla schiena, regolabili. | Thin straps crossing at the back, adjustable. |
| `product.strutBra.construction.3` | Chiusura posteriore a gancetti, tre posizioni. | Hook-and-eye back fastening, three positions. |
| `product.strutBra.composition.1` | Coppe, esterno e interno, e dorso: 72% poliammide, 28% elastan | Cups, outer and inner, and back: 72% polyamide, 28% elastane |
| `product.strutBra.composition.2` | Parti non tessili: regolatori e gancetti in metallo | Non-textile parts: metal adjusters and hooks |
| `product.strutBra.care` | → `care.standard` + `care.hooks` | → idem |
| `product.strutBra.fit` | Veste regolare. Sostegno medio. Tra due taglie: la più grande. | True to size. Medium support. Between sizes: size up. |
| `product.strutBra.callout.1` | microfibra opaca | matt microfibre |
| `product.strutBra.callout.2` | coppa doppio strato | double-layer cup |
| `product.strutBra.callout.3` | spalline incrociate | crossed straps |
| `product.strutBra.measure.A` | larghezza sottoseno | underband width |
| `product.strutBra.measure.B` | altezza coppa | cup height |
| `product.strutBra.alt.front` | STRUT, reggiseno senza ferretto: disegno tecnico, vista frontale | STRUT, soft-cup bra: technical drawing, front view |
| `product.strutBra.alt.back` | STRUT, reggiseno senza ferretto: disegno tecnico, vista dal retro | STRUT, soft-cup bra: technical drawing, back view |
| `product.strutBra.alt.detail` | STRUT, reggiseno senza ferretto: disegno tecnico, dettaglio dell'incrocio delle spalline sulla schiena | STRUT, soft-cup bra: technical drawing, close-up of the straps crossing at the back |

---

## 3. Slip

Per tutti: `product.returns.hygiene` + rassicurazione `product.reassure.hygiene` (vedi `ui-strings.md` §8).

### 3.1 AXIS — slip · 48,00 € · `axisBrief`

Slug: IT `axis-slip` · EN `axis-brief` · Taglie: XS–3XL · Colori: Nero, Pelle 01, Pelle 02, Pelle 03 · Set: AXIS reggiseno

| Chiave | IT | EN |
|---|---|---|
| `product.axisBrief.name` | AXIS | AXIS |
| `product.axisBrief.type` | → `type.brief` | → `type.brief` |
| `product.axisBrief.description` | Slip a vita media in mesh. Cucitura centrale a vista, davanti e dietro. Tassello in cotone. Trasparente. | Mid-rise mesh brief. Exposed centre seam, front and back. Cotton gusset. Sheer. |
| `product.axisBrief.key.sheerness` | Trasparente, tassello opaco | Sheer, opaque gusset |
| `product.axisBrief.key.gusset` | Cotone | Cotton |
| `product.axisBrief.construction.1` | Mesh monostrato, cucitura centrale a vista. | Single-layer mesh, exposed centre seam. |
| `product.axisBrief.construction.2` | Vita media con elastico piatto. | Mid rise with flat elastic waistband. |
| `product.axisBrief.construction.3` | Copertura dietro: media. | Back coverage: medium. |
| `product.axisBrief.composition.1` | Corpo: 78% poliammide, 22% elastan | Body: 78% polyamide, 22% elastane |
| `product.axisBrief.composition.2` | Tassello: 100% cotone | Gusset: 100% cotton |
| `product.axisBrief.care` | → `care.standard` | → `care.standard` |
| `product.axisBrief.fit` | Veste regolare. Vita media. | True to size. Mid rise. |
| `product.axisBrief.callout.1` | mesh | mesh |
| `product.axisBrief.callout.2` | tassello in cotone | cotton gusset |
| `product.axisBrief.callout.3` | cucitura centrale a vista | exposed centre seam |
| `product.axisBrief.measure.A` | larghezza in vita | waist width |
| `product.axisBrief.measure.B` | altezza davanti | front rise |
| `product.axisBrief.measure.C` | altezza fianco | side height |
| `product.axisBrief.alt.front` | AXIS, slip: disegno tecnico, vista frontale | AXIS, brief: technical drawing, front view |
| `product.axisBrief.alt.back` | AXIS, slip: disegno tecnico, vista dal retro | AXIS, brief: technical drawing, back view |
| `product.axisBrief.alt.detail` | AXIS, slip: disegno tecnico, dettaglio della cucitura centrale | AXIS, brief: technical drawing, close-up of the centre seam |

### 3.2 PLANE — perizoma · 45,00 € · `planeThong`

Slug: IT `plane-perizoma` · EN `plane-thong` · Taglie: XS–3XL · Colori: Nero, Grafite · Set: PLANE reggiseno

| Chiave | IT | EN |
|---|---|---|
| `product.planeThong.name` | PLANE | PLANE |
| `product.planeThong.type` | → `type.thong` | → `type.thong` |
| `product.planeThong.description` | Perizoma in mesh doppio strato. Banda elastica piatta in vita, linea dritta. Tassello in cotone. Semi-trasparente. | Double-layer mesh thong. Flat elastic waistband, straight line. Cotton gusset. Semi-sheer. |
| `product.planeThong.key.sheerness` | Semi-trasparente | Semi-sheer |
| `product.planeThong.key.gusset` | Cotone | Cotton |
| `product.planeThong.construction.1` | Mesh doppio strato davanti. | Double-layer mesh front. |
| `product.planeThong.construction.2` | Banda elastica piatta, dritta sui fianchi. | Flat elastic band, straight across the hips. |
| `product.planeThong.construction.3` | Retro sottile. | Narrow back. |
| `product.planeThong.composition.1` | Corpo: 80% poliammide, 20% elastan | Body: 80% polyamide, 20% elastane |
| `product.planeThong.composition.2` | Tassello: 100% cotone | Gusset: 100% cotton |
| `product.planeThong.care` | → `care.standard` | → `care.standard` |
| `product.planeThong.fit` | Veste regolare. | True to size. |
| `product.planeThong.callout.1` | mesh doppio strato | double-layer mesh |
| `product.planeThong.callout.2` | banda elastica piatta | flat elastic band |
| `product.planeThong.callout.3` | tassello in cotone | cotton gusset |
| `product.planeThong.measure.A` | larghezza in vita | waist width |
| `product.planeThong.measure.B` | altezza davanti | front rise |
| `product.planeThong.alt.front` | PLANE, perizoma: disegno tecnico, vista frontale | PLANE, thong: technical drawing, front view |
| `product.planeThong.alt.back` | PLANE, perizoma: disegno tecnico, vista dal retro | PLANE, thong: technical drawing, back view |
| `product.planeThong.alt.detail` | PLANE, perizoma: disegno tecnico, dettaglio della banda elastica piatta | PLANE, thong: technical drawing, close-up of the flat elastic band |

### 3.3 BEAM — slip a vita alta · 62,00 € · `beamBrief`

Slug: IT `beam-slip` · EN `beam-brief` · Taglie: XS–3XL · Colori: Nero, Grafite · Set: STRUT

| Chiave | IT | EN |
|---|---|---|
| `product.beamBrief.name` | BEAM | BEAM |
| `product.beamBrief.type` | → `type.highWaistBrief` | → `type.highWaistBrief` |
| `product.beamBrief.description` | Slip a vita alta. Una banda opaca in microfibra corre dritta sopra l'ombelico, come una trave. Fianchi in mesh trasparente. Tassello in cotone. | High-waist brief. An opaque microfibre band runs straight above the navel, like a beam. Sheer mesh at the sides. Cotton gusset. |
| `product.beamBrief.key.sheerness` | Opaco davanti, trasparente sui fianchi | Opaque front, sheer sides |
| `product.beamBrief.key.gusset` | Cotone | Cotton |
| `product.beamBrief.construction.1` | Banda frontale in microfibra doppio strato. | Double-layer microfibre front band. |
| `product.beamBrief.construction.2` | Pannelli laterali in mesh. | Mesh side panels. |
| `product.beamBrief.construction.3` | Vita alta con elastico piatto. | High rise with flat elastic waistband. |
| `product.beamBrief.composition.1` | Banda frontale: 72% poliammide, 28% elastan | Front band: 72% polyamide, 28% elastane |
| `product.beamBrief.composition.2` | Fianchi: 80% poliammide, 20% elastan | Sides: 80% polyamide, 20% elastane |
| `product.beamBrief.composition.3` | Tassello: 100% cotone | Gusset: 100% cotton |
| `product.beamBrief.care` | → `care.standard` | → `care.standard` |
| `product.beamBrief.fit` | Veste regolare. Vita alta, sopra l'ombelico. | True to size. High rise, above the navel. |
| `product.beamBrief.callout.1` | banda in microfibra opaca | opaque microfibre band |
| `product.beamBrief.callout.2` | fianco in mesh | mesh side |
| `product.beamBrief.callout.3` | tassello in cotone | cotton gusset |
| `product.beamBrief.measure.A` | larghezza in vita | waist width |
| `product.beamBrief.measure.B` | altezza davanti | front rise |
| `product.beamBrief.measure.C` | altezza banda | band height |
| `product.beamBrief.alt.front` | BEAM, slip a vita alta: disegno tecnico, vista frontale | BEAM, high-waist brief: technical drawing, front view |
| `product.beamBrief.alt.back` | BEAM, slip a vita alta: disegno tecnico, vista dal retro | BEAM, high-waist brief: technical drawing, back view |
| `product.beamBrief.alt.detail` | BEAM, slip a vita alta: disegno tecnico, dettaglio dell'unione tra banda opaca e mesh | BEAM, high-waist brief: technical drawing, close-up of where the opaque band meets the mesh |

### 3.4 RASTER — culotte · 58,00 € · `rasterShorty`

Slug: IT `raster-culotte` · EN `raster-shorty` · Taglie: XS–3XL · Colori: Nero, Bianco ottico · Set: RASTER bralette

| Chiave | IT | EN |
|---|---|---|
| `product.rasterShorty.name` | RASTER | RASTER |
| `product.rasterShorty.type` | → `type.shorty` | → `type.shorty` |
| `product.rasterShorty.description` | Culotte in tulle. Stessa griglia di nastri piatti della bralette. Tassello in cotone. Trasparente. | Tulle shorty. The same flat-tape grid as the bralette. Cotton gusset. Sheer. |
| `product.rasterShorty.key.sheerness` | Trasparente, tassello opaco | Sheer, opaque gusset |
| `product.rasterShorty.key.gusset` | Cotone | Cotton |
| `product.rasterShorty.construction.1` | Tulle monostrato con nastri piatti cuciti a griglia. | Single-layer tulle with flat tapes stitched in a grid. |
| `product.rasterShorty.construction.2` | Gamba dritta, copertura piena dietro. | Straight leg, full back coverage. |
| `product.rasterShorty.construction.3` | Vita media con elastico piatto. | Mid rise with flat elastic waistband. |
| `product.rasterShorty.composition.1` | Corpo: 85% poliammide, 15% elastan | Body: 85% polyamide, 15% elastane |
| `product.rasterShorty.composition.2` | Nastri: 100% poliammide | Tapes: 100% polyamide |
| `product.rasterShorty.composition.3` | Tassello: 100% cotone | Gusset: 100% cotton |
| `product.rasterShorty.care` | → `care.standard` | → `care.standard` |
| `product.rasterShorty.fit` | Veste aderente. Tra due taglie: la più grande. | Close fit. Between sizes: size up. |
| `product.rasterShorty.callout.1` | tulle trasparente | sheer tulle |
| `product.rasterShorty.callout.2` | nastro piatto | flat tape |
| `product.rasterShorty.callout.3` | tassello in cotone | cotton gusset |
| `product.rasterShorty.measure.A` | larghezza in vita | waist width |
| `product.rasterShorty.measure.B` | altezza davanti | front rise |
| `product.rasterShorty.measure.C` | lunghezza gamba laterale | side leg length |
| `product.rasterShorty.alt.front` | RASTER, culotte: disegno tecnico, vista frontale | RASTER, shorty: technical drawing, front view |
| `product.rasterShorty.alt.back` | RASTER, culotte: disegno tecnico, vista dal retro | RASTER, shorty: technical drawing, back view |
| `product.rasterShorty.alt.detail` | RASTER, culotte: disegno tecnico, dettaglio della griglia di nastri | RASTER, shorty: technical drawing, close-up of the tape grid |

---

## 4. Body

Per tutti: `product.returns.hygiene` + `product.reassure.hygiene`.

### 4.1 MONOLITH — body · 185,00 € · `monolithBodysuit`

Nome tenuto **solo per la demo** (vedi Note). Slug: IT `monolith-body` · EN `monolith-bodysuit` · Taglie: XS–3XL · Colori: Nero, Grafite

| Chiave | IT | EN |
|---|---|---|
| `product.monolithBodysuit.name` | MONOLITH | MONOLITH |
| `product.monolithBodysuit.type` | → `type.bodysuit` | → `type.bodysuit` |
| `product.monolithBodysuit.description` | Body in microfibra opaca. Scollo dritto, schiena a T, sgambato alto. Si indossa anche come top. Opaco. | Matt microfibre bodysuit. Straight neckline, T-back, high-cut leg. Works as a top too. Opaque. |
| `product.monolithBodysuit.key.sheerness` | Opaco | Opaque |
| `product.monolithBodysuit.key.underwire` | No | No |
| `product.monolithBodysuit.key.padding` | No | No |
| `product.monolithBodysuit.key.gusset` | Cotone | Cotton |
| `product.monolithBodysuit.construction.1` | Microfibra doppio strato sul davanti. | Double-layer microfibre front. |
| `product.monolithBodysuit.construction.2` | Scollo dritto, spalline larghe fisse, schiena a T. | Straight neckline, wide fixed straps, T-back. |
| `product.monolithBodysuit.construction.3` | Sgambato alto. | High-cut leg. |
| `product.monolithBodysuit.construction.4` | Chiusura a gancetti sul cavallo. | Hook-and-eye fastening at the gusset. |
| `product.monolithBodysuit.composition.1` | Corpo: 72% poliammide, 28% elastan | Body: 72% polyamide, 28% elastane |
| `product.monolithBodysuit.composition.2` | Tassello: 100% cotone | Gusset: 100% cotton |
| `product.monolithBodysuit.composition.3` | Parti non tessili: gancetti in metallo | Non-textile parts: metal hooks |
| `product.monolithBodysuit.care` | → `care.standard` + `care.hooks` | → idem |
| `product.monolithBodysuit.fit` | Veste regolare. Sgambato alto. | True to size. High-cut leg. |
| `product.monolithBodysuit.callout.1` | microfibra opaca | matt microfibre |
| `product.monolithBodysuit.callout.2` | sgambatura alta | high-cut leg |
| `product.monolithBodysuit.callout.3` | tassello | gusset |
| `product.monolithBodysuit.measure.A` | larghezza scollo | neckline width |
| `product.monolithBodysuit.measure.B` | lunghezza davanti | front length |
| `product.monolithBodysuit.measure.C` | altezza sgambatura | leg-cut height |
| `product.monolithBodysuit.alt.front` | MONOLITH, body: disegno tecnico, vista frontale | MONOLITH, bodysuit: technical drawing, front view |
| `product.monolithBodysuit.alt.back` | MONOLITH, body: disegno tecnico, vista dal retro con schiena a T | MONOLITH, bodysuit: technical drawing, back view with T-back |
| `product.monolithBodysuit.alt.detail` | MONOLITH, body: disegno tecnico, dettaglio dello scollo dritto | MONOLITH, bodysuit: technical drawing, close-up of the straight neckline |

### 4.2 VOID — body a manica lunga · 210,00 € · `voidBodysuit`

Slug: IT `void-body` · EN `void-bodysuit` · Taglie: XS–3XL · Colori: Nero

| Chiave | IT | EN |
|---|---|---|
| `product.voidBodysuit.name` | VOID | VOID |
| `product.voidBodysuit.type` | → `type.longSleeveBodysuit` | → `type.longSleeveBodysuit` |
| `product.voidBodysuit.description` | Body in mesh a manica lunga. Collo alto. Cuciture a vista lungo braccia e fianchi. Trasparente. | Long-sleeve mesh bodysuit. High neck. Exposed seams along the arms and sides. Sheer. |
| `product.voidBodysuit.key.sheerness` | Trasparente, tassello opaco | Sheer, opaque gusset |
| `product.voidBodysuit.key.underwire` | No | No |
| `product.voidBodysuit.key.padding` | No | No |
| `product.voidBodysuit.key.gusset` | Cotone | Cotton |
| `product.voidBodysuit.construction.1` | Mesh monostrato, cuciture piatte a vista. | Single-layer mesh, flat exposed seams. |
| `product.voidBodysuit.construction.2` | Collo alto, maniche lunghe fino al polso. | High neck, full-length sleeves. |
| `product.voidBodysuit.construction.3` | Chiusura a gancetti sul cavallo. | Hook-and-eye fastening at the gusset. |
| `product.voidBodysuit.composition.1` | Corpo: 85% poliammide, 15% elastan | Body: 85% polyamide, 15% elastane |
| `product.voidBodysuit.composition.2` | Tassello: 100% cotone | Gusset: 100% cotton |
| `product.voidBodysuit.composition.3` | Parti non tessili: gancetti in metallo | Non-textile parts: metal hooks |
| `product.voidBodysuit.care` | → `care.standard` + `care.hooks` | → idem |
| `product.voidBodysuit.fit` | Veste aderente. Maniche fino al polso. | Close fit. Sleeves to the wrist. |
| `product.voidBodysuit.callout.1` | mesh trasparente | sheer mesh |
| `product.voidBodysuit.callout.2` | collo alto | high neck |
| `product.voidBodysuit.callout.3` | cucitura a vista | exposed seam |
| `product.voidBodysuit.measure.A` | larghezza spalle | shoulder width |
| `product.voidBodysuit.measure.B` | lunghezza davanti | front length |
| `product.voidBodysuit.measure.C` | lunghezza manica | sleeve length |
| `product.voidBodysuit.alt.front` | VOID, body a manica lunga: disegno tecnico, vista frontale | VOID, long-sleeve bodysuit: technical drawing, front view |
| `product.voidBodysuit.alt.back` | VOID, body a manica lunga: disegno tecnico, vista dal retro | VOID, long-sleeve bodysuit: technical drawing, back view |
| `product.voidBodysuit.alt.detail` | VOID, body a manica lunga: disegno tecnico, dettaglio del collo alto e delle cuciture a vista | VOID, long-sleeve bodysuit: technical drawing, close-up of the high neck and exposed seams |

---

## 5. Sottovesti

### 5.1 PLUMB — sottoveste · 240,00 € · `plumbSlip`

Slug: IT `plumb-sottoveste` · EN `plumb-slip` · Taglie: XS–3XL · Colori: Nero, Pelle 02

| Chiave | IT | EN |
|---|---|---|
| `product.plumbSlip.name` | PLUMB | PLUMB |
| `product.plumbSlip.type` | → `type.slip` | → `type.slip` |
| `product.plumbSlip.description` | Sottoveste in jersey di seta. Spalline sottili, taglio dritto che cade a piombo, orlo a metà coscia. Opaca, leggermente trasparente in controluce. | Silk jersey slip. Thin straps, a straight cut that falls plumb, mid-thigh hem. Opaque, slightly sheer against the light. |
| `product.plumbSlip.key.sheerness` | Opaco, leggera trasparenza in controluce | Opaque, slightly sheer against the light |
| `product.plumbSlip.key.underwire` | No | No |
| `product.plumbSlip.key.padding` | No | No |
| `product.plumbSlip.construction.1` | Jersey di seta monostrato, taglio dritto senza pinces. | Single-layer silk jersey, straight cut, no darts. |
| `product.plumbSlip.construction.2` | Spalline sottili regolabili. | Thin adjustable straps. |
| `product.plumbSlip.construction.3` | Orlo a metà coscia, rifinito a giro. | Mid-thigh hem, clean-finished. |
| `product.plumbSlip.composition.1` | 92% seta, 8% elastan | 92% silk, 8% elastane |
| `product.plumbSlip.care` | → `care.silk` | → `care.silk` |
| `product.plumbSlip.fit` | Veste morbida. Taglio dritto, orlo a metà coscia. | Relaxed fit. Straight cut, mid-thigh hem. |
| `product.plumbSlip.callout.1` | jersey di seta | silk jersey |
| `product.plumbSlip.callout.2` | spallina regolabile | adjustable strap |
| `product.plumbSlip.callout.3` | orlo dritto | straight hem |
| `product.plumbSlip.measure.A` | larghezza al seno | bust width |
| `product.plumbSlip.measure.B` | lunghezza totale | total length |
| `product.plumbSlip.alt.front` | PLUMB, sottoveste: disegno tecnico, vista frontale | PLUMB, slip: technical drawing, front view |
| `product.plumbSlip.alt.back` | PLUMB, sottoveste: disegno tecnico, vista dal retro | PLUMB, slip: technical drawing, back view |
| `product.plumbSlip.alt.detail` | PLUMB, sottoveste: disegno tecnico, dettaglio della spallina e del bordo dello scollo | PLUMB, slip: technical drawing, close-up of the strap and neckline edge |

---

## 6. Accessori

### 6.1 TENSION — harness · 115,00 € · `tensionHarness`

Slug: IT `tension-harness` · EN `tension-harness` · Taglie: XS–3XL · Colori: Nero

| Chiave | IT | EN |
|---|---|---|
| `product.tensionHarness.name` | TENSION | TENSION |
| `product.tensionHarness.type` | → `type.harness` | → `type.harness` |
| `product.tensionHarness.description` | Harness in elastico piatto opaco. Anelli in metallo opaco dove le fasce si incontrano. Regolabile su spalle e sottoseno. Si porta sopra o sotto. | Harness in flat matt elastic. Matt metal rings where the bands meet. Adjusts at the shoulders and underbust. Wear it over or under. |
| `product.tensionHarness.key.sheerness` | — | — |
| `product.tensionHarness.construction.1` | Fasce in elastico piatto opaco. | Flat matt elastic bands. |
| `product.tensionHarness.construction.2` | Anelli e regolatori in metallo opaco. | Matt metal rings and adjusters. |
| `product.tensionHarness.construction.3` | Chiusura posteriore a gancio. | Hook fastening at the back. |
| `product.tensionHarness.composition.1` | Fasce: 60% poliammide, 40% elastan | Bands: 60% polyamide, 40% elastane |
| `product.tensionHarness.composition.2` | Parti non tessili: anelli, regolatori e gancio in metallo | Non-textile parts: metal rings, adjusters and hook |
| `product.tensionHarness.care` | → `care.hardware` | → `care.hardware` |
| `product.tensionHarness.fit` | Regolabile. Scegli la taglia in base al sottoseno: vedi la guida taglie, lettere. | Adjustable. Choose by underbust: see the size guide, letter sizes. |
| `product.tensionHarness.callout.1` | elastico piatto | flat elastic |
| `product.tensionHarness.callout.2` | anello in metallo | metal ring |
| `product.tensionHarness.callout.3` | regolatore | adjuster |
| `product.tensionHarness.measure.A` | circonferenza sottoseno, min–max | underbust circumference, min–max |
| `product.tensionHarness.measure.B` | lunghezza fascia spalla | shoulder band length |
| `product.tensionHarness.alt.front` | TENSION, harness: disegno tecnico, vista frontale | TENSION, harness: technical drawing, front view |
| `product.tensionHarness.alt.back` | TENSION, harness: disegno tecnico, vista dal retro | TENSION, harness: technical drawing, back view |
| `product.tensionHarness.alt.detail` | TENSION, harness: disegno tecnico, dettaglio dell'anello in metallo e del regolatore | TENSION, harness: technical drawing, close-up of the metal ring and adjuster |

### 6.2 HOLD — reggicalze · 85,00 € · `holdSuspenderBelt`

Slug: IT `hold-reggicalze` · EN `hold-suspender-belt` · Taglie: XS–3XL · Colori: Nero

| Chiave | IT | EN |
|---|---|---|
| `product.holdSuspenderBelt.name` | HOLD | HOLD |
| `product.holdSuspenderBelt.type` | → `type.suspenderBelt` | → `type.suspenderBelt` |
| `product.holdSuspenderBelt.description` | Reggicalze a banda alta in microfibra opaca. Quattro agganci per calze in metallo nero. Calze non incluse. | High-band suspender belt in matt microfibre. Four black metal suspender clips. Stockings not included. |
| `product.holdSuspenderBelt.key.sheerness` | Opaco | Opaque |
| `product.holdSuspenderBelt.construction.1` | Banda alta in microfibra doppio strato. | Deep double-layer microfibre band. |
| `product.holdSuspenderBelt.construction.2` | Quattro nastri elastici regolabili con agganci per calze. | Four adjustable elastic straps with suspender clips. |
| `product.holdSuspenderBelt.construction.3` | Chiusura posteriore a gancetti, tre posizioni. | Hook-and-eye back fastening, three positions. |
| `product.holdSuspenderBelt.composition.1` | Banda: 75% poliammide, 25% elastan | Band: 75% polyamide, 25% elastane |
| `product.holdSuspenderBelt.composition.2` | Parti non tessili: agganci in acciaio verniciato, gancetti e regolatori in metallo | Non-textile parts: painted steel clips, metal hooks and adjusters |
| `product.holdSuspenderBelt.care` | → `care.hardware` + `care.hooks` | → idem |
| `product.holdSuspenderBelt.fit` | Veste regolare. Si porta in vita. Nastri regolabili in lunghezza. | True to size. Sits at the waist. Strap length adjusts. |
| `product.holdSuspenderBelt.callout.1` | banda in microfibra | microfibre band |
| `product.holdSuspenderBelt.callout.2` | aggancio per calze | suspender clip |
| `product.holdSuspenderBelt.callout.3` | regolatore | adjuster |
| `product.holdSuspenderBelt.measure.A` | larghezza in vita | waist width |
| `product.holdSuspenderBelt.measure.B` | altezza banda | band height |
| `product.holdSuspenderBelt.measure.C` | lunghezza nastro, min–max | strap length, min–max |
| `product.holdSuspenderBelt.alt.front` | HOLD, reggicalze: disegno tecnico, vista frontale | HOLD, suspender belt: technical drawing, front view |
| `product.holdSuspenderBelt.alt.back` | HOLD, reggicalze: disegno tecnico, vista dal retro | HOLD, suspender belt: technical drawing, back view |
| `product.holdSuspenderBelt.alt.detail` | HOLD, reggicalze: disegno tecnico, dettaglio di un aggancio per calze | HOLD, suspender belt: technical drawing, close-up of a suspender clip |

---

## 7. Note per lo sviluppo

- `product.*.type` rimanda alle chiavi `type.*`: in card, borsa, conferma e alt il tipo accompagna **sempre** il nome (AXIS, PLANE, RASTER esistono in due categorie).
- `construction.*`, `composition.*`, `callout.*`, `measure.*` sono elenchi ordinati (`1`, `2`, `3`…): nel JSON possono diventare array.
- I valori numerici delle quote (A, B, C per taglia) sono **dati**, non copy: vanno nel catalogo.
- `key.sheerness` = "—" per TENSION: non mostrare la riga Trasparenza.
- I file SVG placeholder e i loro `<title>` vanno rinominati con i nuovi nomi (`raster-*`, `strut-*`, `beam-*`, `plumb-*`): da segnalare a `visual-content`.
- Prezzi: due decimali ovunque (`95,00 €` / `€95.00`); accanto al prezzo in scheda la nota `price.vatNote` (`ui-strings.md` §8.3).
