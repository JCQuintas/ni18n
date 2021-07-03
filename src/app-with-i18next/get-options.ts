import { InitOptions } from 'i18next'
import type { Ni18nState } from '../load-translations'

export const getOptions = (
  options: InitOptions,
  __ni18n__?: Ni18nState['__ni18n__'],
): InitOptions => {
  if (__ni18n__) {
    return {
      ...options,
      ...__ni18n__,
    }
  }

  return { ...options }
}
