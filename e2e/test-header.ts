import { expect, Page } from '@playwright/test'
import { Language } from './language'
import { translations } from '../data/translations'

export const testHeader = async (
  page: Page,
  language: Language,
): Promise<void> => {
  const namespace = 'translation'
  const data = translations[language][namespace]

  const header = await page.waitForSelector('header')

  expect(await header.waitForSelector(`text=${data.english}`)).toBeTruthy()
  expect(await header.waitForSelector(`text=${data.portuguese}`)).toBeTruthy()
  expect(await header.waitForSelector(`text=${data.spanish}`)).toBeTruthy()

  const activeKey = {
    en: 'english' as const,
    pt: 'portuguese' as const,
    es: 'spanish' as const,
  }

  expect(await page.innerText('header button.active')).toBe(
    data[activeKey[language]],
  )
}
