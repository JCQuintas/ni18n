import { test } from '@playwright/test'
import { testPageClient } from './test-page-client'
import { testUrl } from './test-url'

test('translations work for language "en"', async ({ page }) => {
  const language = 'en'
  await page.goto(testUrl)

  await testPageClient(page, language)
})

test('translations work for language "es"', async ({ page }) => {
  const language = 'es'
  await page.goto(testUrl)

  await testPageClient(page, language)
})

test('translations work for language "pt"', async ({ page }) => {
  const language = 'pt'
  await page.goto(testUrl)

  await testPageClient(page, language)
})
