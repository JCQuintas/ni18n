import { test } from '@playwright/test'
import { testPageAlternate } from './test-page-alternate'

test('translations work for language "en"', async ({ page }) => {
  const language = 'en'
  await page.goto('http://localhost:3000/')

  await testPageAlternate(page, language)
})

test('translations work for language "es"', async ({ page }) => {
  const language = 'es'
  await page.goto('http://localhost:3000/')

  await testPageAlternate(page, language)
})

test('translations work for language "pt"', async ({ page }) => {
  const language = 'pt'
  await page.goto('http://localhost:3000/')

  await testPageAlternate(page, language)
})
