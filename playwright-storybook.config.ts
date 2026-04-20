import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './storybook-tests',
  fullyParallel: false,
  timeout: 120_000,
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
  },
  snapshotPathTemplate: '{testDir}/__snapshots__/{arg}{ext}',
  projects: [{ name: 'storybook-tests', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
