import { expect, Page } from '@playwright/test'
import { Language } from './language'
import { testFooter } from './test-footer'
import { testHeader } from './test-header'
import { translations } from '../../data/translations'
import { waitTime } from './wait-time'
import { PageName } from './page-name'
import { Namespace } from './namespace'

export const testPage = async (
  page: Page,
  language: Language,
  pageName: PageName,
  namespace: Namespace,
): Promise<void> => {
  await page.click(`[data-id=${pageName}-page-button]`)
  await page.waitForTimeout(waitTime)

  if (namespace === 'home') {
    const data = translations[language][namespace]
    expect(await page.innerText('main p:first-of-type')).toBe(data.content)
    expect(await page.innerText('main p:last-of-type')).toBe(data.extraContent)
  } else {
    const data = translations[language][namespace]
    expect(await page.innerText('main h1')).toBe(data.title)
    expect(await page.innerText('main p')).toBe(data.content)
  }

  await testHeader(page, language)
  await testFooter(page, language, pageName)
}
