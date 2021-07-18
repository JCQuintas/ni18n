import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import type { i18n as I18nClient } from 'i18next'

/**
 * `useSyncLanguage` can be used when not leveraging next.js' localized routes.
 * It will make sure to set the `current language` properly in `i18next` based
 * on the language parameter you pass to it.
 *
 * Note that this can cause an error when rendering on the server. This happens
 * because `useTranslation` returns a Suspense. To fix it, either enable react
 * Suspense Mode, or set `react.useSuspense = false` in your `ni18n-options.ts`
 *
 * @param language The language the translations should be in
 * @returns an i18n instance
 */
export const useSyncLanguage = (language?: string): { i18n: I18nClient } => {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language !== language) i18n.changeLanguage(language)
  }, [language, i18n.language])

  return { i18n }
}
