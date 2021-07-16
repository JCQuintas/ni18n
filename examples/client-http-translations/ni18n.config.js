import HttpBackend from 'i18next-http-backend'

export const ni18nConfig = {
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation', 'client'],
  backend: {
    loadPath: 'http://localhost:7777/{{lng}}/{{ns}}',
  },
  partialBundledLanguages: true,
  /**
   * Set useSuspense to `true` in case you are using it
   * Else it should be false to prevent the SSR from getting out of sync
   */
  react: {
    useSuspense: false,
  },
  /**
   * `true` will download all namespaces for all languages on the first page visit
   * `false` will download all namespaces for current language and default language
   */
  preload: false,
  /**
   * On a real implementation it would be best to use something like a
   * https://github.com/i18next/i18next-chained-backend together with
   * https://github.com/i18next/i18next-localstorage-backend
   * so you don't download all the files every time a page loads
   *
   * Then you can have something like the code below to differentiate from
   * backend and frontend plugins. You will need to do the same for the `backend`
   * options as well, since the plugins have different option requirements.
   * `use: typeof window !== 'undefined' ? [ChainedBackend] : [HttpBackend]`
   */
  use: [HttpBackend],
}
