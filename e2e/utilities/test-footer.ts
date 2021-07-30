import { expect, Page } from '@playwright/test'
import { Language } from './language'
import { translations } from '../../data/translations'
import { PageName } from './page-name'

export const testFooter = async (
  page: Page,
  language: Language,
  pageName: PageName,
): Promise<void> => {
  const namespace = 'translation'
  const data = translations[language][namespace]

  const footer = await page.waitForSelector('footer')

  expect(await footer.waitForSelector(`text=${data.homePage}`)).toBeTruthy()

  expect(
    await footer.waitForSelector(`text=${data.serverSidePropsPage}`),
  ).toBeTruthy()

  expect(
    await footer.waitForSelector(`text=${data.defaultNamespacePage}`),
  ).toBeTruthy()

  expect(
    await footer.waitForSelector(`text=${data.clientLoadingPage}`),
  ).toBeTruthy()

  expect(
    await footer.waitForSelector(`text=${data.clientNamespacesPage}`),
  ).toBeTruthy()

  expect(await page.getAttribute('footer button.active', 'data-id')).toBe(
    `${pageName}-page-button`,
  )
}
