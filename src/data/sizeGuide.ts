// Size tables from docs/research/product-positioning.md (indicative conversions). Values in cm.

export const bandTable: { underbust: [number, number]; eu: number; it: string; ukus: string }[] = [
  { underbust: [63, 67], eu: 65, it: "1", ukus: "30" },
  { underbust: [68, 72], eu: 70, it: "1", ukus: "32" },
  { underbust: [73, 77], eu: 75, it: "2", ukus: "34" },
  { underbust: [78, 82], eu: 80, it: "3", ukus: "36" },
  { underbust: [83, 87], eu: 85, it: "4", ukus: "38" },
  { underbust: [88, 92], eu: 90, it: "5", ukus: "40" },
  { underbust: [93, 97], eu: 95, it: "6", ukus: "42" },
];

export const cupTable: { diff: [number, number]; euit: string; uk: string; us: string }[] = [
  { diff: [12, 14], euit: "A", uk: "A", us: "A" },
  { diff: [14, 16], euit: "B", uk: "B", us: "B" },
  { diff: [16, 18], euit: "C", uk: "C", us: "C" },
  { diff: [18, 20], euit: "D", uk: "D", us: "D" },
  { diff: [20, 22], euit: "E", uk: "DD", us: "DD / E" },
  { diff: [22, 24], euit: "F", uk: "E", us: "DDD / F" },
  { diff: [24, 26], euit: "G", uk: "F", us: "G" },
];

export const letterTable: { size: string; it: string; eu: string; uk: string; us: string; hips: [number, number]; underbust: [number, number] }[] = [
  { size: "XS", it: "38", eu: "34", uk: "6", us: "2", hips: [84, 88], underbust: [63, 67] },
  { size: "S", it: "40", eu: "36", uk: "8", us: "4", hips: [89, 93], underbust: [68, 72] },
  { size: "M", it: "42", eu: "38", uk: "10", us: "6", hips: [94, 98], underbust: [73, 77] },
  { size: "L", it: "44", eu: "40", uk: "12", us: "8", hips: [99, 103], underbust: [78, 82] },
  { size: "XL", it: "46", eu: "42", uk: "14", us: "10", hips: [104, 109], underbust: [83, 88] },
  { size: "XXL", it: "48", eu: "44", uk: "16", us: "12", hips: [110, 116], underbust: [89, 94] },
  { size: "3XL", it: "50", eu: "46", uk: "18", us: "14", hips: [117, 123], underbust: [95, 100] },
];
