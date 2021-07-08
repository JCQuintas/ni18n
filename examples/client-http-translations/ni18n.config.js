import HttpBackend from 'i18next-http-backend'

export const ni18nConfig = {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation', 'client'],
  backend: {
    loadPath: 'http://localhost:7777/{{lng}}/{{ns}}',
  },
  partialBundledLanguages: true,
  preload: false,
  /**
   * On a real implementation it would be best to use something like a
   * https://github.com/i18next/i18next-chained-backend together with
   * https://github.com/i18next/i18next-localstorage-backend
   * so you don't download all the files every time a page loads
   */
  use: [HttpBackend],
}
