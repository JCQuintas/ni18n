export const ni18nConfig = {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation'],
  backend: {
    loadPath: 'http://localhost:7777/{{lng}}/{{ns}}',
  },
}
