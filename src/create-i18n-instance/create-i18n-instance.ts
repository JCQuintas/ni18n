import type { InitOptions, i18n as I18NextClient } from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import useBackend from '../use-backend/server'
import { getBackendConfig } from './get-backend-config'
import { isBrowser } from './is-browser'

export const createI18nInstance = (options: InitOptions): I18NextClient => {
  const config: InitOptions = {
    ...getBackendConfig(options),
    ...options,
    get initImmediate(): boolean {
      return isBrowser()
    },
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  }

  const instance = i18n.createInstance(config)

  useBackend(instance.use(initReactI18next))

  instance.init(config)

  return instance
}
