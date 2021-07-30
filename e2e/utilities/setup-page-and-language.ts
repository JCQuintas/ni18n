import { Page } from '@playwright/test'
import { Language } from './language'
import { testUrl } from './test-url'
import { waitTime } from './wait-time'

export const setupPageAndLanguage = async (
  page: Page,
  language: Language,
): Promise<void> => {
  await page.goto(testUrl)
  await page.click(`[data-id=${language}-button]`)
  await page.waitForTimeout(waitTime)
}
