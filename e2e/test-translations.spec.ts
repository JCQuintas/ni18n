import { test } from '@playwright/test'
import { testPageAlternate } from './test-page-alternate'
import { testPageHome } from './test-page-home'

test('translations work for language "en"', async ({ page }) => {
  const language = 'en'
  await testPageHome(page, language)
  await testPageAlternate(page, language)
})

test('translations work for language "es"', async ({ page }) => {
  const language = 'es'
  await testPageHome(page, language)
  await testPageAlternate(page, language)
})

test('translations work for language "pt"', async ({ page }) => {
  const language = 'pt'
  await testPageHome(page, language)
  await testPageAlternate(page, language)
})
