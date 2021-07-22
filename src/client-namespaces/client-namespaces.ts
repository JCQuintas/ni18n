import { InitOptions } from 'i18next'
import { getNamespaces, NamespacesNeeded, Ni18nClientState } from '../common'

/**
 * Use `clientNamespaces` inside `getStaticProps` or `getServerSideProps` to
 * flag which namespaces are allowed to be loaded on the client.
 *
 * If you don't use this function, all the namespaces will be loaded as
 * soon as the page loads, which might cause unwanted traffic.
 *
 * This function is safe to be used with `loadTranslations` but any overlapping
 * namespaces will be loaded on the server instead.
 *
 * ```js
 * export const getStaticProps = async (props) => ({
 *   props: {
 *     ...clientNamespaces(ni18nConfig, 'my-namespace'),
 *   },
 * })
 * ```
 *
 * @param options The options allowed by [i18next options](https://www.i18next.com/overview/configuration-options) plus the `use` property for plugins
 * @param namespacesNeeded The namespaces that are needed for all the elements in this page
 * @returns an object with a `__ni18n_client__` property to be used internally
 */
export const clientNamespaces = (
  options: InitOptions,
  namespacesNeeded: NamespacesNeeded,
): Ni18nClientState => ({
  __ni18n_client__: {
    ns: getNamespaces(options, namespacesNeeded),
  },
})
