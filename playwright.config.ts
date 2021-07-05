import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  projects: [
    {
      name: 'Chrome ',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
      },
    },
  ],
}
export default config
