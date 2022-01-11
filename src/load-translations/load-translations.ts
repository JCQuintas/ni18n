import { createI18nInstance } from '../create-i18n-instance'
import type {
  NamespacesNeeded,
  Ni18nOptions,
  Ni18nServerState,
} from '../common'
import { getFallbackLocales } from './get-fallback-locales'
import { getNamespaces } from '../common'
import { ensureFilesLoad } from './ensure-files-load'

/**
 * Use `loadTranslations` inside `getStaticProps` or `getServerSideProps`
 * to make the translations available for the client through the `pageProps`.
 *
 * Any namespace not loaded by this function will not be available to be
 * loaded on the client side, you can use `clientNamespaces` in conjunction
 * with this one to make them available. Any overlapping namespaces will be
 * loaded on the server instead.
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

  await ensureFilesLoad()

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
