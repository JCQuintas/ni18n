const supportedLngs = ['en', 'es', 'pt']

export const ni18nConfig = {
  fallbackLng: 'en',
  supportedLngs,
  ns: ['alternate', 'home', 'translation'],
  preload: supportedLngs,
  react: {
    useSuspense: false,
  },
}
