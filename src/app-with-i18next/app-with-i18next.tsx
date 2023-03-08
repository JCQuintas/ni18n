import type { AppProps } from 'next/app'
import type { ElementType, ReactNode } from 'react'
import React, { useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import { createI18nInstance } from '../create-i18n-instance'
import type {
  Ni18nClientState,
  Ni18nOptions,
  Ni18nServerState,
} from '../common'
import { uniqueArray } from '../common'

/**
 * Use `appWithI18Next` inside your `_app.jsx` file to initialize the `I18nextProvider`.
 *
 * ```jsx
 * const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />
 *
 * export default appWithI18Next(MyApp, ni18nConfig)
 * ```
 *
 * @param WrappedComponent The MyApp component
 * @param options The options allowed by [i18next options](https://www.i18next.com/overview/configuration-options) plus the `use` property for plugins
 */
export const appWithI18Next = (
  WrappedComponent: ElementType<AppProps & { children?: ReactNode }>,
  options: Ni18nOptions,
): ElementType => {
  if (!options) {
    throw new Error('No `options` passed to appWithI18Next')
  }

  const WithI18Next = (props: AppProps) => {
    const { __ni18n_server__, __ni18n_client__ } = (props.pageProps ||
      {}) as Partial<Ni18nServerState & Ni18nClientState>
    const { locale } = props.router

    const i18nInstance = useMemo(() => {
      const { use: plugins, ...i18nextOptions } = options

      const ns =
        __ni18n_server__ || __ni18n_client__
          ? uniqueArray([
              ...(__ni18n_server__?.ns || []),
              ...(__ni18n_client__?.ns || []),
            ])
          : i18nextOptions.ns

      const { instance } = createI18nInstance(
        { ...i18nextOptions, lng: locale, ...__ni18n_server__, ns },
        plugins,
      )

      return instance
    }, [options, __ni18n_server__, locale])

    return (
      <I18nextProvider i18n={i18nInstance}>
        <WrappedComponent {...props} />
      </I18nextProvider>
    )
  }

  return WithI18Next
}
