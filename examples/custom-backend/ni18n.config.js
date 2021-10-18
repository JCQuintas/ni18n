import HttpBackend from 'i18next-http-backend'

export const ni18nConfig = {
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['translation', 'alternate', 'home', 'client'],
  backend: {
    loadPath: 'http://localhost:7777/{{lng}}/{{ns}}',
  },
  use: [HttpBackend],
}
