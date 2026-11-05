import { expect, type Page } from "@playwright/test";

/** Main header counter (BORSA [n]). */
export const bagCounter = (page: Page) => page.locator("header [data-bag-counter]");

export const bagDialog = (page: Page) => page.getByRole("dialog", { name: /^(Borsa|Bag),/ });

/** Clicks the visible box of a visually hidden radio (sizes, swatches). */
export async function chooseSize(page: Page, size: string) {
  await page.locator("label", { has: page.getByRole("radio", { name: size, exact: true }) }).click();
}

/** Adds AXIS (black, size) to the bag through the UI and closes the panel. */
export async function addAxis(page: Page, size = "M") {
  await page.goto("/it/reggiseni/axis-reggiseno?color=black");
  await chooseSize(page, size);
  await page.getByRole("button", { name: /^Aggiungi alla borsa — / }).click();
  await expect(bagDialog(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(bagDialog(page)).toBeHidden();
}
