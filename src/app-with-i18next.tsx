import type { InitOptions, i18n as I18NextClient } from 'i18next'
import type { AppProps } from 'next/app'
import type { ElementType } from 'react'
import React, { useMemo } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { I18nextProvider } from 'react-i18next'
import { createI18nInstance } from './create-i18n-instance'
import { getOptions } from './get-options'

export let i18nextInstance: I18NextClient | null = null

export const appWithI18Next = (
  WrappedComponent: ElementType<AppProps>,
  options: InitOptions,
): unknown => {
  if (!options) {
    throw new Error('No `options` passed to appWithI18Next')
  }

  const WithI18Next = (props: AppProps) => {
    const { __ni18n__ } = props?.pageProps

    const i18nInstance = useMemo(() => {
      const instance = createI18nInstance(getOptions(__ni18n__, options))

      i18nextInstance = instance

      return instance
    }, [options, __ni18n__])

    return i18nInstance ? (
      <I18nextProvider i18n={i18nInstance}>
        <WrappedComponent {...props} />
      </I18nextProvider>
    ) : (
      <WrappedComponent {...props} />
    )
  }

  return hoistNonReactStatics(WithI18Next, WrappedComponent)
}
