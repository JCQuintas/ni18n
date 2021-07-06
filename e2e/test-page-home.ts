import { expect, Page } from '@playwright/test'
import { Language } from './language'
import { testFooter } from './test-footer'
import { testHeader } from './test-header'
import { translations } from '../data/translations'

export const testPageHome = async (
  page: Page,
  language: Language,
): Promise<void> => {
  const pageName = 'home'
  const namespace = 'home'
  const data = translations[language][namespace]

  await page.click(`[data-id=${pageName}-page-button]`)
  await page.waitForTimeout(500)

  await page.click(`[data-id=${language}-button]`)
  await page.waitForTimeout(500)

  expect(await page.innerText('main h1')).toBe(data.title)
  expect(await page.innerText('main p:first-of-type')).toBe(data.content)
  expect(await page.innerText('main p:last-of-type')).toBe(data.extraContent)

  await testHeader(page, language)
  await testFooter(page, language, pageName)
}
