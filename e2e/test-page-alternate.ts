import { expect, Page } from '@playwright/test'
import { Language } from './language'
import { testFooter } from './test-footer'
import { testHeader } from './test-header'

const alternateData = {
  en: {
    title: 'Alternate Page',
    content: "This page uses the 'alternate' namespace",
  },
  es: {
    title: 'Página Alternativa',
    content: "Esta página usa el namespace 'alternate'",
  },
  pt: {
    title: 'Página Alternativa',
    content: "Esta página usa o namespace 'alternate'",
  },
}

export const testPageAlternate = async (
  page: Page,
  language: Language,
): Promise<void> => {
  const pageName = 'alternate'

  await page.click(`[data-id=${pageName}-page-button]`)
  await page.waitForTimeout(200)

  await page.click(`[data-id=${language}-button]`)
  await page.waitForTimeout(200)

  expect(await page.innerText('main h1')).toBe(alternateData[language].title)
  expect(await page.innerText('main p')).toBe(alternateData[language].content)

  await testHeader(page, language)
  await testFooter(page, language, pageName)
}
