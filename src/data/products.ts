// LINGERAI — demo catalogue GRID / 01.
// Copy from docs/copy/products.md (IT/EN). Stock, measurements and set links are demo data.
// Shared copy (product types, colours, care, fit) lives in src/messages/*.json under type.*, colour.*, care.*.

import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;
export type CategoryId = "bras" | "briefs" | "bodysuits" | "slips" | "accessories";
export type ColourId = "black" | "graphite" | "skin-01" | "skin-02" | "skin-03" | "optic-white";
export type SizeSystem = "letters" | "bandCup";
export type Support = "light" | "medium" | "firm";

export interface ColourVariant {
  id: ColourId;
  /** Sizes sold out in this colour. "*" = every size. */
  soldOut: string[];
}

export type Measure =
  | { ref: "A" | "B" | "C"; what: Localized; base: number; step: number }
  | { ref: "A" | "B" | "C"; what: Localized; base: number; stepBand: number; stepCup: number };

export interface Product {
  id: string;
  name: string;
  /** Message key, e.g. "type.triangleBra". */
  typeKey: string;
  category: CategoryId;
  slug: Localized;
  /** Euro, VAT included (simulated). */
  price: number;
  sizeSystem: SizeSystem;
  colours: ColourVariant[];
  lowStock?: boolean;
  /** Id of the coordinated piece ("Complete the set"). */
  setWith?: string;
  /** Front-view technical drawing; products without one use the generic placeholder. */
  drawing?: string;
  /** Briefs and bodysuits: hygiene liner, return restriction. */
  hygiene: boolean;
  description: Localized;
  key: {
    sheerness?: Localized;
    underwire?: boolean;
    padding?: boolean;
    support?: Support;
    gusset?: Localized;
  };
  construction: Localized[];
  composition: Localized[];
  /** Message keys, e.g. ["care.standard", "care.hooks"]. */
  care: string[];
  fit: Localized;
  callouts: Localized[];
  /** Values in cm at the reference size (M / 75B), with step per size. */
  measures: Measure[];
  alt: { front: Localized; back: Localized; detail: Localized };
}

export const products: Product[] = [
  {
    id: "axisBra",
    name: "AXIS",
    typeKey: "type.triangleBra",
    category: "bras",
    slug: {
      it: "axis-reggiseno",
      en: "axis-bra"
    },
    price: 95,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: [
          "XXL"
        ]
      },
      {
        id: "skin-01",
        soldOut: []
      },
      {
        id: "skin-02",
        soldOut: [
          "M"
        ]
      },
      {
        id: "skin-03",
        soldOut: []
      }
    ],
    setWith: "axisBrief",
    hygiene: false,
    description: {
      it: "Triangolo in mesh. Una cucitura verticale a vista divide ogni coppa. Senza ferretto, senza imbottitura. Trasparente.",
      en: "Mesh triangle. An exposed vertical seam splits each cup. No underwire, unlined. Sheer."
    },
    key: {
      sheerness: {
        it: "Trasparente",
        en: "Sheer"
      },
      underwire: false,
      padding: false,
      support: "light"
    },
    construction: [
      {
        it: "Coppa in mesh monostrato, divisa da una cucitura verticale.",
        en: "Single-layer mesh cup, split by a vertical seam."
      },
      {
        it: "Elastico sottoseno piatto.",
        en: "Flat underband elastic."
      },
      {
        it: "Spalline regolabili, regolatori in metallo nero opaco.",
        en: "Adjustable straps, matt black metal adjusters."
      },
      {
        it: "Chiusura posteriore a gancetti, tre posizioni.",
        en: "Hook-and-eye back fastening, three positions."
      }
    ],
    composition: [
      {
        it: "Coppe e dorso: 78% poliammide, 22% elastan",
        en: "Cups and back: 78% polyamide, 22% elastane"
      },
      {
        it: "Parti non tessili: regolatori e gancetti in metallo",
        en: "Non-textile parts: metal adjusters and hooks"
      }
    ],
    care: [
      "care.standard",
      "care.hooks"
    ],
    fit: {
      it: "Veste regolare. Sostegno leggero. Tra due taglie: la più grande.",
      en: "True to size. Light support. Between sizes: size up."
    },
    callouts: [
      {
        it: "mesh trasparente",
        en: "sheer mesh"
      },
      {
        it: "cucitura verticale a vista",
        en: "exposed vertical seam"
      },
      {
        it: "elastico sottoseno piatto",
        en: "flat underband elastic"
      },
      {
        it: "regolatore spallina",
        en: "strap adjuster"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza sottoseno",
          en: "underband width"
        },
        base: 30,
        step: 1.5
      },
      {
        ref: "B",
        what: {
          it: "altezza coppa",
          en: "cup height"
        },
        base: 13,
        step: 0.5
      }
    ],
    alt: {
      front: {
        it: "AXIS, reggiseno a triangolo: disegno tecnico, vista frontale",
        en: "AXIS, triangle bra: technical drawing, front view"
      },
      back: {
        it: "AXIS, reggiseno a triangolo: disegno tecnico, vista dal retro",
        en: "AXIS, triangle bra: technical drawing, back view"
      },
      detail: {
        it: "AXIS, reggiseno a triangolo: disegno tecnico, dettaglio della cucitura verticale sulla coppa",
        en: "AXIS, triangle bra: technical drawing, close-up of the vertical seam on the cup"
      }
    }
  },
  {
    id: "planeBra",
    name: "PLANE",
    typeKey: "type.balconetteBra",
    category: "bras",
    slug: {
      it: "plane-reggiseno",
      en: "plane-bra"
    },
    price: 135,
    sizeSystem: "bandCup",
    colours: [
      {
        id: "black",
        soldOut: [
          "75C",
          "80D"
        ]
      },
      {
        id: "graphite",
        soldOut: [
          "90G",
          "95F",
          "95G"
        ]
      }
    ],
    setWith: "planeThong",
    drawing: "/placeholders/plane-bra-front.svg",
    hygiene: false,
    description: {
      it: "Balconette con ferretto. Pannelli in mesh doppio strato, scollo dritto. Una cucitura verticale a vista per coppa. Semi-trasparente.",
      en: "Underwired balconette. Double-layer mesh panels, straight neckline. One exposed vertical seam per cup. Semi-sheer."
    },
    key: {
      sheerness: {
        it: "Semi-trasparente",
        en: "Semi-sheer"
      },
      underwire: true,
      padding: false,
      support: "firm"
    },
    construction: [
      {
        it: "Coppa in mesh doppio strato, senza imbottitura.",
        en: "Double-layer mesh cup, unlined."
      },
      {
        it: "Ferretto in acciaio rivestito, dentro un canale cucito.",
        en: "Coated steel underwire in a stitched channel."
      },
      {
        it: "Scollo dritto, orizzontale.",
        en: "Straight, horizontal neckline."
      },
      {
        it: "Spalline regolabili, regolatori in metallo nero opaco.",
        en: "Adjustable straps, matt black metal adjusters."
      },
      {
        it: "Chiusura posteriore a gancetti, tre posizioni.",
        en: "Hook-and-eye back fastening, three positions."
      }
    ],
    composition: [
      {
        it: "Coppe, esterno e interno: 80% poliammide, 20% elastan",
        en: "Cups, outer and inner: 80% polyamide, 20% elastane"
      },
      {
        it: "Dorso: 80% poliammide, 20% elastan",
        en: "Back: 80% polyamide, 20% elastane"
      },
      {
        it: "Parti non tessili: ferretto in acciaio, regolatori e gancetti in metallo",
        en: "Non-textile parts: steel underwire, metal adjusters and hooks"
      }
    ],
    care: [
      "care.standard",
      "care.underwire",
      "care.hooks"
    ],
    fit: {
      it: "Veste regolare. Fascia aderente. Tra due taglie: la più grande in fascia.",
      en: "True to size. Firm band. Between sizes: go up a band."
    },
    callouts: [
      {
        it: "ferretto in acciaio",
        en: "steel underwire"
      },
      {
        it: "mesh doppio strato",
        en: "double-layer mesh"
      },
      {
        it: "cucitura verticale a vista",
        en: "exposed vertical seam"
      },
      {
        it: "regolatore spallina",
        en: "strap adjuster"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza fascia",
          en: "band width"
        },
        base: 31,
        stepBand: 2.5,
        stepCup: 0
      },
      {
        ref: "B",
        what: {
          it: "altezza coppa",
          en: "cup height"
        },
        base: 12,
        stepBand: 0,
        stepCup: 1
      }
    ],
    alt: {
      front: {
        it: "PLANE, reggiseno balconette: disegno tecnico, vista frontale",
        en: "PLANE, balconette bra: technical drawing, front view"
      },
      back: {
        it: "PLANE, reggiseno balconette: disegno tecnico, vista dal retro",
        en: "PLANE, balconette bra: technical drawing, back view"
      },
      detail: {
        it: "PLANE, reggiseno balconette: disegno tecnico, dettaglio del ferretto e del mesh doppio strato",
        en: "PLANE, balconette bra: technical drawing, close-up of the underwire and double-layer mesh"
      }
    }
  },
  {
    id: "rasterBralette",
    name: "RASTER",
    typeKey: "type.longlineBralette",
    category: "bras",
    slug: {
      it: "raster-bralette",
      en: "raster-bralette"
    },
    price: 120,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      },
      {
        id: "optic-white",
        soldOut: [
          "XS"
        ]
      }
    ],
    setWith: "rasterShorty",
    hygiene: false,
    description: {
      it: "Bralette longline in tulle. Nastri piatti cuciti in griglia, in verticale e in orizzontale. Senza ferretto, senza imbottitura. Trasparente.",
      en: "Longline tulle bralette. Flat tapes stitched on in a grid, vertical and horizontal. No underwire, unlined. Sheer."
    },
    key: {
      sheerness: {
        it: "Trasparente",
        en: "Sheer"
      },
      underwire: false,
      padding: false,
      support: "light"
    },
    construction: [
      {
        it: "Tulle monostrato con nastri piatti cuciti a griglia.",
        en: "Single-layer tulle with flat tapes stitched in a grid."
      },
      {
        it: "Fascia sottoseno alta.",
        en: "Deep underband."
      },
      {
        it: "Senza chiusura: si infila dalla testa.",
        en: "No fastening: pulls on over the head."
      },
      {
        it: "Spalline fisse in nastro.",
        en: "Fixed tape straps."
      }
    ],
    composition: [
      {
        it: "Coppe e dorso: 85% poliammide, 15% elastan",
        en: "Cups and back: 85% polyamide, 15% elastane"
      },
      {
        it: "Nastri: 100% poliammide",
        en: "Tapes: 100% polyamide"
      }
    ],
    care: [
      "care.standard"
    ],
    fit: {
      it: "Veste aderente. Senza chiusura: tra due taglie, la più grande.",
      en: "Close fit. No fastening: between sizes, size up."
    },
    callouts: [
      {
        it: "tulle trasparente",
        en: "sheer tulle"
      },
      {
        it: "nastro piatto",
        en: "flat tape"
      },
      {
        it: "fascia sottoseno alta",
        en: "deep underband"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza fascia",
          en: "band width"
        },
        base: 30,
        step: 2
      },
      {
        ref: "B",
        what: {
          it: "lunghezza davanti",
          en: "front length"
        },
        base: 22,
        step: 0.5
      }
    ],
    alt: {
      front: {
        it: "RASTER, bralette longline: disegno tecnico, vista frontale",
        en: "RASTER, longline bralette: technical drawing, front view"
      },
      back: {
        it: "RASTER, bralette longline: disegno tecnico, vista dal retro",
        en: "RASTER, longline bralette: technical drawing, back view"
      },
      detail: {
        it: "RASTER, bralette longline: disegno tecnico, dettaglio dell'incrocio dei nastri sul tulle",
        en: "RASTER, longline bralette: technical drawing, close-up of the tapes crossing on the tulle"
      }
    }
  },
  {
    id: "strutBra",
    name: "STRUT",
    typeKey: "type.softCupBra",
    category: "bras",
    slug: {
      it: "strut-reggiseno",
      en: "strut-bra"
    },
    price: 98,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      },
      {
        id: "skin-01",
        soldOut: []
      },
      {
        id: "skin-02",
        soldOut: []
      },
      {
        id: "skin-03",
        soldOut: []
      }
    ],
    setWith: "beamBrief",
    hygiene: false,
    description: {
      it: "Coppa morbida in microfibra opaca. Spalline sottili incrociate sulla schiena, come puntoni. Senza ferretto, senza imbottitura. Opaco.",
      en: "Soft cup in matt microfibre. Thin straps cross at the back like struts. No underwire, unlined. Opaque."
    },
    key: {
      sheerness: {
        it: "Opaco",
        en: "Opaque"
      },
      underwire: false,
      padding: false,
      support: "medium"
    },
    construction: [
      {
        it: "Coppa morbida in microfibra doppio strato, senza imbottitura.",
        en: "Soft cup in double-layer microfibre, unlined."
      },
      {
        it: "Spalline sottili incrociate sulla schiena, regolabili.",
        en: "Thin straps crossing at the back, adjustable."
      },
      {
        it: "Chiusura posteriore a gancetti, tre posizioni.",
        en: "Hook-and-eye back fastening, three positions."
      }
    ],
    composition: [
      {
        it: "Coppe, esterno e interno, e dorso: 72% poliammide, 28% elastan",
        en: "Cups, outer and inner, and back: 72% polyamide, 28% elastane"
      },
      {
        it: "Parti non tessili: regolatori e gancetti in metallo",
        en: "Non-textile parts: metal adjusters and hooks"
      }
    ],
    care: [
      "care.standard",
      "care.hooks"
    ],
    fit: {
      it: "Veste regolare. Sostegno medio. Tra due taglie: la più grande.",
      en: "True to size. Medium support. Between sizes: size up."
    },
    callouts: [
      {
        it: "microfibra opaca",
        en: "matt microfibre"
      },
      {
        it: "coppa doppio strato",
        en: "double-layer cup"
      },
      {
        it: "spalline incrociate",
        en: "crossed straps"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza sottoseno",
          en: "underband width"
        },
        base: 30,
        step: 2
      },
      {
        ref: "B",
        what: {
          it: "altezza coppa",
          en: "cup height"
        },
        base: 14,
        step: 0.5
      }
    ],
    alt: {
      front: {
        it: "STRUT, reggiseno senza ferretto: disegno tecnico, vista frontale",
        en: "STRUT, soft-cup bra: technical drawing, front view"
      },
      back: {
        it: "STRUT, reggiseno senza ferretto: disegno tecnico, vista dal retro",
        en: "STRUT, soft-cup bra: technical drawing, back view"
      },
      detail: {
        it: "STRUT, reggiseno senza ferretto: disegno tecnico, dettaglio dell'incrocio delle spalline sulla schiena",
        en: "STRUT, soft-cup bra: technical drawing, close-up of the straps crossing at the back"
      }
    }
  },
  {
    id: "axisBrief",
    name: "AXIS",
    typeKey: "type.brief",
    category: "briefs",
    slug: {
      it: "axis-slip",
      en: "axis-brief"
    },
    price: 48,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      },
      {
        id: "skin-01",
        soldOut: [
          "3XL"
        ]
      },
      {
        id: "skin-02",
        soldOut: []
      },
      {
        id: "skin-03",
        soldOut: []
      }
    ],
    setWith: "axisBra",
    drawing: "/placeholders/axis-brief-front.svg",
    hygiene: true,
    description: {
      it: "Slip a vita media in mesh. Cucitura centrale a vista, davanti e dietro. Tassello in cotone. Trasparente.",
      en: "Mid-rise mesh brief. Exposed centre seam, front and back. Cotton gusset. Sheer."
    },
    key: {
      sheerness: {
        it: "Trasparente, tassello opaco",
        en: "Sheer, opaque gusset"
      },
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Mesh monostrato, cucitura centrale a vista.",
        en: "Single-layer mesh, exposed centre seam."
      },
      {
        it: "Vita media con elastico piatto.",
        en: "Mid rise with flat elastic waistband."
      },
      {
        it: "Copertura dietro: media.",
        en: "Back coverage: medium."
      }
    ],
    composition: [
      {
        it: "Corpo: 78% poliammide, 22% elastan",
        en: "Body: 78% polyamide, 22% elastane"
      },
      {
        it: "Tassello: 100% cotone",
        en: "Gusset: 100% cotton"
      }
    ],
    care: [
      "care.standard"
    ],
    fit: {
      it: "Veste regolare. Vita media.",
      en: "True to size. Mid rise."
    },
    callouts: [
      {
        it: "mesh",
        en: "mesh"
      },
      {
        it: "tassello in cotone",
        en: "cotton gusset"
      },
      {
        it: "cucitura centrale a vista",
        en: "exposed centre seam"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza in vita",
          en: "waist width"
        },
        base: 34,
        step: 2
      },
      {
        ref: "B",
        what: {
          it: "altezza davanti",
          en: "front rise"
        },
        base: 18,
        step: 0.5
      },
      {
        ref: "C",
        what: {
          it: "altezza fianco",
          en: "side height"
        },
        base: 7,
        step: 0
      }
    ],
    alt: {
      front: {
        it: "AXIS, slip: disegno tecnico, vista frontale",
        en: "AXIS, brief: technical drawing, front view"
      },
      back: {
        it: "AXIS, slip: disegno tecnico, vista dal retro",
        en: "AXIS, brief: technical drawing, back view"
      },
      detail: {
        it: "AXIS, slip: disegno tecnico, dettaglio della cucitura centrale",
        en: "AXIS, brief: technical drawing, close-up of the centre seam"
      }
    }
  },
  {
    id: "planeThong",
    name: "PLANE",
    typeKey: "type.thong",
    category: "briefs",
    slug: {
      it: "plane-perizoma",
      en: "plane-thong"
    },
    price: 45,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      },
      {
        id: "graphite",
        soldOut: []
      }
    ],
    setWith: "planeBra",
    hygiene: true,
    description: {
      it: "Perizoma in mesh doppio strato. Banda elastica piatta in vita, linea dritta. Tassello in cotone. Semi-trasparente.",
      en: "Double-layer mesh thong. Flat elastic waistband, straight line. Cotton gusset. Semi-sheer."
    },
    key: {
      sheerness: {
        it: "Semi-trasparente",
        en: "Semi-sheer"
      },
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Mesh doppio strato davanti.",
        en: "Double-layer mesh front."
      },
      {
        it: "Banda elastica piatta, dritta sui fianchi.",
        en: "Flat elastic band, straight across the hips."
      },
      {
        it: "Retro sottile.",
        en: "Narrow back."
      }
    ],
    composition: [
      {
        it: "Corpo: 80% poliammide, 20% elastan",
        en: "Body: 80% polyamide, 20% elastane"
      },
      {
        it: "Tassello: 100% cotone",
        en: "Gusset: 100% cotton"
      }
    ],
    care: [
      "care.standard"
    ],
    fit: {
      it: "Veste regolare.",
      en: "True to size."
    },
    callouts: [
      {
        it: "mesh doppio strato",
        en: "double-layer mesh"
      },
      {
        it: "banda elastica piatta",
        en: "flat elastic band"
      },
      {
        it: "tassello in cotone",
        en: "cotton gusset"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza in vita",
          en: "waist width"
        },
        base: 33,
        step: 2
      },
      {
        ref: "B",
        what: {
          it: "altezza davanti",
          en: "front rise"
        },
        base: 14,
        step: 0.5
      }
    ],
    alt: {
      front: {
        it: "PLANE, perizoma: disegno tecnico, vista frontale",
        en: "PLANE, thong: technical drawing, front view"
      },
      back: {
        it: "PLANE, perizoma: disegno tecnico, vista dal retro",
        en: "PLANE, thong: technical drawing, back view"
      },
      detail: {
        it: "PLANE, perizoma: disegno tecnico, dettaglio della banda elastica piatta",
        en: "PLANE, thong: technical drawing, close-up of the flat elastic band"
      }
    }
  },
  {
    id: "beamBrief",
    name: "BEAM",
    typeKey: "type.highWaistBrief",
    category: "briefs",
    slug: {
      it: "beam-slip",
      en: "beam-brief"
    },
    price: 62,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      },
      {
        id: "graphite",
        soldOut: []
      }
    ],
    setWith: "strutBra",
    hygiene: true,
    description: {
      it: "Slip a vita alta. Una banda opaca in microfibra corre dritta sopra l'ombelico, come una trave. Fianchi in mesh trasparente. Tassello in cotone.",
      en: "High-waist brief. An opaque microfibre band runs straight above the navel, like a beam. Sheer mesh at the sides. Cotton gusset."
    },
    key: {
      sheerness: {
        it: "Opaco davanti, trasparente sui fianchi",
        en: "Opaque front, sheer sides"
      },
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Banda frontale in microfibra doppio strato.",
        en: "Double-layer microfibre front band."
      },
      {
        it: "Pannelli laterali in mesh.",
        en: "Mesh side panels."
      },
      {
        it: "Vita alta con elastico piatto.",
        en: "High rise with flat elastic waistband."
      }
    ],
    composition: [
      {
        it: "Banda frontale: 72% poliammide, 28% elastan",
        en: "Front band: 72% polyamide, 28% elastane"
      },
      {
        it: "Fianchi: 80% poliammide, 20% elastan",
        en: "Sides: 80% polyamide, 20% elastane"
      },
      {
        it: "Tassello: 100% cotone",
        en: "Gusset: 100% cotton"
      }
    ],
    care: [
      "care.standard"
    ],
    fit: {
      it: "Veste regolare. Vita alta, sopra l'ombelico.",
      en: "True to size. High rise, above the navel."
    },
    callouts: [
      {
        it: "banda in microfibra opaca",
        en: "opaque microfibre band"
      },
      {
        it: "fianco in mesh",
        en: "mesh side"
      },
      {
        it: "tassello in cotone",
        en: "cotton gusset"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza in vita",
          en: "waist width"
        },
        base: 33,
        step: 2
      },
      {
        ref: "B",
        what: {
          it: "altezza davanti",
          en: "front rise"
        },
        base: 27,
        step: 0.5
      },
      {
        ref: "C",
        what: {
          it: "altezza banda",
          en: "band height"
        },
        base: 9,
        step: 0
      }
    ],
    alt: {
      front: {
        it: "BEAM, slip a vita alta: disegno tecnico, vista frontale",
        en: "BEAM, high-waist brief: technical drawing, front view"
      },
      back: {
        it: "BEAM, slip a vita alta: disegno tecnico, vista dal retro",
        en: "BEAM, high-waist brief: technical drawing, back view"
      },
      detail: {
        it: "BEAM, slip a vita alta: disegno tecnico, dettaglio dell'unione tra banda opaca e mesh",
        en: "BEAM, high-waist brief: technical drawing, close-up of where the opaque band meets the mesh"
      }
    }
  },
  {
    id: "rasterShorty",
    name: "RASTER",
    typeKey: "type.shorty",
    category: "briefs",
    slug: {
      it: "raster-culotte",
      en: "raster-shorty"
    },
    price: 58,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      },
      {
        id: "optic-white",
        soldOut: []
      }
    ],
    setWith: "rasterBralette",
    hygiene: true,
    description: {
      it: "Culotte in tulle. Stessa griglia di nastri piatti della bralette. Tassello in cotone. Trasparente.",
      en: "Tulle shorty. The same flat-tape grid as the bralette. Cotton gusset. Sheer."
    },
    key: {
      sheerness: {
        it: "Trasparente, tassello opaco",
        en: "Sheer, opaque gusset"
      },
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Tulle monostrato con nastri piatti cuciti a griglia.",
        en: "Single-layer tulle with flat tapes stitched in a grid."
      },
      {
        it: "Gamba dritta, copertura piena dietro.",
        en: "Straight leg, full back coverage."
      },
      {
        it: "Vita media con elastico piatto.",
        en: "Mid rise with flat elastic waistband."
      }
    ],
    composition: [
      {
        it: "Corpo: 85% poliammide, 15% elastan",
        en: "Body: 85% polyamide, 15% elastane"
      },
      {
        it: "Nastri: 100% poliammide",
        en: "Tapes: 100% polyamide"
      },
      {
        it: "Tassello: 100% cotone",
        en: "Gusset: 100% cotton"
      }
    ],
    care: [
      "care.standard"
    ],
    fit: {
      it: "Veste aderente. Tra due taglie: la più grande.",
      en: "Close fit. Between sizes: size up."
    },
    callouts: [
      {
        it: "tulle trasparente",
        en: "sheer tulle"
      },
      {
        it: "nastro piatto",
        en: "flat tape"
      },
      {
        it: "tassello in cotone",
        en: "cotton gusset"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza in vita",
          en: "waist width"
        },
        base: 35,
        step: 2
      },
      {
        ref: "B",
        what: {
          it: "altezza davanti",
          en: "front rise"
        },
        base: 21,
        step: 0.5
      },
      {
        ref: "C",
        what: {
          it: "lunghezza gamba laterale",
          en: "side leg length"
        },
        base: 8,
        step: 0.5
      }
    ],
    alt: {
      front: {
        it: "RASTER, culotte: disegno tecnico, vista frontale",
        en: "RASTER, shorty: technical drawing, front view"
      },
      back: {
        it: "RASTER, culotte: disegno tecnico, vista dal retro",
        en: "RASTER, shorty: technical drawing, back view"
      },
      detail: {
        it: "RASTER, culotte: disegno tecnico, dettaglio della griglia di nastri",
        en: "RASTER, shorty: technical drawing, close-up of the tape grid"
      }
    }
  },
  {
    id: "monolithBodysuit",
    name: "MONOLITH",
    typeKey: "type.bodysuit",
    category: "bodysuits",
    slug: {
      it: "monolith-body",
      en: "monolith-bodysuit"
    },
    price: 185,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      },
      {
        id: "graphite",
        soldOut: []
      }
    ],
    drawing: "/placeholders/monolith-body-front.svg",
    hygiene: true,
    description: {
      it: "Body in microfibra opaca. Scollo dritto, schiena a T, sgambato alto. Si indossa anche come top. Opaco.",
      en: "Matt microfibre bodysuit. Straight neckline, T-back, high-cut leg. Works as a top too. Opaque."
    },
    key: {
      sheerness: {
        it: "Opaco",
        en: "Opaque"
      },
      underwire: false,
      padding: false,
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Microfibra doppio strato sul davanti.",
        en: "Double-layer microfibre front."
      },
      {
        it: "Scollo dritto, spalline larghe fisse, schiena a T.",
        en: "Straight neckline, wide fixed straps, T-back."
      },
      {
        it: "Sgambato alto.",
        en: "High-cut leg."
      },
      {
        it: "Chiusura a gancetti sul cavallo.",
        en: "Hook-and-eye fastening at the gusset."
      }
    ],
    composition: [
      {
        it: "Corpo: 72% poliammide, 28% elastan",
        en: "Body: 72% polyamide, 28% elastane"
      },
      {
        it: "Tassello: 100% cotone",
        en: "Gusset: 100% cotton"
      },
      {
        it: "Parti non tessili: gancetti in metallo",
        en: "Non-textile parts: metal hooks"
      }
    ],
    care: [
      "care.standard",
      "care.hooks"
    ],
    fit: {
      it: "Veste regolare. Sgambato alto.",
      en: "True to size. High-cut leg."
    },
    callouts: [
      {
        it: "microfibra opaca",
        en: "matt microfibre"
      },
      {
        it: "sgambatura alta",
        en: "high-cut leg"
      },
      {
        it: "tassello",
        en: "gusset"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza scollo",
          en: "neckline width"
        },
        base: 26,
        step: 1
      },
      {
        ref: "B",
        what: {
          it: "lunghezza davanti",
          en: "front length"
        },
        base: 62,
        step: 1.5
      },
      {
        ref: "C",
        what: {
          it: "altezza sgambatura",
          en: "leg-cut height"
        },
        base: 14,
        step: 0.5
      }
    ],
    alt: {
      front: {
        it: "MONOLITH, body: disegno tecnico, vista frontale",
        en: "MONOLITH, bodysuit: technical drawing, front view"
      },
      back: {
        it: "MONOLITH, body: disegno tecnico, vista dal retro con schiena a T",
        en: "MONOLITH, bodysuit: technical drawing, back view with T-back"
      },
      detail: {
        it: "MONOLITH, body: disegno tecnico, dettaglio dello scollo dritto",
        en: "MONOLITH, bodysuit: technical drawing, close-up of the straight neckline"
      }
    }
  },
  {
    id: "voidBodysuit",
    name: "VOID",
    typeKey: "type.longSleeveBodysuit",
    category: "bodysuits",
    slug: {
      it: "void-body",
      en: "void-bodysuit"
    },
    price: 210,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      }
    ],
    lowStock: true,
    hygiene: true,
    description: {
      it: "Body in mesh a manica lunga. Collo alto. Cuciture a vista lungo braccia e fianchi. Trasparente.",
      en: "Long-sleeve mesh bodysuit. High neck. Exposed seams along the arms and sides. Sheer."
    },
    key: {
      sheerness: {
        it: "Trasparente, tassello opaco",
        en: "Sheer, opaque gusset"
      },
      underwire: false,
      padding: false,
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Mesh monostrato, cuciture piatte a vista.",
        en: "Single-layer mesh, flat exposed seams."
      },
      {
        it: "Collo alto, maniche lunghe fino al polso.",
        en: "High neck, full-length sleeves."
      },
      {
        it: "Chiusura a gancetti sul cavallo.",
        en: "Hook-and-eye fastening at the gusset."
      }
    ],
    composition: [
      {
        it: "Corpo: 85% poliammide, 15% elastan",
        en: "Body: 85% polyamide, 15% elastane"
      },
      {
        it: "Tassello: 100% cotone",
        en: "Gusset: 100% cotton"
      },
      {
        it: "Parti non tessili: gancetti in metallo",
        en: "Non-textile parts: metal hooks"
      }
    ],
    care: [
      "care.standard",
      "care.hooks"
    ],
    fit: {
      it: "Veste aderente. Maniche fino al polso.",
      en: "Close fit. Sleeves to the wrist."
    },
    callouts: [
      {
        it: "mesh trasparente",
        en: "sheer mesh"
      },
      {
        it: "collo alto",
        en: "high neck"
      },
      {
        it: "cucitura a vista",
        en: "exposed seam"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza spalle",
          en: "shoulder width"
        },
        base: 36,
        step: 1.5
      },
      {
        ref: "B",
        what: {
          it: "lunghezza davanti",
          en: "front length"
        },
        base: 64,
        step: 1.5
      },
      {
        ref: "C",
        what: {
          it: "lunghezza manica",
          en: "sleeve length"
        },
        base: 60,
        step: 1
      }
    ],
    alt: {
      front: {
        it: "VOID, body a manica lunga: disegno tecnico, vista frontale",
        en: "VOID, long-sleeve bodysuit: technical drawing, front view"
      },
      back: {
        it: "VOID, body a manica lunga: disegno tecnico, vista dal retro",
        en: "VOID, long-sleeve bodysuit: technical drawing, back view"
      },
      detail: {
        it: "VOID, body a manica lunga: disegno tecnico, dettaglio del collo alto e delle cuciture a vista",
        en: "VOID, long-sleeve bodysuit: technical drawing, close-up of the high neck and exposed seams"
      }
    }
  },
  {
    id: "plumbSlip",
    name: "PLUMB",
    typeKey: "type.slip",
    category: "slips",
    slug: {
      it: "plumb-sottoveste",
      en: "plumb-slip"
    },
    price: 240,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      },
      {
        id: "skin-02",
        soldOut: [
          "*"
        ]
      }
    ],
    hygiene: false,
    description: {
      it: "Sottoveste in jersey di seta. Spalline sottili, taglio dritto che cade a piombo, orlo a metà coscia. Opaca, leggermente trasparente in controluce.",
      en: "Silk jersey slip. Thin straps, a straight cut that falls plumb, mid-thigh hem. Opaque, slightly sheer against the light."
    },
    key: {
      sheerness: {
        it: "Opaco, leggera trasparenza in controluce",
        en: "Opaque, slightly sheer against the light"
      },
      underwire: false,
      padding: false
    },
    construction: [
      {
        it: "Jersey di seta monostrato, taglio dritto senza pinces.",
        en: "Single-layer silk jersey, straight cut, no darts."
      },
      {
        it: "Spalline sottili regolabili.",
        en: "Thin adjustable straps."
      },
      {
        it: "Orlo a metà coscia, rifinito a giro.",
        en: "Mid-thigh hem, clean-finished."
      }
    ],
    composition: [
      {
        it: "92% seta, 8% elastan",
        en: "92% silk, 8% elastane"
      }
    ],
    care: [
      "care.silk"
    ],
    fit: {
      it: "Veste morbida. Taglio dritto, orlo a metà coscia.",
      en: "Relaxed fit. Straight cut, mid-thigh hem."
    },
    callouts: [
      {
        it: "jersey di seta",
        en: "silk jersey"
      },
      {
        it: "spallina regolabile",
        en: "adjustable strap"
      },
      {
        it: "orlo dritto",
        en: "straight hem"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza al seno",
          en: "bust width"
        },
        base: 44,
        step: 2.5
      },
      {
        ref: "B",
        what: {
          it: "lunghezza totale",
          en: "total length"
        },
        base: 86,
        step: 1
      }
    ],
    alt: {
      front: {
        it: "PLUMB, sottoveste: disegno tecnico, vista frontale",
        en: "PLUMB, slip: technical drawing, front view"
      },
      back: {
        it: "PLUMB, sottoveste: disegno tecnico, vista dal retro",
        en: "PLUMB, slip: technical drawing, back view"
      },
      detail: {
        it: "PLUMB, sottoveste: disegno tecnico, dettaglio della spallina e del bordo dello scollo",
        en: "PLUMB, slip: technical drawing, close-up of the strap and neckline edge"
      }
    }
  },
  {
    id: "tensionHarness",
    name: "TENSION",
    typeKey: "type.harness",
    category: "accessories",
    slug: {
      it: "tension-harness",
      en: "tension-harness"
    },
    price: 115,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: []
      }
    ],
    hygiene: false,
    description: {
      it: "Harness in elastico piatto opaco. Anelli in metallo opaco dove le fasce si incontrano. Regolabile su spalle e sottoseno. Si porta sopra o sotto.",
      en: "Harness in flat matt elastic. Matt metal rings where the bands meet. Adjusts at the shoulders and underbust. Wear it over or under."
    },
    key: {},
    construction: [
      {
        it: "Fasce in elastico piatto opaco.",
        en: "Flat matt elastic bands."
      },
      {
        it: "Anelli e regolatori in metallo opaco.",
        en: "Matt metal rings and adjusters."
      },
      {
        it: "Chiusura posteriore a gancio.",
        en: "Hook fastening at the back."
      }
    ],
    composition: [
      {
        it: "Fasce: 60% poliammide, 40% elastan",
        en: "Bands: 60% polyamide, 40% elastane"
      },
      {
        it: "Parti non tessili: anelli, regolatori e gancio in metallo",
        en: "Non-textile parts: metal rings, adjusters and hook"
      }
    ],
    care: [
      "care.hardware"
    ],
    fit: {
      it: "Regolabile. Scegli la taglia in base al sottoseno: vedi la guida taglie, lettere.",
      en: "Adjustable. Choose by underbust: see the size guide, letter sizes."
    },
    callouts: [
      {
        it: "elastico piatto",
        en: "flat elastic"
      },
      {
        it: "anello in metallo",
        en: "metal ring"
      },
      {
        it: "regolatore",
        en: "adjuster"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "circonferenza sottoseno, min–max",
          en: "underbust circumference, min–max"
        },
        base: 68,
        step: 5
      },
      {
        ref: "B",
        what: {
          it: "lunghezza fascia spalla",
          en: "shoulder band length"
        },
        base: 32,
        step: 1
      }
    ],
    alt: {
      front: {
        it: "TENSION, harness: disegno tecnico, vista frontale",
        en: "TENSION, harness: technical drawing, front view"
      },
      back: {
        it: "TENSION, harness: disegno tecnico, vista dal retro",
        en: "TENSION, harness: technical drawing, back view"
      },
      detail: {
        it: "TENSION, harness: disegno tecnico, dettaglio dell'anello in metallo e del regolatore",
        en: "TENSION, harness: technical drawing, close-up of the metal ring and adjuster"
      }
    }
  },
  {
    id: "holdSuspenderBelt",
    name: "HOLD",
    typeKey: "type.suspenderBelt",
    category: "accessories",
    slug: {
      it: "hold-reggicalze",
      en: "hold-suspender-belt"
    },
    price: 85,
    sizeSystem: "letters",
    colours: [
      {
        id: "black",
        soldOut: [
          "*"
        ]
      }
    ],
    hygiene: false,
    description: {
      it: "Reggicalze a banda alta in microfibra opaca. Quattro agganci per calze in metallo nero. Calze non incluse.",
      en: "High-band suspender belt in matt microfibre. Four black metal suspender clips. Stockings not included."
    },
    key: {
      sheerness: {
        it: "Opaco",
        en: "Opaque"
      }
    },
    construction: [
      {
        it: "Banda alta in microfibra doppio strato.",
        en: "Deep double-layer microfibre band."
      },
      {
        it: "Quattro nastri elastici regolabili con agganci per calze.",
        en: "Four adjustable elastic straps with suspender clips."
      },
      {
        it: "Chiusura posteriore a gancetti, tre posizioni.",
        en: "Hook-and-eye back fastening, three positions."
      }
    ],
    composition: [
      {
        it: "Banda: 75% poliammide, 25% elastan",
        en: "Band: 75% polyamide, 25% elastane"
      },
      {
        it: "Parti non tessili: agganci in acciaio verniciato, gancetti e regolatori in metallo",
        en: "Non-textile parts: painted steel clips, metal hooks and adjusters"
      }
    ],
    care: [
      "care.hardware",
      "care.hooks"
    ],
    fit: {
      it: "Veste regolare. Si porta in vita. Nastri regolabili in lunghezza.",
      en: "True to size. Sits at the waist. Strap length adjusts."
    },
    callouts: [
      {
        it: "banda in microfibra",
        en: "microfibre band"
      },
      {
        it: "aggancio per calze",
        en: "suspender clip"
      },
      {
        it: "regolatore",
        en: "adjuster"
      }
    ],
    measures: [
      {
        ref: "A",
        what: {
          it: "larghezza in vita",
          en: "waist width"
        },
        base: 33,
        step: 2
      },
      {
        ref: "B",
        what: {
          it: "altezza banda",
          en: "band height"
        },
        base: 12,
        step: 0
      },
      {
        ref: "C",
        what: {
          it: "lunghezza nastro, min–max",
          en: "strap length, min–max"
        },
        base: 30,
        step: 0
      }
    ],
    alt: {
      front: {
        it: "HOLD, reggicalze: disegno tecnico, vista frontale",
        en: "HOLD, suspender belt: technical drawing, front view"
      },
      back: {
        it: "HOLD, reggicalze: disegno tecnico, vista dal retro",
        en: "HOLD, suspender belt: technical drawing, back view"
      },
      detail: {
        it: "HOLD, reggicalze: disegno tecnico, dettaglio di un aggancio per calze",
        en: "HOLD, suspender belt: technical drawing, close-up of a suspender clip"
      }
    }
  },
];
