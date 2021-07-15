import { expect, Page } from '@playwright/test'
import { Language } from './language'
import { testFooter } from './test-footer'
import { testHeader } from './test-header'
import { translations } from '../data/translations'
import { waitTime } from './wait-time'

export const testPageHome = async (
  page: Page,
  language: Language,
): Promise<void> => {
  const pageName = 'home'
  const namespace = 'home'
  const data = translations[language][namespace]

  await page.click(`[data-id=${pageName}-page-button]`)
  await page.waitForTimeout(waitTime)

  await page.click(`[data-id=${language}-button]`)
  await page.waitForTimeout(waitTime)

  expect(await page.innerText('main h1')).toBe(data.title)
  expect(await page.innerText('main p:first-of-type')).toBe(data.content)
  expect(await page.innerText('main p:last-of-type')).toBe(data.extraContent)

  await testHeader(page, language)
  await testFooter(page, language, pageName)
}
