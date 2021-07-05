import { expect, Page } from '@playwright/test'
import { Language } from './language'
import { translations } from '../scripts/translations'

export const testFooter = async (
  page: Page,
  language: Language,
  pageName: 'home' | 'alternate' | 'default-namespace',
): Promise<void> => {
  const namespace = 'translation'
  const data = translations[language][namespace]

  const footer = await page.waitForSelector('footer')

  expect(await footer.waitForSelector(`text=${data.homePage}`)).toBeTruthy()

  expect(
    await footer.waitForSelector(`text=${data.alternatePage}`),
  ).toBeTruthy()

  expect(
    await footer.waitForSelector(`text=${data.defaultNamespacePage}`),
  ).toBeTruthy()

  const activeKey = {
    home: 'homePage' as const,
    alternate: 'alternatePage' as const,
    'default-namespace': 'defaultNamespacePage' as const,
  }

  expect(await page.innerText('footer button.active')).toBe(
    data[activeKey[pageName]],
  )
}
