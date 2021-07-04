import type { InitOptions, Resource, i18n as I18NextClient } from 'i18next'
import type { Namespace } from 'react-i18next'
import { createI18nInstance } from '../create-i18n-instance'
import { getFallbackLocales } from './get-fallback-locales'
import { getNamespaces } from './get-namespaces'

export type Ni18nState = {
  __ni18n__: {
    resources: Resource
    lng?: string
  }
}

// For some reason if we don't reassign `Namespace` it gets compiled into `Namespace<string>`
type NamespacesNeeded = Namespace

/**
 * Use `loadTranslations` inside the `getStaticProps` or `getServerSideProps`.
 * It will make the translations available for the client through the `props`.
 *
 * ```js
 * export const getStaticProps = (props) => ({
 *   props: {
 *     ...loadTranslations(ni18nConfig, props.locale, 'my-namespace'),
 *   },
 * })
 * ```
 *
 * @param options The same value passed to `appWithI18Next`
 * @param initialLocale The initial locale for this page
 * @param namespacesNeeded The namespaces that are needed for all the elements in this page
 * @returns an object with a `__ni18n__` property to be used internally
 */
export const loadTranslations = async (
  options: InitOptions,
  initialLocale?: string,
  namespacesNeeded?: NamespacesNeeded,
  plugins?: Parameters<I18NextClient['use']>[0][],
): Promise<Ni18nState> => {
  if (!options) {
    throw new Error('No `options` passed to loadTranslations')
  }

  const { instance, init } = createI18nInstance(
    {
      ...options,
      lng: initialLocale,
    },
    plugins,
  )

  await init

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
