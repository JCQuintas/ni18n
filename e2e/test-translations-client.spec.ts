import { test } from '@playwright/test'
import { Language } from './language'
import { requestPatterns } from './request-patterns'
import {
  checkForForbiddenRequests,
  checkForRequiredRequests,
  setupRequestVerifier,
} from './request-verifier'
import { testPageClient } from './test-page-client'
import { testUrl } from './test-url'

const CUSTOM_LANGUAGE_SELECTION = 'custom-language-selection'

const checkClientSidePageFiles = async (
  requests: Set<string>,
  language: Language,
): Promise<void> => {
  const allLanguages: Language[] = ['en', 'es', 'pt']
  const defaultLanguage: Language = 'en'
  const requiredLanguages = Array.from(new Set([defaultLanguage, language]))
  const forbiddenLanguages = allLanguages.filter(
    (language) => !requiredLanguages.includes(language),
  )

  if (process.env.EXAMPLE_FOLDER === CUSTOM_LANGUAGE_SELECTION) {
    await checkForRequiredRequests(
      requests,
      Object.values(requestPatterns.translationFiles).flatMap((langObj) =>
        Object.values(langObj),
      ),
    )
  } else {
    try {
      await checkForRequiredRequests(
        requests,
        requiredLanguages.flatMap((language) =>
          Object.values(requestPatterns.translationFiles[language]),
        ),
      )
      await checkForForbiddenRequests(
        requests,
        forbiddenLanguages.flatMap((language) =>
          Object.values(requestPatterns.translationFiles[language]),
        ),
      )
    } catch (error) {
      if (!process.env.EXAMPLE_FOLDER) {
        error.message = `\nIt might be that you are running tests on the '${CUSTOM_LANGUAGE_SELECTION}' example without $EXAMPLE_FOLDER env variable set:\n${error.message}`
      }
      throw error
    }
  }
}

test('translations work for language "en"', async ({ page }) => {
  const language = 'en'

  const { allRequests } = setupRequestVerifier(page)

  await page.goto(testUrl)

  await testPageClient(page, language)

  await checkClientSidePageFiles(allRequests, language)
})

test('translations work for language "es"', async ({ page }) => {
  const language = 'es'

  const { allRequests } = setupRequestVerifier(page)

  await page.goto(testUrl)

  await testPageClient(page, language)

  await checkClientSidePageFiles(allRequests, language)
})

test('translations work for language "pt"', async ({ page }) => {
  const language = 'pt'

  const { allRequests } = setupRequestVerifier(page)

  await page.goto(testUrl)

  await testPageClient(page, language)

  await checkClientSidePageFiles(allRequests, language)
})
