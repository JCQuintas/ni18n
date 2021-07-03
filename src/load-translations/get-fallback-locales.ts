import { InitOptions } from 'i18next'

export const getFallbackLocales = (
  initialLocale: string | undefined,
  options: InitOptions,
): string[] => {
  if (!initialLocale && options.supportedLngs) return [...options.supportedLngs]

  const { fallbackLng } = options
  if (typeof fallbackLng === 'string') return [fallbackLng]
  if (Array.isArray(fallbackLng)) return [...fallbackLng]

  if (typeof fallbackLng === 'object' && fallbackLng !== null)
    return Object.values(fallbackLng).flat()

  return []
}
