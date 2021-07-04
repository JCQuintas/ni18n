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

type StandaloneOrArray<T> = T | T[]
type ExtractTypeFromArray<T> = T extends (infer L)[]
  ? [L] extends [string]
    ? L
    : string
  : string

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
export const loadTranslations = <
  Options extends InitOptions,
  InitialLocale extends ExtractTypeFromArray<Options['supportedLngs']>,
  NamespacesNeeded extends StandaloneOrArray<
    ExtractTypeFromArray<Options['ns']>
  >,
>(
  options: Options,
  // eslint-disable-next-line @typescript-eslint/ban-types
  initialLocale?: InitialLocale | (string & {}),
  namespacesNeeded?: NamespacesNeeded,
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
