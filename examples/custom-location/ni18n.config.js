const localePath = './public/custom/{{lng}}.{{ns}}'

export const ni18nConfig = {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation'],
  backend: {
    addPath: `${localePath}.missing.json`,
    loadPath: `${localePath}.json`,
  },
}
