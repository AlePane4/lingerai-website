// LINGERAI — demo catalogue GRID / 01.
// Copy from docs/copy/products.md (IT/EN). Stock, measurements and set links are demo data.
// Shared copy (product types, colours, care, fit) lives in src/messages/*.json under type.*, colour.*, care.*.

import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;
export type CategoryId = "bras" | "briefs" | "bodysuits" | "slips" | "accessories";
export type ColourId = "black" | "optic-white";
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
  /** Values in cm at the reference size (M / 75B), with step per size. */
  measures: Measure[];
  /** Product photos: the first is used on cards. Alt describes garment and scene, never the body. */
  images: { src: string; alt: Localized }[];
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
        id: "optic-white",
        soldOut: []
      }
    ],
    setWith: "axisBrief",
    images: [
      {
        src: "/images/products/axisBra-1.jpg",
        alt: {
          it: "Reggiseno a triangolo in pizzo nero con fiocco al centro, sotto una camicia bianca aperta",
          en: "Black lace triangle bra with a centre bow, under an open white satin shirt"
        }
      }
    ],
    hygiene: false,
    description: {
      it: "Triangolo in pizzo floreale nero. Scollo a V profondo, fiocco di nastro al centro, spalline sottili. Senza ferretto, senza imbottitura. Semi-trasparente.",
      en: "Black floral-lace triangle. Deep V neckline, a ribbon bow at the centre, thin straps. No underwire, unlined. Semi-sheer."
    },
    key: {
      sheerness: {
        it: "Semi-trasparente",
        en: "Semi-sheer"
      },
      underwire: false,
      padding: false,
      support: "light"
    },
    construction: [
      {
        it: "Coppa a triangolo in pizzo floreale monostrato.",
        en: "Single-layer floral-lace triangle cup."
      },
      {
        it: "Fiocco di nastro al centro.",
        en: "Ribbon bow at the centre."
      },
      {
        it: "Spalline sottili regolabili, regolatori in metallo nero opaco.",
        en: "Thin adjustable straps, matt black metal adjusters."
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
    ]
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
        id: "optic-white",
        soldOut: []
      }
    ],
    setWith: "planeThong",
    images: [
      {
        src: "/images/products/planeBra-1.jpg",
        alt: {
          it: "Reggiseno balconette nero in pizzo con piccolo fiocco centrale, fondo grigio",
          en: "Black lace balconette bra with a small centre bow, grey background"
        }
      }
    ],
    hygiene: false,
    description: {
      it: "Balconette imbottito con ferretto, in pizzo nero opaco. Fascia laterale in pizzo, piccolo fiocco al centro, spalline sottili. Opaco.",
      en: "Padded underwired balconette in opaque black lace. Lace side band, a small bow at the centre, thin straps. Opaque."
    },
    key: {
      sheerness: {
        it: "Opaco",
        en: "Opaque"
      },
      underwire: true,
      padding: true,
      support: "firm"
    },
    construction: [
      {
        it: "Coppa balconette imbottita, rivestita in pizzo opaco.",
        en: "Padded balconette cup, covered in opaque lace."
      },
      {
        it: "Ferretto in acciaio rivestito, dentro un canale cucito.",
        en: "Coated steel underwire, inside a sewn channel."
      },
      {
        it: "Fascia laterale in pizzo, piccolo fiocco al centro.",
        en: "Lace side band, small bow at the centre."
      },
      {
        it: "Spalline sottili regolabili, regolatori in metallo nero opaco.",
        en: "Thin adjustable straps, matt black metal adjusters."
      },
      {
        it: "Chiusura posteriore a gancetti, tre posizioni.",
        en: "Hook-and-eye back fastening, three positions."
      }
    ],
    composition: [
      {
        it: "Pizzo e dorso: 80% poliammide, 20% elastan",
        en: "Lace and back: 80% polyamide, 20% elastane"
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
    ]
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
    images: [
      {
        src: "/images/products/rasterBralette-1.jpg",
        alt: {
          it: "Bralette nero in pizzo geometrico con collo all'americana e apertura a goccia",
          en: "Black geometric-lace halter bralette with a keyhole opening"
        }
      }
    ],
    hygiene: false,
    description: {
      it: "Bralette longline in pizzo geometrico a zig-zag. Collo all'americana con apertura a goccia, fascia lunga sul costato. Senza ferretto, senza imbottitura. Semi-trasparente.",
      en: "Longline bralette in geometric zig-zag lace. Halter neck with a keyhole opening, long band over the ribcage. No underwire, unlined. Semi-sheer."
    },
    key: {
      sheerness: {
        it: "Semi-trasparente",
        en: "Semi-sheer"
      },
      underwire: false,
      padding: false,
      support: "light"
    },
    construction: [
      {
        it: "Pizzo geometrico monostrato.",
        en: "Single-layer geometric lace."
      },
      {
        it: "Collo all'americana con apertura a goccia.",
        en: "Halter neck with a keyhole opening."
      },
      {
        it: "Fascia lunga sul costato.",
        en: "Long band over the ribcage."
      },
      {
        it: "Senza chiusura: si infila dalla testa.",
        en: "No fastening: pulls on over the head."
      }
    ],
    composition: [
      {
        it: "Pizzo e fascia: 85% poliammide, 15% elastan",
        en: "Lace and band: 85% polyamide, 15% elastane"
      }
    ],
    care: [
      "care.standard"
    ],
    fit: {
      it: "Veste aderente. Senza chiusura: tra due taglie, la più grande.",
      en: "Close fit. No fastening: between sizes, size up."
    },
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
    ]
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
        id: "optic-white",
        soldOut: []
      }
    ],
    setWith: "beamBrief",
    images: [
      {
        src: "/images/products/strutBra-1.jpg",
        alt: {
          it: "Reggiseno nero liscio a coppe preformate, fondo nero e luce dura",
          en: "Plain black moulded-cup bra, black background, hard light"
        }
      }
    ],
    hygiene: false,
    description: {
      it: "Reggiseno liscio a coppe preformate, senza pizzo né decorazioni. Spalline sottili regolabili. Opaco.",
      en: "Plain moulded-cup bra, no lace or trims. Thin adjustable straps. Opaque."
    },
    key: {
      sheerness: {
        it: "Opaco",
        en: "Opaque"
      },
      support: "medium"
    },
    construction: [
      {
        it: "Coppe preformate in microfibra doppio strato.",
        en: "Moulded cups in double-layer microfibre."
      },
      {
        it: "Spalline sottili regolabili.",
        en: "Thin adjustable straps."
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
    ]
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
        id: "optic-white",
        soldOut: [
          "3XL"
        ]
      }
    ],
    setWith: "axisBra",
    images: [
      {
        src: "/images/products/axisBrief-1.jpg",
        alt: {
          it: "Slip in pizzo nero con bordo smerlato, vista frontale, su fondo grigio",
          en: "Black lace briefs with a scalloped edge, front view, on a grey background"
        }
      }
    ],
    hygiene: true,
    description: {
      it: "Slip in pizzo floreale nero a vita bassa. Bordo smerlato, stesso pizzo del reggiseno. Tassello in cotone. Semi-trasparente.",
      en: "Low-rise black floral-lace brief. Scalloped edge, the same lace as the bra. Cotton gusset. Semi-sheer."
    },
    key: {
      sheerness: {
        it: "Semi-trasparente, tassello opaco",
        en: "Semi-sheer, opaque gusset"
      },
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Pizzo monostrato, bordo smerlato.",
        en: "Single-layer lace, scalloped edge."
      },
      {
        it: "Vita bassa con fascia sottile.",
        en: "Low rise with a thin waistband."
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
      it: "Veste regolare. Vita bassa.",
      en: "True to size. Low rise."
    },
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
    ]
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
        id: "optic-white",
        soldOut: []
      }
    ],
    setWith: "planeBra",
    images: [
      {
        src: "/images/products/planeThong-1.jpg",
        alt: {
          it: "Perizoma nero con reggicalze e corsetto in pizzo nero, vista frontale, fondo scuro",
          en: "Black thong with lace suspender belt and lace corset top, front view, dark background"
        }
      }
    ],
    hygiene: true,
    description: {
      it: "Perizoma nero con laccetti sottili ai fianchi e un piccolo gioiello al centro. Tassello in cotone. Nella foto è abbinato a reggicalze e corsetto in pizzo, non inclusi.",
      en: "Black thong with thin side ties and a small jewel at the centre. Cotton gusset. Shown with a lace suspender belt and corset, not included."
    },
    key: {
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Laccetti sottili ai fianchi.",
        en: "Thin ties at the sides."
      },
      {
        it: "Piccolo gioiello al centro.",
        en: "Small jewel at the centre."
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
    ]
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
        id: "optic-white",
        soldOut: []
      }
    ],
    setWith: "strutBra",
    images: [
      {
        src: "/images/products/beamBrief-1.jpg",
        alt: {
          it: "Slip nero a vita alta con fascia a chevron, bustier grigio e guanti neri, fondo bianco",
          en: "High-waisted black briefs with a chevron waistband, grey bustier and black gloves, white background"
        }
      }
    ],
    hygiene: true,
    description: {
      it: "Slip a vita alta nero. Una fascia con motivo a chevron e borchie argento corre sopra l'ombelico, come una trave. Parte bassa in tulle. Tassello in cotone.",
      en: "High-waist black brief. A band with a chevron pattern and silver studs runs above the navel, like a beam. Tulle below. Cotton gusset."
    },
    key: {
      sheerness: {
        it: "Fascia opaca, parte bassa in tulle",
        en: "Opaque band, tulle below"
      },
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Fascia in vita con motivo a chevron e borchie argento.",
        en: "Waistband with a chevron pattern and silver studs."
      },
      {
        it: "Parte bassa in tulle.",
        en: "Tulle lower part."
      },
      {
        it: "Vita alta con elastico piatto.",
        en: "High rise with flat elastic."
      }
    ],
    composition: [
      {
        it: "Fascia: 72% poliammide, 28% elastan",
        en: "Band: 72% polyamide, 28% elastane"
      },
      {
        it: "Parte bassa: 80% poliammide, 20% elastan",
        en: "Lower part: 80% polyamide, 20% elastane"
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
          it: "altezza fascia",
          en: "waistband height"
        },
        base: 9,
        step: 0
      }
    ]
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
    images: [
      {
        src: "/images/products/rasterShorty-1.jpg",
        alt: {
          it: "Culotte in pizzo floreale nero con bordo smerlato, cardigan bianco aperto, fondo marrone scuro",
          en: "Black floral-lace shorts with a scalloped edge, open white bouclé cardigan, dark brown background"
        }
      }
    ],
    hygiene: true,
    description: {
      it: "Culotte in pizzo floreale nero. Bordo smerlato, inserti lucidi, vita bassa, gamba corta. Tassello in cotone. Semi-trasparente.",
      en: "Black floral-lace shorty. Scalloped edge, glossy inserts, low rise, short leg. Cotton gusset. Semi-sheer."
    },
    key: {
      sheerness: {
        it: "Semi-trasparente, tassello opaco",
        en: "Semi-sheer, opaque gusset"
      },
      gusset: {
        it: "Cotone",
        en: "Cotton"
      }
    },
    construction: [
      {
        it: "Pizzo floreale monostrato, bordo smerlato.",
        en: "Single-layer floral lace, scalloped edge."
      },
      {
        it: "Gamba corta, copertura piena dietro.",
        en: "Short leg, full back coverage."
      },
      {
        it: "Vita bassa con elastico piatto.",
        en: "Low rise with flat elastic."
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
      }
    ],
    care: [
      "care.standard"
    ],
    fit: {
      it: "Veste aderente. Tra due taglie: la più grande.",
      en: "Close fit. Between sizes: size up."
    },
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
    ]
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
        id: "optic-white",
        soldOut: []
      }
    ],
    images: [
      {
        src: "/images/products/monolithBodysuit-1.jpg",
        alt: {
          it: "Body nero a spalline sottili con scollo tondo, fondo grigio scuro, luce dura",
          en: "Black thin-strap bodysuit with a scoop neckline, dark grey background, hard light"
        }
      },
      {
        src: "/images/products/monolithBodysuit-2.jpg",
        alt: {
          it: "Body nero a spalline sottili, vista tre quarti, fondo grigio",
          en: "Black thin-strap bodysuit, three-quarter view, grey background"
        }
      }
    ],
    hygiene: true,
    description: {
      it: "Body nero opaco a spalline sottili. Scollo tondo ampio, anellino metallico sulla spallina, sgambato alto. Si indossa anche come top. Opaco.",
      en: "Matt black thin-strap bodysuit. Wide scoop neckline, a small metal ring on the strap, high-cut leg. Works as a top too. Opaque."
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
        en: "Double-layer microfibre at the front."
      },
      {
        it: "Scollo tondo ampio, spalline sottili fisse con anellino in metallo.",
        en: "Wide scoop neckline, thin fixed straps with a small metal ring."
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
        it: "Parti non tessili: anellino e gancetti in metallo",
        en: "Non-textile parts: metal ring and hooks"
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
    ]
  },
  {
    id: "voidBodysuit",
    name: "VOID",
    typeKey: "type.bodysuit",
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
      },
      {
        id: "optic-white",
        soldOut: []
      }
    ],
    lowStock: true,
    images: [
      {
        src: "/images/products/voidBodysuit-1.jpg",
        alt: {
          it: "Body nero a costine con scollo a cuore e bottoncini, luce bassa su fondo scuro",
          en: "Black ribbed bodysuit with a sweetheart neckline and small buttons, low light on a dark background"
        }
      }
    ],
    hygiene: true,
    description: {
      it: "Body nero a costine con scollo a cuore e tre bottoncini sul davanti. Spalline sottili. Opaco.",
      en: "Black ribbed bodysuit with a sweetheart neckline and three small buttons at the front. Thin straps. Opaque."
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
        it: "Maglia a costine.",
        en: "Ribbed knit."
      },
      {
        it: "Scollo a cuore, tre bottoncini sul davanti.",
        en: "Sweetheart neckline, three small buttons at the front."
      },
      {
        it: "Spalline sottili fisse.",
        en: "Thin fixed straps."
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
      it: "Veste aderente.",
      en: "Close fit."
    },
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
          it: "altezza sgambatura",
          en: "leg-cut height"
        },
        base: 14,
        step: 0.5
      }
    ]
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
        id: "optic-white",
        soldOut: [
          "*"
        ]
      }
    ],
    images: [
      {
        src: "/images/products/plumbSlip-1.jpg",
        alt: {
          it: "Sottoveste nera al ginocchio in raso, spalline sottili, fondo bianco",
          en: "Knee-length black satin slip with thin straps, white background"
        }
      },
      {
        src: "/images/products/plumbSlip-2.jpg",
        alt: {
          it: "Sottoveste nera al ginocchio, vista frontale, fondo bianco",
          en: "Knee-length black slip, front view, white background"
        }
      }
    ],
    hygiene: false,
    description: {
      it: "Sottoveste in raso nero al ginocchio. Scollo tondo, spalline sottilissime, taglio dritto con leggero svasato in fondo. Opaca.",
      en: "Knee-length black satin slip. Round neckline, very thin straps, a straight cut with a slight flare at the hem. Opaque."
    },
    key: {
      sheerness: {
        it: "Opaco",
        en: "Opaque"
      },
      underwire: false,
      padding: false
    },
    construction: [
      {
        it: "Raso di seta monostrato, taglio dritto con leggero svasato in fondo.",
        en: "Single-layer silk satin, straight cut with a slight flare at the hem."
      },
      {
        it: "Scollo tondo, spalline sottilissime.",
        en: "Round neckline, very thin straps."
      },
      {
        it: "Orlo al ginocchio, liscio.",
        en: "Knee-length hem, plain."
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
      it: "Veste morbida. Taglio dritto, orlo al ginocchio.",
      en: "Relaxed fit. Straight cut, knee-length hem."
    },
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
        base: 100,
        step: 1
      }
    ]
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
      },
      {
        id: "optic-white",
        soldOut: []
      }
    ],
    images: [
      {
        src: "/images/products/tensionHarness-1.jpg",
        alt: {
          it: "Harness elastico nero a stella con borchie e anello centrale, sopra un body in pizzo, fondo grigio",
          en: "Black elastic star harness with studs and a centre ring over a lace bodysuit, grey background"
        }
      }
    ],
    hygiene: false,
    description: {
      it: "Harness a bretelle elastiche nere incrociate a stella, con borchie e anello centrale in metallo. Regolabile su spalle e sottoseno. Si porta sul busto, sopra un body o sotto un capo. Nella foto è indossato con body, collare e cintura, non inclusi.",
      en: "Harness of black elastic straps crossed in a star, with studs and a centre metal ring. Adjusts at the shoulders and underbust. Worn over the torso, over a bodysuit or under a top. Shown with a bodysuit, collar and belt, not included."
    },
    key: {},
    construction: [
      {
        it: "Bretelle in elastico nero incrociate a stella.",
        en: "Black elastic straps crossed in a star."
      },
      {
        it: "Borchie e anello centrale in metallo.",
        en: "Metal studs and a centre ring."
      },
      {
        it: "Regolatori in metallo.",
        en: "Metal adjusters."
      },
      {
        it: "Chiusura posteriore a gancio.",
        en: "Hook back fastening."
      }
    ],
    composition: [
      {
        it: "Bretelle: 60% poliammide, 40% elastan",
        en: "Straps: 60% polyamide, 40% elastane"
      },
      {
        it: "Parti non tessili: borchie, anello, regolatori e gancio in metallo",
        en: "Non-textile parts: studs, ring, adjusters and hook in metal"
      }
    ],
    care: [
      "care.hardware"
    ],
    fit: {
      it: "Regolabile. Scegli la taglia in base al sottoseno: vedi la guida taglie, lettere.",
      en: "Adjustable. Choose by underbust: see the size guide, letter sizes."
    },
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
    ]
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
      },
      {
        id: "optic-white",
        soldOut: [
          "*"
        ]
      }
    ],
    images: [
      {
        src: "/images/products/holdSuspenderBelt-1.jpg",
        alt: {
          it: "Reggicalze nero in rete con giarrettiere e calze nere, braccia incrociate, fondo neutro",
          en: "Black mesh suspender belt with garters and black stockings, arms crossed, neutral background"
        }
      },
      {
        src: "/images/products/holdSuspenderBelt-2.jpg",
        alt: {
          it: "Reggicalze in rete nera con clip, braccia alzate, fondo neutro",
          en: "Black mesh suspender belt with clips, arms raised, neutral background"
        }
      }
    ],
    hygiene: false,
    description: {
      it: "Reggicalze nero in rete fine, vita media. Quattro giarrettiere con clip in metallo. Calze e reggiseno non inclusi.",
      en: "Black fine-mesh suspender belt, mid-rise. Four garters with metal clips. Stockings and bra not included."
    },
    key: {
      sheerness: {
        it: "Semi-trasparente",
        en: "Semi-sheer"
      }
    },
    construction: [
      {
        it: "Rete fine, vita media.",
        en: "Fine mesh, mid-rise."
      },
      {
        it: "Quattro giarrettiere elastiche regolabili con clip per calze.",
        en: "Four adjustable elastic garters with stocking clips."
      },
      {
        it: "Chiusura posteriore a gancetti, tre posizioni.",
        en: "Hook-and-eye back fastening, three positions."
      }
    ],
    composition: [
      {
        it: "Rete: 75% poliammide, 25% elastan",
        en: "Mesh: 75% polyamide, 25% elastane"
      },
      {
        it: "Parti non tessili: clip in acciaio verniciato, gancetti e regolatori in metallo",
        en: "Non-textile parts: coated steel clips, metal hooks and adjusters"
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
    ]
  }
];
