import { expect, test, type Request } from "@playwright/test";
import { bagCounter, bagDialog, chooseSize } from "./helpers";

test("full IT purchase: category → product → size error → bag panel → checkout → confirmation", async ({ page }) => {
  // No request may carry what is typed in the checkout (nothing leaves the browser).
  const requests: Request[] = [];
  page.on("request", (r) => requests.push(r));

  await page.goto("/it/reggiseni");
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 0 articoli");
  await page.getByRole("link", { name: /^AXIS.*triangolo/i }).first().click();
  await expect(page).toHaveURL(/\/it\/reggiseni\/axis-reggiseno/);
  await expect(page.getByRole("heading", { level: 1, name: "AXIS" })).toBeVisible();

  // Add without a size: inline error, focus on the size group, nothing added.
  const addButton = page.getByRole("button", { name: /^Aggiungi alla borsa — / });
  await addButton.click();
  await expect(page.getByText("Taglia non selezionata. Scegline una per continuare.")).toBeVisible();
  await expect(page.locator('input[type="radio"][name^="size-"]:focus')).toHaveCount(1);
  await expect(bagDialog(page)).toBeHidden();

  // Choose a size and add: the panel opens by itself with the new line.
  await chooseSize(page, "M");
  await expect(addButton).toContainText("M");
  await addButton.click();
  const dialog = bagDialog(page);
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName("Borsa, 1 articolo");
  await expect(dialog.getByText("Aggiunto", { exact: true })).toBeVisible();
  await expect(dialog.getByRole("heading", { level: 2 })).toBeFocused();
  await expect(dialog.getByText("Prezzi simulati, IVA inclusa.")).toBeVisible();
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 1 articolo");

  // Quantity +/−
  await dialog.getByRole("button", { name: /^Aumenta quantità, AXIS/ }).click();
  await expect(dialog.getByTestId("qty")).toHaveText("2");
  await dialog.getByRole("button", { name: /^Diminuisci quantità, AXIS/ }).click();
  await expect(dialog.getByTestId("qty")).toHaveText("1");

  await dialog.getByRole("link", { name: "Vai al checkout" }).click();
  await expect(page).toHaveURL(/\/it\/checkout$/);

  // Demo banner first in <main>; sample data warning; no card fields.
  const main = page.locator("main");
  await expect(main.locator(":scope > div > :first-child")).toHaveText(/^Demo — nessun pagamento verrà effettuato/);
  await expect(page.getByText("Usa i dati di esempio: non inserire i tuoi.")).toBeVisible();
  await expect(page.locator('input[autocomplete^="cc-"]')).toHaveCount(0);
  await expect(page.getByText("Tutti i campi sono obbligatori, tranne quelli indicati.")).toBeVisible();

  // Submit empty: error summary with focus + messages per field.
  const submit = page.getByRole("button", { name: /^Conferma ordine demo — / });
  await submit.click();
  const summary = page.getByRole("heading", { name: /errori da correggere$/ });
  await expect(summary).toBeFocused();
  await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("aria-invalid", "true");

  // Sample data: example.com, terms never ticked automatically.
  await page.getByRole("button", { name: "Compila con dati di esempio" }).click();
  await expect(page.getByLabel("Email", { exact: true })).toHaveValue("alba.esempio@example.com");
  const terms = page.getByRole("checkbox", { name: /Accetto i termini della demo/ });
  await expect(terms).not.toBeChecked();
  await submit.click();
  await expect(page.getByRole("heading", { name: "1 errore da correggere" })).toBeFocused();
  await terms.check();
  await submit.click();

  await expect(page).toHaveURL(/\/it\/checkout\/conferma$/);
  await expect(page.getByRole("heading", { level: 1, name: "Ordine demo ricevuto" })).toBeVisible();
  await expect(page.getByText("Indirizzo inserito (demo)")).toBeVisible();
  await expect(page.getByText("Via dell'Esempio 1")).toBeVisible();
  await expect(page.getByText(/restano solo in questa scheda del browser/).first()).toBeVisible();
  await expect(page.getByText(/^Ordine DEMO-0001 · /)).toBeVisible();

  // The bag is empty after the order; a reload keeps the same confirmation.
  await expect(bagCounter(page)).toHaveAttribute("aria-label", "Borsa, 0 articoli");
  expect(await page.evaluate(() => localStorage.getItem("lingerai-bag"))).toBeNull();
  await page.reload();
  await expect(page.getByText(/^Ordine DEMO-0001 · /)).toBeVisible();

  for (const r of requests) {
    const payload = `${r.url()} ${r.postData() ?? ""}`;
    expect(payload).not.toContain("example.com");
    expect(payload).not.toContain("Esempio");
  }
});

test("checkout and confirmation without a bag / order", async ({ page }) => {
  await page.goto("/it/checkout");
  await expect(page.getByText("La borsa è vuota. Niente da confermare.")).toBeVisible();
  await page.goto("/it/checkout/conferma");
  await expect(page.getByRole("heading", { name: "Nessun ordine demo recente." })).toBeVisible();
});
