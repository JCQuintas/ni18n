import { Page } from '@playwright/test'
import { requestPatterns } from './request-patterns'

type Patterns = (string | RegExp)[]

export const setupRequestVerifier = (
  page: Page,
): { allRequests: Set<string> } => {
  const allRequests: Set<string> = new Set()

  page.on('request', (request) => {
    allRequests.add(request.url())
  })

  return { allRequests }
}

const checkPatterns =
  (patterns: Patterns) =>
  (request: string): boolean =>
    patterns.some((pattern) =>
      pattern instanceof RegExp
        ? pattern.test(request)
        : request.includes(pattern),
    )

export const checkForForbiddenRequests = async (
  requests: Set<string>,
  patterns: Patterns,
): Promise<void> => {
  const forbiddenRequests = Array.from(requests).filter(checkPatterns(patterns))

  if (forbiddenRequests.length)
    throw new Error(
      `\nForbidden requests found:\n${forbiddenRequests.join('\n')}`,
    )
}

export const checkForRequiredRequests = async (
  requests: Set<string>,
  patterns: Patterns,
): Promise<void> => {
  const requiredRequests = patterns.filter(
    (pattern) =>
      !Array.from(requests).some((request) =>
        checkPatterns([pattern])(request),
      ),
  )

  if (requiredRequests.length) {
    throw new Error(
      `\nRequired requests not found:\n${requiredRequests.join('\n')}`,
    )
  }
}

export const forbidAllClientSideTranslations = async (
  requests: Set<string>,
): Promise<void> => {
  checkForForbiddenRequests(
    requests,
    Object.values(requestPatterns.translationFiles).flatMap((langObj) =>
      Object.values(langObj),
    ),
  )
}
