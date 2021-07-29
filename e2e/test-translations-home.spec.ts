import { test } from '@playwright/test'
import {
  forbidAllClientSideTranslations,
  setupRequestVerifier,
} from './request-verifier'
import { testPageHome } from './test-page-home'
import { testUrl } from './test-url'

test('translations work for language "en"', async ({ page }) => {
  const language = 'en'

  const { allRequests } = setupRequestVerifier(page)

  await page.goto(testUrl)

  await testPageHome(page, language)

  await forbidAllClientSideTranslations(allRequests)
})

test('translations work for language "es"', async ({ page }) => {
  const language = 'es'

  const { allRequests } = setupRequestVerifier(page)

  await page.goto(testUrl)

  await testPageHome(page, language)

  await forbidAllClientSideTranslations(allRequests)
})

test('translations work for language "pt"', async ({ page }) => {
  const language = 'pt'

  const { allRequests } = setupRequestVerifier(page)

  await page.goto(testUrl)

  await testPageHome(page, language)

  await forbidAllClientSideTranslations(allRequests)
})
