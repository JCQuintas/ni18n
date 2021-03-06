const supportedLngs = ['en', 'es', 'pt']

export const ni18nConfig = {
  /**
   * Set `fallbackLng` to the `supportedLngs` array in order for them all to be loaded
   */
  fallbackLng: supportedLngs,
  supportedLngs,
  ns: ['translation', 'alternate', 'home', 'client'],
  react: {
    useSuspense: false,
  },
}
