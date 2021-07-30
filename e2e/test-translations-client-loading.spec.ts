import { test } from '@playwright/test'
import { checkClientSidePageFiles } from './utilities/check-client-side-page-files'
import { Namespace } from './utilities/namespace'
import { PageName } from './utilities/page-name'
import { setupRequestVerifier } from './utilities/request-verifier'
import { setupPageAndLanguage } from './utilities/setup-page-and-language'
import { testPage } from './utilities/test-page'

const PAGE_NAME: PageName = 'client-loading'
const NAMESPACE: Namespace = 'client'

test('translations work for language "en"', async ({ page }) => {
  const language = 'en'

  await setupPageAndLanguage(page, language)

  const { allRequests } = setupRequestVerifier(page)

  await testPage(page, language, PAGE_NAME, NAMESPACE)

  await checkClientSidePageFiles(allRequests, language)
})

test('translations work for language "es"', async ({ page }) => {
  const language = 'es'

  await setupPageAndLanguage(page, language)

  const { allRequests } = setupRequestVerifier(page)

  await testPage(page, language, PAGE_NAME, NAMESPACE)

  await checkClientSidePageFiles(allRequests, language)
})

test('translations work for language "pt"', async ({ page }) => {
  const language = 'pt'

  await setupPageAndLanguage(page, language)

  const { allRequests } = setupRequestVerifier(page)

  await testPage(page, language, PAGE_NAME, NAMESPACE)

  await checkClientSidePageFiles(allRequests, language)
})
