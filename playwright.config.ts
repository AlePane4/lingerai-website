import { defineConfig, devices } from "@playwright/test";

// E2E tests run against the production build (lighter than the dev server).
// Port 3107 is reserved for the tests so a running `npm run dev` (3000) is never reused.
const PORT = Number(process.env.E2E_PORT ?? 3107);
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    locale: "it-IT",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: {
        ...devices["Pixel 7"],
        browserName: "chromium",
        viewport: { width: 375, height: 812 },
      },
    },
  ],
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: `${BASE_URL}/it`,
    reuseExistingServer: false,
    timeout: 300_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
