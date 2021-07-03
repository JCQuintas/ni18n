import { InitOptions } from 'i18next'
import type { Ni18nState } from './load-translations'

export const getOptions = (
  __ni18n__: Ni18nState['__ni18n__'],
  options: InitOptions,
): InitOptions => {
  if (__ni18n__) {
    return {
      ...options,
      ...__ni18n__,
    }
  }

  return options
}
