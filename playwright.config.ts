import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
      },
    },
  ],
}
export default config
