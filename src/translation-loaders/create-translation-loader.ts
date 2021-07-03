import type { InitOptions } from 'i18next'
import { loadTranslations } from './load-translations'

const curriedLoadTranslations =
  (options: InitOptions) =>
  (initialLocale?: string, namespaces?: string | string[]) =>
    loadTranslations(options, initialLocale, namespaces)

type CreateTranslationLoader = {
  serverSideTranslations: ReturnType<typeof curriedLoadTranslations>
  staticTranslations: ReturnType<typeof curriedLoadTranslations>
}

export const createTranslationLoader = (
  options: InitOptions,
): CreateTranslationLoader => {
  if (!options) {
    throw new Error('No `options` passed to createTranslationLoader')
  }
  return {
    serverSideTranslations: curriedLoadTranslations(options),
    staticTranslations: curriedLoadTranslations(options),
  }
}
