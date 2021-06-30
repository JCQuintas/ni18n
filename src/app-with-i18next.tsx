import type { InitOptions, i18n as I18NextClient } from 'i18next'
import type { AppProps } from 'next/app'
import type { ElementType } from 'react'
import React, { useMemo } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18n from 'i18next'

export let i18nextInstance: I18NextClient | null = null

export const appWithI18Next = (
  WrappedComponent: ElementType<AppProps>,
  options: InitOptions,
): unknown => {
  if (!options) {
    throw new Error('No `options` passed to appWithI18Next')
  }

  const WithI18Next = (props: AppProps) => {
    const i18nInstance = useMemo(() => {
      const config: InitOptions = {
        ...options,
        get initImmediate(): boolean {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (process as any).browser && typeof window !== 'undefined'
        },
        react: {
          useSuspense: true,
        },
        interpolation: {
          escapeValue: false,
        },
      }

      const instance = i18n.use(initReactI18next)

      if (instance.isInitialized) return instance

      instance.init(config)

      i18nextInstance = instance

      return instance
    }, [options])

    i18nInstance.changeLanguage(props.router.locale || options.lng)

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
