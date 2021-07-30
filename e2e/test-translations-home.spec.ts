import { test } from '@playwright/test'
import { Namespace } from './utilities/namespace'
import { PageName } from './utilities/page-name'
import {
  forbidAllClientSideTranslations,
  setupRequestVerifier,
} from './utilities/request-verifier'
import { setupPageAndLanguage } from './utilities/setup-page-and-language'
import { testPage } from './utilities/test-page'

const PAGE_NAME: PageName = 'home'
const NAMESPACE: Namespace = 'home'

test('translations work for language "en"', async ({ page }) => {
  const language = 'en'

  await setupPageAndLanguage(page, language)

  const { allRequests } = setupRequestVerifier(page)

  await testPage(page, language, PAGE_NAME, NAMESPACE)

  await forbidAllClientSideTranslations(allRequests)
})

test('translations work for language "es"', async ({ page }) => {
  const language = 'es'

  await setupPageAndLanguage(page, language)

  const { allRequests } = setupRequestVerifier(page)

  await testPage(page, language, PAGE_NAME, NAMESPACE)

  await forbidAllClientSideTranslations(allRequests)
})

test('translations work for language "pt"', async ({ page }) => {
  const language = 'pt'

  await setupPageAndLanguage(page, language)

  const { allRequests } = setupRequestVerifier(page)

  await testPage(page, language, PAGE_NAME, NAMESPACE)

  await forbidAllClientSideTranslations(allRequests)
})
