import { InitOptions } from 'i18next'

export const getFallbackLocales = (
  options: InitOptions,
  initialLocale?: string,
): string[] => {
  const { fallbackLng } = options
  if (typeof fallbackLng === 'string') return [fallbackLng]

  if (Array.isArray(fallbackLng)) return [...fallbackLng]

  if (typeof fallbackLng === 'function') {
    const fallbackResult = fallbackLng(initialLocale || '')
    return getFallbackLocales({ ...options, fallbackLng: fallbackResult })
  }

  if (typeof fallbackLng === 'object' && fallbackLng !== null)
    return Object.values(fallbackLng).flat()

  return []
}
