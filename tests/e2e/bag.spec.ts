import { expect, test } from "@playwright/test";
import { addAxis, bagCounter, bagDialog } from "./helpers";

test("bag survives a reload", async ({ page }) => {
  await addAxis(page);
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 1 articolo");
  await page.reload();
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 1 articolo");
  await page.goto("/it/borsa");
  await expect(page.getByRole("heading", { level: 1, name: "Borsa, 1 articolo" })).toBeVisible();
  await expect(page.getByRole("link", { name: "AXIS" })).toBeVisible();
});

test("remove with undo, counter opens the panel", async ({ page }) => {
  await addAxis(page);
  await bagCounter(page).click();
  const dialog = bagDialog(page);
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: /^Rimuovi AXIS/ }).click();
  await expect(dialog.getByText("Rimosso: AXIS.")).toBeVisible();
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 0 articoli");
  // Undo has no time limit (WCAG 2.2.1).
  await page.waitForTimeout(5500);
  await dialog.getByRole("button", { name: "Annulla la rimozione di AXIS" }).click();
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 1 articolo");
  await page.keyboard.press("Escape");
  await expect(bagCounter(page)).toBeFocused();
});

test("corrupted or outdated bag data is handled", async ({ page }) => {
  await page.goto("/it");
  // Wait until the bag has been read, otherwise the page itself would reset the bad data first.
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 0 articoli");
  await page.evaluate(() => localStorage.setItem("lingerai-bag", "{not json"));
  await page.goto("/it/borsa");
  await expect(page.getByText("La borsa è stata svuotata: i dati salvati non erano leggibili.")).toBeVisible();
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 0 articoli");

  await page.evaluate(() =>
    localStorage.setItem("lingerai-bag", JSON.stringify({ v: 1, lines: [{ id: "gone", colour: "black", size: "M", qty: 1 }] })),
  );
  await page.reload();
  await expect(page.getByText("Non più disponibile")).toBeVisible();
  await expect(page.getByText("Rimuovi i pezzi non disponibili per continuare.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Vai al checkout" })).toHaveCount(0);
});

test("language switch keeps the bag, the equivalent page and checkout data", async ({ page }) => {
  await addAxis(page);
  await page.locator("footer").getByRole("link", { name: "EN — English" }).click();
  await expect(page).toHaveURL(/\/en\/bras\/axis-bra/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Bag, 1 item");

  await page.goto("/en/checkout");
  await page.getByLabel("Email", { exact: true }).fill("alex.example@example.com");
  await page.getByLabel("First name").fill("Alex");
  await page.getByRole("link", { name: "IT — Italiano" }).first().click();
  await expect(page).toHaveURL(/\/it\/checkout$/);
  await expect(page.getByLabel("Email", { exact: true })).toHaveValue("alex.example@example.com");
  await expect(page.getByLabel("Nome", { exact: true })).toHaveValue("Alex");
});

test("sold-out size cannot be selected", async ({ page }) => {
  await page.goto("/it/reggiseni/axis-reggiseno?color=black");
  const soldOut = page.getByRole("radio", { name: "XXL, esaurita" });
  await expect(soldOut).toHaveAttribute("aria-disabled", "true");
  // force: Playwright refuses aria-disabled targets, a real click still reaches the label.
  await page.locator("label", { has: soldOut }).click({ force: true });
  await expect(soldOut).not.toBeChecked();
  await expect(page.locator('[id^="size-msg-"]')).toContainText(/XXL esaurita in nero/);
  await page.getByRole("button", { name: /^Aggiungi alla borsa — / }).click();
  await expect(bagDialog(page)).toBeHidden();
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 0 articoli");
});

test("clear demo data empties bag, checkout and last order", async ({ page }) => {
  await addAxis(page);
  await page.goto("/it/checkout");
  await page.getByLabel("Email", { exact: true }).fill("x@example.com");
  await page.evaluate(() => sessionStorage.setItem("lingerai-order", JSON.stringify({ id: "DEMO-0009", lines: [], values: {} })));

  await page.goto("/it/privacy");
  await page.getByRole("button", { name: "Cancella i dati della demo" }).click();
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 0 articoli");
  const stored = await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }));
  expect(stored).toEqual({ local: 0, session: 0 });

  await page.goto("/it/checkout/conferma");
  await expect(page.getByRole("heading", { name: "Nessun ordine demo recente." })).toBeVisible();
});

test("localized 404", async ({ page }) => {
  const it = await page.goto("/it/non-esiste");
  expect(it?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "it");
  await expect(page.getByRole("heading", { level: 1, name: "Pagina non trovata" })).toBeVisible();

  const en = await page.goto("/en/does-not-exist");
  expect(en?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
});

test("robots.txt blocks the demo, sitemap lists IT/EN with hreflang", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/it/reggiseni/axis-reggiseno");
  expect(sitemap).toContain("/en/bras/axis-bra");
  expect(sitemap).toContain('hreflang="en-GB"');
  expect(sitemap).not.toContain("/it/checkout");
  expect(sitemap).toContain("/it/crediti");
  expect(sitemap).toContain("/en/credits");
});

test("editorial photos: alt text in the page language, credits page linked from the footer", async ({ page, isMobile }) => {
  await page.goto("/it");
  // Compact hero on mobile too (375×812 leaves room for the first cards).
  await expect(page.getByRole("img", { name: "Top in rete trasparente su reggiseno a quadretti, trucco scuro" })).toBeVisible();
  if (isMobile) await expect(page.locator('section[aria-labelledby="home-drop"] a').first()).toBeInViewport();

  await page.goto("/it/drop/grid-01");
  for (const name of ["Harness in pelle", "Body nero a maniche corte", "Calze a rete e anfibi", "Ritratto mosso"]) {
    await expect(page.getByRole("img", { name: new RegExp(`^${name}`) })).toBeVisible();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.goto("/it/chi-siamo");
  const portrait = page.getByRole("img", { name: "Ritratto in bianco e nero di una donna con capelli corti bianchi e maglione nero" });
  await expect(portrait).toBeVisible();
  await expect.poll(() => portrait.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);

  await page.goto("/en/bras");
  const bras = page.getByRole("img", { name: "Black bralette seen from the back, on a grey background" });
  // Hidden below 768 so the first products stay in the first screen.
  if (isMobile) await expect(bras).toBeHidden();
  else await expect(bras).toBeVisible();

  await page.getByRole("contentinfo").getByRole("link", { name: "Photo credits" }).click();
  await expect(page).toHaveURL(/\/en\/credits$/);
  await expect(page.getByRole("heading", { level: 1, name: "Photo credits" })).toBeVisible();
  await expect(page.getByRole("link", { name: /^View on Pexels/ })).toHaveCount(15);
});
