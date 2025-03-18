// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */


  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        },
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ...devices['iPhone 11 Pro landscape']
      },
    },
  ]

});

