import { InitOptions } from 'i18next'
import { isBrowser } from './is-browser'

export const getBackendConfig = (
  options: InitOptions,
): Record<string, unknown> => {
  const hasCustomBackend = options.backend

  // Server side backend config
  if (!isBrowser() && !hasCustomBackend) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path')
    const localePath = './public/locales/{{lng}}/{{ns}}'

    return {
      backend: {
        addPath: path.resolve(process.cwd(), `${localePath}.missing.json`),
        loadPath: path.resolve(process.cwd(), `${localePath}.json`),
      },
    }
  }

  // Client side backend config
  if (isBrowser()) {
    return {
      preload: options.supportedLngs,
    }
  }

  return {}
}
