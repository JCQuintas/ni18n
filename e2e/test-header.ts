import { expect, Page } from '@playwright/test'
import { Language } from './language'

const headerData = {
  en: {
    english: 'english',
    portuguese: 'portuguese',
    spanish: 'spanish',
  },
  es: {
    english: 'inglés',
    portuguese: 'portugués',
    spanish: 'español',
  },
  pt: {
    english: 'inglês',
    portuguese: 'português',
    spanish: 'espanhol',
  },
}

export const testHeader = async (
  page: Page,
  language: Language,
): Promise<void> => {
  const header = await page.waitForSelector('header')

  expect(
    await header.waitForSelector(`text=${headerData[language].english}`),
  ).toBeTruthy()
  expect(
    await header.waitForSelector(`text=${headerData[language].portuguese}`),
  ).toBeTruthy()
  expect(
    await header.waitForSelector(`text=${headerData[language].spanish}`),
  ).toBeTruthy()

  const activeKey = {
    en: 'english' as const,
    pt: 'portuguese' as const,
    es: 'spanish' as const,
  }

  expect(await page.innerText('header button.active')).toBe(
    headerData[language][activeKey[language]],
  )
}
