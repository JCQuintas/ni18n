import { Language } from './language'
import { Namespace } from './namespace'
import { Pattern, requestPatterns } from './request-patterns'
import {
  checkForForbiddenRequests,
  checkForRequiredRequests,
} from './request-verifier'

const CUSTOM_LANGUAGE_SELECTION = 'custom-language-selection'

export const checkClientSidePageFiles = async (
  requests: Set<string>,
  language: Language,
  allowedNamespaces?: Namespace[],
): Promise<void> => {
  const allLanguages: Language[] = ['en', 'es', 'pt']
  const requiredLanguages = [language]
  const forbiddenLanguages = allLanguages.filter(
    (language) => !requiredLanguages.includes(language),
  )

  const filterNamespaces = (pattern: Pattern) =>
    !allowedNamespaces ||
    allowedNamespaces.some((namespace) =>
      pattern.toString().includes(namespace),
    )

  if (process.env.EXAMPLE_FOLDER === CUSTOM_LANGUAGE_SELECTION) {
    await checkForRequiredRequests(
      requests,
      Object.values(requestPatterns.translationFiles)
        .flatMap((langObj) => Object.values(langObj))
        .filter(filterNamespaces),
    )
  } else {
    try {
      await checkForRequiredRequests(
        requests,
        requiredLanguages
          .flatMap((language) =>
            Object.values(requestPatterns.translationFiles[language]),
          )
          .filter(filterNamespaces),
      )
      await checkForForbiddenRequests(
        requests,
        forbiddenLanguages
          .flatMap((language) =>
            Object.values(requestPatterns.translationFiles[language]),
          )
          .filter(filterNamespaces),
      )
    } catch (error) {
      if (!process.env.EXAMPLE_FOLDER) {
        error.message = `\nIt might be that you are running tests on the '${CUSTOM_LANGUAGE_SELECTION}' example without $EXAMPLE_FOLDER env variable set:\n${error.message}`
      }
      throw error
    }
  }
}
