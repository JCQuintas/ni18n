import type { InitOptions, i18n as I18NextClient } from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import useBackend from '../use-backend'
import { getBackendConfig } from './get-backend-config'

export const createI18nInstance = (
  options: InitOptions,
  plugins?: Parameters<I18NextClient['use']>[0][],
): {
  instance: I18NextClient
  init: ReturnType<I18NextClient['init']>
} => {
  const config: InitOptions = {
    ...options,
    ...getBackendConfig(options),
    partialBundledLanguages: options.partialBundledLanguages ?? true,
    react: {
      ...options.react,
      useSuspense: options.react?.useSuspense ?? false,
    },
  }

  const instance = i18n.createInstance(config)

  instance.use(initReactI18next)

  useBackend(instance)

  if (Array.isArray(plugins)) {
    plugins.flat().forEach((plugin) => instance.use(plugin))
  }

  const init = instance.init(config)

  return {
    instance,
    init,
  }
}
