import type { FallbackLng, InitOptions } from 'i18next'
import { createI18nInstance } from './create-i18n-instance'

const getFallbackLocales = (fallbackLng?: false | FallbackLng): string[] => {
  if (typeof fallbackLng === 'string') return [fallbackLng]
  if (Array.isArray(fallbackLng)) return fallbackLng

  if (typeof fallbackLng === 'object' && fallbackLng !== null)
    return Object.values(fallbackLng).flat()

  return []
}

const getNamespaces = (
  options: InitOptions,
  namespacesNeeded?: string | string[],
) => {
  if (Array.isArray(namespacesNeeded) && namespacesNeeded.length > 0)
    return namespacesNeeded
  if (typeof namespacesNeeded === 'string') return [namespacesNeeded]
  return [options.defaultNS || 'translation']
}

export const loadTranslations = async (
  options: InitOptions,
  initialLocale?: string,
  namespacesNeeded?: string | string[],
) => {
  const instance = createI18nInstance({ ...options, lng: initialLocale })
  const selectedLocale = initialLocale || options.lng
  const locales = Array.from(
    new Set(
      [selectedLocale, ...getFallbackLocales(options.fallbackLng)].filter(
        Boolean,
      ) as string[],
    ),
  )

  const namespaces = getNamespaces(options, namespacesNeeded)

  const store = Object.fromEntries(
    locales.map((locale) => [
      locale,
      Object.fromEntries(
        namespaces.map((namespace) => [
          namespace,
          instance.services.resourceStore.data?.[locale]?.[namespace] || {},
        ]),
      ),
    ]),
  )

  return {
    __ni18n__: {
      store,
      locale: selectedLocale,
    },
  }
}

const curriedLoadTranslations =
  (options: InitOptions) =>
  (initialLocale?: string, namespaces?: string | string[]) =>
    loadTranslations(options, initialLocale, namespaces)

export const createTranslationLoader = (options: InitOptions) => ({
  serverSideTranslations: curriedLoadTranslations(options),
  staticTranslations: curriedLoadTranslations(options),
})
