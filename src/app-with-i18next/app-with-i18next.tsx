import type { AppProps } from 'next/app'
import type { ElementType } from 'react'
import React, { useMemo } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { I18nextProvider } from 'react-i18next'
import { createI18nInstance } from '../create-i18n-instance'
import { getOptions } from './get-options'
import { Ni18nOptions } from '../ni18n-options'

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
  WrappedComponent: ElementType<AppProps>,
  options: Ni18nOptions,
): ElementType => {
  if (!options) {
    throw new Error('No `options` passed to appWithI18Next')
  }

  const WithI18Next = (props: AppProps) => {
    const { __ni18n__ } = props.pageProps || {}
    const { locale } = props.router

    const i18nInstance = useMemo(() => {
      const { use: plugins, ...config } = options

      const { instance } = createI18nInstance(
        getOptions({ ...config, lng: locale }, __ni18n__),
        plugins,
      )

      return instance
    }, [options, __ni18n__])

    return (
      <I18nextProvider i18n={i18nInstance}>
        <WrappedComponent {...props} />
      </I18nextProvider>
    )
  }

  return hoistNonReactStatics(WithI18Next, WrappedComponent)
}
