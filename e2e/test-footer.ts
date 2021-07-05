import { expect, Page } from '@playwright/test'
import { URL } from 'url'
import { Language } from './language'

const footerData = {
  en: {
    homePage: 'Home Page',
    alternatePage: 'Alternate Page',
  },
  es: {
    homePage: 'Página Inicial',
    alternatePage: 'Página Alternativa',
  },
  pt: {
    homePage: 'Página Inicial',
    alternatePage: 'Página Alternativa',
  },
}

export const testFooter = async (
  page: Page,
  language: Language,
  pageName: 'home' | 'alternate',
): Promise<void> => {
  const footer = await page.waitForSelector('footer')

  expect(
    await footer.waitForSelector(`text=${footerData[language].homePage}`),
  ).toBeTruthy()

  expect(
    await footer.waitForSelector(`text=${footerData[language].alternatePage}`),
  ).toBeTruthy()

  const activeKey = {
    home: 'homePage' as const,
    alternate: 'alternatePage' as const,
  }

  expect(await page.innerText('footer button.active')).toBe(
    footerData[language][activeKey[pageName]],
  )
}
