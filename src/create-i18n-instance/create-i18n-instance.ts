import type { InitOptions, i18n as I18NextClient } from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import useBackend from '../use-backend'
import { getBackendConfig } from './get-backend-config'
import { isBrowser } from './is-browser'

export const createI18nInstance = (
  options: InitOptions,
  plugins?: Parameters<I18NextClient['use']>[0][],
): {
  instance: I18NextClient
  init: ReturnType<I18NextClient['init']>
} => {
  const config: InitOptions = {
    ...getBackendConfig(options),
    ...options,
    preload: !options.lng && options.supportedLngs,
    get initImmediate(): boolean {
      return isBrowser()
    },
    react: {
      ...options.react,
      useSuspense: isBrowser() ? options.react?.useSuspense : false,
    },
  }

  const instance = i18n.createInstance(config)

  useBackend(instance.use(initReactI18next))

  if (Array.isArray(plugins)) {
    plugins.flat().forEach((plugin) => instance.use(plugin))
  }

  const init = instance.init(config)

  return {
    instance,
    init,
  }
}
