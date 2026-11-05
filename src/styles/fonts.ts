import localFont from "next/font/local";

// Self-hosted fonts from @fontsource packages (SIL OFL 1.1, licences in ./fonts/).
// Latin subset only: it covers Italian and English (è, à, ò, €).

// Archivo variable: wght 100–900 and wdth 62–125. Preloaded (LCP title).
export const archivo = localFont({
  src: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--font-archivo",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

// JetBrains Mono static 400 / 500 / 700. Not preloaded.
export const jetbrainsMono = localFont({
  src: [
    { path: "../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  preload: false,
  variable: "--font-jetbrains",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
});
