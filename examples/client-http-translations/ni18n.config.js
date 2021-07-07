import HttpBackend from 'i18next-http-backend'

export const ni18nConfig = {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation', 'client'],
  debug: true,
  backend: {
    loadPath: 'http://localhost:7777/{{lng}}/{{ns}}',
  },
  partialBundledLanguages: true,
  react: {
    useSuspense: false,
  },
  preload: false,
  use: [HttpBackend],
}
