import type { FallbackLng, InitOptions, Resource } from 'i18next'
import { createI18nInstance } from '../create-i18n-instance'

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
): string[] => {
  if (Array.isArray(namespacesNeeded) && namespacesNeeded.length > 0)
    return namespacesNeeded
  if (typeof namespacesNeeded === 'string') return [namespacesNeeded]
  return [options.defaultNS || 'translation']
}

export type Ni18nState = {
  __ni18n__: {
    resources: Resource
    lng?: string
  }
}

export const loadTranslations = (
  options: InitOptions,
  initialLocale?: string,
  namespacesNeeded?: string | string[],
): Ni18nState => {
  if (!options) {
    throw new Error('No `options` passed to loadTranslations')
  }

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
      resources: store,
      lng: selectedLocale,
    },
  }
}
