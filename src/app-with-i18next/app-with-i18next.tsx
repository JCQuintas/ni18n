import type { InitOptions, i18n as I18NextClient } from 'i18next'
import type { AppProps } from 'next/app'
import type { ElementType } from 'react'
import React, { useMemo } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { I18nextProvider } from 'react-i18next'
import { createI18nInstance } from '../create-i18n-instance'
import { getOptions } from './get-options'

/**
 * Use `appWithI18Next` inside your `_app.jsx` file to initialize the `I18nextProvider`.
 *
 * ```jsx
 * // _app.jsx
 * const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />
 *
 * export default appWithI18Next(MyApp, ni18nConfig)
 * ```
 *
 * @param WrappedComponent The MyApp component
 * @param options The options allowed by [i18next options](https://www.i18next.com/overview/configuration-options)
 */
export const appWithI18Next = (
  WrappedComponent: ElementType<AppProps>,
  options: InitOptions,
  plugins?: Parameters<I18NextClient['use']>[0][],
): ElementType => {
  if (!options) {
    throw new Error('No `options` passed to appWithI18Next')
  }

  const WithI18Next = (props: AppProps) => {
    const { __ni18n__ } = props.pageProps || {}

    const i18nInstance = useMemo(() => {
      const { instance } = createI18nInstance(
        getOptions(options, __ni18n__),
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
