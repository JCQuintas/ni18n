import type { InitOptions, Resource } from 'i18next'
import { createI18nInstance } from '../create-i18n-instance'
import { getFallbackLocales } from './get-fallback-locales'
import { getNamespaces } from './get-namespaces'

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
      [selectedLocale, ...getFallbackLocales(initialLocale, options)].filter(
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
