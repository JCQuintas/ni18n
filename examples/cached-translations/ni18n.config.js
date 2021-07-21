import HttpBackend from 'i18next-http-backend'
import ChainedBackend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'

const isBrowser = typeof window !== 'undefined'

export const ni18nConfig = {
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation', 'client'],
  use: isBrowser ? [ChainedBackend] : undefined,
  backend: isBrowser
    ? {
        backends: [LocalStorageBackend, HttpBackend],
        backendOptions: [
          {
            expirationTime: 24 * 60 * 60 * 1000,
          },
          {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
          },
        ],
      }
    : undefined,
}
