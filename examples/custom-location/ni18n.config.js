const localePath = '/custom/{{lng}}.{{ns}}.json'

export const ni18nConfig = {
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation', 'client'],
  backend: {
    loadPath:
      typeof window === 'undefined' ? `./public/${localePath}` : localePath,
  },
}
