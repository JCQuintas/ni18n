import type { InitOptions, i18n as I18NextClient } from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import useBackend from './use-backend'

const isBrowser = () =>
  Boolean(
    (process as unknown as Record<string, string>).browser &&
      typeof window !== 'undefined',
  )

export const createI18nInstance = (options: InitOptions): I18NextClient => {
  let backendConfig = {}
  const hasCustomBackend = options.backend

  // Server side backend config
  if (!isBrowser() && !hasCustomBackend) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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
      preload: options.supportedLngs,
    }
  }

  // Client side backend config
  if (isBrowser() && !hasCustomBackend) {
    backendConfig = {
      preload: options.supportedLngs,
    }
  }

  const config: InitOptions = {
    ...backendConfig,
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
