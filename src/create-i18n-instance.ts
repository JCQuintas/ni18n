import type { InitOptions, i18n as I18NextClient } from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import useBackend from './use-backend'

export const createI18nInstance = (options: InitOptions): I18NextClient => {
  const isBrowser = (process as any).browser && typeof window !== 'undefined'

  let backendConfig = {}
  const hasCustomBackend = options.backend

  // Server side backend config
  if (!isBrowser && !hasCustomBackend) {
    const path = require('path')
    const localePath = './public/locales/{{lng}}/{{ns}}.json'

    backendConfig = {
      backend: {
        addPath: path.resolve(
          process.cwd(),
          localePath.replace('.json', '.missing.json'),
        ),
        loadPath: path.resolve(process.cwd(), localePath),
      },
    }
  }

  // Client side backend config
  if (isBrowser && !hasCustomBackend) {
    const localePath = '/locales/{{lng}}/{{ns}}.json'

    backendConfig = {
      backend: {
        addPath: localePath.replace('.json', '.missing.json'),
        loadPath: localePath,
      },
      preload: options.supportedLngs,
    }
  }

  const config: InitOptions = {
    ...backendConfig,
    ...options,
    get initImmediate(): boolean {
      return (process as any).browser && typeof window !== 'undefined'
    },
    debug: true,
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  }

  const instance = useBackend(i18n.use(initReactI18next))

  instance.init(config)

  return instance
}
