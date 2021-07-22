import { createI18nInstance } from '../create-i18n-instance'
import type {
  NamespacesNeeded,
  Ni18nOptions,
  Ni18nServerState,
} from '../common'
import { getFallbackLocales } from './get-fallback-locales'
import { getNamespaces } from '../common'

/**
 * Use `loadTranslations` inside the `getStaticProps` or `getServerSideProps`.
 * It will make the translations available for the client through the `props`.
 *
 * ```js
 * export const getStaticProps = async (props) => ({
 *   props: {
 *     ...(await loadTranslations(ni18nConfig, props.locale, 'my-namespace')),
 *   },
 * })
 * ```
 *
 * @param options The options allowed by [i18next options](https://www.i18next.com/overview/configuration-options) plus the `use` property for plugins
 * @param initialLocale The initial locale for this page
 * @param namespacesNeeded The namespaces that are needed for all the elements in this page
 * @returns an object with a `__ni18n_server__` property to be used internally
 */
export const loadTranslations = async (
  options: Ni18nOptions,
  initialLocale?: string,
  namespacesNeeded?: NamespacesNeeded,
): Promise<Ni18nServerState> => {
  if (!options) {
    throw new Error('No `options` passed to loadTranslations')
  }

  const { use: plugins, ...i18nextOptions } = options

  const { instance, init } = createI18nInstance(
    {
      ...i18nextOptions,
      lng: initialLocale,
    },
    plugins,
  )

  await init

  const locales = Array.from(
    new Set(
      [
        initialLocale,
        ...getFallbackLocales(i18nextOptions, initialLocale),
      ].filter(Boolean) as string[],
    ),
  )

  const namespaces = getNamespaces(i18nextOptions, namespacesNeeded)

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
    __ni18n_server__: {
      resources: store,
      ns: namespaces,
    },
  }
}
